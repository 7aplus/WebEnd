//get username from the URL
$(function(){
    $("#show").html(oneValues());
});
function oneValues(){
    let result;
    let url=window.location.search; //获取url中"?"符后的字串
    if(url.indexOf("?")!==-1){
        result = url.substr(url.indexOf("=")+1);
    }
    return result;
}
var username = oneValues();
$("#home_page").attr("href","user_managment_alter.html?username="+username);
$("#report_page").attr("href","table-report-1.html?username="+username);
$("#profile_page").attr("href","pages-profile.html?username="+username);
$("#home_link").attr("href","user_managment_alter.html?username="+username);


//首先想api发送请求
var text = {
    "username":username
}
var data_each;
$.ajax({
    type: "POST",
    url: 'http://10.19.42.253:5000/report/get_someone_report',
    data: JSON.stringify(text),
    contentType:"application/jason; charset=UTF-8",
    async: false,
    cache: false,
    processData: false,
    success: function (data) {
        var len = data.reports.length;
        var i;
        for(i = 0; i < len ; i++){
            if(data.reports[i].status == 1){
                $("#info_tbody").append("<tr>  <td>"+data.reports[i].orderId+"</td>  <td>"+data.reports[i].time+"</td><td>Accpt</td><td>"+data.reports[i].feedback+"</td></tr>");
            }
            else if(data.reports[i].status == (-1)){
                $("#info_tbody").append("<tr>  <td>"+data.reports[i].orderId+"</td>  <td>"+data.reports[i].time+"</td><td>Reject</td><td>"+data.reports[i].feedback+"</td></tr>");
            }

        }

    }
})



