
var fresult = false;
window.onload = function () {
    $.ajax(
        {
            url: "http://localhost:7070/book/sessionchk",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",

            data: {},

            success: function (result) {
                var id = result[0].id;
                if (result[0].login == "ok") {
                    $.ajax(
                        {
                            url : "http://localhost:7070/book/reviewList",
                            type : "GET",
                            dataType : "jsonp",
                            jsonp : "callback",

                            data : {
                                id : id
                            },
                            success : function(result) {
                                $("tbody").empty();
                                var btitleTd = null;
                                var ctitleTd = null;
                                var cauthorTd = null;
                                var ccontents = null;

                                for (var loop = 0; loop < result.length; loop++) {

                                    var tr = $("<tr></tr>").attr("data-cid",result[loop].cid);
                                    btitleTd = $("<td></td>").text(result[loop].btitle);
                                    ctitleTd = $("<td></td>").text(result[loop].ctitle);
                                    cauthorTd = $("<td></td>").text(result[loop].cauthor);
                                    ccontents = $("<td></td>").text(result[loop].ctext);
                                   // 이상 출력
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    var deletebtn = $("<input />").attr("type","button").attr("value","삭제").attr("id","remove").attr("class","btn-xs, btn-danger");
                                    var deletTd = $("<td></td>").append(deletebtn);
                                    deletebtn.on("click",function () {
                                        var cid = $(this).parent().parent().attr("data-cid");

                                        $.ajax({
                                            url : "http://localhost:7070/book/reviewDelete",
                                            type : "GET",
                                            dataType : "jsonp",
                                            jsonp : "callback",

                                            data : {
                                                cid : cid
                                            },
                                            success: function(result){
                                                alert("삭제 완료");

                                            },
                                            error: function () {

                                                alert("fail");
                                            }
                                        });
                                    });

//이상 삭제
////////////////////////////////////////////////////////////////////////////////

                                    tr.append(btitleTd);
                                    tr.append(ctitleTd);
                                    tr.append(cauthorTd);
                                    tr.append(ccontents);
                                    tr.append(deletTd);
                                    $("tbody").append(tr);
                                }
                            },
                            error : function () {
                                alert("Program Error");
                            }

                        });
                }


                else if (result[0].login != "ok") {

                    location.replace("login.html");
                }
            },

            error: function () {
                alert("에러");
            }

        });

};

$(document).on('click', '#remove', function() {
    $(this).parent().parent().remove();
});