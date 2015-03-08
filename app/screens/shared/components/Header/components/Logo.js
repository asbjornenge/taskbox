import React from 'react'
import pony  from '../graphics/pony.png'

export default class Logo extends React.Component {
    render() {
        return (
            <div className="Logo" onClick={this.onClick.bind(this)}>
                <img src={pony} />
            </div>
        )
    }
    onClick() {
        this.props.flux.getActions('nav').navigate('/settings')
    }
}
