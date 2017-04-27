(function () {
    var set,
        observer = {
            settings: {
                input: $('.input'),
                result: $('.result')
            },
            init: function (config) {
                set = $.extend(observer.settings, config);
                this.initSubsribers();
                set.input.on('keyup', observer.publish)
            },
            publish: function () {
                set.result.trigger('publish');
            },
            initSubsribers: function(){
                set.result.on('publish', observer.subsAction1);
            },
            subsAction1: function (a) {
                $(set.result).filter('.one').html(set.input.val());
                $(set.result).filter('.two').html(set.input.val().toUpperCase());
                $(set.result).filter('.three').html
                (set.input.val().split('').reverse().join('').split(' ').reverse().join(' '));
            }
        };
    observer.init();
})();
