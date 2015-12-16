import React from 'react'

let options = {
    basic : [
        { label : 'Later Today',  id : 'later_today'  },
        { label : 'This Evening', id : 'this_evening' },
        { label : 'Tomorrow',     id : 'tomorrow'     },
        { label : 'This Weekend', id : 'this_weekend' },
        { label : 'Next Week',    id : 'next_week'    },
        { label : 'In a month',   id : 'in_a_month'   },
        { label : 'Someday',      id : 'someday'      },
        { label : 'Pick date',    id : 'date'         }
    ]
}

export default class Postponer extends React.Component {
    render() {
        let selections = options.basic.map(opt => <div className="selection" key={opt.id}>{opt.label}</div>)
        return (
            <div className="Postponer">
                <div className="shader"></div>
                <div className="PostponerInner">
                    <div className="centerbox">
                        <div className="info">Postpone {this.props.task.name}</div>
                        <div className="selectorbox">
                            {selections}
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        document.body.addEventListener('keydown', (e) => {
            if (e.which == 37)
                e.stopPropagation()
        })
    }
}
