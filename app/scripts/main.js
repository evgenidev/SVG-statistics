/*sub:true*/
/*global handleReaderLoad, XLS, Blob,saveAs, _,dynamicSortMultiple,d3,parseXlsSheet,parseXlsSheetColnames,google,mapingCountry*/
var rowsXSL1 = [];
var rowsXSL1Cols = [];
var rowsXSL2 = [];
var rowsXSL2Cols = [];
/*var MaxMinVals = {
	a:{max:null,min:null,"unit":"%"},
	b:{max:null,min:null,"unit":"$"},
	c:{max:null,min:null,"unit":"Index*"},
	d:{max:null,min:null,"unit":"% *"},
	e:{max:null,min:null,"unit":""},
	f:{max:null,min:null,"unit":"% *"},
	g:{max:null,min:null,"unit":"% *"}
};*/
var ZoneColors=[];
ZoneColors[1]={country:"#3C7896",main:"#43a3bc",second:"#d9ecf1",white:"#FFF",black:"#323232",gray:"#9B9B9B", source: "#1DA95A", bar_1:"#46C8DC", bar_2:"#2489BE", bar_3:"#E5563B"};
ZoneColors[2]={country:"#000",main:"#ef804e",second:"#fbe5db",white:"#FFF",black:"#323232",gray:"#9B9B9B", source: "#1DA95A", bar_1:"#46C8DC", bar_2:"#2489BE", bar_3:"#E5563B"};
ZoneColors[3]={country:"#B43C28",main:"#ea5745",second:"#faddd9",white:"#FFF",black:"#323232",gray:"#9B9B9B", source: "#1DA95A", bar_1:"#46C8DC", bar_2:"#2489BE", bar_3:"#E5563B"};
ZoneColors[4]={country:"#000",main:"#ffdb5f",second:"#fff7de",white:"#FFF",black:"#323232",gray:"#9B9B9B", source: "#1DA95A", bar_1:"#46C8DC", bar_2:"#2489BE", bar_3:"#E5563B"};
ZoneColors[5]={country:"#006E6E",main:"#008977",second:"#D9EDF1",white:"#FFF",black:"#323232",gray:"#9B9B9B", source: "#1DA95A", bar_1:"#46C8DC", bar_2:"#2489BE", bar_3:"#E5563B"};
/*
	1 - Europe & Cis
	2 - Middle East
	3 - Asia
	4 -	Africa
	5 - Americas

	EUROPE : 68 - 163 - 188 : #43a3bc
	MIDDLE EAST : 240 - 128 - 78 : #ef804e
	ASIA : 235 - 88 - 69 : #ea5745
	AFRICA : 255 - 220 - 96 : #ffdb5f
	AMERICAS : 0 - 138 - 119 : #008977
*/



//  1/ uploadXls : gestion HTML5 de filereader.
//  2/ handleXls : lecture du fichier XLS.
//  3/ CheckXls : vérification du fichier XLS
//  4/ goD3 : génération des graphiques D3
var StartCountryPage = 3;
var DocumentTitle = "AU Group G-Grade 2015";
var mainregion = 'FR';
var mfrinit = true;
var googlechartready = false;

/*Google Init */
google.load("visualization", "1", {packages:["geochart"]});
google.setOnLoadCallback(function(){googlechartready=true;});

function uploadXls(files) {
	var f = files[0] ;
	$("#dropfile-xls").hide();
	$("#process-xls").html("Processing ...");
	var reader = new FileReader();
	reader.onload = handleXls;
	reader.readAsBinaryString(f);
	console.log("uploadXls Done");
}
function handleXls(e) {
	console.log("handleXls Start");
	var data = e.target.result;

	var workbook = XLS.read(data, {type:'binary'});


	rowsXSL1 = parseXlsSheet(workbook,0,rowsXSL1);
	rowsXSL1Cols = parseXlsSheetColnames(workbook,0);
	rowsXSL2 = parseXlsSheet(workbook,1,rowsXSL2);
	rowsXSL2Cols = parseXlsSheetColnames(workbook,1);

	console.log('Find Max And Min');


	rowsXSL2.forEach(function(e){
		//var indd = e[4];
		var tmp = [];
		if( (e[7] !== null) && (e[7] !== '') ) tmp.push(e[7]);
		if( (e[8] !== null) && (e[8] !== '') ) tmp.push(e[8]);
		if( (e[9] !== null) && (e[9] !== '') ) tmp.push(e[9]);
		if( (e[10] !== null) && (e[10] !== '') ) tmp.push(e[10]);
		if( (e[11] !== null) && (e[11] !== '') ) tmp.push(e[11]);
	});
	console.log('PrepareList');
	PrepareList();
}
function handleXlsDemo(e) {
	console.log("handleXls Start");
	var data = e;

	var workbook = XLS.read(data, {type:'binary'});


	rowsXSL1 = parseXlsSheet(workbook,0,rowsXSL1);
	rowsXSL1Cols = parseXlsSheetColnames(workbook,0);
	rowsXSL2 = parseXlsSheet(workbook,1,rowsXSL2);
	rowsXSL2Cols = parseXlsSheetColnames(workbook,1);

	console.log('Find Max And Min');


	rowsXSL2.forEach(function(e){
		//var indd = e[4];
		var tmp = [];
		if( (e[7] !== null) && (e[7] !== '') ) tmp.push(e[7]);
		if( (e[8] !== null) && (e[8] !== '') ) tmp.push(e[8]);
		if( (e[9] !== null) && (e[9] !== '') ) tmp.push(e[9]);
		if( (e[10] !== null) && (e[10] !== '') ) tmp.push(e[10]);
		if( (e[11] !== null) && (e[11] !== '') ) tmp.push(e[11]);
	});
	console.log('PrepareList');
	PrepareList();
}


function PrepareList(){

	$("#process-xls").html('file read done');
	getInput();
	var $d3r = $("#d3results");
	var cregion = rowsXSL1[0][3]
	$d3r.html("<h2>"+cregion+"</h2>");
	rowsXSL1.forEach(function(value, index, ar){
		if(cregion != value[3]) {
			cregion = value[3];
			$d3r.append("<h2>"+cregion+"</h2>");
		}
		var page = parseInt(StartCountryPage,10)+index;
		$d3r.append("<a href='#' attr-ind='"+index+"' attr-iso='"+value[0]+"'>"+page+' - '+value[1]+"  ("+value[0]+")</a><br/>");
	});

	window.location.hash = '#resultat';
	$('.nav-tabs a[href="#resultat"]').tab('show');

	$('#svgdownload').html("GO DOWNLOAD ALL");

	console.log('Build Sommaire');
	BuildSommaire();


	//$("#result-xls").show();
	//$("#warning-xls").hide();
	//$("#DownloadXLS").show();

}
function BuildSommaire(){

	//console.log(StartCountryPage);
	var indexContinent = rowsXSL1[0][2];
	var htmlout = "<h1>Sommaire</h1>";
	htmlout += "<h2>"+rowsXSL1[0][3]+"</h2>";
	var startpage = StartCountryPage;
	//console.log(startpage);
	rowsXSL1.forEach(function(e){
		if(e[2]!=indexContinent){
			htmlout += "<h2>"+e[3]+"</h2>";
			indexContinent = e[2];
		}
		var trend = "";
		if( (e[4] !== null) && (e[4] !== '') && (e[4] !== 'n/a') && (e[5] !== null) && (e[5] !== '') && (e[5] !== 'n/a') ) {

			var diff1 = e[5]-e[4];
			var diff2 = e[4]-e[5];
			diff1 = diff1.toFixed(2);
			diff2 = diff2.toFixed(2);

			//trend = "-- "+diff1;
			if( (diff1) > 0.5 ){
				trend = "up";
				//trend = "up "+(diff1);
			}
			if( (diff2) > 0.5 ){
				trend = "down";
				//trend = "down "+(diff2);
			}
		}
		htmlout += e[1]+" page : "+startpage+ " trends :"+trend+"<br/>";
		//htmlout += e[1]+" page : "+startpage+ " trends :"+trend+"   "+diff1+" - "+diff2+"<br/>";
		startpage++;
	});

	$("#sommaire").html(htmlout);


}


function goD3(this_index, iso){
	console.log("go d3");
	// http://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript
	// http://www.format-papier-a0-a1-a2-a3-a4-a5.fr/format-a4/dimensions-a4-en-pixels-par-resolutions.php

	var width = 827,
		height = 1170;

	if(this_index == 999999) {
		var rows1 = ["fr", "France", 1, "Europe & Cis", 1.5, 7.2, 6.8, 9.4];

		/*
		rows1[4] is previous grade (1.5) ==> 6.8 in the example
		rows1[5] is current grade (1.5)  ==> 7.2 in the example
		rows1[6] is min (1) ==> 6.8 in the example
		rows1[7] is max (3) ==> 9.4 in the example
		*/

		var rows2 = [];
		rows2.a=["fr", "France", 1, "Europe & Cis", "a", "Gross domestic product", "Percent change", 0.334, 0.285, 0.371, 0.954, 1.55];
		rows2.b=["fr", "France", 1, "Europe & Cis", "b", "Gross domestic product per capita", "U.S. dollars", 42415.144, 44098.695, 45383.632, 45690.902, 46895.046];
		rows2.c=["fr", "France", 1, "Europe & Cis", "c", "Inflation", "Index", 113.749, 114.878, 115.682, 116.755, 117.923];
		// rows2.d=["fr", "France", 1, "Europe & Cis", "d", "Unemployment rate", "Percent of total labor force", 9.792, 10.258, 9.972, 10.038, 9.859];
		rows2.d=["fr", "France", 1, "Europe & Cis", "d", "Unemployment rate", "Percent of total labor force", 'n/a', 'n/a', -5.3, 'n/a', 10.038];
		// rows2.d=["fr", "France", 1, "Europe & Cis", "d", "Unemployment rate", "Percent of total labor force", 'n/a', 'n/a', 'n/a', 'n/a', 'n/a'];
		//rows2.e=["fr", "France", 1, "Europe & Cis", "e", "Population", "Persons", 63.379, 63.66, 63.951, 64.244, 64.538];
		rows2.e=["fr", "France", 1, "Europe & Cis", "e", "Population", "Millions of People", 21.379, 25.66, 21.951, 32.244, 34.538];
		rows2.f=["fr", "France", 1, "Europe & Cis", "f", "General government gross debt", "Percent of GDP", 88.73, 91.769, 95.203, 97.67, 98.934];
		rows2.g=["fr", "France", 1, "Europe & Cis", "g", "Current account balance", "Percent of GDP", -2.125, -1.313, 1.424, -1.047, 0.716];


		/*
			rows2.e[9] is the population 63.951  ==> (2.8 in the example)
			rows2.a[9] is the gross domestic product 0.371 ==> (2.1 in the example)
			rows2.a[9] is the gross domestic product per capita 45383.632 ==> (4900 in the example)
			==> please do the round according to the design.
		*/

		/*
			Graph Population : rows2.e
			rows2.e[7] is 2012 63.379 ==> ( 21 in the example)
			rows2.e[8] is 2013 63.66 ==> ( 25 in the example)
			rows2.e[9] is 2014 63.951 ==> ( 21 in the example)
			rows2.e[10] is 2015 64.244 ==> ( 32 in the example)
			rows2.e[11] is 2016 64.538 ==> ( 34 in the example)

			and so on for all other graph
			==> please do the round ONLY for the number that you SHOW but NOT for the lines values.

		*/

		var thepage = 12;
		iso = 'fr';

	}else {
		var rows1 = rowsXSL1[this_index];

		var rows2 = [];
		rowsXSL2.forEach(function(e){
			if(e[0]==iso){
				rows2[e[4]]=e;
			}
		});
		var thepage = Number(this_index) + StartCountryPage;
	}

	// round function
	var roundFunc = function(number) {
		if (number == 'n/a')
			return 'N/A';
		else if (number.toString().length > 1) {
			var strValue = number.toFixed(1).toString();

			if (strValue.slice(-1) == '0') {
				return parseInt(strValue);
			}
			else
				return number.toFixed(1);
		}
		else
			return number;
	}

	// float check funtion
	var isNumeric = function( obj ) {
    return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	}

	// string capitalize
	String.prototype.capitalize = function() {
	    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	};


	var rows2names = ["iso code", "country", "Rank", "Region", "Index", "Subject", "Units", 2012, 2013, 2014, 2015, 2016];
	var xData = [rows2names[7], rows2names[8], rows2names[9], rows2names[10], rows2names[11]];

	var mycolors = ZoneColors[rows1[2]]; //use mycolor
	//console.log("COLORS ZONE = "+rows1[2]);

	$("#svg").html("");
	var svg = d3.select("#svg").append("svg").attr("width", width).attr("height", height);

	// main background
	svg.append("rect")
		.attr("width", "100%")
		.attr("height", "100%")
		// .attr("stroke-width", 2)						// for work
		// .attr("stroke", mycolors.main)			// for work
		.attr("fill", mycolors.white);

	// ---------- Top bar ----------
	svg.append("rect")
		.attr("width", "100%")
		.attr("height", "152px")
		.attr("fill", mycolors.main);

	svg.append("text")
		.text("Copyright AU Group")
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "12px")
		.attr("text-anchor", "end")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(30,22) rotate(-90)");

	svg.append("line")
		.attr("x1", 18)
		.attr("y1", 22)
		.attr("x2", 18)
		.attr("y2", 30)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.white);

	// map
	var mapSVG = d3.select("#regions_div").select("div").select("div").select("div").select("svg");
	//console.log(mapSVG.html());

	var mapG = svg.append("g")
		.attr("id", "gmap")
		.attr("transform", "translate(60,30)");

	$("#gmap").html(mapSVG.html());
	d3.select("#gmap").selectAll("rect").remove();

	// NOTE: we use vanilla javascript, because 'clipPath' doesn't work with d3 or jquery
	document.getElementsByTagName("clipPath")[0].innerHTML = '<circle cx="50" cy="50" r="50" style="fill: none;">';

	// var mapClipPath = d3.select("#gmap").select("defs").select("clipPath");
	// mapClipPath.select("rect").remove();

	// mapClipPath.append("circle")
	// 	.attr("cx", 50)
	// 	.attr("cy", 50)
	// 	.attr("r", 50)
	// 	.style("fill", "none");

	mapG.append("circle")
		.attr("cx", 50)
		.attr("cy", 50)
		.attr("r", 50)
		.style("stroke", "#fff")
		.style("stroke-width", 3)
		// .style("overflow", "hidden")
		.style("fill", "none");

	// AU Group G-Grade 2015
	svg.append("text")
		.text(DocumentTitle)
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "10px")
		.attr("fill", mycolors.white)
		.style("shape-rendering", "crispEdges")
		.attr("transform", "translate(370,30)");

	svg.append("line")
		.attr("x1", 415)
		.attr("y1", 18)
		.attr("x2", 425)
		.attr("y2", 18)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.white);

	// Current G-Grade
	svg.append("text")
		.text("Current G-Grade")
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "14px")
		.attr("font-style", "italic")
		.attr("text-decoration", "underline")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(640,70)");

	// 7.2/10
	var curGGradeNumber = roundFunc(rows1[5]);
	var curGGradePos = (curGGradeNumber.toString().length > 1) ? 705 : 690;
	svg.append("text")
		.text(curGGradeNumber)
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "45px")
		.attr("font-style", "italic")
		.attr("text-anchor", "end")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(" + (curGGradePos - 5) + ",110)");

	svg.append("text")
		.text("/")
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "30px")
		.attr("font-style", "italic")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(" + (curGGradePos) + ",109)");

	svg.append("text")
		.text("10")
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "15px")
		.attr("font-style", "italic")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(" + (curGGradePos + 10) + ",110)");

	// Min, Max
	svg.append("text")
		.text("MIN:")
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "14px")
		.attr("font-style", "italic")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(630,140)");

	svg.append("text")
		.text(rows1[6])
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "14px")
		.attr("font-style", "italic")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(660,140)");

	svg.append("text")
		.text("MAX:")
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "14px")
		.attr("font-style", "italic")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(690,140)");

	svg.append("text")
		.text(rows1[7])
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "14px")
		.attr("font-style", "italic")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(723,140)");

	// Italy
	var countryFontSize = 63;
	var countryName = rows1[1].toUpperCase();

	if (countryName.length > 24) {
		countryFontSize = 30;
	}
	else if (countryName.length > 20) {
		countryFontSize = 36;
	}
	else if (countryName.length > 15) {
		countryFontSize = 44;
	}
	else if (countryName.length > 13) {
		countryFontSize = 60;
	}

	svg.append("text")
		.text(rows1[1].toUpperCase())
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "bold")
		.attr("font-size", countryFontSize + "px")
		.attr("font-style", "italic")
		.attr("fill", mycolors.white)
		.attr("transform", "translate(190,130)");

	svg.append("line")
		.attr("x1", 190)
		.attr("y1", 140)
		.attr("x2", 620)
		.attr("y2", 140)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.white);

	// top-right
	svg.append("rect")
		.attr("x", "771")
		.attr("y", "0")
		.attr("width", "57px")
		.attr("height", "152px")
		.attr("fill", mycolors.second);

	svg.append("text")
		.text(rows1[3])
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "12px")
		.attr("text-anchor", "end")
		.attr("fill", mycolors.main)
		.attr("transform", "translate(795,22) rotate(-90)");

	svg.append("line")
		.attr("x1", 783)
		.attr("y1", 22)
		.attr("x2", 783)
		.attr("y2", 30)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.main);

	// ---------- Content ----------
	// ----- top texts
	// Population
	svg.append("text")
		.text(roundFunc(rows2.e[9]))
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "50px")
		.attr("font-style", "italic")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.main)
		.attr("transform", "translate(150,224)");

	svg.append("text")
		.text(rows2.e[5].capitalize())
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "15px")
		.attr("font-style", "italic")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(150,243)");

	svg.append("text")
		.text("in Millions of people, " + rows2names[9])
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(150,263)");

	// Gross Domestic Product
	svg.append("text")
		.text(roundFunc(rows2.a[9]))
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "50px")
		.attr("font-style", "italic")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.main)
		.attr("transform", "translate(415,224)");

	svg.append("text")
		.text(rows2.a[5].capitalize())
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "15px")
		.attr("font-style", "italic")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(415,243)");

	svg.append("text")
		.text("in % of change, " + rows2names[9])
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(415,263)");

	// Gross Domestic Product per Capita
	svg.append("text")
		.text(roundFunc(rows2.b[9]))
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "50px")
		.attr("font-style", "italic")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.main)
		.attr("transform", "translate(680,224)");

	svg.append("text")
		.text(rows2.b[5].capitalize())
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "15px")
		.attr("font-style", "italic")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(680,243)");

	svg.append("text")
		.text("in USD, " + rows2names[9])
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(680,263)");

	// ----- arc graphs
	var ArcColors = ['#1DA95A', '#2BBB61', '#79BB61', '#B4CF5C', '#DDC352', '#E4AA44', '#ED9344', '#E5563B', '#E2452D'];
	var arcStartAngle = 0.19, arcTickAngle = 0.18, tickCount = 9, pathPoints = 50;

	var outerRadiusPrev = 100, outerRadiusCur = 130;
	var smallRadiusPrev = 44, smallRadiusCur = 56;
	var colorRadiusPrev = 64, colorRadiusCur = 80;
	var middleRadiusPrev = 82, middleRadiusCur = 105;
	var middleRadiusSpreadMax = 76, middleRadiusSpreadMin = 88;

	// --- Previous G-GRADE
	var gArcPrev = svg.append('g')
		.attr("transform", "translate(150, 480)");

	// arc function
	var arcFunc = function(startAngle, endAngle) {
		return d3.scale.linear()
							.domain([0, pathPoints - 1])
					    .range([startAngle, endAngle]);
	}

	// large arc
	var lineArcPrev = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(outerRadiusPrev)
    .angle(function(d, i) { return arcFunc(arcStartAngle - 1, 1 - arcStartAngle)(i) * Math.PI; });

	gArcPrev.append("path").datum(d3.range(pathPoints))
    .attr("d", lineArcPrev)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.gray)
    .style("fill", "none");

	// small arc
	var arcSmall = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(smallRadiusPrev)
    .angle(function(d, i) { return arcFunc(0, 2)(i) * Math.PI; });

	gArcPrev.append("path").datum(d3.range(pathPoints))
    .attr("d", arcSmall)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.gray)
		.style("stroke-dasharray", ("3, 3"))
    .style("fill", "none");

  // ticks
  var angleScale = d3.scale.linear()
		.range([arcStartAngle - 1, 1 - arcStartAngle])
		.domain([1, 10]);

  var scale = d3.scale.linear()
		.range([0, 1])
		.domain([1, 10]);
	var ticks = scale.ticks(tickCount);

  gArcPrev.selectAll('line')
    .data(ticks)
	.enter().append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', function(d, i) {
    	if ((i == 0) || (i == 9)) return outerRadiusPrev - smallRadiusPrev + 20;
    	else return outerRadiusPrev - smallRadiusPrev;
    })
    .attr('transform', function(d, i) {
      var newAngle = (arcStartAngle + i * arcTickAngle) * 180;
      return 'rotate(' + newAngle +') translate(0, ' + smallRadiusPrev + ')';
    })
    .style('stroke', mycolors.gray)
    .style('stroke-width', '1px')
    .style("stroke-dasharray", ("3, 3"));

	// middle arc
	var arcMiddle = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(middleRadiusPrev)
    .angle(function(d, i) { return arcFunc(arcStartAngle - 1, angleScale(rows1[4]))(i) * Math.PI; });

	gArcPrev.append("path").datum(d3.range(pathPoints))
    .attr("d", arcMiddle)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.black)
    .style("fill", "none");

  // pointer
  var pointerWidth = 6, pointerTailLength = 2;
  var pointerHeadLength = outerRadiusPrev - smallRadiusPrev - pointerTailLength;
	var pointerData = [ [pointerWidth / 2, 0],
					[0, -pointerHeadLength],
					[-(pointerWidth / 2), 0],
					[0, pointerTailLength],
					[pointerWidth / 2, 0] ];

	var pointerLine = d3.svg.line().interpolate('monotone');

	var pg = gArcPrev.append('g').data([pointerData]);
	pointer = pg.append('path')
		.attr('d', pointerLine)
		.style("fill", mycolors.black)
		.attr('transform', 'rotate(' + angleScale(rows1[4]) * 180 + ') translate(0, ' + -(smallRadiusPrev + pointerTailLength) + ')');

  // color ring
  // var tickData = ticks.map(function(d) {return scale(d); });
  var colorCircleData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	var arcColor = d3.svg.arc()
		.innerRadius(smallRadiusPrev)
		.outerRadius(colorRadiusPrev)
		.startAngle(function(d, i) {
			return (arcStartAngle - 1 + i * arcTickAngle) * Math.PI;
		})
		.endAngle(function(d, i) {
			return (arcStartAngle - 1 + (i + 1) * arcTickAngle) * Math.PI;
		});

	var gArcPrevColor = gArcPrev.append('g');

	gArcPrevColor.selectAll('path')
		.data(colorCircleData)
	.enter().append('path')
		.attr('fill', function(d, i) {
			return ArcColors[i];
		})
		.attr('d', arcColor);

	gArcPrevColor.selectAll('text')
		.data(colorCircleData)
	.enter().append('text')
		.attr('transform', function(d, i) {
			var newAngle = (arcStartAngle - 1 + (i + 0.5) * arcTickAngle) * 180;
			return 'rotate(' + newAngle +') translate(0, ' + (-smallRadiusPrev - 5) + ')';
		})
		.text(function(d) {return d;})
		.attr("font-family", "Roboto")
		.attr("font-weight", "normal")
		.attr("font-size", "10px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.white);

	// Previous G-Grade
	gArcPrev.append("text")
		.text("PREVIOUS")
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "normal")
		.attr("font-size", "15px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(0, 0)");

	gArcPrev.append("text")
		.text("G-GRADE")
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "lighter")
		.attr("font-size", "15px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(0, 20)");

	gArcPrev.append("text")
		.text(roundFunc(rows1[4]))
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "bold")
		.attr("font-size", "24px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(0, 75)");

	// --- CURRENT G-GRADE
	var gArcCur = svg.append('g')
		.attr("transform", "translate(415, 455)");

	// arc function
	var arcFunc = function(startAngle, endAngle) {
		return d3.scale.linear()
							.domain([0, pathPoints - 1])
					    .range([startAngle, endAngle]);
	}

	// large arc
	var lineArcPrevCur = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(outerRadiusCur)
    .angle(function(d, i) { return arcFunc(arcStartAngle - 1, 1 - arcStartAngle)(i) * Math.PI; });

	gArcCur.append("path").datum(d3.range(pathPoints))
    .attr("d", lineArcPrevCur)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.gray)
    .style("fill", "none");

	// small arc
	var arcSmallCur = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(smallRadiusCur)
    .angle(function(d, i) { return arcFunc(0, 2)(i) * Math.PI; });

	gArcCur.append("path").datum(d3.range(pathPoints))
    .attr("d", arcSmallCur)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.gray)
		.style("stroke-dasharray", ("3, 3"))
    .style("fill", "none");

  // auGroup image
 	gArcCur.append("svg:image")
		.attr("xlink:href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAfCAMAAACS025rAAAC+lBMVEUAAAD///9rjo53mZmAgICZmZmbm7JvioqRlpyzs7OQlpqQl5qQlZiNk5mRl5qSmJqWoacxrlA0r1I3sFRKuGOQl5sXeyobfS6QlpyRlpuQlpswgkIwgkOQlpuQl5qQl5uQl5uQl5uRmJuRmJySmJwVfCmVz6BXimcRfCSQl5sKeR+Lz5iQl5uMxZkKeR8OiyoSjy4TnzUYmTZyx4WP0pyQl5uR056T1J+U0J+Py5x4p4hzkYF1pIeAwJCQl5uPmJx2kYMygkSQl5tnw3yQl5t7v42U0aCPzpyHx5aMuJmQl5tJh1psp34KeR8LeSANhSYRji2Ql5tupoB6v4tPj2Bjk3OQl5tro31ooXtro30OeiOMzpohfjQPkS2Ql5sLeSBuooCQ0p1glnJuoYBio3Jci2uDy5JVlWkpq0mQl5sYfCxan2tbn2sSeycMgyWQl5sLfSILfiIOiSh1x4Z3yIkLeSAnfDgefTE8s1hQumluxYGQl5uM0ZkMeiFtv4B2w4gOeiMwfEEdfTFAtFuQl5sjfTULeSBpun1mwHsKeiCBzJCQl5tJq2N3yYkmfzkmgDpJq2NNrGZHqmFIqmJJqmJsw38PeiQSfyhRt2kKeR8KeiALfCELfSELfiILfyIMgSMMgyUMhCUMhCYMhSYNhCYNhSYNiCgOiCgOjSoOjisPjisPjywPkCwPkS0QlC4QlS8QljARlzARmDERmTIRmzMSnDMSnTQSnjQSnzUSoDUSoDYToDUToDYToTYTojYTojcTozcUozgVozgVpDgVpDkWpDoXojkXpDoXpToXpTsYpTsYpTwZpTsZpTwbpj0cpj4dpz8ep0Afoj8fqEEgqEEgqEIiqEMkqkUlqkYmqkcnqkcnq0coq0gpq0krrEssrEstrUwwrk4wrk8xrk8yqE06rVU6slc+s1pBtF1CtV5It2JLuGRMt2VNuWdYvW9YvXBavnFcv3Ndv3NiwXhjwXhlwnpmw3tsxX9vxoJwxoN0yIZ1yId4yYmQl5vn4b3FAAAAmXRSTlMAAAEBAQEBAgICBAcICgsLDRAQEBAQEhISEhQWFhkcHB0gICAgIyMmKSkwMDA8QEBAQEBAQEBAQENISktMT1BTVVtbYGBiZWdvb3B5f4CAgICAiIiJio+RkpKUlZqfn6CgoKKio6Wmq6+vsrW3u7+/wMDAwMDBx83Pz8/P0NPU1NXd39/f4OHj6O/v7/Dx8vLy8vT09PT5/PzNiFDFAAACUklEQVR42r3UZ1ATQRTA8bX3LnbFU+wY69nFFiuiriX2Xs929hY7WGOJYsNgFBHFSiwItvDQKIgGe2+Iih0bNmRnvBy5Er0hky/8P715M7/ZD7uzKIvLZR5BXEXqqIRyIHtF66pU1ZFYfZWqJuISSIOXIfaCjKuGVkH87lWIcVY+kXzYt3NpGRlplAxC5vBQw4AS3K5hChxaUkgkf6ymdZScfAJZEUELyjoljb9Yr8alF8uZc3sXl3NGaq1Yo9frN/n7b9yw7e1tzuyelNcJQaXLu1eoWMnDo7J7jV6bEwBOGto4I/Jqr70HEDq7qQsEdfgcDeEBnV0hOX/HAWwflTGpN3jy1Cli0xIuAhgmfMuAFBtnPRsp61QUAARO/AGHlxVUJsXn3I2G/wrsnXb5+JZqymTuE1HIiff851HB40sKJPWKRNq9uQAQcenpC7GkJIuNNPkZHxm8vJsPX4+PMRKZdx8gbOvYtq2kFl2zETQwOd589MD+g7ZMMSCRX1Yw7xidH8macZ0nucZ8fWQBMYmkxsLpgNZIgaA87Ve+S3wsdHO9QFbfAtg1KLecTE8nXIVbdO3b316/PqXsZPhrgBPGmT5S3X2tPFGKJ1XT7gCcMR0JEzt2HmzEU0e0boQQ7MUPNE0wIayNoI4pNxTvhWEQ40noIawWu2kxT1iK8CRrp+/PLAqExWodJlqi8fNCLHY4BWVrufB94sMHju3xxjrMERqzGp2G0DqGZTArveQCzXoOG+nYiOZIjbvQmKIwN9CIwpii1QLhy/5vSLnM+ZP/Au5eyc2flYtMAAAAAElFTkSuQmCC")
		// .attr("cx", -50)
		// .attr("cy", -15)
		.attr("height", 31)
		.attr("width", 50)
		.attr("transform", "translate(-25, -35)");

  // ticks
  gArcCur.selectAll('line')
    .data(ticks)
	.enter().append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', function(d, i) {
    	if ((i == 0) || (i == 9)) return outerRadiusCur - smallRadiusCur + 20;
    	else return outerRadiusCur - smallRadiusCur;
    })
    .attr('transform', function(d, i) {
      var newAngle = (arcStartAngle + i * arcTickAngle) * 180;
      return 'rotate(' + newAngle +') translate(0, ' + smallRadiusCur + ')';
    })
    .style('stroke', mycolors.gray)
    .style('stroke-width', '1px')
    .style("stroke-dasharray", ("3, 3"));

	// middle arc
	var arcMiddleCur = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(middleRadiusCur)
    .angle(function(d, i) { return arcFunc(arcStartAngle - 1, angleScale(rows1[5]))(i) * Math.PI; });

	gArcCur.append("path").datum(d3.range(pathPoints))
    .attr("d", arcMiddleCur)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.black)
    .style("fill", "none");

  // pointer
  var pointerHeadLengthCur = outerRadiusCur - smallRadiusCur - pointerTailLength;
	var pointerDataCur = [ [pointerWidth / 2, 0],
					[0, -pointerHeadLengthCur],
					[-(pointerWidth / 2), 0],
					[0, pointerTailLength],
					[pointerWidth / 2, 0] ];

	var pgCur = gArcCur.append('g').data([pointerDataCur]);
	pointer = pgCur.append('path')
		.attr('d', pointerLine)
		.style("fill", mycolors.black)
		.attr('transform', 'rotate(' + angleScale(rows1[5]) * 180 + ') translate(0, ' + -(smallRadiusCur + pointerTailLength) + ')');

  // color ring
	var arcColorCur = d3.svg.arc()
		.innerRadius(smallRadiusCur)
		.outerRadius(colorRadiusCur)
		.startAngle(function(d, i) {
			return (arcStartAngle - 1 + i * arcTickAngle) * Math.PI;
		})
		.endAngle(function(d, i) {
			return (arcStartAngle - 1 + (i + 1) * arcTickAngle) * Math.PI;
		});

	var gArcCurColor = gArcCur.append('g');

	gArcCurColor.selectAll('path')
		.data(colorCircleData)
	.enter().append('path')
		.attr('fill', function(d, i) {
			return ArcColors[i];
		})
		.attr('d', arcColorCur);

	gArcCurColor.selectAll('text')
		.data(colorCircleData)
	.enter().append('text')
		.attr('transform', function(d, i) {
			var newAngle = (arcStartAngle - 1 + (i + 0.5) * arcTickAngle) * 180;
			return 'rotate(' + newAngle +') translate(0, ' + (-smallRadiusCur - 6) + ')';
		})
		.text(function(d) {return d;})
		.attr("font-family", "Roboto")
		.attr("font-weight", "normal")
		.attr("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.white);

	// Current G-Grade
	gArcCur.append("text")
		.text("CURRENT")
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "normal")
		.attr("font-size", "18px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(0, 20)");

	gArcCur.append("text")
		.text("G-GRADE")
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "lighter")
		.attr("font-size", "15px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(0, 40)");

	gArcCur.append("text")
		.text(roundFunc(rows1[5]))
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "bold")
		.attr("font-size", "65px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(0, 120)");

	// --- SPREAD
	var gArcSpread = svg.append('g')
		.attr("transform", "translate(680, 480)");

	// large arc
	gArcSpread.append("path").datum(d3.range(pathPoints))
    .attr("d", lineArcPrev)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.gray)
    .style("fill", "none");

	// small arc
	gArcSpread.append("path").datum(d3.range(pathPoints))
    .attr("d", arcSmall)
		.attr("stroke-width", 1)
		.attr("stroke", mycolors.gray)
		.style("stroke-dasharray", ("3, 3"))
    .style("fill", "none");

  // ticks
  gArcSpread.selectAll('line')
    .data(ticks)
	.enter().append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', function(d, i) {
    	if ((i == 0) || (i == 9)) return outerRadiusPrev - smallRadiusPrev + 20;
    	else return outerRadiusPrev - smallRadiusPrev;
    })
    .attr('transform', function(d, i) {
      var newAngle = (arcStartAngle + i * arcTickAngle) * 180;
      return 'rotate(' + newAngle +') translate(0, ' + smallRadiusPrev + ')';
    })
    .style('stroke', mycolors.gray)
    .style('stroke-width', '1px')
    .style("stroke-dasharray", ("3, 3"));

	// middle arc - MIN
	var arcMiddleSpreadMin = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(middleRadiusSpreadMin)
    .angle(function(d, i) { return arcFunc(arcStartAngle - 1, angleScale(rows1[6]))(i) * Math.PI; });

	gArcSpread.append("path").datum(d3.range(pathPoints))
    .attr("d", arcMiddleSpreadMin)
		.attr("stroke-width", 1)
		.attr("stroke", ArcColors[0])
    .style("fill", "none");

  // pointer
	var pgSpreadMin = gArcSpread.append('g').data([pointerData]);
	pointer = pgSpreadMin.append('path')
		.attr('d', pointerLine)
		// .attr("stroke", ArcColors[0])
    .style("fill", ArcColors[0])
		.attr('transform', 'rotate(' + angleScale(rows1[6]) * 180 + ') translate(0, ' + -(smallRadiusPrev + pointerTailLength) + ')');

	// middle arc - MAX
	var arcMiddleSpreadMax = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(middleRadiusSpreadMax)
    .angle(function(d, i) { return arcFunc(arcStartAngle - 1, angleScale(rows1[7]))(i) * Math.PI; });

	gArcSpread.append("path").datum(d3.range(pathPoints))
    .attr("d", arcMiddleSpreadMax)
		.attr("stroke-width", 1)
		.attr("stroke", ArcColors[8])
    .style("fill", "none");

  // pointer
	var pgSpreadMax = gArcSpread.append('g').data([pointerData]);
	pointer = pgSpreadMax.append('path')
		.attr('d', pointerLine)
		.style("fill", ArcColors[8])
		.attr('transform', 'rotate(' + angleScale(rows1[7]) * 180 + ') translate(0, ' + -(smallRadiusPrev + pointerTailLength) + ')');

  // color ring
	var gArcSpreadColor = gArcSpread.append('g');

	gArcSpreadColor.selectAll('path')
		.data(colorCircleData)
	.enter().append('path')
		.attr('fill', function(d, i) {
			return ArcColors[i];
		})
		.attr('d', arcColor);

	gArcSpreadColor.selectAll('text')
		.data(colorCircleData)
	.enter().append('text')
		.attr('transform', function(d, i) {
			var newAngle = (arcStartAngle - 1 + (i + 0.5) * arcTickAngle) * 180;
			return 'rotate(' + newAngle +') translate(0, ' + (-smallRadiusPrev - 5) + ')';
		})
		.text(function(d) {return d;})
		.attr("font-family", "Roboto")
		.attr("font-weight", "normal")
		.attr("font-size", "10px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.white);

	// SPREAD
	gArcSpread.append("text")
		.text("SPREAD")
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "normal")
		.attr("font-size", "15px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.black)
		.attr("transform", "translate(0, 5)");

	gArcSpread.append("text")
		.text("MIN")
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "lighter")
		.attr("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("fill", ArcColors[0])
		.attr("transform", "translate(-20, 60)");

	gArcSpread.append("text")
		.text(rows1[6])
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "bold")
		.attr("font-size", "24px")
		.attr("text-anchor", "middle")
		.attr("fill", ArcColors[0])
		.attr("transform", "translate(-20, 80)");

	gArcSpread.append("text")
		.text("MAX")
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "lighter")
		.attr("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("fill", ArcColors[8])
		.attr("transform", "translate(20, 60)");

	gArcSpread.append("text")
		.text(rows1[7])
		.attr("font-family", "Roboto Condensed")
		.attr("font-weight", "bold")
		.attr("font-size", "24px")
		.attr("text-anchor", "middle")
		.attr("fill", ArcColors[8])
		.attr("transform", "translate(20, 80)");

	// ----- Bar charts

	// Name: makeBarChartData
	// Func: generate graph data used to draw from original data
	// Param: rowData (ex: ['n/a', 'n/a', 5.3, 'n/a', 10.038])

	var makeBarChartData = function(rowData) {

		var k = 0, pIndex = 0;
		var numData = [];

		var result = {};
		result.barData = [];
		result.lineData = [];
		result.empty = false;

		for (var i = 0; i < rowData.length; i++) {

			result.barData[k] = {};

			if (rowData[i] == 'n/a') {
				if (k > 0) {
					result.barData[k].value = result.barData[k - 1].value;
					result.barData[k].label = 'N/A';
					result.barData[k].showBar = false;
					result.barData[k].startNA = result.barData[k - 1].startNA;
					k++;

					if (pIndex > 0) {
						result.lineData[pIndex] = {};
						result.lineData[pIndex].value = result.lineData[pIndex - 1].value;
						result.lineData[pIndex].x = rows2names[7 + i];	//result.lineData[pIndex - 1].x + 1;
						pIndex++;
					}
				}
				else {	// these are continous 'n/a' values from the start of data array
					result.barData[k].value = 0;
					result.barData[k].label = 'N/A';
					result.barData[k].showBar = false;
					result.barData[k].startNA = true;
					k++;
				}
			}
			else {
				numData.push(rowData[i]);

				result.barData[k].value = rowData[i];
				result.barData[k].label = (rowData[i].toString().length > 1) ? rowData[i].toFixed(1) : rowData[i];
				result.barData[k].showBar = true;
				result.barData[k].startNA = false;
				k++;

				result.lineData[pIndex] = {};
				result.lineData[pIndex].value = rowData[i];
				result.lineData[pIndex].x = rows2names[7 + i];
				pIndex++;
			}
		}

		if (pIndex > 0) {		// has numeric data
			result.min = d3.min(numData);
			result.max = d3.max(numData);
		}
		else {	// all data is "n/a"
			result.empty = true;
		}
		return result;
	}

	// Name: drawBarChart
	// Func: draw a BarChart graph
	// Param: graph data
	// 				var offsetData = { g: {x: 230, y: 870}, title_1: {x: 80, y:10}, title_2: {x: 80, y:22}, estimated: {x: 110, y: 158}, forecast: {x: 146, y: 158} };
	// 				var barData = { barWidth: 200, barHeight: 100, barHeightOffset: 50, divideLineInterval: 8, graph: graphData };
	// 				var textData = { title_1: rows2.d[5].toUpperCase(), title_2: '(' + rows2.d[6] + ')' };
	//				var fontData = { title_1: '12px', title_2: '9px', year: '8px', bar: '10px', estimated: '8px' };

	var drawBarChart = function(_svg, _barData, _textData, _fontData, _offset) {

		var graphData = makeBarChartData(_barData.graph);
		var divideLineData = [];

		var gBar = _svg.append('g')
			.attr("transform", "translate(" + _offset.g.x + "," + _offset.g.y + ")");

		var x = d3.scale.ordinal()
		    .rangeRoundBands([0, _barData.barWidth], 0.85, 0.3);
		x.domain(xData);

		var xAxis = d3.svg.axis()
	    .scale(x)
	    .outerTickSize(0)
	    .orient("bottom");

	  var lineCurvePop = d3.svg.line()
	    .interpolate("monotone")
	    .x(function(d) { return d.x; })
	    .y(function(d) { return d.y; });

		// title
		gBar.append("text")
			.text(_textData.title_1)
			.attr("font-family", "Roboto Condensed")
			.attr("font-weight", "bold")
			.attr("font-size", _fontData.title_1)
			.attr("text-anchor", "middle")
			.attr("fill", mycolors.black)
			.attr("transform", "translate(" + _offset.title_1.x + "," + _offset.title_1.y + ")");

		gBar.append("text")
			.text(_textData.title_2)
			.attr("font-family", "Roboto Condensed")
			.attr("font-weight", "lighter")
			.attr("font-size", _fontData.title_2)
			.attr("text-anchor", "middle")
			.attr("fill", mycolors.black)
			.attr("transform", "translate(" + _offset.title_2.x + "," + _offset.title_2.y + ")");

		// graph
	  gBar.append("g")
	  	.attr("class", "axis")
	    .attr("transform", "translate(0," + (_barData.barHeight + _barData.barHeightOffset) + ")")
	    .call(xAxis);

		if (graphData.empty) {

		  gBar.selectAll('.axis path')
		  	.style("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", mycolors.black)
				// .style("stroke-dasharray", ("3, 3"))
				.style("shape-rendering", "crispEdges");

		  gBar.selectAll('.tick text')
				.attr("font-family", "Roboto Condensed")
				.attr("font-weight", function(d, i) { return (i < 3) ? "lighter" : "bold";})
				.attr("font-size", _fontData.year)
				.attr("text-anchor", "middle")
		  	.style("fill", function(d, i) { return (i < 3) ? mycolors.black : mycolors.bar_2;});

		  // texts on top of bars
		  gBar.selectAll(".topText")
		    .data(xData)
		  .enter().append("text")
		    .attr("class", "topText")
		    .text("N/A")
				.attr("font-family", "Roboto Condensed")
				.attr("font-weight", "bold")
				.attr("font-size", _fontData.bar)
				.attr("text-anchor", "middle")
		    .attr("fill", function(d, i) { return (i < 3) ? mycolors.black : mycolors.bar_2;})
		    .attr("transform", function(d, i) { return "translate(" + (x(xData[i]) + x.rangeBand() / 2) + "," + (_barData.barHeight + _barData.barHeightOffset - 8) + ")"; });

			// end line circle
			gBar.append("circle")
				.attr("cx", _barData.barWidth - 2)
				.attr("cy", _barData.barHeight + _barData.barHeightOffset)
				.attr("r", 2)
				.style("fill", mycolors.black);
		}
		else {

			if (graphData.min < 0) {	// we need to draw red line

			  if (graphData.max < 0) {	// graph height = total height * 1/4

					y = d3.scale.linear()
				    .range([_barData.barHeight / 2, _barData.barHeight * 0.75]);

			  	y.domain([graphData.min, 0]);
			  }
			  else {	// graph height = total height * 1/2
					y = d3.scale.linear()
				    .range([_barData.barHeight / 2, _barData.barHeight]);

			    y.domain([graphData.min, graphData.max]);
			  }

			  gBar.selectAll('.axis path')
			  	.style("fill", "none")
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.gray)
					.style("stroke-dasharray", ("3, 3"))
					.style("shape-rendering", "crispEdges");

			  gBar.selectAll('.tick text')
					.attr("font-family", "Roboto Condensed")
					.attr("font-weight", function(d, i) { return (i < 3) ? "lighter" : "bold";})
					.attr("font-size", _fontData.year)
					.attr("text-anchor", "middle")
			  	.style("fill", function(d, i) { return (i < 3) ? mycolors.black : mycolors.bar_2;});

			  gBar.selectAll(".bar")
			    .data(graphData.barData)
			  .enter().append("rect")
			    .attr("class", "bar")
			    .attr("x", function(d, i) { return x(xData[i]); })
			    .attr("width", x.rangeBand())
			    .attr("y", function(d) {
			    	if (d.value > 0)
			    		return _barData.barHeight - y(d.value) + (y(0) - _barData.barHeight / 2) + _barData.barHeightOffset;
			    	else
			  	    return _barData.barHeight / 2 + _barData.barHeightOffset;
			   	})
			    .attr("height", function(d) { return Math.abs(y(d.value) - y(0)); })
			    .style("display", function(d) { return d.showBar ? "block" : "none" })
			    .attr("fill", function(d, i) { return (i < 3) ? (d.value > 0) ? mycolors.bar_1 : mycolors.bar_3 : mycolors.bar_2;});

			  // texts on top of bars
			  gBar.selectAll(".topText")
			    .data(graphData.barData)
			  .enter().append("text")
			    .attr("class", "topText")
			    .text(function(d) { return d.label; })
					.attr("font-family", "Roboto Condensed")
					.attr("font-weight", "bold")
					.attr("font-size", _fontData.bar)
					.attr("text-anchor", "middle")
			    .attr("fill", function(d, i) { return (i < 3) ? mycolors.black : mycolors.bar_2;})
			    .attr("transform", function(d, i) {
			    	if (d.value < 0) {
			    		return "translate(" + (x(xData[i]) + x.rangeBand() / 2) + "," +
			    						(_barData.barHeight - y(d.value) + (y(0) - _barData.barHeight / 2) + _barData.barHeightOffset + 12) + ")";
			    	}
			    	else {
			    		return "translate(" + (x(xData[i]) + x.rangeBand() / 2) + "," +
			    						(_barData.barHeight - y(d.value) + (y(0) - _barData.barHeight / 2) + _barData.barHeightOffset - 8) + ")";
			    	}
			    });

			  // divide lines of each bar
			  graphData.barData.map(function(d, i) {
			  	var count = (Math.abs(y(d.value) - y(0)) - 1) / _barData.divideLineInterval;
			  	var newInterval = (d.value > 0) ? -_barData.divideLineInterval : _barData.divideLineInterval;
			  	for (var j = 0; j < count; j++) {
			  		divideLineData.push({x: x(xData[i]), y: (_barData.barHeight / 2 + _barData.barHeightOffset + (j + 1) * newInterval)});
			  	}
			  });

			  gBar.selectAll(".divLine")
			    .data(divideLineData)
			  .enter().append("line")
			  	.attr("class", "divLine")
					.attr("x1", function(d) { return d.x; })
					.attr("y1", function(d) { return d.y; })
					.attr("x2", function(d) { return d.x + x.rangeBand(); })
					.attr("y2", function(d) { return d.y; })
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.white)
					.style("shape-rendering", "crispEdges");

				// base line
			  gBar.append("line")
					.attr("x1", 0)
					.attr("y1", _barData.barHeight / 2 + _barData.barHeightOffset)
					.attr("x2", _barData.barWidth)
					.attr("y2", _barData.barHeight / 2 + _barData.barHeightOffset)
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.bar_3)
					.style("shape-rendering", "crispEdges");

			  // top curve line
			  var barLinePoints = [];
			  graphData.lineData.map(function(d, i) {

			  	var yPos = _barData.barHeight - y(d.value) + (y(0) - _barData.barHeight / 2) + _barData.barHeightOffset;

			  	if (i == 0) {
			  		barLinePoints.push({x: (x(d.x) + x.rangeBand()), y: yPos});
			  	}
			  	else if (i == graphData.lineData.length - 1) {
			  		barLinePoints.push({x: x(d.x), y: yPos});
			  	}
			  	else {
			  		barLinePoints.push({x: x(d.x), y: yPos});
			  		barLinePoints.push({x: (x(d.x) + x.rangeBand()), y: yPos});
			  	}
			  });

			  // start line segment
				gBar.append("line")
					.attr("x1", barLinePoints[0].x - x.rangeBand() * 3)
					.attr("y1", barLinePoints[0].y)
					.attr("x2", barLinePoints[0].x)
					.attr("y2", barLinePoints[0].y)
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.black)
					.style("shape-rendering", "crispEdges");

			  // end line segment
				gBar.append("line")
					.attr("x1", _barData.barWidth)
					.attr("y1", barLinePoints[barLinePoints.length - 1].y)
					.attr("x2", barLinePoints[barLinePoints.length - 1].x)
					.attr("y2", barLinePoints[barLinePoints.length - 1].y)
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.black)
					.style("shape-rendering", "crispEdges");

				// middle lines
				gBar.append('path')
				  .attr('d', lineCurvePop(barLinePoints))
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.black)
					.attr("fill", "none");

				// end line circle
				gBar.append("circle")
					.attr("cx", _barData.barWidth - 2)
					.attr("cy", barLinePoints[barLinePoints.length - 1].y)
					.attr("r", 2)
					.style("fill", mycolors.black);
			}
			else {		// all values are positive

				y = d3.scale.linear()
			    .range([_barData.barHeight / 2, _barData.barHeight]);

			  y.domain([graphData.min, graphData.max]);

			  gBar.selectAll('.axis path')
			  	.style("fill", "none")
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.gray)
					.style("stroke-dasharray", ("3, 3"))
					.style("shape-rendering", "crispEdges");

			  gBar.selectAll('.tick text')
					.attr("font-family", "Roboto Condensed")
					.attr("font-weight", function(d, i) { return (i < 3) ? "lighter" : "bold";})
					.attr("font-size", _fontData.year)
					.attr("text-anchor", "middle")
			  	.style("fill", function(d, i) { return (i < 3) ? mycolors.black : mycolors.bar_2;});

			  gBar.selectAll(".bar")
			    .data(graphData.barData)
			  .enter().append("rect")
			    .attr("class", "bar")
			    .attr("x", function(d, i) { return x(xData[i]); })
			    .attr("width", x.rangeBand())
			    .attr("y", function(d) { return _barData.barHeight + _barData.barHeightOffset - y(d.value); })
			    .attr("height", function(d) { return y(d.value); })
			    .style("display", function(d) { return d.showBar ? "block" : "none" })
			    .attr("fill", function(d, i) { return (i < 3) ? mycolors.bar_1 : mycolors.bar_2;});

			  // texts on top of bars
			  gBar.selectAll(".topText")
			    .data(graphData.barData)
			  .enter().append("text")
			    .attr("class", "topText")
			    .text(function(d) { return d.label; })
					.attr("font-family", "Roboto Condensed")
					.attr("font-weight", "bold")
					.attr("font-size", _fontData.bar)
					.attr("text-anchor", "middle")
			    .attr("fill", function(d, i) { return (i < 3) ? mycolors.black : mycolors.bar_2;})
			    .attr("transform", function(d, i) {
			    	if ((d.label == 'N/A') && d.startNA)
			    		return "translate(" + (x(xData[i]) + x.rangeBand() / 2) + "," + (_barData.barHeight + _barData.barHeightOffset - 8) + ")";
			    	else
			    		return "translate(" + (x(xData[i]) + x.rangeBand() / 2) + "," + (_barData.barHeight + _barData.barHeightOffset - 8 - y(d.value)) + ")";
					});

			  // divide lines of each bar
			  divideLineData = [];
			  graphData.barData.map(function(d, i) {
			  	var count = (y(d.value) - 1) / _barData.divideLineInterval;
			  	for (var j = 0; j < count; j++) {
			  		divideLineData.push({x: x(xData[i]), y: (_barData.barHeight + _barData.barHeightOffset - (j + 1) * _barData.divideLineInterval)});
			  	}
			  });

			  gBar.selectAll(".divLine")
			    .data(divideLineData)
			  .enter().append("line")
			  	.attr("class", "divLine")
					.attr("x1", function(d) { return d.x; })
					.attr("y1", function(d) { return d.y; })
					.attr("x2", function(d) { return d.x + x.rangeBand(); })
					.attr("y2", function(d) { return d.y; })
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.white)
					.style("shape-rendering", "crispEdges");

			  // top curve line
			  var barLinePoints = [];
			  graphData.lineData.map(function(d, i) {

			  	if (i == 0) {
			  		barLinePoints.push({x: (x(d.x) + x.rangeBand()), y: (_barData.barHeight + _barData.barHeightOffset - y(d.value))});
			  	}
			  	else if (i == graphData.lineData.length - 1) {
			  		barLinePoints.push({x: x(d.x), y: (_barData.barHeight + _barData.barHeightOffset - y(d.value))});
			  	}
			  	else {
			  		barLinePoints.push({x: x(d.x), y: (_barData.barHeight + _barData.barHeightOffset - y(d.value))});
			  		barLinePoints.push({x: (x(d.x) + x.rangeBand()), y: (_barData.barHeight + _barData.barHeightOffset - y(d.value))});
			  	}
			  });

			  // start line segment
				gBar.append("line")
					.attr("x1", barLinePoints[0].x - x.rangeBand() * 3)
					.attr("y1", barLinePoints[0].y)
					.attr("x2", barLinePoints[0].x)
					.attr("y2", barLinePoints[0].y)
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.black)
					.style("shape-rendering", "crispEdges");

			  // end line segment
				gBar.append("line")
					.attr("x1", _barData.barWidth)
					.attr("y1", barLinePoints[barLinePoints.length - 1].y)
					.attr("x2", barLinePoints[barLinePoints.length - 1].x)
					.attr("y2", barLinePoints[barLinePoints.length - 1].y)
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.black)
					.style("shape-rendering", "crispEdges");

				// middle lines
				gBar.append('path')
				  .attr('d', lineCurvePop(barLinePoints))
					.attr("stroke-width", 1)
					.attr("stroke", mycolors.black)
					.attr("fill", "none");

				// end line circle
				gBar.append("circle")
					.attr("cx", _barData.barWidth - 2)
					.attr("cy", barLinePoints[barLinePoints.length - 1].y)
					.attr("r", 2)
					.style("fill", mycolors.black);
			}
		}

	  // estimated, forecast
		gBar.append("text")
			.text("(estimated)")
			.attr("font-family", "Roboto Condensed")
			.attr("font-weight", "normal")
			.attr("font-size", _fontData.estimated)
			.attr("text-anchor", "middle")
			.attr("fill", mycolors.bar_2)
			.attr("transform", "translate(" + _offset.estimated.x + "," + _offset.estimated.y + ")");

		gBar.append("text")
			.text("(forecast)")
			.attr("font-family", "Roboto Condensed")
			.attr("font-weight", "normal")
			.attr("font-size", _fontData.estimated)
			.attr("text-anchor", "middle")
			.attr("fill", mycolors.bar_2)
			.attr("transform", "translate(" + _offset.forecast.x + "," + _offset.forecast.y + ")");
	}

	// --- Population

	var offsetData = { g: {x: 70, y: 630}, title_1: {x: 100, y:10}, title_2: {x: 100, y:25}, estimated: {x: 138, y: 179}, forecast: {x: 184, y: 179} };
	var barData = { barWidth: 200, barHeight: 100, barHeightOffset: 50, divideLineInterval: 7,
									graph: [rows2.e[7], rows2.e[8], rows2.e[9], rows2.e[10], rows2.e[11]] };
	var textData = { title_1: rows2.e[5].toUpperCase(), title_2: '(' + rows2.e[6] + ')' };
	var fontData = { title_1: '12px', title_2: '9px', year: '10px', bar: '10px', estimated: '10px' };

	drawBarChart(svg, barData, textData, fontData, offsetData);

	// --- GROSS DOMESTIC PRODUCT
	offsetData.g.x = 310;
	barData.graph = [rows2.a[7], rows2.a[8], rows2.a[9], rows2.a[10], rows2.a[11]];
	textData = { title_1: rows2.a[5].toUpperCase(), title_2: '(' + rows2.a[6] + ')' };

	drawBarChart(svg, barData, textData, fontData, offsetData);

	// --- GROSS DOMESTIC PRODUCT per CAPITA
	offsetData.g.x = 560;
	barData.graph = [rows2.b[7], rows2.b[8], rows2.b[9], rows2.b[10], rows2.b[11]];
	textData = { title_1: rows2.b[5].toUpperCase(), title_2: '(' + rows2.b[6] + ')' };

	drawBarChart(svg, barData, textData, fontData, offsetData);

	// --- INFLATION
	offsetData = { g: {x: 32, y: 870}, title_1: {x: 80, y:10}, title_2: {x: 80, y:22}, estimated: {x: 110, y: 158}, forecast: {x: 146, y: 158} };
	barData = { barWidth: 160, barHeight: 84, barHeightOffset: 50, divideLineInterval: 6,
									graph: [rows2.c[7], rows2.c[8], rows2.c[9], rows2.c[10], rows2.c[11]] };
	textData = { title_1: rows2.c[5].toUpperCase(), title_2: '(' + rows2.c[6] + ')' };
	fontData = { title_1: '12px', title_2: '9px', year: '8px', bar: '10px', estimated: '8px' };

	drawBarChart(svg, barData, textData, fontData, offsetData);

	// --- UNEMPLOYEMENT RATE
	offsetData.g.x = 230;
	barData.graph = [rows2.d[7], rows2.d[8], rows2.d[9], rows2.d[10], rows2.d[11]];
	textData = { title_1: rows2.d[5].toUpperCase(), title_2: '(' + rows2.d[6] + ')' };

	drawBarChart(svg, barData, textData, fontData, offsetData);

	// --- GENERAL GOVERNMENT GROSS DEBT
	offsetData.g.x = 420;
	barData.graph = [rows2.f[7], rows2.f[8], rows2.f[9], rows2.f[10], rows2.f[11]];
	textData = { title_1: rows2.f[5].toUpperCase(), title_2: '(' + rows2.f[6] + ')' };

	drawBarChart(svg, barData, textData, fontData, offsetData);

	// --- CURRENT ACCOUNT BALANCE
	offsetData.g.x = 630;
	barData.graph = [rows2.g[7], rows2.g[8], rows2.g[9], rows2.g[10], rows2.g[11]];
	textData = { title_1: rows2.g[5].toUpperCase(), title_2: '(' + rows2.g[6] + ')' };

	drawBarChart(svg, barData, textData, fontData, offsetData);

	// ---------- Bottom ----------
	// Source : International Monetary Fund
	svg.append("text")
		.text("Source : International Monetary Fund")
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "10px")
		.attr("font-style", "italic")
		.attr("text-decoration", "underline")
		.attr("fill", mycolors.source)
		.attr("transform", "translate(30,1080)");

	// Italie - Europe
	svg.append("text")
		.text( rows1[1] + " - ")
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "12px")
		.attr("font-style", "italic")
		.attr("text-anchor", "end")
		.attr("fill", mycolors.main)
		.attr("transform", "translate(415,1140)");

	svg.append("text")
		.text(rows1[3])
		.attr("font-family", "Roboto")
		.attr("font-weight", "lighter")
		.attr("font-size", "12px")
		.attr("font-style", "italic")
		.attr("fill", mycolors.main)
		.attr("transform", "translate(418,1140)");

	// page
	svg.append("rect")
		.attr("x", "771")
		.attr("y", height - 125)
		.attr("width", "57px")
		.attr("height", "125px")
		.attr("fill", mycolors.second);

	svg.append("text")
		.text("Page")
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.main)
		.attr("transform", "translate(790,1110) rotate(-90)");

	svg.append("text")
		.text(thepage)
		.attr("font-family", "Roboto")
		.attr("font-weight", "bold")
		.attr("font-size", "15px")
		.attr("text-anchor", "middle")
		.attr("fill", mycolors.main)
		.attr("transform", "translate(810,1110) rotate(-90)");
}