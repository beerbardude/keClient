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
const onsaveWorklogClick = Symbol()

const onHomeButtonClick = Symbol()
const onSearchFieldClick = Symbol()

export default class {
    constructor($doc){
        this.$doc = $doc
        this.$main = this.$doc.querySelector("main")
        this.$list = this.$doc.querySelector(".list-group")

        let $inputTitle = $doc.querySelector(".new-error-title")
        let $inputStatus = $doc.querySelector(".new-error-status")
        let $inputName = $doc.querySelector(".new-error-name")
        let $inputCategory = $doc.querySelector(".new-error-category")

        let $homeButton = $doc.querySelector("#home-button")
        $homeButton.addEventListener('click', this[onHomeButtonClick].bind(this))

        let $addButton = $doc.querySelector(".add-button")
        $addButton.addEventListener('click', this[onAddErrorClick].bind(this, $inputTitle, $inputStatus, $inputName, $inputCategory))

        //$saveWorkLogButton.addEventListener('click', this[onsaveWorklogClick].bind(this, ))

        let $searchField = $doc.querySelector("#search-field")
        $searchField.addEventListener('input', this[onSearchFieldClick].bind(this))
    }


    registerAddKnownErrorHandler(handler) {
        this.onAddKnownErrorHandler = handler
    }

    registerShowDetailErrorHandler(handler) {
        this.onShowDetailErrorHandler = handler
    }

    registersaveWorklogClick(handler) {
        this.onsaveWorklogClick = handler
    }

    registerOnHomeButtonClick(handler) {
        this.onHomeButtonClick = handler
    }

    registerSearchFieldClick(handler) {
        this.onSearchFieldClick = handler
    }

    [onAddErrorClick](event) {
        let title = arguments[0]
        let stat = arguments[1]
        let name = arguments[2]
        let cat = arguments[3]
        if (this.checkUniqueTitle(title) && title.value !== '') {
            this.changeBorderColor('.new-error-title', '#000')
            let knownError = {
                title: title.value,
                status: stat.options[stat.selectedIndex].value,
                name: name.options[name.selectedIndex].value,
                category: cat.options[cat.selectedIndex].value
            }
            this.onAddKnownErrorHandler(knownError)
        }
        else {
            this.changeBorderColor('.new-error-title', '#f00')
            window.alert('Titel muss eindeutig sein und einen Wert haben')
        }
    }

    renderTableHead() {
        return `<thead>
                <tr>
                    <th data-field="id">ID</th>
                    <th data-field="title">Title</th>
                    <th data-field="status">Status</th>
                    <th data-field="name">Name</th>
                    <th data-field="category">Kategorie</th>
                </tr>
                </thead>`
    }

    [onShowDetailClick](event) {
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


    [onsaveWorklogClick](event) {
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
        this.onsaveWorklogClick(worklogRecord)
    }

    [onHomeButtonClick](event) {
        this.onHomeButtonClick(event)
    }

    [onSearchFieldClick](event) {
        let text = event.target.value
        if(text !== undefined && text !== '') {
            this.onSearchFieldClick(text)
        }
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

        /** refreshing table */
        $table.innerHTML = '';
        /** add table head */
        $table.innerHTML = this.renderTableHead()

        let renderedErrors = knownErrors.map(this[renderKnownError]).join('')
        $table.innerHTML = $table.innerHTML.concat(renderedErrors)

        $( document ).ready(function() {
            $('#known-error-list').DataTable({bFilter: false, bInfo: false});
        } );

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

    changeAddButtonText(){
        this.$doc.querySelector(".add-button").style.display="none"
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

        let $hiddenWorklogDiv = this.$main.querySelector(".hidden-worklog")
        $hiddenWorklogDiv.innerHTML = this.rendernewWorklog()



        $('#new-worklog').on('shown.bs.collapse', function(){
            console.log("Opened")
        })

/*/!*        test.armin.on('hidden.bs.collapse', function(){
            console.log("closed")
        })*!/
        test_armin.on('shown.bs.collapse', function(e){
            console.log("Opened" + e.currentTarget.id)
        })

        test_armin.hasClass('in')*/


        let $saveWorkLogButton = $hiddenWorklogDiv.querySelector("#save-worklog")
        let $actualWorklogTitle = this.$main.querySelector("#title")
        let $actualWorklogText = this.$main.querySelector("#desciption")

        $saveWorkLogButton.addEventListener('click', this[onsaveWorklogClick].bind(this, $actualWorklogTitle, $actualWorklogText))


        let worklogList = this.$main.querySelector('.worklog-list')
        worklogList.innerHTML = worklogs.map(this[renderWorklogs]).join('')

/*        let $addWorkLogButton = this.$main.querySelector("#add-worklog")
        $addWorkLogButton.addEventListener('click', this[onsaveWorklogClick].bind(this, detailError))*/
    }

    [renderDetailError](dError) {
        return `<table class="table">
                    <thead>
                        <tr>
                            <th><h4>${dError.id}</h4></th>
                            <th><h4><b>${dError.title}</b></h4></th>
                            <th><h4><select class="new-error-status">
                            </select></h4></th>
                            <th><h4>${dError.nameText}</h4></th>
                            <th><h4>${dError.catText}</h4></th>
                        </tr>
                    </thead>                   
                </table>
                <!--<div class="text-center"><button type="button" id="add-worklog" class="btn btn-primary btn-lg">Add Worklog</button></div>-->
                <div class="hidden-worklog"></div>
                <div class="worklog-list"></div>`;
    }

    [renderWorklogs](worklog) {
        return `<div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#${worklog.id}">
                            ${worklog.title}
                            </a>
                            <span class="pull-right">${worklog.name}</span>
                            </h3>
                        </div>
                        <div id="${worklog.id}" class="panel-collapse collapse">
                            <div class="panel-body">
                            ${worklog.description}
                            </div>
                        </div>
                    </div>
                </div>`;

    }


    rendernewWorklog () {

        return `<div class='panel-group' id="accordion">
                    <div class="panel-heading">
                        <h3 class="display-4">
                        <a data-toggle="collapse" data-parent="#accordion" href="#new-worklog">
                        <div class="text-center">Add Worklog</div>
                        </a>
                        </h3>
                    </div>
                    <div id="new-worklog" class="panel-collapse collapse">
                        <div class="panel-body">
                        <label for="title">Titel:</label>
                            <input type="text" class="form-control" id="title">
                    <br>
                        <label for="description">Beschreibung:</label>
                            <textarea class="form-control" id="description">
                            </textarea>
                    <br>
                        <span class="pull-right"><button type="button" id="save-worklog" class="btn btn-primary btn-lg">Save</button></span>
                        </div>
                    </div>`

/*        return `<div class="form-group" style="display: none;">
                        <label for="title">Titel:</label>
                        <input type="text" class="form-control" id="title">
                    <br>
                        <label for="description">Beschreibung:</label>
                        <textarea class="form-control" id="description">
                        </textarea>
                    <br>
                    <span class="pull-right"><button type="button" id="save-worklog" class="btn btn-primary btn-lg">Save</button></span>
                    </div>`;*/
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

    /**
     * checks if the new title exists within the known error titles
     * @param title
     * @returns {boolean}
     */
    checkUniqueTitle(title) {
        let titles = this.$main.querySelectorAll('.known-error-title')
        for (let i = 0; i < titles.length; i++) {
            if (titles[i].value === title.value) {
                return false
            }
        }
        return true
    }

    /**
     * change border color of html element
     * @param elementClass
     * @param color
     */
    changeBorderColor(elementClass, color) {
        let newErrorInput = this.$main.querySelector(elementClass)
        newErrorInput.style.borderColor = color
    }
}

