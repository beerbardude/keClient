'use strict'

import {renderTableHeadImportFunction,
        renderKnownErrorImportFunction ,
        renderDetailErrorImportFunction,
        renderWorklogsImportFunction,
        rendernewWorklogImportFunction,
        renderStatImportFunction,
        renderCategoryImportFunction,
        renderNameImportFunction,
        renderTableFooter}
    from './render'

import {onShowDetailClickImportFunction,
        onsaveWorklogClickImportFunction,
        onHomeButtonClickImportFunction,
        onSearchFieldClickImportFunction,
        createOption}
    from './functions'

const onAddErrorClick = Symbol()

export default class {
    constructor($doc){
        this.$doc = $doc
        this.$main = this.$doc.querySelector("main")
        this.$list = this.$doc.querySelector(".list-group")

        let $inputTitle = $doc.querySelector("#new-error-title")
        let $inputStatus = $doc.querySelector("#new-error-status")
        let $inputName = $doc.querySelector("#new-error-name")
        let $inputCategory = $doc.querySelector("#new-error-category")

        let $homeButton = $doc.querySelector("#home-button")
        $homeButton.addEventListener('click', onHomeButtonClickImportFunction.bind(this))

        let $addButton = $doc.querySelector(".add-button")
        $addButton.addEventListener('click', this[onAddErrorClick].bind(this, $inputTitle, $inputStatus, $inputName, $inputCategory))

        let $searchField = $doc.querySelector("#search-field")
        $searchField.addEventListener('keypress', onSearchFieldClickImportFunction.bind(this))
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

    /**
     * the add new error event
     * @param event
     */
    [onAddErrorClick](event) {
        let title = arguments[0]
        let stat = arguments[1]
        let name = arguments[2]
        let cat = arguments[3]
        if (this.checkUniqueTitle(title) && title.value !== '') {
            this.changeBorderColor('#new-error-title', '#000')
            let knownError = {
                title: title.value,
                status: stat.options[stat.selectedIndex].value,
                name: name.options[name.selectedIndex].value,
                category: cat.options[cat.selectedIndex].value
            }
            this.onAddKnownErrorHandler(knownError)
        }
        else {
            this.changeBorderColor('#new-error-title', '#f00')
            window.alert('Titel muss eindeutig sein und einen Wert haben')
        }
    }


    /**
     * adds a known error to the error-list
     * @param {*a known error} knownError
     */
    addKnownError(knownError) {
        let $div = document.createElement('div')
        let html = renderKnownErrorImportFunction(knownError)
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
        let $table = this.$doc.querySelector("#known-error-list")

        /** refreshing table */
        $table.innerHTML = '';
        /** add table head */
        $table.innerHTML = renderTableHeadImportFunction()

        let renderedErrors = knownErrors.map(renderKnownErrorImportFunction).join('')
        $table.innerHTML = $table.innerHTML.concat(renderedErrors)
        $table.innerHTML = $table.innerHTML.concat(renderTableFooter())

        $( document ).ready(function() {
            $('#known-error-list').DataTable({

                sDom: '<"top">lrtip',
                bInfo: true,

                initComplete: function(){
                    this.api().columns([2]).every( function(){
                        let column = this
                        let select = $('<select id="filter2"><option value=""></option></select>')
                            .appendTo( $(column.footer()).empty() )
                            .on( 'change', function () {
                                var val = $(this).val()
                                let filter_value = document.getElementById("filter2").options[this.selectedIndex].text
                                if (val === "") {
                                        column.search("").draw()
                                }else {
                                    column
                                        .search(filter_value)
                                        .draw()
                                }
                            })
                        column.data().unique().sort().each( function ( d, j) {
                            select.append(createOption(d))
                        })
                    }),
                    this.api().columns([3]).every( function(){
                        let column = this
                        let select = $('<select id="filter3"><option value=""></option></select>')
                            .appendTo( $(column.footer()).empty() )
                            .on( 'change', function () {
                                var val = $(this).val()
                                let filter_value = document.getElementById("filter3").options[this.selectedIndex].text
                                if (val === "") {
                                    column.search("").draw()
                                }else {
                                    column
                                        .search(filter_value)
                                        .draw()
                                }
                            })
                        column.data().unique().sort().each( function ( d, j) {
                            select.append(createOption(d))
                        })
                    }),
                    this.api().columns([4]).every( function() {
                        let column = this
                        let select = $('<select id="filter4"><option value=""></option></select>')
                            .appendTo($(column.footer()).empty())
                            .on('change', function () {
                                var val = $(this).val()
                                let filter_value = document.getElementById("filter4").options[this.selectedIndex].text
                                if (val === "") {
                                    column.search("").draw()
                                } else {
                                    column
                                        .search(filter_value)
                                        .draw()
                                }
                            })
                        column.data().unique().sort().each(function (d, j) {
                            select.append(createOption(d))
                        })
                    }),
                    this.api().columns([5]).every( function() {
                        let column = this
                        let select = $('<select id="filter5"><option value=""></option></select>')
                            .appendTo($(column.footer()).empty())
                            .on('change', function () {
                                var val = $(this).val()
                                let filter_value = document.getElementById("filter5").options[this.selectedIndex].text
                                if (val === "") {
                                    column.search("").draw()
                                } else {
                                    column
                                        .search(filter_value)
                                        .draw()
                                }
                            })
                        column.data().unique().sort().each(function (d, j) {
                            select.append(createOption(d))
                        })
                    })

                },
                retrieve: true
            })
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
            let knownErrorcreatedat= tr.querySelector(".known-error-date")
            let knownErrorcreatedatText = tr.querySelector(".known-error-date-text")
            let detailButton = tr.querySelector("a")
                detailButton.addEventListener('click', onShowDetailClickImportFunction.bind(this,
                knownErrorId.value,
                knownErrorTitle.value,
                knownErrorName.value,
                knownErrorNameText.innerHTML,
                knownErrorStatus.value,
                knownErrorStatusText.innerHTML,
                knownErrorCategory.value,
                knownErrorCategoryText.innerHTML,
                knownErrorcreatedat.value,
                knownErrorcreatedatText.innerHTML))
        })
    }

    /**
     * renders the statuses for selection
     * @param {*the statuses} stats 
     */
    renderStats(stats){
        let $statSelection = this.$doc.querySelector("#new-error-status")
        $statSelection.innerHTML = stats.map(renderStatImportFunction).join('')
    }


    /**
     * renders categories for selection
     * @param {*categories} categories 
     */
    renderCategories(categories){
        let $categorySelection = this.$doc.querySelector("#new-error-category")
        $categorySelection.innerHTML = categories.map(renderCategoryImportFunction).join('')
    }

    /**
     * renders names for selection
     * @param {*names} names 
     */
    renderNames(names){
        let $nameSelection = this.$doc.querySelector("#new-error-name")
        $nameSelection.innerHTML = names.map(renderNameImportFunction).join('')
    }

    /**
     * hide add button from navbar when in detail view
     */
    hideAddButton(){
        this.$doc.querySelector(".add-button").style.display = "none"
    }

    /**
     * shows a known error with its worklogs
     * needs the stats for the status selection
     * @param worklogs known error worklogs
     * @param detailError a known error
     * @param stats all stats for option values
     * @param names all names for hidden field
     */
    renderDetailErrors(worklogs, detailError, stats, names) {
        this.$doc.querySelector('h1').innerHTML = 'Worklogs'

        this.$main.innerHTML = renderDetailErrorImportFunction(detailError)
        let $selection = this.$main.querySelector("select")

        stats.then((stat) => {
            $selection.innerHTML = stat.map(renderStatImportFunction).join('')
        }).then(() => {
            for(let i = 0; i < $selection.options.length; i++) {
                if($selection.options[i].value === detailError.stat) {
                    $selection.options[i].selected = true
                }
            }
        })

        let $hiddenWorklogDiv = this.$main.querySelector(".hidden-worklog")
        $hiddenWorklogDiv.innerHTML = rendernewWorklogImportFunction()

        let newWorklogNameSelect = this.$main.querySelector('#new-worklog-name')
        names.then((name) => {
            newWorklogNameSelect.innerHTML = name.map(renderNameImportFunction).join('')
        })


        let $saveWorkLogButton = $hiddenWorklogDiv.querySelector("#save-worklog")
        let $actualWorklogTitle = this.$main.querySelector("#title")
        let $actualWorklogText = this.$main.querySelector("#description")
        let $keid = this.$main.querySelector('#hidden-error-id').innerHTML
        let $addedBy = this.$main.querySelector('#new-worklog-name')
        let $link = this.$main.querySelector("#worklog-link")

            $saveWorkLogButton.addEventListener('click', onsaveWorklogClickImportFunction.bind(this,
            $keid,
            $actualWorklogTitle,
            $actualWorklogText,
            $addedBy,
            $link,
            $selection
        ))
        
        let worklogList = this.$main.querySelector('.worklog-list')
        worklogList.innerHTML = worklogs.map(renderWorklogsImportFunction).join('')
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

    /**
     * renders an error message
     * @param error
     */
    renderError(error) {
        let errorDiv = this.$doc.querySelector(".errorDiv")
        errorDiv.style.fontSize = '14pt'
        errorDiv.innerHTML = 'Es ist ein Fehler aufgetreten<p>' + error
    }

}

