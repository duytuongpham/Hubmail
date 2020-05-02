// template for item card
var myShopPage = myShopPage || null;

function itemCard(item){
	// console.log(item);
	if(!item){
		return "";
	}
	// format needed fields

	var isFavorited = favorites.indexOf(item.itemId) != -1 ? " -favorited" : "";
	var deliveryFee = item.fee ? "$("+item.fee+")" : "";
	var unit = item.unit ? item.unit : "";
	var added = item.cartCount > 0 ? "-added" : "";
	var minOrder = item.minOrder ? item.minOrder : 1;
	var deliveryDay = findDeliveryDay(item);
	var tagsHTML = generateTags(item);
	var pctOff = generatePctOff(item);
	var itemLink = item.shortName ? item.shortName+'/'+item.itemUrl : 'grubbox/'+item.itemUrl;
	var salesPriceHTML = generateSalesPrice(item);
	var price;
	var priceString;
	var nationWidePrice = item.nationPrice;
	var nationWideSalesPrice = item.nationSalesPrice;
	var expressDelivery = "";

	if(unit.length > 10){
		unit = unit.slice(0, 7) + "...";
	}
	if (unit.length > 0){
		unit = " / "+unit;
	}
	if (isVipUser) {
		if (parseFloat(item.vipPrice) && parseFloat(item.salesPrice)) {
			price =  parseFloat(item.vipPrice) < parseFloat(item.salesPrice) ? parseFloat(item.vipPrice) : parseFloat(item.salesPrice);
			// priceString = "<span style='color: #1BAF5D;'>VIP</span> $"+price.toFixed(2);
			priceString = "$"+price.toFixed(2);
		}
		else if (parseFloat(item.salesPrice)) {
			price = parseFloat(item.salesPrice);
			priceString = "$"+price.toFixed(2);
		}
		else if (parseFloat(item.vipPrice)) {
			price = parseFloat(item.vipPrice);
			// priceString = "<span style='color: #1BAF5D;'>VIP</span> $"+price.toFixed(2);
			priceString = "$"+price.toFixed(2);
		}
		else {
			price = item.price;
			priceString = "$"+price.toFixed(2);
		}
	}
	else {
		price = parseFloat(item.salesPrice) ? parseFloat(item.salesPrice) : item.price;
		priceString = "$"+price.toFixed(2);
		var dateNow = new Date().setHours(0, 0, 0, 0);
		if (item.specialPrice != null && item.specialPriceEndDate != null && dateNow.valueOf() <= item.specialPriceEndDate.valueOf())
		{
			var dateBefore = new Date(item.specialPriceEndDate);
			dateBefore.setDate(dateBefore.getDate() - 1);
			if (dateNow.valueOf() >= dateBefore.valueOf())
			{
				price = item.specialPrice;
				priceString = "$"+price.toFixed(2);
			}
		}
	}
	if(stateCity === "US")
	{
		price = (nationWideSalesPrice != null && nationWideSalesPrice != undefined && nationWideSalesPrice > 0.0) ? parseFloat(nationWideSalesPrice) : parseFloat(nationWidePrice);
		priceString = "$"+price.toFixed(2);
	}

	// modify for grubBox items
	// var priceString = "$"+price.toFixed(2);
	if (item.itemImage) {
		item.itemImageAlt = item.itemImage.substring(item.itemImage.lastIndexOf("/") + 1); // remove everything before first slash
		item.itemImageAlt = item.itemImageAlt.replace("_", " ");  // replace _ with space
		item.itemImageAlt = item.itemImageAlt.substring(0, item.itemImageAlt.indexOf('.')); // remove everyhing after ".""
	}
	
	var imagePath = "<img src='"+imageUrl+'/thumb/wide/'+item.itemImage+"' alt='"+item.itemImageAlt+"'>";
	if (item.shortName == "grubbox") {
		imagePath = "<img src='"+imageUrl+'/grubbox/thumb/wide/'+item.itemImage+"' alt='"+item.itemImageAlt+"'>";
	}
	
	var storeName = item.storeName;
	var favHTML =
		"<button class='cards__favorite "+isFavorited+"' data-item-favid="+item.itemId+' data-item-name="'+item.name+'" data-item-storename="'+item.storeName+'">'+
	      "<span>"+
	        "Favorite"+
	      "</span>"+
	    "</button>";
	var addCartHTML =
		  "<button class='-flat-top -item-card -add'>"+
	        "<span>"+
	          "Add To Cart"+
	        "</span>"+
	      "</button>";
	if (item.expressDelivery  && stateCity === 'SF' && !westCoastFlag) {
		expressDelivery = "<a href='"+contextPath+"/express-market' target='_blank'><img class='express-delivery-icon' src='"+baseUrl+contextPath+"/static/img/express-1day.png' /></a>";
	}
	else if (item.expressDelivery  && stateCity === 'SF' && westCoastFlag) {
		expressDelivery = "<a href='"+contextPath+"/express-market' target='_blank'><img class='express-delivery-icon' src='"+baseUrl+contextPath+"/static/img/express-2day.png' /></a>";
	}

	if(item.quantity < minOrder && item.quantityEnabled){
		addCartHTML =
			"<button class='-flat-top -out-of-stock'>"+
		        "<span style='color: black;'>"+
		          "Out Of Stock"+
		        "</span>"+
		    "</button>";
	}
	if(item.grubBoxPrice){
		imagePath = "<img src='"+imageUrl+'/grubbox/thumb/wide/'+item.itemImage+"'>";
		if(item.type === "grubbox"){
			// individual gb item from search page
			priceString = item.grubBoxPrice;
			addCartHTML =
			"<a style='color: white; display: block;' href='"+baseUrl+contextPath+'/'+itemLink+"'>"+
				  "<button class='' style='width: 100%;'>"+
		            "<span>"+
		              "Choose Size"+
		            "</span>"+
		          "</button>"+
			"</a>";
		} else {
			priceString = item.grubBoxPrice;
			addCartHTML =
			"<a style='color: white; display: block;' href='"+baseUrl+contextPath+'/'+itemLink+"'>"+
				  "<button class='' style='width: 100%;'>"+
		            "<span>"+
		              "Choose Size"+
		            "</span>"+
		          "</button>"+
			"</a>";
		}

		storeName = "";
		favHTML = "";

		if(item.pctOff > 0)
		{
			pctOff = "<span class='pct-off'>"+
			  "Save "+parseInt(item.pctOff, 10)+"%+"+
			    "</span>";
		}

	}

	var iconContainer = "";
	var unlisted = "";
	if(myShopPage && (isOwner || isAdmin)){
		iconContainer = "<button title='edit' class='cards__edit' data-item-editid="+item.itemId+"></button>";
		iconContainer += item.isListed ? "<button title='list' class='cards__list' data-item-editid="+item.itemId+" style='display: none;'></button>" :
										 "<button title='list' class='cards__list' data-item-editid="+item.itemId+"></button>";
		iconContainer += item.isListed ? "<button title='unlist' class='cards__unlist' data-item-editid="+item.itemId+"></button>" :
										 "<button title='unlist' class='cards__unlist' data-item-editid="+item.itemId+" style='display: none;'></button>";
		iconContainer += item.isListed ? "<a href='"+contextPath+"/deleteStoreItem/"+item.itemId+"'><button title='delete' class='cards__delete' style='margin-left: 85px; display: none;' data-item-editid="+item.itemId+"></button></a>" :
			 							 "<a href='"+contextPath+"/deleteStoreItem/"+item.itemId+"'><button title='delete' class='cards__delete' style='margin-left: 85px;' data-item-editid="+item.itemId+"></button></a>";
		// expressDelivery = '';
	}

	unlisted = (item.isListed || item.shortName == "grubbox") ? "" : "<div class='unlisted-item'>UNLISTED</div>";

	var html =
	"<li class='cards__item'>"+
	  "<div>"+
	    iconContainer+
			expressDelivery+
	    favHTML+
	    unlisted+
	    "<a href='"+baseUrl+contextPath+'/'+itemLink+"' class='cards__image'>"+
	      imagePath+
	    "</a>"+

	    "<div class='cards__info'>"+
	      "<div class='cards__tags'>"+
	        tagsHTML+
	      "</div>"+

	      "<a class='cards__title' href='"+baseUrl+contextPath+'/'+itemLink+"'>"+
	        "<p>"+
	          storeName+
	        "</p>"+
	        "<h3>"+
	          item.name+
	        "</h3>"+
	      "</a>"+

	      "<p class='cards__meta'>"+
	        "<span class='cards__meta__price'>"+
	          salesPriceHTML+
	          "<span class='cards__meta__price__price'>"+
	            priceString+
	          "</span>"+
	          "<span class='cards__meta__price__noun'>"+
	            unit+
	          "</span>"+
	        "</span>"+
	        pctOff+
	      "</p>"+

	      "<div class='cards__cart' data-module='addclassonfocus'>"+
	          "<div class='add-to-cart -flat-top "+added+"'"+" "+
	           " data-item-id='"+item.itemId+"' "+
	           ' data-item-name="'+item.name+'" '+
	           " data-item-link='"+itemLink+"' "+
						 " data-express-delivery='"+item.expressDelivery+"' "+
	           " data-item-price='"+item.price+"' "+
	           " data-item-thumb="+imageUrl+'/thumb/'+item.itemImage+
	           " data-item-sales-price="+item.salesPrice+" "+
	           " data-item-special-price="+item.specialPrice+" "+
	           " data-item-special-price-end-date="+item.specialPriceEndDate+" "+
	           " data-item-nation-price="+item.nationPrice+" "+
	           " data-item-nation-sales-price="+item.nationSalesPrice+" "+
	           " data-quantity="+item.quantity+" "+
	           " data-min-order="+minOrder+" "+
						 " data-max-order="+item.maxOrder+" "+
						 " data-quantity-enabled="+item.quantityEnabled+" "+
						 " data-is-vip-user="+isVipUser+" "+
						 " data-item-vip-price="+item.vipPrice+" "+
	           " data-num-in-cart="+item.cartCount+" "+">"+
		          "<button class='-flat-top -adjust -item-card -minus'>"+
		          "</button>"+
		          "<button class='-flat-top -adjust -cancel' style='display: none'>"+
								"Cancel"+
		          "</button>"+
		          '<p class="cart-quantity-wrapper">'+
		            '<span class="current-cart-count">'+
		              item.cartCount+
		            '</span>'+
								'<span class="cart-quantity-status">'+
									'Added'+
								'</span>'+
								'<input type="number" value="'+item.cartCount+'" class="cart-input" placeholder="Desired Quantity" min="'+minOrder+'">'+
		          '</p>'+
		          "<button class='-flat-top -adjust -item-card -plus'>"+
		          "</button>"+
							"<button class='-flat-top -adjust -submit' style='display: none; right: 0;'>"+
								"Submit"+
		          "</button>"+
		          addCartHTML+
	          "</div>"+
	      "</div>"+
	    "</div>"+
	  "</div>"+
	"</li>";

	return html;
};

function findDeliveryDay(item){

	if(!item.deliveryDays){
		return "";
	} else {
		var html =
			"<span class='cards__meta__delivery'>"+
		        "<span>"+
		          "Delivery day"+
		        "</span>";
	}
	var deliveryDays = item.deliveryDays.split(',');
	var threeDaysFromNow = moment().add(3, 'days').format("dd").toUpperCase();

	var dayValues = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

	var dayMap = {
		"SU": " Sun",
		"MO": " Mon",
		"TU": " Tue",
		"WE": " Wed",
		"TH": " Thu",
		"FR": " Fri",
		"SA": " Sat"
	};

	var startIndex = dayValues.indexOf(threeDaysFromNow);
	for(var i = startIndex; i < startIndex+7; i++){
		// keep moving forward until we find a day that is in the item's
		// delivery days
		var index = i;
		if(index >= 7) index = index % 7; // wrap around
		if(deliveryDays.indexOf(dayValues[index]) != -1){
			var day = deliveryDay = dayMap[dayValues[index]];
			return html+day+"</span>";
		}
	}
};

function generateTags(item){
	if(!item.itemTagString)
		return;
	var itemTags = item.itemTagString.split('-');
	var tagsHTML = "";
	if(itemTags.length && itemTags[0] != ""){
		if(itemTags.length > 3)
		    var tags = itemTags.slice(0, 3); //only show first 3
		else
			var tags = itemTags;
		tagsHTML += "<ul>";
		for(var i = 0; i < tags.length; i++){
			if (tags[i] !== 'LOCALLY_SOURCED' || (stateCity === 'SF' && !westCoastFlag)) {
				var className = tags[i].split("_").join("").toLowerCase();
				var tagName = "";
				var parts = tags[i].split("_");
				for(var j = 0; j < parts.length; j++){
					if(j > 0){
						tagName += " ";
					}
					var temp = parts[j].toLowerCase();
					temp = temp.toUpperCase()[0] + temp.slice(1, temp.length);
					tagName += temp;
				}
				tagsHTML += "<a href='/search?tag=" +tags[i] + "'><li class='tag -"+className+"'>"+tagName+"</li></a>";
			}
		}
		tagsHTML += "</ul>";
	}
	return tagsHTML;
};

function generatePctOff(item){
	var html = "";
	var calculatedPrice;
	if (isVipUser && stateCity !== "US") {
		if (parseFloat(item.vipPrice) && parseFloat(item.salesPrice)) {
			calculatedPrice =  parseFloat(item.vipPrice) < parseFloat(item.salesPrice) ? parseFloat(item.vipPrice) : parseFloat(item.salesPrice);
			html = "<span class='pct-off'>"+
					  "Save "+parseInt((parseFloat(item.price) - parseFloat(calculatedPrice)) / parseFloat(item.price) * 100)+"%"+
				    "</span>";
		}
		else if (parseFloat(item.salesPrice)) {
			html = "<span class='pct-off'>"+
					  "Save "+parseInt((parseFloat(item.price) - parseFloat(item.salesPrice)) / parseFloat(item.price) * 100)+"%"+
				    "</span>";
		}
		else if (parseFloat(item.vipPrice)) {
			html = "<span class='pct-off'>"+
					  "Save "+parseInt((parseFloat(item.price) - parseFloat(item.vipPrice)) / parseFloat(item.price) * 100)+"%"+
				    "</span>";
		}
	}
	else if (item.salesPrice && stateCity !== "US"){
		html = "<span class='pct-off'>"+
				  "Save "+parseInt((parseFloat(item.price) - parseFloat(item.salesPrice)) / parseFloat(item.price) * 100)+"%"+
			    "</span>";
	}
	if (item.nationSalesPrice && stateCity === "US" ) {
		html = "<span class='pct-off'>"+
				  "Save "+parseInt((parseFloat(item.nationPrice) - parseFloat(item.nationSalesPrice)) / parseFloat(item.nationPrice) * 100)+"%"+
			    "</span>";
	}
	return html;
};

function generateSalesPrice(item){
	var salesPriceHTML = "";
	if(item.salesPrice && stateCity !== "US"){
		salesPriceHTML =
			"<span class='cards__meta__price__strike'>"+
			"<span>"+
			"Marked down from"+
			"</span>"+
			"$"+item.price.toFixed(2)+
			"</span>";
	}
	else if(item.vipPrice && isVipUser && stateCity !== "US"){
		salesPriceHTML =
			"<span class='cards__meta__price__strike'>"+
			"<span>"+
			"Marked down from"+
			"</span>"+
			"$"+item.price.toFixed(2)+
			"</span>";
	}
	if (stateCity === "US" && item.nationSalesPrice) {
		salesPriceHTML =
			"<span class='cards__meta__price__strike'>"+
			"<span>"+
			"Marked down from"+
			"</span>"+
			"$"+item.nationPrice.toFixed(2)+
			"</span>";
	}
	return salesPriceHTML;
};