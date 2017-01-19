var bake, fillFieldsWithCookies, getQueryParams;

getQueryParams = function(qs) {
  var params, re, tokens;
  qs = qs.split('+').join(' ');
  params = {};
  tokens = void 0;
  re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
};

bake = function(query, pattern) {
  var fieldName, param;
  if (query) {
    for (param in query) {
      fieldName = pattern.exec(param);
      if (query.hasOwnProperty(param) && fieldName) {
        $.cookie(fieldName[1], query[param]);
      }
    }
  }
};

fillFieldsWithCookies = function (cookies, pattern, type) {
  var cookie, cookieName, cookieValue, targetFields, validCookie;
  for (cookie in cookies) {
    validCookie = cookies.hasOwnProperty(cookie);
    cookieName = pattern.exec(cookie);
    cookieValue = cookies[cookie];
    if (validCookie && cookieName) {
      if (type === 'sumome') {
        // for sumome forms, add hidden fields for each cookie to store values using the scheme: 'sumome_ac_cookie'
        targetFields = $('[name=\'sumome_' + cookieName[1] + '\']');
      } else {
        // for any other forms, add a class using this scheme: 'ac_cookie'
        targetFields = $( '.' + cookieName[1]);
      }
      targetFields.val(cookieValue);
    }
  }
}

$(document).ready(function() {
  var fieldStartChars, observer, pattern;
  fieldStartChars = 'ac_';
  pattern = new RegExp('^(' + fieldStartChars + '.+)');
  bake(getQueryParams(document.location.search), pattern);
  fillFieldsWithCookies($.cookie(), pattern, '');
  observer = new MutationObserver(function(rec, obs) {
    //fill fields with cookies for sumome fields
    fillFieldsWithCookies($.cookie(), pattern, 'sumome');
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
});
