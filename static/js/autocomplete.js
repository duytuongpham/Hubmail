	$('#search-bar').submit(function(e) 
	{
		e.preventDefault();
		if ($('#search-query').val().length > 0)
		{
			var wholesale_temp = false;
			if (typeof wholesale == 'undefined' && typeof itemWholesaleFlag == 'undefined') {
				wholesale_temp = false;
			} else if (typeof itemWholesaleFlag != 'undefined'){
				if (itemWholesaleFlag == 'true') {
					wholesale_temp = true;
				} else {
					wholesale_temp = false;
				}
			} else {
				wholesale_temp = wholesale;
			}
			mixpanel.track("Search Submitted", { "Query": $('#search-query').val() });
			if (wholesale_temp) {
				window.location = contextPath + "/search?wholesale=true&searchString=" + encodeURIComponent($('#search-query').val());
			} else {
				window.location = contextPath + "/search?searchString=" + encodeURIComponent($('#search-query').val());
			}
		}
		else 
		{
			return false;
		}
	});
	
	$("#search-query").autocomplete({
		source: function( request, response ) 
		{
			var wholesale_temp = false;
			if (typeof wholesale == 'undefined' && typeof itemWholesaleFlag == 'undefined') {
				wholesale_temp = false;
			} else if (typeof itemWholesaleFlag != 'undefined'){
				if (itemWholesaleFlag == 'true') {
					wholesale_temp = true;
				} else {
					wholesale_temp = false;
				}
			} else {
				wholesale_temp = wholesale;
			}
			$.ajax({
				url: contextPath + "/api/item/getSuggestText",
				
				data: {
					searchString : encodeURIComponent($('#search-query').val()),
					isWholesale : wholesale_temp != null ? wholesale_temp : false
				},
				success: function( data ) 
				{
					console.log(data);
					response( $.map( data, function( item ) {
						
						if(item.name != undefined)
						{
							return {
								label: item.type + ": " + item.name,
								value: item.name
							}
						}
						
					}));
				}
			});
		},
		minLength: 2,
		select: function( event, ui ) 
		{
			var wholesale_temp = false;
			if (typeof wholesale == 'undefined' && typeof itemWholesaleFlag == 'undefined') {
				wholesale_temp = false;
			} else if (typeof itemWholesaleFlag != 'undefined'){
				if (itemWholesaleFlag == 'true') {
					wholesale_temp = true;
				} else {
					wholesale_temp = false;
				}
			} else {
				wholesale_temp = wholesale;
			}
			mixpanel.track("Search Suggestion Selected", { "Query": ui.item.value });
			if (wholesale_temp) {
				window.location = contextPath + "/search?wholesale=true&searchString=" + encodeURIComponent(ui.item.value);
			} else {
				window.location = contextPath + "/search?searchString=" + encodeURIComponent(ui.item.value);
			}
		},
		open: function() {
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
			$(this).autocomplete('widget').css('z-index', 1000);
		},
		close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
	});
	


$('.icon.icon-search.form-control-feedback').click(function(){
	$('#search-bar').submit();
});