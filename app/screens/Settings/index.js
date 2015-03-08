import React  from 'react'
import t      from 'tcomb-form'
import Header from '../shared/components/Header'

export default class Settings extends React.Component {
    render() {
        let Form         = t.form.Form
        let FirebaseForm = this.buildFirebaseForm()
        return (
            <div className="Settings">
                <Header />
                <div className="ContentView">
                    <div className="FormLabel">Firebase</div>
                    <Form ref="firebase" type={FirebaseForm} value={this.props.firebase.toJS()} />
                    <button onClick={this.onSave.bind(this)}>Save</button>
                </div>
            </div>
        )
    }
    buildFirebaseForm() {
        return t.struct({
            url    : t.maybe(t.Str),
            secret : t.maybe(t.Str) 
        })
    }
    onSave() {
        this.props.flux.getActions('settings').save({
            firebase : this.refs.firebase.getValue()
        })
    }
}
