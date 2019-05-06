window.onload=function () {
    let result;
    let url=window.location.search;
    if(url.indexOf("?")!==-1){
        result = url.substr(url.indexOf("=")+1);
    }


    let text = {"query": result};

    $.ajax({
        type: "POST",
        url: 'http://10.19.42.253:5000/report/get_report',
        data: JSON.stringify(text),
        contentType: "application/jason; charset=UTF-8",
        async: false,
        cache: false,
        processData: false,
        success: function (data) {

            if (data.status_code === 100200) {
                alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
            } else if (data.status_code === 'success') {
                showTable(data);
            } else if (data.status_code === 100220) {
                alert("Password Wrong");
            }
        }
    });
};



function showTable(data){

    let order=document.getElementById('orderId');
    let username=document.getElementById('username');
    let firstName=document.getElementById('firstname');
    let lastName=document.getElementById('lastname');
    let time=document.getElementById('time');
    let description=document.getElementById('description');
    let img = document.getElementById('image1');
    order.innerHTML=data.orderid;
    username.innerHTML=data.username;
    firstName.innerHTML=data.firstname;
    lastName.innerHTML=data.lastname;
    time.innerHTML=data.time;
    description.innerHTML=data.description;
    document.getElementById('image1').src=data.photo;
    img.class= data.photo.toString();
}

$(function() {

    $("#submitForm").click(function(){
        let result;
        let url=window.location.search;
        if(url.indexOf("?")!==-1){
            result = url.substr(url.indexOf("=")+1);
        }
        let radio= $("input[type='radio']:checked").val();
        let feedback= $("textarea[type='text']").val();

        let text = {"orderId": result,"operate": radio, "text" : feedback};

        if (radio==='reject' && feedback==null){
            // alert("You should give some feedback for your rejection!");
        }else{
            $.ajax({
                type: "POST",
                url: 'http://10.19.42.253:5000/report/update_report',
                data: JSON.stringify(text),
                contentType: "application/jason; charset=UTF-8",
                async: false,
                cache: false,
                processData: false,
                success: function (data) {

                    if (data.status_code === 100200) {
                        alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
                    } else if (data.status_code === 'success') {
                        alert("Submitting succeed!");
                    } else if (data.status_code === 100220) {
                        alert("Password Wrong");
                    }
                }
            });
            window.history.go(-1);

        }

    });
});



//switch language
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
    var table_zh = ["#", "订单号", "姓", "名","用户名","状态","操作"];
    var table_en = ["#", "Order Number", "First Name", "Last Name","Username","Status","Operation"];
    var language_now = window.localStorage.getItem("language");
    if (language_now == "zh") {
        // $(this).text("english")
        $("th").each(function (i, item) {
            $(item).text(table_zh[i]);
        });
        $(".fa fa-table m-r-10").text("主菜单");
        $("#report-title").text("主菜单");
        $("#little-title").html("主菜单");
        $("#home_link").html("主页");
        $("#details").html("细节");
        $(".card-title").html("主菜单");
        $("#switch_language_btn").html("切换语言");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>主菜单");
        $("#profile").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>个人信息");

        $(".operation").text("操作");
        $(".dropdown-toggle").text("全部");
        var select_zh = ["用户名","姓","名","提交时间","描述","地点","图片"];
        $(".col-sm-2").each(function (i,item) {
            $(item).text(select_zh[i]);
        })
        $(".optionsRadios1").text("接受");
        $(".optionsRadios2").text("拒绝");
        $(".feedback").text("反馈");


    } else {
        $("th").each(function (i, item) {
            $(item).text(table_en[i]);
        });
        $(".card-title").html("Basic Table");
        $("#report-title").text("Basic Table");
        $("#little-title").html("Basic Table");
        $("#home_link").html("Home");
        $("#details").html("Details");
        $("#switch_language_btn").html("Switch Language");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>Basic Table");
        $("#profile").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>Profile");

        $(".dropdown-header").text("Choose sort mode");
        $(".dropdown-toggle").text("All");
        var select_en = ["All","All waiting","All rejected","All approval"];
        $(".col-sm-2").each(function (i,item) {
            $(item).text(select_en[i]);
        })
    }
}
switchLanguage();