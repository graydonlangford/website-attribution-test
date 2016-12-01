//get specific url param
/*
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// call function
var email = getUrlParameter("email") || ''

// if the param exists, set a cookies with it.
if (email !== '') {
  var setCookie = Cookies.set('email',email)
}
*/

///////////////////////////////////////////
//     make cookies from url params      //
///////////////////////////////////////////

// get ALL query params
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

// call function to get all params
var query = getQueryParams(document.location.search)

// for each param, if it's a valid one, make a cookie with it.
if (query) {
  var fieldStartCharacters = 'ac_'
  var pattern = new RegExp('^' + fieldStartCharacters + '(.+)')

  for (var param in query) {
    var fieldName = pattern.exec(param)
    if (query.hasOwnProperty(param) && fieldName) {
      fieldName = fieldName[1]
      $.cookie(fieldName,query[param])
    }
  }
}



///////////////////////////////////////////
//    fill in form with cookie values    //
///////////////////////////////////////////

/*

var forms = [
  {
    formName: 'formname',
    fields: [
      {
        cookieName: 'cookieName',
        fieldName: 'fieldname',
        defaultValue: 'defaultvalue'
      },
      {
        cookieName: 'cookieName',
        fieldName: 'fieldname',
        defaultValue: 'defaultvalue'
      }
    ]
  }
  ]

forms.forEach(function(form){
  form.fields.forEach(function(field){
    document[form.formName][field.fieldName].value = $.cookie(field.cookieName) || field.defaultValue
  })
})



//////////////////////////////////////////
cookieformfiller(formId,[]){
  get array of cookies
  //get the form (jquery formID)
  for each cookie variable // cookie_variable == [source,collegeplus]
    if $(#field_id) == cookie_variable[0]
      $(#field_id).attr(cookie_variable[1])

}

field[8,0] = 'Nathan'
field[%FIRST_NAME%,0] = 'Nathan'


process for adding NEW information to our forms:

1) add field to form (choose a good ID)
2) add field (if necessary) to ActiveCampaign (or get the name/id of the field if exist)
3) set up the server to take info from form and pass to AC (setup integration between steps 1 and 2)
4) choose key name for url parameter (get variable) (must be the same name as the field name)
5) start using the url parameter in the emails

*/