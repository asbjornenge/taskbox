import React from 'react'

var fs = require('fs')
var pony = fs.readFileSync(__dirname+'/graphics/pony.png','base64')

export default class Logo extends React.Component {
    render() {
        return (
            <div className="Logo">
                <img src={`data:image/png;base64,${pony}`} />
            </div>
        )
    }
}
