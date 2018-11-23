
const AWS = require('aws-sdk')

let client = null
let config = null

const init = (__config = {}) => {
    // console.log('**** S3 INIT')
    config = __config
}

const start = () => {
    // console.log('**** S3 START CLIENT')
    client = new AWS.S3({
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        region: config.REGION,
    })
}

const upload = async (file, size = 'default') => {
    // console.log('**** S3 Upload file:', file)

    const params = {
        Body: file.buffer,
        Bucket: config.BUCKET_NAME,
        ContentType: file.contentType,
        Key: `${size}/${file.key}`,
    }

    await client.upload(params).promise()
}

const downloadFile = (key, size = 'default') => new Promise((resolve, reject) => {
    // console.log('**** S3 Download file:', key)

    const params = {
        Bucket: config.BUCKET_NAME,
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
