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

		function headerNav() {
			// global vars
			var secondaryNav = $('.cd-secondary-nav'),
				secondaryNavTopPosition = secondaryNav.offset().top,
				taglineOffesetTop = $('header-container') + $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
				contentSections = $('.cd-section');

			// scroll function
			$(window).on('scroll', function(){
				//on desktop - assign a position fixed to logo and action button and move them outside the viewport
				( $(window).scrollTop() > taglineOffesetTop ) ? $('#cd-logo, .cd-btn').addClass('is-hidden') : $('#cd-logo, .cd-btn').removeClass('is-hidden');
				
				//on desktop - fix secondary navigation on scrolling
				if($(window).scrollTop() > secondaryNavTopPosition ) {
					//fix secondary navigation
					secondaryNav.addClass('is-fixed');
					//push the .cd-main-content giving it a top-margin
					$('.cd-main-content').addClass('has-top-margin');

					//on Firefox CSS transition/animation fails when parent element changes position attribute
					//so we to change secondary navigation childrens attributes after having changed its position value
					setTimeout(function() {
			            secondaryNav.addClass('animate-children');
			            $('#cd-logo').addClass('slide-in');
						$('.cd-btn').addClass('slide-in');
			        }, 50);

				} else {

					secondaryNav.removeClass('is-fixed');
					$('.cd-main-content').removeClass('has-top-margin');

					setTimeout(function() {
			            secondaryNav.removeClass('animate-children');
			            $('#cd-logo').removeClass('slide-in');
						$('.cd-btn').removeClass('slide-in');
			        }, 50);
				}

				//on desktop - update the active link in the secondary fixed navigation
				updateSecondaryNavigation();

				// secondary navigation
				function updateSecondaryNavigation() {
					contentSections.each(function(){
						var actual = $(this),
								actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
								actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
							if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
								actualAnchor.addClass('active');

							}else {

								actualAnchor.removeClass('active');
							}
					});
				}
				
			});

		}
		headerNav();
	});

})(jQuery);
