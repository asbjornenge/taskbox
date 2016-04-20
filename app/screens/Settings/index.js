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
        let accounts = (config.nylasAccounts || []).map((account,index) => {
          return (
            <div key={account.access_token+index} className="nylasAccount">
              <span>{account.email_address}</span><button onClick={this.revokeAccount.bind(this, account)}>Remove</button>
            </div>
          )
        })
        return (
            <div className="Settings">
                <style>{settingStyle}</style>
                <div className="ContentView">
                    <div className="formSection">
                      <h2>Email Accounts</h2>
                      {accounts}
                      <button onClick={this.addAccount}>Add Email Account</button>
                      <h2>Self hosted Nylas</h2>
                      <Form ref="nylasform" type={NylasForms} value={value.nylasForms} />
                    </div>
                    <div className="formSection">
                      <h2>Replication</h2>
                      <Form ref="replicationform" type={ReplicationForm} value={value} />
                    </div>
                    <button onClick={this.onSave.bind(this)}>Save</button>
                </div>
            </div>
        )
    }
    addAccount() {
      let cb = window.location.origin+'/'
      let nylasuri = `https://api.nylas.com/oauth/authorize?client_id=1ulh7xs322z1ewk5k41rsb0mt&response_type=token&scope=email&redirect_uri=${cb}`
      window.location.href = nylasuri
    }
    revokeAccount(account) {
      // method  POST
      // endpoints https://api.nylas.com/oauth/revoke
      // authentication  Access Token as HTTP Basic Auth username
      let nylasAccounts = this.props.config.nylasAccounts.filter(a => a.email_address != account.email_address)
      let value = assign({}, this.props.config, { nylasAccounts : nylasAccounts })
      this.props.dispatch({
          type   : 'SET_CONFIG',
          config : value
      })
    }
    onSave() {
        let fbvalue = this.refs.replicationform.getValue()
        let nylasvalue = this.refs.nylasform.getValue()
        let value = assign({}, fbvalue, { nylasForms: nylasvalue, nylasAccounts: this.props.config.nylasAccounts })
        this.props.dispatch({
            type   : 'SET_CONFIG',
            config : value
        })
    }
}

export default connect((state) => {
    return { config : state.config }    
})(Settings)
