define(["jquery", "handlebars"], function($, Handlebars) {

  function init(config){

    $(config.container).find("#create").on("click", function(event){
      event.preventDefault();
      var name = $(config.container).find("#name").val();

      $.ajax({
        url: config.servicerUrl,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
          "playerName": name,
          "socketId": config.socketId
        })
      }).done(function(result){
        console.log(result);
        config.gameIdCallback(result.gameId);
      });
    });
  }

  function hide(){
    $(config.container).hide();
  }


  return {
    init: init,
    hide: hide
  }
});
