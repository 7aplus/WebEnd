function oneValues(){
    let result;
    let url=window.location.search; //获取url中"?"符后的字串
    if(url.indexOf("?")!==-1){
        result = url.substr(url.indexOf("=")+1);
    }
    return result;
}
var username = window.localStorage.getItem("username");
//添加三个按钮的listener
$("#insurance_1").on('click',function () {
    window.location.href = "table-report.html?username="+username+"&type=1"
    window.localStorage.setItem("type", "1");
})
$("#insurance_1").on('click',function () {
    window.location.href = "table-report.html?username="+username+"&type=2"
})
$("#insurance_1").on('click',function () {
    window.location.href = "table-report.html?username="+username+"&type=3"
})


//双语切换部分
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
        $("#switch_language_btn").html("切换语言");
        $("#report-title").text("上报");
        $("#little-title").html("上报");
        $("#home_link").html("主菜单");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>主菜单");
        $("#report_page").html("<i class=\"fa fa-columns m-r-10\" aria-hidden=\"true\"></i>上报");
        $("#profile_page").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>个人信息");
    } else {
        $("#table_head").children("th").each(function (i, item) {
            $(item).text(table_en[i]);
        });
        $("#report-title").text("Report")
        $("#little-title").html("Report");
        $("#home_link").html("Home");
        $("#switch_language_btn").html("switch language");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>Basic Table");
        $("#report_page").html("<i class=\"fa fa-columns m-r-10\" aria-hidden=\"true\"></i>Report");
        $("#profile_page").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>Profile");
    }
}
switchLanguage();