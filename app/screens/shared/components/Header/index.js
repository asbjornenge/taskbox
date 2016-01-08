import React         from 'react'
import Svg           from '@asbjornenge/react-svg'
import style         from './header.styl'
import addIcon       from '../../graphics/svg/tool1067.svg'
import taskboxIcon   from '../../graphics/taskbox.png'
import nav           from '../../utils/nav'

export default class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <style>{style}</style>
                <div className="logo" onClick={this.logoClick.bind(this)}>
                    <img src={taskboxIcon} />
                </div>
                <div className="screentitle">
                    {this.getScreenTitleFromPath()}
                </div>
                <div className="adder" onClick={this.addClick.bind(this)}>
                    <Svg svg={addIcon} />
                </div>
            </div>
        )
    }
    getScreenTitleFromPath() {
        // TODO: Change title depending on window.location.hash
        return 'Taskbox'
    }
    addClick() {
        this.props.emitter.trigger('addclick')
    }
    logoClick() {
        this.props.emitter.trigger('logoclick')
    }
}
