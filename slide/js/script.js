var option = 0;
var runSlide = function () {
    //settings for slider
    var privateWidth = 720;
    var privateAnimationSpeed = 1000;
    var privatePause = 3000;
    var privateCurrentSlide = 0;

    //cache DOM elements
    var privateSlider = $("#slider");
    var privateSlideContainer = $("ul", privateSlider);
    var privateSlides = $(".slide", privateSlider);

    var privateInterval;

    //======================>FUNC PRIVATE<======================

    //private func auto slide
    var privateStartSlider = function () {
        privateInterval = setInterval(privateNextSlide, privatePause);
    };

    //private func next slide
    var privateNextSlide = function () {

        if (privateCurrentSlide >= privateSlides.length - 1) {
            $("#slider ul li:eq(" + privateCurrentSlide + ")")
                .animate({"opacity": "-=" + 0.9}, privateAnimationSpeed);
            privateSlideContainer.animate({
                "margin-left": "+=" + (privateSlides.length * privateWidth - privateWidth)
            });
            $("#slider ul li:eq(0)")
                .animate({"opacity": "+=" + 1}, privateAnimationSpeed);
            privateCurrentSlide = 0;
            option = privateCurrentSlide;
        }
        else {
            privateSlideContainer.animate({"margin-left": "-=" + privateWidth}, privateAnimationSpeed);
            $("#slider ul li:eq(" + privateCurrentSlide + ")")
                .animate({"opacity": "-=" + 0.9}, 500);
            $("#slider ul li:eq(" + (privateCurrentSlide + 1) + ")")
                .animate({"opacity": "+=" + 1}, privateAnimationSpeed + 500);
            privateCurrentSlide++;
            option = privateCurrentSlide;
        }
        privateClickThumb();
    };

    //private func pre slide
    var privatePreSlide = function () {

        if (privateCurrentSlide === 0) {
            $("#slider ul li:eq(" + privateCurrentSlide + ")")
                .animate({"opacity": "-=" + 0.9}, privateAnimationSpeed);
            privateSlideContainer.animate({
                "margin-left": "-=" + (privateSlides.length * privateWidth - privateWidth)
            });
            privateCurrentSlide = privateSlides.length - 1;
            $("#slider ul li:eq(" + privateCurrentSlide + ")")
                .animate({"opacity": "+=" + 1}, privateAnimationSpeed);
            option = privateCurrentSlide;
        } else {
            privateSlideContainer.animate({
                    "margin-left": "+=" + privateWidth
                },
                privateAnimationSpeed);
            $("#slider ul li:eq(" + privateCurrentSlide + ")")
                .animate({"opacity": "-=" + 0.9}, 500);
            $("#slider ul li:eq(" + (privateCurrentSlide - 1) + ")")
                .animate({"opacity": "+=" + 1}, privateAnimationSpeed + 500);
            privateCurrentSlide--;
            option = privateCurrentSlide;
        }
        privateClickThumb();
    };

    //private func click thumb
    var privateClickThumb = function () {
        $(".click-img").animate({"opacity": 0.5});
        $("#slider ul li").css({"opacity": 0.1});
        $("#icon-" + (option + 1)).animate({"opacity": 1});
        $("#slider ul li:eq(" + option + ")").animate({"opacity": 1});
        privateSlideContainer.css({"margin-left": -(option * privateWidth)});
    };

    //private func clear time slide
    var privatePauseSlide = function () {
        clearInterval(privateInterval);
    };

    //======================>FUNC PUBLIC<======================

    //public func start slide
    var publicStartSlide = function () {
        privateStartSlider();
    };

    //public func next slide
    var publicNextSlide = function () {
        privatePauseSlide();
        privateNextSlide();
        privateStartSlider();
    };

    //public func pre slide
    var publicPreSlide = function () {
        privatePauseSlide();
        privatePreSlide();
        privateStartSlider();
    };

    //public func click thumb
    var publicClickThumb = function () {
        privatePauseSlide();
        privateClickThumb();
        privateCurrentSlide = option;
        privateStartSlider();
    };

    ////////////RETURN////////////
    return {
        run: publicStartSlide,
        next: publicNextSlide,
        pre: publicPreSlide,
        click: publicClickThumb
    }
}();

$(function () {
    var timeClick = 0;

    runSlide.run();

    $(".next-slider").click(function () {
        var date = new Date;
        var time = date.getSeconds();
        if (timeClick !== time) {
            timeClick = time;
            runSlide.next();
        }
    });

    $(".prev-slider").click(function () {
        var date = new Date;
        var time = date.getSeconds();
        if (timeClick !== time) {
            timeClick = time;
            runSlide.pre();
        }
    });

    $(".click-img").click(function () {
        option = parseInt($(this).attr("id").slice(5, 6)) - 1;
        console.log(option);
        runSlide.click();
    });

});