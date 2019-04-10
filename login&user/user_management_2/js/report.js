//get the username
function oneValues(){
    let result;
    let url=window.location.search; //获取url中"?"符后的字串
    if(url.indexOf("?")!==-1){
        result = url.substr(url.indexOf("=")+1);
    }
    return result;
}
var username = oneValues();
$("#index").attr("href","index.html?username="+username);




var btn = document.getElementById("report_btn");
btn.addEventListener('click',function(e){
    e.preventDefault();
    //get three information
    var location = document.getElementById("location").value;
    var time = document.getElementById("time").value;
    var message = document.getElementById("message").value;
    //get the text of the json object
    
    var text = { "username": username, "location": location ,"time":time, "message":message};
    alert(text);
    // $.ajax({
    //     type: "POST",
    //     url: '10.19.42.253:5000/account/login',
    //     data: JSON.stringify(text),
    //     dataType: "JSON",
    //     async: false,
    //     success: function (data) {
    //         var jsonArray = JSON.parse(data);
    //         if(jsonArray.status_code  == 100200){
    //             alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
    //         }
    //         else if(jsonArray.status_code  == 100211){
    //             window.location.href = "../../management model/user_manage/index.html";
    //         }
    //         else if(jsonArray.status_code  == 100220){
    //             alert("Password Wrong");
    //         }
            
    //     }
    // })
})