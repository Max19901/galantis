/*! parallax.js - v1.0.0 - 2014-09-07
 * http://mrudelle.github.com/parallax-scroll
 *
 * Copyright (c) 2014 Matthieu Rudelle <matthieu.rudelle@gmail.com>;
 * Licensed under the MIT license */

$(window).ready(function()
{
	$(window).resize(function()
	{
	    refresh();
	});

	$(window).bind('scroll', function()
	{
	    refresh();
	});

	function refresh() 
	{
		var sTop = $(window).scrollTop();
		var wHeight = $(window).height();
		
		$.each($(".plx-img"), function() 
		{
			$(this).css("background-position-y", (
				sTop - $(this).position().top) * (parseFloat($(this).attr('plx-speed')) || 0.1) + (parseFloat($(this).attr('plx-offset')) || 0) + "px");
		});

		$.each($(".plx-float"), function(){

			var ref = $($(this).attr('plx-ref'));

			if (ref.length) {
				var relativePos = (sTop + wHeight/2 - ref.position().top - ref.height()/2)/(wHeight/2);

				// $(this).css("top", ( ( - relativePos * Math.abs(relativePos) - relativePos + 1 ) * (wHeight/2) - $(this).height() / 2) + "px");

				$(this).css(
					{
						"top": ( ( - Math.pow(relativePos, 3) - relativePos + 1 ) * (wHeight/2) - $(this).outerHeight() / 2) + "px",
						"opacity": $(this).attr('plx-fade') ? ( 1 - Math.pow(relativePos * 1.5, 2)) : 1
					});
			} else {
				console.error("[parallax.js] Reference missing or incorrect", $(this))
			}

		});

		$.each($(".plx-curtain"), function(){

			$(this).css("top", (sTop > 0 ? -$(this).outerHeight() : 0) + "px");

		})
	}
});