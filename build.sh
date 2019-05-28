set -e

npm install
npm run build
docker build -t ptushki-fe .
docker tag ptushki-fe:latest ptushkiregistry.azurecr.io/ptushki-fe:latest
docker login ptushkiregistry.azurecr.io
docker push ptushkiregistry.azurecr.io/ptushki-fe:latest