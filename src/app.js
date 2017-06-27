'use strict'

import View from './view'
import Store from './store'
import Controller from './controller'

const view = new View(window.document)
const store = new Store
const ctrl = new Controller(view, store)

