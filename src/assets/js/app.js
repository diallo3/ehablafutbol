// encode emails
function convertMailAddress() {
	var emailElements;
  		if (document.getElementsByClassName)
    		emailElements = document.getElementsByClassName("email");
  		else
    		emailElements = document.getElementsByClassNameForOldies("email");
  			var elementContent, replaceContent;

  			for (var i=0; i<emailElements.length; i++) {
    			elementContent = emailElements[i].innerHTML;
    			replaceContent = elementContent.replace(" [at] ", "&#64;");
    			emailElements[i].innerHTML =
      			"<a href=\"mailto:" + replaceContent + "\">" + replaceContent + "</a>";
  			}
}

// http://javascript.about.com/library/bldom08.htm
document.getElementsByClassNameForOldies = function(cl) {
  	var retnode = [];
  	var myclass = new RegExp('\\b'+cl+'\\b');
  	var elem = this.getElementsByTagName('*');

  	for (var i = 0; i < elem.length; i++) {
    	var classes = elem[i].className;
    	if (myclass.test(classes)) retnode.push(elem[i]);
  	}
  	return retnode;
};

window.onload = convertMailAddress;

(function($) {

	$(function(){

		// Foundation init
		$(document).foundation();

		// smooth anchors
	    function smoothAnchor() {
	    	$('.ctas').on('click', '.cta', function(event) {
			    if (this.hash !== "") {
			    	// Prevent default anchor click behavior
			      	event.preventDefault();

			      	// Store hash
			      	var hash = this.hash;

			      	$('html, body').animate({
			        	scrollTop: $(hash).offset().top
			      	}, 600, function(){
			   
				        // Add hash (#) to URL when done scrolling (default click behavior)
				        window.location.hash = hash;
			      	});
			    } 
			});
	    }
	    smoothAnchor();

		// Secondary Header
		function headerNav() {
			// global vars
			var 
				target = $('html,body');
				view = $(window),
				secondaryNav = $('.cd-secondary-nav'),
				secondaryNavFixed = $('.cd-secondary-nav.is-fixed');
				secondaryNavTopPosition = secondaryNav.offset().top,
				offsetTop = $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
				taglineOffesetTop = $('.header-container') + offsetTop,
				contentSections = $('.cd-section'),
				ctas = $('.ctas');

			// scroll function
			view.on('scroll', function(){
				var logo = $('#cd-logo'),
					btnHead = $('.cd-btn-head');

				//on desktop - assign a position fixed to logo and action button and move them outside the viewport
				( view.scrollTop() > offsetTop ) ? $('#cd-logo, .cd-btn-head').addClass('hidden') : $('#cd-logo, .cd-btn-head').removeClass('hidden');
				
				//on desktop - fix secondary navigation on scrolling
				if(view.scrollTop() > secondaryNavTopPosition ) {
					//fix secondary navigation
					secondaryNav.addClass('is-fixed');
					ctas.addClass('is-visible');

					//on Firefox CSS transition/animation fails when parent element changes position attribute
					//so we to change secondary navigation childrens attributes after having changed its position value
					setTimeout(function() {
			            secondaryNav.addClass('animate-children');
			            logo.addClass('slide-in');
						btnHead.addClass('slide-in');
			        }, 50);

				} else {

					secondaryNav.removeClass('is-fixed');
					ctas.removeClass('is-visible');

					setTimeout(function() {
			            secondaryNav.removeClass('animate-children');
			            logo.removeClass('slide-in');
						btnHead.removeClass('slide-in');
			        }, 50);
				}

				if(view.scrollTop() + view.height() > ($(document).height() - 100) ) {
					ctas.removeClass('is-visible');
				}



				//on desktop - update the active link in the secondary fixed navigation
				updateSecondaryNavigation();

				// secondary navigation
				function updateSecondaryNavigation() {
					// sections
					contentSections.each(function(){
						var actual = $(this),
							actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
							actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
							actualAnchorIndex = secondaryNav.find('#intro');

						if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
							actualAnchor.addClass('active');

						} else {

							actualAnchor.removeClass('active');
						}

					});
				}
				
			});

			//on mobile - open/close secondary navigation clicking/tapping the .cd-secondary-nav-trigger
			$('.cd-secondary-nav-trigger').on('click', function(event){
				event.preventDefault();
				$(this).toggleClass('menu-is-open');
				secondaryNav.find('ul').toggleClass('is-visible');
			});

			//smooth scrolling when clicking on the secondary navigation items
			secondaryNav.find('ul a').on('click', function(event){
		        event.preventDefault();
		        var target= $(this.hash);
		        $('body,html').animate({
		        	'scrollTop': target.offset().top - secondaryNavFixed.height()
		        	}, 600
		        ); 
		        //on mobile - close secondary navigation
		        $('.cd-secondary-nav-trigger').removeClass('menu-is-open');
		        secondaryNav.find('ul').removeClass('is-visible');
		    });

		    //on mobile - open/close primary navigation clicking/tapping the menu icon
			$('.cd-primary-nav').on('click', function(event){
				if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
			});

		}
		headerNav();

		

	});

})(jQuery);
