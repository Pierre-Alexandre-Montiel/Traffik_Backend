docker rm -v traffik_backend-db-1
docker rmi $(docker images -a -q)