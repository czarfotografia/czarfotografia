jQuery.noConflict()(function ($) {

    'use strict';

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iPhone: function() {
            return navigator.userAgent.match(/iPhone/i);
        },
        iPad: function() {
            return navigator.userAgent.match(/iPad/i);
        },
        iPod: function() {
            return navigator.userAgent.match(/iPod/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    // Document Ready

    $(document).ready(function() {

        vl_site_preloader();
        vl_parallax_section();
        vl_pilling_slider();
        vl_gallery();
        vl_general_navigation();
        vl_masonry_blog();
        vl_back_to_top();



        // Shortcodes

        vl_alert_shortcode();
        vl_popup_shortcode();
        vl_counter_up_shortcode();
        vl_progress_bar_shortcode();


    });




    function vl_alert_shortcode(){

        var element = $('.vl-alert.vl-alert-dismissible'),
            close = $('.vl-alert.vl-alert-dismissible .vl-alert-close');

        close.on('click', function() {

            $(this).parent(element).remove();
            return false;

        });

    }

    function vl_popup_shortcode(){

        var element_video = $('.vl-video-popup--link'),
            element_image = $('.vl-image-popup--link');

        element_video.magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 300,
            preloader: false,
            fixedContentPos: false,
        });


        element_image.magnificPopup({
        	type: 'image',
        	closeOnContentClick: true,
        	closeBtnInside: false,
        	fixedContentPos: false,
        	mainClass: 'mfp-fade',
        	image: {
        		verticalFit: true,
        	}
        });


    }


    function vl_counter_up_shortcode(){

        var element = $('.vl-counter-up');

        element.each(function(){

            $(this).one('inview', function(){

                var t = $(this),
                number = parseInt(t.find('.vl-counter-number').text(),10);

                t.find('.vl-counter-number').countTo({
                    from: 0,
                    to: number,
                    speed: 1200,
                    refreshInterval: 30
                });


            });

        });

    }


    function vl_progress_bar_shortcode(){


        var element = $('.vl-progress-bars .vl-progress-bar'),
            duration = 750;

        element.each(function(){

            $(this).one('inview', function(){

                var t = $(this),
                    percent = parseInt(t.find('.vl-progress-bar--percent').text(),10);

                t.find('.vl-progress-bar--inner').animate({
                    width : percent + '%'
                }, duration);

                t.find('.vl-progress-bar--percent').countTo({
                    from: 0,
                    to: percent,
                    speed: duration,
                    refreshInterval: 30
                });

            });

        });


    }


    // Fade In Up

    $.fn.vl_fade_in_up = function( options ) {

        var options = $.extend( {
            inner : 'div',
            class : 'animated',
            delay : 150,
        }, options);

        return this.each(function(index) {

            var $self = $(this);

            if (!isMobile.any()){

                setTimeout(function(){
                    $self.find(options.inner).addClass(options.class);
                }, options.delay + ( index * options.delay ));

            } else {

                $self.find(options.inner).addClass(options.class);

            }


        });

    };


    function vl_gallery(){

        var gallery = {
            container: $('.vl-portfolio-masonry-wrapper'),
            container_popup: $('.vl-portfolio-masonry-wrapper--popup'),
            filter_container: $('.vl-filters-wrap'),
        }

        gallery.container_popup.photoSwipe('img', {
            bgOpacity: 0.8,
            loop: true,
            showHideOpacity: false,
        });



        gallery.container.imagesLoaded(function() {

            gallery.container.isotope({
                itemSelector: 'article',
                layoutMode: 'masonry',
                transitionDuration: '300ms',
            });

            $('.vl-portfolio-masonry-wrapper--animate .vl-portfolio-item').vl_fade_in_up({
                inner : '.vl-portfolio-item--inner',
            });

        });

        gallery.filter_container.find('a').on('click', function() {


            gallery.filter_container.find('a').removeClass('is-active');
            $(this).addClass('is-active');

            gallery.container.isotope({
                filter: $(this).attr('data-filter')
            });

            return false;

        });

    }


    // Masonry Blog Post


    function vl_masonry_blog(){

        var element = $('.vl-postlist-masonry');


        element.imagesLoaded(function() {

            element.isotope({
                itemSelector: 'article',
                layoutMode: 'masonry',
                transitionDuration: '300ms',
            });


        });


        $(window).on('load resize', function(){

            var first_post = $('.vl-postlist-timeline article:eq(0) .vl-post--thumbnail').height();
            $('.vl-postlist-timeline article:eq(1)').css({'margin-top' : first_post + 'px'});

            $('.vl-postlist-masonry').isotope();

        }).trigger('resize');



    }


    // Preloader

    function vl_site_preloader(){

        var element = $('.site-transition');

        if (element.length > 0) {

            element.animsition({
                inDuration: 1000,
                outDuration: 1000,
                linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not(.ajax-btn, .is-popup, .comment-count-link, .comment-reply-link, #cancel-comment-reply-link):not([class^="fancybox"])',
                loadingInner: '<div class="vl-loader--wrapper"><div class="vl-loader--inner"></div></div>'
            });


        }
    }

    // Parallax

    function vl_parallax_section(){

        var parallax = {
            element: $('.vl-parallax'),
            effect: $('.vl-parallax--hero-effect'),
            inner: $('.vl-hero-header--inner')
        };


        parallax.element.imagesLoaded(function() {



            parallax.element.jarallax({
                speed: 0.35,
                onScroll: function(calculations) {


                    if(parallax.effect.length > 0)
                    {
                        var transform = calculations.afterTop * 0.4,
                            opacity = Math.min(1, calculations.visiblePercent.toFixed(2));

                        parallax.inner.css({
                            '-webkit-transform' : 'translate3d(0, '+ transform +'px, 0)',
                            '-moz-transform'    : 'translate3d(0, '+ transform +'px, 0)',
                            '-ms-transform'     : 'translate3d(0, '+ transform +'px, 0)',
                            '-o-transform'      : 'translate3d(0, '+ transform +'px, 0)',
                            'transform'         : 'translate3d(0, '+ transform +'px, 0)',
                            'opacity'           : opacity
                        });

                    }


                }
            });


        });


    }


    // Page Pilling

    function vl_pilling_slider(){

        var pilling = {
            element: $('.vl-page-pilling')
        };

        pilling.element.imagesLoaded(function() {


            pilling.element.fullpage({
                lockAnchors: false,
                navigation: ($('.vl-page-pilling').data('nav') != '') ? $('.vl-page-pilling').data('nav') : false,
                navigationPosition: ($('.vl-page-pilling').data('nav-position') != '') ? $('.vl-page-pilling').data('nav-position') : 'right',
                showActiveTooltip: false,
                css3: true,
                scrollingSpeed: ($('.vl-page-pilling').data('speed') != '') ? $('.vl-page-pilling').data('speed') : 750,
                autoScrolling: true,
                fitToSection: true,
                fitToSectionDelay: 1000,
                scrollBar: false,
                easing: 'swing',
                easingcss3: 'ease-in-out',
                loopBottom: ($('.vl-page-pilling').data('loop') != '') ? $('.vl-page-pilling').data('loop') : false,
                scrollOverflowOptions: null,
                touchSensitivity: 5,
                normalScrollElementTouchThreshold: 5,
                bigSectionsDestination: null,

                //Accessibility
                keyboardScrolling: true,
                animateAnchor: true,
                recordHistory: false,

                //Design
                verticalCentered: true,
                responsiveWidth: 0,
                responsiveHeight: 0,
                responsiveSlides: true,

                //Custom selectors
                sectionSelector: '.vl-page-pilling--section',
                lazyLoading: false,


                onLeave: function(index, nextIndex, direction){

                    if (direction == 'down'){

                        // This
                        $('.vl-page-pilling--section').eq(index -1).removeClass('is-animated');
                        $('.vl-page-pilling--section').eq(index -1).addClass('is-animated-top');

                        // Next
                        $('.vl-page-pilling--section').eq(nextIndex -1).addClass('is-animated');


                    } else if (direction == 'up'){

                        // This
                        $('.vl-page-pilling--section').eq(index -1).removeClass('is-animated');
                        $('.vl-page-pilling--section').eq(index -1).removeClass('is-animated-top');

                        // Next
                        $('.vl-page-pilling--section').eq(nextIndex -1).addClass('is-animated');

                    }

                }

            });


        });


    }




    // General Menu

    function vl_general_navigation(){



        var nav = {
            header: $('.vl-header'),
            body: $('body'),
            mobile_menu: $('.vl-mobile-navigation'),
            main_navigation: $('.vl-main-navigation'),
            mobile_trigger: $('.vl-main-navigation--mobile-trigger a'),
            mobile_link_has_children: $('.vl-mobile-menu li.menu-item-has-children a')
        };



        var fnOpen = false;

        var fnToggleFunc = function() {
            fnOpen = !fnOpen;
            nav.body.toggleClass('menu-is-open');

            return false;
        };

        nav.mobile_trigger.on('click', fnToggleFunc);

        $(document).on('keyup', function(e) {
            if (e.keyCode == 27 && fnOpen) {
                fnToggleFunc();
            }
        });

        nav.main_navigation.on('click', '.menu-item-has-children > a', function(){
            return false;
        });

        nav.mobile_menu.on('click', '.menu-item-has-children > a', function(){

            $(this).parent('li.menu-item-has-children').toggleClass('sub-active');
            $(this).next('ul.sub-menu').slideToggle(300);

            return false;

        });


    }



    // Back to top

    function vl_back_to_top(){


        var back_to_top = {
            element: $('.vl-back-to-top'),
            offset: 350,
            duration: 350
        };



        $(window).on('scroll', function(){
            if($(this).scrollTop() > back_to_top.offset ) {

                back_to_top.element.removeClass('is-hidden').addClass('is-visible');

            } else {

                back_to_top.element.removeClass('is-visible').addClass('is-hidden');

            }
        });


        back_to_top.element.on('click', function() {

            $('html, body').animate({
                scrollTop: 0
            }, back_to_top.duration);

            return false;
        });

    }




});
