import React         from 'react'
import Router        from 'tiny-react-router'
import FluxComponent from 'flummox/component'
import Flux          from './flux'
import TaskBox       from './screens/TaskBox'

let flux = new Flux()
let routes = {
    '/' : TaskBox,
}

React.render(
    <FluxComponent flux={flux}>
        <Router routes={routes} />
    </FluxComponent>, 
    document.body
)

