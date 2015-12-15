import { Store } from 'flummox'
import Immutable from 'immutable'

let config = JSON.parse(localStorage.getItem('config')) || {}

export default class SettingStore extends Store {
    constructor(flux) {
        super()

        let settingsActions = flux.getActions('settings')
        this.register(settingsActions.save, this.handleSave)
        
        this.state = {
            firebase : Immutable.fromJS(config.firebase)
        } 
    }
    handleSave(settings) {
        localStorage.setItem('config', JSON.stringify(settings))
        this.setState({ firebase : Immutable.Map().merge(settings.firebase) })
    }
}
