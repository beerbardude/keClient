/**
 * Created by Pain on 04.07.2017.
 */
import assert from 'assert'

import {renderTableHeadImportFunction,
    renderKnownErrorImportFunction,
    renderDetailErrorImportFunction,
    renderWorklogsImportFunction,
    rendernewWorklogImportFunction,
    renderStatImportFunction,
    renderCategoryImportFunction,
    renderNameImportFunction,
    renderTableFooter}
    from '../render'


describe('render Tests', function () {
        it('renderTableHeadImportFunction should have 6 table head cols (id, title, name, status, kategorie, erstellt)', function (done) {
            let tableHead = renderTableHeadImportFunction()
            assert.equal(`<thead>
                <tr>
                    <th data-field="id">ID</th>
                    <th data-field="title">Title</th>
                    <th data-field="name">Name</th>
                    <th data-field="status">Status</th>
                    <th data-field="category">Kategorie</th>
                    <th data-field="createdAt">Erstellt</th>
                </tr>
                </thead>`, tableHead)
            done()
        })
    it('renderKnownErrorImportFunction should show all values from known error', function (done) {
        let knownError = {
            keid: 1,
            title: 'Known Error Test Title',
            addbyid: 2,
            name: 'TestUser',
            statid: 3,
            status: 'Pending',
            catid: 4,
            category: 'MobileIron',
            createdat: '01.01.2010'
        }
        let tableHead = renderKnownErrorImportFunction(knownError)
        assert.equal(`<tr class="known-error">
                        <td><input type="hidden" class="known-error-id" value="1"/>1</td>
                        <td><input type="hidden" class="known-error-title" value="Known Error Test Title"/><a href="#">Known Error Test Title</a></td>
                        <td><input type="hidden" class="known-error-name" value="2"/>
                            <div class="known-error-name-text">TestUser</div></td>
                        <td><input type="hidden" class="known-error-status" value="3"/>
                            <div class="known-error-status-text">Pending</div></td>
                        <td><input type="hidden" class="known-error-category" value="4"/>
                            <div class="known-error-category-text">MobileIron</div></td>
                        <td><input type="hidden" class="known-error-date" value="01.01.2010"/>
                            <div class="known-error-date-text">01.01.2010</div></td>
                    </tr>`, tableHead)
        done()
    })
    it('renderDetailErrorImportFunction should show all values from known error in detail (id, title, name, category) and hidden divs for worklogs', function (done) {
        let knownError = {
            id: 1,
            title: 'Known Error Test Title',
            nameText: 'Name',
            catText: 'Cat'
        }
        let tableHead = renderDetailErrorImportFunction(knownError)
        assert.equal(`<table class="table">
                    <thead>
                        <tr>
                            <th><h4>1</h4></th>
                            <th><h4><b>Known Error Test Title</b></h4></th>
                            <th><h4><select id="new-error-status">
                            </select></h4></th>
                            <th><h4>Name</h4></th>
                            <th><h4>Cat</h4></th>
                        </tr>
                    </thead>                   
                </table>
                <div id="hidden-error-id" style="visibility: hidden;">1</div>
                <div class="hidden-worklog"></div>
                <div class="worklog-list"></div>`, tableHead)
        done()
    })
    it('renderWorklogsImportFunction should show a worklog in a div without a span for link', function (done) {
        let worklog = {
            id: 1,
            title: 'This is a test worklog',
            description: 'This text is a description',
            name: 'TestUser',
            catText: 'Cat',
            kb_link: null
        }
        let tableHead = renderWorklogsImportFunction(worklog)
        assert.equal(`<div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div class="container-fluid panel-container">
                                <div class="col-lg-8 text-left">
                                <h3 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#1">
                                    This is a test worklog
                                    </a>
                                </div>
                                <div class="col-lg-2 text-right">
                                    TestUser
                                 </div></h3>
                     </div>
                        </div>
                        <div id="1" class="panel-collapse collapse">
                            <div class="panel-body">
                            This text is a description
                            </div>
                        </div>
                    </div>
                </div>`, tableHead)
        done()
    })
    it('renderWorklogsImportFunction should show a worklog in a div with a span for link', function (done) {
        let worklog = {
            id: 1,
            title: 'This is a test worklog',
            description: 'This text is a description',
            name: 'TestUser',
            catText: 'Cat',
            kb_link: 'http://www.test.com'
        }
        let tableHead = renderWorklogsImportFunction(worklog)
        assert.equal(`<div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div class="container-fluid panel-container">
                                <div class="col-lg-8 text-left">
                                <h3 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#1">
                                    This is a test worklog
                                    </a>
                                </div>
                                <div class="col-lg-2 text-right">
                                    TestUser
                                 </div><span class="pull-right" id="kb_link"><a target="_blank" href="http://www.test.com">KB Link</a></span></h3>
                     </div>
                        </div>
                        <div id="1" class="panel-collapse collapse">
                            <div class="panel-body">
                            This text is a description
                            </div>
                        </div>
                    </div>
                </div>`, tableHead)
        done()
    })
    it('rendernewWorklogImportFunction should show a div with input field for worklog ' +
        ', button for adding, ' +
        ', label and input for title' +
        ', label and textarea for description' +
        ', laben and input for link' +
        ', button for save', function (done) {
        let tableHead = rendernewWorklogImportFunction()
        assert.equal(`<div class='panel-group' id="accordion">
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
                            <textarea class="form-control" id="description"></textarea>                        
                    <br>
                         <label for="worklog-link">Link:</label>
                            <input class="form-control" id="worklog-link" type="url" placeholder="http://www.example.com">
                                                    
                    <br>
                        <div class="dropdown">
                            <span class="pull-left">
                                <b><i>Name</i></b><p>
                                <select id="new-worklog-name" class="form-control">
                                </select></span></div>
                            <span class="pull-right"><button type="button" id="save-worklog" class="btn btn-primary btn-lg">Save</button></span>
                        </div>
                    </div>`, tableHead)
        done()
    })
    it('renderStatImportFunction should show an option with id 1 and status open', function (done) {
        let stat = {
            id: 1,
            status: 'Open'
        }
        let tableHead = renderStatImportFunction(stat)
        assert.equal(`<option value="1">Open</option>`, tableHead)
        done()
    })
    it('renderCategoryImportFunction should show an option with id 1 and category android', function (done) {
        let category = {
            id: 1,
            category: 'Android'
        }
        let tableHead = renderCategoryImportFunction(category)
        assert.equal(`<option value="1">Android</option>`, tableHead)
        done()
    })
    it('renderNameImportFunction should show an option with id 1 and name test user', function (done) {
        let name = {
            id: 1,
            name: 'Test User'
        }
        let tableHead = renderNameImportFunction(name)
        assert.equal(`<option value="${name.id}">${name.name}</option>`, tableHead)
        done()
    })
    it('renderTableFooter should show a tfoot with 6 cols, 4 of them with text(name, status, kategorie, erstellt) ', function (done) {
        let tableHead = renderTableFooter()
        assert.equal(`<tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Kategorie</th>
                    <th>Erstellt</th>
                </tr>
            </tfoot>`, tableHead)
        done()
    })
})
