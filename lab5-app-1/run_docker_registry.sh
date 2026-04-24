#Build, tagowanie, push do rejestru, usunięcie lokalne, pobranie z rejestru

docker build -t lab-app:v2 ./app
docker build -t lab-nginx:v2 ./nginx

docker tag lab-app:v2 rakockiw/lab-app:v2

docker tag lab-nginx:v2 rakockiw/lab-nginx:v2

docker push rakockiw/lab-app:v2
docker push rakockiw/lab-nginx:v2

docker rmi rakockiw/lab-app:v2
docker rmi rakockiw/lab-nginx:v2

docker pull rakockiw/lab-app:v2
docker pull rakockiw/lab-nginx:v2