# Coords-Parse

Rest-api server that uses [ExifReader](https://github.com/mattiasw/ExifReader) to extract coordinates from images.

**Compatibale image formats**

| File type | Exif    | IPTC    | XMP     | ICC     | Thumbnail |
| --------- | ------- | ------- | ------- | ------- | --------- |
| JPEG      | **yes** | **yes** | **yes** | **yes** | **yes**   |
| TIFF      | **yes** | **yes** | **yes** | **yes** | no        |
| PNG       | no      | no      | **yes** | no      | no        |
| HEIC/HEIF | **yes** | no      | no      | **yes** | no        |
| WebP      | **yes** | no      | **yes** | **yes** | **yes**   |

## Installation

```bash
docker-compose up
```

## Usage

After docker container will successfully run.\
There is rest-api running on port `3000`.

### Available logins:

email: `info@martin.com`\
password: `password12345`

### REST API Usage

Before accessing rest api on paths below, make sure you import Authorization header and Content-Type header set to application/json and when creating new image, make sure u import Content-Type header in this form: `multipart/form-data; boundary=<calculated when request is sent>`.

`OAuth Token` can be obtained by POST request to `/user/login`.

```
Authorization: Bearer OAUTH-TOKEN
Content-Type: application/json
```

### Available requests:

`GET`, `POST`, `DELETE`

### Available routes:

`/user`\
`/images`

### [Postman Collection export](coords-parse.postman_collection.json)

These can be used alone like this:

| route     | description                          |
| :-------- | :----------------------------------- |
| `/images` | returns an json object of all images |

Or can be used in conjunction with identifiers to retrieve the metadata for that identifier:

| route         | description                                  |
| :------------ | :------------------------------------------- |
| `/images/:ID` | returns an Image represented by specified ID |

##### Request example:

```json
{
    "url": "http://localhost:3000/images",
    "method": "POST",
    "header": [
        {
            "key": "Content-Type",
            "value": "application/json",
            "type": "text"
        },
        {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiYXRtYW5AZXhhbXBsZS5jb20iLCJpYXQiOjE1OTMzNzY3NzUsImV4cCI6MTU5MzM3NzY3NX0.DC0jSEALen_y9BIOSOzQkuvqNig-v4F8Axm_7yqgVik",
            "type": "text"
        }
    ],
    "body": {
        "mode": "formdata",
        "formdata": [
            {
                "key": "image",
                "type": "file",
                "src": "/Users/martinalbert/Desktop/image.jpeg"
            }
        ]
    }
}
```

##### Response example:

```json
{
    "dto": [
        {
            "id": 1,
            "fileName": "image.jpeg",
            "latitude": 45.2334,
            "longitude": 15.2233,
            "altitude": 433,
            "user": 1,
            "updatedAt": "2020-06-28T21:11:54.000Z",
            "createdAt": "2020-06-28T21:11:54.000Z"
        }
    ]
}
```

#### Other routes:

| route            | description                                                        |
| :--------------- | :----------------------------------------------------------------- |
| `/user/login`    | returns JWT token in which are encrypted ID and email of the User. |
| `/user/register` | encrypts password and creates new record of User                   |

##### Request example:

```json
{
    "url": "http://localhost:3000/user/login",
    "method": "POST",
    "header": [
        {
            "key": "Content-Type",
            "type": "text",
            "value": "application/json"
        }
    ],
    "body": {
        "email": "info@martin.com",
        "password": "password12345"
    }
}
```

##### Response example:

```json
{
    "dto": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiYXRtYW5AZXhhbXBsZS5jb20iLCJpYXQiOjE1OTMzOTEzMDAsImV4cCI6MTU5MzM5MjIwMH0.CX-5nO6OXChIh4c69dPFNxd-JBlcr5KbHnr1dgO0u6s"
}
```

### Seeded data

I have created [module](server/src/db/sampleData.ts) for sample data and [function](server/src/db/repos/postgres/seed.ts) that seeds these sample data after successful connection to database.

### Enviroment variables

There are enviroment variables that represent information about url where rest-api resides, its port, database information for establishing connection and JWT secret for User authentication.
If they're not set, values from [config](server/src/config.ts) will be assigned.
