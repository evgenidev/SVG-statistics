/*global Blob,XlsTemplate,saveAs,getInput,handleXlsDemo,handleXls,uploadXls,goD3,mainregion:true,drawRegionsMap,goD3demo,runFileDownload*/

var this_index, iso;

$(function(){
	/*	
	$("#Retry").on("click",function(e){
		$("#dropfile-xls").show();
		$("#process-xls").html('').show();
		$("#result-xls").hide();
		$("#tablediv-xls").html('');
		$("#warning-xls").hide();

	});
	*/
	
	
	$('#d3results').on("click","a",function(e){
		$('#d3results a').removeClass('active');
		$(this).addClass('active');
		$(this).html('<b>TESTED___</b>'+$(this).html());
		
		window.location.hash = '#graph';
		$('.nav-tabs a[href="#graph"]').tab('show');
		
		this_index = $(this).attr('attr-ind');
		iso = $(this).attr('attr-iso');
		//goD3(this_index,iso);
		getInput();
		mainregion = iso.toUpperCase();
		drawRegionsMap();	
	});	
	

	$('.loaddemo').on("click", function(e){
		
		$(this).hide();
		$("#loaddemoinfo").html("loading ...");
		
		
		
		console.log("go load;");

		var url = "/"+$(this).attr("attr-file");
		//2015-03-Fichier-agence-V3.xls
		var oReq = new XMLHttpRequest();
		oReq.open("GET", url, true);
		oReq.responseType = "arraybuffer";
		
		oReq.onload = function(e) {
			var arraybuffer = oReq.response;
		
			/* convert data to binary string */
			var data = new Uint8Array(arraybuffer);
			var arr = [];
			for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");
		
			/* Call XLS */
			handleXlsDemo(bstr);
		
		};
		
		oReq.send();
		
		
		
	});



	$('#demo').on("click", function(e){
		window.location.hash = '#graph';
		$('.nav-tabs a[href="#graph"]').tab('show');
		mainregion = 'FR';
		this_index = 999999;
		getInput();
		drawRegionsMap();	
	});
	
	
	$('#svgdownload').on("click",function(e){
		$('#d3results a').each(function(aa){
			$('#d3results a').removeClass('active');
			$(this).addClass('active');
			var this_index = $(this).attr('attr-ind');
			var iso = $(this).attr('attr-iso');
			getInput();
			goD3(this_index,iso);
			mainregion = iso.toUpperCase();
			drawRegionsMap();			
		});
	});
	
	$("#svgdownloadsingle").on("click",function(e){
		runFileDownload();
	});
	
	$(document).on('dragenter', '#dropfile-xls', function() {
		$(this).css('border', '3px dashed red');
		return false;
	});
	$(document).on('dragover', '#dropfile-xls', function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).css('border', '3px dashed red');
		return false;
	});
	$(document).on('dragleave', '#dropfile-xls', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).css('border', '3px dashed #BBBBBB');
		return false;
	});
	$(document).on('drop', '#dropfile-xls', function(e) {
		if(e.originalEvent.dataTransfer){
			if(e.originalEvent.dataTransfer.files.length) {
				// Stop the propagation of the event
				e.preventDefault();
				e.stopPropagation();
				$(this).css('border', '3px dashed green');
				// Main function to upload
				//console.log('ok');
				uploadXls(e.originalEvent.dataTransfer.files);
				$("#demo").hide();
			}
		}
		else {
			$(this).css('border', '3px dashed #BBBBBB');
		}
		return false;
	});
});