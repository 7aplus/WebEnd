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



    //get the information of the picture
    var img = $("#pic").val();
    var imgarr = pic.split('\\');
    var myimg=imgarr[imgarr.length-1]; //去掉 // 获取图片名
    var houzui = myimg.lastIndexOf('.'); //获取 . 出现的位置
    var ext = myimg.substring(houzui, myimg.length).toUpperCase();  //切割 . 获取文件后缀

    //get the picture object
    var file = $('#pic').get(0).files[0];
    var fileSize = file.size;
    var maxSize = 102400;

    if(ext !='.PNG' && ext !='.GIF' && ext !='.JPG' && ext !='.JPEG' && ext !='.BMP') {
        alert("You have to submit Picture");
    }
    else if(parseInt(fileSize) >= parseInt(maxSize)){
        alert('the picture size has to be less than 100kb');
    }
    else{
        //set the data message
        var text = { "username": username, "location": location ,"time":time, "message":message};

        $.ajax({
            type: "POST",
            url: '10.19.42.253:5000/account/login',
            data: JSON.stringify(text),
            dataType: "JSON",
            async: false,
            success: function (data) {
                var jsonArray = JSON.parse(data);
                if(jsonArray.status_code  == 100200){
                    alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
                }
                else if(jsonArray.status_code  == 100211){
                    window.location.href = "../../management model/user_manage/index.html";
                }
                else if(jsonArray.status_code  == 100220){
                    alert("Password Wrong");
                }

            }
        })
    }



    //get the text of the json object
    



})