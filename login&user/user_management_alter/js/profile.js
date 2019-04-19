//get the username
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
$("#report_page").attr("href","table-report.html?username="+username);
$("#profile_page").attr("href","pages-profile.html?username="+username);
$("#home_link").attr("href","user_managment_alter.html?username="+username);

$("#profile-pic").click(function () {
    $("#modal").modal("show");
})