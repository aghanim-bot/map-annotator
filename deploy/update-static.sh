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
validate_file "$checkout/app.js"
validate_tree "$checkout/maps"
[ -n "$(find "$checkout/maps" -type f -print -quit)" ] || fail "maps directory contains no files"

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
install_tree "$checkout/maps" "$public_dir/maps"
if [ "$include_renders" -eq 1 ]; then
    install_tree "$checkout/renders" "$public_dir/renders"
fi
install -m 0644 "$checkout/style.css" "$public_dir/style.css"
install -m 0644 "$checkout/app.js" "$public_dir/app.js"
install -m 0644 "$checkout/index.html" "$public_dir/index.html"

printf 'Deployed map-annotator commit %s\n' "$commit"
