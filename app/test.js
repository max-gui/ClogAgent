var aa = [1,2,3,4]

aa.forEach(function(e,index){
           if (e%2 == 0){
  aa.splice(
    index,1,e)
}
})

aa
