import React     from 'react'
import moment    from 'moment'
import DayPicker from 'react-day-picker'

export default class DatePicker extends React.Component {
    render() {
        return (
            <div className="DatePicker OverlayMenu">
                <div className="shader"></div>
                <div className="inner" ref="datePickerInner" onClick={this.closeDatePicker.bind(this)}>
                    <div className="centerbox">
                        <div className="info">Postpone {this.props.task.name}</div>
                        <div className="selectorbox">
                            <DayPicker onDayClick={this.handleDayClick.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    closeDatePicker(e) {
        if (e.target == this.refs.datePickerInner)
            return this.props.stateSetter({ showDatePicker : false })
    }
    handleDayClick(e, day, modifiers) {
        let until = parseInt(moment(day).startOf('day').add(7,'hours').format('x'))
        this.props.postponeTask(this.props.task, until)
    }
    keyDown(e) {
        if ([37,38,39,40,13].indexOf(e.which) >= 0)
            e.stopPropagation()
//        switch(e.which) {
//        }
    }
    componentDidMount() {
        this.onKeyDown = this.keyDown.bind(this)
        document.body.addEventListener('keydown', this.onKeyDown)
    }
    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeyDown)
    }
}
