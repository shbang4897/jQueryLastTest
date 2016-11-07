

var myid = null;
window.onload = function () {
    $.ajax(
        {
            url: "http://localhost:7070/book/sessionchk",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",

            data: {},

            success: function (result) {
                if (result[0].login == "ok") {

                    myid = result[0].id;

                }
                else if (result[0].login != "ok") {
                    location.href="login.html";
                }
            },

            error: function () {
                alert("에러");
            }

        });

};


function insertReview() {

    var isbn = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
    $.ajax(
        {
            url : "http://localhost:7070/book/reviewinsert",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",

            data : {
                isbn : isbn,
                title : $("#title").val(),
                contents : $("#contents").val(),
                id : myid


            },

            success : function(result) {
                alert("Add complete");
                $("#title").val("");
                $("#contents").val("");

            },

            error : function () {
            }

        });
}
