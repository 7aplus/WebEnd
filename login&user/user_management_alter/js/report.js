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


function getType() {
    var type = window.localStorage.getItem("type");
    return type;
}

var username = window.localStorage.getItem("username");

$(".dropdown-toggle").html("<img src=\"assets/images/users/1.jpg\" alt=\"user\" class=\"profile-pic m-r-5\" />" + username);


$("#home_page").attr("href", "user_managment_alter.html?username=" + username);
$("#report_page").attr("href", "table-report-1.html?username=" + username);
$("#profile_page").attr("href", "pages-profile.html?username=" + username);
$("#home_link").attr("href", "user_managment_alter.html?username=" + username);


function GetExtensionFileName(pathfilename) {
    var reg = /(\\+)/g;
    var pString = pathfilename.replace(reg, "#");          //用正则表达式来将\或\\替换成#
    var arr = pString.split("#");  // 以“#”为分隔符，将字符分解为数组 例如 D Program Files bg.png
    var lastString = arr[arr.length - 1];            //取最后一个字符
    var arr2 = lastString.split(".");                  //   再以"."作为分隔符
    return arr2[arr2.length - 1];                   //将后缀名返回出来
}

let srcData = ' ';

function fileBase64() {
    let filesSelected = document.getElementById("picture").files;
    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];

        let fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            if (fileToLoad.size < 2100000 && (GetExtensionFileName(fileToLoad.name) === 'jpg' || GetExtensionFileName(fileToLoad.name) === 'png')) {
                alert("agree");
                srcData = fileLoadedEvent.target.result; // <--- data: base64

                let newImage = document.createElement('img');
                newImage.src = srcData;
            } else if (GetExtensionFileName(fileToLoad.name) !== 'jpg' || 'png') {
                alert('You should upload a picture in .jpg or .png');
            } else if (fileToLoad.size > 2100000) {
                alert('The picture is too large.')
            }


        };
        fileReader.readAsDataURL(fileToLoad);
    }
}

//上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败


var btn = document.getElementById("report_btn");
btn.addEventListener('click', function (e) {
    e.preventDefault();
    //get three information
    var location = document.getElementById("location").value;
    var time = document.getElementById("time").value;
    var message = document.getElementById("message").value;


    // get the information of the picture
    // var img = $("#pic").val();
    // var imgarr = pic.split('\\');
    // var myimg=imgarr[imgarr.length-1]; //去掉 // 获取图片名
    // var houzui = myimg.lastIndexOf('.'); //获取 . 出现的位置
    // var ext = myimg.substring(houzui, myimg.length).toUpperCase();  //切割 . 获取文件后缀
    //
    // //get the picture object
    // var file = $('#pic').get(0).files[0];
    // var fileSize = file.size;
    // var maxSize = 102400;
    //
    // if(ext !='.PNG' && ext !='.GIF' && ext !='.JPG' && ext !='.JPEG' && ext !='.BMP') {
    //     alert("You have to submit Picture");
    // }
    // else if(parseInt(fileSize) >= parseInt(maxSize)){
    //     alert('the picture size has to be less than 100kb');
    // }
    // else{
    // set the data message
    var srcdat = ' ';
    var text = {
        "username": username,
        "location": location,
        "time": time,
        "message": message,
        'photo': srcData.toString()
    };

    $.ajax({
        type: "POST",
        url: 'http://10.19.42.253:5000/report/create_report',
        data: JSON.stringify(text),
        contentType: "application/jason; charset=UTF-8",
        async: false,
        cache: false,
        processData: false,
        success: function () {
            alert('success');

        }
    });
    window.history.go(-1);

    // }


    //get the text of the json object


});

//正则判断部分
var strRegex = "[a-z0-9A-Z]+";
var re=new RegExp(strRegex);
$("#location").on('blur',function () {
    $("#location_span").removeAttr("hidden");
    if (re.test($("#location1").val()) == true){
        $("#location_div").removeAttr("class");
        $("#location_div").addClass(" form-group has-feedback has-success ");
        $("#location_icon").removeAttr("class");
        $("#location_icon").addClass("fa fa-check-square fa-2x");
    }
    else{
        $("#location_div").removeAttr("class");
        $("#location_div").addClass(" form-group has-feedback has-danger");
        $("#location_icon").removeAttr("class");
        $("#location_icon").addClass("fa fa-close fa-2x");
    }
})

$("#message").on('blur',function () {
    $("#message_span").removeAttr("hidden");
    if (re.test($("#message").val()) == true){
        $("#message_div").removeAttr("class");
        $("#message_div").addClass(" form-group has-feedback has-success ");
        $("#message_icon").removeAttr("class");
        $("#message_icon").addClass("fa fa-check-square fa-2x");
    }
    else{
        $("#message_div").removeAttr("class");
        $("#message_div").addClass(" form-group has-feedback has-danger");
        $("#message_icon").removeAttr("class");
        $("#message_icon").addClass("fa fa-close fa-2x");
        console.log("into it")
    }
})









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
    var table_zh = ["地点",  "图片", "信息"];
    var table_en = ["Location", "Picture", "Message"];
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
        $(".card-title").html("主表单");
        $('#timelabel').html('时间');
        $("label").each(function (i, item) {
            $(item).text(table_zh[i]);
        });
        $("#report_btn").text("提交");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>主菜单");
        $("#report_page").html("<i class=\"fa fa-columns m-r-10\" aria-hidden=\"true\"></i>上报");
        $("#profile_page").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>个人信息");


    } else {
        // $("label").each(function (i, item) {
        //     $(item).text(table_en[i]);
        // });
        // $("#report-title").text("Report");
        // $("#little-title").html("Report");
        // $("#home_link").html("Home");
        // $(".card-title").html("Basic Form");
        // $('#timelabel').html('Time');
        //
        // $("#switch_language_btn").html("switch language");
        // $("#basic_form").children("label").each(function (i, item) {
        //     $(item).text(table_en[i]);
        // });
        // $("#report_btn").text("Submit");
        // $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>Basic Table");
        // $("#report_page").html("<i class=\"fa fa-columns m-r-10\" aria-hidden=\"true\"></i>Report");
        // $("#profile_page").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>Profile");
    }
}

switchLanguage();