
function setLocation(curLoc){
    // console.log(curLoc);
    if(curLoc === '')
    {
        curLoc = window.history.back();
    }
    try {
        history.pushState({ url: curLoc}, null,curLoc);
        return;
    } catch(e) {}
    location.hash = '#' + curLoc;
}

// window.addEventListener("hashchange", function(event){
//     console.log(event);
// });




$(document).ready(function(){
    $('body').on('keyup change', '.remote-form input,.remote-form textarea', function () {
        Validator.validate($(this));
    });
    

    $('[data-mask]').each(function(elem){
        $(this).inputmask($(this).attr('data-mask'),{ showMaskOnHover : false});
    });

    $(document).on("submit", ".remote-form", function (e) {   
        $(this).find('input,textarea').each(function(index, element) {
            Validator.validate($(element));
        });

        if($(this).find('.error-input').length > 0){
            return false;
        }      

        var formData = new FormData(this);
        var form = $(this);
        $.ajax({
            type: "POST",
            url: form.attr('action'),
            data: formData,
            processData: false,
            contentType: false,
        }).done(function(data) {
            form.trigger("reset");
            form.find('button').focus();
            form.find('input,textarea, [type="checkbox"]').each(function(i,elem){
                $(elem).trigger('focusout');
                $(elem).removeClass('error-input');
            });        
            $('.done-des').fadeIn(1000);
        });
        return false;
    });

    $('body').on('click', '.button-up', function(){
        var scroll = $(this).attr('href');
        if($(scroll).lenght != 0){
            $('html,body').animate({scrollTop: $(scroll).offset().top},500);
        }
        return false;
    });

    $('body').on('click tap','.head-menu .nav li a,.td,.a-cont,.button-right, .button-left,.cw-pro,.pagination-left, .pagination-right,.head-logo a, .footer-wall-button button, .grid a.sect_2-item__wrap, .menu-head a',function(e){
      e.preventDefault();
      $('body').removeClass('tsd');
      if(typeof($(this).attr('href')) != 'undefined'){
        var target = $(this).attr('href');
        target = target.split('#');
        if(target[0] == 'testdrive'){
            $('body').addClass('tsd');
        }
        console.log(target[0]);
        if(target[0] != '/'){
         $('.nav li a').removeClass('onActive').css({'color':''});
         $('a[href="' + target[0] + '"]').addClass('onActive').css({'color':'#26272d'});
         $('.button-head').css({'display':'inline-block'});
     }
 }


 var url =  $(this).attr('href');
 var link = $(this);
 if(url != '#'){
    $.ajax({
        url: url,
        type: 'GET',
        dataType : 'html',
        beforeSend : function() { 
            $('.load').fadeIn();
            $('#logo-hover').addClass('custom-logo-animate');
            if(link.attr('data-scroll') == '0'){
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
            }
        },
        success : function(response) {

           setTimeout(function(){
            var tempDom = $('<output>').append($.parseHTML(response));
            var appContainer = $('.wrapper', tempDom);
            appContainer.find('[data-wow-delay]').attr('data-wow-delay',null);
            $('header').find('[data-wow-delay]').attr('data-wow-delay',null); 
            $('.load').fadeOut(); 
            $('#logo-hover').removeClass('custom-logo-animate');   
            $('.wrapper').html(appContainer.html()); 
            url = url.split('#');
            setLocation(url[0]); 

            if(typeof(url[1]) != 'undefined'){
               $('html, body').animate({
                scrollTop: $('#'+url[1]).offset().top - 150
            }, 0);
           }


           $('#scene').parallax({
            relativeInput: true,
            clipRelativeInput: false,
            hoverOnly: true,
            inputElement: $('#myinput'),
            limitY: 10.0,
            scalarX: 1,
            frictionX: 0.2,
        });   

           var sectProj = $('.menu li');
           var web = $('.web'),
           crm = $('.crm'),
           cms = $('.cms'),
           app = $('.app');
           $('body').on('click tap','.menu li:nth-child(1)',function(){
            cms.css({'display':'none'});
            app.css({'display':'none'});
            sectProj.removeClass('active-mnu slide');
            $(this).addClass('active-mnu slide');
            crm.css({'display':'inline-block'});
        });
           $('body').on('click tap','.menu li:nth-child(2)',function(){
            crm.css({'display':'none'});
            app.css({'display':'none'});
            sectProj.removeClass('active-mnu slide');
            $(this).addClass('active-mnu slide');
            cms.css({'display':'inline-block'});
        });
           $('body').on('click tap','.menu li:nth-child(3)',function(){
            crm.css({'display':'none'});
            cms.css({'display':'none'});
            sectProj.removeClass('active-mnu slide');
            $(this).addClass('active-mnu slide');
            app.css({'display':'inline-block'});
        });   


           $({blurRadius: 5}).animate({blurRadius: 0}, {
            duration: 1000,
            easing: 'swing',
            step: function() {
                $(".lines").css({
                    "-webkit-filter": "blur("+this.blurRadius+"px)",
                    "filter": "blur("+this.blurRadius+"px)"
                });
            }
        });
           var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
           $(".lines").each(function() {
            var tcount = $(this).data("count");
            $(this).animateNumber({ number: tcount,
                easing: 'easeInQuad',
                "font-size": "55px",
                numberStep: comma_separator_number_step},
                1000);
        });
           if(document.getElementById('map')){
            GM.init();
        }
    },1500);
       }

   });
}
});
});

window.onpopstate = function(e){
    console.log(e);
    if(e.state !== null){
        console.log(e.state.url);
        var url = '/';
        if('url' in e.state) {
           url =  e.state.url;
       }
       console.log(url);
       if(url != '/')
       {
        $('.nav li a').removeClass('onActive').css({'color':''});
        $('a[href="' + url + '"]').addClass('onActive').css({'color':'#26272d'});
        $('.button-head').css({'display':'inline-block'});
    }else{
        $('.button-head').css({'display':'none'});
        $('.nav li a').removeClass('onActive').css({'color':''});
    }



    $.ajax({
        url: url,
        type: 'GET',
        dataType : 'html',
        beforeSend : function() { 
            $('.load').fadeIn();
            $('#logo-hover').addClass('custom-logo-animate');

        },
        success : function(response) {

           setTimeout(function(){
            var tempDom = $('<output>').append($.parseHTML(response));
            var appContainer = $('.wrapper', tempDom);
            appContainer.find('[data-wow-delay]').attr('data-wow-delay',null);
            $('header').find('[data-wow-delay]').attr('data-wow-delay',null); 
            $('.load').fadeOut(); 
            $('#logo-hover').removeClass('custom-logo-animate');   
            $('.wrapper').html(appContainer.html()); 




            if(window.location.hash)
                $('html, body').animate({
                    scrollTop: $(window.location.hash).offset().top - 150
                }, 0);

            $('#scene').parallax({
                relativeInput: true,
                clipRelativeInput: false,
                hoverOnly: true,
                inputElement: $('#myinput'),
                limitY: 10.0,
                scalarX: 1,
                frictionX: 0.2,
            });   

            var sectProj = $('.menu li');
            var web = $('.web'),
            crm = $('.crm'),
            cms = $('.cms'),
            app = $('.app');
            $('body').on('click tap','.menu li:nth-child(1)',function(){
                cms.css({'display':'none'});
                app.css({'display':'none'});
                sectProj.removeClass('active-mnu slide');
                $(this).addClass('active-mnu slide');
                crm.css({'display':'inline-block'});
            });
            $('body').on('click tap','.menu li:nth-child(2)',function(){
                crm.css({'display':'none'});
                app.css({'display':'none'});
                sectProj.removeClass('active-mnu slide');
                $(this).addClass('active-mnu slide');
                cms.css({'display':'inline-block'});
            });
            $('body').on('click tap','.menu li:nth-child(3)',function(){
                crm.css({'display':'none'});
                cms.css({'display':'none'});
                sectProj.removeClass('active-mnu slide');
                $(this).addClass('active-mnu slide');
                app.css({'display':'inline-block'});
            });   


            $({blurRadius: 5}).animate({blurRadius: 0}, {
                duration: 1000,
                easing: 'swing',
                step: function() {
                    $(".lines").css({
                        "-webkit-filter": "blur("+this.blurRadius+"px)",
                        "filter": "blur("+this.blurRadius+"px)"
                    });
                }
            });
            var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
            $(".lines").each(function() {
                var tcount = $(this).data("count");
                $(this).animateNumber({ number: tcount,
                    easing: 'easeInQuad',
                    "font-size": "55px",
                    numberStep: comma_separator_number_step},
                    1000);
            });
            if(document.getElementById('map')){
                GM.init();
            }
        },1500);
       }

   });
}

}


