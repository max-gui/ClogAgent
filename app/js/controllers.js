'use strict';

/* Controllers */

angular.module('myApp.controllers', []).directive('popover', function() {
  return function(scope, elem) {
    elem.popover();
  }
})
.controller('homeCtrl', ['$scope','myData','$http','$state','$filter',
                         function($scope, myData, $http,$state,$filter) {




                         }])
.controller('funcCtrl', ['$scope', '$state', '$http','myData',
                         function($scope, $state, $http, myData) {
                           $scope.test= {as:12,bc:'sdfa',de:true}

                           $scope.pageInfo =
                             {
                             pageIndex:1,
                             infoArr:[
                               {url:'',nextInfo:{lts:'',lsrk:''},pageIndex:0},
                               {url:'',nextInfo:{lts:'',lsrk:''},pageIndex:0},
                               {url:'',nextInfo:{lts:'',lsrk:''},pageIndex:0},
                               {url:'',nextInfo:{lts:'',lsrk:''},pageIndex:0},
                               {url:'',nextInfo:{lts:'',lsrk:''},pageIndex:0},
                               {url:'',nextInfo:{lts:'',lsrk:''},pageIndex:0}]}

                           $scope.tagValuePairs = ''
                           $scope.tdata = [
                             {data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]}]

                           $scope.LevelArray = [
                             {check:'active',state:true,name:'DEBUG'},
                             {check:'',state:false,name:'INFO'},
                             {check:'',state:false,name:'WARN'},
                             {check:'',state:false,name:'ERROR'},
                             {check:'',state:false,name:'FATAL'}]

                           $scope.TypeArray = [
                             'ALL','OTHER','APP','URL','WEB_SERVICE','SQL','MEM_CACHED'];

                           $scope.apiTemp = 340101;
                           $scope.fromDate='2014-08-19%2020:45:20';//$filter('encodeUri')('2014-08-19%2020:45:20');
                           $scope.toDate='2014-08-19%2020:47:22';//$filter('encodeUri')('2014-08-19%2020:47:22');
                           $scope.logType = {index: 0};//0-5&null

                           $scope.serverIp = [
                             'SH02SVR2626',//'10.8.5.99',
                             'SH02SVR1860',// '10.8.5.112',
                             'SH02SVR1199',// '10.8.5.113',
                             'VMS05885',// '10.8.5.36',
                             'VMS05908',// '10.8.5.39',
                             'VMS05909']// '10.8.5.44'


                           $scope.preData = function(){
                             console.log(-- $scope.pageInfo.pageIndex )}

                           $scope.nextData = function(){
                             console.log(++ $scope.pageInfo.pageIndex )

                             $scope.pageInfo.infoArr.forEach(
                               function(info,index){
                                 help(info.url,index,info.nextInfo.lts,info.nextInfo.lsrk)})}

                           var help = function(urlTmp,serverIndex,lts,lsrk){

                             $http.get(urlTmp,{timeout: 300000}).
                             success(function(data) {
                               if(data.size == 100){
                                 data.logs.forEach(function(val,index){
                                   var dataTmp = val
                                   var dataMod = dataTmp
                                   var messageTmp = angular.fromJson(dataTmp.message)
                                   dataMod.message = messageTmp
                                   dataMod.message.Request = angular.fromJson(messageTmp.Request)
                                   dataMod.message.Response = angular.fromJson(messageTmp.Response)

                                   $scope.tdata[serverIndex].data.splice(
                                     $scope.tdata[serverIndex].data.length,0,dataMod)
                                   if(index == 0){
                                     console.log(dataMod)
                                   }
                                 })


                                 //$scope.tdata[serverIndex] = $scope.tdata[serverIndex].concat(dataMod)
                                 //console.log(dataTmp[0])
                                 $scope.pageInfo.infoArr[serverIndex].nextInfo.lts = data.lastTimestamp
                                 $scope.pageInfo.infoArr[serverIndex].nextInfo.lsrk = data.lastScanRowKey

                               }else{
                                 $scope.pageInfo.infoArr[serverIndex].nextInfo.lts = ''
                                 $scope.pageInfo.infoArr[serverIndex].nextInfo.lts = ''

                               }
                             }).
                             error(function(data,status){
                               //alert('fuck!')
                             });
                           }

                           var getLog = function(urlArrIn){

                             $scope.serverIp.forEach(
                               function(ip,index){
                                 urlArrIn.forEach(
                                   function(urlE){
                                     var urlTmp = urlE +
                                         '&hostName=' + ip;
                                     $scope.pageInfo.infoArr[index].url = urlTmp

                                     help(urlTmp,index,'','')
                                   }
                                 )
                               }
                             )



                           }
                           $scope.logSeach = function(){
                             /*
                             var logLevel=
                                 [2,3];
                             */
                             var urlHead = 'http://rest.logging.sh.ctriptravel.com/data/logs/' + $scope.apiTemp + '?';
                             var url = urlHead +
                                 'fromDate=' + $scope.fromDate.replace(/T/, ' ') + ':00' +
                                 '&toDate=' + $scope.toDate.replace(/T/, ' ') + ':00';

                             if ($scope.logType.index > 0 ){
                               url = url +
                                 '&logType=' + ($scope.logType.index - 1);
                             }

                             url = url + '&' + $scope.tagValuePairs
                             url = url + '&lastTimestamp=&lastScanRowKey='
                             /*
                             var tags =
                                 [{tagKey:'logtype',
                                   tagValue:'paymentinfo'},
                                  {tagKey:'servicecode',
                                   tagValue:31000301}];

                             tags.forEach(
                               function(data){

                                 url =
                                   url +
                                   '&tagKey=' +
                                   data.tagKey +
                                   '&tagValue=' +
                                   data.tagValue
                               }
                             );
                             */

                             var urlArr = [];
                             /*
                             logLevel.forEach(
                               function(level){
                                 var urlTmp = url +
                                     '&logLevel=' + level;
                                 urlArr.splice(0,0,urlTmp);
                               }
                             )
                             */
                             $scope.LevelArray.forEach(
                               function(level,index){
                                 if(level.state == true){
                                   var urlTmp = url +
                                       '&logLevel=' + index;
                                   urlArr.splice(0,0,urlTmp);
                                 }
                               }
                             )

                             getLog(urlArr)
                           }
                         }])
