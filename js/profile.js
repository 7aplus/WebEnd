window.onload=function () {

    let result;
    let url=window.location.search;
    if(url.indexOf("?")!==-1){
        result = url.substr(url.indexOf("=")+1);

    }
    let text = {"type": 'employee','name':result};
    let account = document.getElementById('account');
    account.innerHTML = result;

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
    $('#fullName').val(data.firstName+' '+data.lastName);

    $('#example-email').val(data.email);
    $('#phone').val(data.phone);

    if(data.country==='CHINA'){
        // document.getElementById('country').value='0';
        $('#country').val(0);
    }else if (data.country==='IRELAND') {
        // document.getElementById('ireland').selected=true;
        $('#country').val(1);
    }


    if(data.country==='0'){
        country[0].selected=true;
    }else{
        country[1].selected=true;
    }
}

$( function () {
    $("#submitForm").click(function () {
        let result;
        let url=window.location.search;
        if(url.indexOf("?")!==-1){
            result = url.substr(url.indexOf("=")+1);
        }
        let email = $("#example-email").val();
        let phone = $("#phone").val();
        let country = $("#country").val();
        let text = {'manager':result, 'email': email, 'phone': phone, 'country':country};
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
                    alert("Update succeed!");
                } else if (data.status_code === 100220) {
                    alert("Password Wrong");
                }
            }
        });
    })
});