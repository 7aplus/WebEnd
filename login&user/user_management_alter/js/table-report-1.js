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
$(".dropdown-toggle").html("<img src=\"assets/images/users/5.jpg\" alt=\"user\" class=\"profile-pic m-r-5\" />"+username);

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
console.log(username)


$.ajax({
    type: "POST",
    url: 'http://10.19.42.253:5000/account/get_validity',
    data: JSON.stringify(text),
    contentType: "application/jason; charset=UTF-8",
    async: false,
    cache: false,
    processData: false,
    //解析后端代码，对页面做出反馈
    success: function (data) {
        // let date = new Date(data.validity)
        let time = data.validity
        $("#expire_date").html(time.slice(0,-12));
    }
})

function drawModal(element){
    var id = element.id;
    $("#modal").modal("show");
    if (id == "type1"){
        $(".modal-title").html("Travel Insurance");

    }
    else if(id == "type2"){
        $(".modal-title").html("Personal Insurance");
    }
    else if(id == "type3"){
        $(".modal-title").html("Comprehensive Accident Insurance");
    }
}

//添加renew功能
$("#renew_btn").on('click',function () {
    $("#modal").modal("show");
})

$("#confirm_btn").on('click',function () {
    if($('#policy_ag_disag').is(':checked')){

        let text = {
            "username":username
        }
        $.ajax({
            type: "POST",
            url: 'http://10.19.42.253:5000/account/update_validity',
            data: JSON.stringify(text),
            contentType: "application/jason; charset=UTF-8",
            async: false,
            cache: false,
            processData: false,
            success: function (data) {
                if(data.status == "success"){
                    alert("Renew Success!")
                    window.location.reload();
                }
                else{
                    alert("Error!")
                }
            }
        })
    }
    else{
        alert("You have to Agree policies before you renewing!")
    }
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

        $("#policy_1").html("我们的多语种援助团队可以在您最需要的时候为您提供帮助。你需要医疗和交通。");
        $("#policy_2").html("您的个人信息将会提供给系统，以便你在后续的更新过程中更加方便。");
        $(".modal-title").html("更新政策：")
        $("#close_btn").html("关闭");
        $("#confirm_btn").html("确认");
        $("#confirm_btn").html("确认");
        $("#your_insurance").html("你的保险将过期于")

    } else {
        // $("#table_head").children("th").each(function (i, item) {
        //     $(item).text(table_en[i]);
        // });
        // $("#report-title").text("Report")
        // $("#little-title").html("Report");
        // $("#home_link").html("Home");
        // $("#switch_language_btn").html("switch language");
        // $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>Basic Table");
        // $("#report_page").html("<i class=\"fa fa-columns m-r-10\" aria-hidden=\"true\"></i>Report");
        // $("#profile_page").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>Profile");
    }
}
switchLanguage();