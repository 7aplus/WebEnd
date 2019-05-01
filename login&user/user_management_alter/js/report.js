//get the username
$(function(){
    $("#show").html(oneValues());
});
function oneValues(){
    let result;
    let url=window.location.search; //获取url中"?"符后的字串
    if(url.indexOf("?")!==-1){
        result = url.substr(url.indexOf("=")+1);
    }
    return result;
}


function getType(){
    var type = window.localStorage.getItem("type");
    return type;
}

var username = oneValues();
$("#home_page").attr("href","user_managment_alter.html?username="+username);
$("#report_page").attr("href","table-report.html?username="+username);
$("#profile_page").attr("href","pages-profile.html?username="+username);
$("#home_link").attr("href","user_managment_alter.html?username="+username);



function GetExtensionFileName(pathfilename) {
    var reg = /(\\+)/g;
    var pString = pathfilename.replace(reg, "#");          //用正则表达式来将\或\\替换成#
    var arr = pString.split("#");  // 以“#”为分隔符，将字符分解为数组 例如 D Program Files bg.png
    var lastString = arr[arr.length - 1];            //取最后一个字符
    var arr2 = lastString.split(".");                  //   再以"."作为分隔符
    return arr2[arr2.length - 1];                   //将后缀名返回出来
}

let srcData;
function fileBase64() {
    let filesSelected = document.getElementById("picture").files;
    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];

        let fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            if (fileToLoad.size < 2100000 && (GetExtensionFileName(fileToLoad.name)==='jpg'||GetExtensionFileName(fileToLoad.name)==='png')){
                alert("agree");
                srcData = fileLoadedEvent.target.result; // <--- data: base64

                let newImage = document.createElement('img');
                newImage.src = srcData;
            }else if(GetExtensionFileName(fileToLoad.name)!=='jpg'||'png'){
                alert('You should upload a picture in .jpg or .png');
            }else if (fileToLoad.size > 2100000) {
                alert('The picture is too large.')
            }


        };
        fileReader.readAsDataURL(fileToLoad);
    }
}
//上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败


var btn = document.getElementById("report_btn");
btn.addEventListener('click',function(e){
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
        var srcdta1='null';
        var text = { "username": username, "location": location ,"time":time, "message":message,'photo':srcData.toString()};

        $.ajax({
            type: "POST",
            url: 'http://10.19.42.253:5000/report/create_report',
            data: JSON.stringify(text),
            contentType: "application/jason; charset=UTF-8",
            async: false,
            cache: false,
            processData: false,
            success: function (data) {
                alert('success');
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
    // }




    //get the text of the json object



});