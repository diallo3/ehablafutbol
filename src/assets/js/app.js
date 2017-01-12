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
  	var
  		retnode = [],
  		myclass = new RegExp('\\b'+cl+'\\b'),
  		elem    = this.getElementsByTagName('*');

  	for (var i = 0; i < elem.length; i++) {
    	var classes = elem[i].className;
    	if (myclass.test(classes)) retnode.push(elem[i]);
  	}
  	return retnode;
};

window.onload = convertMailAddress;

(function($) {
	// document ready
	$(function() {

		/************************************************************

			ScrollMagic

		************************************************************/
    	// var controller = new ScrollMagic.Controller();

		/************************************************************

			Foundation

		************************************************************/
		$(document).foundation();

		/************************************************************

			Modals

		************************************************************/
		var contact = new Foundation.Reveal($('#contactModal'), {
			animationIn: 'zoomIn',
			animationOut: 'zoomOut',
			fullScreen: true,
			overlay: false
		});

		var mobile = new Foundation.Reveal($('#mobileMenu'), {
			animationIn: 'fadeInDownBig',
			animationOut: 'fadeOutUpBig',
			fullScreen: true,
			overlay: false
		});

		/************************************************************

			Navigation

		************************************************************/

		// hamburger
	    function hamburgerNav() {
	    	var $hb = $('.hamburger');
	    	$hb.on('click', function(e){
	    		e.preventDefault();
	    		$(this).toggleClass('is-active');
	    	});
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

	    // secondary header
		function secondaryNav() {
			// global vars
			var 
				target                  = $('html,body'),
				view                    = $(window),
				secondaryNav            = $('.cd-secondary-nav'),
				secondaryNavFixed       = $('.cd-secondary-nav.is-fixed'),
				secondaryNavTopPosition = secondaryNav.offset().top,
				offsetTop               = $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
				taglineOffesetTop       = $('.header-container') + offsetTop,
				contentSections 		= $('.cd-section'),
				ctas 					= $('.ctas');

			// scroll function
			view.on('scroll', function(){
				var logo    = $('#cd-logo'),
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

				if(view.scrollTop() + view.height() > ($(document).height() - 800) ) {
					ctas.removeClass('is-visible');
					$('.cd-slide-nav').removeClass('moves-out');

				}



				//on desktop - update the active link in the secondary fixed navigation
				updateSecondaryNavigation();

				// secondary navigation
				function updateSecondaryNavigation() {
					// sections
					contentSections.each(function(){
						var actual            = $(this),
							actualHeight      = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
							actualAnchor      = secondaryNav.find('a[href="#'+actual.attr('id')+'"]'),
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
			secondaryNav.find('.site-nav a').on('click', function(event){
		        event.preventDefault();
		        var target = $(this.hash);
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

	    //open sub-navigation
		$('.cd-subnav-trigger').on('click', function(event){
			
			event.preventDefault();
			$('.cd-main-nav').toggleClass('moves-out');
			$('.cd-slide-nav').toggleClass('moves-out');
		});

		
		/************************************************************

			Preload

		************************************************************/
		function preLoad() {

			// number of loaded images for preloader progress 
			var 
				loadedCount     = 0, //current number of images loaded
				imagesToLoad    = $('.bcg').length, //number of slides with .bcg container
				loadingProgress = 0; //timeline progress - starts at 0

			$('.bcg').imagesLoaded({
			    background: true
			}).progress( function( instance, image ) {
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
					.set($('#cd-intro'), {className: '+=is-loaded'})
					.to($('#preloader'), 0.7, {yPercent: 100, ease:Power4.easeInOut})
					.set($('#preloader'), {className: '+=is-hidden'})
					.from($('#intro .title'), 1, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.2')
					.from($('#intro p'), 0.7, {autoAlpha: 0, ease:Power1.easeOut}, '+=0.2')
					.from($('.scroll-hint'), 0.3, {y: -20, autoAlpha: 0, ease:Power1.easeOut}, '+=0.1');

				return preloaderOutTl;
			}
		}


		/************************************************************

			Form

		************************************************************/

		// Valiidation
		function validate() {
			var genContact = $('.general-form');

			genContact.formValidation({
				framework: 'foundation',
				row: {
		            selector: '.icon',
		            valid: 'has-success',
    				invalid: 'has-error'
		        },
				// fields
				fields: {
					fullname: {
						validators: {
							notEmpty: {
								message: 'Full name is required'
							},
							stringLength: {
								min: 5,
								max: 50,
								message: 'Name must be 5 to 50 characters'
							}
						}
					},
					email: {
						validators: {
							notEmpty: {
								message: 'Email address is required',
							},
							emailAddress: {
		                        message: 'The value is not a valid email address'
		                    },
		                    regexp: {
	                            regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
	                            message: 'The value is not a valid email address'
	                        }
						}
					},
					phone: {
						validators: {
							notEmpty: {
								message: 'Email address is required',
							},
							phone: {
								message: 'The value is not valid %s phone number'
							}
						}
					},
					feedback: {
						notEmpty: {
							message: 'Email address is required',
						}
					}
				}
			});
		}
		validate();
		

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


		/************************************************************

			Viewport

		************************************************************/

		function viewCheck() {
			var contentEntry = $('.cd-section .content'),
				bcgEntry     = $('.cd-section .bcg');

			contentEntry.viewportChecker({
			    classToAdd: 'content-visible', 
			    classToAddForFullView: 'full-visible',
			    invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
			    repeat: true,
			});

			bcgEntry.viewportChecker({
			    classToAdd: 'bcg-visible', 
			    classToAddForFullView: 'full-visible',
			    invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
			    repeat: true,
			});
		}
		viewCheck();



		/************************************************************

			Case Studies

		************************************************************/

		function caseStudies() {
			var projectsContainer = $('.cd-case-container'),
				navigation        = $('.cd-primary-nav'),
				triggerNav        = $('.cd-nav-trigger'),
				mainView          = $('.main-scene');
			
			triggerNav.on('click', function(){
				if( triggerNav.hasClass('project-open') ) {
					//close project
					projectsContainer.removeClass('project-open').find('.selected').removeClass('selected')
					.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$(this).children('.cd-case-info').scrollTop(0).removeClass('has-boxshadow');

					});
					triggerNav.add(mainView).removeClass('project-open');
				}
			});

			projectsContainer.on('click', '.single-case', function(){
				var selectedProject = $(this);
				if( projectsContainer.hasClass('nav-open') ) {
					//close navigation
					triggerNav.add(projectsContainer).add(navigation).removeClass('nav-open');
				} else {
					//open project
					selectedProject.addClass('selected');
					projectsContainer.add(triggerNav).add(mainView).addClass('project-open');

				}
			});

			projectsContainer.on('click', '.cd-scroll', function(){
				//scroll down when clicking on the .cd-scroll arrow
				var visibleProjectContent =  projectsContainer.find('.selected').children('.cd-case-info'),
					windowHeight = $(window).height();

				visibleProjectContent.animate({'scrollTop': windowHeight}, 300); 
			});

			//add/remove the .has-boxshadow to the project content while scrolling 
			var scrolling = false;
			projectsContainer.find('.cd-case-info').on('scroll', function(){
				if( !scrolling ) {
				 	(!window.requestAnimationFrame) ? setTimeout(updateProjectContent, 300) : window.requestAnimationFrame(updateProjectContent);
				 	scrolling = true;
				}
			});

			function updateProjectContent() {
				var visibleProject = projectsContainer.find('.selected').children('.cd-case-info'),
					scrollTop = visibleProject.scrollTop();
				( scrollTop > 0 ) ? visibleProject.addClass('has-boxshadow') : visibleProject.removeClass('has-boxshadow');
				scrolling = false;
			}
		}

		/************************************************************

			Page Specific

		************************************************************/

		if($('#home-page').length) {
			secondaryNav();
			preLoad();
		} else if($('#case-study-page').length) {
			caseStudies();
		}
		

	});

})(jQuery);
