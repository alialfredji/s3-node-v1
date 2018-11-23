/* eslint-disable */
import React from 'react'

class Download extends React.PureComponent {
    state = {
        value: '',
        image: null,
    }

    onChangeHandler = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    downloadHandler = async () => {
        if (this.state.value === '') {
            this.setState({ error: 'please provide a file name' })
        }

        this.setState({
            image: `http://localhost:8080/api/v1/download/default/${this.state.value}`,
        })
    }

    render () {
        return (
            <div>
                <h3>Download a file:</h3>
                <input
                    value={this.state.value}
                    onChange={this.onChangeHandler}
                    placeholder={'type file name'}
                />
                <button onClick={this.downloadHandler}>Download</button>
                <br />
                <br />
                {this.state.image ? <img  src={this.state.image} alt={'img'} style={{ width: 50 }}/> : null }
            </div>
        )
    }
}

export default Download
