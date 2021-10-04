# URL shortener app
-----

## Инструкция по запуску

В качестве базы данных используется mongodb \
Перед запуском приложения необходимо создать .env фаил с переменной MONGODB_URI={строка для подключения к mongodb} \
npm start - для запуска приложения \
npm run test - для запуска тестов

## Prerequisites

before starting app create .env file and create MONGODB_URI variable with connection to mongodb url

## Scripts

npm start - to start the app \
npm run test - to start tests

-----
## Usage

### Create redirect
#### custom url
REQEST \
curl -X POST -H "Content-Type: application/json" --data '{"url": "www.google.com", "shortUrl": "url"}' http://localhost:3000/ \
RESPONSE \
JSON {"shortUrl": "url"} \
or \
if shortUrl provided already exists \
JSON {"shortUrl": "url", "updated": updated item info}

after that if you visit page with endpoint /url you will be redirected to https://www.google.com


#### random url
REQUEST \
curl -X POST -H "Content-Type: application/json" --data '{"url": "www.google.com"}' http://localhost:3000/ \
RESPONSE \
generated short url

after that if you visit page with endpoint /{generated short url} you will be redirected to https://www.google.com
