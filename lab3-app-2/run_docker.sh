#Uruchomienie kontenerów

docker stop nginx-proxy api-a api-b 2>/dev/null || true
docker rm nginx-proxy api-a api-b 2>/dev/null || true
docker network rm lab3-network 2>/dev/null || true

docker network create lab3-network

docker run -d \
    --name api-a \
    -e INSTANCE_ID=api-a \
    --network lab3-network \
    rakockiw/lab-app:v1

docker run -d \
    --name api-b \
    -e INSTANCE_ID=api-b \
    --network lab3-network \
    rakockiw/lab-app:v1

docker run -d \
    --name nginx-proxy \
    --network lab3-network \
    -p 80:80 \
    rakockiw/lab-nginx:v2