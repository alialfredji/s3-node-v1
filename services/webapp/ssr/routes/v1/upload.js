const express = require('express')
const multiparty = require('multiparty')
const fs = require('fs')
const fileType = require('file-type')

const s3Service = require('../../services/s3')

const createUploadRouter = () => {
    const router = express.Router()

    router.post('/', [
        async (req, res, next) => {
            const form = new multiparty.Form()
            form.parse(req, async (error, fields, files) => {
                if (error) throw new Error(error)
                try {
                    const buffer = fs.readFileSync(files.file[0].path)
                    const type = fileType(buffer)
                    const key = `${Date.now().toString()}-lg.${type.ext}`
                    const contentType = type.mime

                    await s3Service.upload({ buffer, key, contentType })

                    res.send({
                        success: true,
                        data: {
                            key,
                            url: `http://localhost:8080/api/v1/download/${key}`,
                        },
                    })
                } catch (error) {
                    throw new Error(`Form parse: ${error}`)
                }
            })
        },
    ])

    return router
}

module.exports = {
    createUploadRouter,
}
