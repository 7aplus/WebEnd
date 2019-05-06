//get username from the URL
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

var username = window.localStorage.getItem("username");
//更改右上角的用户名
$(".dropdown-toggle").html("<img src=\"assets/images/users/1.jpg\" alt=\"user\" class=\"profile-pic m-r-5\" />"+username);



$("#home_page").attr("href", "user_managment_alter.html?username=" + username);
$("#report_page").attr("href", "table-report-1.html?username=" + username);
$("#profile_page").attr("href", "pages-profile.html?username=" + username);
$("#home_link").attr("href", "user_managment_alter.html?username=" + username);

//切换语言
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
    var table_zh = ["订单号", "时间", "状态", "反馈"];
    var table_en = ["Order Number", "Time", "Status", "Feedback"];
    var language_now = window.localStorage.getItem("language");
    if (language_now == "zh") {
        // $(this).text("english")
        $("#table_head").children("th").each(function (i, item) {
            $(item).text(table_zh[i]);
        });
        $(".fa fa-table m-r-10").text("主菜单");
        $(".card-title").html("主菜单");
        $("#switch_language_btn").html("切换语言");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>主菜单");
        $("#report_page").html("<i class=\"fa fa-columns m-r-10\" aria-hidden=\"true\"></i>上报");
        $("#profile_page").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>个人信息");
    } else {
        $("#table_head").children("th").each(function (i, item) {
            $(item).text(table_en[i]);
        });
        $(".card-title").html("Basic Table");
        $("#switch_language_btn").html("Switch Language");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>Basic Table");
        $("#report_page").html("<i class=\"fa fa-columns m-r-10\" aria-hidden=\"true\"></i>Report");
        $("#profile_page").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>Profile");
    }
}
switchLanguage();

//首先想api发送请求
var text = {
    "username": username
}
var data_each;
$.ajax({
    type: "POST",
    url: 'http://10.19.42.253:5000/report/get_someone_report',
    data: JSON.stringify(text),
    contentType: "application/jason; charset=UTF-8",
    async: false,
    cache: false,
    processData: false,
    success: function (data) {
        var len = data.reports.length;
        var i;
        for (i = 0; i < len; i++) {
            if (data.reports[i].status == 1) {
                $("#info_tbody").append("<tr>  <td>" + data.reports[i].orderId + "</td>  <td>" + data.reports[i].time + "</td><td>Accpt</td><td>" + data.reports[i].feedback + "</td></tr>");
            } else if (data.reports[i].status == (-1)) {
                $("#info_tbody").append("<tr>  <td>" + data.reports[i].orderId + "</td>  <td>" + data.reports[i].time + "</td><td>Reject</td><td>" + data.reports[i].feedback + "</td></tr>");
            }
            else{
                $("#info_tbody").append("<tr>  <td>" + data.reports[i].orderId + "</td>  <td>" + data.reports[i].time + "</td><td>Waitting</td><td>" + data.reports[i].feedback + "</td></tr>");
            }

        }

    }
})



