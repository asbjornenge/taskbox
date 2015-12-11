import React       from 'react'
import t           from 'tcomb-form'
import { connect } from 'react-redux'
import Header      from '../shared/components/Header'

let Form = t.form.Form
let FirebaseForm = t.struct({
    url    : t.Str,
    secret : t.Str 
})

class Settings extends React.Component {
    render() {
        return (
            <div className="Settings">
                <Header />
                <div className="ContentView">
                    <div className="FormLabel">Firebase</div>
                    <Form ref="firebaseform" type={FirebaseForm} value={this.props.config} />
                    <button onClick={this.onSave.bind(this)}>Save</button>
                </div>
            </div>
        )
    }
    onSave() {
        let value = this.refs.firebaseform.getValue()
        if (!value) return
        this.props.dispatch({
            type   : 'SET_CONFIG',
            config : value
        })
    }
}

export default connect((state) => {
    return { config : state.config }    
})(Settings)
