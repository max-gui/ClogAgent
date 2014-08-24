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
                           $scope.tagValuePairs = ""
                           $scope.tdata =
                             [
                             [0,1,2,3,4,5],
                             [10,11,12,13,14,15],
                             [20,21,22,23,24,25],
                             [30,31,32,33,34,35],
                             [40,41,42,43,44,45],
                             [50,51,52,53,54,55]
                           ]
                           $scope.LevelArray =
                             [
                             {check:'active',state:true,name:'DEBUG'},
                             {check:'',state:false,name:'INFO'},
                             {check:'',state:false,name:'WARN'},
                             {check:'',state:false,name:'ERROR'},
                             {check:'',state:false,name:'FATAL'}
                           ]

                           $scope.TypeArray =
                             [
                             'OTHER','APP','URL','WEB_SERVICE','SQL','MEM_CACHED'
                           ];
                           $scope.apiTemp = 340101;
                           $scope.fromDate="2014-08-19%2020:45:20";//$filter('encodeUri')("2014-08-19%2020:45:20");
                           $scope.toDate="2014-08-19%2020:47:22";//$filter('encodeUri')("2014-08-19%2020:47:22");
                           $scope.logType = {index: -1};//0-5&null

                           $scope.serverIp =
                               ["10.8.5.99",
                                "10.8.5.112",
                                "10.8.5.113",
                                "10.8.5.36",
                                "10.8.5.39",
                                "10.8.5.44"
                               ]

                           $scope.logSeach = function(){
                             /*
                             var logLevel=
                                 [2,3];
                             */
                             var urlHead = 'http://rest.logging.sh.ctriptravel.com/data/logs/' + $scope.apiTemp + '?';
                             var url = urlHead +
                                 'fromDate=' + $scope.fromDate.replace(/T/, " ") +
                                 '&toDate=' + $scope.toDate.replace(/T/, " ");

                             if ($scope.logType.index > -1){
                               url = url +
                                 '&logType=' + $scope.logType.index;
                             }

                             url = url + '&' + $scope.tagValuePairs
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

                             var help = function(urlTmp,serverIndex){
                               $http.get(urlTmp,{timeout: 300000}).
                               success(function(data) {
                                 if(data.size == 100){
                                   $scope.tdata[serverIndex].splice($scope.tdata[serverIndex].length,0,data)
                                   help(urlTmp +
                                        "&lastTimestamp=" + data.lastTimetamp +
                                        "&lastScanRowKey=" + data.lastScanRowKey)
                                 }
                               }).
                               error(function(data,status){
                                 //alert("fuck!")
                               });
                             }

                             //var flag = true;
                             $scope.serverIp.forEach(
                               function(ip,index){
                                 urlArr.forEach(
                                   function(urlE){
                                     var urlTmp = urlE +
                                         '&hostName=' + ip;

                                     //if (flag){
                                       //flag = false;
                                       help(urlTmp,index)
                                     //}else{
                                       //flag = true;
                                     //}
                                   }
                                 )
                               }
                             )
                           }



                         }])
.controller('storeViewCtrl', ['$scope', '$stateParams', '$state', '$http',
                              function($scope, $stateParams, $state, $http) {

                                $scope.storeno = $state.params.storeno;
                                $scope.rowNum = [1];
                                $scope.error = "hh";
                                $scope.dataToInsert = new Object();
                                $scope.dataToInsert.SLAB_NO = "";
                                $scope.dataToInsert.TIER_NO = 1;
                                $scope.dataToInsert.pile_no = $scope.storeno;
                                $('#moveAlert').hide();

                                $scope.slabInfo = {
                                  "steel_grade": "板坯钢种",
                                  "slab_thick": "板坯厚度",
                                  "slab_width": "板坯宽度",
                                  "slab_length": "板坯长度",
                                  "slab_weight": "板坯理重",
                                  "tier_no": "板坯层号",
                                  "roll_prg_no": "轧制计划",
                                  "st_no": "出钢记号",
                                  "slab_status": "板坯状态",
                                  "slab_attribute": "板坯属性",
                                  "hcr_flag": "hcr标志",
                                  "heat_no": "炉次号",
                                  "yc_flag": "余材坯",
                                  "order_no": "生产订单号",
                                  "act_weight": "实际重量",
                                  "yard_no": "合格标志",
                                  "plant_no": "铸机号"
                                };

                                $scope.treeOptions = {
                                  dropped : function(event) {
                                    var dataTmp = $scope.storeData;
                                    var sendLength = dataTmp.length;
                                    var dataToSend = [];
                                    var indexTmp;

                                    dataTmp.forEach(
                                      function(elem,index)
                                      {
                                        var eleTmp = {};

                                        indexTmp = sendLength - index;
                                        if(elem.tier_no != indexTmp){
                                          eleTmp.pile_no = elem.pile_no;
                                          eleTmp.slab_no  = elem.slab_no;
                                          eleTmp.tier_no = indexTmp;
                                          eleTmp.index = index;
                                          dataToSend.push(eleTmp);
                                        }
                                      }
                                    )

                                    if (dataToSend.length > 0){
                                      $scope.error = "";
                                      $http.post('http://win8dev/SycWeb/MoveSlab',
                                                 dataToSend,
                                                 {timeout: 1500}).
                                      success(function(data) {
                                        if(data.Status == true){

                                          dataToSend.forEach(
                                            function(elem)
                                            {
                                              dataTmp[elem.index].tier_no = elem.tier_no;
                                            }
                                          )
                                          $('#moveAlert').hide();
                                        }
                                        else
                                        {
                                          $('#moveAlert').show();
                                          $scope.error = data.Message;

                                          $scope.hideOrNot = '';
                                        }
                                      }).
                                      error(function(data, status) {
                                        //$scope.hideOrNot = '';
                                        $('#moveAlert').show();
                                        $scope.error = "网络错误请重新提交，只需提起任意板坯并放在原处即可";
                                      });
                                    }
                                    return true;
                                  },
                                };

                                $http.get('http://win8dev/SycWeb/GetSlabByPileNo/' +
                                          $scope.storeno).success(function(data) {
                                  data.Data.sort(mySortTIER_NO);
                                  $scope.storeData = data.Data;

                                  data.Data.forEach(
                                    function(elem,index)
                                    {
                                      $scope.rowNum.push(index + 2);
                                    }
                                  )
                                });

                                $scope.addGetInit = function()
                                {
                                  $scope.toGetData = [{"slab_id":""}];
                                  $scope.hideOrNot = 'hide';
                                  $scope.error = '';
                                  $('#addGetAlert').hide();

                                }

                                $scope.toGet = function()
                                {
                                  var getDataToSent = [];
                                  $scope.toGetData.forEach(
                                    function(elem){
                                      if(elem.slab_id != ""){
                                        getDataToSent.push(elem.slab_id);
                                      }
                                    }
                                  )

                                  var dataObj = {
                                    "BoolValue":true,
                                    "StringValue":"String content"
                                  };

                                  var json = JSON.stringify(dataObj);

                                  $http.post('http://win8dev/SycWeb/RequestSlab',
                                             getDataToSent,
                                             {timeout: 1500}).
                                  success(function(data) {
                                    if(data.Status == true){

                                      $('#addGetAlert').hide();
                                      $('#addGetModall').modal('hide');
                                    }
                                    else
                                    {
                                      $('#addGetAlert').show();
                                      $scope.error = data.Message;

                                      $scope.hideOrNot = '';
                                    }
                                  }).
                                  error(function(data, status) {
                                    //$scope.hideOrNot = '';
                                    $('#addGetAlert').show();
                                    $scope.error = "网络错误";
                                  });
                                }

                                $scope.addToGet = function() {
                                  $scope.toGetData.push({"slab_id":""});
                                };

                                $scope.myRemove = function(scope,index)
                                {
                                  $http.get("http://win8dev/SycWeb/RemoveSlab?slabno=" +
                                            $scope.storeData[index].slab_no + "&pileno=" +
                                            $scope.storeData[index].pile_no + "&tierno=" +
                                            $scope.storeData[index].tier_no,$scope.dataToInsert,{timeout: 1500}).
                                  success(function(data) {
                                    if(data.Status == true){

                                      scope.remove();
                                      $scope.rowNum.pop();
                                    }
                                  }).
                                  error(function(data, status) {
                                  });
                                };

                                $scope.addSlabInit = function()
                                {
                                  $scope.dataToInsert.SLAB_NO = "";
                                  $scope.dataToInsertTIER_NO = 1;
                                  $('#addSlabAlert').hide();
                                  $scope.error = '';
                                }

                                $scope.addSlab = function() {
                                  //$scope.dataToInsert.SLAB_NO = "";
                                  //$scope.dataToInsert.TIER_NO = "";
                                  var addOrNot = true;
                                  $scope.storeData.forEach(
                                    function(elem)
                                    {
                                      if(elem.slab_no == $scope.dataToInsert.SLAB_NO)
                                      {
                                        $('#addSlabAlert').show();
                                        $scope.error = "这块板坯已经在本堆垛中";

                                        $scope.hideOrNot = '';
                                        addOrNot = false;
                                        return;
                                      }
                                    }
                                  )

                                  if(!addOrNot)
                                  {
                                    return
                                  }

                                  $http.post('http://win8dev/SycWeb/InsertSlab',$scope.dataToInsert,{timeout: 1500}).
                                  success(function(data) {
                                    if(data.Status == true){

                                      $('#addSlabAlert').hide();
                                      $('#addSlabModall').modal('hide');

                                      $scope.storeData.splice($scope.storeData.length + 1 - $scope.dataToInsert.TIER_NO,
                                                              0,
                                                              data.Data).sort(mySortTIER_NO);
                                      $scope.rowNum.push($scope.storeData.length + 1);
                                    }
                                    else
                                    {
                                      $('#addSlabAlert').show();
                                      $scope.error = data.Message;

                                      $scope.hideOrNot = '';
                                    }
                                  }).
                                  error(function(data, status) {
                                    //$scope.hideOrNot = '';
                                    $('#addSlabAlert').show();
                                    $scope.error = "网络错误";
                                  });
                                };

                                function mySortTIER_NO(a,b){
                                  return b.tier_no  - a.tier_no ;
                                }
                              }]);
