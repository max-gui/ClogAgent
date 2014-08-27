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
                           var dataReady = function(data,count){
                             var dTmp = data.data.slice(data.showIndex,data.showIndex + count)

                             dTmp.forEach(function(val,index){
                               var dataTmp = val
                               var dataMod = dataTmp
                               var messageTmp = angular.fromJson(dataTmp.message)
                               dataMod.message = messageTmp
                               dataMod.message.Request = angular.fromJson(messageTmp.Request)
                               dataMod.message.Response = angular.fromJson(messageTmp.Response)
                               dataMod.showFlag = false
                               dataMod.flagTag = 'plus'

                               var attArrTmp = []
                               dataMod.attributes.forEach(function(tag){
                                 var keyTmp = tag.key
                                 if (keyTmp == "uid" ||
                                     keyTmp=="orderid"||
                                     keyTmp =="servicecode"||
                                     keyTmp=="bustype"||
                                     keyTmp == "platform"){
                                   tag.info = "warning"
                                   attArrTmp.unshift(tag)
                                 }else{
                                   tag.info = "primary"
                                   attArrTmp.push(tag)
                                 }})



                               $scope.showData.data.push(dataMod)

                               //$scope.showFlag = false
                               if(index == 0){
                                 console.log(dataMod)
                               }

                             })

                             data.showIndex += count
                           }

                           $scope.showData = {data:[]}
                           $scope.addMoreItems = function() {
                             $scope.tdata.forEach(function(e){
                                console.log("boss,i'm in!")
                               dataReady(e,10)
                             })

                           }

                           $scope.showMessage = function(flag,index){
                             var fTmp = !flag
                             $scope.showData.data[index].showFlag = fTmp
                             if(flag){
                               $scope.showData.data[index].flagTag = "plus"
                             }else{
                               $scope.showData.data[index].flagTag = "minus"
                             }

                             return fTmp
                           }

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
                             {data:[],showIndex:0},{data:[],showIndex:0},
                             {data:[],showIndex:0},{data:[],showIndex:0},
                             {data:[],showIndex:0},{data:[],showIndex:0}]

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
                             if ($$scope.pageInfo.pageIndex > 0){
                               console.log(-- $scope.pageInfo.pageIndex )}}

                           $scope.nextData = function(){
                             console.log(++ $scope.pageInfo.pageIndex )

                             $scope.pageInfo.infoArr.forEach(
                               function(info,index){
                                 help(info.url,index,info.nextInfo.lts,info.nextInfo.lsrk,true)})}

                           var help = function(urlTmp,serverIndex,lts,lsrk,loadOrNot){

                             $http.get(urlTmp,{timeout: 300000}).
                             success(function(data) {

                               $scope.tdata[serverIndex].data = $scope.tdata[serverIndex].data.concat(data.logs)

                               if(loadOrNot){
                                 dataReady($scope.tdata[serverIndex],2)
                               }

                               if(data.size == 100){

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

                                     help(urlTmp,index,'','',true)
                                   }
                                 )
                               }
                             )
                           }

                           $scope.logSeach = function(){
                             $scope.tdata = [
                               {data:[],showIndex:0},{data:[],showIndex:0},
                               {data:[],showIndex:0},{data:[],showIndex:0},
                               {data:[],showIndex:0},{data:[],showIndex:0}]

                             $scope.showData = {data:[]}
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
