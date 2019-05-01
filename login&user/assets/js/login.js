//when the explore is ready
$(document).ready(function(){
    var remember = document.cookie.split(";")[0].split("=")[1];
    var username = document.cookie.split(";")[1].split("=")[1];
    var password = document.cookie.split(";")[2].split("=")[1];
    if(remember != "undefined"){
        //顺序是乱的不知道为什么
        $("#remember").prop("checked",true);
        $("#form-username").val(remember);
        $("#form-password").val(username);

    }
});



var username = document.getElementById("form-username");
var password = document.getElementById("form-password");
username.addEventListener('blur',function(){
    var strRegex = "[a-z0-9A-Z]+";
    var re=new RegExp(strRegex);
    if(re.test(username.value) != true){
        t = 1;
        username.style.border = "2px solid red";
    }
    else{
        username.style.border = "2px solid green";
    }
	
});





password.addEventListener('blur',function(){
    var strRegex = "[a-z0-9A-Z]+";
    var re=new RegExp(strRegex);
    if(re.test(password.value) != true){
		password.style.border = "2px solid red";
	}
	else{
		password.style.border = "2px solid green";
    }
});

//save the cookies
function save_cookies(){
    if($("#remember").prop("checked")){
        var username = $("#form-username").val();
        var password = $("#form-password").val();

        document.cookie="username="+username;
        document.cookie="password="+password;
        document.cookie="remember="+"true";

    }else{
        document.cookie="username="+username;
        document.cookie="password="+password;
        document.cookie="remember="+"";
    }
};

//test the error message
var error_message = document.getElementById("error_message");


//用按钮来替换option
var value = ""
$("#employee_btn").click(function () {
    $("#employee_btn").attr("class","btn btn-default active")
    $("#customer_btn").attr("class","btn btn-primary")
    value = "employee";
})
$("#customer_btn").click(function () {
    $("#customer_btn").attr("class","btn btn-primary active")
    $("#employee_btn").attr("class","btn btn-default")
    value = "customer";
})


document.getElementById("signin_btn").addEventListener("click", function (e) {
    e.preventDefault();
    var username = document.getElementById("form-username").value;
    var password = document.getElementById("form-password").value;
	var strRegex = "[a-z0-9A-Z]+";
    var re=new RegExp(strRegex);

    //set the cookie for the user

    save_cookies();

	
	
    //get the value of the radio button
    // var radios = document.getElementsByName("type");
    // var value;
    // value = $('#type option:selected').val();



    var text = { "type":value,
        "name": username,
        "password": password
    };
    if(username == ""){
        error_message.innerHTML = "The Username cam't be Blank!"
    }
    else{
		if(re.test(username) != true){
			error_message.innerHTML = "Username format error, use 'a-z,0-9,A-Z'"

		}
		else if(re.test(password) != true){
			error_message.innerHTML = "Password format error"

		}
		else{
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
                    // 100200不知道咋错了，100211成功 100220密码错误
                    error_message.innerHTML = "error!";
                }
                else if(data.status_code  == 100211){
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


