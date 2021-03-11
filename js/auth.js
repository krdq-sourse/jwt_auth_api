function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
jQuery(function ($) {
    $(document).ready(()=>{
        if(getCookie('jwt')){
            getUserName()
            console.log("ne zareesfesf")
        }else {
            console.log("ne zareesfesf")
        }
    })

    function showHomePage(){
        let html = `
<div class="search">

            <form>
                <p>
                    <input type="search" name="q" placeholder="Поиск">
                    <input type="submit" value="">
                </p>
            </form>

            <a href=""><i class="far fa-comment"></i></a>

        </div>

        <div class="titlebar">

            <h2>All courses</h2>

            <p style="padding-right: 0;"><a href="">Ongoing</a></p>
            <p><a href="">Favorite</a></p>
            <p><a href="">Complete</a></p>

        </div>

        <div class="news">
            <h2>UI/UX Design</h2>
            <p>20 lessons</p>
        </div>

        <div class="content">

            <div class="cont" style="margin-right: 4.1%;">

                <h2>UI/UX Design</h2>
                <p>14 lessons</p>

            </div>
            <div class="cont">

                <h2>UI/UX Design</h2>
                <p>6 lessons</p>

            </div>

        </div>`;
        clearResponse();
        $('#content_a').html(html);
        $('.aside-right_acc').html("Пожалуйста авторизируйтесь");
        $('title').html("Домашння страница")
    }
    function showLoginPage() {
        {
            setCookie("jwt", "", 1);
            let html = `
                <form id="login_form">
                       
                            <h1 class="display-4">Авторизация</h1>
                        
                               
                               
                                        <input type="email" class="form-control" name="email" placeholder="name@example.com">
                                        <label for="floatingInput">Email address</label>
                                        <br>
                                 
                                        <input type="password" name="password" placeholder="Password">
                                        <label for="floatingPassword">Password</label>
                                        <br>
                                
                                <div id="knopka">
                                    <button type="submit" id="go_log" class="btn btn-outline-dark">Авторизация</button>
                                    <button type="button" id="sign_up" class="btn btn-outline-primary">Регистрация</button>
                                </div>
                           
                        </div>
                </form>`;
            clearResponse();
            $('#content_a').html(html);
            $('.aside-right_acc').html("Пожалуйста авторизируйтесь");
            $('title').html("Аворизация")
        }
    }


    function showRegistrationPage() {

        let html = `
            <form id="sign_up_form">
            
                <h1 class="display-4">Регистрация</h1>
                <div id="response"></div>
                <input type="email" name="email" required  id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
                <br>
                
                <input type="text" name="firstname"   required  id="nameInput" placeholder="name">
                <label for="nameInput">Name</label>
                <br>
            
                <input type="text" name="lastname"  id="surnameInput" required  placeholder="second name">
                <label for="surnameInput">Second name</label>
                <br>
                
                <input type="password" name="password"  id="pass" placeholder="Password" required >
                <label for="surnameInput">Password</label>
                <br>   
                
                <input type="password"  id="pass_r" placeholder="Password repeat">
                <label for="surnameInput">Password</label>
                <br>
            
                <div id="knopka">
                    <button type="submit" id="go-reg" class="btn btn-outline-dark">Зарегистрироваться</button>
                    <button type="button" id="sign_in" class="btn btn-outline-primary">Авторизоваться</button>
                </div>
            
            </form>`;

        clearResponse();
        $('#content_a').html(html);
        $('.aside-right_acc').html("Пожалуйста зарегистрируйтесь");
        $('title').html("Регистрация");

    }

    $(document).on('click', '#sign_in', showLoginPage)

    $(document).on('click', '#sign_up', showRegistrationPage);

    $(document).on('submit', '#login_form', function(e){
        e.preventDefault();
        let login_form = $(this);
        let form_data = JSON.stringify(login_form.serializeObject());

        $.ajax({
            url: "api/login.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result){

                // сохранить JWT в куки
                setCookie("jwt", result.jwt, 1);
                getUserName()
                showHomePage();
                // $('#response').html("<div class='alert alert-success'>Успешный вход в систему.</div>");

            },
            error: function(xhr, resp, text){
                alert("gbpltw")
                $('#response').html("<div >Ошибка входа. Email или пароль указан неверно.</div>");
                login_form.find('input').val('');
            }
        });

        return false;
    });


    $(document).on('submit', '#sign_up_form', function (e) {
        e.preventDefault();
        let sign_up_form = $(this);
        let form_data = JSON.stringify(sign_up_form.serializeObject());

        $.ajax({
            url: "http://jwt/api/create_user.php/",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function (result) {
                $('#response').html("<div class=''>Регистрация завершена успешно. Пожалуйста, войдите.</div>");
                sign_up_form.find('input').val('');
            },
            error: function (xhr, resp, text) {
                $('#response').html("<div class='alert alert-danger'>Невозможно зарегистрироваться. Пожалуйста, свяжитесь с администратором.</div>");
            }
        });

        return false;
    });


    function clearResponse() {
        $('#response').html('');
    }
    function getUserName(){
        let arr = {jwt: getCookie('jwt')}
        $.ajax({
            url: "http://jwt/api/validate_token.php/",
            type: "POST",
            contentType: 'application/json',
            data:  JSON.stringify(arr),
            success: function (result) {
                $('.aside-right_acc').html(result.data.firstname+"<br><div id='sign_in'>logout</div>");
                console.log(result)
            },
            error: function (xhr, resp, text) {
                console.log(this.data)
            }
        });

    }


    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});