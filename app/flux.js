import { Flummox } from 'flummox'
import FormStore   from './stores/FormStore'
import FormActions from './actions/FormActions'
import NavActions  from './actions/NavActions'

export default class Flux extends Flummox {
    constructor() {
        super()
        this.createActions('nav', NavActions)
        this.createActions('forms', FormActions)
        this.createStore('forms', FormStore, this)
    }
}
