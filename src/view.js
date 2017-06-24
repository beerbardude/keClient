'use strict'

const renderKnownError = Symbol()

const renderStat = Symbol()
const renderStatSelected = Symbol()
const renderName = Symbol()
const renderCategory = Symbol()

const renderDetailError = Symbol()
const renderWorklogs = Symbol()
const renderDetailWorklog = Symbol()

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
        console.log('event', arguments)
        let id = arguments[0]
        let title = arguments[1]
        let name = arguments[2]
        let nameText = arguments[3]
        let stat = arguments[4]
        let statText = arguments[5]
        let cat = arguments[6]
        let catText = arguments[7]

        let knownError = {
            id: id,
            title: title,
            name: name,
            nameText: nameText,
            stat: stat,
            statText: statText,
            cat : cat,
            catText : catText
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
     * makes a table of errors
     * hidden inputs for the id values
     * divs for text values
     * adds eventlistener to buttons binds the hidden ids and div text values
     * @param {*a known error} knownErrors 
     */
    renderKnownErrors(knownErrors){
        let $table = this.$doc.querySelector("table")
        $table.innerHTML = knownErrors.map(this[renderKnownError]).join('')

        let $tr = $table.querySelectorAll(".known-error")
        $tr.forEach(tr => {
            let knownErrorId = tr.querySelector(".known-error-id")
            let knownErrorTitle = tr.querySelector(".known-error-title")
            let knownErrorName = tr.querySelector(".known-error-name")
            let knownErrorNameText = tr.querySelector(".known-error-name-text")
            let knownErrorStatus = tr.querySelector(".known-error-status")
            let knownErrorStatusText = tr.querySelector(".known-error-status-text")
            let knownErrorCategory = tr.querySelector(".known-error-category")
            let knownErrorCategoryText = tr.querySelector(".known-error-category-text")
            let detailButton = tr.querySelector("a")
                detailButton.addEventListener('click', this[onShowDetailClick].bind(this,
                knownErrorId.value,
                knownErrorTitle.value,
                knownErrorName.value,
                knownErrorNameText.innerHTML,
                knownErrorStatus.value,
                knownErrorStatusText.innerHTML,
                knownErrorCategory.value,
                knownErrorCategoryText.innerHTML))
        })
    }

    /**
    * renders a known error
    * @param {*a known error} knownError 
    */
    [renderKnownError](knownError){
        return `<tr class="known-error">
                    <td><input type="hidden" class="known-error-id" value="${knownError.keid}"/>${knownError.keid}</td>
                    <td><input type="hidden" class="known-error-title" value="${knownError.title}"/><a href="#">${knownError.title}</a></td>
                    <td><input type="hidden" class="known-error-name" value="${knownError.addbyid}"/>
                        <div class="known-error-name-text">${knownError.name}</div></td>
                    <td><input type="hidden" class="known-error-status" value="${knownError.statid}"/>
                        <div class="known-error-status-text">${knownError.status}</div></td>
                    <td><input type="hidden" class="known-error-category" value="${knownError.catid}"/>
                        <div class="known-error-category-text">${knownError.category}</div></td>
                </tr>`
    }

    /**
     * renders the statuses for selection
     * @param {*the statuses} stats 
     */
    renderStats(stats){
        let $statSelection = this.$doc.querySelector(".new-error-status")
        $statSelection.innerHTML = stats.map(this[renderStat]).join('')
    }

    /**
     * renders a status as option value for selection
     * @param {*a status} stat 
     */
    [renderStat](stat){
        return `<option value="${stat.id}">${stat.status}</option>`;
    }

    [renderStatSelected](stat) {
        return `<option selected value="${stat.id}">${stat.status}</option>`;
    }

    /**
     * renders categories for selection
     * @param {*categories} categories 
     */
    renderCategories(categories){
        let $categorySelection = this.$doc.querySelector(".new-error-category")
        $categorySelection.innerHTML = categories.map(this[renderCategory]).join('')
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
        $nameSelection.innerHTML = names.map(this[renderName]).join('')
    }

    /**
     * renders a name as option value for selection
     * @param {*a name} name 
     */
    [renderName](name){
        return `<option value="${name.id}">${name.name}</option>`;
    }

    // todo : get worklogs list
    renderDetailErrors(worklogs, detailError, stats) {
        this.$doc.querySelector('h1').innerHTML = 'Worklogs'

        this.$main.innerHTML = this[renderDetailError](detailError)
        let selection = this.$main.querySelector("select")

        stats.then((stat) => {
            selection.innerHTML = stat.map(this[renderStat]).join('')
        }).then(() => {
            for(let i = 0; i < selection.options.length; i++) {
                if(selection.options[i].value === detailError.stat) {
                    selection.options[i].selected = true
                }
            }
        })

        let worklogList = this.$main.querySelector('.worklog-list')
        worklogList.innerHTML = worklogs.map(this[renderWorklogs]).join('')

        let $hiddenWorklogDiv = this.$main.querySelector(".hidden-worklog")
        let $actualWorklogTitle = this.$main.querySelector(".actual-worklog-title")
        let $actualWorklogText = this.$main.querySelector(".actual-worklog-text")

        let $addWorkLogButton = this.$main.querySelector(".add-worklog")
        $addWorkLogButton.addEventListener('click', this[onAddWorklogClick].bind(this, detailError)) //, $actualWorklogTitle, $actualWorklogText))
    }

    [renderDetailError](dError) {
        return `<table class="table">
                    <thead>
                        <tr>
                            <th>${dError.id}</th>
                            <th>${dError.title}</th>
                            <th><select class="new-error-status">
                            </select></th>
                            <th>${dError.nameText}</th>
                            <th>${dError.catText}</th>
                        </tr>
                    </thead>
                    <tr>
                        <td colspan="5"><input class="add-worklog" type="submit" value="Add Worklog"/></td>
                    </tr>
                </table><div class="worklog-list"></div>`;
    }

    [renderDetailWorklog](worklog) {
        return `<div class="known-error-detail">
                    <table class="table">
                    <thead>
                        <tr>
                            <th>${worklog.title}</th>
                            <th><select class="new-error-status">
                                
                                </select></th>
                            <th>${worklog.id}</th>
                            <th>${worklog.id_category}</th>
                        </tr>
                    </thead>
               </table>
               <div style="width: 80%; margin-left:auto; margin-right: auto;" class="worklog-list-div"><table class="table table-hover"></table></div>`;
    }
//
// <div class="hidden-worklog" style="display: none;">
//         <tr>
//         <td colspan="4"><textarea cols="50" class="actual-worklog-title" placeholder="Title" ></textarea></td>
//         </tr>
//         <tr>
//         <td colspan="4"><textarea cols="100" rows="10" class="actual-worklog-text" placeholder="Worklog Text" ></textarea></td>
//         </tr>
//         </div>

    [renderWorklogs](worklog) {
        return `<table>
                    <tr><th>${worklog.title}</th><th>${worklog.name}</th></tr>
                    <tr><td>${worklog.description}<td></tr>
                    <tr><td></td></tr>
                </table>`;
        //<button class="showWorklog" type="submit">+</button>
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


    // todo: show wl detail
    showWorklogDetail(worklog) {
        let worklogDetails = this[renderWorklog](worklog)
        this.$doc.innerHTML = worklogDetails
    }


    renderError(error) {
        let errorDiv = this.$doc.querySelector(".errorDiv")
        errorDiv.innerHTML = "Error " + error
    }
}

