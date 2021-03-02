export UUID=$(id -u)
export PWD=${PWD}

echo 'Stop service'
docker-compose down;
echo; echo 'Remove volumes';
docker volume rm `docker volume ls | grep account-app`
