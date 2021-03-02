Деплой план

1) Установить docker
https://docs.docker.com/docker-for-mac/install/

2) В консоле переходим в папку deploy/local

3) Запускам скрипт up.sh
sh up.sh

4) Ждем когда скрипт закончит свою выполнение и вернут управление.

5) Заоходим в контейнер fpm:
    - docker exec -ti fpm.storytale bash
    - переходим в папку /www/
    - выполняем команду: composer install
    - выходим из контейнера: exit

5) Наблюдаем в браузере http://localhost:7004
