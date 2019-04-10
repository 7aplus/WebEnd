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
    order.innerHTML=data.orderid;
    username.innerHTML=data.username;
    firstName.innerHTML=data.firstname;
    lastName.innerHTML=data.lastname;
    time.innerHTML=data.time;
    description.innerHTML=data.description;
}

$(function() {

    $("#submitForm").click(function(){
       // window.location.href='table-basic.html?index='+manyValues()+"&status="+$("input[type='radio']:checked").val();
        let result;
        let url=window.location.search;
        if(url.indexOf("?")!==-1){
            result = url.substr(url.indexOf("=")+1);
        }
        let radio= $("input[type='radio']:checked").val();
        let feedback= $("textarea[type='text']").val();

        let text = {"orderId": result,"operate": radio, "text" : feedback};

        if (radio==='reject' && feedback==null){
            alert("You should give some feedback for your rejection!");
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