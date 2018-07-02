$(window).on('load', function () {
	var logotip = $('#logo'),
	body = $('body');
	logotip.css({'opacity':'1'});
	var logos = new Vivus('logo', {
		type: 'async', 
		duration: 80,
		animTimingFunction: Vivus.EASE}, function(){
			logotip.find('path').addClass('finished');
			$('#p_prldr .svg_anm').addClass('zoomOut animated');
		});
	setTimeout(function(){
		$('#p_prldr').addClass('divide');
		var preloader = $('#p_prldr');
		var svg_anm   = preloader.find('#logo');
		svg_anm.fadeOut(100);
		preloader.delay(500).fadeOut('slow');
	},3500)
	setTimeout(function(){
		if($('#p_prldr').hasClass('divide')){
			body.css('overflow','visible');
		}
		else{
			body.css('overflow','hidden');
		}
	},3600);

});

$(document).ready(function(){
	$('#scene').parallax({
		relativeInput: true,
		clipRelativeInput: false,
		hoverOnly: true,
		inputElement: $('#myinput'),
		limitY: 10.0,
		scalarX: 1,
		frictionX: 0.2,
	});



	var nav = $('.nav li a');
	nav.on('click tap',function(){
		nav.removeClass('onActive').css({'color':''});
		$(this).addClass('onActive').css({'color':'#26272d'});
		$('.button-head').css({'display':'inline-block'});
	});
	$('.sect_2-item__wrap').on('click', function(){
		$('.button-head').css({'display':'inline-block'});
	});

	$('body').on('focusout','.send-mail__wrap input,.send-mail__wrap textarea',function(){
		if($(this).val() != ''){
			$(this).addClass('has-content');
		}
		else{
			$(this).removeClass('has-content');
		}
	});

	$('a[href="/"]').click(function(){
		$('.nav li a').removeClass('onActive').css({'color':''});
		$('.button-head').css({'display':'none'});
	});

	var sectProj = $('.menu li');
	var crm = $('.crm'),
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

	$('#toggle').on('click', function(){
		$('.menu-head').removeClass('animated fadeOutUp');
		$('.menu-head').addClass('animated fadeInDown');
	});
	$('.btn-close__menu, .menu-head__btn button').on('click',function(){
		// $('.menu-head').removeClass(' active animated fadeInDown');
		$('.menu-head').removeClass('fadeInDown').addClass('fadeOutUp');
	});
	$('.menu-head a').on('click', function(){
		$('.menu-head a').removeClass('menu-active onActive').css({'color':''});
		$('.menu-head').removeClass('fadeInDown').addClass('fadeOutUp');
		$(this).addClass('menu-active');
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

	
	
});		


new WOW().init();
