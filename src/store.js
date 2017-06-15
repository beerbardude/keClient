'use strict'

let request = require('request');

const server = "http://localhost:3000/"
//const server = "http://10.43.18.170:3000/"

export default class Store {

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

    getKnownErrorById(id) {
        console.log(id)
        let headers = new Headers({
            'Accept': 'application/json'
        })

        //todo : fetch url anpassen
        return fetch(`http://localhost:3000/ke/:id/`, {
            method: 'GET',
            headers: headers,
        }).then((resp)=>{
            if(resp.ok){
                resp.json()
                //return Promise.resolve(resp)
            }else{
                return Promise.reject(resp)
            }
        })
    }

    addKnownError(knownError) {
        request.post(
            server + 'add',
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

    // todo : check server method
    addWorklog(worklog) {
        request.post(
            server + 'addWl',
            {json:worklog},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('replace')
                    window.location.replace('http://localhost:8008/src/index.html')
                }
                else {
                    console.log("error", worklog)
                }
            }
        );
    }

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

    //todo: get worklogs
    getWorklogsFromKnownError(knownError) {
        let headers = new Headers({
            'Accept': 'application/json'
        })
        return fetch(server + 'worklog', {
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