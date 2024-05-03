#!/bin/sh
echo "\n===========================\nBase case shows 200 when database is up and 503 when database is 
down \n"
echo "\n===========================\ncurl -vvvv -XGET 
http://localhost:3000/healthz\n===========================\n"
curl -vvvv -XGET http://localhost:3000/healthz

echo "\n===========================\nShows 405 Method not allowed for other types of 
requests\n===========================\n"
echo "\n===========================\ncurl -vvvv -XPUT 
http://localhost:3000/healthz\n===========================\n"
curl -vvvv -XPUT http://localhost:3000/healthz

echo "\n===========================\ncurl -vvvv -XPOST 
http://localhost:3000/healthz\n===========================\n"
curl -vvvv -XPOST http://localhost:3000/healthz

echo "\n===========================\ncurl -vvvv -XPATCH 
http://localhost:3000/healthz\n===========================\n"
curl -vvvv -XPATCH http://localhost:3000/healthz

echo "\n===========================\ncurl -vvvv -XDELETE 
http://localhost:3000/healthz\n===========================\n"
curl -vvvv -XDELETE http://localhost:3000/healthz

echo "\n===========================\nShows 400 Bad request when url has any payload or query 
param\n===========================\n"
echo "\n===========================\ncurl -vvvv -XGET 
http://localhost:3000/healthz?test=123\n===========================\n"
curl -vvvv -XGET http://localhost:3000/healthz?test=123

echo "\n===========================\ncurl -vvvv -XGET -d \"sample String\" 
http://localhost:3000/healthz\n===========================\n"
curl -vvvv -XGET -d "sample String" http://localhost:3000/healthz


echo "\n===========================\ncurl -vvvv -XGET -d "{test : 123}" \
http://localhost:3000/healthz\n===========================\n"
curl -vvvv -XGET -d "{test : 123}" http://localhost:3000/healthz
