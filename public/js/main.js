/* ===================================================================
 * Dazzle - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

	"use strict";

	var cfg = {		
		scrollDuration : 800, // smoothscroll duration
		mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'  // mailchimp url
	},	

	$WIN = $(window);	

   // Add the User Agent to the <html>
   // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	
	/* Preloader 
	 * -------------------------------------------------- */
	var ssPreloader = function() {

		$WIN.on('load', function() {	

			// force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');

         // will fade out the whole preloader DIV that covers the website.
	      $("#preloader").delay(500).fadeOut('slow');
	  
	  	});
	};


	/* Mobile Menu
	 * ---------------------------------------------------- */ 
	var ssMobileMenu = function() {

  		var toggleButton = $('.header-menu-toggle'),
          nav = $('#header-nav-wrap');

		toggleButton.on('click', function(event){
			event.preventDefault();

			toggleButton.toggleClass('is-clicked');
			nav.slideToggle();
		});

		if (toggleButton.is(':visible')) nav.addClass('mobile');

		$(window).resize(function() {
			if (toggleButton.is(':visible')) nav.addClass('mobile');
			else nav.removeClass('mobile');
		});

		$('#header-nav-wrap').find('a').on("click", function() {  

			if (nav.hasClass('mobile')) {   		
				toggleButton.toggleClass('is-clicked'); 
				nav.slideToggle();   		
			}     
		});

	}; 


	/* FitVids
	 * ---------------------------------------------------- */
	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	}; 



  /* Owl Carousel
	* ------------------------------------------------------ */
	var ssOwlCarousel = function() {

		$(".owl-carousel").owlCarousel({	
	      loop: true,
  			nav: false,
			autoHeight: true,
  			items: 1
		});

	};  	


  /* Highlight the current section in the navigation bar
	* ------------------------------------------------------ */
	var ssWaypoints = function() {

		var sections = $("section"),
		navigation_links = $(".header-main-nav li a");	

		sections.waypoint( {

	       handler: function(direction) {

			   var active_section;

				active_section = $('section#' + this.element.id);

				if (direction === "up") active_section = active_section.prev();

				var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');			

	         navigation_links.parent().removeClass("current");
				active_link.parent().addClass("current");

			}, 

			offset: '25%'

		});
	};


  /* Smooth Scrolling
	* ------------------------------------------------------ */
	var ssSmoothScroll = function() {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	  

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, cfg.scrollDuration, 'swing', function () {
				window.location.hash = target;
			});

	  	});

	};



  /* Placeholder Plugin Settings
	* ------------------------------------------------------ */
	var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
	};



  	/* Alert Boxes
  	------------------------------------------------------- */
  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	  	
	


  /* Animate On Scroll
  	* ------------------------------------------------------ */
	var ssAOS = function() {

		AOS.init( {
      	offset: 200,
      	duration: 600,
      	easing: 'ease-in-sine',
      	delay: 300,
			once: true,
			disable: 'mobile'
    	});

	};


  /* AjaxChimp
	* ------------------------------------------------------ */
	var ssAjaxChimp = function() {

		$('#mc-form').ajaxChimp({
			language: 'es',
		   url: cfg.mailChimpURL
		});

		// Mailchimp translation
		//
		//  Defaults:
		//	 'submit': 'Submitting...',
		//  0: 'We have sent you a confirmation email',
		//  1: 'Please enter a value',
		//  2: 'An email address must contain a single @',
		//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
		//  4: 'The username portion of the email address is invalid (the portion before the @: )',
		//  5: 'This email address looks fake or invalid. Please enter a real email address'

		$.ajaxChimp.translations.es = {
		  'submit': 'Submitting...',
		  0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
		  1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
		  2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
		} 

	};


 
  /* Back to Top
	* ------------------------------------------------------ */
	var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	

  
   /* Initialize
	* ------------------------------------------------------ */
	(function ssInit() {

		ssPreloader();
		ssMobileMenu();
		ssFitVids();
		ssOwlCarousel();
		ssWaypoints();
		ssSmoothScroll();
		ssPlaceholder();
		ssAlertBoxes();
		ssAOS();
		ssBackToTop();

		// to use the mailchimp form, uncomment the 
		// function call ssAjaxChimp() below:
		// ssAjaxChimp(); 

	})();
 

})(jQuery);

document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const cartItems = document.querySelector('.carrito-items');
    const totalPrice = document.querySelector('.carrito-precio-total');
    const items = document.querySelectorAll('.item');
    const carrito = document.querySelector('.carrito');
    const contenedor = document.querySelector('.contenedor');
    let cart = [];

    // Funciones
    const showCart = () => {
        carrito.classList.add('activo');
        contenedor.classList.add('carrito-activo');
    };

    const hideCartIfEmpty = () => {
        if (cart.length === 0) {
            carrito.classList.remove('activo');
            contenedor.classList.remove('carrito-activo');
        }
    };

    const addToCart = (item) => {
        const itemInfo = {
            id: Date.now(),
            title: item.querySelector('.titulo-item').textContent,
            price: parseFloat(item.querySelector('.precio-item').textContent.replace('$', '')),
            img: item.querySelector('.img-item').src,
            quantity: 1
        };

        const existingItem = cart.find(cartItem => cartItem.title === itemInfo.title);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(itemInfo);
        }

        updateCart();
        showCart();
    };

    const updateCart = () => {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'carrito-item';
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="carrito-item-detalles">
                    <span class="carrito-item-titulo">${item.title}</span>
                    <div class="selector-cantidad">
                        <i class="fas fa-minus restar-cantidad" data-id="${item.id}"></i>
                        <input type="text" value="${item.quantity}" class="carrito-item-cantidad" disabled>
                        <i class="fas fa-plus sumar-cantidad" data-id="${item.id}"></i>
                    </div>
                    <span class="carrito-item-precio">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="btn-eliminar" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalPrice.textContent = `$${total.toFixed(2)}`;
        saveCart();
        hideCartIfEmpty();
    };

    const removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    };

    const updateQuantity = (id, increment) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            if (increment) {
                item.quantity++;
            } else if (item.quantity > 1) {
                item.quantity--;
            }
            updateCart();
        }
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const loadCart = () => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
            if (cart.length > 0) {
                showCart();
            }
        }
    };

    // Event Listeners
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('boton-item')) {
            const item = e.target.closest('.item');
            addToCart(item);
        }

        if (e.target.classList.contains('btn-eliminar') || e.target.closest('.btn-eliminar')) {
            const id = parseInt(e.target.closest('.btn-eliminar').dataset.id);
            removeFromCart(id);
        }

        if (e.target.classList.contains('sumar-cantidad')) {
            const id = parseInt(e.target.dataset.id);
            updateQuantity(id, true);
        }

        if (e.target.classList.contains('restar-cantidad')) {
            const id = parseInt(e.target.dataset.id);
            updateQuantity(id, false);
        }
    });

    // Inicialización
    loadCart();
});