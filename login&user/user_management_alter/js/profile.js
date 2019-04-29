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

var f_name = $("#f_name");
var l_name = $("#l_name");
var email = $("#email");
var phone_num = $("#phone_num");
var country = $("#country");
var password = $("#password");

var text = { "type":"user",
"name": username,
};

$.ajax({
    type: "POST",
    url: 'http://10.19.42.253:5000/account/get_account_details',
    data: JSON.stringify(text),
    contentType:"application/jason; charset=UTF-8",
    async: false,
    cache: false,
    processData: false,
    success: function (data) {
        alert("aaaaa")
        if(data.status_code == "success"){
            $("#f_name").val(data.firstName);
            $("#l_name").val(data.lastName);
            $("#email").val(data.email);
            $("#phone_num").val(data.phone);
            $("#country").val(data.country);
            $("#password").val(data.password);
        }

    }
})
