function buildItemHTML(name, id, thumb, link, price, salesPrice, specialPrice, specialPriceEndDate, vipPrice, nationwidePrice, nationwideSalesPrice){
	var salesHTML = "";
	var realPrice = price;
	var currentPrice;
	var dateNow = new Date().setHours(0, 0, 0, 0);
	var endDate = null;
	if (specialPriceEndDate != null)
		endDate = new Date(specialPriceEndDate);
	if(((salesPrice != 'null' && salesPrice != null) || (vipPrice != 'null' && vipPrice != null)) && stateCity !== "US"){
		if (isVipUser) {
			if ((salesPrice != 'null' && salesPrice != null) && (vipPrice != 'null' && vipPrice != null)) {
				currentPrice =  parseFloat(vipPrice) < parseFloat(salesPrice) ? vipPrice : salesPrice;
				// realPrice = "VIP $"+parseFloat(currentPrice).toFixed(2);
				realPrice = "$"+parseFloat(currentPrice).toFixed(2);
			}
			else if (salesPrice != 'null' && salesPrice != null) {
				currentPrice = salesPrice;
				realPrice = "$"+parseFloat(currentPrice).toFixed(2);
			}
			else if (vipPrice != 'null' && vipPrice != null) {
				currentPrice = 	vipPrice;
				// realPrice = "VIP $"+parseFloat(currentPrice).toFixed(2);
				realPrice = "$"+parseFloat(currentPrice).toFixed(2);
			}
			else {
				currentPrice = price;
				realPrice = "$"+parseFloat(currentPrice).toFixed(2);
			}
			salesHTML =
				"<i>"+
							"<span>"+
								"Marked down from"+
							"</span>"+
							"$"+parseFloat(price).toFixed(2)+
							"</i>";
		}
		else {

			currentPrice = (salesPrice != 'null' && salesPrice != null) ? salesPrice : price;
			realPrice = "$"+parseFloat(currentPrice).toFixed(2);
			if (specialPrice != null && endDate != null && dateNow <= endDate)
			{
				var dateBefore = endDate;
				dateBefore.setDate(dateBefore.getDate() - 1);
				if (dateNow >= dateBefore)
				{
						currentPrice = specialPrice;
						realPrice = "$"+parseFloat(currentPrice).toFixed(2);
				}
			}
			salesHTML = 
				"<i>"+
							"<span>"+
								"Marked down from"+
							"</span>"+
							"$"+parseFloat(price).toFixed(2)+
							"</i>";
		}
	}
	else if (stateCity !== "US") {
		currentPrice = (salesPrice != 'null' && salesPrice != null) ? salesPrice : price;
		realPrice = "$"+parseFloat(currentPrice).toFixed(2);
	}
	if (stateCity === "US") {
		if (nationwideSalesPrice !== "null" && nationwideSalesPrice !== null) {
			salesHTML = 
				"<i>"+
							"<span>"+
								"Marked down from"+
							"</span>"+
							"$"+parseFloat(nationwidePrice).toFixed(2)+
							"</i>";
		}
		console.log(nationwidePrice, nationwideSalesPrice);
		currentPrice = (nationwideSalesPrice != 'null' && nationwideSalesPrice != null) ? nationwideSalesPrice : nationwidePrice;
		realPrice = "$"+parseFloat(currentPrice).toFixed(2);
	}


	var itemHTML =
		"<li id='minicart-"+id+"' class='single-minicart-item'>"+
		  "<div>"+
		    "<img src='"+thumb+"'>"+
		    "<h4>"+
		      "<a href='"+link+"'>"+
		        "<b>"+
		          name+
		        "</b>"+
		        "<span>"+
		          salesHTML+
		          realPrice+
		        "</span>"+
		      "</a>"+
		    "</h4>"+
		    "<div class='mini-cart__items__controls'>"+
					"<div class='mini-cart__quantity__wrapper'>"+
			      "<button class='mini-cart__items__adjust -remove'>"+
			        "<span>"+
			          "Remove 1"+
			        "</span>"+
			      "</button>"+
						"<button class='mini-cart__items__adjust -minicart-cancel'>Cancel</button>"+
						'<input type="number" value="0" class="minicart-input" placeholder="Quantity">'+
			      "<p class='mini-cart__single__quantity'>"+
			       "0"+
			      "</p>"+
						"<button class='mini-cart__items__adjust -minicart-submit'>Submit</button>"+
			      "<button class='mini-cart__items__adjust -add'>"+
			        "<span>"+
			          "Add 1"+
			        "</span>"+
			      "</button>"+
					"</div>"+
		      "<button class='mini-cart__items__remove'>"+
		        "<i class='fa fa-times mini-cart-remove'></i>"+
		      "</button>"+
		    "</div>"+
		    "<p class='mini-cart__items__subtotal'>"+
		      "SUBTOTAL"+
		    "</p>"+
		  "</div>"+
		"</li>";
	
	return itemHTML;
};
              