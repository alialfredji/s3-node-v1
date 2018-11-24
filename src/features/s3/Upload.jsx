/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'

import { uploadFile } from './s3-service'

const styles = {
    wrapper: {},
    img: {
        width: 50,
        height: 50,
    },
    flex: {
        display: 'flex',
    },
}

const mapState = () => ({})

const mapDispatch = {
    uploadFile,
}

class UploadS3 extends React.PureComponent {
    state = {
        value: null,
        uploadImageUrl: null,
    }

    handleChange = async (e) => {
        e.preventDefault()

        this.setState({
            value: URL.createObjectURL(e.target.files[0]),
        })

        const formData = new FormData()
        formData.append('file', e.target.files[0])
        const data = await this.props.uploadFile(formData)

        this.setState({
            fileKey: data.key,
            uploadImageUrl: data.url,
        })
    }

    render () {
        return (
            <div style={styles.wrapper}>
                <h3>Upload a file:</h3>
                <input type={'file'} onChange={this.handleChange}/>
                <br />
                <div style={styles.flex}>
                    <p>Optimistic image: </p>
                    {this.state.value ? <img src={this.state.value} style={styles.img} alt={'hello'}/> : null}
                </div>
                <div style={styles.flex}>
                    <p>Downloaded image: </p>
                    {this.state.uploadImageUrl ? <img src={this.state.uploadImageUrl} style={styles.img} alt={'hello'}/> : null}
                </div>
                {this.state.fileKey
                    ? <p>File Key: {this.state.fileKey}</p> 
                    : null
                }
            </div>
        )
    }
}

export default connect(mapState, mapDispatch)(UploadS3)
