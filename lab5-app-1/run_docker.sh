#Uruchomienie kontenerów

docker rm -f nginx-proxy api-a api-b 2>/dev/null || true
docker network rm front-net
docker network rm back-net


docker network create front-net
docker network create back-net

docker volume create items-data

docker run -d \
  --name api-a \
  -e INSTANCE_ID=api-a \
  --network back-net \
  -v items-data:/data \
  rakockiw/lab-app:v2

docker run -d \
  --name api-b \
  -e INSTANCE_ID=api-b \
  --network back-net \
  -v items-data:/data \
  rakockiw/lab-app:v2

docker run -d \
  --name nginx-proxy \
  --network front-net \
  -p 80:80 \
  rakockiw/lab-nginx:v2

docker network connect back-net nginx-proxy