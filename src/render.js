/**
 * Created by Pain on 29.06.2017.
 */
export function renderTableHeadImportFunction() {
    return `<thead>
                <tr>
                    <th data-field="id">ID</th>
                    <th data-field="title">Title</th>
                    <th data-field="name">Name</th>
                    <th data-field="status">Status</th>
                    <th data-field="category">Kategorie</th>
                </tr>
                </thead>`
}


/**
 * renders a single known error in a html table row
 * @param knownError
 * @returns {string}
 */
export function renderKnownErrorImportFunction (knownError) {
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
 * renders a known error with workloglist
 * @param dError an error
 * @returns {string}
 */
export function renderDetailErrorImportFunction (dError) {
    return `<table class="table">
                    <thead>
                        <tr>
                            <th><h4>${dError.id}</h4></th>
                            <th><h4><b>${dError.title}</b></h4></th>
                            <th><h4><select id="new-error-status">
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

/**
 * renders a single worklog into a accordion div class
 * @param worklog a worklog
 * @returns {string}
 */
export function renderWorklogsImportFunction (worklog) {
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

/**
 * renders the new worklog which will be added
 * @returns {string}
 */
export function rendernewWorklogImportFunction () {
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
}


/**
 * renders a status as option value for selection
 * @param {*a status} stat
 */
export function renderStatImportFunction(stat){
    return `<option value="${stat.id}">${stat.status}</option>`;
}


/**
 * renders a categorie as option value for selection
 * @param {*a category} category
 */
export function renderCategoryImportFunction (category){
    return `<option value="${category.id}">${category.category}</option>`;
}


/**
 * renders a name as option value for selection
 * @param {*a name} name
 */
export function renderNameImportFunction (name){
    return `<option value="${name.id}">${name.name}</option>`;
}



