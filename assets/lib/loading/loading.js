$(function() {
        //loading
        var countImages = $('.wrapper img').length;
        $('.wrapper').imagesLoaded()
            .done(function(instance) {
                $('#progress-bar').css({
                    'width': "100%"
                });
                TweenMax.to('#loading', 1, {
                    delay: .5,
                    display: 'none',
                    autoAlpha: 0,
                    addClass:'loaded_style',
                    ease: Quart.easeOut,
                    onComplete: function() {
                        $('body').addClass('loaded_style');
                    }
                });
            })
            .progress(function(instance, image) {
                if (image.isLoaded) {
                    $(image.img).addClass('loaded');
                    var countLoadedImages = $('.wrapper img.loaded').length;
                    var width = parseInt(100 * (countLoadedImages / countImages)) + '%';
                    // console.log(width);
                    $(".loading-number").text(width);
                    $('#progress-bar').css({ 'width': width });
                }
            });
    });