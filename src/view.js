'use strict'

const renderKnownError = Symbol()
const renderStat = Symbol()
const renderName = Symbol()
const renderCategory = Symbol()
const renderDetailError = Symbol()
const renderWorklogs = Symbol()
const renderWorklog = Symbol()
const onAddErrorClick = Symbol()
const onShowDetailClick = Symbol()
const onShowWorklogDetailClick = Symbol()
const onAddWorklogClick = Symbol()

export default class {
    constructor($doc){
        this.$doc = $doc
        this.$main = this.$doc.querySelector("main")
        this.$list = this.$doc.querySelector(".list-group")

        let $inputTitle = $doc.querySelector(".new-error-title")
        let $inputStatus = $doc.querySelector(".new-error-status")
        let $inputName = $doc.querySelector(".new-error-name")
        let $inputCategory = $doc.querySelector(".new-error-category")

        let $addButton = $doc.querySelector(".add-button")
        $addButton.addEventListener('click', this[onAddErrorClick].bind(this, $inputTitle, $inputStatus, $inputName, $inputCategory))

    }


    registerAddKnownErrorHandler(handler) {
        this.onAddKnownErrorHandler = handler
    }

    registerShowDetailErrorHandler(handler) {
        this.onShowDetailErrorHandler = handler
    }

    registerShowWorklogDetailHandler(handler) {
        this.onShowWorklogDetailClick = handler
    }

    registerAddWorklogClick(handler) {
        this.onAddWorklogClick = handler
    }


    [onAddErrorClick](event) {
        let title = arguments[0]
        let stat = arguments[1]
        let name = arguments[2]
        let cat = arguments[3]
        let knownError =  {
            title: title.value,
            status: stat.options[stat.selectedIndex].value,
            name: name.options[name.selectedIndex].value,
            category: cat.options[cat.selectedIndex].value
        }
        this.onAddKnownErrorHandler(knownError)
    }


    [onShowDetailClick](event) {
        let knownError =  {
            id: arguments[0]
        }
        this.onShowDetailErrorHandler(knownError)
    }

    [onShowWorklogDetailClick](event) {
        let worklog = {
            id: event.id
        }
        this.onShowWorklogDetailClick(worklog)
    }


    [onAddWorklogClick](event) {
        let id = arguments[0]
        let name = arguments[0].name
        let category = arguments[0].category
        let title = arguments[1].value
        let description = arguments[2].value

        let worklogRecord =  {
            id_known_error : id,
            title : title,
            description : description,
            name : name,
            category: category
        }
        this.onAddWorklogClick(worklogRecord)
    }

    /**
     * adds a known error to the error-list
     * @param {*a known error} knownError
     */
    addKnownError(knownError) {
        let $div = document.createElement('div')
        let html = this[renderKnownError](knownError)
        $div.innerHTML = html
        this.$list.appendChild($div.childNodes[0])
    }

    /**
     * renders all known errors
     * adds eventlistener to buttons
     * @param {*a known error} knownErrors 
     */
    renderKnownErrors(knownErrors){
        let $table = this.$doc.querySelector("table")
        $table.innerHTML = knownErrors.map(this[renderKnownError])

        let $tr = $table.querySelectorAll(".known-error")
        $tr.forEach(tr => {
            let knownErrorId = tr.querySelector(".known-error-id")
            let knownErrorTitle = tr.querySelector(".known-error-title")
            let knownErrorName = tr.querySelector(".known-error-name")
            let knownErrorStatus = tr.querySelector(".known-error-status")
            let knownErrorCategory = tr.querySelector(".known-error-category")
            let detailButton = tr.querySelector("a")
            detailButton.addEventListener('click', this[onShowDetailClick].bind(this,
                knownErrorId.innerHTML,
            knownErrorTitle.innerHTML,
            knownErrorName.innerHTML,
            knownErrorStatus.innerHTML,
            knownErrorCategory.innerHTML))
        })
    }

    /**
    * renders a known error
    * @param {*a known error} knownError 
    */
    [renderKnownError](knownError){
        return `<tr class="known-error">
                    <td class="known-error-id">${knownError.id}</td>
                    <td class="known-error-title"><a href="#">${knownError.title}</a></td>
                    <td class="known-error-name">${knownError.name}</td>
                    <td class="known-error-status">${knownError.status}</td>
                    <td class="known-error-category">${knownError.category}</td>
                </tr>`
    }

    /**
     * renders the statuses for selection
     * @param {*the statuses} stats 
     */
    renderStats(stats){
        let $statSelection = this.$doc.querySelector(".new-error-status")
        $statSelection.innerHTML = stats.map(this[renderStat])
    }

    /**
     * renders a status as option value for selection
     * @param {*a status} stat 
     */
    [renderStat](stat){
        return `<option value="${stat.id}">${stat.status}</option>`;
    }

    /**
     * renders categories for selection
     * @param {*categories} categories 
     */
    renderCategories(categories){
        let $categorySelection = this.$doc.querySelector(".new-error-category")
        $categorySelection.innerHTML = categories.map(this[renderCategory])
    }

    /**
     * renders a categorie as option value for selection
     * @param {*a category} category 
     */
    [renderCategory](category){
        return `<option value="${category.id}">${category.category}</option>`;
    }    

    /**
     * renders names for selection
     * @param {*names} names 
     */
    renderNames(names){
        let $nameSelection = this.$doc.querySelector(".new-error-name")
        $nameSelection.innerHTML = names.map(this[renderName])
    }

    /**
     * renders a name as option value for selection
     * @param {*a name} name 
     */
    [renderName](name){
        return `<option value="${name.id}">${name.name}</option>`;
    }

    // todo : get promise value working
    renderDetailErrors(detailError, stats) {
        //this.$doc.innerHTML = detailError.map(this[renderDetailError])
        detailError = {
            "id" : 124,
            "title": "Keine LTE Verbindung",
            "name": "author eins",
            "description" : "",
            "category" : "Mobile ID",
            "status" : "Pending"
        }

        let options = this[renderStat](stats)
        //todo : status selection richtige option anzeigen
        this.$main.innerHTML = this[renderDetailError](detailError, options)

        let $actualWorklogTitle = this.$main.querySelector(".actual-worklog-title")
        let $actualWorklogText = this.$main.querySelector(".actual-worklog-text")
        let $addWorkLogButton = this.$main.querySelector(".add-worklog")
        $addWorkLogButton.addEventListener('click', this[onAddWorklogClick].bind(this, detailError, $actualWorklogTitle, $actualWorklogText))
    }

    [renderDetailError](detailError, optionValues) {
        return `<div class="known-error-detail">
                    <table class="table">
                    <thead>
                        <tr>
                            <th>${detailError.title}</th>
                            <th><select class="new-error-status">
                                ${optionValues}
                                </select></th>
                            <th>${detailError.name}</th>
                            <th>${detailError.category}</th>
                        </tr>
                    </thead>
                    <tr>
                        <td colspan="4"><textarea cols="50" class="actual-worklog-title" placeholder="Title" ></textarea></td> 
                    </tr>
                    <tr>
                        <td colspan="4"><textarea cols="100" rows="10" class="actual-worklog-text" placeholder="Worklog Text" ></textarea></td> 
                    </tr>
                    <tr>
                        <td colspan="4"><input class="add-worklog" type="submit" value="Add Worklog"/></td>
                    </tr>
                   </table>
               </div>
               <div style="width: 600px;" class="worklog-list-div"><table class="table table-hover"></table></div>`;
    }

    //todo: append worklogs
    showWorklogs(worklogs) {
        let worklogsDummy = [
            {
                "id": 1,
                "name" : "Alexander",
                "title": "Eintrag verschwindet",
                "description": "Wenn ein eintrag gemacht wird...dsfsfjoewfjpwefjpswff"
            },
            {
                "id": 2,
                "name" : "Armin",
                "title": "SDFew fwef",
                "description": "dsfsdgfs cfsdf ewtf wefsgvadfg qagra sdfgb sgsg werg wgb wtghewr gbwtb wtg dsbwr gh"
            },
            {
                "id": 3,
                "name" : "Egon",
                "title": "DFjokldfE Fedf",
                "description": "EWft treffi WEfgjyRÖGjka#4ptfoik areg" +
                "qi rdsfsdgfs cfsdf ewtf wefsgvadfg qagra sdfgb sgsg werg wgb wtghewr gbwtb wtg dsbwr gh"
            }
        ]

        let workloglist = this.$main.querySelector(".worklog-list-div")
        let table = workloglist.querySelector("table")
        table.innerHTML = worklogsDummy.map(this[renderWorklogs])
    }

    [renderWorklogs](worklog) {
        return `<tr><th>${worklog.title}</th><th>${worklog.name}</th></tr>
                <tr><td>${worklog.description}<td></tr>
                <tr><td></td></tr>`;
        //<button class="showWorklog" type="submit">+</button>
    }

    // todo: show wl detail
    showWorklogDetail(worklog) {
        let worklogDetails = this[renderWorklog](worklog)
        this.$doc.innerHTML = worklogDetails
    }

    // todo: render wl detail
    [renderWorklog](worklog) {
        // todo: render worklog detail
        return `<li data-id="${worklog.id}">
            <label>${worklog.title}</label>
            ${worklog.text}</li>`;
    }



    renderError(error) {
        let errorDiv = this.$doc.querySelector(".errorDiv")
        errorDiv.innerHTML = "Error " + error
        console.log("DEBUG", error)
    }
}

