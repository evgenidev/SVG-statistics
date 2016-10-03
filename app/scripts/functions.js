/*global _,this_index,iso,DocumentTitle,google,mainregion,mapingCountry,mfrinit:true,StartCountryPage,Blob,saveAs,jsPDF,svgElementToPdf,goD3,goD3demo*/
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

function getInput(){
	DocumentTitle = $("#documenttitle").val();
	StartCountryPage = $("#pagestartnb").val();
}

function dynamicSort(property) {
    return function (obj1,obj2) {
        return obj1[property].toLowerCase() > obj2[property].toLowerCase() ? 1
            : obj1[property].toLowerCase() < obj2[property].toLowerCase() ? -1 : 0;
    };
}
function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    };
}

function parseXlsSheetColnames(workbook, mysheet){
	var sheet_name_list = workbook.SheetNames;
	var colnames= [];
	var alfabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var i=1;

	var nbcol = 0;
	var alfa_cursor = 1;

	var maincell = workbook.Sheets[sheet_name_list[mysheet]]['A'+i];
	if( typeof(maincell) !== "undefined" && ( String(maincell.v).length > 0 ) ) {
		//ok country is here
		colnames[nbcol]=maincell.v;
		nbcol++;
		maincell = workbook.Sheets[sheet_name_list[mysheet]][alfabet[alfa_cursor]+i];
		//console.log( "cel :"+ alfabet[alfa_cursor]);
		while( typeof(maincell) !== "undefined" && ( String(maincell.v).length > 0 ) ) {
			colnames[nbcol]=maincell.v;
			nbcol++;
			alfa_cursor++;
			maincell = workbook.Sheets[sheet_name_list[mysheet]][alfabet[alfa_cursor]+i];
			//console.log( "cheking cel :"+ alfabet[alfa_cursor]);
		}

		//console.log(nbcol);
		//console.log(alfabet[nbcol]);

		//console.log ("il y a "+nbcol+" colonne dans ce tableau");
		//console.log(colnames);
		return colnames;
	}
}
function parseXlsSheet(workbook, mysheet,rowsXSL){

	var sheet_name_list = workbook.SheetNames;
	var colnames= [];
	var alfabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var i=1;

	var nbcol = 0;
	var alfa_cursor = 1;

	var maincell = workbook.Sheets[sheet_name_list[mysheet]]['A'+i];
	if( typeof(maincell) !== "undefined" && ( String(maincell.v).length > 0 ) ) {
		//ok country is here
		colnames[nbcol]=maincell.v;
		nbcol++;
		maincell = workbook.Sheets[sheet_name_list[mysheet]][alfabet[alfa_cursor]+i];
		//console.log( "cel :"+ alfabet[alfa_cursor]);
		while( typeof(maincell) !== "undefined" && ( String(maincell.v).length > 0 ) ) {
			colnames[nbcol]=maincell.v;
			nbcol++;
			alfa_cursor++;
			maincell = workbook.Sheets[sheet_name_list[mysheet]][alfabet[alfa_cursor]+i];
			//console.log( "cheking cel :"+ alfabet[alfa_cursor]);
		}

		//console.log(nbcol);
		//console.log(alfabet[nbcol]);

		//console.log ("il y a "+nbcol+" colonne dans ce tableau");
		//console.log(colnames);


		// 2/ recupération des données
		alfa_cursor = 0;
		i++; //on va sur les données
		maincell = workbook.Sheets[sheet_name_list[mysheet]][alfabet[alfa_cursor]+i];
		while( typeof(maincell) !== "undefined" && ( String(maincell.v).length > 0 ) ) {

			// gestion ligne par ligne
			var tmp=[];
			tmp[alfa_cursor]=maincell.v;
			while(alfa_cursor<nbcol){
				//console.log(alfabet[alfa_cursor]+i);
				maincell = workbook.Sheets[sheet_name_list[mysheet]][alfabet[alfa_cursor]+i];
				if(typeof(maincell) !== "undefined" && ( String(maincell.v).length > 0 )){
					// ici a voir pour faire des tests de valeur type !isNaN(maincell.v)
					tmp[alfa_cursor]=maincell.v;
				}else{
					tmp[alfa_cursor]="";
				}

				alfa_cursor++;
			}
			rowsXSL.push(tmp);

			alfa_cursor=0;
			i++;
			maincell = workbook.Sheets[sheet_name_list[mysheet]][alfabet[alfa_cursor]+i];

		}
		//ok ici nous avons tous notre excel dans le tableau rowsXSL
		//console.log(rowsXSL);
		return rowsXSL;

	}else{
		//NOK no country !! RAISE EROR
		alert('la premiere celulle du premier onglet est vide !');
	}
}
function drawRegionsMap() {

	//console.log(mainregion);

	var data = google.visualization.arrayToDataTable([
		['Country', 'Population'],
		[mainregion, 1324]
	]);

	//var myregion = '150';

	//console.log(mainregion);
	var myregion = mapingCountry.filter(function(v,i) {
		return v[4] === mainregion;
	});
	//console.log(myregion);
	myregion = myregion[0][2]; //2 pour le continent zoomé sinon 0
	//console.log(myregion);

	if(this_index == "999999"){
	var mycolors = ZoneColors[1];
	}else {
	var rows1 = rowsXSL1[this_index];
	var mycolors = ZoneColors[rows1[2]];
	}

	var options = {
	/*
		datalessRegionColor: '#FA61DB',
		backgroundColor: '#81d4fa',
		'backgroundColor.fill' : '#FABA61'
	*/
		datalessRegionColor:mycolors.country,
		colorAxis: {colors: ['#fff']}, // white
		legend:'none',
		'tooltip.trigger':'none',
		enableRegionInteractivity : false,
		region: myregion,
		//keepAspectRatio: false,
		//width: '120',
		height: '100'
	};

	var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
	if(!mfrinit){
		mfrinit = false;
	} else {
		chart.clearChart();
	}
	chart.draw(data, options);
	google.visualization.events.addListener(chart, 'ready', ChartReady);
}
function ChartReady(){
	//$("#svg svg").append($("#regions_div div div").html());
	console.log("Google Chart Done ... go and do the Complete Page with D3");
	goD3(this_index, iso);
	//console.log('Should running file dl ...');
	//runFileDownload();
}
function runFileDownload(){
	//console.log('COUCOU');

	var this_index = $('#d3results a.active').attr('attr-ind');
	var this_iso = $('#d3results a.active').attr('attr-iso');

	//console.log(this_index);
	//console.log(this_iso);

	var thepage = Number(this_index) + StartCountryPage;
	var thepage_str = thepage;
	if(thepage<10){thepage_str='0'+thepage_str;}
	if(thepage<100){thepage_str='0'+thepage_str;}
	if(thepage<1000){thepage_str='0'+thepage_str;}


	var today = new Date();
	var mi = today.getMinutes();
	var hh = today.getHours();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(mi<10){mi='0'+mi;}
	if(hh<10){hh='0'+hh;}
	if(dd<10){dd='0'+dd;}
	if(mm<10){mm='0'+mm;}

	//data:image/svg+xml;base64,\n"+b64+"


	//var filename = 'AU-GROUP-'+iso+"__"+yyyy+'-'+mm+'-'+dd+'--'+hh+'h'+mi+'.svg';
	var filename = thepage_str+'-'+this_iso+"__"+yyyy+'-'+mm+'-'+dd+'--'+hh+'h'+mi+'.svg';
	//console.log('fileDL ... '+filename);
	var blob = new Blob([$("#svg").html()], {type: "image/svg+xml;charset=utf-8"});
	saveAs(blob, filename);


}