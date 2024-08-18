let tz;

const initTZValidation = (tzTFA) => {
    $(`#${tzTFA}`).on('change', handleTZinput);	
    
	$(`#${tzTFA}`).blur(function() {
		if(tz){
			let response = {};
			try {
				const isValid = isValidIsraeliID(tz);
				response.isValid = isValid;
				if (isValid) {
					response.message = 'The ID details are valid.';		
				} else {
					response.message = 'The ID details are invalid. Please check and try again.';
				}
			} catch (error) {
				response.message = error.message;
			}
			console.log(response);
			return response;	
		}
	});		
}

const handleTZinput = (event) => {
	tz = event.target.value;
	console.log(tz);
	return tz;
}

const isValidIsraeliID = (id) => {
    var id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id)) return false;
    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
               
    return checkId(id);
}

const checkId = (s) => {
    var sID = String(s);
    if ((sID.length != 9) || (isNaN(sID))) return false;
    if (parseInt(sID) == 0) return false;
    var counter = 0, incNum;
    for (var i = 0; i < 9; i++) {
			  incNum               = Number(sID.charAt(i));
        incNum              *= (i % 2) + 1;
        if (incNum > 9) incNum -= 9;
        counter             += incNum;
    }
    return (counter % 10 === 0);
}