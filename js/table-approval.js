window.onload=function () {
    let text = {"type":"accept"};
    $.ajax({
        type: "POST",
        url: 'http://10.19.42.253:5000/report/get_report_bystatus',
        data: JSON.stringify(text),
        contentType: "application/jason; charset=UTF-8",
        async: false,
        cache: false,
        processData: false,
        success: function (data) {
            if (data.status_code === 100200) {
                alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
            } else if (data.status_code === 'success') {
                //$('tbody').append('tr');
                showTable(data);
            } else if (data.status_code === 100220) {
                alert("Password Wrong");
            }
        }
    });
};
function showTable(data) {

    // let tbody=document.getElementsByTagName('tbody');
    for (let j=0;j<data.reports.length;j++){
        let row=document.createElement('tr');
        for (let i=0; i<7;i++){
            let attr=document.createElement('td');
            if(i===0){
                attr.innerHTML=j.toString();
                //alert(i.toString());
            }else if (i===1) {
                attr.innerHTML=data.reports[j].order;
                //alert(data.reports[j].order);
            }
            else if (i===2){
                attr.innerHTML=data.reports[j].firstName;
                // alert(data.reports[j].firstName);
            }else if (i===3){
                attr.innerHTML=data.reports[j].lastName;
                //alert(data.reports[j].lastName);
            }
            else if (i===4){
                attr.innerHTML=data.reports[j].userName;
                //alert(data.reports[j].userName);
            }else if (i===5){
                let span=document.createElement('span');
                if (data.reports[j].status===1){
                    span.className='label label-success radius';
                    span.innerHTML='approval';
                } else if(data.reports[j].status===0){
                    span.className='label label-warning radius';
                    span.innerHTML='waiting';
                }else if (data.reports[j].status===-1) {
                    span.className='label label-danger radius';
                    span.innerHTML='reject';
                }
                //alert(data.reports[j].status);
                attr.appendChild(span);
            }
            else if (i===6){
                let button=document.createElement('button');
                button.className='response';
                button.innerHTML='edit';
                attr.appendChild(button);
            }

            row.appendChild(attr);
        }
        $('tbody').append(row);

    }

}
function showNewTable(data){
    let row=document.createElement('tr');
    for (let i=0; i<7;i++){
        let attr=document.createElement('td');
        if(i===0){
            attr.innerHTML=0;
            //alert(i.toString());
        }else if (i===1) {
            attr.innerHTML=data.order;
            //alert(data.reports[j].order);
        }
        else if (i===2){
            attr.innerHTML=data.firstName;
            // alert(data.reports[j].firstName);
        }else if (i===3){
            attr.innerHTML=data.lastName;
            //alert(data.reports[j].lastName);
        }
        else if (i===4){
            attr.innerHTML=data.userName;
            //alert(data.reports[j].userName);
        }else if (i===5){
            let span=document.createElement('span');
            if (data.status===1){
                span.className='label label-success radius';
                span.innerHTML='approval';
            } else if(data.status===0){
                span.className='label label-warning radius';
                span.innerHTML='waiting';
            }else if (data.status===-1) {
                span.className='label label-danger radius';
                span.innerHTML='reject';
            }
            attr.appendChild(span);
        }
        else if (i===6){
            let button=document.createElement('button');
            button.className='response';
            button.innerHTML='edit';
            button.onclick=function(){
                let td=$(this).parent();
                let index=td.parent()[0].rowIndex;
                let orderNumber=$('tr').eq(index).children('td').eq(1).text();
                window.location.href='table-content.html?order='+orderNumber;
            };
            attr.appendChild(button);
        }

        row.appendChild(attr);
    }
    $('tbody').append(row);
}

$('.srh-btn').click(function () {
    let search = document.getElementById('search').value;
    let reg1 = /^[0-9]{4}$/;
    if (!reg1.test(search)){
        document.getElementById('result').innerHTML = 'The format of order number is invalid.';
        setTimeout(function(){//定时器

                document.getElementById('result').innerHTML = '';
            },
            3000);//设置三千毫秒即3秒
        return false;
    }else{
        let text = {"search": search};
        $.ajax({
            type: "POST",
            url: 'http://10.19.42.253:5000/report/search_report',
            data: JSON.stringify(text),
            contentType: "application/jason; charset=UTF-8",
            async: false,
            cache: false,
            processData: false,
            success: function (data) {

                if (data.status_code === 'success') {//有该订单 显示
                    $('tbody').html('');
                    showNewTable(data);
                } else if (data.status_code === 'None') {//没有结果
                    document.getElementById('result').innerHTML = 'No such order number.';
                    setTimeout(function(){//定时器

                            document.getElementById('result').innerHTML = '';
                        },
                        3000);//设置三千毫秒即3秒
                }
            }
        });
    }

});
//switch language
$("#switch_language_btn").on('click', function () {
    //将语言的缓存存为zh，表示中文
    var language_now = window.localStorage.getItem("language");
    if (language_now == "zh") {
        window.localStorage.setItem("language", "en");
    } else {
        window.localStorage.setItem("language", "zh");
    }

    window.location.reload();
})
function switchLanguage() {
    var table_zh = ["#", "订单号", "姓", "名","用户名","状态","操作"];
    var table_en = ["#", "Order Number", "First Name", "Last Name","Username","Status","Operation"];
    var language_now = window.localStorage.getItem("language");
    if (language_now == "zh") {
        // $(this).text("english")
        $("th").each(function (i, item) {
            $(item).text(table_zh[i]);
        });
        $(".fa fa-table m-r-10").text("主菜单");
        $("#report-title").text("主菜单");
        $("#little-title").html("主菜单");
        $("#home_link").html("主页");
        $(".card-title").html("主菜单");
        $("#switch_language_btn").html("切换语言");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>主菜单");
        $("#profile").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>个人信息");

        $(".dropdown-header").text("选择种类");
        $(".dropdown-toggle").text("接受");
        var select_zh = ["全部","等待","拒绝","接受"];
        $(".col-sm-2").each(function (i,item) {
            $(item).text(select_zh[i]);
        })
    } else {
        $("th").each(function (i, item) {
            $(item).text(table_en[i]);
        });
        $(".card-title").html("Basic Table");
        $("#report-title").text("Basic Table");
        $("#little-title").html("Basic Table");
        $("#home_link").html("Home");
        $("#switch_language_btn").html("switch language");
        $("#home_page").html("<i class=\"fa fa-table m-r-10\" aria-hidden=\"true\"></i>Basic Table");
        $("#profile").html("<i class=\"fa fa-user m-r-10\" aria-hidden=\"true\"></i>Profile");

        $(".dropdown-header").text("Choose sort mode");
        $(".dropdown-toggle").text("All approval");
        var select_en = ["All","All waiting","All rejected","All approval"];
        $(".col-sm-2").each(function (i,item) {
            $(item).text(select_en[i]);
        })
    }
}
switchLanguage();