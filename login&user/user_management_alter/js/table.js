// window.onload=function () {
//     let text = {"type":"manager"};
//     $.ajax({
//         type: "POST",
//         url: 'http://10.19.42.253:5000/report/get_all_report',
//         data: JSON.stringify(text),
//         contentType: "application/jason; charset=UTF-8",
//         async: false,
//         cache: false,
//         processData: false,
//         success: function (data) {
//             if (data.status_code === 100200) {
//                 alert("ERROR"); // 100200不知道咋错了，100211成功 100220密码错误
//             } else if (data.status_code === 'success') {
//                 //$('tbody').append('tr');
//                showTable(data);
//             } else if (data.status_code === 100220) {
//                 alert("Password Wrong");
//             }
//         }
//     });
// };
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