'use strict'

const localIndex = "http://localhost:8008/src/index.html"

const getKnownErrorOfAllErrors = Symbol()


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

        view.registerAddKnownErrorHandler(this.onAddKnownError.bind(this))
        view.registerShowDetailErrorHandler(this.onShowDetailError.bind(this))
        view.registersaveWorklogClick(this.onAddWorklog.bind(this))

        view.registerOnHomeButtonClick(this.onHomeButtonClick.bind(this))
        view.registerSearchFieldClick(this.onSearchFieldClick.bind(this))
    }


    onAddKnownError(knownError){
        this.store.addKnownError(knownError)
    }


    /**
     * shows a known error with its worklogs
     * @param knownErrorId
     */
    onShowDetailError(knownErrorId){
        let view = this.view
        this.view.changeAddButtonText()
        let stats = this.store.getStats()
        this.store.getKnownErrorById(knownErrorId)
        .then((worklog) => {
            console.log("worklog", worklog)
            view.renderDetailErrors(worklog, knownErrorId, stats)
        }).catch(view.renderError.bind(view))

    }


    // todo: load worklog details
    onShowWorklogDetail(worklog) {
        let worklogDetail = this.store.getWorklogDetails(worklog)
        this.view.showWorklogDetail(worklog)
    }

    [getKnownErrorOfAllErrors](knownErrors, knownError) {
        return knownErrors.then(result => {
            result.forEach(value => {
                if(value.id == knownError.id) {
                    value
                }
            });
        }).catch(err => console.log("Error in get error of all known errors"))
    }

    onAddWorklog(worklog) {
        this.store.addWorklog(worklog)
    }

    onHomeButtonClick() {
        window.location.replace(localIndex)
    }

    onSearchFieldClick(searchString) {
        this.store.getSearchResults(searchString)
            .then(this.view.renderKnownErrors.bind(this.view))
            .catch(this.view.renderError.bind(this.view))
    }

}