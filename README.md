# URL shortener app
-----

## Start

npm start

-----
## Usage

### Create redirect

Redirects from /surl to www.google.com
#### custom url
REQEST
curl -X POST http://localhost:3000/www.google.com?shortUrl=surl
RESPONSE
surl

#### random url
REQUEST
curl -X POST http://localhost:3000/www.google.com
RESPONSE
generated url