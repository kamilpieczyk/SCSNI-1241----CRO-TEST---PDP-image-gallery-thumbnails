var dynamicYield = {

	callEvent: function(eventName, params){
		var DYhref = '',
			DYform = '';
		if(typeof params == "object"){
			DYhref = params.DYhref || '';
			DYform = params.DYform || '';
		}

		var params = JSON.stringify(params) || '';
		// these properties are loaded via action call defined in isml as <span ... data-url> parameter
		var DYGetAPIProperties = $('#sfraSpan').data('url');

		$.ajax({
			url: DYGetAPIProperties,
			data: {
				eventName: eventName,
				params: params
			},
			success: function(response) {
				if(response.doCall){			
					if(DY.API) {
							DY.API('event', {
								name: response.eventName,
								properties: response.properties
							});
							// refreshing DY Static Data - SKUs, without need to page-refresh
							if(DY.recommendationContext.type == "CART" && response.eventName == "Remove from Cart") {
								refreshSKUs( response );
							}	
					}
					// in case of async loading
					else {
						document.getElementById("DY_api_static").onload = function(){
							DY.API('event', {
								name: response.eventName,
								properties: response.properties
							});

							// refreshing DY Static Data - SKUs, without need to page-refresh
							if(DY.recommendationContext.type == "CART" && response.eventName == "Remove from Cart") {
								refreshSKUs( response );
							}
						}
					}
				}
				if(DYhref!=''){
					window.location.href = DYhref;
				}
				if(DYform!=''){ 
					DYform.trigger('submit');
				}
			},
			error : function(e){
				console.log(e);
			}
		});
	} 
}

function refreshSKUs( response ) {

	var newCartIds = [];
	for(var i=0; i<response.properties.cart.length; i++) {
		newCartIds.push( response.properties.cart[i].productId );
	}
	DY.API('spa', {
		context: {
			type: 'CART',
			data: newCartIds
		}
	});
	return;
}