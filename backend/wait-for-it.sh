#!/usr/bin/env bash
# Usage: ./wait-for-it.sh host:port -- command args...
# 출처: https://github.com/vishnubob/wait-for-it

HOSTPORT=$1
shift

HOST=$(echo $HOSTPORT | cut -d: -f1)
PORT=$(echo $HOSTPORT | cut -d: -f2)

echo "Waiting for $HOST:$PORT..."

while ! nc -z $HOST $PORT; do
  sleep 1
done

echo "$HOST:$PORT is available — starting app"

exec "$@"
