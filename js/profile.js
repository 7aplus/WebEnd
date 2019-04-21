window.onload=function () {
    // let result;
    // let url=window.location.search;
    // if(url.indexOf("?")!==-1){
    //     result = url.substr(url.indexOf("=")+1);
    // }
    // let text = {"manager": result};

    // $.ajax({
    //     type: "POST",
    //     url: 'http://10.19.42.253:5000/report/get_all_report',
    //     data: JSON.stringify(text),
    //     contentType: "application/jason; charset=UTF-8",
    //     async: false,
    //     cache: false,
    //     processData: false,
    //     success: function (data) {
    //         if (data.status_code === 100200) {
    //             alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
    //         } else if (data.status_code === 'success') {
    //             //$('tbody').append('tr');
    //            showTable(data);
    //         } else if (data.status_code === 100220) {
    //             alert("Password Wrong");
    //         }
    //     }
    // });

};

function showInfo(data) {
    let fullName = document.getElementById('fullName');
    fullName.innerHTML = data.firstName+' '+data.lastName;
    let cardName = document.getElementById('card-name');
    cardName.innerText = data.firstName+' '+data.lastName;
    let titleName = document.getElementById('title-name');
    titleName.innerText = data.firstName+' '+data.lastName;
    let email = document.getElementById('example-email');
    email.innerText = data.email;
    let phone = document.getElementById('phone');
    phone.innerText = data.phone;
    let country = document.getElementById('country');
    let account = document.getElementById('account');
    account.innerText = data.email;

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