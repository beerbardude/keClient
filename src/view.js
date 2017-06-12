'use strict'

const renderKnownError = Symbol()
const renderStat = Symbol()
const renderName = Symbol()
const renderCategory = Symbol()
const onClick = Symbol()

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
        $addButton.addEventListener('click', this[onClick].bind(this, $inputTitle, $inputStatus, $inputName, $inputCategory))
    }


    registerAddKnownErrorHandler(handler) {
        this.onAddKnownErrorHandler = handler
    }


    [onClick](event) {
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


    renderKnownErrors(knownErrors){
        let $list = this.$doc.querySelector(".error-list")
        $list.innerHTML = knownErrors.map(this[renderKnownError])
    }

    renderStats(stats){
        let $statSelection = this.$doc.querySelector(".new-error-status")
        $statSelection.innerHTML = stats.map(this[renderStat])
    }

    renderCategories(categories){
        let $categorySelection = this.$doc.querySelector(".new-error-category")
        $categorySelection.innerHTML = categories.map(this[renderCategory])
    }

    renderNames(names){
        let $nameSelection = this.$doc.querySelector(".new-error-name")
        $nameSelection.innerHTML = names.map(this[renderName])
    }

    addKnownError(knownError) {
        let $div = document.createElement('div')
        let html = this[renderKnownError](knownError)
        $div.innerHTML = html
        this.$list.appendChild($div.childNodes[0])
    }

    [renderKnownError](knownError){
        return `<li data-id="${knownError.id}">
            <label>${knownError.title}</label>
            <button class="destroy"></button>
        </li>`;
    }

    [renderStat](stat){
        return `<option value="${stat.id}">${stat.status}</option>`;
    }

    [renderName](name){
        return `<option value="${name.id}">${name.name}</option>`;
    }

    [renderCategory](category){
        return `<option value="${category.id}">${category.category}</option>`;
    }

    renderError(error) {
        console.log("DEBUG", error)
    }

}

