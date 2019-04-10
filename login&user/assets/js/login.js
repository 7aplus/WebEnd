var username = document.getElementById("form-username");
username.addEventListener('blur',function(){
    var strRegex = "[a-z0-9A-Z]+";
    var re=new RegExp(strRegex);
    if(re.test(username.value) != true){
        t = 1;
        username.style.border = "1px solid red";
    }
    else{
        username.style.border = "1px solid green";
    }
});





document.getElementById("signin_btn").addEventListener("click", function (e) {
    e.preventDefault();
    var username = document.getElementById("form-username").value;
    var password = document.getElementById("form-password").value;
    document.cookie = "username" + username;
    
    
    //get the value of the radio button
    var radios = document.getElementsByName("type");
    var value;
    for(var i=0;i<radios.length;i++){
        if(radios[i].checked){
            value = radios[i].value;
            break;
        }
    }

    var text = { "type":value,
        "name": username,
        "password": password
    };
    if(username == ""){
        alert("username can be blank");
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
                    alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
                }
                else if(data.status_code  == 100211){
                    if (value=='customer'){
                        window.location.href = "user_management_2/index.html?username="+username;
                    } else if(value=='employee'){
                        window.location.href = "../table-basic.html";
                    }

                }
                else if(data.status_code  == 100220){
                    alert("Password Wrong");
                }
                
            }
        }) 
    }
});


