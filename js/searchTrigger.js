function dialogBoxFiltersManager(){
	var checkedFilters = []; 
	$("#districts-dialog-box li").each(function(){
		var input = $(this).children()[0];
		if(input.checked){
			checkedFilters.push($(this));
		}	
	});	
	
	changeHomePageFilters(checkedFilters);
	//$("#results_zone").html("blabla");
	$(document).trigger('close.facebox');
}

function changeHomePageFilters(checkedFilters){
	var remainingFiltersHTML = "";
	var existing2 = [];
	$("#districts form li").each(function(){
		existing2.push($(this).html());
	})
		
	for(i=0;i<6;i++) {
		if(i<checkedFilters.length){
			remainingFiltersHTML += '<li>'+checkedFilters[i].html()+'</li>'; 
		}
		else{
			remainingFiltersHTML += existing2[i-checkedFilters.length];
		}
	}
	
	$("#results_zone").html(remainingFiltersHTML);
	/*$("#results_zone input").each(function() {
		$(this).attr('checked', 'checked');
	});
	*/
	
}
