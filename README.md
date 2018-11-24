# Readme

This is a template project for uploading and downloading images from an S3 bucket.

## Package.json and running project

Package.json contains all the scripts you can run. Below you find a couple of them.

## Running project in development

`yarn start:dev:api` to run server
`yarn start` to run client

Client will be served on `port 3000`
Server will be served on `port 8080`

## Running project in production

`yarn start:prod` to run client and server

Project will be served on `port 8080`

## Needed Node modules

- `aws-sdk` amazons own node client sdk
- `file-type` get file type ex. jpg, pdf
- `multiparty` - extrac files from `content-type: form-data`

## Required enviroment variables

`AWS_ACCESS_KEY`
`AWS_SECRET_ACCESS_KEY`
`AWS_REGION`
`AWS_S3_BUCKET_NAME`

Create a `.env.local` and specify your credentials their. When the server boot it will pick up the variables and pass them down to your `AWS S3 Client`

## Create an S3 bucket

In order to be able to upload/download images you need to have a S3 bucket ready. There is alot of tutorials online. The beginning of this video explains to you how you should proceed: https://www.youtube.com/watch?v=KIltfPRpTi4

## Upload an image 

From the client you can choose an image from your device or computer and upload it. The image downloaded after uploading. You will also be informed about the `fileKeyName` for future download.

## Download an image

Target api to download the default image: `localhost:8080/api/v1/download/${fileKey}`

Target api to download a resized image: `localhost:8080/api/v1/download/${fileSize}/${fileKey}`

Allowed sizes: `small, medium, big`. If you download the project you can configure them the way you want.

## Downloading images using Cloudfront

You basically need to understand how Cloudfront works. Here you you have a tutorial: https://www.youtube.com/watch?v=KIltfPRpTi4

Be sure to configure the Cloudfront distribution to target the server, in other words you need to specify a `costum-origin` for you distribution. Else if you target your S3 bucket you need to specify a Read policy.