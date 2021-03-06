var getQueryParams = function (qs) {
    qs = qs.split('+').join(' '); // replace '+' in the querystring with ' ' (space)

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

var bake = function (query, pattern) { // for each param, if it's a valid one, make a cookie with it.
  if (query) { //if there is a query string
    for (var param in query) { // for each url param key/value pair in the querystring...
      var fieldName = pattern.exec(param) // run the regex test on the key name
      if (query.hasOwnProperty(param) && fieldName) { // if the current parameter isn't from the object prototyp, and passed the regex test...
        $.cookie(fieldName[1],query[param]) // ... then create a cookie with the name of the param, and the value from the url parameter
      }
    }
  }
}

var fillFieldsWithCookies = function (cookies, pattern, type) {
  for (var cookie in cookies) { // for each cookie
    var validCookie = cookies.hasOwnProperty(cookie) //make sure the cookie is a real cookie, not a member of the object prototyp
    var cookieName = pattern.exec(cookie) //check if the cookie's name matches the cookie-form naming convention. This indicates that the cookie should be applied to form fields of the same name. Returns the name if valid.
    var cookieValue = cookies[cookie] // set a variable with the value of the cookie for easy reference
    var targetFields = ''

    if (validCookie && cookieName) { // if the cookie is valid, the cookie passes the name test (cookieName is truthy), and the jquery found some form fields...
      if (type === 'sumome') {
        targetFields = $('[name=\'sumome_' + cookieName[1] + '\']'); // for sumome forms, add hidden fields for each cookie to store values using the scheme: 'sumome_ac_cookie'
      } else {
        targetFields = $( '.' + cookieName[1]); // for any other forms, add a class using this scheme: 'ac_cookie'
      }
      targetFields.val(cookieValue) // ... then change the value of the found jquery elements with the value of the cookie
    }
  }
}

$(document).ready(function () {
  var fieldStartChars = 'ac_'
  var pattern = new RegExp('^(' + fieldStartChars + '.+)') // create regex object for testing url parameters

  bake(getQueryParams(document.location.search), pattern) //make cookies from url params
  fillFieldsWithCookies($.cookie(), pattern, '')

  var observer = new MutationObserver(function (rec, obs) {

    // FIND SUMOME AND GIVE THEM THE RIGHT CLASS

    fillFieldsWithCookies($.cookie(), pattern, 'sumome')
  })

  observer.observe(document,{childList: true, subtree: true})
})
