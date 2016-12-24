// Seach the particular word in the document
module.exports = {

  searchForWord : function($, word){
  var bodyText = $('html > body').text();
  if (bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    return true;
  }
  return false;
}

,
// collect all the absolute and relative hyperlinks on the website.
  collectHyperLinks : function($){
  var allRelativeLinks = [];
  var allAbsoluteLinks = [];

  var relativeLinks = $("a[href^='/']");

  relativeLinks.each(function(){
    allRelativeLinks.push($(this).attr('href'));
  });

  var absoluteLinks = $("a[href^='http']");

  absoluteLinks.each(function(){
    allAbsoluteLinks.push($(this).attr('href'));
  });

  console.log("Found " + allAbsoluteLinks.length + "absolute links.");
  console.log("Found " + allRelativeLinks.length + "relative links.");
}
};
