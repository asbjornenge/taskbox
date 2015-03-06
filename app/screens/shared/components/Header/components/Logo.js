import React from 'react'
import pony  from '../graphics/pony.png'

export default class Logo extends React.Component {
    render() {
        return (
            <div className="Logo">
                <img src={pony} />
            </div>
        )
    }
}
