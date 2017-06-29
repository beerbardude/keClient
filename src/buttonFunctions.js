/**
 * Created by Pain on 29.06.2017.
 */

/**
 * gets the known error values for the detail view
 * @param event
 */
export function onShowDetailClickImportFunction(event) {
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


/**
 * gets the new known error values for adding it
 * @param event
 */
export function onsaveWorklogClickImportFunction(event) {
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

/**
 * home button
 * @param event
 */
export function onHomeButtonClickImportFunction (event) {
    this.onHomeButtonClick(event)
}

/**
 * gets values for the search function
 * @param event
 */
export function onSearchFieldClickImportFunction (event) {
    let text = event.target.value
    if(text !== undefined && text !== '') {
        this.onSearchFieldClick(text)
    }
}

