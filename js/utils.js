// JavaScript Document

function Utils(){

	var canvas;
	var canvas_init = false;

	this.setFormFields = function(){
		$('input , textarea').each(function(){
			$(this).on('change',function(){
				if($(this).val() != '') $(this).addClass('not-empty');
				if($(this).val() == '') $(this).removeClass('not-empty');
			});
			if($(this).val() != '') $(this).addClass('not-empty');
			if($(this).val() == '') $(this).removeClass('not-empty');
		});

		$('input[type="tel"] , input[name="postcode"] , input[name="housenum"] , input[name="floornum"] , input[name="aptnum"]').keydown(function (e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			(e.keyCode == 65 && e.ctrlKey === true) ||
			(e.keyCode >= 35 && e.keyCode <= 40)) {
				return;
			}
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});
	}

	this.replaceSvgImgs = function(){
		//console.log( 'img.svg length :: ' + $('img.svg').length );
		$('img.svg').each(function(){
			//console.log( $(this).attr('class') );
			var $img = jQuery(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			jQuery.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');

				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

		});

		setTimeout(function(){ $('path').removeClass('cls-1'); } , 10);

	}

	this.checkObjEmpty = function( obj ){
		if (obj == null) return true;

		if (obj.length > 0)    return false;
		if (obj.length === 0)  return true;

		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) return false;
		}

		return true;
	}

	this.formatTime = function( time ){
		var sec_num = parseInt(time, 10); // don't forget the second param
		var minutes = Math.floor( sec_num / 60 );
		var seconds = sec_num - (minutes * 60);

		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		var time    = minutes + ':' + seconds;
		return time;
	}

	this.isPhone = function( str ) {
		var reg = /^0([50|52|53|54|57|58|72|74|76|77]{2}|[2|3|4|8|9]{1})-{0,1}?[0-9]{7}$/;
		return reg.test(str);
	}

	this.isEmail = function( str ) {
		var reg = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return reg.test(str);
	}

	this.trim = function( str ) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}

	this.getRotationDegrees = function(obj) {
		var matrix = obj.css("-webkit-transform") ||
		obj.css("-moz-transform")    ||
		obj.css("-ms-transform")     ||
		obj.css("-o-transform")      ||
		obj.css("transform");
		if(matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		} else { var angle = 0; }
		return (angle < 0) ? angle + 360 : angle;
	}

	this.getOrientation = function(file, callback) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var view = new DataView(e.target.result);
			if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
			var length = view.byteLength, offset = 2;
			while (offset < length) {
				var marker = view.getUint16(offset, false);
				offset += 2;
				if (marker == 0xFFE1) {
					if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
					var little = view.getUint16(offset += 6, false) == 0x4949;
					offset += view.getUint32(offset + 4, little);
					var tags = view.getUint16(offset, little);
					offset += 2;
					for (var i = 0; i < tags; i++)
					if (view.getUint16(offset + (i * 12), little) == 0x0112)
					return callback(view.getUint16(offset + (i * 12) + 8, little));
				}
				else if ((marker & 0xFF00) != 0xFF00) break;
				else offset += view.getUint16(offset, false);
			}
			return callback(-1);
		};
		reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
	}

	this.loadBodyScript = function( scriptURL ){
		pixel_iframe = document.createElement('iframe');
  	pixel_iframe.setAttribute('width', '1');
  	pixel_iframe.setAttribute('height', '1');
  	pixel_iframe.setAttribute('frameborder', '0');
  	pixel_iframe.setAttribute('style', 'display: none;');
  	document.body.appendChild(pixel_iframe);
  	pixel_iframe.setAttribute('src', scriptURL );
	}

	this.loadHeadScript = function( scriptURL ){
		var head = document.getElementsByTagName('head')[0];
  	var js = document.createElement("script");
  	js.src = scriptURL;
  	head.appendChild(js);
	}

}
