'use strict';


// Declare app level module which depends on filters, and services

var app = angular.module('myApp', [
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.router',
  'ui.sortable',
  'ui.tree',
  'infinite-scroll',
  'dataServices',
  'ui.utils',
  'ngTagsInput',
  'ui.bootstrap.datetimepicker',
  'sticky'
]);

app.filter('hostIpFilter',function(){
  return function(items,hostIp) {
    if (hostIp == ''){
      return items
    }
    else{
      var datas = []
      items.forEach(function(e){
        if (e.hostIP == hostIp){
          datas.push(e)
        }
      })

      return datas
    }
  }
})
app.config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
              //$urlRouterProvider.when('/loginPage', {templateUrl: 'partials/loginPage.html', controller: 'loginCtrl'});
              //$urlRouterProvider.when('/funcPage/:name/:password', {templateUrl: 'partials/funcPage.html', controller: 'funcCtrl'});
              //$urlRouterProvider.when('/storageViewPage', {templateUrl: 'partials/storageViewPage.html', controller: 'storageViewCtrl'});
              //$urlRouterProvider.when('/storeViewPage/:storeno', {templateUrl: 'partials/storeViewPage.html', controller: 'storeViewCtrl'});
              //$urlRouterProvider.otherwise({redirectTo: '/loginPage'});

              // For any unmatched url, redirect to /state1
              $urlRouterProvider.otherwise("/homePage");

              //
              // Now set up the states
              $stateProvider
              .state('home', {
                url: "/homePage",
                templateUrl: "partials/homePage.html",
                controller: 'homeCtrl'
              }).
              state('navTemplate', {
                url: "/navTemplate",
                templateUrl: "partials/navTemplate.html",
                controller: ''//'funcCtrl'
              }).
              state('navTemplate.func', {
                url: "/funcPage",
                templateUrl: "partials/funcPage.html",
                controller: 'funcCtrl'
              });
            }]).
directive('popover', function() {
  return function(scope, elem) {
    elem.popover();
  }
});
