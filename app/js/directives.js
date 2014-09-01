'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

angular.module('myFilters', []).filter('hostIpFilter', function() {
  return function(items,hostIp) {
    var datas = []
    items.forEach(function(e){
      if (e.hostIP == hostIp){
        datas.push(e)
      }
    })

    return datas;
  };
});
