import * as _ from 'lodash/fp/object';

export function post(url, body, headers) {
    let queryHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    if(headers) {
        queryHeaders = _.assignIn(queryHeaders, headers);
    }
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: queryHeaders,
        body: JSON.stringify(body)
    });
}

export function get(url, headers) {
    let queryHeaders = {
        "Content-Type": "application/json"
    };
    if(headers) {
        queryHeaders = _.assignIn(queryHeaders, headers);
    }
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: queryHeaders
    }).then(resp => {
        return resp.json();
    });
}
