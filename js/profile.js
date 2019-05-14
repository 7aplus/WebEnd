window.onload=function () {


    let username = window.localStorage.getItem('username');
    let text = {"type": 'employee','name':username};
    let account = document.getElementById('account');
    account.innerHTML = username;

    $.ajax({

        type: "POST",
        url: 'http://10.19.42.253:5000/account/get_account_details',
        data: JSON.stringify(text),
        contentType: "application/jason; charset=UTF-8",
        async: false,
        cache: false,
        processData: false,
        success: function (data) {
            if (data.status_code === 100200) {
                alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
            } else if (data.status_code === 'success') {
                showInfo(data)
            } else if (data.status_code === 100220) {
                alert("Password Wrong");
            }
        }
    });

};

function showInfo(data) {
    document.getElementById('cardName').innerHTML=data.firstName+' '+data.lastName;
    // $('#cardName').val(data.firstName+' '+data.lastName);
    document.getElementById('title-name').innerHTML=data.firstName+' '+data.lastName;
    $('#firstName').val(data.firstName);
    $('#lastName').val(data.lastName);
    $('#email').val(data.email);
    $('#phone').val(data.phone);
    $('#password').val(data.password);
    document.getElementById('image1').src=data.photo;
    document.getElementById('image2').src=data.photo;

    if(data.country==='CHINA'){
        // document.getElementById('country').value='0';
        $('#country').val(0)
    }else if (data.country==='IRELAND') {
        // document.getElementById('ireland').selected=true;
        $('#country').val(1);
    }

}

$( function () {
    $('#update').click(function (e) {
        e.preventDefault();
        let username = window.localStorage.getItem('username');
        let fname = $('#firstName').val();
        let lname = $('#lastName').val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let country = $("#country").val();
        let coun;
        if(country==='0'){
             coun='CHINA';
        }else if(country==='1'){
             coun='IRELAND';
        }
        console.log(username);
        let password = $('#password').val();
        let text = {'type':'employee','name':username,'firstName':fname,'lastName':lname,'password':password, 'email': email, 'phone': phone, 'country':coun};
        $.ajax({
            type: "POST",
            url: 'http://10.19.42.253:5000/account/update_account_details',
            data: JSON.stringify(text),
            contentType: "application/jason; charset=UTF-8",
            async: false,
            cache: false,
            processData: false,
            success: function (data) {

                if (data.status_code === 100200) {
                    alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
                } else if (data.status === 'success') {
                    window.location.href='pages-profile.html';
                } else if (data.status_code === 100220) {
                    alert("Password Wrong");
                }
            }
        });
    })
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
    var table_zh = ["姓", "名", "账户", "密码","邮箱","电话号码","国籍"];
    var table_en = ["First Name", "Last Name", "Account", "Password","Email","Phone No","Select Country"];
    var language_now = window.localStorage.getItem("language");
    if (language_now == "zh") {
        // $(this).text("english")
        $(".table1").each(function (i, item) {
            $(item).text(table_zh[i]);
        });
        $(".fa fa-table m-r-10").text("主菜单");
        $("#report-title").text("主菜单");
        $("#little-title").html("个人信息");
        $("#home_link").html("主页");
        // $('#update').html('确认更新');
        document.getElementById('update').innerHTML='确认更新';
        $("#switch_language_btn").html("切换语言");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>主菜单");
        $("#profile").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>个人信息");


    } else {
        $(".table1").each(function (i, item) {
            $(item).text(table_en[i]);
        });
        $("#report-title").text("Basic Table");
        $("#little-title").html("Profile");
        $("#home_link").html("Home");
        document.getElementById('update').innerHTML='Update Profile';
        $("#switch_language_btn").html("Switch Language");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>Basic Table");
        $("#profile").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>Profile");

    }
}
switchLanguage();