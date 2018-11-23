import React from 'react'
import { Route } from 'react-router-dom'

import { S3 } from 'features/s3'

export default (props) => (
    <div>
        <Route path="/" component={S3} />
    </div>
)
