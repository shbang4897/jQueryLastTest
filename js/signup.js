function signup() {
    if($("#pass").val()==$("#pass2").val()) {
        $.ajax(
            {
                url: "http://localhost:7070/book/signup",
                type: "GET",
                dataType: "jsonp",
                jsonp: "callback",

                data: {

                    id: $("#id").val(),
                    pass: $("#pass").val(),
                    email: $("#email").val()


                },

                success: function (result) {

                    if(result==false){
                        alert("id가 중복되었습니다.");

                    }
                    else if(result==true){
                        alert("회원가입되었습니다.");
                        location.href="login.html";
                    }
                },

                error: function () {
                    alert("에러");
                }

            });
    }
    else {
        alert("비밀번호를 다시 확인해주세요.")
    }

}