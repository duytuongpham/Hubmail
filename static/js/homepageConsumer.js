
// assume under 21 until confirmed
var legalAge=false;
var cartDebounceTrack = {};
var activeLabels = [];
var debounceTimer = 1000;
var totalInlineSubCategories = 7;
var $miniCartDelivery = $('#next-delivery__mini-cart');
var $miniCartItemsWrapper = $('#minicart-items');
var $saveCartText = $('#save-cart-text');
var $saveCartSpinner = $('#save-cart-spinner');

var setMyAccountDropDown = function() {
	$('#myaccount-container').on('click', function(e) {
		// e.preventDefault();
		e.stopPropagation();
		$('#myaccount-select').toggle();
	});
	$(document).on('click', function(e) {
		$('#myaccount-select').hide();
	})
}
setMyAccountDropDown();

var setFixed = function($headerBottom, $headerTop, isMobile) {
	$headerBottom.css({
			position: 'relative'
	});
	$headerTop.css({
		height: isMobile ? '50px' : '60px'
	});
};
var setStatic = function($headerBottom, $headerTop, isMobile) {
	$headerBottom.css({
			position: 'fixed',
			top: 0,
			width: '100vw'
	});
	$headerTop.css({
		height: isMobile ? '100px' : '140px'
	});
};
var setMenuScroll = function($menu, $menuClose, $menuNav, currentPageHeight, positionAnchor, isMobile) {
	if (currentPageHeight - positionAnchor < 0) {
		$menu.css({
			'padding-top': 0
		});
		$menuClose.css({
			top: 0
		});
		$menuNav.css({
			top: '80px'
		});
	}
	else {
		$menu.css({
			'padding-top': isMobile ? '50px' : '60px'
		});
		$menuClose.css({
			top: isMobile ? '50px' : '60px'
		});
		$menuNav.css({
			top: '140px'
		});
	}
};
var setMiniCartScroll = function($miniCartTitle, $miniCartClose, $miniCartItems, currentPageHeight, positionAnchor, isMobile) {
	if (currentPageHeight - positionAnchor < 0) {
		$miniCartTitle.css({
			'margin-top': 0
		});
		$miniCartClose.css({
			top: 0
		});
		$miniCartItems.css({
			top: '180px'
		});
	}
	else {
		$miniCartTitle.css({
			'margin-top': isMobile ? '50px' : '60px'
		});
		$miniCartClose.css({
			top: isMobile ? '50px' : '60px'
		});
		$miniCartItems.css({
			top: '240px'
		});
	}
}
var setStickyScrollWrapper = function() {
	var $window = $(window);
	var	$main = $('main');
	var	$wrapper = $($('.wrapper')[0]);
	var $headerTop = $('#header-top');
	var $headerBottom = $('#header-bottom');
	var $menu = $('#nav-menu');
	var $menuClose = $($menu.find('.menu__toggle')[0]);
	var $menuNav = $($menu.find('.menu__contents')[0]);
	var $miniCart = $('#mini-cart');
	var $miniCartTitle = $('#mini-cart__title');
	var $miniCartClose = $($miniCart.find('.mini-cart__toggle')[0]);
	var $miniCartItems = $($miniCart.find('.mini-cart__contents')[0]);
	var positionAnchor = 80;
	var lastScroll = $main.position()['top'];
	var scrollingOffset = -10; // Predicts direction so it won't jump as much on scroll
	var currentPageHeight;
	var isMobile;

  function setStickyScroll() {
		currentPageHeight = $main.position()['top'];
		scrollingOffset = lastScroll < currentPageHeight ? -10 : 10;
		isMobile = $window.width() < 600;

		if (currentPageHeight - (positionAnchor + scrollingOffset) >= 0) {
			setFixed($headerBottom, $headerTop, isMobile);
		}
		else {
			setStatic($headerBottom, $headerTop, isMobile);
		}
		setMenuScroll($menu, $menuClose, $menuNav, currentPageHeight, positionAnchor, isMobile);
		setMiniCartScroll($miniCartTitle, $miniCartClose, $miniCartItems, currentPageHeight, positionAnchor, isMobile);
		lastScroll = currentPageHeight;
	}
	setStickyScroll()
	$wrapper.scroll(setStickyScroll);
};
setStickyScrollWrapper();

var attachSubCatMoreHandler = function() {
	$('#subcat-more').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('.more-caret-right').toggle();
		$('.more-caret-down').toggle();
		$('#subcat-more-list').slideToggle('fast');
	});
	$(document).on('click', function(e) {
		$('.more-caret-right').show();
		$('.more-caret-down').hide();
		$('#subcat-more-list').hide();
	})
}

var subcatMoreHtml = function() {
	var moreHtml = '<li id="subcat-more"><a href="#"><div class="link-wrapper"><span>More <i class="fa fa-caret-right more-caret more-caret-right"></i><i class="fa fa-caret-down more-caret more-caret-down" style="display: none"></i></span></div></a></li><li id="subcat-more-list-wrapper"><ul id="subcat-more-list" style="display: none;"></ul></li>';
	return $.parseHTML(moreHtml);
};
var setMiniCartDelivery = function() {
	var cartItemIds = [];
	var currentCartItems = $miniCartItemsWrapper.find('.single-minicart-item');
	if (currentCartItems.length === 0) {
		$miniCartDelivery.text('');
		if(actualURL === contextPath+"/viewcart" && $nextDeliveryViewCart) {
			$nextDeliveryViewCart.text('');
		}
		return;
	}
	$.each(currentCartItems, function(idx, item) {
		var cartItemId = $(item).attr('id').split('-')[1];
		cartItemIds.push(cartItemId);
	});
	var zipCodeApiCall = "";
	if (typeof zipcode !== 'undefined' && zipcode != null && zipcode.length > 0)
	{
		zipCodeApiCall = "&zipCode="+zipcode;
	}
	else if (typeof defaultZipcode !== 'undefined'  && defaultZipcode != null && defaultZipcode.length > 0)
	{
		zipCodeApiCall = "&zipCode="+defaultZipcode;
	}
	else
	{
		zipCodeApiCall = "&zipCode="+'<%= session.getAttribute("GMzipcode") %>';
	}
	$.ajax({
		type: "GET",
		cache: false,
		url: baseUrl+contextPath + "/api/mobile/item/availableTime?itemIds="+cartItemIds.join(',')+"&isWestCoast=" + westCoastFlag + "&stateCity="+stateCity + zipCodeApiCall,
		data: {},
		success: function(itemDelivery) {
			if (itemDelivery.available_time && itemDelivery.available_time.length > 0) {
				var fullDeliveryDate = new Date(itemDelivery.available_time[0].date);
				fullDeliveryDate = fullDeliveryDate.toString().split(' ');
				var deliveryMonth = fullDeliveryDate[1];
				var deliveryNumericalDate = fullDeliveryDate[2][0] === "0" ? fullDeliveryDate[2][1] : fullDeliveryDate[2];
				var deliveryDayOfWeek = itemDelivery.available_time[0].day;
				$miniCartDelivery.text(deliveryDayOfWeek + ', ' + deliveryMonth + ' ' + deliveryNumericalDate);
				if(actualURL === contextPath+"/viewcart") {
					setViewCartDelivery(deliveryDayOfWeek + ', ' + deliveryMonth + ' ' + deliveryNumericalDate)
				}
			}
			else {
				$miniCartDelivery.text('');
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}
var updateCartDisplay = function(itemId, totalQuantity, VALUE, quantity, currentValue, cartCount, price, currentTotal, el) {
	// Minicart
	$($('#minicart-'+itemId+' p')[0]).html(currentValue + VALUE);
	var subtotal = parseFloat((currentValue + VALUE) * price).toFixed(2);
	$($('#minicart-'+itemId+' p')[1]).html("Subtotal: $"+subtotal);
	var newTotal = "$"+(currentTotal+(VALUE*price)).toFixed(2);
	$($('.mini-cart__total p')[0]).html(newTotal);
	if(currentValue + VALUE === 0) {
		$("#minicart-"+itemId).remove();
		$($('.minicart-count')[0]).html(cartCount - 1);
		$($('.minicart-count')[1]).html(cartCount - 1);
	}
	// Cards
	$('[data-item-id='+itemId+']').each(function(index, el){
		// $(el).attr('data-quantity', quantity - VALUE);
		$(el).attr('data-num-in-cart', currentValue + VALUE);
		$($(el).find('.current-cart-count')[0]).html(currentValue + VALUE);
		// $('#cart-quantity').html(currentValue + VALUE);
		if(currentValue + VALUE === 0){
			$(el).removeClass('-added');
		} else if (currentValue === 0){
			$(el).addClass('-added');
		}
	});

	// Cart items
	if(cartItems[itemId]){
		cartItems[itemId].cartCount += VALUE;
		// cartItems[itemId].availableQuantity -= VALUE;
	}
	// View item Page
	if(actualURL === contextPath+"/viewcart"){
		if(!cartItems[itemId]){ // added to cart
			$('.page').empty();
			popularItems[itemId].cartCount = VALUE;
			// popularItems[itemId].availableQuantity -= VALUE;
			cartItems[itemId] = popularItems[itemId];
			var cartCount = parseInt($($(".minicart-count")[0]).text(), 10);
			$(".page-header__your-cart").text("Your Cart ("+cartCount+")");
			attachCartItems();
			appendCartFooter();
		} else { //updated value
			var item = $(".item-wrapper[data-cart-itemid="+itemId+"]");
			var minOrder = cartItems[itemId].minOrder ? cartItems[itemId].minOrder : 1;
			var quantity = cartItems[itemId].availableQuantity;
			var currentCount = parseInt(item.find(".item-cart-num").text(), 10);
			var total = $('.mini-cart__total>p').text();
			if(currentCount + VALUE > 0){
				var subTotal = $($('#minicart-'+itemId+' p')[1]).html();
				item.find(".item-cart-num").text(currentCount+VALUE);
				var newSubTotal = '$'+parseFloat(price * (currentCount+VALUE)).toFixed(2);
				item.find(".item-total>span").text(newSubTotal);
			} else {
				item.remove();
				delete cartItems[itemId];
				var cartCount = parseInt($($(".minicart-count")[0]).text(), 10);
				$(".page-header__your-cart").text("Your Cart ("+cartCount+")");
			}
			$($(".cart-total-inner")[1]).text(total);
		}
	}
	setMiniCartDelivery();
};

var addCart = function(itemId, quantity){
	// console.log(itemId, quantity, "ADDING");
	var recipeIdHtml = '';
	if (typeof recipeId !== 'undefined') {
		recipeIdHtml += '?recipeId=' + recipeId;
	}
	// console.log('RECIPE HTML', recipeIdHtml);
	 $.ajax({
    	url: contextPath + "/addOrder/" + itemId + "/" + quantity + recipeIdHtml,

        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function(returnVal) {
             if(returnVal != null)
             {
            	if(returnVal.success== true)
            	{
            		//todo
            	} else {

            		alert(returnVal.message);
            	}
             }
        }
    });
};
var emptyCart = function() {
	// updateCartDisplay on all items in the cart;
	swal({
		title: "Empty Cart",
		text: "Are you sure you want to remove all the items from your cart?",
		type: "info",
		showCancelButton: true,
		closeOnConfirm: false,
		showLoaderOnConfirm: true,
		confirmButtonText: "Confirm",
		confirmButtonColor: "#1AAF5D"
	}, function() {
			$.ajax({
				url: contextPath + "/empty-cart",
				beforeSend: function(xhr) {
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(emptyCartReturn) {
					if (emptyCartReturn.success) {
						$.each($('.single-minicart-item'), function(idx, item) {
							var id = $(item).attr('id').split("-")[1];
							var el = $($("[data-item-id="+id+"]")[0]);
							allow_remove = true;
							if(el.length){
								var currentValue = parseInt(el.attr('data-num-in-cart'), 10);
								var minOrder = parseInt(el.attr('data-min-order'), 10);
								var quantity = parseInt(el.attr('data-quantity'), 10);
								var price = parseFloat(el.attr('data-item-price'));
								var salesPrice = parseFloat(el.attr('data-item-sales-price'));
								var vipPrice = parseFloat(el.attr('data-item-vip-price'));
								var nationwidePrice = parseFloat(el.attr('data-item-nation-price'));
								var nationwideSalesPrice = parseFloat(el.attr('data-item-nation-sales-price'));
								var maxOrder = parseInt(el.attr('data-max-order'));
								var quantityEnabled = el.attr('data-quantity-enabled') === "true";
							} else { // element is not on page, so item must be in cart
								var currentValue = cartItems[id].cartCount;
								var minOrder = cartItems[id].minOrder;
								var quantity = cartItems[id].availableQuantity;
								var price = cartItems[id].price;
								var salesPrice = cartItems[id].salesPrice;
								var maxOrder = cartItems[id].maxOrder;
								var vipPrice = cartItems[id].vipPrice;
								var nationwidePrice = cartItems[id].nationPrice
								var nationwideSalesPrice = cartItems[id].nationSalesPrice
								var quantityEnabled = cartItems[id].quantityEnabled;
							}

							var VALUE = -currentValue;
							// bound the add and minus operations
							if (quantityEnabled && VALUE > 0 && currentValue >= quantity) {
								swal("Max Quantity Reached", "You have added the maximum quantity available for this item");
								return;
							}
							if (maxOrder > 0 && (maxOrder !== null || maxOrder !== "null")) {
								if (currentValue >= maxOrder && VALUE > 0) {
									swal("Max Quantity Reached", "You have added the maximum quantity allowed for this item");
									return;
								}
							}
							$miniCartDelivery.text('Calculating...');
							if(!allow_remove){
								if(minOrder === currentValue && VALUE < 0){
									return;
								}
							}
							if (isVipUser) {
								if (salesPrice > 0 || vipPrice > 0) {
									if (salesPrice > 0 && vipPrice > 0) {
										price = vipPrice < salesPrice ? vipPrice : salesPrice;
									}
									else if (salesPrice > 0) {
										price = salesPrice;
									}
									else if (vipPrice > 0) {
										price = vipPrice;
									}
								}
							}
							else {
								price = salesPrice ? salesPrice : price;
							}
							if (stateCity === "US") {
								price = nationwideSalesPrice ? nationwideSalesPrice : nationwidePrice;
							}
							var cartCount = parseInt($('.header__cart-toggle b')[0].innerHTML, 10);

							var cartCount = parseInt($('.header__cart-toggle b')[0].innerHTML);

							var currentTotal = parseFloat($($('.mini-cart__total p')[0]).html().split('$')[1]);

							if(VALUE < 0 && currentValue === minOrder){
								VALUE = -minOrder;
							}

							updateCartDisplay(id, currentValue + VALUE, VALUE, quantity, currentValue, cartCount, price, currentTotal, el);
						});
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		swal.close()
	});
};
var removeCart = function(itemId, totalQuantity, VALUE, quantity, currentValue, cartCount, price, currentTotal, el){
	 $.ajax({
		url: contextPath + "/removeItem/" + itemId + "/" + totalQuantity,

        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function(returnVal) {
					if (totalQuantity <= 0) {
						updateCartDisplay(itemId, totalQuantity, VALUE, quantity, currentValue, cartCount, price, currentTotal, el);
						swal.close();
					}
        },
        error: function(err){
        	console.log('error', err);
        }
    });
};


//this function will update All necessary HTML to keep view in sync
// with data (TODO: research data-binding in JSP, these seems overly complex)
// it takes the item ID, and an integer to add or remove from cart
	var updateValues = function(id, VALUE, allow_remove){
	var el = $($("[data-item-id="+id+"]")[0]);
	allow_remove = true;


	if(el.length){
		var currentValue = parseInt(el.attr('data-num-in-cart'), 10);
		var minOrder = parseInt(el.attr('data-min-order'), 10);
		var quantity = parseInt(el.attr('data-quantity'), 10);
		var price = parseFloat(el.attr('data-item-price'));
		var salesPrice = parseFloat(el.attr('data-item-sales-price'));
		var vipPrice = parseFloat(el.attr('data-item-vip-price'));
		var nationwidePrice = parseFloat(el.attr('data-item-nation-price'));
		var nationwideSalesPrice = parseFloat(el.attr('data-item-nation-sales-price'));
		var maxOrder = parseInt(el.attr('data-max-order'));
		var quantityEnabled = el.attr('data-quantity-enabled') === "true";
	} else { // element is not on page, so item must be in cart
		var currentValue = cartItems[id].cartCount;
		var minOrder = cartItems[id].minOrder;
		var quantity = cartItems[id].availableQuantity;
		var price = cartItems[id].price;
		var salesPrice = cartItems[id].salesPrice;
		var maxOrder = cartItems[id].maxOrder;
		var vipPrice = cartItems[id].vipPrice;
		var nationwidePrice = cartItems[id].nationPrice
		var nationwideSalesPrice = cartItems[id].nationSalesPrice
		var quantityEnabled = cartItems[id].quantityEnabled;
	}

	// bound the add and minus operations
	if (quantityEnabled && VALUE > 0 && currentValue >= quantity) {
		swal("Max Quantity Reached", "You have added the maximum quantity available for this item");
		return;
	}
	if (maxOrder > 0 && (maxOrder !== null || maxOrder !== "null")) {
		if (currentValue >= maxOrder && VALUE > 0) {
			swal("Max Quantity Reached", "You have added the maximum quantity allowed for this item");
			return;
		}
	}
	$miniCartDelivery.text('Calculating...');
	if(!allow_remove){
		if(minOrder === currentValue && VALUE < 0){
			return;
		}
	}
	if (isVipUser) {
		if (salesPrice > 0 || vipPrice > 0) {
			if (salesPrice > 0 && vipPrice > 0) {
				price = vipPrice < salesPrice ? vipPrice : salesPrice;
			}
			else if (salesPrice > 0) {
				price = salesPrice;
			}
			else if (vipPrice > 0) {
				price = vipPrice;
			}
		}
	}
	else {
		price = salesPrice ? salesPrice : price;
	}
	if (stateCity === "US") {
		price = nationwideSalesPrice ? nationwideSalesPrice : nationwidePrice;
	}

	var cartCount = parseInt($('.header__cart-toggle b')[0].innerHTML, 10);

	var cartCount = parseInt($('.header__cart-toggle b')[0].innerHTML);

	var currentTotal = parseFloat($($('.mini-cart__total p')[0]).html().split('$')[1]);

	if(VALUE < 0 && currentValue === minOrder){
		VALUE = -minOrder;
	}
	if(VALUE > 0){
		updateCartDisplay(id, currentValue + VALUE, VALUE, quantity, currentValue, cartCount, price, currentTotal, el);
		clearTimeout(cartDebounceTrack[id]);
		cartDebounceTrack[id] = setTimeout(function() {
			addCart(id, currentValue + VALUE);
		}, debounceTimer);
		// facebookAddToCartConversion();
	} else {

		if (currentValue + VALUE <= 0) {
			swal({
	      title: "Remove Item",
	      text: "Are you sure you want to remove the item from your cart?",
	      type: "info",
	      showCancelButton: true,
	      closeOnConfirm: false,
				showLoaderOnConfirm: true,
	      confirmButtonText: "Confirm",
	      confirmButtonColor: "#1AAF5D"
	    }, function() {
					removeCart(id, currentValue + VALUE, VALUE, quantity, currentValue, cartCount, price, currentTotal, el);
				});
			}
		else {
			updateCartDisplay(id, currentValue + VALUE, VALUE, quantity, currentValue, cartCount, price, currentTotal, el);
			clearTimeout(cartDebounceTrack[id]);
			cartDebounceTrack[id] = setTimeout(function() {
				removeCart(id, currentValue + VALUE, VALUE, quantity, currentValue, cartCount, price, currentTotal, el);
			}, debounceTimer);
		}
	}
};

var hideEditQuantity = function($itemCard) {
	$itemCard.find('.cart-input').hide();
	$itemCard.find('.current-cart-count').show();
	$itemCard.find('.cart-quantity-status').show();
	$itemCard.find('.-minus').show();
	$itemCard.find('.-cancel').hide();
	$itemCard.find('.-plus').show();
	$itemCard.find('.-submit').hide();
};
var validateCartUpdate = function($addToCartNode, desiredQuantity) {
	var currentCount = parseInt($addToCartNode.attr('data-num-in-cart'), 10);
	var availableQuantity = parseInt($addToCartNode.attr('data-quantity'), 10);
	var quantityEnabled = $addToCartNode.attr('data-quantity-enabled') === 'true';
	var maxOrder = parseInt($addToCartNode.attr('data-max-order'), 10);
	var id = $addToCartNode.attr('data-item-id');
	if (typeof desiredQuantity === 'number') {
		if (desiredQuantity <= 0) {
			updateValues(id, -currentCount)
		}
		else if (!quantityEnabled && (desiredQuantity > 0)) {
			if (desiredQuantity > maxOrder) {
				swal('Not Enough Quantity', 'Setting quantity to maximum available', 'info');
				updateValues(id, maxOrder - currentCount);
			}
			else {
				updateValues(id, desiredQuantity - currentCount);
			}
		}
		else if (quantityEnabled) {
			var maximumAllowed = availableQuantity > maxOrder ? maxOrder : availableQuantity;
			if (desiredQuantity > maximumAllowed) {
				swal('Not Enough Quantity', 'Setting quantity to maximum available', 'info');
				updateValues(id, maximumAllowed - currentCount);
			}
			else {
				updateValues(id, desiredQuantity - currentCount)
			}
		}
	}
	else {
		swal('Invalid Quantity', 'Desired quantity must be a number', 'error');
	}
};
var hideEditQuantityMiniCart = function($singleMiniCartItem) {
	$singleMiniCartItem.find('.minicart-input').hide();
	$singleMiniCartItem.find('.-minicart-cancel').hide();
	$singleMiniCartItem.find('.-remove').show();
	$singleMiniCartItem.find('.mini-cart__single__quantity').show();
	$singleMiniCartItem.find('.-minicart-submit').hide();
	$singleMiniCartItem.find('.-add').show();
	$singleMiniCartItem.find('.mini-cart__quantity__wrapper').css('width', '70%')
	$singleMiniCartItem.find('.mini-cart__items__remove').show();
};
var validateUpdateMiniCart = function(id) {
	var currentCount = cartItems[id].cartCount;
	var availableQuantity = cartItems[id].availableQuantity;
	var quantityEnabled = cartItems[id].quantityEnabled;
	var maxOrder = cartItems[id].maxOrder;
	var desiredQuantity = parseInt($($('#minicart-'+id).find('.minicart-input')).val(), 10);
	if (typeof desiredQuantity === 'number') {
		if (desiredQuantity <= 0) {
			updateValues(id, -currentCount)
		}
		else if (!quantityEnabled && (desiredQuantity > 0)) {
			updateValues(id, desiredQuantity - currentCount);
		}
		else if (quantityEnabled && (desiredQuantity > availableQuantity)) {
			swal('Not Enough Quantity', 'Setting quantity to maximum available', 'info');
			updateValues(id, availableQuanity - currentCount);
		}
		else if (quantityEnabled && (desiredQuantity < availableQuantity)) {
			updateValues(id, desiredQuantity - currentCount);
		}
	}
	else {
		swal('Invalid Quantity', 'Desired quantity must be a number', 'error');
	}
};
var setScrollPosition = function() {
	setTimeout(function(){
		// at this point all item HTML should be rendered in the DOM
		// so scroll to previous item if it exists and we are on homepage
		if(localStorage.gmScrollPosition && isHomepage) {
				$(".wrapper").scrollTop(localStorage.getItem("gmScrollPosition"));
				localStorage.removeItem("gmScrollPosition");
			}
	}, 1);
}
var saveAllCartItems = function(e) {
	e.preventDefault();
	e.stopPropagation();
	$saveCartText.hide();
	$saveCartSpinner.show();
	var currentCart = {};
	var currentCartItems = $miniCartItemsWrapper.find('.single-minicart-item');
	if (currentCartItems.length === 0) {
		return;
	}
	$.each(currentCartItems, function(idx, item) {
		var $item = $(item);
		var cartItemId = $item.attr('id').split('-')[1];
		var itemQuantity = parseInt($item.find(".mini-cart__single__quantity").text(), 10);
		if (!currentCart.hasOwnProperty(cartItemId) && itemQuantity > 0) {
			currentCart[cartItemId] = itemQuantity;
		}
	});
	if (Object.keys(currentCart).length > 0) {
		var itemString = "?items=";
		for (var itemId in currentCart) {
			itemString += itemId + '_' + currentCart[itemId] + ',';
		}
		itemString = itemString.slice(0, itemString.length-1);
		// window.location = baseUrl+contextPath+'/saveCart'+itemString;

		$.ajax({
			url: baseUrl+contextPath+'/saveCart'+itemString,
			data: {},
			success: function(response) {

				$saveCartText.show();
				$saveCartSpinner.hide();
				swal({title: 'Your cart has been saved',type: 'success'});
			},
			error: function(err) {
				console.log(err);
				$saveCartText.show();
				$saveCartSpinner.hide();
			}
		})
	}
};
var callAdroll = function(itemId) {
	if (typeof __adroll !== "undefined") {
		__adroll.record_user({product_id: itemId, product_action: "AddToCart"});
	}
};
var callCleverTapItemAdd = function(itemId, itemName, itemPrice, itemSalesPrice) {
	if (typeof clevertap !== "undefined") {
		clevertap.event.push("Add to Cart", {
		  "Product Name":itemName,
		  "price":itemPrice,
			"salesPrice": itemSalesPrice,
			"Product ID": itemId,
		  "Currency":"USD"
		});
	}
};
var attachEventHandlers = function(){
	$(".-item-card.-plus, .-item-card.-add, add-to-cart").off().on('click', function(e){
		var $this = $(this)
		var id = $this.parent().attr('data-item-id');
		var quantity = parseInt($this.parent().attr('data-quantity'), 10);
		var quantityEnabled = $this.parent().attr('data-quantity-enabled') === "true";
		var minOrder = parseInt($this.parent().attr('data-min-order'), 10);
		var currentValue = parseInt($this.parent().attr('data-num-in-cart'), 10);
		var cartCount = parseInt($('.header__cart-toggle b')[0].innerHTML, 10);
		var itemName = $this.parent().attr('data-item-name');
		var itemPrice = parseFloat($this.parent().attr('data-item-price'));
		var itemSalesPrice = parseFloat($this.parent().attr('data-item-sales-price'));

		callAdroll(id);
		callCleverTapItemAdd(id, itemName, itemPrice, itemSalesPrice);

		var createMiniCartItem = function(){
			var $this = $(this);
			var name = $this.parent().attr('data-item-name');
			var thumb = $this.parent().attr('data-item-thumb');
			var link = baseUrl+contextPath+'/'+$this.parent().attr('data-item-link');
			var price = $this.parent().attr('data-item-price');
			var salesPrice = $this.parent().attr('data-item-sales-price');
			var specialPrice = $this.parent().attr('data-item-special-price');
			var specialPriceEndDate = $this.parent().attr('data-item-special-price-end-date');
			var vipPrice = $this.parent().attr('data-item-vip-price');
			var nationwidePrice = $this.parent().attr('data-item-nation-price');
			var nationwideSalesPrice = $this.parent().attr('data-item-nation-sales-price');
			$($('.minicart-count')[0]).html(cartCount + 1);
			$($('.minicart-count')[1]).html(cartCount + 1);
			var miniCartHTML = buildItemHTML(name, id, thumb, link, price, salesPrice, specialPrice, specialPriceEndDate, vipPrice, nationwidePrice, nationwideSalesPrice);
			$('#minicart-items').append(miniCartHTML);

			// attach new minicart event handlers
			$('.mini-cart__items__remove').off().on('click', function(e){
				var id = $(this).closest('.single-minicart-item').attr('id').split('-')[1];
				var val = parseInt($($(this).closest('.single-minicart-item').find('.mini-cart__single__quantity')[0]).html(), 10);
				updateValues(id, -val, true);
			});

			$('.mini-cart__items__adjust.-add').off().on('click', function(e){
				var id = $(this).closest('.single-minicart-item').attr('id').split('-')[1];
				updateValues(id, 1);
			});

			$('.mini-cart__items__adjust.-remove').off().on('click', function(e){
				var id = $(this).closest('.single-minicart-item').attr('id').split('-')[1];
				updateValues(id, -1);
			});
			$('.mini-cart__single__quantity').off().on('click', function() {
				var $this = $(this);
				var $singleMiniCartItem = $this.closest('.single-minicart-item');
				var id = $singleMiniCartItem.attr('id').split('-')[1];
				var $input = $singleMiniCartItem.find('.minicart-input');
				// var $itemCard =
				var el = $($("[data-item-id="+id+"]")[0]);
				var cartCount = el.length ? el.attr('data-num-in-cart') : cartItems[id].cartCount;
				$this.hide();
				$input.show();
				$input.focus();
				$input.val('');
				$input.val(cartCount);
				$singleMiniCartItem.find('.mini-cart__items__remove').hide();
				$singleMiniCartItem.find('.-remove').hide();
				$singleMiniCartItem.find('.-minicart-cancel').show();
				$singleMiniCartItem.find('.-add').hide();
				$singleMiniCartItem.find('.-minicart-submit').show();
				$singleMiniCartItem.find('.mini-cart__quantity__wrapper').animate({width: '100%'}, 300);

				return false;
			});
			$('.minicart-input').on('keyup', function(e) {
				var $this = $(this);
				var $singleMiniCartItem = $this.closest('.single-minicart-item');
				var id = $singleMiniCartItem.attr('id').split('-')[1];
				var el = $($("[data-item-id="+id+"]")[0]);
				var itemCardOnPage = el.length > 0;
				if (e.keyCode === 13) {
					if (itemCardOnPage) {
						var $itemCard = $(el.closest('.cards__item'));
						var desiredQuantity = parseInt($singleMiniCartItem.find('.minicart-input').val(), 10);
						validateCartUpdate(el, desiredQuantity);
					}
					else {
						validateUpdateMiniCart(id);
					}
					hideEditQuantityMiniCart($singleMiniCartItem);
				}
				if (e.keyCode === 27) {
					hideEditQuantityMiniCart($singleMiniCartItem);
				}
			});
			$('.-minicart-submit').on('click', function() {
				var $this = $(this);
				var $singleMiniCartItem = $this.closest('.single-minicart-item');
				var id = $singleMiniCartItem.attr('id').split('-')[1];
				var el = $($("[data-item-id="+id+"]")[0]);
				var itemCardOnPage = el.length > 0;
				if (itemCardOnPage) {
					var desiredQuantity = parseInt($singleMiniCartItem.find('.minicart-input').val(), 10);
					validateCartUpdate(el, desiredQuantity);
				}
				else {
					validateUpdateMiniCart(id);
				}
				hideEditQuantityMiniCart($singleMiniCartItem);
			});
			$('.-minicart-cancel').on('click', function() {
				var $this = $(this);
				var $singleMiniCartItem = $this.closest('.single-minicart-item');
				hideEditQuantityMiniCart($singleMiniCartItem);
			});
		}.bind(this);

		// definitely enough for purchase
		if((quantity - minOrder) >= 0 || !quantityEnabled) {
			if(currentValue === 0) {
				createMiniCartItem();
				updateValues(id, minOrder);
			} else {
				updateValues(id, 1);
			}
		// can only buy last items if you already have the minOrder
		} else if((currentValue >= minOrder && quantity > 0) || !quantityEnabled) {
			updateValues(id, 1);
		// can't buy item
		} else {
			return;
		}
	});

	// remove from cart
	$('.-item-card.-minus').off().on('click', function(e){
		var id = $(this).parent().attr('data-item-id');
		updateValues(id, -1, true);
	});

	$('.cart-quantity-wrapper').off().on('click', function() {
		var $this = $(this);
		var $input = $this.find('.cart-input');
		var $itemCard = $this.closest('.add-to-cart');
		var tempStr;
		$this.find('.current-cart-count').hide();
		$this.find('.cart-quantity-status').hide();
		$input.show();
		$input.focus();
		$input.val('');
		$input.val($itemCard.attr('data-num-in-cart'));
		$itemCard.find('.-minus').hide();
		$itemCard.find('.-cancel').show();
		$itemCard.find('.-plus').hide();
		$itemCard.find('.-submit').show();

		return false;
	});
	$('.cart-input').off().on('keyup', function(e) {
		var $itemCard = $(this).closest('.add-to-cart');
		if (e.keyCode === 13) {
			var el = $($itemCard);
			var desiredQuantity = parseInt($($itemCard.find('.cart-input')).val(), 10);
			validateCartUpdate(el, desiredQuantity);
			hideEditQuantity($itemCard);
		}
		if (e.keyCode === 27) {
			hideEditQuantity($itemCard);
		}
		return false;
	});
	$('.-submit').off().on('click', function() {
		var $itemCard = $(this).closest('.add-to-cart');
		var el = $($itemCard);
		var desiredQuantity = parseInt($($itemCard.find('.cart-input')).val(), 10);
		validateCartUpdate(el, desiredQuantity);
		hideEditQuantity($itemCard);
		return false;
	});
	$('.-cancel').off().on('click', function() {
		var $itemCard = $(this).closest('.add-to-cart');
		hideEditQuantity($itemCard);
		return false;
	});

	$("button.cards__favorite").click(function(e){

		if(loggedIn != true){
			$('#signin-modal').popup('show');
			return;
		}

		var $el = $(this);
		var id = $el.attr('data-item-favid');
		var itemName = $el.attr('data-item-name');
		var storeName = $el.attr('data-item-storename');

		mixpanel.track("Added Item to Favorites", {
			"Item Name": itemName,
			"Store": storeName
		});

		$.ajax({
			  url: contextPath+"/favorite/item/" + id,
			  beforeSend: function(xhr) {
				  xhr.setRequestHeader("Accept", "application/json");
				  xhr.setRequestHeader("Content-Type", "application/json");
			   },
			   success: function(returnVal) {
				   if(returnVal.favoriteId === 0){
					 var index = favorites.indexOf(id);
					 favorites.splice(index, 1);
					 $el.removeClass('-favorited');
				   }
				   else if (returnVal.favoriteId > 0){
					 favorites.push(id);
					 $el.addClass('-favorited');
				   }
			  }
		});
	});

	// $('.cards__favorite').hide();
	// $('.-favorited').show();
	// $('.cards__item').mouseenter(
	// 	function() {
	// 		var favButton = $(this).find('.cards__favorite');
	// 		if (!favButton.hasClass('-favorited')) {
	// 			favButton.show();
	// 		}
	// 	}
	// );
	// $('.cards__item').mouseleave(
	// 	function() {
	// 		var favButton = $(this).find('.cards__favorite');
	// 		if (!favButton.hasClass('-favorited')) {
	// 			favButton.hide();
	// 		}
	// 	}
	// );

	$(".cards__edit").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		var id = $(this).attr("data-item-editid");
		location.href = contextPath+"/initEditItem/"+id;
	});
	$(".cards__list").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		var id = $(this).attr("data-item-editid");
		var self = this;

		$.ajax({
		  type: "GET",
		  url: contextPath+"/listStoreItem/"+id,
		  cache: false,
		  beforeSend: function(xhr) {
			  xhr.setRequestHeader("Accept", "application/json");
			  xhr.setRequestHeader("Content-Type", "application/json");
		   },
		  data: {},
		  success:function(data){
			  if(data.message != undefined && data.message != null && data.message != ""){
				  showMessage(data.message);
			  } else {
				  $(self).parent().find("button.cards__list").hide();
				  $(self).parent().find("button.cards__delete").hide();
				  $(self).parent().find("button.cards__unlist").show();
				  $(self).parent().find('.unlisted-item').remove();
			  }
		  }
		});
	});
	$(".cards__unlist").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		var id = $(this).attr("data-item-editid");
		var self = this;

		$.ajax({
		  type: "GET",
		  url: contextPath+"/unlistStoreItem/"+id,
		  cache: false,
		  beforeSend: function(xhr) {
			  xhr.setRequestHeader("Accept", "application/json");
			  xhr.setRequestHeader("Content-Type", "application/json");
		   },
		  data: {},
		  success:function(data){
			  if(data.message != undefined && data.message != null && data.message != ""){
				  showMessage(data.message);
			  } else {
				  $(self).parent().find("button.cards__list").show();
				  $(self).parent().find("button.cards__delete").show();
				  $(self).parent().find("button.cards__unlist").hide();
				  var unlisted = $.parseHTML("<div class='unlisted-item'>UNLISTED</div>");
				  $(self).parent().append(unlisted);
			  }
		  }
		});
	});
	// $('#save-cart, #save-cart-page').on('click', saveAllCartItems);
	$('#empty-cart').on('click', emptyCart);
};

var categoryIdMap = {
	"new": "H",
	"topselling": "T",
	"organic": 0,
	"produce": 7,
	"dairyandeggs": 20,
	"dairyproduct": 20,
	"meatandfish": 18,
	"bakery": 1,
	"snacks": 14,
	"drinks": 2,
	"pantry": 4,
	"preparedfoods": 22,
	"artisan": 21,
	"homegoods": 23,
	"healthandbeauty": 24,
	"babyandkids": 25,
	"petfood": 26,
	"other" : 15
};

var catNameMap = {
	"grubbox": "GrubBox",
	"topselling": "All",
	"new": "New",
	"organic": "Organic",
	"produce": "Produce",
	"dairyandeggs": "Dairy & Eggs",
	"meatandfish": "Meat & Fish",
	"bakery": "Bakery",
	"snacks": "Snacks",
  "drinks": "Drinks",
  "pantry": "Pantry",
  "preparedfoods": "Prepared Foods",
  "artisan": "Artisan",
  "homegoods": "Home Goods",
	"healthandbeauty": "Health & Beauty",
	"babyandkids": "Baby & Kids",
	"petfood": "Pets",
	"pets": "Pets",
	"dairyproduct": "Dairy Product",
  "other": "Other"
};

var attachMobileSubcatSelect = function(subcats){

	if(category === "topselling" || category === "new" || category === "organic"){
		subcatsMeta = subcats.map(function(item){
			if(item[0] === 'All'){
				return ['All', 'All', []];
			}
			return [catNameMap[item[0]], catNameMap[item[0]]];
		});
	} else {
		subcats.unshift(['All', 'All', []]);
	}

	$.each(subcats, function(index, subcat){
		var shortname = subcat[0].split(' ').join('');
		var name = subcat[0];
		if(category === "topselling" || category === "new" || category === "organic"){
			name = subcatsMeta[index][0];
		}
		var html = "<option id='subcat-"+shortname+"' value='"+contextPath+"/home?category="+category+"&subcategory="+subcat[1]+"'>"+name+"</option>"
		$("#subcategoryselect").append($.parseHTML(html));
	});
};

var updateSelectTitles = function(cat, subcat){
	$("#cat-dropdown-label").html(catNameMap[cat]);
	$("#subcat-dropdown-label").html(subcat);

	$('option#cat-'+cat).prop('selected', true);
	if(subcat){
		var shortname = subcat.split(' ').join('').split('&').join('and').toLowerCase();
		setTimeout(function(){
			$('option#subcat-'+shortname).prop('selected', true);
		}, 1);
	}
};

var generateWhatsNew = function(){
	var newItems = [];
	var html =
		"<div id='whatsnew-container' class='cards -elementquery-active whatsnew' data-module='elementquery' data-minwidth='400 600 800 1000 1200 1400 1600' style='display: none;'>"+
			"<a class='home__category-header whatsnew' href='#'>"+
			    "<h3>What's New</h3>"+
			 "</a>"+
			 "<ul id='meta-whatsnew' class='item-card-container'></ul>"+
		"</div>";

	$(".pad").append($.parseHTML(html));
	
	var itemCount = (category === 'produce' ? 8 : 4);
	var params = {
		count: itemCount,
		categoryId: categoryIdMap[category],
		stateCity: stateCity,
		sortType: "desc",
		isWestCoast: westCoastFlag,
		sortBy: "updatedDate",
		offset: 0,
		recent: "true"
   	};

	var getItems = function(params){
		$.ajax({
    		type: "GET",
    	  	cache: false,
	    	  	url: contextPath + "/api/item/homepageOffset",
    	  	data: params,
    	  	success:function(data){
    			if(data.length){
    				for(var i = 0; i < data.length-1; i++){
   						var html = itemCard(data[i]);
							newItems.push(html)
    				}
						$("#meta-whatsnew").append(newItems);
    			} else {
    				var html = "<div style='text-align: center; color: gray; padding: 30px;'>Oops! Looks like there aren't any products here for now.<br>Try choosing another category.</div>";
    				$('.cards').append($.parseHTML(html));
    				$('.whatsnew').find('h3').html("")
    			}

					$('#whatsnew-container').show();
    			attachEventHandlers();
    	  	},
    	  	error: function(err){
    	  		console.log('error', err);
    	  	}
    	});
	};

	getItems(params);
};

var generateFeatured = function(){
	var featuredItems = [];
	var itemCount = 4;
	if (category === 'produce') {
		itemCount = 16;
	}
	if (category === 'meatandfish' || category === 'dairyandeggs') {
		itemCount = 12;
	}
	if (category === 'snacks' || category === 'drinks' ) {
		itemCount = 8;
	}
	var html =
		"<div id='featureditems-container' class='cards -elementquery-active featured' data-module='elementquery' data-minwidth='400 600 800 1000 1200 1400 1600' style='display: none;'>"+
			"<a class='home__category-header featured' href='#'>"+
			    "<h3>Trending</h3>"+
			 "</a>"+
			 "<ul id='meta-featured' class='item-card-container'></ul>"+
		"</div>";

	$(".pad").append($.parseHTML(html));

	var params = {
		count: itemCount,
		categoryId: categoryIdMap[category],
		stateCity: stateCity,
		sortType: "desc",
		isWestCoast: westCoastFlag,
		sortBy: "rank",
		offset: 0,
		topSeller: "true"
   	};

	var getItems = function(params){
		$.ajax({
    		type: "GET",
    	  	cache: false,
	    	  	url: contextPath + "/api/item/homepageOffset",
    	  	data: params,
    	  	success:function(data){
    			if(data.length){
    				for(var i = 0; i < data.length-1; i++){
   						var html = itemCard(data[i]);
							featuredItems.push(html)
    				}
						$("#meta-featured").append(featuredItems);
    			} else {
    				var html = "<div style='text-align: center; color: gray; padding: 30px;'>Oops! Looks like there aren't any products here for now.<br>Try choosing another category.</div>";
    				$('.cards').append($.parseHTML(html));
    				$('.whatsnew').find('h3').html("")
    			}

					$('#featureditems-container').show()
    			attachEventHandlers();
    	  	},
    	  	error: function(err){
    	  		console.log('error', err);
    	  	}
    	});
	};

	getItems(params);
};

var generateGrubBoxHTML = function(){
	$('#subcat-list').hide();
	$.ajax({
		type: "GET",
	  	cache: false,
	  	url: contextPath + "/api/grubbox/list",
	  	data: {"region": stateCity, "isWestCoast":westCoastFlag},
	  	success:function(data){
				// console.log(data);
	  		if(data.result && data.result.length){
		  		$.each(data.result, function(index, gb){
		  			var item = {};
						var tempPrice = gb.grubBoxPrice;
						tempPrice = tempPrice.split("- ");
						if (tempPrice.length > 1) {
							tempPrice = tempPrice.join(" - ");
						}
						else {
							tempPrice = tempPrice[0];
						}
		  			item.name = gb.name;
		  			item.shortName = "grubbox";
		  			item.itemUrl = gb.grub_box_url;
		  			item.itemImage = gb.image_path;
		  			item.price = 0;
		  			/*if(gb["size "].length > 1) {
		  				item.grubBoxPrice = "$"+parseFloat(gb["size "][0].price).toFixed(2) + '-' +
		  										parseFloat(gb["size "][gb["size "].length-1].price).toFixed(2);
		  			} else if (gb["size "].length === 1){
		  				item.grubBoxPrice = "$"+parseFloat(gb["size "][0].price).toFixed(2);
		  			} else { // should never get here on production
		  				item.grubBoxPrice = "$0.00";
		  			}*/

		  			item.pctOff = gb.pctOff;
		  			item.grubBoxPrice = tempPrice;

		  			var html = $.parseHTML(itemCard(item));
						$('#product-list').append(html);
		  		});
		  		$('.cards').attr("data-minwidth", "400 600 800 1000");
		  		$('#loading').hide();
		  		$('#category-display').show();
	  		} else {
	  			var html = "<div style='text-align: center; color: gray; padding: 30px;'>Oops! Looks like there aren't any products here for now.<br>Try choosing another category.</div>";
					$('.cards').append($.parseHTML(html));
					$('.cards').attr("data-minwidth", "400 600 800 1000");
					$('#loading').hide();
					$('#category-display').show();
	  		}
	  	}
	});
};

var wholesale = false;
var wholesaleParam = "";

if (this.location.toString().indexOf("wholesale=true") > -1) {
	wholesale = true;
	wholesaleParam = "wholesale=true&";
}

var generateMetaHTML = function(organic){
	
	var categories;
	var office = false;
	
	if (wholesale == true) {
		categories = ["produce", "dairyandeggs", "pantry", "other"];
	} else {
		categories = ["produce", "dairyandeggs", "meatandfish", "snacks", "preparedfoods",
            "drinks", "pantry", "bakery", "homegoods",	"healthandbeauty", "babyandkids", "petfood", "other"];
	}
	
	if (wholesale) {
		generateItemsPerCategoryHtml(wholesale);
	} else {
		updateSelectTitles(category, catNameMap[subcategory]);
		if(subcategory === 'All'){
			var nationWideExcludes = ["dairyandeggs", "meatandfish", "bakery", "preparedfoods"];
			var westCoastExcludes = ["dairyandeggs", "meatandfish"];
			$.each(categories, function(index, cat){
				if(stateCity === 'US' && nationWideExcludes.indexOf(cat) != -1){
					return;
				}
				if (westCoastFlag && westCoastExcludes.indexOf(cat) != -1){
					return;
				}
				if (organic || category === "vegan" || category === "nongmo" || category === "glutenfree" || category === "paleo" || category === "cholesterolfree" || category === "notransfat") {
					var viewMoreLink = "<a class='home__category-header "+cat+"' href='"+contextPath+"/home?category="+category+"&subcategory="+cat+"'>";
				}
				else {
					var viewMoreLink = "<a class='home__category-header "+cat+"' href='"+contextPath+"/home?category="+cat+"'>";
	
				}
				var html =
					"<div style='display: none;' class='cards -elementquery-active "+cat+"' data-module='elementquery' data-minwidth='400 600 800 1000 1200 1400 1600'>"+
							viewMoreLink+
						    "<h3>"+catNameMap[cat]+"</h3>"+
						    "<span>"+
						      "View More"+
						    "</span>"+
						 "</a>"+
						 "<ul id='meta-"+cat+"' class='item-card-container'></ul>"+
					"</div>";
	
				$(".pad").append($.parseHTML(html));
			});
		}
	
		var generateSubcatHTML = function(name, id){
			var selected = subcategory === id ? "-selected" : "";
	
			if(subcategory === "All" && name === "All"){
				selected = "-selected";
			}
	
			name = catNameMap[name] ? catNameMap[name] : "All";
	
			var nationWideExcludes = ["dairyandeggs", "meatandfish", "bakery", "preparedfoods"];
			var westCoastExcludes = ["dairyandeggs", "meatandfish"];
	
			var shortName = name.split(' ').join("").split('&').join("and").toLowerCase();
			if(nationWideExcludes.indexOf(shortName) != -1 && stateCity === 'US'){
				return "";
			}
			if (westCoastFlag && westCoastExcludes.indexOf(shortName) != -1){
				return "";
			}
			return ( "<li>"+
				        "<a href='"+contextPath+"/home?category="+category+"&subcategory="+id+"'>"+
				          	"<div class='link-wrapper "+selected+"'>"+
					        	"<span>"+
					            	name+
					            "</span>"+
					        "</div>"+
				        "</a>"+
				     "</li>" );
		};
	
		var subcats = categories;
		if(stateCity === 'US'){
			subcats = $(categories).not(["dairyandeggs", "meatandfish", "bakery"]).get();
		}
	
		subcats.unshift('All');
		var maxSubCategories = subcats.length;
		$.each(subcats, function(index, item){
			var html = $.parseHTML(generateSubcatHTML(item, item));
			if (index === totalInlineSubCategories && maxSubCategories > index) {
				$("#subcat-list").append(html);
				$("#subcat-list").append(subcatMoreHtml());
			}
			else if (index > totalInlineSubCategories) {
				$("#subcat-more-list").append(html);
			}
			else {
				$("#subcat-list").append(html);
			}
		});
	
		subcats = categories.map(function(item){
			return [item, item];
		});
	
		attachMobileSubcatSelect(subcats);
	
		if(subcategory === "All"){
			// get 4 most popular items for each category
			var getItems = function(params){
				$.ajax({
		    		type: "GET",
		    	  	cache: false,
		    	  	url: contextPath + "/api/item/newhomepage",
		    	  	data: params,
		    	  	success:function(data){
			    			if(typeof data.message !== 'undefined' || data.message !== 'ZERO_RECORDS'){
			    				var activeHeaders = [];
			    				$(data).each(function(){
			    					var selector = this.categoryName.split(" ").join("").replace("&", "and").toLowerCase();
			    					selector = selector === "beverages" ? "drinks" : selector;
			    					selector = selector === "prepairedmeals" ? "preparedfoods" : selector;
			    					for(var i = 0; i < this.items.length; i++){
			    						var html = $.parseHTML(itemCard(this.items[i]));
			    						$('#meta-'+selector).append(html);
			    						activeHeaders.push(selector);
			    					}
			    				});
			    			} else {
			    				var html = "<div style='text-align: center; color: gray; padding: 30px;'>Oops! Looks like there aren't any products here for now.<br>Try choosing another category.</div>";
			    				$('.cards').append($.parseHTML(html));
			    				$('.whatsnew').find('h3').html("");
			    			}
	
								filterLabelToBottom(moveToBottom);
								filterLabelToBottom(othersList);
								
								filterUnique(activeLabels).forEach(function(singleLabelNode, idx) {
									$(singleLabelNode).show();
								});
								filterUnique(activeHeaders).forEach(function(hdr, idx) {
			    				$(".cards.-elementquery-active."+hdr).show();
			    			});
								$('#loading').hide();
								setTopLabelPadding();
			    			attachEventHandlers();
								setScrollPosition();
		    	  	},
		    	  	error: function(err){
		    	  		console.log('error', err);
		    	  	}
			});
			};
	
		   	var params = {
					categoryId: (category === "topselling" ||
								 category === "organic" ||
								 category === "new" ? undefined : categoryIdMap[category]),
					subCategoryId: subcategory != "All" ? parseInt(subcategory) : undefined,
					stateCity: stateCity,
					sortType: "desc",
					sortBy: "updatedDate",
					offset: offset,
					isWestCoast: westCoastFlag,
					organic: (category === "organic" || organic === true ? "true" : undefined),
					topSeller: (category === "topselling" ? "true" : "false"),
					recent: (category === "new" || subcategory === "new" ? "true" : undefined),
					tagId: ((category === "vegan" || category === "glutenfree" || category === "nongmo" || category === "paleo" || category === "cholesterolfree" || category === "notransfat") ? category : undefined)
		   	};
	
		   	if(subcategory === "All"){
		   		params.subCategoryId = undefined;
		   	}
	
		   	getItems(params);
		} else { // new or organic
			var getItems = function(params){
				$.ajax({
		    		type: "GET",
		    	  	cache: false,
		    	  	url: contextPath + "/api/item/homepageOffset",
		    	  	data: params,
		    	  	success:function(itemData){
			    			if(typeof itemData.message !== 'undefined' || itemData.message !== 'ZERO_RECORDS'){
									var $itemListNode = $("#product-list");
									$itemListNode.addClass('item-card-container');
									var cardsNoCategories = [];
									if(itemData.length && itemData.message !== 'ZERO_RECORDS'){
										var subCategoryLabelList = sortSubCategoriesAndLabels(itemData);
										var subCategoryHtml = createSubcategoryLabelsForDom(subCategoryLabelList);
										$itemListNode.append(subCategoryHtml);
										for(var i = 0; i < itemData.length-1; i++){
											var html = itemCard(itemData[i]);
											if (itemData[i].subCategoryId !== undefined && itemData[i].subCategoryId !== null && itemData[i].subCategoryId > 0) {
												var $subCategoryNode = $('#subcat-'+itemData[i].subCategoryId);
												var doesContainLabels = $('#subcat-'+itemData[i].subCategoryId+' .shelf-label-header').length > 0;
												if (itemData[i].categoryName === "Wholesale") {
													$subCategoryNode = $('#subcat-bulk-sales');
												}
												attachCards($.parseHTML(html), itemData[i], $subCategoryNode, doesContainLabels);
											}
											else {
												cardsNoCategories.push(html);
											}
										}
										$itemListNode.append(cardsNoCategories);
				    			} else {
				    				var html = "<div style='text-align: center; color: gray; padding: 30px;'>Oops! Looks like there aren't any products here for now.<br>Try choosing another category.</div>";
				    				$('.cards').append($.parseHTML(html));
				    				$('.whatsnew').find('h3').html("")
				    			}
								}
	
								filterLabelToBottom(moveToBottom);
								filterLabelToBottom(othersList);
			    			$("#category-display").show();
								$('.subcateogry-container__unique').show();
								filterUnique(activeLabels).forEach(function(singleLabelNode, idx) {
									$(singleLabelNode).show();
								});
								$('#loading').hide();
								setTopLabelPadding();
								$(window).trigger('GM-relayout');
			    			attachEventHandlers();
								setScrollPosition();
		    	  	},
		    	  	error: function(err){
		    	  		console.log('error', err);
		    	  	}
		    	});
			};
	
		   	var params = {
					categoryId: categoryIdMap[subcategory],
					stateCity: stateCity,
					sortType: "desc",
					sortBy: "updatedDate",
					offset: offset,
					isWestCoast: westCoastFlag,
					organic: (category === "organic" ? "true" : undefined),
					topSeller: (category === "topselling" ? "true" : undefined),
					recent: (category === "new" ? "true" : undefined),
					tagId: ((category === "vegan" || category === "glutenfree" || category === "nongmo" || category === "paleo" || category === "cholesterolfree" || category === "notransfat") ? category : undefined)
		   	};
	
		   	getItems(params);
		}
	
		attachSubCatMoreHandler();
	}
};

// this is called when a user is on the 'All' subcategory
var generateMetaSubcatHTML = function(){
	if (wholesale == false) {
		generateFeatured();
		generateWhatsNew();
	}
	generateItemsPerCategoryHtml();
}

var generateItemsPerCategoryHtml = function(wholesalehomepage){
	var getItems;
	if (wholesalehomepage) {
		getItems = function(params){
			$.ajax({
	    		type: "GET",
	    	  	cache: false,
	    	  	url: contextPath + "/api/item/wholesalehomepage",
	    	  	data: params,
	    	  	success:function(data){
	    			if(data.length){
	    				var activeHeaders = [];
	    				$(data).each(function(){
	    					var selector = this.subCategoryName.split(" ").join("").split('&').join('and').toLowerCase();
						var $subcategoryContainer = $('#meta-'+selector);
						var doesContainLabels = $('#meta-'+selector+' .shelf-label-header').length > 0;
	    					for(var i = 0; i < this.items.length; i++){
	    						var html = $.parseHTML(itemCard(this.items[i]));
							attachCards(html, this.items[i], $subcategoryContainer, doesContainLabels);
	    						activeHeaders.push(selector);
	    					}
	    					if(this.items.length === 0){
	    						$("[data-subcat-id='"+this.subCategoryId+"']").addClass('disabled-link');
	    					}
	    					$('.disabled-link').click(function(e){
	        					e.preventDefault();
	        					return;
	        				});
	    				});
	    			} else {
	    				$('.home__category-header.whatsnew').hide();
	    			}

						filterLabelToBottom(moveToBottom);
						filterLabelToBottom(othersList);
						if (wholesale == true) {
//							filterLabelToTop(moveToTop);	
						}
						$.each(activeLabels, function(index, label) {
							$(label).show();
						});
	    			$.each(activeHeaders, function(index, hdr){
	    				$(".center.-expand."+hdr).show();
	    			});
						$('#loading').hide();
						setTopLabelPadding();
	    			attachEventHandlers();
						setScrollPosition();
	    	  	},
	    	  	error: function(err){
	    	  		console.log('error', err);
	    	  	}
	    	});
		};	
	} else {
		getItems = function(params){
		$.ajax({
    		type: "GET",
    	  	cache: false,
    	  	url: contextPath + "/api/item/itemsPerCategory",
    	  	data: params,
    	  	success:function(data){
    			if(data.length){
    				var activeHeaders = [];
    				$(data).each(function(){
    					var selector = this.subCategoryName.split(" ").join("").split('&').join('and').toLowerCase();
							var $subcategoryContainer = $('#meta-'+selector);
							var doesContainLabels = $('#meta-'+selector+' .shelf-label-header').length > 0;
    					for(var i = 0; i < this.items.length; i++){
    						var html = $.parseHTML(itemCard(this.items[i]));
								attachCards(html, this.items[i], $subcategoryContainer, doesContainLabels);
    						activeHeaders.push(selector);
    					}
    					if(this.items.length === 0){
    						$("[data-subcat-id='"+this.subCategoryId+"']").addClass('disabled-link');
    					}
    					$('.disabled-link').click(function(e){
        					e.preventDefault();
        					return;
        				});
    				});
    			} else {
    				$('.home__category-header.whatsnew').hide();
    			}

					filterLabelToBottom(moveToBottom);
					filterLabelToBottom(othersList);
					if (wholesale == true) {
//						filterLabelToTop(moveToTop);	
					}
					$.each(activeLabels, function(index, label) {
						$(label).show();
					});
    			$.each(activeHeaders, function(index, hdr){
    				$(".center.-expand."+hdr).show();
    			});
					$('#loading').hide();
					setTopLabelPadding();
    			attachEventHandlers();
					setScrollPosition();
    	  	},
    	  	error: function(err){
    	  		console.log('error', err);
    	  	}
    	});
	};
	}

	var generateSubcatHTML = function(name, id){
		var selected = parseInt(subcategory) === id ? "-selected" : "";

		if(subcategory === "All" && name === "All"){
			selected = "-selected";
		}

		return ( "<li>"+
		        "<a data-subcat-id='"+id+"' href='"+contextPath+"/home?" + wholesaleParam + "category="+category+"&subcategory="+id+"'>"+
		          	"<div class='link-wrapper "+selected+"'>"+
			        	"<span>"+
			            	name+
			            "</span>"+
			        "</div>"+
		        "</a>"+
		     "</li>" );
	};
	var attachHeaders = function(subcats){
		$.each(subcats, function(index, cat){

			var shortname = cat[0].split(' ').join('').split('&').join('and').toLowerCase();
			var shelfLabels = cat[2];
			var html =
				"<div style='display: none;' class='center -expand "+shortname+"' ><a class='home__category-header' href='"+contextPath+"/home?" + wholesaleParam + "category="+category+"&subcategory="+cat[1]+"'>"+
				    "<h3>"+cat[0].charAt(0).toUpperCase()+cat[0].slice(1)+"</h3>"+
//				    "<span>"+
//				      "View More"+
//				    "</span>"+
			    "</a>"+
				"<div class='cards -element-query-active -elementquery-active "+shortname+"' data-module='elementquery' data-minwidth='400 600 800 1000 1200 1400 1600'>"+
					"<ul id='meta-"+shortname+"' class='item-card-container'></ul>" +
				"</div></div>";

			$(".pad").append($.parseHTML(html));
			var shelfLabelHtml = buildShelfLabels(shelfLabels);
			var $subcategoryContainer = $('#meta-'+shortname);
			attachShelfLabels(shelfLabelHtml, $subcategoryContainer);
		});
	};

	var getSubCategories = function(getItems, params){
		$.ajax({
    		type: "GET",
    	  	cache: false,
    	  	url: contextPath + "/api/category/subcategory",
    	  	data: {categoryId: wholesalehomepage ? 999 : categoryIdMap[category]},
    	  	success:function(data){
						 if (category === "produce") {
						 	var tempData = [];
						 	tempData[0] = data[1];
						 	tempData[1] = data[5];
						 	tempData[2] = data[2];
						 	tempData[3] = data[3];
						 	tempData[4] = data[0];
						 	tempData[5] = data[4];
						 	data = tempData;
						 }
						 if (params.isWholesale) {
							 var tempData = [];
							 tempData[0] = data[1];
							 tempData[1] = data[0];
							 data[0] = tempData[0];
							 data[1] = tempData[1];
						 }
						var maxSubCategories = data.length + 1;
	    			if(typeof data.message !== 'undefined' || data.message!='ZERO_RECORDS'){
	    				var All = $.parseHTML(generateSubcatHTML("All", "All"));
	    	  		$("#subcat-list").append(All);
	    	  		var subcats = [];
	    	  		var hasOther = false;
	    	  		var hasOthers = false;
	    	  		var otherId = null;
	    	  		for(var i = 0; i < data.length; i++){
	    					var name = data[i].displayName;
	    					name = name.charAt(0).toUpperCase() + name.slice(1);
	    					var id = data[i].subCategoryId;
	    					if(id === parseInt(subcategory)){
	    						var subcat = name;
	    					}
	    					if(name === 'Other'){
	    						hasOther = true;
	    						otherId = id;
	    					}
	    					if(name === 'Others'){
	    						hasOthers = true;
	    						otherId = id;
	    					}
	    					if(name != "Organic" && name != "Other" && name != "Others"){
	    						var html = $.parseHTML(generateSubcatHTML(name, id));
									if (i+1 === totalInlineSubCategories && maxSubCategories > i+1) {
										$("#subcat-list").append(html);
										$("#subcat-list").append(subcatMoreHtml());
									}
									else if (i+1 > totalInlineSubCategories) {
										$("#subcat-more-list").append(html);
									}
									else {
										$("#subcat-list").append(html);
									}
									subcats.push([name, id, data[i].shelfLabels]);
	    					}
								if((name === 'Others' || name === 'Other') && i+1 === totalInlineSubCategories && maxSubCategories > i+1) {
									$("#subcat-list").append(subcatMoreHtml());
								}
	        	  }
	    	  		if(hasOther || hasOthers){
	      	  		var other = $.parseHTML(generateSubcatHTML("Other", otherId));
								if (i+1 === totalInlineSubCategories && maxSubCategories > i+1) {
									$("#subcat-list").append(other);
									$("#subcat-list").append(subcatMoreHtml());
								}
								else if (i+1 > totalInlineSubCategories) {
									$("#subcat-more-list").append(other);
								}
								else {
									$("#subcat-list").append(other);
								}
	      	  		subcats.push(['Other', otherId, []]);
	    	  		}
	    	  		updateSelectTitles(category, subcat);
	    	  		attachHeaders(subcats);
	    	  		attachMobileSubcatSelect(subcats);
							attachSubCatMoreHandler();
							getItems(params);
	    			}
    	  	},
    	  	error: function(err){
    	  		console.log('error', err);
    	  	}
    	});
	};

   	var params = {
		categoryId: categoryIdMap[category],
		stateCity: stateCity,
		count: 10000, //get all
		isWestCoast: westCoastFlag,
		sortType: "desc",
		sortBy: "updatedDate",
		offset: offset,
		organic: (subcategory === "organic" ? "true" : undefined),
		topSeller: "true",
		isWholesale: wholesale ? true : false,
		recent: (subcategory === "new" ? "true" : undefined)
   	};

   	getSubCategories(getItems, params);

};

// this is called when a user is on a subcategory other than 'All'
var generateCategoryHTML = function(){
	var getItems = function(params, shelfLabels){
		$.ajax({
    		type: "GET",
    	  	cache: false,
    	  	url: contextPath + "/api/item/homepageOffset",
    	  	data: params,
    	  	success:function(data){
    			if(data.length && data.message !== 'ZERO_RECORDS'){
						var doesContainLabels = shelfLabels.length > 0;
						var $subcategoryContainer = $("#product-list");
						$subcategoryContainer.addClass('item-card-container');
    				for(var i = 0; i < data.length-1; i++){
   						var html = $.parseHTML(itemCard(data[i]));
							attachCards(html, data[i], $subcategoryContainer, doesContainLabels);
    				}
    			} else {
    				var html = "<div style='text-align: center; color: gray; padding: 30px;'>Oops! Looks like there aren't any products here for now.<br>Try choosing another category.</div>";
    				$('.cards').append($.parseHTML(html));
    				$('.whatsnew').find('h3').html("")
    			}

					filterLabelToBottom(moveToBottom);
					filterLabelToBottom(othersList);
					if (wholesale == true) {
//						filterLabelToTop(moveToTop);	
					}
					filterUnique(activeLabels).forEach(function(singleLabelNode, idx) {
						$(singleLabelNode).show();
					});
    			$("#category-display").show();
					$('#loading').hide();
    			$(window).trigger('GM-relayout');
					setTopLabelPadding();
    			attachEventHandlers();
					setScrollPosition();
    	  	},
    	  	error: function(err){
    	  		console.log('error', err);
    	  	}
    	});
	};

	var grayOutSubcats = function(){
		$.ajax({
    		type: "GET",
    	  	cache: false,
    	  	url: contextPath + "/api/item/itemsPerCategory",
    	  	data: params,
    	  	success:function(data){
    			if(data.length){
    				$(data).each(function(){
    					if(this.items.length === 0){
    						$("[data-subcat-id='"+this.subCategoryId+"']").addClass('disabled-link');
    					}
    				});
    				$('.disabled-link').click(function(e){
    					e.preventDefault();
    					return;
    				});
    			}
    	  	},
    	  	error: function(err){
    	  		console.log('error', err);
    	  	}
    	});
	};

	var generateSubcatHTML = function(name, id){
		var selected = parseInt(subcategory) === id ? "-selected" : "";
		if(subcategory === "All" && name === "All"){
			selected = "-selected";
		}
		if (selected.length > 0) {
			$('.-elementquery-active').prepend('<div class="home__category-header"><h3>'+name+'</h3></div>')
		}
		return ( "<li>"+
		        "<a data-subcat-id='"+id+"' href='"+contextPath+"/home?" + wholesaleParam + "category="+category+"&subcategory="+id+"'>"+
		          	"<div class='link-wrapper "+selected+"'>"+
			        	"<span>"+
			            	name+
			            "</span>"+
			        "</div>"+
		        "</a>"+
		     "</li>" );
	};

	var subcatIds = [];
	var getSubCategories = function(getItems, params){
		$.ajax({
    		type: "GET",
    	  	cache: false,
    	  	url: contextPath + "/api/category/subcategory",
    	  	data: {categoryId: categoryIdMap[category]},
    	  	success:function(data){
						 if (category === "produce") {
						 	var tempData = [];
						 	tempData[0] = data[1];
						 	tempData[1] = data[5];
						 	tempData[2] = data[2];
						 	tempData[3] = data[3];
						 	tempData[4] = data[0];
						 	tempData[5] = data[4];
						 	data = tempData;
						 }
	    			if(typeof data.message !== 'undefined' || data.message!='ZERO_RECORDS'){
	    				var All = $.parseHTML(generateSubcatHTML("All", "All"));
	        	  		$("#subcat-list").append(All);

	        	  		var subcats = [];
									var shelfLabels = [];
	        	  		var hasOther = false;
	        	  		var hasOthers = false;
	        	  		var otherId = null;
	        	  		for(var i = 0; i < data.length; i++){
										if (data[i].subCategoryId === parseInt(subcategory)) {
											shelfLabels = data[i].shelfLabels;
										}
			    					var name = data[i].displayName;
			    					name = name.charAt(0).toUpperCase() + name.slice(1);
			    					var id = data[i].subCategoryId;
			    					subcatIds.push(id);
			    					if(id === parseInt(subcategory)){
			    						var subcat = name;
			    					}
			    					subcats.push([name, id]);
			    					if (name === 'Other'){
			    						hasOther = true;
			    						otherId = id;
			    					}
			    					if (name === "Others"){
			    						hasOthers = true;
			    						otherId = id;
			    					}
			    					if(name != "Organic" && name != "Other" && name != "Others"){
			    						var html = $.parseHTML(generateSubcatHTML(name, id));
			    						$("#subcat-list").append(html);
			    					}
	        	  		}
	        	  		if(hasOther || hasOthers){
		        	  		var other = $.parseHTML(generateSubcatHTML("Other", otherId));
		        	  		$("#subcat-list").append(other);
		        	  		subcats.push(['Other', otherId]);
	        	  		}
									var setLabelArray = buildShelfLabels(shelfLabels);
									attachShelfLabels(setLabelArray, $('#product-list'));
	        	  		updateSelectTitles(category, subcat);
	        	  		attachMobileSubcatSelect(subcats);
	        	  		grayOutSubcats();
									getItems(params, setLabelArray);
	    			}
    	  	},
    	  	error: function(err){
    	  		console.log('error', err);
    	  	}
    	});
	};

   	var params = {
		categoryId: (category === "topselling" ||
					 category === "organic" ||
					 category === "new" ? undefined : categoryIdMap[category]),
		subCategoryId: subcategory != "null" ? parseInt(subcategory) : undefined,
		stateCity: stateCity,
		sortType: "desc",
		sortBy: "updatedDate",
		isWestCoast: westCoastFlag,
		isWholesale: wholesale ? true : false,
		offset: offset,
		organic: (category === "organic" || subcategory === "organic" ? "true" : undefined),
		topSeller: (category === "topselling" ? "true" : "false"),
		recent: (category === "new" || subcategory === "new" ? "true" : undefined)
   	};

   	if(subcategory === "All" || subcategory === "new" || subcategory === "organic"){
   		params.subCategoryId = undefined;
   	}

   	getSubCategories(getItems, params);
   // 	getItems(params);

};

// var setGrub20Modal = function() {
// 	var modalViewed = localStorage.modalViewed === 'true';
// 	$('.grub20-thanks').on('click', function() {
// 		$('.grub20-modal').hide();
// 		localStorage.setItem('modalViewed', 'true')
// 	});
// 	if (!loggedIn && !modalViewed) {
// 		$('.grub20-modal').css('display', 'block');
// 	}
// }
// setGrub20Modal();

var setMiniCart = function() {
	$.ajax({
		type: "GET",
		cache: false,
		url: contextPath + "/api/item/getcart",
		data: {},
		success:function(data){

			var numItems = data.length;
			$($('.minicart-count')[0]).html(numItems);
			$($('.minicart-count')[1]).html(numItems);
			var createMiniCartItem = function(item){
				var link = baseUrl+contextPath+'/'+item.imagePath.split('/')[0]+'/'+item.itemUrl;
				console.log("load item " + item.specialPrice);
				var miniCartHTML = buildItemHTML(item.itemName,
												item.itemId,
												imageUrl+'/thumb/'+item.imagePath,
												link,
												item.price,
												item.salesPrice, item.specialPrice, item.specialPriceEndDate, item.vipPrice, item.nationPrice, item.nationSalesPrice);

			$('#minicart-items').append(miniCartHTML);

			$($('#minicart-'+item.itemId+' p')[0]).html(item.cartCount);
			$($('#minicart-'+item.itemId+' .cart-input')[0]).attr('value', item.cartCount);
			var price = item.price;
			if (isVipUser) {
				if (parseFloat(item.salesPrice) > 0 || parseFloat(item.vipPrice) > 0) {
					var localSales = parseFloat(item.salesPrice);
					var localVip = parseFloat(item.vipPrice);
					if (localSales > 0 && localVip > 0) {
						price = localVip < localSales ? localVip : localSales;
					}
					else if (localSales > 0) {
						price = localSales;
					}
					else if (localVip > 0) {
						price = localVip;
					}
			 }
		 }
		 else {
				price = parseFloat(item.salesPrice) ? parseFloat(item.salesPrice) : price;
				var dateNow = new Date().setHours(0, 0, 0, 0);
				if (item.specialPrice != null && item.specialPriceEndDate != null && dateNow <= item.specialPriceEndDate)
				{
					var dateBefore = new Date(item.specialPriceEndDate);
					dateBefore.setDate(dateBefore.getDate() - 1);
					if (dateNow.valueOf() >= dateBefore.valueOf())
						price = parseFloat(item.specialPrice);
				}
		 }
		 if (stateCity === 'US') {
			 price = parseFloat(item.nationSalesPrice) ? parseFloat(item.nationSalesPrice) : parseFloat(item.nationPrice);
		 }
			var subtotal = parseFloat((item.cartCount)*price).toFixed(2);
			$($('#minicart-'+item.itemId+' p')[1]).html("Subtotal: $"+subtotal);
			var currentTotal = parseFloat($($('.mini-cart__total p')[0]).html().split('$')[1]);
			var newTotal = "$"+(currentTotal+(item.cartCount*price)).toFixed(2);
			$($('.mini-cart__total p')[0]).html(newTotal);

			// attach new minicart event handlers
			$('.mini-cart__items__remove').off().on('click', function(e){
				var id = $(this).closest('.single-minicart-item').attr('id').split('-')[1];
				var val = parseInt($($(this).closest('.single-minicart-item').find('.mini-cart__single__quantity')[0]).html(), 10);
				updateValues(id, -val, true);
			});

			$('.mini-cart__items__adjust.-add').off().on('click', function(e){
				var id = $(this).closest('.single-minicart-item').attr('id').split('-')[1];
				updateValues(id, 1);
			});

			$('.mini-cart__items__adjust.-remove').off().on('click', function(e){
				var id = $(this).closest('.single-minicart-item').attr('id').split('-')[1];
				updateValues(id, -1);
			});
			$('.mini-cart__single__quantity').off().on('click', function() {
				var $this = $(this);
				var $singleMiniCartItem = $this.closest('.single-minicart-item');
				var id = $singleMiniCartItem.attr('id').split('-')[1];
				var $input = $singleMiniCartItem.find('.minicart-input');
				// var $itemCard =
				var el = $($("[data-item-id="+id+"]")[0]);
				var cartCount = el.length ? el.attr('data-num-in-cart') : cartItems[id].cartCount;
				$this.hide();
				$input.show();
				$input.focus();
				$input.val('');
				$input.val(cartCount);
				$singleMiniCartItem.find('.mini-cart__items__remove').hide();
				$singleMiniCartItem.find('.-remove').hide();
				$singleMiniCartItem.find('.-minicart-cancel').show();
				$singleMiniCartItem.find('.-add').hide();
				$singleMiniCartItem.find('.-minicart-submit').show();
				$singleMiniCartItem.find('.mini-cart__quantity__wrapper').animate({width: '100%'}, 300);

				return false;
			});
			$('.minicart-input').on('keyup', function(e) {
				var $this = $(this);
				var $singleMiniCartItem = $this.closest('.single-minicart-item');
				var id = $singleMiniCartItem.attr('id').split('-')[1];
				var el = $($("[data-item-id="+id+"]")[0]);
				var itemCardOnPage = el.length > 0;
				if (e.keyCode === 13) {
					if (itemCardOnPage) {
						var $itemCard = $(el.closest('.cards__item'));
						var desiredQuantity = parseInt($singleMiniCartItem.find('.minicart-input').val(), 10);
						validateCartUpdate(el, desiredQuantity);
					}
					else {
						validateUpdateMiniCart(id);
					}
					hideEditQuantityMiniCart($singleMiniCartItem);
				}
				if (e.keyCode === 27) {
					hideEditQuantityMiniCart($singleMiniCartItem);
				}
			});
			$('.-minicart-submit').on('click', function() {
				var $this = $(this);
				var $singleMiniCartItem = $this.closest('.single-minicart-item');
				var id = $singleMiniCartItem.attr('id').split('-')[1];
				var el = $($("[data-item-id="+id+"]")[0]);
				var itemCardOnPage = el.length > 0;
				if (itemCardOnPage) {
					var $itemCard = $(el.closest('.cards__item'));
					var desiredQuantity = parseInt($singleMiniCartItem.find('.minicart-input').val(), 10);
					validateCartUpdate(el, desiredQuantity);
				}
				else {
					validateUpdateMiniCart(id);
				}
				hideEditQuantityMiniCart($singleMiniCartItem);
				});
				$('.-minicart-cancel').on('click', function() {
					var $this = $(this);
					var $singleMiniCartItem = $this.closest('.single-minicart-item');
					hideEditQuantityMiniCart($singleMiniCartItem);
				});
			};

			$.each(data, function(index, item){
				if (item.cartCount > 0) {
					cartItems[item.itemId] = item;
					createMiniCartItem(item);
				}
			});
			setMiniCartDelivery();
		},
		error: function(err) {
			console.log(err);
		}
	});
}
var setHowItWorksModalEvents = function() {
	var showCorrectTabSection = function(currentTab) {
		switch (currentTab.attr('id')) {
			case "how-grubmarket-works-tab":
				$('#how-grubmarket-works').show();
				break;
			case "delivery-details-tab":
				$('#delivery-details').show();
				break;
			case "delivery-zones-tab":
				$('#delivery-zone').show();
				break;
			case "our-mission-tab":
				$('#our-mission').show();
				break;
			default:
				return;
		}
	}
	$('.how-header-tab-text').on('click', function() {
		var $this = $(this);

		if (!$this.hasClass('how-to-selected-tab')) {
			$('.how-header-tab-text').removeClass('how-to-selected-tab');
			$this.addClass('how-to-selected-tab');
			$('.how-it-works-content-section').hide();
			showCorrectTabSection($this);
		}
	});
	$('#header-how-it-works, #menu-how-it-works').on('click', function() {
		$('#how-it-works-modal').popup('show');
	});
}
$('.modal__close').click(function(e){
	$('#signin-modal').popup('hide');
	$('#register-modal').popup('hide');
	$('#forgot-modal').popup('hide');
	$('#signin-failed-modal').popup('hide');
	$('#how-it-works-modal').popup('hide');
	$('.modal').popup('hide');
});
$('.close_modal').click(function(e){
	$('#signin-modal').popup('hide');
	$('#register-modal').popup('hide');
	$('#forgot-modal').popup('hide');
	$('#signin-failed-modal').popup('hide');
	$('#how-it-works-modal').popup('hide');
	$('.modal').popup('hide');
});
setHowItWorksModalEvents();