#!/bin/sh
set -eu

STATIC_ROOT=${STATIC_ROOT:-/var/data/static}
REPO_URL=${REPO_URL:-https://github.com/aghanim-bot/map-annotator.git}
BRANCH=${BRANCH:-main}

fail() {
    printf 'update-map-annotator: %s\n' "$*" >&2
    exit 1
}

case $STATIC_ROOT in
    /*) ;;
    *) fail "STATIC_ROOT must be an absolute path" ;;
esac

[ -d "$STATIC_ROOT" ] || fail "STATIC_ROOT is not a directory: $STATIC_ROOT"
[ -w "$STATIC_ROOT" ] || fail "STATIC_ROOT is not writable: $STATIC_ROOT"
[ -n "$REPO_URL" ] || fail "REPO_URL must not be empty"
[ -n "$BRANCH" ] || fail "BRANCH must not be empty"

deploy_dir=$STATIC_ROOT/.deploy
checkout=$deploy_dir/map-annotator
lock_file=$deploy_dir/map-annotator.lock
public_dir=$STATIC_ROOT/map-annotator

umask 077
install -d -m 0700 "$deploy_dir"
exec 9>"$lock_file"
if ! flock -n 9; then
    fail "another deployment is already running"
fi

if command -v git >/dev/null 2>&1; then
    git_cmd=$(command -v git)
else
    command -v nix-shell >/dev/null 2>&1 || fail "neither git nor nix-shell is available"
    git_cmd=$(nix-shell -p git --run 'command -v git')
fi
[ -n "$git_cmd" ] && [ -x "$git_cmd" ] || fail "could not resolve an executable git"
"$git_cmd" check-ref-format --branch "$BRANCH" >/dev/null 2>&1 || fail "invalid branch name: $BRANCH"

umask 022
if [ ! -e "$checkout" ]; then
    "$git_cmd" clone --no-checkout --single-branch --branch "$BRANCH" -- "$REPO_URL" "$checkout"
else
    [ -d "$checkout" ] && [ ! -L "$checkout" ] || fail "checkout path is not a directory: $checkout"
    "$git_cmd" -C "$checkout" rev-parse --git-dir >/dev/null 2>&1 || fail "checkout is not a git repository: $checkout"
    "$git_cmd" -C "$checkout" remote set-url origin "$REPO_URL"
    "$git_cmd" -C "$checkout" fetch --no-tags --prune origin \
        "+refs/heads/$BRANCH:refs/remotes/origin/$BRANCH"
fi

commit=$("$git_cmd" -C "$checkout" rev-parse --verify "refs/remotes/origin/$BRANCH^{commit}")
case $commit in
    ''|*[!0-9a-f]*) fail "resolved commit is not a lowercase hexadecimal object ID: $commit" ;;
esac
"$git_cmd" -C "$checkout" reset --hard "$commit"
"$git_cmd" -C "$checkout" clean -ffdx

validate_file() {
    [ -f "$1" ] && [ ! -L "$1" ] || fail "required asset is not a regular file: $1"
}

validate_tree() {
    [ -d "$1" ] && [ ! -L "$1" ] || fail "asset tree is not a directory: $1"
    invalid=$(find "$1" ! -type f ! -type d -print -quit)
    [ -z "$invalid" ] || fail "asset tree contains a non-regular entry: $invalid"
}

validate_file "$checkout/index.html"
validate_file "$checkout/style.css"
validate_file "$checkout/annotation-model.js"
validate_file "$checkout/data/annotation-sets.js"
validate_file "$checkout/app.js"
validate_tree "$checkout/maps"
map_slugs='antarctic-peninsula busan ilios lijiang-tower nepal oasis samoa circuit-royal dorado havana junkertown rialto route-66 shambali-monastery watchpoint-gibraltar aatlis new-junk-city suravasa blizzard-world eichenwalde hollywood kings-row midtown neon-junction numbani paraiso colosseo esperanca new-queen-street runasapi'
for map_slug in $map_slugs; do
    map_asset=$checkout/maps/$map_slug-2026-07-22.webp
    validate_file "$map_asset"
    [ -s "$map_asset" ] || fail "required map asset is empty: $map_asset"
done

grep -F 'href="./style.css"' "$checkout/index.html" >/dev/null || \
    fail "index.html must reference ./style.css"
grep -F 'src="./annotation-model.js"' "$checkout/index.html" >/dev/null || \
    fail "index.html must reference ./annotation-model.js"
grep -F 'src="./data/annotation-sets.js"' "$checkout/index.html" >/dev/null || \
    fail "index.html must reference ./data/annotation-sets.js"
grep -F 'src="./app.js"' "$checkout/index.html" >/dev/null || \
    fail "index.html must reference ./app.js"

if [ -e "$checkout/renders" ] || [ -L "$checkout/renders" ]; then
    validate_tree "$checkout/renders"
    include_renders=1
else
    include_renders=0
fi

install_tree() {
    source_dir=$1
    destination_dir=$2
    install -d -m 0755 "$destination_dir"
    (
        cd "$source_dir"
        find . -type d -exec install -d -m 0755 -- "$destination_dir/{}" \;
        find . -type f -exec install -m 0644 -- '{}' "$destination_dir/{}" \;
    )
}

install -d -m 0755 "$public_dir"

style_asset=style.$commit.css
model_asset=annotation-model.$commit.js
sets_asset=annotation-sets.$commit.js
app_asset=app.$commit.js

install -m 0644 "$checkout/style.css" "$public_dir/$style_asset"
install -m 0644 "$checkout/annotation-model.js" "$public_dir/$model_asset"
install -m 0644 "$checkout/data/annotation-sets.js" "$public_dir/$sets_asset"
install -m 0644 "$checkout/app.js" "$public_dir/$app_asset"

install_tree "$checkout/maps" "$public_dir/maps"
if [ "$include_renders" -eq 1 ]; then
    install_tree "$checkout/renders" "$public_dir/renders"
fi

index_temp=$(mktemp "$public_dir/.index.$commit.XXXXXX")
cleanup() {
    if [ -n "${index_temp:-}" ] && [ -e "$index_temp" ]; then
        rm -f -- "$index_temp"
    fi
}
trap cleanup 0

sed \
    -e "s|href=\"./style.css\"|href=\"./$style_asset\"|" \
    -e "s|src=\"./annotation-model.js\"|src=\"./$model_asset\"|" \
    -e "s|src=\"./data/annotation-sets.js\"|src=\"./$sets_asset\"|" \
    -e "s|src=\"./app.js\"|src=\"./$app_asset\"|" \
    "$checkout/index.html" > "$index_temp"
chmod 0644 "$index_temp"

grep -F "href=\"./$style_asset\"" "$index_temp" >/dev/null || \
    fail "generated index does not reference $style_asset"
grep -F "src=\"./$model_asset\"" "$index_temp" >/dev/null || \
    fail "generated index does not reference $model_asset"
grep -F "src=\"./$sets_asset\"" "$index_temp" >/dev/null || \
    fail "generated index does not reference $sets_asset"
grep -F "src=\"./$app_asset\"" "$index_temp" >/dev/null || \
    fail "generated index does not reference $app_asset"

mv -f -- "$index_temp" "$public_dir/index.html"
index_temp=

printf 'Deployed map-annotator commit %s\n' "$commit"
