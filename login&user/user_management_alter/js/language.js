// $("#change").on('click',function () {
//     translate();
// })
//
// $(function(){
//     // do something
//     var script=document.createElement("script");
//     script.type="text/javascript";
//     script.src="js/translate.js";
//     document.getElementsByTagName('head')[0].appendChild(script);
//
//
//     var value = sessionStorage.getItem("language");
//     document.onreadystatechange = function () {
//         if (document.readyState == 'complete') {
//             if(value==="1"){
//                 Microsoft.Translator.Widget.Translate('zh-CHS', 'en', onProgress, onError, onComplete, onRestoreOriginal, 2000);
//             }
//         }
//     }
//     function onProgress(value) {
//     }
//     function onError(error) {
//     }
//     function onComplete() {
//         $("#WidgetFloaterPanels").hide();
//     }
//     function onRestoreOriginal() {
//     }
// });
//
// function translate(){
//     var value = sessionStorage.getItem("language");
//     if(value==="1"){
//         sessionStorage.setItem("language", "0");
//     }else{
//         sessionStorage.setItem("language", "1");
//     }
//     window.location.reload();//刷新当前页面.
// }

var index = {
    initPage: function() {
        var self = this;
        self.initBtn(self);
    },
    initBtn: function(self) {
        var english = ["主页", "模板"];
        var chinese = ["Home","Report"];
        // $(".content").children(".yes").each(function(i, item) {
        //     var pag_val = $.trim($(item).text());
        //     chinese.push(pag_val);
        // });
        $("#change").click(function() {
            if ($.trim($(this).text()) == "中文") {
                $(this).text("english")
                $(".breadcrumb").children(".breadcrumb-item").each(function(i, item) {
                    $(item).text(chinese[i]);
                });
            } else {
                $(this).text("中文");
                $(".breadcrumb").children(".breadcrumb-item").each(function(i, item) {
                    $(item).text(english[i]);
                });
            }
        })
    }
};
$(function() {
    index.initPage();
})