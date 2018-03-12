$(function() {
    $('#my-menu').mmenu({
        extensions: ['theme-black', 'pagedim-black'],
        navbar: {
            title: '<img src="img/logo-1.svg" alt="Салон красоты">'
        },
        offCanvas: {
            position: 'right'
        }
    });

   var api = $('#my-menu').data('mmenu');

   api.bind("open:finish", function () {
       $('.hamburger').addClass('is-active')
   });
   api.bind("close:finish", function () {
       $('.hamburger').removeClass('is-active')
   });

   // когда загружается карусель, высота элементов вычесляется до того как показана карусель. Нужно вычеслять высоту после того
    // как карусель полностью загрузилась. Для решения это проблеммы, нужно вычеслить момент, когда карусель готова!
    // Для этого, нужно получить калбэк, инициализировна карусель или нет
    //Важно сделать это до вызова карусели иначе будет false.
    $('.carousel-services').on('initialized.owl.carousel', function () {    // В этой строке, я initialized карусель и если инициализирована, выполняю функцию
        setTimeout(function () {    // существует микрозадержка, она инициализирована и пытаеться вычеслить высоту, но не может сделать точно потому что карусель еще не до конца готова. Поэтому нужно применять setTimeout
            carouselService()
        }, 100);
    });

   $('.carousel-services').owlCarousel({
       loop: true,
       dots: false,
       nav: true,
       smartSpeed: 700,
       navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
       responsiveClass: true,
       responsive: {
           0: {
               items: 1
           },
           800: {
               items: 2
           },
           1100:{
               items: 3
           }
       }
   });

   //функция для стилизации изображения. Мы будем делать его точно такой же высотой как и контентая композиция
    function carouselService () {
        $('.carousel-services-item').each(function () { // родительский элемент от которого будем отталкиватся. Но так как их несколько, нужно пройтись циклом.
            var ths = $(this),  // В итоге, мы проходимся по всем item и каждый item попадает в this
                thsH = ths.find('.carousel-services-content').outerHeight();    // ищу внутри данного элемента carousel-services-content и беру внешнюю высоту, с учётом всех отступов
            ths.find('.carousel-services-images').css('min-height', thsH);  // нахожу граф. элемент в карусели и применяю к нему ту высоту которую я нашел на пред. этапе.
        })
        
    }carouselService(); // вызов

    //функция которая производит добавление слова в опредленный тег
    $('.carousel-services-composition h3').each(function () {   // прохожусь по всем элементам и пишу функцию для каждого
        var ths = $(this);
        ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'))    //Каждый заголовок, оборачиваем в span. Делаем замену html.
        // Вообще html назначает html какому то тегу. Сдесь мы назначим переназначенное.
    });
    $('section .h2').each(function () {   // прохожусь по всем элементам и пишу функцию для каждого
        var ths = $(this);
        ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'))    //Каждый заголовок, оборачиваем в span. Делаем замену html.
        // Вообще html назначает html какому то тегу. Сдесь мы назначим переназначенное.
    });


    // функция делает одинаковой, высоту контента и делать она это будет по самой максимальной высоте, все остальные будут по ней равнятся
    // кроме того, при каждом resize окна, необходимо перещитывать equalHeights
    function onResize() {
        $('.carousel-services-content').equalHeights();
    }onResize();
    window.onresize = function () { onResize() };   // что бы все работало наверняка, необходимо прописать эту строку

    $(window).scroll(function () {  // что будем делать в scroll function
        if ($(this).scrollTop() > $(this).height()) {   // нужно вычеслить высоту экрана, если мы её пролистали, то нужно появить .top
            $('.top').addClass('active');
        } else {
            $('.top').removeClass('active');
        }
    });
    $('.top').click(function () {   // что мы делаем при клике
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');    // берем самые родительские классы и анимируем. Но перед этим,
        // выполняем служебную функцию stop, что бы если какая то анимацию уже есть, что бы она останавливалась и
        // скролим вверх с определенными параметрами
    });

    //E-mail Ajax Send
    $("form.callback").submit(function() { //Change
        var th = $(this);   //переменная берет в this данный callback. Это нужно для того, что бы при множестве форм на стр. отправлялась именно эта
        $.ajax({
            type: "POST",
            url: "mail.php", //Change. Ищу mail.php
            data: th.serialize()    //делаю сериализацию (сбор данных) всех данные формы из всех полей
        }).done(function() {
            // alert("Thank you!");
            $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
            setTimeout(function() {
                // Done Functions. Когда форма отправлена, делаем следующее:
                $(th).find('.success').removeClass('active').fadeOut();
                th.trigger("reset");    //первый th (form.callback), сбрасывается
            }, 3000);
        });
        return false;
    });

    $('select').selectize();

    $('.reviews').owlCarousel({
        loop: true,
        items: 1,
        smartSpeed: 700,
        nav: false,
        autoHeight: true
    });

    $('.partners').owlCarousel({
        loop: true,
        smartSpeed: 700,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsiveClass: true,
        responsive: {
            320: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
});

$(window).on('load', function () {  // при загрузке, то есть при 'load' мы выполняем функцию
   $('.preloader').delay(1000).fadeOut('slow'); // .preloader устанавливаем ему задержку и плавно убираем
});