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
                <div className="screenLinks">
                    <div className="adder screenLink">
                        <Svg svg={addIcon} />
                    </div>
                </div>
                <div className="Logo" onClick={this.logoClick.bind(this)}>
                    <img src={taskboxIcon} />
                </div>
            </div>
        )
    }
    logoClick() {
        this.props.emitter.trigger('logoclick')
    }
}
