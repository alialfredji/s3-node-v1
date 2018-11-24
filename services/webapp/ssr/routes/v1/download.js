const express = require('express')
const sharp = require('sharp')
const fileType = require('file-type')

const s3Service = require('../../services/s3')

const createDownloadRouter = () => {
    const router = express.Router()

    router.get('/:file_key', async (req, res, next) => {
        try {
            const file = await s3Service.downloadFile(req.params.file_key)

            res.send(file.Body)
        } catch (err) {
            res.status(400).send({
                success: false,
                err,
            })
        }
    })

    router.get('/:file_size/:file_key', async (req, res, next) => {
        try {
            // get resized file
            const file = await s3Service.downloadFile(req.params.file_key, req.params.file_size)
            res.send(file.Body)
        } catch (err) {
            // not found
            if (err.statusCode === 404) {
                try {
                    // get default image and prepare for resize
                    const file = await s3Service.downloadFile(req.params.file_key)

                    // // resize file
                    const size = () => {
                        switch (req.params.file_size) {
                            case 'small': return 50
                            case 'medium': return 100
                            case 'big': return 150
                            default: return 150
                        }
                    }

                    const resizedBuffer = await sharp(file.Body)
                        .resize(size())
                        .toBuffer()

                    // upload resized file
                    const type = fileType(resizedBuffer)
                    const key = `${req.params.file_key}`
                    const contentType = type.mime

                    await s3Service.upload({
                        buffer: resizedBuffer,
                        key,
                        contentType,
                    }, req.params.file_size)

                    // send resized file
                    res.send(resizedBuffer)
                } catch (error) {
                    res.status(404).send({
                        success: false,
                        error,
                    })
                }
            } else {
                res.status(400).send({
                    success: false,
                    error: err,
                })
            }
        }
    })

    return router
}

module.exports = {
    createDownloadRouter,
}
