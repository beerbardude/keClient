'use strict'

let request = require('request');

export default class Store {

    getKnownErrors() {
        return fetch('http://localhost:3000/').then((resp) => {
                if(resp.ok) {
                    return resp.json()
                }
                else {
                    return Promise.reject(resp)
                }
            })

    }

    addKnownError(knownError) {
        request.post(
            'http://localhost:3000/add',
            {json:knownError},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('replace')
                    window.location.replace('http://localhost:8008/src/index.html')
                }
                else {
                    console.log("error", knownError)
                }
            }
        );
    }


    getStats() {
        return fetch('http://localhost:3000/statuses').then((resp) => {
            if(resp.ok) {
                return resp.json()
            }
            else {
                return Promise.reject(resp)
            }
        })
    }

    getNames() {
        return fetch('http://localhost:3000/names').then((resp) => {
            if(resp.ok) {
                return resp.json()
            }
            else {
                return Promise.reject(resp)
            }
        })
    }

    getCategories() {
        return fetch('http://localhost:3000/cat').then((resp) => {
            if(resp.ok) {
                return resp.json()
            }
            else {
                return Promise.reject(resp)
            }
        })
    }

    // todo: get error details
    getKnownErrorDetails(knownError) {
        return fetch('http://localhost:3000/errorDetail').then((resp) => {
            if(resp.ok) {
                return resp.json()
            }
            else {
                return Promise.reject(resp)
            }
        })
    }

    //todo: get worklogs
    getWorklogsFromKnownError(knownError) {
          return fetch('http://localhost:3000/worklogs').then((resp) => {
            if(resp.ok) {
                return resp.json()
            }
            else {
                return Promise.reject(resp)
            }
        })
    }

    //todo: get worklog details
    getWorklogDetails(worklog) {
          return fetch('http://localhost:3000/singleWorklog').then((resp) => {
            if(resp.ok) {
                return resp.json()
            }
            else {
                return Promise.reject(resp)
            }
        })
    }
}