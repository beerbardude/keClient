'use strict'
const localIndex = "http://localhost:8008/src/index.html"


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

    /**
     * shows a known error with its worklogs
     * @param knownErrorId
     */
    onShowDetailError(knownErrorId){
        let view = this.view
        this.view.hideAddButton()
        let stats = this.store.getStats()
        this.store.getKnownErrorById(knownErrorId)
        .then((worklog) => {
            console.log("worklog", worklog)
            view.renderDetailErrors(worklog, knownErrorId, stats)
        }).catch(view.renderError.bind(view))

    }


    /**
     * adda a known error by calling the store add known error function
     * @param knownError
     */
    onAddKnownError(knownError){
        this.store.addKnownError(knownError)
    }

    /**
     * adds a worklog by calling the store add worklog function
     * @param worklog
     */
    onAddWorklog(worklog) {
        this.store.addWorklog(worklog)
    }

    /**
     * reloads the page by setting the window location to the index.html
     */
    onHomeButtonClick() {
        window.location.replace(localIndex)
    }

    /**
     * gets the search results by calling the store getSearchResults function
     * @param searchString
     */
    onSearchFieldClick(searchString) {
        this.store.getSearchResults(searchString)
            .then(this.view.renderKnownErrors.bind(this.view))
            .catch(this.view.renderError.bind(this.view))
    }

}