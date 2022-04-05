jQuery.noConflict()(function($) {

    'use strict';

    var pageNum = parseInt(infinity_load.startPage) + 1,
        max = parseInt(infinity_load.maxPages),
        nextLink = infinity_load.nextLink,
        no_posts = infinity_load.no_posts,
        load_more_text = infinity_load.load_more_text,
        $loadMore = $('.vl-posts-load-more--link'),
        $posts_container = $('.vl-posts-load-more--ajax');


    $posts_container.next().find($loadMore).on('click', function(event){

        event.preventDefault();
       
        var t = $(this);

        t.addClass('is-active');

        pageNum++;


        $.ajax({
            type: 'POST',
            url: nextLink,
            dataType: 'html',
            success: function(data) {
                var k = $(data),
                g = k.find('.vl-portfolio-item');


                if(g.length > 0) {

                    g.imagesLoaded(function() {


                        $posts_container.append(g).isotope('appended', g).isotope('layout'); 

                        $('.vl-portfolio-masonry-wrapper--popup').photoSwipe('update');

                        $('.vl-portfolio-masonry-wrapper--animate .vl-portfolio-item').vl_fade_in_up({
                            inner : '.vl-portfolio-item--inner',
                        });

     

                    });



               


                    t.removeClass('is-active');

                } else {

                    t.removeClass('is-active');
                    t.find('span').text(no_posts).end().addClass('vl-btn--disable');

                }

                
                nextLink = nextLink.replace(/\/page\/[0-9]?/,'/page/'+ pageNum);

                if(pageNum <= max) {

                        t.removeClass('is-active');
                        t.find('span').text(load_more_text);

                    } else {
                        
                        t.removeClass('is-active');
                        t.find('span').text(no_posts).end().addClass('vl-btn--disable');

                    }


                },
                error: function(jqXHR, textStatus, errorThrown) {

                    $loadMore.text(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);

                }
            });


        });

});
