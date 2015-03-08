import { Flummox }       from 'flummox'
import SettingStore      from './stores/Settings'
import SettingsActions   from './actions/Settings'
import NavigationActions from './actions/Navigation'

export default class Flux extends Flummox {
    constructor() {
        super()
        this.createActions('nav', NavigationActions)
        this.createActions('settings', SettingsActions)
        this.createStore('settings', SettingStore, this)
    }
}
