import React        from 'react'
import t            from 'tcomb-form'
import { connect }  from 'react-redux'
import assign       from 'object.assign'
import settingStyle from './settings.styl'

let Form = t.form.Form
let ReplicationForm = t.struct({
    replicationUrl    : t.Str,
})
let NylasForm = t.struct({
    nylasUrl   : t.Str,
    nylasToken : t.Str
})
let NylasForms = t.list(NylasForm)

class Settings extends React.Component {
    render() {
        let config = this.props.config || {}
        let value = {
          replicationUrl : config.replicationUrl,
          nylasForms : config.nylasForms || []
        }
        if (config.nylasToken) {
          value.nylasForms.push({
            nylasUrl : config.nylasUrl,
            nylasToken : config.nylasToken
          })
        }
        return (
            <div className="Settings">
                <style>{settingStyle}</style>
                <div className="ContentView">
                    <Form ref="replicationform" type={ReplicationForm} value={value} />
                    <Form ref="nylasform" type={NylasForms} value={value.nylasForms} />
                    <button onClick={this.onSave.bind(this)}>Save</button>
                </div>
            </div>
        )
    }
    onSave() {
        let fbvalue = this.refs.replicationform.getValue()
        let nylasvalue = this.refs.nylasform.getValue()
        let value = assign({}, fbvalue, { nylasForms : nylasvalue })
        this.props.dispatch({
            type   : 'SET_CONFIG',
            config : value
        })
    }
}

export default connect((state) => {
    return { config : state.config }    
})(Settings)
