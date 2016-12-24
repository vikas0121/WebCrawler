var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var helper = require('./helper.js')

var START_URL = "http://policybazaar.com";
var SEARCH_WORD = "insurance";
var MAX_PAGES = 10;

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);

crawl();

function crawl(){
  if (numPagesVisited >= MAX_PAGES) {
    console.log("Reached max limit of number of pages to visit.");
    return;
  }
  var nextPage = pagesToVisit.pop();
  if (nextPage in pagesVisited) {
    // We've already visited this page, so repeat the crawl
    crawl();
  }
  else {
    // New page we have not visited
    visitPage(nextPage, crawl);
  }
}

function visitPage(url, callback){

  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited ++ ;

  console.log("Page to visit: " + pagesToVisit);

  request(url, function(error, response, body){
    console.log("Status Code:" + response.statusCode);

      if (response.statusCode !== 200) {
        callback();
        return;
      }
      //Parse the document body
      var $ = cheerio.load(body);
      var isWordFound = helper.searchForWord($, SEARCH_WORD);
      if (isWordFound) {
        console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
      }
      else {
        helper.collectHyperLinks($);
        callback();
      }
    });
}
