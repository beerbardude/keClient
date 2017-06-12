'use strict'

const renderKnownError = Symbol()
const renderStat = Symbol()
const renderName = Symbol()
const renderCategory = Symbol()
const onAddErrorClick = Symbol()
const onShowDetailClick = Symbol()
const onShowWorklogDetailClick = Symbol()

export default class {
    constructor($doc){
        this.$doc = $doc
        this.$list = this.$doc.querySelector(".error-list")

        let $inputTitle = $doc.querySelector(".new-error-title")
        //$inputTitle.addEventListener('change', this[onChangeInput].bind(this))
        let $inputStatus = $doc.querySelector(".new-error-status")
        let $inputName = $doc.querySelector(".new-error-name")
        let $inputCategory = $doc.querySelector(".new-error-category")

        let $addButton = $doc.querySelector(".add-button")
        $addButton.addEventListener('click', this[onAddErrorClick].bind(this, $inputTitle, $inputStatus, $inputName, $inputCategory))

        //undefinded when no errors
        //let $detailButton = $doc.querySelector(".showDetail")
        // if($detailButton !== undefined)
        //$detailButton.addEventListener('click', this[onShowDetailClick].bind(this))
        
        //undefinded when no errors
        //let $worklogDetailButton = $doc.querySelector(".showWorklog")
        // if($detailButton !== undefined)
        //$worklogDetailButton.addEventListener('click', this[onShowWorklogDetailClick].bind(this))
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
        // todo: get id from button
        let id = arguments[0]
        let knownError =  {
            id: id.value
        }
        this.onShowDetailErrorHandler(knownError)
    }

    [onShowWorklogDetailClick](event) {
        let worklog = {
            id: event.id
        }
        this.onShowWorklogDetailClick(worklog)
    }


    /**
     * renders all known errors
     * @param {*a known error} knownErrors 
     */
    renderKnownErrors(knownErrors){
        let $list = this.$doc.querySelector(".error-list")
        $list.innerHTML = knownErrors.map(this[renderKnownError])
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
        return `<li data-id="${knownError.id}">
            <label>${knownError.title}</label>
            <button class="showDetail">Detail</button>
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

    showDetailError(detailError) {
        //todo: append error on html 
        let detail = this[renderDetailError](detailError)
        this.$doc.innerHTML = detail
    }

    [renderDetailError](detailError) {
        // todo: render error detail
        return `<h1>${detailError.title}</h1>
                    <select class="new-error-status">
                    </select>                    
                <h3>${detailError.name}</h3>                    
                <h3>${detailError.category}</h3>                   
                <input class="actual-worklog-text">Worklog Text</ipnut> 
        <button class="add-worklog" >Add</button>`;
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
            <button class="showWorklog">+</button>
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
        console.log("DEBUG", error)
    }
}

