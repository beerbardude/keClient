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

        view.registerAddKnownErrorHandler(this.onAddKnownError.bind(this))
        view.registerShowDetailErrorHandler(this.onShowDetailError.bind(this))
        view.registerShowWorklogDetailHandler(this.onShowWorklogDetail.bind(this))
    }


    onAddKnownError(knownError){
        console.log(knownError)
        this.store.addKnownError(knownError)

    }

    //todo : load error detail and worklogs
    onShowDetailError(knownError){
        let detailError = this.store.getKnownErrorDetails(knownError)
        this.view.showDetailError(detailError)
        let worklogs = this.store.getWorklogsFromKnownError(knownError)
        this.view.showWorklogs(worklogs)
    }

    // todo: load worklog details
    onShowWorklogDetail(worklog) {
        let worklogDetail = this.store.getWorklogDetails(worklog)
        this.view.showWorklogDetail(worklog)
    }


}