'use strict'

let request = require('request');

export default class Store {

    getKnownErrors() {

//        return fetch('http://10.22.37.89:3000/')
        return fetch('http://localhost:3000/').then((resp) => {
                if(resp.ok) {
                    return resp.json()
                }
                else {
                    return Promise.reject(resp)
                }
            })

    }

    addKnownError(item) {
        console.log("addItem " + item.title)

        request.post(
            'http://localhost:3000/add',
            {json:item},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('replace')
                 //   window.location.replace('http://localhost:8008/src/index.html')
                }
                else {
                    console.log("error", item)
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
}