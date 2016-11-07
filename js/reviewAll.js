var id = null;
function searchReview(a) {
    if (event.keyCode == 13 || a == true) {
        $.ajax(
            {
                url: "http://localhost:7070/book/sessionchk",
                type: "GET",
                dataType: "jsonp",
                jsonp: "callback",

                data: {},

                success: function (result) {

                    if (result[0].login == "ok") {
                        $.ajax(
                            {
                                url: "http://localhost:7070/book/reviewList",
                                type: "GET",
                                dataType: "jsonp",
                                jsonp: "callback",

                                data: {
                                    id: id,
                                    title: $("#keyword").val()
                                },
                                success: function (result) {
                                    $("tbody").empty();
                                    var btitleTd = null;
                                    var ctitleTd = null;
                                    var cauthorTd = null;
                                    var ccontents = null;

                                    for (var loop = 0; loop < result.length; loop++) {

                                        var tr = $("<tr></tr>").attr("data-cid", result[loop].cid);
                                        btitleTd = $("<td></td>").text(result[loop].btitle);
                                        ctitleTd = $("<td></td>").text(result[loop].ctitle);
                                        cauthorTd = $("<td></td>").text(result[loop].cauthor);
                                        ccontents = $("<td></td>").text(result[loop].ctext);

                                        tr.append(btitleTd);
                                        tr.append(ctitleTd);
                                        tr.append(cauthorTd);
                                        tr.append(ccontents);
                                        $("tbody").append(tr);
                                    }
                                },
                                error: function () {
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
    }
}
function searchKeyReview(a) {
    if (event.keyCode == 13 || a == true) {
        $.ajax(
            {
                url: "http://localhost:7070/book/sessionchk",
                type: "GET",
                dataType: "jsonp",
                jsonp: "callback",

                data: {},

                success: function (result) {

                    if (result[0].login == "ok") {
                        $.ajax(
                            {
                                url: "http://localhost:7070/book/reviewkey",
                                type: "GET",
                                dataType: "jsonp",
                                jsonp: "callback",

                                data: {
                                    id: id,
                                    ctitle: $("#keyword").val()
                                },
                                success: function (result) {
                                    $("tbody").empty();
                                    var btitleTd = null;
                                    var ctitleTd = null;
                                    var cauthorTd = null;
                                    var ccontents = null;

                                    for (var loop = 0; loop < result.length; loop++) {

                                        var tr = $("<tr></tr>").attr("data-cid", result[loop].cid);
                                        btitleTd = $("<td></td>").text(result[loop].btitle);
                                        ctitleTd = $("<td></td>").text(result[loop].ctitle);
                                        cauthorTd = $("<td></td>").text(result[loop].cauthor);
                                        ccontents = $("<td></td>").text(result[loop].ctext);

                                        tr.append(btitleTd);
                                        tr.append(ctitleTd);
                                        tr.append(cauthorTd);
                                        tr.append(ccontents);
                                        $("tbody").append(tr);
                                    }
                                },
                                error: function () {
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
    }

}