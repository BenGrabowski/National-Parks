'use strict';

const baseURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'yLjjGMohTz9qmXzu7KeYtzvBqrWB45Cwb5VYvUKY';

function getParks(states, maxResults){
    const params = {
        api_key: apiKey,
        stateCode: states,
        limit: maxResults,
        fields: 'addresses'
    };

    const queryString = formatParams(params);
    const url = baseURL + '?' + queryString;

    console.log(url);
    console.log('getParks ran');

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        } throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
        $('#error-message').text(`Something went wrong: ${error.message} `);
    });
}

function displayResults(responseJson){
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li>
                <h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a>
                <p>${responseJson.data[i].addresses[0].line1}<br />
                ${responseJson.data[i].addresses[0].line2}<br />
                ${responseJson.data[i].addresses[0].city},
                ${responseJson.data[i].addresses[0].stateCode}<br />
                ${responseJson.data[i].addresses[0].postalCode}</p>
            </li>`
        )}
    $('#results').removeClass('hidden');
}

function formatParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function handleSubmit(){
    $('#submit').on('click', event => {
        event.preventDefault();
        const states = $('input[name=states]').val();
        const maxResults = $('input[name=max-results]').val() - 1;
        getParks(states, maxResults);
    });
    
}

$(handleSubmit);
