var App = {};
App.init = function () {

  var render = function (state) {
    var locations = state.locations;
    var locationsTemplate = Handlebars.compile($('#locations-template').html());
    Handlebars.registerPartial('location', $('#location-template').html());
    Handlebars.registerHelper('each', function(context, options) {
      var ret = "";
      for(var i=0, j=context.length; i<j; i++) {
        ret = ret + options.fn(context[i]);
      }
      return ret;
    });
    var locationsHTML = locationsTemplate({ locations });
    $("#locations").html(locationsHTML);
    $('.select-location').on('click', function (event) {
      var button = $(event.target)
      var locationId = button.data('location-id');
      selectLocation(locationId);
    })

  }
  var selectLocation = function (locationId) {
    var data = JSON.stringify({ "location_id": locationId, "id": 1 });
    $.ajax({
       url: "https://location-winnow.herokuapp.com/users/1",
       type: 'PUT',
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       data: data,
       success: function(response) {
         console.log('response', response);
       }
     })
  }
  var retrieveLocations = function (query) {
    var url_encoded_search_string = encodeURI(query);
    $.getJSON('https://location-winnow.herokuapp.com/locations?query=' + url_encoded_search_string, (response) => {
      locations = response;
      render({locations})
    });
  }


  $('#search-field').on('keyup', function (event) {
      var target = event.target.value;
      retrieveLocations(target);
  })

}
