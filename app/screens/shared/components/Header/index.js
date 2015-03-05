import React from 'react'
import Logo  from './components/Logo'

export default class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <Logo />
            </div>
        )
    }
}
