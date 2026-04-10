#Uruchomienie kontenerów

docker stop nginx-proxy app 2>/dev/null || true
docker rm nginx-proxy app 2>/dev/null || true
docker network rm lab3-network 2>/dev/null || true

docker network create lab3-network

docker run -d \
    --name app \
    -e INSTANCE_ID=app \
    --network lab3-network \
    rakockiw/lab-app:v1

docker run -d \
    --name nginx-proxy \
    --network lab3-network \
    -p 80:80 \
    rakockiw/lab-nginx:v1
