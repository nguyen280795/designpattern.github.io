var runSlide = function () {

    //settings for slider
    var privateWidth = 720;
    var privateAnimationSpeed = 1000;
    var privatePause = 3000;
    var privateCurrentSlide = 2;

    //cache DOM elements
    var privateSlider = $('#slider');


    var privateSlideContainer = $('.slides', privateSlider);
    var privateSlides = $('.slide', privateSlider);

    var privateInterval;

    //======================>FUNC PRIVATE<======================

    //func auto slide
    var privateStartSlider = function () {
        privateInterval = setInterval(privateNextSlide, privatePause);
    };

    //func next slide
    var privateNextSlide = function () {

        if (privateCurrentSlide > privateSlides.length) {
            $("#1").animate({"opacity": "+=" + 1}, privateAnimationSpeed);
            $("#" + (privateCurrentSlide - 1)).animate({"opacity": "-=" + 0.9}, privateAnimationSpeed);
            privateSwapNextSlide();
        }
        else {
            $("#" + (privateCurrentSlide - 1)).animate({"opacity": "-=" + 0.9}, privateAnimationSpeed);
            $("#" + (privateCurrentSlide)).animate({"opacity": "+=" + 1}, privateAnimationSpeed);
            privateSlideContainer.animate({
                    "margin-left": "-=" + privateWidth
                },
                privateAnimationSpeed);
            option = privateCurrentSlide;
            privateCurrentSlide++;
        }
        privateClickThumb();
    };

    //func swap next slide
    var privateSwapNextSlide = function () {

        if (privateCurrentSlide > privateSlides.length) {
            privateCurrentSlide = 2;
            privateSlideContainer.animate({
                "margin-left": "+=" + (privateSlides.length * privateWidth - privateWidth)

            });
            option = privateCurrentSlide - 1;
        }
    };

    //func pre slide
    var privatePreSlide = function () {

        if (privateCurrentSlide === 2) {
            $("#5").animate({"opacity": "+=" + 1}, privateAnimationSpeed);
            $("#" + (privateCurrentSlide - 1)).animate({"opacity": "-=" + 0.9}, privateAnimationSpeed);
            privateSwapPreSlide();
        } else {
            $("#" + (privateCurrentSlide - 1)).animate({"opacity": "-=" + 0.9}, privateAnimationSpeed);
            $("#" + (privateCurrentSlide - 2)).animate({"opacity": "+=" + 1}, privateAnimationSpeed);
            privateSlideContainer.animate({
                    "margin-left": "+=" + privateWidth
                },
                privateAnimationSpeed);
            option = privateCurrentSlide - 2;
            privateCurrentSlide--;
        }
        privateClickThumb();
    };

    //func swap pre slide
    var privateSwapPreSlide = function () {

        if (privateCurrentSlide === 2) {
            privateCurrentSlide = 6;
            privateSlideContainer.animate({
                "margin-left": "-=" + (privateSlides.length * privateWidth - privateWidth)
            });
            option = 5;
        }
    };

    //func clear time slide
    var privatePauseSlide = function () {
        clearInterval(privateInterval);
    };

    var privateClickThumb = function () {
        $(".click-img").animate({"opacity": 0.5});
        $(".slide").css({"opacity": 0.1});
        $("#icon-" + option).animate({"opacity": 1});
        $("#" + option).animate({"opacity": 1});
        privateSlideContainer.css({"margin-left": -(option * privateWidth - privateWidth)});
    };

    //======================>FUNC PUBLIC<======================

    //pub func start slide
    var publicStartSlide = function () {
        privateStartSlider();
    };

    //pub func next slide
    var publicNextSlide = function () {
        privatePauseSlide();
        privateNextSlide();
        privateStartSlider();
    };

    //pub func pre slide
    var publicPreSlide = function () {
        privatePauseSlide();
        privatePreSlide();
        privateStartSlider();
    };


    var publicClickThumb = function () {
        privatePauseSlide();
        privateClickThumb();
        privateCurrentSlide = ++option;
        privateStartSlider();
    };

    //return
    return {
        run: publicStartSlide,
        next: publicNextSlide,
        pre: publicPreSlide,
        click: publicClickThumb
    }

}();

var option = 0;
$(function () {

    var timeclick = 0;

    //start slide
    runSlide.run();

    //next slide
    $(".next-slider").click(function () {

        var date = new Date;
        var time = date.getSeconds();

        if (timeclick !== time) {
            timeclick = time;
            runSlide.next();
        }
    });

    //pre slide
    $(".prev-slider").click(function () {

        var date = new Date;
        var time = date.getSeconds();

        if (timeclick !== time) {
            timeclick = time;
            runSlide.pre();
        }
    });

    $(".click-img").click(function () {
        option = $(this).attr("stt");
        runSlide.click();
    });

});