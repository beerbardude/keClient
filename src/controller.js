'use strict'

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
        view.registerShowWorklogDetailHandler(this.onShowWorklogDetail.bind(this))
        view.registerAddWorklogClick(this.onAddWorklog.bind(this))

    }


    onAddKnownError(knownError){
        this.store.addKnownError(knownError)
    }


    onShowDetailError(knownErrorId){
        //let detail = new Detail(this.view, this.store, knownErrorId)
        // todo : resolve promise
        let view = this.view
        // console.log(view)
        this.store.getKnownErrorById(knownErrorId)
        .then((kn) => {
            //console.log("kn", kn)
            view.renderDetailErrors(kn)
        }).catch(view.renderError.bind(view))

        // todo: OR get promise value
        // let detError = this.store.getKnownErrorById(knownErrorId)
        // let stats = this.store.getStats()
        //                 .then(this.view.renderStats.bind(this.view))
        //                 .catch(view.renderError.bind(view))

        //this.view.renderDetailErrors(detError, stats)

        // todo : worklogs
        let worklogs = 1
            //this.store.getWorklogsFromKnownError(knownErrorId)
        this.view.showWorklogs(worklogs)
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
}