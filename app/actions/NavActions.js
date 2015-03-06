import { Actions } from 'flummox'

export default class NavActions extends Actions {
    navigate(path) {
        window.location.hash = '#'+path
    }
}
