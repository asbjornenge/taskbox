import React from 'react'
import pony  from './graphics/pony.png'
import style from './logo.styl'

export default class Logo extends React.Component {
    render() {
        return (
            <div className="Logo">
                <style>{style}</style>
                <img src={pony} />
            </div>
        )
    }
}
