var base64 ;
var myid=null;
var isAble = null;
window.onload = function () {
    $.ajax(
        {
            url: "http://localhost:7070/book/sessionchk",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",

            data: {},

            success: function (result) {
                myid = result[0].id;
            },

            error: function () {
                alert("비회원");
            }

        });

};
function fileInfo(f){
    var file = f.files; // files 를 사용하면 파일의 정보를 알 수 있음

    var reader = new FileReader(); // FileReader 객체 사용
    reader.onload = function(rst){ // 이미지를 선택후 로딩이 완료되면 실행될 부분
        $('#img_box').html('<img src="' + rst.target.result + '">'); // append 메소드를 사용해서 이미지 추가
        // 이미지는 base64 문자열로 추가
        // 이 방법을 응용하면 선택한 이미지를 미리보기 할 수 있음

        base64 = rst.target.result;


    }
    reader.readAsDataURL(file[0]); // 파일을 읽는다, 배열이기 때문에 0 으로 접근
}



function searchBook(a,b) {

    var keyword= null;

    if(b==null){keyword= $("#keyword").val();}
    else if (b!=null){
        keyword=b;
    }
    if (event.keyCode == 13 || a== true) {
        //alert($(".table").childElementCount);

        //$(".table").removeChild();
        $.ajax(
            {
                url : "http://localhost:7070/book/bookList",
                type : "GET",
                dataType : "jsonp",
                jsonp : "callback",

                data : {
                    keyword :keyword
                },
                success : function(result) {
                    $("tbody").empty();
                    var priceTd = null;
                    var titleTd = null;
                    var authorTd = null;
                    var img = null;
                    var imgTd = null;

                    var div = null;
                    var date = null;
                    var page= null;
                    var translator= null;
                    var supplement= null;
                    var publisher= null;

                    for (var loop = 0; loop < result.length; loop++) {

                        var tr = $("<tr></tr>").attr("data-isbn",result[loop].isbn);
                        priceTd = $("<td></td>").text(result[loop].price);
                        div = $("<div></div>").attr("id","detaildiv"+result[loop].isbn);
                        titleTd = $("<td></td>").text(result[loop].title).attr("id","titleD").append(div);

                        authorTd = $("<td></td>").text(result[loop].author);
                        img = $("<img />").attr("src",result[loop].img).attr("width","150");
                        imgTd = $("<td></td>").append(img);
                        isAble = result[loop].lentperson;
// 이상 출력
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        var detailbtn = $("<input />").attr("type","button").attr("value","상세정보").attr("class","btn-xs, btn-primary");
                        var detailTd = $("<td></td>").append(detailbtn);
                        detailbtn.on("click",function () {
                            var isbn = $(this).parent().parent().attr("data-isbn");
                            $("#detaildiv"+isbn).empty();
                            $.ajax({
                                url : "http://localhost:7070/book/BookDetail",
                                type : "GET",
                                dataType : "jsonp",
                                jsonp : "callback",

                                data : {
                                    isbn : isbn
                                },
                                success: function(result){

                                    page = $("<tr></tr>").text("쪽 수 : "+result[0].page);
                                    date = $("<tr></tr>").text("발행일 : "+result[0].date);
                                    translator = $("<tr></tr>").text("번역 : "+result[0].translator);
                                    publisher = $("<tr></tr>").text("출판사 : "+result[0].publisher);
                                    supplement = $("<tr></tr>").text("부록 : "+result[0].supplement);
                                    div.empty();

                                    div.append(page);
                                    div.append(date);
                                    div.append(translator);
                                    div.append(supplement);
                                    div.append(publisher);


                                    $("#detaildiv"+isbn).append(div);


                                },
                                error: function () {

                                    alert("x");
                                }
                            });

                        });
//이상 상세정보
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        var deletebtn = $("<input />").attr("type","button").attr("value","삭제").attr("id","remove").attr("class","btn-xs, btn-danger");
                        var deletTd = $("<td></td>").append(deletebtn);
                        deletebtn.on("click",function () {
                            var isbn = $(this).parent().parent().attr("data-isbn");

                            $.ajax({
                                url : "http://localhost:7070/book/bookDelete",
                                type : "GET",
                                dataType : "jsonp",
                                jsonp : "callback",

                                data : {
                                    isbn : isbn
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        var updatebtn = $("<input />").attr("type","button").attr("value","수정").attr("class","btn-xs, btn-success");
                        var updateTd = $("<td></td>").append(updatebtn);
                        updatebtn.on("click",function(){
                            div.empty();
                            detailTd.empty();
                            var price =$(this).parent().parent().find("td:nth-child(4)").text();
                            var title =$(this).parent().parent().find("td:nth-child(2)").text();
                            var author =$(this).parent().parent().find("td:nth-child(3)").text();
                            var updatebox = $("<input />").attr("type","text").val(price);
                            var updatebox2 = $("<input />").attr("type","text").val(title);
                            var updatebox3 = $("<input />").attr("type","text").val(author);


                            updatebox.on("keyup",function () {



                                if(event.keyCode==13){




                                    var isbn = $(this).parent().parent().attr("data-isbn");
                                    var title = updatebox2.val();
                                    var author = updatebox3.val();
                                    var price = $(this).val();
                                    var tr =$(this).parent().parent();


                                    $.ajax({

                                        url : "http://localhost:7070/book/bookUpdate",
                                        type : "GET",
                                        dataType : "jsonp",
                                        jsonp : "callback",

                                        data : {
                                            isbn : isbn,
                                            price : price,
                                            title : title,
                                            author : author
                                        },
                                        success: function(){

                                            tr.find("td:nth-child(2)").text(title);
                                            tr.find("td:nth-child(3)").text(author);
                                            tr.find("td:nth-child(4)").text(price);
                                            searchBook(true,keyword);

                                        },
                                        error: function () {

                                            alert("x");
                                        }


                                    });



                                }

                            });
                            updatebox2.on("keyup",function () {



                                if(event.keyCode==13){




                                    var isbn = $(this).parent().parent().attr("data-isbn");
                                    var title = $(this).val();
                                    var author = updatebox3.val();
                                    var price = updatebox.val();
                                    var tr =$(this).parent().parent();


                                    $.ajax({

                                        url : "http://localhost:7070/book/bookUpdate",
                                        type : "GET",
                                        dataType : "jsonp",
                                        jsonp : "callback",

                                        data : {
                                            isbn : isbn,
                                            price : price,
                                            title : title,
                                            author : author
                                        },
                                        success: function(){

                                            tr.find("td:nth-child(2)").text(title);
                                            tr.find("td:nth-child(3)").text(author);
                                            tr.find("td:nth-child(4)").text(price);
                                            searchBook(true,keyword);
                                        },
                                        error: function () {

                                            alert("x");
                                        }


                                    });



                                }

                            });
                            updatebox3.on("keyup",function () {
                                if(event.keyCode==13){




                                    var isbn = $(this).parent().parent().attr("data-isbn");
                                    var title = updatebox2.val();
                                    var author = $(this).val();
                                    var price = updatebox.val();
                                    var tr =$(this).parent().parent();


                                    $.ajax({

                                        url : "http://localhost:7070/book/bookUpdate",
                                        type : "GET",
                                        dataType : "jsonp",
                                        jsonp : "callback",

                                        data : {
                                            isbn : isbn,
                                            price : price,
                                            title : title,
                                            author : author
                                        },
                                        success: function(){
                                            alert("ok");

                                            tr.find("td:nth-child(2)").text(title);
                                            tr.find("td:nth-child(3)").text(author);
                                            tr.find("td:nth-child(4)").text(price);
                                            searchBook(true,keyword);
                                        },
                                        error: function () {

                                            alert("x");
                                        }


                                    });



                                }
                            });


                            $(this).parent().parent().find("td:nth-child(4)").text("");
                            $(this).parent().parent().find("td:nth-child(2)").text("");
                            $(this).parent().parent().find("td:nth-child(3)").text("");
                            $(this).parent().parent().find("td:nth-child(2)").append(updatebox2);
                            $(this).parent().parent().find("td:nth-child(3)").append(updatebox3);
                            $(this).parent().parent().find("td:nth-child(4)").append(updatebox);

                        });
//이상 수정
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                        var commentbtn = $("<input />").attr("type","button").attr("value","서평등록").attr("class","btn-xs, btn-success");
                        var commentTd = $("<td></td>").append(commentbtn);
                        commentbtn.on("click",function () {
                            var isbn = $(this).parent().parent().attr("data-isbn");
                            alert(isbn);
                            $(location).attr("href", "insertReview.html?isbn=" + isbn);



                        });

//이상 서평등록
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                        if(isAble==null){
                            var lentbtn = $("<input />").attr("type","button").attr("value","대여").attr("id","lent").attr("class","btn-xs, btn-success");
                            var lentTd = $("<td></td>").append(lentbtn);
                            lentbtn.on("click",function () {

                                var isbn = $(this).parent().parent().attr("data-isbn");
                                var xx = $(this);

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
                                                        url : "http://localhost:7070/book/booklent",
                                                        type : "GET",
                                                        dataType : "jsonp",
                                                        jsonp : "callback",

                                                        data : {
                                                            id : id,
                                                            isbn : isbn
                                                        },
                                                        success : function(result) {
                                                            alert("대여 성공");
                                                            //location.replace("Practice.html");
                                                            searchBook(true,keyword);
                                                            xx.attr("type","button").attr("value","반납").attr("class","btn-xs, btn-danger");



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

                            });}
                        else if(isAble!=null){
                            if(myid==isAble){
                                var lentbtn = $("<input />").attr("type","button").attr("value","반납").attr("class","btn-xs, btn-danger");
                                var lentTd = $("<td></td>").append(lentbtn);
                                lentbtn.on("click",function () {

                                    var isbn = $(this).parent().parent().attr("data-isbn");
                                    var xx = $(this);
                                    $.ajax(
                                        {
                                            url : "http://localhost:7070/book/bookback",
                                            type : "GET",
                                            dataType : "jsonp",
                                            jsonp : "callback",

                                            data : {
                                                isbn : isbn
                                            },
                                            success : function(result) {

                                                alert("반납 성공");
                                               // location.replace("Practice.html");
                                                searchBook(true,keyword);
                                                xx.attr("type","button").attr("value","대여").attr("class","btn-xs, btn-success");



                                            },
                                            error : function () {
                                                alert("Program Error");
                                            }

                                        });
                                });
                            }
                            else if(myid!=isAble){
                                var lentbtn = $("<input />").attr("type","button").attr("value","대여불가").attr("class","btn-xs, btn-danger");
                                var lentTd = $("<td></td>").append(lentbtn);
                            }
                        }

//이상 대여
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                        tr.append(imgTd);
                        tr.append(titleTd);
                        tr.append(authorTd);
                        tr.append(priceTd);
                        tr.append(deletTd);
                        tr.append(updateTd);
                        tr.append(detailTd);
                        tr.append(commentTd);
                        tr.append(lentTd);


                        $("tbody").append(tr);
                        //$('#example').DataTable({
                        //    "pagingType": "full_numbers"
                        //});
                    }
                    console.log("여기 다음에 실행");
                    $('#tablePage').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:4});
                },
                error : function () {
                    alert("Program Error");
                }

            });
    }


}

$(document).on('click', '#remove', function() {
    $(this).parent().parent().remove();
});


function mysort() {
    var rows = $("table").find("tbody>tr").get();
    rows.sort(function (a, b) {
        var keyA = $(a).children("td").eq(3).text();
        var keyB = $(b).children("td").eq(3).text();

        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;

        return 0;
    });

    $.each(rows, function (idx, row) {
        $("table").children("tbody").append(row);

    });

}


function insertBook() {
    $.ajax(
        {
            url : "http://localhost:7070/book/bookinsert",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",

            data : {
                isbn : $("#isbn").val(),
                title : $("#title").val(),
                date : $("#date").val(),
                page : $("#page").val(),
                price : $("#price").val(),
                author : $("#author").val(),
                translator : $("#translator").val(),
                supplement : $("#supplement").val(),
                publisher : $("#publisher").val(),
                img: base64

            },

            success : function(result) {
                alert("Add complete");
                $("#isbn").val("");
                $("#title").val("");
                $("#date").val("");
                $("#page").val("");
                $("#price").val("");
                $("#author").val("");
                $("#translator").val("");
                $("#supplement").val("");
                $("#publisher").val("");

            },

            error : function () {
            }

        });

}

$.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            perPage: 7,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);

    var listElement = $this;
    var perPage = settings.perPage;
    var children = listElement.children();
    var pager = $('.pager');

    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }

    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }

    var numItems = children.size();
    var numPages = Math.ceil(numItems/perPage);

    pager.data("curr",0);

    if (settings.showPrevNext){
        $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
    }

    var curr = 0;
    while(numPages > curr && (settings.hidePageNumbers==false)){
        $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
        curr++;
    }

    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
    }

    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link').hide();
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }
    pager.children().eq(1).addClass("active");

    children.hide();
    children.slice(0, perPage).show();

    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;
        goTo(clickedPage,perPage);
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        return false;
    });

    function previous(){
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }

    function next(){
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }

    function goTo(page){
        var startAt = page * perPage,
            endOn = startAt + perPage;

        children.css('display','none').slice(startAt, endOn).show();

        if (page>=1) {
            pager.find('.prev_link').show();
        }
        else {
            pager.find('.prev_link').hide();
        }

        if (page<(numPages-1)) {
            pager.find('.next_link').show();
        }
        else {
            pager.find('.next_link').hide();
        }

        pager.data("curr",page);
        pager.children().removeClass("active");
        pager.children().eq(page+1).addClass("active");

    }
};
