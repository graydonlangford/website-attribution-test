function getQueryParams(qs) {
    qs = qs.split('+').join(' '); // replace '+' in the querystring with ' ' (space)

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

// call function to get all params
var query = getQueryParams(document.location.search) //get all the url parameters as an object
var fieldStartCharacters = 'ac_' // set the characters which determine if a url parameter should be turned into a cookie. key/value pairs with names that start with these characters will be turned into cookies
var pattern = new RegExp('^(' + fieldStartCharacters + '.+)') // create regex object for testing url parameters

// for each param, if it's a valid one, make a cookie with it.
if (query) { //if there is a query string
  for (var param in query) { // for each url param key/value pair in the querystring...
    var fieldName = pattern.exec(param) // run the regex test on the key name
    if (query.hasOwnProperty(param) && fieldName) { // if the current parameter isn't from the object prototyp, and passed the regex test...
      $.cookie(fieldName[1],query[param]) // ... then create a cookie with the name of the param, and the value from the url parameter
    }
  }
}

///////////////////////////////////////////
//    fill in form with cookie values    //
///////////////////////////////////////////

// add a function to jquery which allows easy, clear testing if an element was returned from a query
$.fn.exists = function () {
  return this.length !== 0;
}

var cookies = $.cookie() //create object of all cookies

for (var cookie in cookies) { // for each cookie
  var validCookie = cookies.hasOwnProperty(cookie) //make sure the cookie is a real cookie, not a member of the object prototyp
  var cookieName = pattern.exec(cookie) //check if the cookie's name matches the cookie-form naming convention. This indicates that the cookie should be applied to form fields of the same name. Returns the name if valid.
  var cookieValue = cookies[cookie] // set a variable with the value of the cookie for easy reference
  var targetFields = $("[name='" + cookieName[1] + "']") // find all form fields on the page that match the cookie

  if (validCookie && cookieName && targetFields.exists()) { // if the cookie is valid, the cookie passes the name test (cookieName is truthy), and the jquery found some form fields...
    targetFields.val(cookieValue) // ... then change the value of the found jquery elements with the value of the cookie
  }
}