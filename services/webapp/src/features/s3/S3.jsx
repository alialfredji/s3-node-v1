
import React from 'react'

import Upload from './Upload'
import Download from './Download'

import DownloadResized from './DownloadResized'

const S3 = () => {
    return (
        <div>
            <Upload />
            <br />
            <Download />
            <br />
            <DownloadResized />
        </div>
    )
}

export default S3
