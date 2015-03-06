import React    from 'react'
import listIcon from '../graphics/list.png'

export default class Header extends React.Component {
    render() {
        return (
            <div className="TaskBoxLink screenLink">
                <img src={listIcon} />
            </div>
        )
    }
}
