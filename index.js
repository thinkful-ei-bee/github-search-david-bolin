'use strict';
const store = {
  results: []
};

function createHtmlUrl(item) {
  const {name, url} = item;
  return `<li><a href="${url}">${name}</a></li>`;
}

function render() {
  let htmlStr = '';
  for (let i = 0; i < store.results.length; i++) {
    htmlStr += createHtmlUrl(store.results[i]);
  }
  $('.search-results').html(htmlStr);
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then(result => result.json());
}

function cleanedResults(results) {
  const resArray = [];
  for (let i = 0; i < results.length; i++) {
    let currentResult = results[i];
    resArray.push({
      name: currentResult.name,
      url: currentResult['html_url']
    });
  }
  return resArray;
}


function handleInput() {
  $('form#username-search-form').submit(event => {
    event.preventDefault();
    const username = $('.username').val();
    getRepos(username).then(function(results) {
      store.results = cleanedResults(results);
      render();
      // console.log(store.results);
    });
  });
}

function main() {
  handleInput();
  render();
}

$(main);