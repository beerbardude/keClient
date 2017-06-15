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
        this.$list = this.$doc.querySelector(".error-list")

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
        this.onAddWorklockClick = handler
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
        let worklogRecord =  {
            id : arguments[0],
            text : arguments[1]
        }
        this.onAddWorklogClick(worklogRecord)
    }

    /**
     * renders all known errors
     * adds eventlistener to buttons
     * @param {*a known error} knownErrors 
     */
    renderKnownErrors(knownErrors){
        let $list = this.$doc.querySelector(".error-list")
        $list.innerHTML = knownErrors.map(this[renderKnownError])

        let $knownErrorDivs = $list.querySelectorAll(".knownErrorDiv")
        $knownErrorDivs.forEach(div => {
            let knownErrorId = div.querySelector(".knownErrorId")
            let detailButton = div.querySelector(".showDetail")
            detailButton.addEventListener('click', this[onShowDetailClick].bind(this, knownErrorId.innerHTML))
        });
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
    * renders a known error
    * @param {*a known error} knownError 
    */
    [renderKnownError](knownError){
        return `<div class="knownErrorDiv">
            <li class="knownErrorLi" >
            <label class="knownErrorId">${knownError.id}</label>
            <label class="knownErrorTitle">${knownError.title}</label>
            <label class="knownErrorStatus">${knownError.status}</label>
            <label class="knownErrorName">${knownError.name}</label>
            <label class="knownErrorCategory">${knownError.category}</label>
            
            <input class="showDetail" type="submit" value="Detail"/>
            </div>
        </li>`;
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
    renderDetailErrors(detailError) {
        //this.$doc.innerHTML = detailError.map(this[renderDetailError])
        console.log('det',detailError)
        window.document.body.innerHTML = this[renderDetailError](detailError)

        let errorId = detailError.id

        let worklog = this.$doc.querySelector("actual-worklog-text")
        let addWorkLogButton = this.$doc.querySelector(".add-worklog")
        addWorkLogButton.addEventListener('click', this[onAddWorklogClick].bind(this, errorId, worklog))
    }

    //todo : get select values
    [renderDetailError](detailError) {
        console.log("detail render", detailError)
        return `<input class="back-button" type="submit" value="Back"/>
                <h1>${detailError.title}</h1>
                    <select class="new-error-status">
                    </select>                    
                <h3>${detailError.name}</h3>                    
                <h3>${detailError.category}</h3>                   
                <input class="actual-worklog-text">Worklog Text</ipnut> 
        <input class="add-worklog" type="submit" value="Add Worklog"/>`;
    }

    //todo: append worklogs
    showWorklogs(worklogs) {
        let worklogList = this[renderWorklogs](worklogs)
        this.$doc.innerHTML = worklogList
    }

    // todo: render worklog
    [renderWorklogs](worklog) {
        return `<li data-id="${worklog.id}">
            <label>${worklog.title}</label>
            <button class="showWorklog" type="submit">+</button>
        </li>`;
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

