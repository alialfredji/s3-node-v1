/* eslint-disable */
import React from 'react'

class Download extends React.PureComponent {
    state = {
        fileName: '1542814172825-lg.jpg',
        fileSize: 'small',
        image: null,
    }

    onChangeHandler = (e, field) => {
        this.setState({
            [field]: e.target.value,
        })
    }

    downloadHandler = async () => {
        if (this.state.fileName === '') {
            this.setState({ error: 'please provide a file name' })
        }

        this.setState({
            image: `http://localhost:8080/api/v1/download/${this.state.fileSize}/${this.state.fileName}`,
        })
    }

    render () {
        return (
            <div>
                <h3>Download Resized image:</h3>
                <input
                    name={'file'}
                    value={this.state.fileName}
                    onChange={(e) => this.onChangeHandler(e, 'fileName')}
                    placeholder={'type file name'}
                />
                <select
                    name="size"
                    value={this.state.fileSize}
                    onChange={(e) => this.onChangeHandler(e, 'fileSize')}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="big">Big</option>
                </select>
                <br />
                <br />
                <button onClick={this.downloadHandler}>Download</button>
                <br />
                <br />
                {this.state.image ? <img  src={this.state.image} alt={'img'} style={{ width: 50 }}/> : null }
            </div>
        )
    }
}

export default Download
