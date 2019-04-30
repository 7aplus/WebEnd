function oneValues(){
    let result;
    let url=window.location.search; //获取url中"?"符后的字串
    if(url.indexOf("?")!==-1){
        result = url.substr(url.indexOf("=")+1);
    }
    return result;
}
var username = oneValues();
//添加三个按钮的listener
$("#insurance_1").on('click',function () {
    window.location.href = "table-report.html?username="+username+"&type=1"
})
$("#insurance_1").on('click',function () {
    window.location.href = "table-report.html?username="+username+"&type=2"
})
$("#insurance_1").on('click',function () {
    window.location.href = "table-report.html?username="+username+"&type=3"
})