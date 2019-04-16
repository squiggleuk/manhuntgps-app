var Controller = function() {

  var controller = {
    self: null,

    initialize: function() {
      self = this;
      this.bindEvents();

      $("#map-tab-content").load("./views/map-view.html", function() {
        var div = document.getElementById("map_canvas");
        map = plugin.google.maps.Map.getMap(div, map_style);
        $("#playerId").html('Player: ' + playerId);
      });
      $("#map-tab-content").show();

      $("#settings-tab-content").load("./views/settings-view.html");
      $("#settings-tab-content").hide();
    },

    bindEvents: function() {
      $(".tab-button").on("click", this.onTabClick);
    },

    onTabClick: function(e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
        return;
      }

      var tab = $(this).data("tab");
      if (tab === "#settings-tab") {
        self.renderSettingsView();
      } else {
        self.renderMapView();
      }
    },

    renderSettingsView: function() {
      $(".tab-button").removeClass("active");
      $("#settings-tab-button").addClass("active");
      $(".content-area").hide();
      $("#settings-tab-content").show();
    },

    renderMapView: function() {
      $(".tab-button").removeClass("active");
      $("#map-tab-button").addClass("active");
      $(".content-area").hide();
      $("#map-tab-content").show();
    }

  };

  controller.initialize();
  return controller;

};
