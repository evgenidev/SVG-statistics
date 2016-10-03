/*global google,mapingCountry*/
google.load("visualization", "1", {packages:["geochart"]});
google.setOnLoadCallback(drawRegionsMap);

var mainregion = 'FR';
var mfrinit = true;

function drawRegionsMap() {
	
	var data = google.visualization.arrayToDataTable([
		['Country', 'Population'],
		[mainregion, 1324]
	]);

	//var myregion = '150';

	
	var myregion = mapingCountry.filter(function(v,i) {
		return v[4] === mainregion;
	});
	myregion = myregion[0][2]; //2 pour le continent zoomé sinon 0
	
	
	var options = {
	/*
		datalessRegionColor: '#FA61DB',
		backgroundColor: '#81d4fa',
		'backgroundColor.fill' : '#FABA61'
	*/
		legend:'none',
		'tooltip.trigger':'none',
		enableRegionInteractivity : false,
		region: myregion	
	};

	var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
	if(!mfrinit){
		mfrinit = false;
	} else {
		chart.clearChart();
	}
	chart.draw(data, options);
}


$("#grab").on("click",function(){
	console.log($("#regions_div div div svg").html());
});
$(".country-link").on("click",function(){
	mainregion = $(this).attr("isoattr");
	drawRegionsMap();
});

