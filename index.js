'use strict';

function getUserRepos (username) {
    fetch('https://api.github.com/users/' + username +'/repos')
        .then(function(response) {
            return response.json();
        })
        .then(function(responseJson) {
            return displayResults(responseJson);
        })
        .catch(error => alert('Something went wrong. Try again later.')); 
}

//returns an array. inside array are repo objects (each repo the username has)
//repo object will have name variable we could use
function displayResults(responseJson) {
    console.log(responseJson);
    for(let i = 0; i < responseJson.length; i++) {
        console.log(responseJson[i].name);
        const listItem = '<li><a href="' + responseJson[i].html_url + '" target="_blank">' 
        + responseJson[i].name 
        +'</a></li>';
        $('#results-list').append(listItem);
    }
    $('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#results-list').empty();
    const searchTerm = $('#searchUserHandle').val();
    getUserRepos(searchTerm);
  });
}

$(watchForm);