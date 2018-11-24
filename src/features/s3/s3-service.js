
// import { queries, runQuery } from 'lib/graphql'
import request from 'superagent'

export const uploadFile = (file) => async (dispatch, getState) => {
    const res = await request
        .post(getState().ssr.apiUrl('/v1/upload'))
        .send(file)

    return res.body.success
        ? res.body.data
        : {}
}

