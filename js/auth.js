function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
jQuery(function ($) {
    function showLoginPage() {
        {
            setCookie("jwt", "", 1);
            let html = `
                <form>
                       
                            <h1 class="display-4">Авторизация</h1>
                        
                               
                               
                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                        <label for="floatingInput">Email address</label>
                                        <br>
                                 
                                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
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

    $(document).on('submit', '#sign_up_form', function (e) {
        alert("ef");
        e.preventDefault();
        // получаем данные формы
        let sign_up_form = $(this);
        let form_data = JSON.stringify(sign_up_form.serializeObject());
        //
        // отправить данные формы в API

        $.ajax({
            url: "http://jwt/api/create_user.php/",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function (result) {
                // в случае удачного завершения запроса к серверу,
                // сообщим пользователю, что он успешно зарегистрировался и очистим поля ввода
                $('#response').html("<div class='alert alert-success'>Регистрация завершена успешно. Пожалуйста, войдите.</div>");
                sign_up_form.find('input').val('');
                alert("efd")
            },
            error: function (xhr, resp, text) {
                // при ошибке сообщить пользователю, что регистрация не удалась
                $('#response').html("<div class='alert alert-danger'>Невозможно зарегистрироваться. Пожалуйста, свяжитесь с администратором.</div>");

                alert("hui")
            }
        });

        return false;
    });

    // показать форму входа при клике на кнопку

    // Удаление всех быстрых сообщений
    function clearResponse() {
        $('#response').html('');
    }

    // функция showLoginPage()

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