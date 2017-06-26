'use strict'

let request = require('request');

const server = "http://localhost:3000/"
//const server = "http://10.43.18.170:3000/"
const localIndex = "http://localhost:8008/src/index.html"

export default class Store {

    /**
     * gets all errors from the db
     * keId,
     * title,
     * status,
     * statId ,
     * name,
     * addbyId ,
     * category ,
     * catId
     * @returns {Promise.<TResult>|*|{anyOf}}
     */
    getKnownErrors() {
        let headers = new Headers({
            'Accept': 'application/json'
        })
        return fetch(server, {
            method: 'GET',
            headers: headers,
        }).then((resp)=>{
            if(resp.ok){
                return resp.json()
            }else{
                return Promise.reject(resp)
            }
        })
    }

    /**
     * gets the worklog from a known error
     * wl.id,
     * wl.title,
     * wl.description,
     * addby.name
     * @param id
     * @returns {Promise.<TResult>|*|{anyOf}}
     */
    getKnownErrorById(id) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        let id_string = id.id

        return fetch(`http://localhost:3000/ke/${(id_string)}`, {
            method: 'GET',
            headers: headers,
        }).then((resp)=>{
            if(resp.ok){
                return resp.json()
            }else{
                return Promise.reject(resp)
            }
        })
    }

    /**
     * adds a known error
     * @param knownError
     */
    addKnownError(knownError) {
        request.post(
            server + 'add',
            {json:knownError},
            function (error, response) {
                if (!error && response.statusCode == 200) {
                    window.alert("Added Error")
                    window.location.replace(localIndex)
                }
            }
        );
    }

    // todo : check server method
    addWorklog(worklog) {
        request.post(
            server + 'add_wl',
            {json:worklog},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    window.alert("Worklog Added")
                    window.location.replace(localIndex)
                }
                else {
                    console.log("error", worklog)
                }
            }
        );
    }

    /**
     * gets the stats from the db
     * @returns {Promise.<TResult>|*|{anyOf}}
     */
    getStats() {
        let headers = new Headers({
            'Accept': 'application/json'
        })
        return fetch(server + 'statuses', {
            method: 'GET',
            headers: headers,
        }).then((resp)=>{
            if(resp.ok){
                return resp.json()
            }else{
                return Promise.reject(resp)
            }
        })
    }

    /**
     * gets the names from the db
     * @returns {Promise.<TResult>|*|{anyOf}}
     */
    getNames() {
        let headers = new Headers({
            'Accept': 'application/json'
        })
        return fetch(server + 'names', {
            method: 'GET',
            headers: headers,
        }).then((resp)=>{
            if(resp.ok){
                return resp.json()
            }else{
                return Promise.reject(resp)
            }
        })
    }

    /**
     * gets the categories from the db
     * @returns {Promise.<TResult>|*|{anyOf}}
     */
    getCategories() {
        let headers = new Headers({
            'Accept': 'application/json'
        })
        return fetch(server + 'cat', {
            method: 'GET',
            headers: headers,
        }).then((resp)=>{
            if(resp.ok){
                return resp.json()
            }else{
                return Promise.reject(resp)
            }
        })
    }

    // todo: get error details
    getKnownErrorDetails() {
        let headers = new Headers({
            'Accept': 'application/json'
        })
        return fetch(server + '', {
            method: 'GET',
            headers: headers,
        }).then((resp)=>{
            if(resp.ok){
                return resp.json()
            }else{
                return Promise.reject(resp)
            }
        })
    }

    // //todo: get worklogs
    // getWorklogsFromKnownError(knownError) {
    //     let headers = new Headers({
    //         'Accept': 'application/json'
    //     })
    //     return fetch(server + 'worklog', {
    //         method: 'GET',
    //         headers: headers,
    //     }).then((resp)=>{
    //         if(resp.ok){
    //             return resp.json()
    //         }else{
    //             return Promise.reject(resp)
    //         }
    //     })
    // }

    //todo: get worklog details
    getWorklogDetails(worklog) {
        let headers = new Headers({
            'Accept': 'application/json'
        })
        return fetch(server + 'singleWorklog', {
            method: 'GET',
            headers: headers,
        }).then((resp)=>{
            if(resp.ok){
                return resp.json()
            }else{
                return Promise.reject(resp)
            }
        })
    }


}