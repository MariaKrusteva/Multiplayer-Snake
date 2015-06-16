define(["jquery", "handlebars"], function($, Handlebars) {
  var
    template = "",
    defaultConfig = {
    };

  function fillTable(data, container){
    $(container).find("tbody").html("");
    var template = $("#table-template").html();
    var f = Handlebars.compile(template);
    var context = {row: data};
    $(container).find("tbody").append(f(context));

    setTimeout(function() {
      listAll(defaultConfig.serviceUrl, defaultConfig.container);
    }, defaultConfig.updateTime);
  };

  function dataToGamesList(data){
    var allGames = [];
    Object.keys(data).forEach(function(key){
      allGames.push({gameId:key, information: data[key]});
    });

    return allGames;
  };

  function listAll(serviceUrl, container){
    $.ajax({
      url: serviceUrl,
      type: "GET"
    }).done(function(result){
      fillTable(dataToGamesList(result), container);
    });
  };

  function init(config) {
    template = $("#table-template").html();
    defaultConfig = config;

  }

  function render() {
    var thatConfig = defaultConfig;
    $(thatConfig.container).find("#refresh").on("click", function(){
      $(thatConfig.container).find("tbody").html("");
      listAll(thatConfig.serviceUrl, thatConfig.container);
    })


    listAll(thatConfig.serviceUrl, thatConfig.container);

    $(defaultConfig.container).on("click", ".connect", function(){
      var
        gameId = this.id,
        name = prompt("name");

      $.ajax({
        url: defaultConfig.serviceUrl2,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
          "playerName": name,
          "socketId": defaultConfig.socketId,
          "gameId": gameId
        })
      }).done(function(result){
        console.log(result);
      })
    })
  }

  function hide() {
    $(defaultConfig.container).hide();
  }


  return {
    init: init,
    render: render,
    hide: hide
  }

});
