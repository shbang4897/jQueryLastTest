function login() {
    $.ajax(
        {
            url: "http://localhost:7070/book/login",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",

            data: {

                id: $("#loginid").val(),
                pass: $("#loginpw").val()


            },

            success: function (result) {

                if(result==true){
                    alert("로그인 완료");

                    location.href="main.html";


                }
                else if(result==false){
                    
                    alert("로그인 정보 확인하세요");

                }
            },

            error: function () {
                alert("에러");
            }

        });

}

function join() {
    location.href="signup.html";
}