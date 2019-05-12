function oneValues(){
    let result;
    let url=window.location.search; //获取url中"?"符后的字串
    if(url.indexOf("?")!==-1){
        result = url.substr(url.indexOf("=")+1);
    }
    return result;
}

//获得用户名
var username = window.localStorage.getItem("username");
$(".dropdown-toggle").html("<img src=\"assets/images/users/1.jpg\" alt=\"user\" class=\"profile-pic m-r-5\" />"+username);

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


//renew 功能
//首先给后端发ajax
var text = {
    "username":username,
};

$.ajax({
    type: "POST",
    url: 'http://10.19.42.253:5000/report/get_someone_report',
    data: JSON.stringify(text),
    contentType: "application/jason; charset=UTF-8",
    async: false,
    cache: false,
    processData: false,
    //解析后端代码，对页面做出反馈
    success: function (data) {


    }
})

function drawModal(element){
    var id = element.id;
    $("#modal").modal("show");
    if (id == "type1"){
        $(".modal-title").html("Travel Insurance");

    }
    else if(id == "type2"){
        $(".modal-title").html("Travel Insurance");
    }
    else if(id == "type3"){
        $(".modal-title").html("Travel Insurance");
    }
}



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