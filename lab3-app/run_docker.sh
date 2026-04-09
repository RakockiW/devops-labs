docker stop nginx-proxy app 2>/dev/null || true
docker rm nginx-proxy app 2>/dev/null || true
docker network rm lab3-network 2>/dev/null || true


docker network create lab3-network
docker build -t lab-app:1.0 ./app/
docker build -t lab-nginx:1.0 ./nginx/

docker run -d \
    --name app \
    --network lab3-network \
    lab-app:1.0

docker run -d \
    --name nginx-proxy \
    --network lab3-network \
    -p 80:80 \
    lab-nginx:1.0