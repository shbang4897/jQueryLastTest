
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
                if (result[0].login == "ok") {

                 var logout=    $("<li></li>").attr("class","active");
                    var a = $("<a></a>").text("Logout");
                    var a2= a.attr("onclick","logout()");
                    logout.append(a2);
                    $("#ul").append(logout);


                }
                else if (result[0].login != "ok") {
                    var login= $("<li></li>").attr("class","active").attr("data-target", "#loginmodal").attr("data-toggle", "modal");
                    var b = $("<a></a>").text("Login");
                    //var b2= b.attr("href","login.html");
                    login.append(b);
                    $("#ul").append(login);
                }
            },

            error: function () {
                alert("에러");
            }

        });

};

function logout() {

    $.ajax(
        {
            url: "http://localhost:7070/book/logout",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",

            data: {},

            success: function (result) {
                location.href="main.html";
            },

            error: function () {
                alert("에러");
            }

        });
    
}