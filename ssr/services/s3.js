
const AWS = require('aws-sdk')

let client = null
let config = null

const init = (__config = {}) => {
    config = __config
}

const start = () => {
    client = new AWS.S3({
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        region: config.AWS_REGION,
    })
}

const upload = async (file, size = 'default') => {
    const params = {
        Body: file.buffer,
        Bucket: config.AWS_S3_BUCKET_NAME,
        ContentType: file.contentType,
        Key: `${size}/${file.key}`,
    }

    await client.upload(params).promise()
}

const downloadFile = (key, size = 'default') => new Promise((resolve, reject) => {
    const params = {
        Bucket: config.AWS_S3_BUCKET_NAME,
        Key: `${size}/${key}`,
    }

    const callback = (err, data) => err
        ? reject(err)
        : resolve(data)

    return client.getObject(params, callback)
})

module.exports = {
    init,
    start,
    upload,
    downloadFile,
}
