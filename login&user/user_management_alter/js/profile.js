//get the username
$(function () {
    $("#show").html(oneValues());
});
function oneValues() {
    let result;
    let url = window.location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") !== -1) {
        result = url.substr(url.indexOf("=") + 1);
    }
    return result;
}
//获得用户名
var username = window.localStorage.getItem("username");
$(".dropdown-toggle").html("<img src=\"assets/images/users/1.jpg\" alt=\"user\" class=\"profile-pic m-r-5\" />" + username);
$(".card-title").html(username);



$("#home_page").attr("href", "user_managment_alter.html?username=" + username);
$("#report_page").attr("href", "table-report-1.html?username=" + username);
$("#profile_page").attr("href", "pages-profile.html?username=" + username);
$("#home_link").attr("href", "user_managment_alter.html?username=" + username);

$("#profile-pic").click(function () {
    $("#modal").modal("show");
})



var text = {
    "type": "user",
    "name": username,
};
//加载页面
$.ajax({
    type: "POST",
    url: 'http://10.19.42.253:5000/account/get_account_details',
    data: JSON.stringify(text),
    contentType: "application/jason; charset=UTF-8",
    async: false,
    cache: false,
    processData: false,
    success: function (data) {
        if (data.status_code == "success") {
            $("#f_name").val(data.firstName);
            $("#l_name").val(data.lastName);
            $("#email").val(data.email);
            $("#phone_num").val(data.phone);
            $("#country").val(data.country);
            $("#password").val(data.password);
            $("#password_confirm").val(data.password);

            //显示自己的名字在头像地下
            $(".card-subtitle").html(data.firstName+" "+data.lastName);
        }

    }
})


$("#upload").on('click', function (e) {
    e.preventDefault();
    var f_name = $("#f_name").val();
    var l_name = $("#l_name").val();
    var email = $("#email").val();
    var phone_num = $("#phone_num").val();
    var country = $("#country").find("option:selected").text();
    var password = $("#password").val();
    var password_confirm = $("#password_confirm").val();

    var text = {
        "type": "user",
        "name": username,
        "email": email,
        "phone": phone_num,
        "firstName": f_name,
        "lastName": l_name,
        "password": password,
        "country": country

    };

    console.log("pas"+password+" pas_con"+password_confirm);
    if(password == password_confirm){
        $.ajax({
            type: "POST",
            url: 'http://10.19.42.253:5000/account/update_account_details',
            data: JSON.stringify(text),
            contentType: "application/jason; charset=UTF-8",
            async: false,
            cache: false,
            processData: false,
            success: function (data) {
                // console.log(data);
                if(data.status == "success"){
                    alert("Upload success");
                }
                else{
                    alert("Error");
                }
            }
        })
    }
    else if(password != password_confirm){
        alert("the two time password have to be same");
    }
    else{
        alert("Error");
    }

    
})


$("#switch_language_btn").on('click', function () {
    //将语言的缓存存为zh，表示中文
    var language_now = window.localStorage.getItem("language");
    if (language_now == "zh") {
        window.localStorage.setItem("language", "en");

    } else {
        window.localStorage.setItem("language", "zh");

    }

    window.location.reload();
})

function switchLanguage() {
    var table_zh = ["姓", "名", "邮箱", "密码","确认密码", "电话", "国籍"];
    var table_en = ["Firstname", "Lastname", "Email", "Password","Password Confirm", "Phone number", "country"];
    var language_now = window.localStorage.getItem("language");
    if (language_now == "zh") {
        // $(this).text("english")
        $("#switch_language_btn").html("切换语言");
        $("#report-title").text("个人信息");
        $("#little-title").html("个人信息");
        $("#home_link").html("主菜单");
        

        $(".form_1").each(function (i, item) {
            $(item).text(table_zh[i]);
        });
        $(".updata_btn").text("更新图片");
        $("#report_btn").text("提交");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>主菜单");
        $("#profile_page").html("<i class=\"fa fa-columns m-r-10\" aria-hidden=\"true\"></i>个人信息");
        $("#profile_link").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>个人信息");
        $("#report_page").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>上报");
    } else {

        $("#report-title").text("Report");
        $("#little-title").html("Report");
        $("#home_link").html("Home");
        
        $("#switch_language_btn").html("switch language");
        $(".form_1").each(function (i, item) {
            $(item).text(table_en[i]);
        });
        $(".updata_btn").text("Update picture");
        $("#report_btn").text("Submit");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>Basic Table");
        $("#profile_page").html("<i class=\"fa fa-columns m-r-10\" aria-hidden=\"true\"></i>Profile");
        $("#profile_link").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>Profile");
        $("#report_page").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>Report");
    }
}
switchLanguage();

