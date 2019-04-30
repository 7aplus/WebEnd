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
    $('#firstName').val(data.firstName);
    $('#lastName').val(data.lastName);
    $('#email').val(data.email);
    $('#phone').val(data.phone);
    $('#password').val(data.password);
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
        let result;
        let url=window.location.search;
        if(url.indexOf("?")!==-1){
            result = url.substr(url.indexOf("=")+1);
        }
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

        let password = $('#password').val();
        let text = {'type':'employee','name':result,'firstName':fname,'lastName':lname,'password':password, 'email': email, 'phone': phone, 'country':coun};
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
                    alert("Update succeed!");
                    window.location.href='pages-profile.html?values='+result;
                } else if (data.status_code === 100220) {
                    alert("Password Wrong");
                }
            }
        });
    })
});