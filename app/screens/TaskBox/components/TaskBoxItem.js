import React  from 'react'
import moment from 'moment'
import nav    from '../../shared/utils/nav'

export default class TaskBoxItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            x : 0
        }
    }
    render() {
        var classes = 'TaskBoxItem'
        if (this.props.selected) classes += ' selected'
        let date = moment(this.props.task.date).format('MMM Do')
        let x = this.state.x == 0 ? 'none' : 'translateX('+this.state.x+'px)'
        let style = { 'transform' : x }
        return (
            <div className={classes} ref="node"
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
                onTouchMove={this.onTouchMove.bind(this)}
                onClick={nav.navigate.bind(undefined, `/taskbox/${this.props.task.id}`)}>
                    <div style={style}>
                        <div className="date">{date}</div>
                        <div className="name">{this.props.task.name}</div>
                        <div className="summary">{this.props.task.summary}</div>
                    </div>
            </div>
        )
    }
    onTouchMove(e) {
        if (this.props.scrolling) return
        let touch = e.targetTouches[0]
        let offset = touch.clientX - this.startX
        if (Math.abs(offset) < 15) return
        this.setState({ x : offset })
    }
    onTouchStart(e) {
        if (this.props.scrolling) return
        let touch = e.targetTouches[0]
        this.startX = touch.clientX
    }
    onTouchEnd(e) {
        if (this.state.x < -130) this.props.handleSwipeLeft(this.props.task, this.props.index)
        if (this.state.x >  130) this.props.handleSwipeRight(this.props.task) 
        this.startX = 0
        this.setState({ x : 0 })
    }
}
