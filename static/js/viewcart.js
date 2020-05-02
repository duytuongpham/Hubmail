var inputFullWidth = '100px';
var inputMinWidth = '40px';

var hideEditQuantityViewCart = function($singleViewCartItem) {
	var $input = $singleViewCartItem.find('.item-cart-num-input');
	var $quantityDisplay = $singleViewCartItem.find('.item-cart-num');
	$singleViewCartItem.find('.item-cart-num').css({'width': inputFullWidth});
	$input.hide();
	$input.css({'width': inputMinWidth});
	$singleViewCartItem.find('.-viewcart-cancel').hide();
	$singleViewCartItem.find('.-viewcart-remove').show();
	$singleViewCartItem.find('.-viewcart-submit').hide();
	$singleViewCartItem.find('.-viewcart-add').show();
	$quantityDisplay.show()
	$quantityDisplay.animate({'width': inputMinWidth});
	$singleViewCartItem.find('.item-remove').show();
}

var updateViewCart = function(id){
	// update the page based on minicart
	var cartNum = parseInt($($("#minicart-"+id+" p")[0]).text());
	if(cartNum > 0){
		$(".item-wrapper[data-cart-itemid="+id+"]").find(".item-cart-num").text(cartNum);
		var subTotal = $($('#minicart-'+id+' p')[1]).html().split(':')[1];
		$(".item-wrapper[data-cart-itemid="+id+"]").find(".item-total>span").text(subTotal);
	} else {
		$(".item-wrapper[data-cart-itemid="+id+"]").remove();
	}
	var total = $($('.mini-cart__total p')[0]).text();
	$('.cart-total-inner.bold').text(total);
	var cartCount = $('.mini-cart__title').text().trim();
	$('.page-header__your-cart').text(cartCount);
};

var attachCartEventhandlers = function(){
	$('.item-remove').click(function(e){
		var id = $(this).closest('.item-wrapper').attr("data-cart-itemid");
		var num = $(this).closest('.item-wrapper').find(".item-cart-num").text();
		updateValues(id, -parseInt(num), true);
		updateViewCart(id);
	});

	$('.mini-cart__items__adjust-viewcart.-add').click(function(e){
		var id = $(this).closest('.item-wrapper').attr("data-cart-itemid");
		updateValues(id, 1, true);
		updateViewCart(id);
	});

	$('.mini-cart__items__adjust-viewcart.-remove').click(function(e){
		var currentOrderQuantity = Number($(this).closest('.item-wrapper').find(".item-cart-num").text());
		var minOrderAmount = Number($(this).closest('.item-wrapper').attr("data-min-order"));
		// will never reduce the number to 0
		if (currentOrderQuantity === minOrderAmount) { return; }
		var id = $(this).closest('.item-wrapper').attr("data-cart-itemid");
		updateValues(id, -1, true);
		updateViewCart(id);
	});
	$('.item-cart-num').off().on('click', function() {
		var $this = $(this);
		var $singleViewCartItem = $this.closest('.item-wrapper');
		var id = $singleViewCartItem.attr('data-item-id');
		var $input = $singleViewCartItem.find('.item-cart-num-input');
		// var $itemCard =
		var el = $singleViewCartItem;
		var cartCount = el.length ? el.attr('data-num-in-cart') : cartItems[id].cartCount;
		$this.hide();
		$input.show();
		$input.focus();
		$input.val('');
		$input.val(cartCount);
		$singleViewCartItem.find('.-viewcart-remove').hide();
		$singleViewCartItem.find('.item-remove').hide();
		$singleViewCartItem.find('.-viewcart-cancel').show();
		$singleViewCartItem.find('.-viewcart-add').hide();
		$singleViewCartItem.find('.-viewcart-submit').show();
		$input.animate({width: inputFullWidth}, 300);

		return false;
	});
	$('.item-cart-num-input').on('keyup', function(e) {
		var $this = $(this);
		var $singleViewCartItem = $this.closest('.item-wrapper');
		var id = $singleViewCartItem.attr('data-item-id');
		var el = $singleViewCartItem;
		var itemCardOnPage = el.length > 0;
		if (e.keyCode === 13) {
			if (itemCardOnPage) {
				var desiredQuantity = parseInt($singleViewCartItem.find('.item-cart-num-input').val(), 10);
				validateCartUpdate(el, desiredQuantity);
			}
			else {
				validateUpdateMiniCart(id);
			}
			hideEditQuantityViewCart($singleViewCartItem);
		}
		if (e.keyCode === 27) {
			hideEditQuantityViewCart($singleViewCartItem);
		}
	});
	$('.-viewcart-submit').on('click', function() {
		var $this = $(this);
		var $singleViewCartItem = $this.closest('.item-wrapper');
		var id = $singleViewCartItem.attr('data-item-id');
		var el = $singleViewCartItem;
		var itemCardOnPage = el.length > 0;
		if (itemCardOnPage) {
			var desiredQuantity = parseInt($singleViewCartItem.find('.item-cart-num-input').val(), 10);
			validateCartUpdate(el, desiredQuantity);
		}
		else {
			validateUpdateMiniCart(id);
		}
		hideEditQuantityViewCart($singleViewCartItem);
	});
	$('.-viewcart-cancel').on('click', function() {
		var $this = $(this);
		var $singleViewCartItem = $this.closest('.item-wrapper');
		hideEditQuantityViewCart($singleViewCartItem);
	});
};
var setViewCartDelivery = function(deliveryText) {
	$nextDeliveryViewCart.text(deliveryText);
}
var attachCartItems = function(){

	var allItems = "";
	$.each(cartItems, function(index){
		var item = cartItems[index];
		var deliveryString = "";
		var total = parseFloat(item.cartCount * item.price).toFixed(2);
		var delMap = {
			"MAIL": "Mail",
			"PICK_UP": "Pickup at Store",
			"DELIVERY": "Courier",
			"GRUBMARKET": "Delivery by GrubMarket",
			"AGENT": "Pickup from Agent"
		};
		$.each(item.delMethods.split(','), function(index, method){
			if(index)
			  deliveryString += ', '+delMap[method];
			else
			  deliveryString += delMap[method];
		});

		var minOrder = item.minOrder ? item.minOrder : 1;
		var price = "$"+parseFloat(item.price).toFixed(2);
		if (stateCity !== "US") {
			if (isVipUser) {
				if (Number(item.salesPrice) && Number(item.vipPrice)) {
					if (Number(item.salesPrice) > Number(item.vipPrice)) {
						price = "<span class='strike-price'>$"+parseFloat(item.price).toFixed(2)+"</span>"+
								"<span>$"+parseFloat(item.vipPrice).toFixed(2)+"</span>";
								// "<span><span style='color: #1BAF5D;'>VIP </span> $"+parseFloat(item.vipPrice).toFixed(2)+"</span>";
						total = parseFloat(item.cartCount * item.vipPrice).toFixed(2);
					}
					else if(Number(item.salesPrice) < Number(item.vipPrice)) {
						price = "<span class='strike-price'>$"+parseFloat(item.price).toFixed(2)+"</span>"+
								"<span>$"+parseFloat(item.salesPrice).toFixed(2)+"</span>";
						total = parseFloat(item.cartCount * item.salesPrice).toFixed(2);
					}
				}
				else if (Number(item.vipPrice)) {
					price = "<span class='strike-price'>$"+parseFloat(item.price).toFixed(2)+"</span>"+
							"<span>$"+parseFloat(item.vipPrice).toFixed(2)+"</span>";
							// "<span><span style='color: #1BAF5D;'>VIP </span> $"+parseFloat(item.vipPrice).toFixed(2)+"</span>";
					total = parseFloat(item.cartCount * item.vipPrice).toFixed(2);
				}
				else if (Number(item.salesPrice)) {
					price = "<span class='strike-price'>$"+parseFloat(item.price).toFixed(2)+"</span>"+
							"<span>$"+parseFloat(item.salesPrice).toFixed(2)+"</span>";
					total = parseFloat(item.cartCount * item.salesPrice).toFixed(2);
				}
			}
			else {

				price = "<span class='strike-price'>$"+parseFloat(item.price).toFixed(2)+"</span>"+
				"<span>$"+parseFloat(item.salesPrice).toFixed(2)+"</span>";
				total = parseFloat(item.cartCount * item.salesPrice).toFixed(2);
				var dateNow = new Date().setHours(0, 0, 0, 0);
				if (item.specialPrice != null && item.specialPriceEndDate != null && dateNow.valueOf() <= item.specialPriceEndDate.valueOf())
				{
					var dateBefore = new Date(item.specialPriceEndDate);
					dateBefore.setDate(dateBefore.getDate() - 1);
					if (dateNow >= dateBefore)
					{
						price = "<span class='strike-price'>$"+parseFloat(item.price).toFixed(2)+"</span>"+
						"<span>$"+parseFloat(item.specialPrice).toFixed(2)+"</span>";
						total = parseFloat(item.cartCount * item.specialPrice).toFixed(2);
					}
				}
			}
		}
		if (stateCity === "US") {
			price = "$"+parseFloat(item.nationPrice).toFixed(2);
			total = parseFloat(item.cartCount * item.nationPrice).toFixed(2);
			if (parseFloat(item.nationSalesPrice)) {
				price = "<span class='strike-price'>$"+parseFloat(item.nationPrice).toFixed(2)+"</span>"+
						"<span>$"+parseFloat(item.nationSalesPrice).toFixed(2)+"</span>";
				total = parseFloat(item.cartCount * item.nationSalesPrice).toFixed(2);
			}
		}
		// console.log(item);
		var unit = item.itemUnit ? " per "+item.itemUnit : "";

		var store = item.shortName;
		var link = baseUrl+contextPath+'/'+store+'/'+item.itemUrl;
		var expressDelivery = '';
		if (item.expressDelivery) {
			expressDelivery = (!westCoastFlag) ? "<img class='express-delivery-cart-page-icon' src='"+baseUrl+contextPath+"/static/img/express-1day.png' />" : "<img class='express-delivery-cart-page-icon' src='"+baseUrl+contextPath+"/static/img/express-2day.png' />";
		}
		expressDelivery = (stateCity === "US") ? "" : expressDelivery;
		var html =
			"<div class='item-wrapper' data-cart-itemid='"+item.itemId+
						"' data-min-order="+minOrder+
						" data-item-id="+item.itemId+" "+
						" data-item-name="+item.itemName+" "+
						" data-item-price="+item.price+" "+
						" data-item-sales-price="+item.salesPrice+" "+
						" data-quantity="+item.availableQuantity+" "+
						" data-is-vip-user="+isVipUser+" "+
						" data-item-vip-price="+item.vipPrice+" "+
						" data-item-nation-price="+item.nationPrice+" "+
						" data-item-nation-sales-price="+item.nationSalesPrice+" "+
						" data-max-order="+item.maxOrder+" "+
						" data-quantity-enabled="+item.quantityEnabled+" "+
						" data-express-delivery="+item.expressDelivery+" "+
						" data-num-in-cart="+item.cartCount+" "+">"+
		    	"<div class='item-image-wrapper'>"+
		    	  "<a href='"+link+"'>"+
		    	    "<img class='item-image' src='"+baseUrl+contextPath+'/images/thumb/'+item.imagePath+"'>"+
		    	  "</a>"+
		    	"</div>"+
		    	"<div class='item-description-text'>"+
		    	  "<div class='item-description__name'>"+
						"<a href='"+link+"' style='color: #247AB4;'>"+
							item.itemName+
						"</a>"+
						expressDelivery+
		    	  "</div>"+
		    	  "<div class='item-description__price'>"+
		    	  	price+unit+
		    	  "</div>"+
		    	  "<div class='item-description__delivery'>"+
		    	  	deliveryString+
		    	  "</div>"+
		    	"</div>"+
		    	"<div class='item-plus-minus'>"+
						"<span class='item-button-wrapper'>"+
			    	  "<button class='mini-cart__items__adjust-viewcart -remove -viewcart-remove'></button>"+
			    	  "<button class='mini-cart__items__adjust-viewcart -viewcart-cancel'>Cancel</button>"+
			    	  "<button class='item-cart-num'>"+item.cartCount+"</button>"+
			    	  "<input class='item-cart-num-input' value='"+item.cartCount+"' placeholder='Quantity' type='number'>"+
							"<button class='mini-cart__items__adjust-viewcart -viewcart-submit'>Submit</button>"+
			    	  "<button class='mini-cart__items__adjust-viewcart -add -viewcart-add'></button>"+
						"</span>"+
		    	  "<span class='item-remove'>Remove</span>"+
		    	"</div>"+
		    	"<div class='item-total'>"+
		    	  "<span style='float: right;'>$"+total+"</span>"+
		    	"</div>"+
		    "</div>";

		allItems += html;

	});

	$('.page__cart').prepend($.parseHTML(allItems));
	// $('.page__cart').prepend('<div style="text-align: right;margin-bottom: 7px;color: #1578B8;height:100%;margin-bottom:15px;"><span id="next-delivery__viewcart-wrapper" style="float: left;color: black;">Next Delivery: <span id="next-delivery__viewcart"></span></span><a href="#" id="save-cart-page" style="color: #1578B8; border: 1px solid #1578B8;border-radius: 5px;padding: 10px;">SAVE CART</a></div>');
	// $('.page__cart').prepend('<div style="text-align: right;margin-bottom: 7px;color: #1578B8;height:100%;margin-bottom:15px;overflow:auto;"><span id="next-delivery__viewcart-wrapper" style="float: left;color: black;"><i class="fa fa-truck" style="color: #04924B;"></i> Next Delivery: <span id="next-delivery__viewcart"></span></span></div>');
	$nextDeliveryViewCart = $('#next-delivery__viewcart');
	var total = $($('.mini-cart__total p')[0]).text();
	$('.cart-total-inner.bold').text(total);
	attachCartEventhandlers();

};

var addFavorites = function(){
	$.ajax({
	   	 url: contextPath + "/addFavoriteItems" ,
	     beforeSend: function(xhr) {
           xhr.setRequestHeader("Accept", "application/json");
           xhr.setRequestHeader("Content-Type", "application/json");
	     },
	     success: function(returnVal) {
	    	console.log('fav', returnVal);
            if(returnVal != null){
            	if(returnVal.success === true){
            		location.reload();
            	} else {
            		swal('Unable to Add Favorites', 'You are either not logged in or have no favorite items', 'info')
            	}
            }
	     },
			 error: function(err) {
				 console.log(err);
			 }
	});
};

var getPopularProducts = function(){
	// just grab the categoryId of the first item in cart
	// to populate recommended products (todo: better algorithm)
	var catId = cartItems[Object.keys(cartItems)[0]].categoryId.categoryId;
	var params = {
		categoryId: catId,
		stateCity: stateCity,
		sortType: "desc",
		count: 3,
		sortBy: "updatedDate",
		offset: 0,
		isWestCoast: westCoastFlag,
		topSeller: "true"
   	};
	var buildObject = function(item){
		var temp = {};
		temp.availableQuantity = item.quantity;
		temp.cartCount = item.cartCount;
		temp.delMethods = item.orderingMethod;
		temp.imagePath = item.itemImage;
		temp.itemId = item.itemId;
		temp.itemName = item.name;
		temp.itemUnit = item.unit;
		temp.itemUrl = item.itemUrl;
		temp.minOrder = item.minOrder;
		temp.nationSalesPrice = item.nationSalesPrice;
		temp.nationPrice = item.nationPrice;
		temp.price = item.price;
		temp.salesPrice = item.salesPrice;
		return temp;
	};
	$.ajax({
		type: "GET",
	  	cache: false,
	  	url: contextPath + "/api/item/homepageOffset",
	  	data: params,
	  	success:function(data){
			if(data.length && data.message !== 'ZERO_RECORDS'){
				for(var i = 0; i < data.length-1; i++){
					var html = $.parseHTML(itemCard(data[i]));
					popularItems[data[i].itemId] = buildObject(data[i]);
					$("#popular-products").append(html);
				}
			}

			$(window).trigger('GM-relayout');

			attachEventHandlers();
	  	},
	  	error: function(err){
	  		console.log('error', err);
	  	}
	});
};

var appendCartFooter = function(){
	var total = $('.mini-cart__total>p').text();
	var html =
		"<div class='secure-checkout'>"+
			"<span class='lock-icon'>Secure Checkout</span>"+
			"<span class='cart-total'>"+
				"<div class='cart-total-inner'>"+
				  "Total<br>"+
				  "<span style='font-size: 10px;'>(Excluding delivery fees)</span>"+
				"</div>"+
				"<div class='cart-total-inner bold' style='font-weight: bold; width: 100px;'>"+total+"</div>"+
			"</span>"+
		"</div>";

	$(".page").append($.parseHTML(html));
};

var fetchUserCredits = function() {
	$.ajax({
		type: 'GET',
		cache: false,
		url: baseUrl + contextPath + '/api/account/userCreditRebate/list/' + userId,
		data: {},
		success: function(data) {
			var creditAmount = data.model.remainingUserCredits;
			if (creditAmount > 0) {
				$('#user-credit-amount').append(creditAmount.toFixed(2));
				$('#credits-text').show();
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
};
if (userId) {
	fetchUserCredits();
}

var getRecommendedProducts = function(itemIds, categoryIds){
	// just grab the categoryId of the first item in cart
	// to populate recommended products (todo: better algorithm)
	// var catId = cartItems[Object.keys(cartItems)[0]].categoryId.categoryId;
	var params = {
		"count": 3,
		"categoryIds": categoryIds,
		"itemIds": itemIds,
		isWestCoast: westCoastFlag,
		"stateCity": stateCity
	};
	var buildObject = function(item){
		var temp = {};
		temp.availableQuantity = item.quantity;
		temp.cartCount = item.cartCount;
		temp.delMethods = item.orderingMethod;
		temp.imagePath = item.itemImage;
		temp.itemId = item.itemId;
		temp.itemName = item.name;
		temp.itemUnit = item.unit;
		temp.itemUrl = item.itemUrl;
		temp.minOrder = item.minOrder;
		temp.price = item.price;
		temp.salesPrice = item.salesPrice;
		return temp;
	};
	$.ajax({
		type: "GET",
	  	cache: false,
	  	url: contextPath + "/api/item/relatedItems",
	  	data: params,
	  	success:function(data){
				if(data.length && data.message !== 'ZERO_RECORDS'){
					for(var i = 0; i < data.length; i++){
						data[i].isListed = true;
						var html = $.parseHTML(itemCard(data[i]));
						popularItems[data[i].itemId] = buildObject(data[i]);
						$("#popular-products").append(html);
					}
				}

				$(window).trigger('GM-relayout');

				attachEventHandlers();
	  	},
	  	error: function(err){
	  		console.log('error', err);
	  	}
	});
};
var grubBoxPopularProducts = function(stateCity){
	// just grab the categoryId of the first item in cart
	// to populate recommended products (todo: better algorithm)
	// var catId = cartItems[Object.keys(cartItems)[0]].categoryId.categoryId;
	var params = {
		"count": 3,
		"stateCity": stateCity
	};
	var buildObject = function(item){
		var temp = {};
		temp.availableQuantity = item.quantity;
		temp.cartCount = item.cartCount;
		temp.delMethods = item.orderingMethod;
		temp.imagePath = item.itemImage;
		temp.itemId = item.itemId;
		temp.itemName = item.name;
		temp.itemUnit = item.unit;
		temp.itemUrl = item.itemUrl;
		temp.minOrder = item.minOrder;
		temp.price = item.price;
		temp.salesPrice = item.salesPrice;
		return temp;
	};
	$.ajax({
		type: "GET",
	  	cache: false,
	  	url: contextPath + "/api/item/grubbox/list",
	  	data: params,
	  	success:function(data){
				if(data.length && data.message !== 'ZERO_RECORDS'){
					for(var i = 0; i < data.length; i++){
						data[i].shortName = "grubbox";
						var html = $.parseHTML(itemCard(data[i]));
						popularItems[data[i].itemId] = buildObject(data[i]);
						$("#popular-products").append(html);
					}
				}

				$(window).trigger('GM-relayout');

				attachEventHandlers();
	  	},
	  	error: function(err){
	  		console.log('error', err);
	  	}
	});
};