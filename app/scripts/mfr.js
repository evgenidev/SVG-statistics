$(function(){
	
	$("#submit").on("click", function(e){
		// Get the d3js SVG element
		//var tmp = document.getElementById("ex1");
		//var svg = tmp.getElementsByTagName("svg")[0];
		// Extract the data as SVG text string
		//var svg_xml = (new XMLSerializer).serializeToString(svg);
		
		var myjson = [];
		var tmp = '<rect width="100%" height="100%" fill="pink"></rect><text x="600" y="300" font-family="sans-serif" font-size="20px" fill="green">page number is 12</text><text x="0" y="500" font-family="sans-serif" font-size="20px" fill="blue">Grade is 1.5 population is 63.951 for 2014</text><circle cx="25" cy="585" r="5" fill="yellow" stroke="orange" stroke-width="2.5"></circle><circle cx="75" cy="585" r="10" fill="yellow" stroke="orange" stroke-width="5"></circle><circle cx="125" cy="585" r="15" fill="yellow" stroke="orange" stroke-width="7.5"></circle><circle cx="175" cy="585" r="20" fill="yellow" stroke="orange" stroke-width="10"></circle><circle cx="225" cy="585" r="25" fill="yellow" stroke="orange" stroke-width="12.5"></circle><text x="125" y="585" font-family="sans-serif" font-size="20px" fill="red">fr</text><text x="175" y="585" font-family="sans-serif" font-size="20px" fill="red">fr</text><text x="225" y="585" font-family="sans-serif" font-size="20px" fill="red">fr</text>';
		
		myjson.push({"country":"FR","data":tmp});
		
		tmp = '<rect width="100%" height="100%" fill="pink"></rect><text x="600" y="300" font-family="sans-serif" font-size="20px" fill="green">page number is 12</text><text x="0" y="500" font-family="sans-serif" font-size="20px" fill="blue">Grade is 1.5 population is 63.951 for 2014</text><circle cx="25" cy="585" r="5" fill="yellow" stroke="orange" stroke-width="2.5"></circle><circle cx="75" cy="585" r="10" fill="yellow" stroke="orange" stroke-width="5"></circle><circle cx="125" cy="585" r="15" fill="yellow" stroke="orange" stroke-width="7.5"></circle><circle cx="175" cy="585" r="20" fill="yellow" stroke="orange" stroke-width="10"></circle><circle cx="225" cy="585" r="25" fill="yellow" stroke="orange" stroke-width="12.5"></circle><text x="125" y="585" font-family="sans-serif" font-size="20px" fill="red">fr</text><text x="175" y="585" font-family="sans-serif" font-size="20px" fill="red">fr</text><text x="225" y="585" font-family="sans-serif" font-size="20px" fill="red">fr</text>';
				
		myjson.push({"country":"GB","data":tmp});

		
		// Submit the <FORM> to the server.
		// The result will be an attachment file to download.
		var form = document.getElementById("form");
		form.json.value = JSON.stringify(myjson);
		//form['data'].value = svg_xml ;
		//form.submit();
	});
});