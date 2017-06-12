'use strict'

export default class {
    constructor(view, store){
        this.view = view
        this.store = store

        this.store.getKnownErrors()
            .then(view.renderKnownErrors.bind(view))
            .catch(view.renderError.bind(view))


        this.store.getStats()
            .then(view.renderStats.bind(view))
            .catch(view.renderError.bind(view))

        this.store.getNames()
            .then(view.renderNames.bind(view))
            .catch(view.renderError.bind(view))

        this.store.getCategories()
            .then(view.renderCategories.bind(view))
            .catch(view.renderError.bind(view))


        console.log(view)
        //view.registerAddItemHandler(this.onAddItem.bind(this))

        view.registerAddKnownErrorHandler(this.onAddKnownError.bind(this))
    }


    onAddKnownError(knownError){
        console.log(knownError)
        this.store.addKnownError(knownError)

    }

    loadNames() {
        this.store.getNames()
    }

}