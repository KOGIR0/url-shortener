# URL shortener app
-----

## Start

before starting app create .env file and create MONGODB_URI variable
npm start

-----
## Usage

### Create redirect

Redirects from /surl to www.google.com
#### custom url
REQEST
curl -X POST -H "Content-Type: application/json" --data '{"url": "www.google.com", "shortUrl": "url"}' http://localhost:3000/
RESPONSE
url

#### random url
REQUEST
curl -X POST -H "Content-Type: application/json" --data '{"url": "www.google.com"}' http://localhost:3000/
RESPONSE
generated url