/*=========================================
 * animatedModal.js: Version 1.0
 * author: João Pereira
 * website: http://www.joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT 
=========================================*/

(function ($) {
 
    $.fn.animatedModal = function(options) {
        var modal = $(this);
        
        //Defaults
        var settings = $.extend({
            modalTarget:'animatedModal', 
            position:'fixed', 
            width:'100%', 
            height:'100%', 
            top:'0px', 
            left:'0px', 
            zIndexIn: '9999',  
            zIndexOut: '-9999',  
            color: '#39BEB9', 
            opacityIn:'1',  
            opacityOut:'0', 
            animatedIn:'zoomIn',
            animatedOut:'zoomOut',
            animationDuration:'.6s', 
            overflow:'auto', 
            // Callbacks
            beforeOpen: function() {},           
            afterOpen: function() {}, 
            beforeClose: function() {}, 
            afterClose: function() {}
 
            

        }, options);
        
        var closeBt = $('.close-'+settings.modalTarget);

        //console.log(closeBt)

        var href = $(modal).attr('href'),
            id = $('body').find('#'+settings.modalTarget),
            idConc = '#'+id.attr('id');
            //console.log(idConc);
            // Default Classes
            id.addClass('animated');
            id.addClass(settings.modalTarget+'-off');

        //Init styles
        var initStyles = {
            'position':settings.position,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left,
            'background-color':settings.color,
            'overflow-y':settings.overflow,
            'z-index':settings.zIndexOut,
            'opacity':settings.opacityOut,
            '-webkit-animation-duration':settings.animationDuration,
            '-moz-animation-duration':settings.animationDuration,
            '-ms-animation-duration':settings.animationDuration,
            'animation-duration':settings.animationDuration
        };
        //Apply stles
        id.css(initStyles);

        modal.click(function(event) {       
            event.preventDefault();
            $('body, html').css({'overflow':'hidden'});
            if (href == idConc) {
                if (id.hasClass(settings.modalTarget+'-off')) {
                    id.removeClass(settings.animatedOut);
                    id.removeClass(settings.modalTarget+'-off');
                    id.addClass(settings.modalTarget+'-on');
                } 

                 if (id.hasClass(settings.modalTarget+'-on')) {
                    settings.beforeOpen();
                    id.css({'opacity':settings.opacityIn,'z-index':settings.zIndexIn});
                    id.addClass(settings.animatedIn);  
                    id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
                };  
            } 
        });



        closeBt.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'auto'});

            settings.beforeClose(); //beforeClose
            if (id.hasClass(settings.modalTarget+'-on')) {
                id.removeClass(settings.modalTarget+'-on');
                id.addClass(settings.modalTarget+'-off');
            } 

            if (id.hasClass(settings.modalTarget+'-off')) {
                id.removeClass(settings.animatedIn);
                id.addClass(settings.animatedOut);
                id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
            };

        });

        function afterClose () {       
            id.css({'z-index':settings.zIndexOut});
            settings.afterClose(); //afterClose
        }

        function afterOpen () {       
            settings.afterOpen(); //afterOpen
        }

    }; // End animatedModal.js

}(jQuery));



        

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

	$(function() {

		// Init ScrollMagic
    	var controller = new ScrollMagic.Controller();

		// Foundation init
		$(document).foundation();

		// hamburger
	    function hamburgerNav() {
	    	var $hb = $('.hamburger');
	    	$hb.on('click', function(e){
	    		e.preventDefault();
	    		$(this).toggleClass('is-active');
	    	})
	    }
	    hamburgerNav();

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

	    //open sub-navigation
		$('.cd-subnav-trigger').on('click', function(event){
			
			event.preventDefault();
			$('.cd-main-nav').toggleClass('moves-out');
			$('.cd-slide-nav').toggleClass('moves-out');

		});

		// Secondary Header
		function secondaryNav() {
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
					$('.cd-slide-nav').removeClass('moves-out');
					

					setTimeout(function() {
			            secondaryNav.removeClass('animate-children');
			            logo.removeClass('slide-in');
						btnHead.removeClass('slide-in');
			        }, 50);
				}

				if(view.scrollTop() + view.height() > ($(document).height() - 100) ) {
					ctas.removeClass('is-visible');
					$('.cd-slide-nav').removeClass('moves-out');

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
		secondaryNav();


		// preload
		function preLoad() {

			// number of loaded images for preloader progress 
			var loadedCount = 0; //current number of images loaded
			var imagesToLoad = $('.bcg').length; //number of slides with .bcg container
			var loadingProgress = 0; //timeline progress - starts at 0

			$('.bcg').imagesLoaded({
			    background: true
			}
			
			).progress( function( instance, image ) {
				loadProgress();
			});

			function loadProgress(imgLoad, image) {
			 	//one more image has been loaded
				loadedCount++;

				loadingProgress = (loadedCount/imagesToLoad);

				//console.log(loadingProgress);

				// GSAP timeline for our progress bar
				TweenLite.to(progressTl, 0.7, {progress:loadingProgress, ease:Linear.easeNone});

			}

			//progress animation instance. the instance's time is irrelevant, can be anything but 0 to void  immediate render
			var progressTl = new TimelineMax({paused:true,onUpdate:progressUpdate,onComplete:loadComplete});

			//tween the progress bar width
			progressTl.to($('.progress span'), 1, {width:100, ease:Linear.easeNone});

			//as the progress bar witdh updates and grows we put the precentage loaded in the screen
			function progressUpdate() {
				//the percentage loaded based on the tween's progress
				loadingProgress = Math.round(progressTl.progress() * 100);
				//we put the percentage in the screen
				$(".txt-perc").text(loadingProgress + '%');

			}

			function loadComplete() {

				// preloader out
				var preloaderOutTl = new TimelineMax();

				preloaderOutTl
					.to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
					.to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
					.set($('body'), {className: '-=is-loading'})
					.set($('#intro'), {className: '+=is-loaded'})
					.to($('#preloader'), 0.7, {yPercent: 100, ease:Power4.easeInOut})
					.set($('#preloader'), {className: '+=is-hidden'})
					.from($('#intro .title'), 1, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.2')
					.from($('#intro p'), 0.7, {autoAlpha: 0, ease:Power1.easeOut}, '+=0.2')
					.from($('.scroll-hint'), 0.3, {y: -20, autoAlpha: 0, ease:Power1.easeOut}, '+=0.1');

				return preloaderOutTl;
			}
		}
		preLoad();

		function scrollEffects() {

			// get all slides
			var slides = ["#cd-community", "#cd-connection", "#cd-experience", "#cd-engage", "#cd-summary"];

			// get all headers in slides that trigger animation
			var headers = ["#cd-community header", "#cd-connection header", "#cd-experience header", "#cd-engage header", "#cd-summary header"];

			// get all break up sections
			// var breakSections = ["#cb01", "#cb02", "#cb03"];

			// Enable ScrollMagic only for desktop, disable on touch and mobile devices
			if (!Modernizr.touch) {

				// SCENE 1
				// create scenes for each of the headers
				headers.forEach(function (header, index) {
				    
				    // number for highlighting scenes
					var num = index+1;

				    // make scene
				    var headerScene = new ScrollMagic.Scene({
				        triggerElement: header, // trigger CSS animation when header is in the middle of the viewport 
				        offset: -95 // offset triggers the animation 95 earlier then middle of the viewport, adjust to your liking
				    })
				    .setClassToggle('.slide0'+num, 'is-active') // set class to active slide
				    //.addIndicators() // add indicators (requires plugin), use for debugging
				    .addTo(controller);
				});


			    // SCENE 3 - parallax effect on each of the slides with bcg
			    // move bcg container when slide gets into the view
				slides.forEach(function (slide, index) {

					var $bcg = $(slide).find('.bcg');

					var slideParallaxScene = new ScrollMagic.Scene({
				        triggerElement: slide, 
				        triggerHook: 1,
				        duration: "100%"
				    })
				    .setTween(TweenMax.from($bcg, 1, {y: '-40%', autoAlpha: 0.3, ease:Power0.easeNone}))
				    .addTo(controller);
			    });

			    // SCENE 5 - parallax effect on the intro slide
			    // move bcg container when intro gets out of the the view

			    var introTl = new TimelineMax();

			    introTl
			    	.to($('#cd-intro-top header'), 0.2, {autoAlpha: 0, ease:Power1.easeNone})
			    	//.to($('#cd-intro-top .bcg'), 1.4, {y: '20%', ease:Power1.easeOut}, '-=0.2')
			    	.to($('#cd-intro-top'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone}, 0);

				var introScene = new ScrollMagic.Scene({
			        triggerElement: '#cd-intro-top', 
			        triggerHook: 0,
			        duration: "100%"
			    })
			    .setTween(introTl)
			    .addTo(controller);

			    // change behaviour of controller to animate scroll instead of jump
				controller.scrollTo(function (newpos) {
					TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease:Power1.easeInOut});
				});

			}
		}
		// scrollEffects();

		// Form Labels
		function floatLabels() {
			var inputFields = $('.floating-labels .cd-label').next();
			inputFields.each(function(){
				var singleInput = $(this);
				//check if user is filling one of the form fields 
				checkVal(singleInput);
				singleInput.on('change keyup', function(){
					checkVal(singleInput);	
				});
			});
		}
		floatLabels();

		function checkVal(inputField) {
			( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
		}


		$('.open-modal').animatedModal({
			animatedIn:'zoomIn',
            animatedOut:'cd-fadeOut',
            color:'#000000',
            animationDuration: .3,
                // Callbacks
                beforeOpen: function() {
                    console.log("The animation was called");
                },           
                afterOpen: function() {
                    console.log("The animation is completed");
                }, 
                beforeClose: function() {
                    console.log("The animation was called");
                }, 
                afterClose: function() {
                    console.log("The animation is completed");
                }
		});
		

	});

})(jQuery);
