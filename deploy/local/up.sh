export UUID=$(id -u)
export PWD=${PWD}

docker-compose up -d
docker-compose ps
