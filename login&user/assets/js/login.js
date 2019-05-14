//when the explore is ready

var cookie_usename = $.cookie("username");
var cookie_password = $.cookie("password");
var cookie_remember = $.cookie("remember");
// console.log("username:"+cookie_usename+" password:"+cookie_password+" remember:"+cookie_remember);
if (cookie_remember == "true") {
    //顺序是乱的不知道为什么
    $("#remember").prop("checked", true);
    $("#form-username").val(cookie_usename);
    $("#form-password").val(cookie_password);
    // console.log("into")
    

}

var username = document.getElementById("form-username");
var password = document.getElementById("form-password");
username.addEventListener('blur', function () {
    var strRegex = "[a-z0-9A-Z]+";
    var re = new RegExp(strRegex);
    if (re.test(username.value) != true) {
        t = 1;
        username.style.border = "2px solid red";
    }
    else {
        username.style.border = "2px solid green";
    }

});





password.addEventListener('blur', function () {
    var strRegex = "[a-z0-9A-Z]+";
    var re = new RegExp(strRegex);
    if (re.test(password.value) != true) {
        password.style.border = "2px solid red";
    }
    else {
        password.style.border = "2px solid green";
    }
});

//save the cookies
function save_cookies() {
    if ($("#remember").prop("checked")) {
        var username = $("#form-username").val();
        var password = $("#form-password").val();

        document.cookie = "username=" + username;
        document.cookie = "password=" + password;
        document.cookie = "remember=" + "true";

    } else {
        document.cookie = "username=" + username;
        document.cookie = "password=" + password;
        document.cookie = "remember=" + "";
    }
};

//test the error message
var error_message = document.getElementById("error_message");


//用按钮来替换option
var value = ""
$("#employee_btn").click(function () {
    $("#employee_btn").attr("class", "btn btn-default active")
    $("#customer_btn").attr("class", "btn btn-primary")
    value = "employee";
})
$("#customer_btn").click(function () {
    $("#customer_btn").attr("class", "btn btn-primary active")
    $("#employee_btn").attr("class", "btn btn-default")
    value = "customer";
})


document.getElementById("signin_btn").addEventListener("click", function (e) {
    e.preventDefault();
    var username = document.getElementById("form-username").value;
    var password = document.getElementById("form-password").value;
    var strRegex = "[a-z0-9A-Z]+";
    var re = new RegExp(strRegex);

    //set the cookie for the user

    // save_cookies();
    if ($("#remember").prop("checked")) {
        $.cookie('username', username, { expires: 7 });
        $.cookie('password', password, { expires: 7 });
        $.cookie('remember', true, { expires: 7 })
    }
    else {
        $.cookie('remember', false, { expires: 7 });
        $.cookie('username', "", { expires: 7 });
        $.cookie('password', "", { expires: 7 });
    }



    //get the value of the radio button
    // var radios = document.getElementsByName("type");
    // var value;
    // value = $('#type option:selected').val();



    var text = {
        "type": value,
        "name": username,
        "password": password
    };
    if (username == "") {
        error_message.innerHTML = "The Username cam't be Blank!"
    }
    else {
        if (re.test(username) != true) {
            error_message.innerHTML = "Username format error, use 'a-z,0-9,A-Z'"

        }
        else if (re.test(password) != true) {
            error_message.innerHTML = "Password format error"

        }
        else {
            	$.ajax({
                type: "POST",
                url: 'http://10.19.42.253:5000/account/login',
                data: JSON.stringify(text),
                contentType:"application/jason; charset=UTF-8",
                async: false,
                cache: false,
                processData: false,
                success: function (data) {

                    if(data.status_code  == 100200){
                        error_message.innerHTML = "Select your role.";
                    }
                    else if(data.status_code  == 100211){
                        window.localStorage.setItem("username", username);
                        if (value=='customer'){
                            window.location.href = "user_management_alter/user_managment_alter.html?username="+username;
                        } else if(value=='employee'){
                            window.location.href = "../table-basic.html?username="+username;
                        }

                    }
                    else if(data.status_code  == 100220){
                        error_message.innerHTML = "Password Wrong!";
                    }

                }
            })
        }

    }
});


