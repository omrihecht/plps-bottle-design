// JavaScript Document

var debug = false;

var isMobile, isIpad, isIOS, isAndroid, isIE, isOldBrowser;
var utils = new Utils();
var urlBase = 'https://hooliganspro.co.il/philips/aventbottles/01/';
var urlBaseServer = 'https://hooliganspro.co.il/philips/aventbottles/server/home/';
var urlParams = (location.href.split('?').length > 1) ? ('?' + location.href.split('?')[1]) : '';

if (location.protocol != 'https:'){
	location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}


$(document).ready(function(e) {
	var md = new MobileDetect(window.navigator.userAgent);
	if(md.tablet() != null){
		isIpad = true;
		viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0');
		$('html').addClass('ipad_device');
	}
	if(md.phone() != null){
		isMobile = true;
		$('html').addClass('mobile-device');
		if(md.os() == 'AndroidOS'){
			isAndroid = true;
			$('html').addClass('AndroidOS');
		}
		if(md.os() == 'iOS'){
			isIOS = true;
			$('html').addClass('IOS');
		}
	}
	msieversion();
	$.event.trigger({
		type : 'pageReady'
	});

	setPage();

});

function msieversion() {

	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE");
	var msedge = ua.indexOf("Edge");

	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
	{
		isIE = true;
		//alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
		if( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) ) isOldBrowser = true;
	}
	if( msedge > 0 ){
		isIE = true;
	}
	else  // If another browser, return 0
	{
		//alert('otherbrowser');
	}

	return false;
}

$(window).load(function(){
	if( isMobile ){
		setTimeout(function(){
			$(document).scrollTop(1);
			setTimeout(function(){
				$(document).scrollTop(0);
			},50);
		},50);
	}
});

function setPage(){
	location.href = '#/home' + urlParams;
}
