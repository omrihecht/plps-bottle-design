// JavaScript Document

var controllers = {};

controllers.Grid = function( $scope , $timeout , $interval , service ){

	ga('create', 'UA-50874787-1', 'auto');
  ga('send', 'pageview');
  console.log('google analytics init');

	utils.loadBodyScript( './analytics/ggl-remarketing.html' );
	utils.loadHeadScript( './analytics/fb-pageview.js' );

	$scope.parentObj = {};
	$scope.cookiesInterval;

	$(document).bind('pageReady' , function(){
		$scope.isMobile = isMobile;
		$scope.isIOS = isIOS;
		updateCookiesPop();
	});

	function updateCookiesPop(){
		return;
		if( document.cookie.indexOf("notice_preference") > 0 ) return;

		var titleTxt = 'הבחירות שלך לגבי קוקיז באתר זה';
		var mainTxt = 'קוקיז הם חלק חשוב מהפעילות התקינה של אתר זה. על מנת לשפר את חווית השימוש, אנו משתמשים בקוקיז בכדי לזכור את פרטי ההתחברות שלך ולספק התחברות מאובטחת, לאסוף נתונים סטטיסטיים שיאפשרו לנו להמשיך ולייעל את תפעול האתר וכן להציג תכנים מותאמים לתחומי העניין שלך. יש ללחוץ על "מסכימ/ה, ניתן להמשיך"  בכדי לאשר שימוש בקוקיז ולהמשיך ישירות לאתר או ללחוץ על "מידע נוסף" בכדי לראות פירוט נוסף של סוגי הקוקיז באתר ולבחור באילו סוגי קוקיז ניתן להשתמש בעת גלישתך באתר זה.';
		var btn1Txt = 'מסכימ/ה, ניתן להמשיך';
		var btn2Txt = 'התאמה אישית של הגדרות הקוקיז';
		var btn3Txt = 'הודעת קוקיז';

		$scope.cookiesInterval = $interval(function(){
			if( $('#cc-outer-wrapper .cc-header-title').html() == titleTxt ){
				$interval.cancel($scope.cookiesInterval);
				console.log('translation complete');
			}
			console.log('changing txt');
			$('#cc-outer-wrapper .cc-header-title').html(titleTxt);
			$('#cc-outer-wrapper .cc-cookie-text').html(mainTxt);
			$('#cc-outer-wrapper .cc-agree-button').html(btn1Txt);
			$('#cc-outer-wrapper .cc-customize-settings-button').html(btn2Txt);
			$('#cc-outer-wrapper .cc-cookie-notice-link').html(btn3Txt);
		},10);
	}

	$scope.$on('$routeChangeStart', function(next, current) {
		$('body').removeClass('on-gallery');
		$('body').removeClass('menu-open');
	});

	$scope.grid = {};

	$scope.toggleMenuOpenClick = function(){
		if( $('body').hasClass('menu-open') ){
			$('body').removeClass('menu-open');
		}else{
			$('body').addClass('menu-open');
		}
	}

	$scope.logoClick = function(){
		location.href = '#/home' + urlParams;
		$(document).scrollTop(0);
	}

	$scope.designClick = function () {
		philips.analytics.trackAjax({
			pagename: "bottle_design"
		});

		var userData = service.getUserObj();
		if( userData.logged_in ){
			location.href = '#/pick-bottle' + urlParams;
		}else{
			location.href = '#/login' + urlParams;
		}
	}

	$scope.aventBottlesClick = function () {
		philips.analytics.trackAjax({
			pagename: "philips_avent_bottles"
		});
		ga('send', 'pageview', '/myavent-bottles');
		location.href = '#/home' + urlParams;
		$timeout(function(){
			$(document).scrollTop(0);
			var scrollPos = $('#bottles').offset().top;
			var scrollOffset = (isMobile) ? 120 : 80;
			$(document).scrollTop(scrollPos - scrollOffset);
			$('body').removeClass('menu-open');
		});
	}

	$scope.prizeClick = function () {
		philips.analytics.trackAjax({
			pagename: "grand_prize"
		});
		ga('send', 'pageview', '/myavent-prizes');
		location.href = '#/home' + urlParams;
		$timeout(function(){
			$(document).scrollTop(0);
			var scrollPos = $('#prize').offset().top;
			var scrollOffset = (isMobile) ? 120 : 80;
			$(document).scrollTop(scrollPos - scrollOffset);
			$('body').removeClass('menu-open');
		});
	}

	$scope.galleryClick = function () {
		philips.analytics.trackAjax({
			pagename: "gallery"
		});
		ga('send', 'pageview', '/myavent-gallery');
		$scope.openGallery();
	}

	$scope.openGallery = function(){
		location.href = '#/gallery' + urlParams;
		$(document).scrollTop(0);
	}

	$scope.footerFacebookClick = function(){
		philips.analytics.trackConversion ({
			name:"follow_us",
			servicename:"facebook"
		});
	}
	$scope.footerInstaClick = function(){
		philips.analytics.trackConversion ({
			name:"follow_us",
			servicename:"instagram"
		});
	}
	$scope.footerMailClick = function(){
		philips.analytics.trackConversion ({
			name:"follow_us",
			servicename:"email"
		});
	}
	$scope.footerCouponClick = function(){
		philips.analytics.trackConversion ({
			name:"follow_us",
			servicename:"coupon"
		});
	}

};

controllers.Home = function( $scope , $timeout , dataFactory , service ){

	$scope.grid.show = true;
	$scope.userData = service.getUserObj();

	if( isMobile ) $scope.slide3_products = 'images/homepage/slide3-products-mobile.png';

	var homeSwiper;

	homeSwiper = new Swiper( $('#homepage .slide-2 .swiper-container') , {
		mode:'horizontal',
		pagination: $('#homepage .slide-2 .pagination'),
		paginationClickable: true,
		onPaginationRendered: function(homeSwiper){
			$('.swiper-pagination-bullet').click(function() {
				//console.log( homeSwiper.activeIndex );
				philips.analytics.trackConversion ({
					pagename:"philips_avent_bottles",
					name:"interaction",
					description:"banner:carousal:" + (homeSwiper.activeIndex+1)
				});
			});
		},
		nextButton: $('#homepage .slide-2 .next-btn'),
		prevButton: $('#homepage .slide-2 .prev-btn'),
		keyboardControl: true,
		autoplay: 10000,
		autoplayDisableOnInteraction: true,
		onSlideChangeStart: function( homeSwiper ){
			//console.log('home swiper change start');
		}
	});

	$('#homepage .slide-2 .next-btn').click(function(){
		//left
		philips.analytics.trackConversion ({
			pagename:"philips_avent_bottles",
			name:"interaction",
			description:"banner:left"
		});
	});

	$('#homepage .slide-2 .prev-btn').click(function(){
		if( $(this).hasClass('swiper-button-disabled') ) return;
		philips.analytics.trackConversion ({
			pagename:"philips_avent_bottles",
			name:"interaction",
			description:"banner:right"
		});
	});

	$scope.startClick_p1 = function(){
		if( $(this).hasClass('swiper-button-disabled') ) return;
		philips.analytics.trackConversion({
			name:"interaction",
			description:"personal_bottle:come_on:began_to_design"
		});
		startDesign();
	}

	$scope.startClick_slider_classic = function(){
		philips.analytics.trackConversion ({
			pagename:"philips_avent_bottles",
			name:"interaction",
			description:"bottle_design:avent_bottles_classic_series"
		});
		startDesign();
	}

	$scope.startClick_slider_natural = function(){
		philips.analytics.trackConversion ({
			pagename:"philips_avent_bottles",
			name:"interaction",
			description:"bottle_design:naturalavent_bottles_series"
		});
		startDesign();
	}

	$scope.startClick_slider_bottles = function(){
		philips.analytics.trackConversion ({
			pagename:"philips_avent_bottles",
			name:"interaction",
			description:"bottle_design:philips_avent_bottles"
		});
		startDesign();
	}

	$scope.startClick_slider_prize = function(){
		philips.analytics.trackConversion ({
			pagename:"grand_prize",
			name:"interaction",
			description:"bottle_design:first_place_prize"
		});
		startDesign();
	}

	$scope.galleryClick_home = function(){
		philips.analytics.trackConversion ({
			name:"interaction",
			description:"gallery_bottles:watch_gallery"
		});
		$scope.openGallery();
	}

	$scope.startClick_gallery = function(){
		philips.analytics.trackConversion ({
			name:"interaction",
			description:"gallery_bottles:bottle_design"
		});
		startDesign();
	}

	function startDesign(){
		if( $scope.userData.logged_in ){
			location.href = '#/pick-bottle' + urlParams;
		}else{
			location.href = '#/login' + urlParams;
		}
	}


};

controllers.Gallery = function( $scope , $timeout , dataFactory , service ){

	$('body').addClass('on-gallery');

	$scope.grid.show = true;
	$scope.galleryObj = [];
	$scope.galleryLoadedObj = [];

	var galleryCounter = 0;
	var displayImgs = 18;
	var gallerySwiper;


	if( utils.checkObjEmpty( service.getGalleryObj() ) ){
		console.log('load data');
		$scope.loading = true;

		dataFactory.getGallery()
		.success(function ( data ) {
			$scope.loading = false;
			$scope.galleryObj = data;
			service.setGalleryObj( data );
			setGallery();
		})
		.error(function (error) {
			debugger
		});
	}else{
		console.log('data in service');
		$scope.galleryObj = service.getGalleryObj();
		setGallery();
	}

	$scope.loadMoreClick = function(){
		philips.analytics.trackConversion ({
			pagename:"gallery",
			name:"interaction",
			description:"load_more"
		});

		galleryCounter++;
		for( var i=(galleryCounter * displayImgs); i<((galleryCounter+1) * displayImgs); i++ ){
			if( $scope.galleryObj[i] ){
				$scope.galleryLoadedObj[i] = $scope.galleryObj[i];
			}
		}
		if( $scope.galleryLoadedObj.length == $scope.galleryObj.length ) $scope.noMoreThumbs = true;
	}

	$scope.thumbClick = function( thumbObj, index ){

		philips.analytics.trackConversion ({
			pagename:"gallery",
			name:"interaction",
			description:"click_bottle:" + thumbObj.childName + ":" + index
		});


		var thumbNum = index;
		$scope.showSwiper = true;

		if( gallerySwiper != undefined ) gallerySwiper.destroy();

		$timeout(function(thumbNum){
			gallerySwiper = new Swiper( $('.gallery-swiper .swiper-container') , {
				mode:'horizontal',
				nextButton: $('.gallery-swiper .next-btn'),
				prevButton: $('.gallery-swiper .prev-btn'),
				keyboardControl: true,
				onSlideChangeStart: function( iconsSwiper ){
					//console.log('swiper change start');
				}
			});

			$timeout(function( thumbNum , gallerySwiper ){
				gallerySwiper.slideTo(thumbNum);
			},0,true,thumbNum,gallerySwiper);

		},0,true,thumbNum);

	}

	$scope.closeGalleryPop = function(){
		$scope.showSwiper = false;
	}

	function setGallery(){
		for( var i=(galleryCounter * displayImgs); i<((galleryCounter+1) * displayImgs); i++ ){
			if( $scope.galleryObj[i] ){
				$scope.galleryLoadedObj[i] = $scope.galleryObj[i];
				//console.log( $scope.galleryLoadedObj[i].childName );
			}
		}
		if( $scope.galleryLoadedObj.length == $scope.galleryObj.length ) $scope.noMoreThumbs = true;
	}

}

controllers.Activity = function($scope , $sce , $timeout , $interval, $route, $location , dataFactory , service){

	$scope.userData = service.getUserObj();
	$scope.grid.show = false;
	$scope.loading_msg = '';
	$scope.bottleImgObj = service.getBottleImgObj();
	$scope.posObj = {};
	$scope.loadingDisplayTime = 400;

	$scope.design_bottle = true;

	var canvas, canvas_init;
	var curPageAnalytics = '';
	var path = '';

	if( utils.checkObjEmpty( service.getDrawObj() ) ){
		console.log('load data');
		dataFactory.getDrawData()
		.success(function ( data ) {

			$scope.drawData = data;

			if( $scope.isMobile ){

				$scope.drawData.bottles.swiper_groups = [];
				for( var i=0; i < $scope.drawData.bottles.set.length ; i++ ){
					if( i%4 === 0 ) $scope.drawData.bottles.swiper_groups.push( new Array() );
					$scope.drawData.bottles.swiper_groups[ $scope.drawData.bottles.swiper_groups.length - 1 ].push( $scope.drawData.bottles.set[i] );
				}

				$scope.drawData.caps.swiper_groups = [];
				for( var i=0; i < $scope.drawData.caps.set.length ; i++ ){
					if( i%4 === 0 ) $scope.drawData.caps.swiper_groups.push( new Array() );
					$scope.drawData.caps.swiper_groups[ $scope.drawData.caps.swiper_groups.length - 1 ].push( $scope.drawData.caps.set[i] );
				}

				angular.forEach( $scope.drawData.icons , function( icons , index ){
					icons.swiper_groups = [];
					for( var i=0; i < icons.set.length ; i++ ){
						if( i%4 === 0 ) icons.swiper_groups.push( new Array() );
						icons.swiper_groups[ icons.swiper_groups.length - 1 ].push( icons.set[i] );
					}
				});

			} else {

				$scope.drawData.bottles.swiper_groups = [ $scope.drawData.bottles.set ];

				$scope.drawData.caps.swiper_groups = [ $scope.drawData.caps.set ];

				angular.forEach( $scope.drawData.icons , function( icons , index ){
					icons.swiper_groups = [];
					for( var i=0; i < icons.set.length ; i++ ){
						if( i%6 === 0 ) icons.swiper_groups.push( new Array() );
						icons.swiper_groups[ icons.swiper_groups.length - 1 ].push( icons.set[i] );
					}
				});

			}

			service.setDrawObj( $scope.drawData );
			$scope.drawData.bottles.set[0].colorPicked = true;
			$scope.drawData.caps.set[0].colorPicked = true;
			$scope.drawData.bottles.colorPicked = $scope.drawData.bottles.set[0];
			$scope.drawData.caps.colorPicked = $scope.drawData.caps.set[0];
			$timeout(function(){
				utils.replaceSvgImgs();
				setDrawingBoard();
			});
		})
		.error(function (error) {
			debugger
		});
	}else{
		console.log('data in service');
		$scope.drawData = service.getDrawObj();
		setDrawingBoard();
	}

	$scope.$on('$routeChangeSuccess', function() {
		path = $location.path();
		console.log('path : ' + path);
		$scope.level1Active = $scope.level2Active = $scope.level3Active = false;
		$scope.level1Complete = $scope.level2Complete = $scope.level3Complete = false;
		$scope.create_image = $scope.save_image = $scope.design_bottle = false;

		switch( path ){
			case('/login'):
			curPageAnalytics = 'complete_identification';
			$scope.design_bottle = true;
			$scope.activity_partial = 'partials/login.html';
			break;
			case('/pick-bottle'):
			curPageAnalytics = 'color_bottle';
			$scope.level1Active = true;
			$scope.design_bottle = true;
			$scope.activity_partial = 'partials/pick-bottle.html';
			break;
			case('/pick-cap'):
			curPageAnalytics = 'color_covers';
			$scope.level1Active = true;
			$scope.design_bottle = true;
			$scope.activity_partial = 'partials/pick-cap.html';
			break;
			case('/add-icons'):
			curPageAnalytics = 'the_bottle_design';
			$scope.level1Complete = $scope.level2Active = true;
			$scope.design_bottle = true;
			$scope.activity_partial = 'partials/add-icons.html';
			break;
			case('/create-image'):
			curPageAnalytics = 'your_babys_photo';
			$scope.level1Complete = $scope.level2Complete = $scope.level3Active = true;
			$scope.create_image = true;
			$scope.activity_partial = 'partials/create-image.html';
			break;
			case('/save-image'):
			curPageAnalytics = 'save_your_image';
			$scope.level1Complete = $scope.level2Complete = $scope.level3Complete = true;
			$scope.save_image = true;
			$scope.activity_partial = 'partials/save-image.html';
			break;
			case('/thanks'):
			curPageAnalytics = 'image_sent_thanks';
			$scope.level1Complete = $scope.level2Complete = $scope.level3Complete = true;
			$scope.save_image = true;
			$scope.activity_partial = 'partials/thanks.html';
			break;
			default:
			break;
		}
	});

	$scope.$on('$includeContentLoaded' , function(){
		$timeout(function(){
			utils.replaceSvgImgs();
			utils.setFormFields();
		});

	});

	$scope.homeBtnClick = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"return_home:" + curPageAnalytics
		});
		location.href = '#/home' + urlParams;
	}

	function setDrawingBoard(){

		canvas = new fabric.Canvas("draw-canvas");
		canvas.preserveObjectStacking = true;
		canvas.renderOnAddRemove = true;

		canvas.on('mouse:down', function(options) {
			//console.log( options.e.clientX , options.e.clientY );
			if ( options.target ) {
				console.log( 'an object was clicked! ', options.target.type );
			} else {
				console.log( 'object blur' );
				$scope.editing = false;
				$scope.$apply();
			}
		});

		if( !canvas_init ){
			canvas_init = true;
			$(window).resize(function(){
				$('.canvas-container').css({ 'height' : '100%' , 'width' : $('.canvas-holder').height()*(457/705) });
			});
		}
		$('.canvas-container').css({ 'height' : '100%' , 'width' : $('.canvas-holder').height()*(457/705) });

		if( $scope.drawData.stagedIcons && $scope.drawData.stagedIcons.length > 0 ){
			for( var i=0; i<$scope.drawData.stagedIcons.length; i++ ){
				var oImg = $scope.drawData.stagedIcons[i];
				canvas.add( oImg );
				oImg.on('selected', function() {
					$scope.editing = true;
					$scope.curIcon = this.iconObj;
					if( !$scope.$$phase ) $scope.$apply();
					console.log('selected an image');
				});
			}
			canvas.deactivateAll().renderAll();
		}

	}

	$scope.addSvgImage = function( svg_url , iconObj ){

		if(isIE) svg_url = svg_url.split('?')[0].replace('.svg','.png');

		fabric.Image.fromURL( svg_url , function( oImg ) {

			oImg.set({ originX:'center' , originY:'center' , borderColor:'red' , cornerColor:'green' , cornerSize:15 , transparentCorners:false });
			if( isMobile ) oImg.set({ cornerSize:30 });

			if( !utils.checkObjEmpty( $scope.posObj ) ){
				oImg.set({ left:$scope.posObj.left , top:$scope.posObj.top , angle:$scope.posObj.angle , scaleX:$scope.posObj.scaleX , scaleY:$scope.posObj.scaleY }).setCoords();
			}else{
				oImg.set({ top:canvas.height*0.5 , left:canvas.width*0.5 }).setCoords();
			}
			canvas.add( oImg );
			oImg.width = 200;
			oImg.height = 200;
			oImg.iconObj = iconObj;

			$scope.curIcon = iconObj;
			$scope.editing = true;
			canvas.setActiveObject( oImg );
			canvas.renderAll();

			$scope.posObj = {};

			$scope.$apply();

			oImg.on('selected', function() {
				$scope.editing = true;
				$scope.curIcon = this.iconObj;
				if( !$scope.$$phase ) $scope.$apply();
				console.log('selected an image');
			} , {
				crossOrigin: 'anonymous'
			});
		});

		$scope.drawData.stagedIcons = canvas.getObjects();

	}

	$scope.eraseImg = function(){
		console.log('erase image');
		canvas.getActiveObject().iconObj.use_number--;
		canvas.remove( canvas.getActiveObject() );
		$scope.editing = true;
		$scope.drawData.stagedIcons = canvas.getObjects();
		$scope.curIcon = $scope.drawData.stagedIcons[0];
		canvas.setActiveObject( $scope.curIcon );
	};

	$scope.rotateRight = function(){
		var oImg = canvas.getActiveObject();
		oImg.setAngle( oImg.getAngle() + 15 );
		canvas.setActiveObject( oImg );
	};

	$scope.rotateLeft = function(){
		var oImg = canvas.getActiveObject();
		oImg.setAngle( oImg.getAngle() - 15 );
		canvas.setActiveObject( oImg );
	};

	$scope.zoomIn = function(){
		var oImg = canvas.getActiveObject();
		oImg.set({ scaleX: oImg.getScaleX() + 0.1 , scaleY: oImg.getScaleY() + 0.1 });
		canvas.setActiveObject( oImg );
	};

	$scope.zoomOut = function(){
		var oImg = canvas.getActiveObject();
		oImg.set({ scaleX: oImg.getScaleX() - 0.1 , scaleY: oImg.getScaleY() - 0.1 });
		canvas.setActiveObject( oImg );
	};

	$scope.sendBack = function(){
		var oImg = canvas.getActiveObject();
		oImg.sendBackwards();
		canvas.setActiveObject( oImg );
		$scope.drawData.stagedIcons = canvas.getObjects();
	};

	$scope.bringForward = function(){
		var oImg = canvas.getActiveObject();
		oImg.bringForward();
		canvas.setActiveObject( oImg );
		$scope.drawData.stagedIcons = canvas.getObjects();
	};

	$scope.iconColorClick = function(){
		$scope.posObj.scaleX = canvas.getActiveObject().getScaleX();
		$scope.posObj.scaleY = canvas.getActiveObject().getScaleY();
		$scope.posObj.left = canvas.getActiveObject().getLeft();
		$scope.posObj.top = canvas.getActiveObject().getTop();
		$scope.posObj.angle = canvas.getActiveObject().getAngle();
		$scope.curIcon.colCounter++;
		var svg_url = $scope.curIcon.icon_url + $scope.curIcon.file_prfx + '-' + ( 1 + $scope.curIcon.colCounter%4 ) + '.svg';
		$scope.addSvgImage( svg_url , $scope.curIcon );
		$scope.curIcon.use_number++;
		$scope.eraseImg();
	}

	$scope.deselectCanvas = function(){
		canvas.deactivateAll().renderAll();
	}

	$scope.redrawClick = function(){

		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"bottle_design_more"
		});

		canvas.clear();
		if( $scope.drawData.stagedIcons != undefined ){
			while( $scope.drawData.stagedIcons.length > 0 ){
				$scope.drawData.stagedIcons[0].iconObj.use_number = null;
				$scope.drawData.stagedIcons.splice(0,1);
			}
		}
		angular.forEach( $scope.drawData.bottles.set , function( bottle ){
			bottle.colorPicked = false;
		});
		angular.forEach( $scope.drawData.caps.set , function( cap ){
			cap.colorPicked = false;
		});
		$scope.drawData.bottles.set[0].colorPicked = true;
		$scope.drawData.caps.set[0].colorPicked = true;
		$scope.drawData.bottles.colorPicked = $scope.drawData.bottles.set[0];
		$scope.drawData.caps.colorPicked = $scope.drawData.caps.set[0];

		$scope.bottleImgObj.cap_url = $scope.drawData.caps.colorPicked.img_url;
		$scope.bottleImgObj.body_url = $scope.drawData.bottles.colorPicked.img_url;
		$scope.bottleImgObj.texture_url == '';

		service.setBottleImgObj( $scope.bottleImgObj );

		$scope.drawData.templates.upload_img = '';
		location.href = '#/pick-bottle' + urlParams;
	}

	$scope.moveBottleRight = function(){
		var angle = utils.getRotationDegrees( $('#drawing-board .template-1 .bottle-img') );
		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(0deg)',
			'-moz-transform' : 'rotate(0deg)',
			'-ms-transform' : 'rotate(0deg)',
			'-o-transform' : 'rotate(0deg)',
			'transform' : 'rotate(0deg)'
		});

		var leftPer = parseFloat( $('#drawing-board .template-1 .bottle-img').css('left') ) / parseFloat( $('#drawing-board .template-1').width() );
		$('.template-1 .bottle-img').css({ 'left' : (leftPer*100 + 2) + '%' });

		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(' + (angle) + 'deg)',
			'-moz-transform' : 'rotate(' + (angle) + 'deg)',
			'-ms-transform' : 'rotate(' + (angle) + 'deg)',
			'-o-transform' : 'rotate(' + (angle) + 'deg)',
			'transform' : 'rotate(' + (angle) + 'deg)'
		});
	}

	$scope.moveBottleLeft = function(){
		var angle = utils.getRotationDegrees( $('#drawing-board .template-1 .bottle-img') );
		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(0deg)',
			'-moz-transform' : 'rotate(0deg)',
			'-ms-transform' : 'rotate(0deg)',
			'-o-transform' : 'rotate(0deg)',
			'transform' : 'rotate(0deg)'
		});

		var leftPer = parseFloat( $('#drawing-board .template-1 .bottle-img').css('left') ) / parseFloat( $('#drawing-board .template-1').width() );
		$('.template-1 .bottle-img').css({ 'left' : (leftPer*100 - 2) + '%' });

		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(' + (angle) + 'deg)',
			'-moz-transform' : 'rotate(' + (angle) + 'deg)',
			'-ms-transform' : 'rotate(' + (angle) + 'deg)',
			'-o-transform' : 'rotate(' + (angle) + 'deg)',
			'transform' : 'rotate(' + (angle) + 'deg)'
		});
	}

	$scope.moveBottleDown = function(){
		var angle = utils.getRotationDegrees( $('#drawing-board .template-1 .bottle-img') );
		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(0deg)',
			'-moz-transform' : 'rotate(0deg)',
			'-ms-transform' : 'rotate(0deg)',
			'-o-transform' : 'rotate(0deg)',
			'transform' : 'rotate(0deg)'
		});

		var topPer = parseFloat( $('#drawing-board .template-1 .bottle-img').css('top') ) / parseFloat( $('#drawing-board .template-1').height() );
		$('.template-1 .bottle-img').css({ 'top' : (topPer*100 + 2) + '%' });

		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(' + (angle) + 'deg)',
			'-moz-transform' : 'rotate(' + (angle) + 'deg)',
			'-ms-transform' : 'rotate(' + (angle) + 'deg)',
			'-o-transform' : 'rotate(' + (angle) + 'deg)',
			'transform' : 'rotate(' + (angle) + 'deg)'
		});
	}

	$scope.moveBottleUp = function(){
		var angle = utils.getRotationDegrees( $('#drawing-board .template-1 .bottle-img') );
		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(0deg)',
			'-moz-transform' : 'rotate(0deg)',
			'-ms-transform' : 'rotate(0deg)',
			'-o-transform' : 'rotate(0deg)',
			'transform' : 'rotate(0deg)'
		});

		var topPer = parseFloat( $('#drawing-board .template-1 .bottle-img').css('top') ) / parseFloat( $('#drawing-board .template-1').height() );
		$('.template-1 .bottle-img').css({ 'top' : (topPer*100 - 2) + '%' });

		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(' + (angle) + 'deg)',
			'-moz-transform' : 'rotate(' + (angle) + 'deg)',
			'-ms-transform' : 'rotate(' + (angle) + 'deg)',
			'-o-transform' : 'rotate(' + (angle) + 'deg)',
			'transform' : 'rotate(' + (angle) + 'deg)'
		});
	}

	$scope.rotateBottleRight = function(){
		var angle = utils.getRotationDegrees( $('#drawing-board .template-1 .bottle-img') );
		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(' + (angle + 5) + 'deg)',
			'-moz-transform' : 'rotate(' + (angle + 5) + 'deg)',
			'-ms-transform' : 'rotate(' + (angle + 5) + 'deg)',
			'-o-transform' : 'rotate(' + (angle + 5) + 'deg)',
			'transform' : 'rotate(' + (angle + 5) + 'deg)'
		});
	}

	$scope.rotateBottleLeft = function(){
		var angle = utils.getRotationDegrees( $('#drawing-board .template-1 .bottle-img') );
		$('.template-1 .bottle-img').css({
			'-webkit-transform' : 'rotate(' + (angle - 5) + 'deg)',
			'-moz-transform' : 'rotate(' + (angle - 5) + 'deg)',
			'-ms-transform' : 'rotate(' + (angle - 5) + 'deg)',
			'-o-transform' : 'rotate(' + (angle - 5) + 'deg)',
			'transform' : 'rotate(' + (angle - 5) + 'deg)'
		});
	}

	$scope.zoomBottleIn = function(){
		var heightPer = parseFloat( $('#drawing-board .template-1 .bottle-img').css('height') ) / parseFloat( $('#drawing-board .template-1').height() );
		$('.template-1 .bottle-img').css({ 'height' : (heightPer*100 + 2) + '%' });
	}

	$scope.zoomBottleOut = function(){
		var heightPer = parseFloat( $('#drawing-board .template-1 .bottle-img').css('height') ) / parseFloat( $('#drawing-board .template-1').height() );
		$('.template-1 .bottle-img').css({ 'height' : (heightPer*100 - 2) + '%' });
	}

	$scope.repositionImg = function(){
		alert('');
	}

}

controllers.Login = function( $scope , $sce , $timeout , $interval , dataFactory , service ){

	$scope.facebookConnectClick = function(){

		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"login_with_facebook"
		});
		ga('send', 'event', 'facebook-myavent', 'register with facebook', 'register with facebook');

		console.log('connect to facebook');
		$scope.sendingForm = true;
		$scope.loading_msg = 'מתחבר לפייסבוק';

		if( fb_connected ){

			$scope.userData.authResponse = fb_authResponse;
			$scope.loading_msg = 'שומר נתונים';
			console.log('Logged in.');
			FB.api('/me', {fields: 'name,id,first_name,last_name,email,gender,picture'}, function(response) {
				for(var key in response) {
					var value = response[key];
					$scope.userData[key] = value;
					$scope.userData.logged_in = true;
				}
				$scope.userData.name = '';
				service.setUserObj( $scope.userData );
				console.log('Good to see you, ' + response.name + '.');
				$timeout(function(){ location.href = '#/pick-bottle' + urlParams } , 1200 );
				ga('send', 'event', 'facebook-myavent', 'register with facebook', 'registered by facebook');
			});

		} else {

			FB.login(function(response) {
				if (response.authResponse) {
					$scope.userData.authResponse = response.authResponse;
					console.log('Welcome!  Fetching your information.... ');
					FB.api('/me', {fields: 'name,id,first_name,last_name,email,gender,picture'}, function(response) {
						$scope.loading_msg = 'שומר נתונים';
						$scope.$digest();
						for(var key in response) {
							var value = response[key];
							$scope.userData[key] = value;
							$scope.userData.logged_in = true;
						}
						$scope.userData.name = '';
						service.setUserObj( $scope.userData );
						console.log('Good to see you, ' + response.name + '.');
						$timeout(function(){ location.href = '#/pick-bottle' + urlParams } , 1200 );
						ga('send', 'event', 'facebook-myavent', 'register with facebook', 'registered by facebook');
					});
				} else {
					console.log('User cancelled login or did not fully authorize.');
					$scope.loading_msg = 'ההתחברות בוטלה';
					$scope.$digest();
					$timeout(function(){ $scope.sendingForm = false; } , 1200 );
				}
			}, {scope: 'user_photos'} , { return_scopes: true } );

		}

	};

	$scope.noFacebookClick = function(){

		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"i_donot_have_facebook"
		});
		ga('send', 'event', 'email-myavent', 'register with email', 'register with email');
		$scope.loginForm = true;
	};

	$scope.backBtnClick = function(){

		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"return:complete_identification"
		});

		$scope.loginForm = false;
	};

	$scope.submitFormClick = function(){
		if( formValid() ){
			service.setUserObj( $scope.userData );
			$scope.sendingForm = true;
			$scope.loading_msg = 'שומר נתונים';
			$scope.userData.logged_in = true;

			philips.analytics.trackConversion ({
				pagename:"bottle_design",
				name:"interaction",
				description:"please_complete_identification"
			});
			ga('send', 'event', 'email-myavent', 'register with email', 'registered by email');

			$timeout(function(){ location.href = '#/pick-bottle' + urlParams } , $scope.loadingDisplayTime );
			//location.href = '#/pick-bottle' + urlParams;
		}
	};

	function formValid(){
		$scope.validation = {};
		var errTxt = '';
		if( $scope.userData.name == '' || $scope.userData.name == undefined ){
			$scope.validation.nameErr = true;
			errTxt = errTxt + 'יש להזין שם מלא<br />';
		}
		if( $scope.userData.email == '' || $scope.userData.email == undefined ){
			$scope.validation.emailErr = true;
			if( $('#user-mail').val() == '' ){
				errTxt = errTxt + 'יש להזין שם מייל<br />';
			}else{
				errTxt = errTxt + 'כתובת המייל אינה חוקית<br />';
			}
		}
		if( utils.checkObjEmpty( $scope.validation ) ){
			return true;
		}else{
			$scope.validation.error = $sce.trustAsHtml(errTxt);
			return false;
		}
	}
};

controllers.PickBottle = function( $scope , $timeout , service ){
	ga('send', 'pageview', '/myavent-step1');
	if( isMobile ){
		$timeout(function(){
			var bottleSwiper = new Swiper( $('#bottle-colors .swiper-container') , {
				mode:'horizontal',
				nextButton: $('#bottle-colors .next-btn'),
				prevButton: $('#bottle-colors .prev-btn'),
				onSlideChangeStart: function( iconsSwiper ){
					console.log('swiper change start');
				}
			});
		});
	}

	$scope.backBtnClick = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"return:color_bottle"
		});
		location.href = '#/login' + urlParams;
	};

	$scope.continueClick = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"continue:color_bottle"
		});
		location.href = '#/pick-cap' + urlParams;
	};

	$scope.bottleColorClick = function( bottleObj ){
		angular.forEach( $scope.drawData.bottles.set , function( bottle ){
			bottle.colorPicked = false;
		});
		bottleObj.colorPicked = true;
		$scope.bottleImgObj.body_url = bottleObj.img_url;

		$scope.drawData.bottles.colorPicked = bottleObj;

	};

};

controllers.PickCap = function( $scope , $timeout , service ){
	ga('send', 'pageview', '/myavent-step2');
	if( isMobile ){
		$timeout(function(){
			var bottleSwiper = new Swiper( $('#cap-colors .swiper-container') , {
				mode:'horizontal',
				nextButton: $('#cap-colors .next-btn'),
				prevButton: $('#cap-colors .prev-btn'),
				onSlideChangeStart: function( iconsSwiper ){
					console.log('swiper change start');
				}
			});

		});
	}

	$scope.backBtnClick = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"return:color_covers"
		});
		location.href = '#/pick-bottle' + urlParams;
	};

	$scope.continueClick = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"continue:color_covers"
		});
		location.href = '#/add-icons' + urlParams;
	};

	$scope.capColorClick = function( capObj ){
		angular.forEach( $scope.drawData.caps.set , function( cap ){
			cap.colorPicked = false;
		});
		capObj.colorPicked = true;
		$scope.bottleImgObj.cap_url = capObj.img_url;
	};
}

controllers.AddIcons = function( $scope , $timeout , $interval , dataFactory ){
	ga('send', 'pageview', '/myavent-step3');
	var iconsSwiper, curIconSet;
	setIconsSet();

	function setIconsSet(){
		curIconSet = ( $scope.drawData.curIconSet === undefined ) ? 0 : $scope.drawData.curIconSet;
		$scope.drawData.icons[ curIconSet ].selected = true;

		$scope.curIconSet = $scope.drawData.icons[ curIconSet ];

		angular.forEach( $scope.curIconSet.set , function( iconObj , index){
			iconObj.icon_url = 'images/icons/'+ $scope.curIconSet.folder + '/';
			if( $scope.curIconSet.name == 'רקע' ){
				iconObj.icon_img = iconObj.icon_url + iconObj.file_prfx + '-icon.png';
			}else{
				iconObj.icon_img = iconObj.icon_url + iconObj.file_prfx + '-1.svg';
			}
			if( !iconObj.use_number ) iconObj.use_number = 0;
		});



		$timeout(function(){
			if( iconsSwiper ) iconsSwiper.destroy( true , true);

			if( isMobile ){

				iconsSwiper = new Swiper( $('#icons-set-swiper') , {
					mode:'horizontal',
					nextButton: $('#icons .nav-btn.next-btn'),
					prevButton: $('#icons .nav-btn.prev-btn'),
					onSlideChangeStart: function( iconsSwiper ){
						console.log('swiper change start');
					}
				});

			} else {

				iconsSwiper = new Swiper( $('#icons-set-swiper') , {
					mode:'horizontal',
					nextButton: $('#swiper-pagination .next-btn'),
					prevButton: $('#swiper-pagination .prev-btn'),
					pagination: $('#swiper-pagination .pagination'),
					paginationClickable: true,
					keyboardControl: true,
					onSlideChangeStart: function( iconsSwiper ){
						console.log('swiper change start');
					}
				});

			}

		});

	}

	$scope.iconSetBtnClick = function( index ){
		$scope.drawData.icons[ curIconSet ].selected = false;
		$scope.drawData.curIconSet = curIconSet = index;
		setIconsSet();
	};

	$scope.iconClick = function( iconObj ){

		if( $scope.curIconSet.name == 'רקע' ){
			if( iconObj.file_prfx == 'null' ){
				$scope.bottleImgObj.texture_url = '';
			} else {
				$scope.bottleImgObj.texture_url = iconObj.icon_url + iconObj.file_prfx + '.png?r=' + Math.random();
			}
			return;
		}

		//var svg_url = $(event.currentTarget).find('img').attr('src');
		var svg_url = iconObj.icon_url + iconObj.file_prfx + '-1.svg?r=' + Math.random();
		iconObj.colCounter = 0;
		iconObj.use_number++;

		$scope.addSvgImage( svg_url , iconObj );

	};

	$scope.backBtnClick = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"return:the_bottle_design"
		});
		location.href = '#/pick-cap' + urlParams;
	};

	$scope.continueClick = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"continue:design_perfect_bottle"
		});

		$scope.rendering = true;
		$scope.loading_msg = 'מייצר תמונה';
		$scope.deselectCanvas();

		$('#tmp-canvas , #tmp-holder').remove();
		var tmp_holder = $('<div id="tmp-holder" ></div>').css({ 'position' : 'absolute' , 'width' : '400px' , 'height' : '772px' , 'top' : '5000px' , 'left' : '0' , 'z-index' : '1000' });
		var tmp_canvas = $('<canvas id="tmp-canvas" width="400" height="617" ></canvas>').css({ 'position' : 'absolute' , 'display' : 'block' , 'width' : '300px' , 'top' : '256px' , 'left' : '55px' });

		$('body').css({ 'overflow' : ' hidden' });
		$(tmp_holder).append( $(tmp_canvas) );

		var work_canvas = document.getElementById('draw-canvas');
		var img_src = work_canvas.toDataURL();
		var img = new Image();
		img.src = img_src;
		var mask = new Image();
		mask.src = $scope.drawData.bottles.colorPicked.img_url + '?r=' + Math.random();
		$('body').append( $(tmp_holder) );

		mask.onload = function () {
			if( $scope.bottleImgObj.texture_url == '' ){
				finalizeImg();
			}else{
				var maskHolder = $('<div></div>').css({ 'position' : 'absolute' , 'top' : '5000px' , 'left' : '0' , 'z-index' : '1000' });
				$(maskHolder).append(mask);
				$(maskHolder).append( $('#bottle-holder .bottle-texture').clone().css({ 'position': 'absolute' , 'top' : '0' , 'left' : '0' , 'width' : '100%' , 'height' : '100%' }) );
				$('body').append(maskHolder);
				html2canvas( maskHolder , {
					onrendered: function(canvas) {
						mask.src = canvas.toDataURL();
						mask.onload = function () {
							$(maskHolder).remove();
							finalizeImg();
						}
					}
				});
			}
		}

		function finalizeImg(){

			var ctx = document.getElementById('tmp-canvas').getContext('2d');
			ctx.drawImage(mask, 0, 0, 400, 617);
			ctx.globalCompositeOperation = 'source-atop';
			ctx.drawImage(img, 0 , 0, 400, 617);

			$('#bottle-holder .canvas-holder , #bottle-holder .bottle-shadow , #bottle-holder .bottle-body').hide();

			html2canvas( $('#bottle-holder .bottle') , {
				onrendered: function(canvas) {
					$('#bottle-holder .canvas-holder , #bottle-holder .bottle-shadow , #bottle-holder .bottle-body').show();
					var img_src = canvas.toDataURL();
					var img = new Image();
					img.src = img_src;
					$(img).css({ 'display' : 'block' , 'width' : '100%' , 'height' : '100%' });
					$(tmp_holder).append( $(img) );

					html2canvas( $(tmp_holder) , {
						onrendered: function(canvas) {
							var img_src = canvas.toDataURL('image/.png');
							$(tmp_holder).remove();
							$('body').css({ 'overflow' : ' auto' });

							$scope.drawData.renderedImgSrc = img_src;
							//$scope.drawData.renderedImgSrc = 'images/bottles/bottle-test.png'

							$timeout(function(){
								location.href = '#/create-image' + urlParams;
							}, $scope.loadingDisplayTime);


						}
					});
				}
			});
		}
	};

};

controllers.CreateImage = function( $scope , $sce , $timeout , $interval , dataFactory , service ){
	ga('send', 'pageview', '/myavent-step4');

	$scope.drawData.finalImgSrc = undefined;
	$scope.isOldBrowser = isOldBrowser;

	if( $scope.drawData.templates.pickedTemplate == undefined ){
		$scope.drawData.templates.pickedTemplate = $scope.drawData.templates[0];
		$scope.drawData.templates.pickedTemplate.index = 0;
		$scope.drawData.templates[0].selected = true;
	} else {
		$timeout(function(){
			fixImgPosition();
		});
	}

	$('.bottle-img').draggable();

	$scope.templateClick = function( template , index ){
		//debugger
		$timeout(function(){ $scope.drawData.templates.pickedTemplate.index = index; });
		$scope.drawData.templates.pickedTemplate = template;
		for( var i=0; i<$scope.drawData.templates.length; i++){
			$scope.drawData.templates[i].selected = false;
		}
		template.selected = true;

		$timeout(function(){ fixImgPosition(); });
	}

	$scope.uploadFileChange = function( input ){
		var file = input && input.files && input.files[0]
		var options = {
			maxWidth: 800,
			canvas: true,
			pixelRatio: window.devicePixelRatio,
			downsamplingRatio: 0.5
		}
		if (!file) {
			return
		}
		loadImage.parseMetaData(file, function (data) {
			if (data.exif) {
				options.orientation = data.exif.get('Orientation')
			}
			displayImage(file, options)
		})
	}

	function displayImage (file, options) {
		currentFile = file
		if (!loadImage(
			file,
			replaceResults,
			options
		)) {
			result.children().replaceWith(
				$('<span>Your browser does not support the URL or FileReader API.</span>')
			)
		}
	}

	function replaceResults (canvas) {
		//document.body.appendChild(img);
		setUploadImage( canvas.toDataURL('image/jpeg') )
	}


	function setUploadImage( img_url ){

		var image = new Image();
		image.src = img_url;

		image.onload = function( e ){

			var imgSize = { 'width' : this.width , 'height' : this.height };
			$scope.drawData.templates.imgUploaded = true;
			$scope.drawData.templates.upload_img_landscape1 = ( imgSize.width > imgSize.height );
			$scope.drawData.templates.upload_img_landscape2 = ( (imgSize.width/imgSize.height) > (4.1/3) );
			$scope.drawData.templates.upload_img = this.src;

			$scope.$digest();
			$timeout(function(){
				fixImgPosition();
				$timeout(function(){
					fixImgPosition();
				});
			});
		}
	}

	function fixImgPosition(){
		$('.template-img-holder').each(function(){

			var holderSize =  { 'width' : $(this).find('.upload-img').width() , 'height' : $(this).find('.upload-img').height() };
			var imgSize =  { 'width' : $(this).find('.upload-img img').width() , 'height' : $(this).find('.upload-img img').height() };

			if( holderSize.width/holderSize.height > imgSize.width/imgSize.height ){
				console.log('sort vertical');
				$(this).find('.upload-img img').css({ 'top' : '-' + ( (imgSize.height - holderSize.height)*0.5 ) + 'px' , 'right' : 0 });
			}else{
				console.log('sort horizontal');
				$(this).find('.upload-img img').css({ 'top' : 0 , 'right' : '-' + ( (imgSize.width - holderSize.width)*0.5 ) + 'px' });
			}
		});
	}

	$scope.openFacebookGallery = function(){
		$scope.facebookGalleryOpen = true;

		var user_id = $scope.userData.id;
		console.log( 'user_id :: ' + user_id );

		if( $scope.facebookAlbums != undefined ){
			$scope.curAlbum = undefined;
			return;
		}
		$scope.facebookAlbums = [];

		FB.api(
			'/' + user_id + '/albums',
			{ fields : 'id,name,count,cover_photo' },
			function (response) {
				var userObj = $scope.userData;
				if (response && !response.error) {
					for( var i=0; i<response.data.length; i++){
						if( response.data[i].cover_photo ){
							var obj = response.data[i];
							obj.cover_url = 'https://graph.facebook.com/' + response.data[i].cover_photo.id + '/picture?type=album&access_token=' + userObj.authResponse.accessToken;
							//$scope.facebookAlbums[i] = response.data[i];
							//$scope.facebookAlbums[i].cover_url = 'https://graph.facebook.com/' + response.data[i].cover_photo.id + '/picture?type=album&access_token=' + userObj.authResponse.accessToken;
							$scope.facebookAlbums.push(obj);
							//console.log('album cover :: ' + $scope.facebookAlbums[i].cover_url);
						}
					}
					$scope.$digest();
				}
			}
		);
	}

	$scope.albumThumbClick = function( album ){
		if( album.photos != undefined ){
			$scope.curAlbum = album;
			return;
		}
		FB.api(
			'/' + album.id + '/photos',
			function (response) {
				var userObj = $scope.userData;
				if (response && !response.error) {
					album.photos = [];
					for( var i=0; i<response.data.length; i++){
						album.photos[i] = response.data[i];
						album.photos[i].cover_url = 'https://graph.facebook.com/' + response.data[i].id + '/picture?type=album&access_token=' + userObj.authResponse.accessToken;
						//album.photos[i].img_url = 'https://graph.facebook.com/' + response.data[i].id + '/picture?type=normal&access_token=' + userObj.authResponse.accessToken;
					}
					$scope.curAlbum = album;
					$scope.$digest();
				}
			}
		);
	};

	$scope.photoThumbClick = function( photo ){
		FB.api(
			photo.id,
			'GET',
			{ type : 'album', fields: 'source' },
			function(response) {
				photo.img_url = response.source;
				setUploadImage( photo.img_url );
				$scope.facebookGalleryOpen = false;
				$scope.userData.statusImage = 'facebook';
				$scope.$digest();
			}
		);
	}

	$scope.backToAlbumsClick = function(){
		$scope.curAlbum = undefined;
	}

	$scope.closeFacebookGalleryClick = function(){
		$scope.facebookGalleryOpen = false;
	};

	$scope.backBtnClick = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"return:your_babys_photo"
		});
		location.href = '#/add-icons' + urlParams;
	};


	$scope.continueClick = function(){
		console.log('continue click');
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"find_leaving_details"
		});

		if( $scope.drawData.finalImgSrc == undefined ){
			renderImg();
			console.log('render img 1');
			$(document).bind('imgRendered' , function(){
				console.log('render img 1 complete');
				$(document).unbind('imgRendered');
				location.href = '#/save-image' + urlParams;
			});
		}else{
			location.href = '#/save-image' + urlParams;
		}

	};

	$scope.shareClick = function(){

		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"continue:want_to_share"
		});


		if( $scope.userData.id == undefined ){

			$scope.rendering = true;
			$scope.loading_msg = 'מתחבר לפייסבוק';

			if( fb_connected ){

				$scope.userData.authResponse = fb_authResponse;
				console.log('Logged in.');
				FB.api('/me', {fields: 'name,id,first_name,last_name,email,gender,picture'}, function(response) {
					$scope.userData.id = response.id;
					service.setUserObj( $scope.userData );
					$timeout(function(){ setFacebookRenderImg(); } , 100 );
				});

			} else {

				FB.login(function(response) {
					if (response.authResponse) {
						$scope.userData.authResponse = response.authResponse;
						console.log('Welcome!  Fetching your information.... ');
						FB.api('/me', {fields: 'name,id,first_name,last_name,email,gender,picture'}, function(response) {
							$scope.userData.id = response.id;
							service.setUserObj( $scope.userData );
							$timeout(function(){ setFacebookRenderImg(); } , 100 );
						});
					} else {
						console.log('User cancelled login or did not fully authorize.');
						$scope.loading_msg = 'ההתחברות בוטלה';
						$scope.$digest();
						$timeout(function(){ $scope.rendering = false; } , 1200 );
					}
				}, {scope: 'user_photos'} , { return_scopes: true } );

			}
		} else {

			setFacebookRenderImg();

		}

	}

	function setFacebookRenderImg(){
		if( $scope.drawData.finalImgSrc == undefined ){
			renderImg();
			$(document).bind('imgRendered' , function(){
				$(document).unbind('imgRendered');
				console.log('render img facebook complete');
				getFacebookShareImg();
			});
		}else{
			$scope.rendering = true;
			$scope.loading_msg = 'מייצר תמונה לשיתוף';
			getFacebookShareImg();
		}
	}

	function getFacebookShareImg(){
		console.log('get facebook image');
		$scope.userData.userPic = $scope.drawData.finalImgSrc.replace( 'data:image/jpeg;base64,' , '' );
		var shareData = { 'userPic' : $scope.userData.userPic , 'type' : 1 };
		dataFactory.sendUser( shareData )
		.success(function ( data ) {
			console.log('get facebook image success');
			//$scope.rendering = false;
			$scope.facebook_shareImg_url = 'https://www.hooliganspro.co.il/philips/aventbottles/server/Areas/uploads/s_' + data + '.jpg';
			if(isIOS){
				$scope.showShareIOS = true;
			}else{
				//$scope.showShareIOS = true;
				shareFacebook();
				$timeout(function(){
					location.href = '#/save-image' + urlParams;
				},1000);
			}

		})
		.error(function (error) {
			debugger
		});
		return;
	}

	$scope.shareIOSClick = function(){
		shareFacebook();
		location.href = '#/save-image' + urlParams;
	}

	function shareFacebook(){
		//window.open('https://www.facebook.com/sharer.php?u=https://hooliganspro.co.il/philips/aventbottles/01/', 'sharer', "width=400,height=300");
		FB.ui({
			method: 'feed',
			name: 'עיצבתי לבייבי שלי בקבוק אישי!',
			link: 'https://hooliganspro.co.il/philips/aventbottles/01/',
			picture: $scope.facebook_shareImg_url,
			description: 'בואו לעצב גם אתם בתחרות של AVENT ואולי תזכו בשביל הבייבי שלכם בחבילת פרסים מפנקת',
			caption: 'תחרות עיצוב הבקבוק של AVENT'
		}, function (response) {
			if (response !== null && typeof response.post_id !== 'undefined') {

			}
		});
	}

	function renderImg(){

		console.log('render image function');

		$scope.rendering = true;
		$scope.loading_msg = 'מייצר תמונה';
		service.setImgTemplateObj( $scope.templates );


		$('#template-img-holder .template-img-holder').css({ 'overflow':'auto'  ,'display':'block' });
		if( isIE ){
			$('#template-img-holder').addClass('no-transform');
			var tempDiv = $('#template-img-holder .template-img-holder').clone().addClass('tempDiv');
			$('body').append( $(tempDiv).css({'position':'absolute','background':'red','top':'5000px'}) );
		}

		html2canvas( $('#template-img-holder') , {
			'proxy':'proxy/html2canvasproxy.php',
			'useCORS':true,
			'logging': true,
			//'allowTaint': true,
			onrendered: function(canvas) {
				if( isIE ){
					$('#template-img-holder').removeClass('no-transform');
					$('.tempDiv').remove();
				}
				//$('body').append( $(canvas).css({'position':'absolute','background':'red'}) );

				var img_src = canvas.toDataURL('image/jpeg');
				$scope.drawData.finalImgSrc = img_src;

				$timeout(function(){
					//location.href = '#/save-image' + urlParams;
					console.log('render image function complete!!!')
					$.event.trigger({
						type : 'imgRendered'
					});

				}, $scope.loadingDisplayTime);

			}
		});
	}

}

controllers.SaveImage = function( $scope , $sce , $timeout , $interval , dataFactory , service ){
	ga('send', 'pageview', '/myavent-success');
	$scope.parentObj.formSkip = false;

	$scope.backBtnClick = function(){

		location.href = '#/create-image' + urlParams;
	};

	$scope.submitFormClick = function(){

		if( debug ){
			$scope.thanks = true;
			return;
		}

		if( formValid() ){
			philips.analytics.trackConversion ({
				pagename:"bottle_design",
				name:"interaction",
				description:"continue:details_shipping_prizes"
			});

			utils.loadBodyScript( './analytics/ggl-conversion.html' );
			utils.loadHeadScript( './analytics/fb-thanks.js' );

			$scope.sendingForm = true;
			$scope.loading_msg = 'שומר תמונה';

			$scope.userData.userPic = $scope.drawData.finalImgSrc.replace( 'data:image/jpeg;base64,' , '' );
			$scope.userData.fullName = $scope.userData.name;
			$scope.userData.phone = '0544444444'
			//debugger
			dataFactory.sendUser( $scope.userData )
			.success(function ( data ) {
				location.href="#/thanks" + urlParams;
				$scope.sendingForm = false;
				$scope.thanks = true;
			})
			.error(function (error) {
				debugger
			});
		}
	};


	function formValid(){
		$scope.validation = {};

		if( $scope.userData.name == '' || $scope.userData.name == undefined ){
			$scope.validation.nameErr = true;
			$scope.validation.error = $sce.trustAsHtml('יש להזין שם מלא');
			return;
		}
		if( $scope.userData.email == '' || $scope.userData.email == undefined ){
			$scope.validation.emailErr = true;
			if( $('#user-mail').val() == '' ){
				$scope.validation.error = $sce.trustAsHtml('יש להזין שם מייל');
				return;
			}else{
				$scope.validation.error = $sce.trustAsHtml('כתובת המייל אינה חוקית');
				return;
			}
		}
		if( $scope.userData.childName == '' || $scope.userData.childName == undefined ){
			$scope.validation.childNameErr = true;
			$scope.validation.error = $sce.trustAsHtml('יש להזין את שם הילד');
			return;
		}
		if( $scope.userData.city == '' || $scope.userData.city == undefined ){
			$scope.validation.cityErr = true;
			$scope.validation.error = $sce.trustAsHtml('יש להזין עיר מגורים');
			return;
		}
		if( $scope.userData.street == '' || $scope.userData.street == undefined ){
			$scope.validation.streetErr = true;
			$scope.validation.error = $sce.trustAsHtml('יש להזין רחוב');
			return;
		}
		if( $scope.userData.zip == '' || $scope.userData.zip == undefined ){
			$scope.validation.zipErr = true;
			$scope.validation.error = $sce.trustAsHtml('יש להזין מיקוד');
			return;
		}
		if( $scope.userData.homeNumber == '' || $scope.userData.homeNumber == undefined ){
			$scope.validation.homeNumberErr = true;
			$scope.validation.error = $sce.trustAsHtml('יש להזין מספר בית');
			return;
		}
		if( $scope.userData.floor == '' || $scope.userData.floor == undefined ){
			$scope.validation.floorErr = true;
			$scope.validation.error = $sce.trustAsHtml('יש להזין קומה');
			return;
		}
		if( $scope.userData.flatNumber == '' || $scope.userData.flatNumber == undefined ){
			$scope.validation.flatNumberErr = true;
			$scope.validation.error = $sce.trustAsHtml('יש להזין מספר דירה');
			return;
		}


		if( utils.checkObjEmpty( $scope.validation ) ){
			return true;
		}else{
			$scope.validation.error = $sce.trustAsHtml(errTxt);
			return false;
		}
	}

	$scope.shareClick = function(){
		$scope.sendingForm = true;
		$scope.loading_msg = '';
		getFacebookShareImg();
	}

	function getFacebookShareImg(){
		$scope.userData.userPic = $scope.drawData.finalImgSrc.replace( 'data:image/jpeg;base64,' , '' );
		var shareData = { 'userPic' : $scope.userData.userPic , 'type' : 1 };
		dataFactory.sendUser( shareData )
		.success(function ( data ) {
			debugger
			$scope.sendingForm = false;
			$scope.facebook_shareImg_url = 'https://www.hooliganspro.co.il/philips/aventbottles/server/Areas/uploads/s_' + data + '.jpg';
			shareFacebook();
		})
		.error(function (error) {
			debugger
		});
		return;
	}

	function shareFacebook(){
		//window.open('https://www.facebook.com/sharer.php?u=https://hooliganspro.co.il/philips/aventbottles/01/', 'sharer', "width=400,height=300");
		FB.ui({
			method: 'feed',
			name: 'עיצבתי לבייבי שלי בקבוק אישי!',
			link: 'https://hooliganspro.co.il/philips/aventbottles/01/',
			picture: $scope.facebook_shareImg_url,
			description: 'בואו לעצב גם אתם בתחרות של AVENT ואולי תזכו בשביל הבייבי שלכם בחבילת פרסים מפנקת',
			caption: 'תחרות עיצוב הבקבוק של AVENT'
		}, function (response) {
			if (response !== null && typeof response.post_id !== 'undefined') {

			}
		});
	}

	$scope.skipFormBtnClick = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"dont_want_receipt_of_prizes"
		});

		$scope.parentObj.formSkip = true;
		$scope.thanks = true;
		location.href="#/thanks" + urlParams;
	}


};

controllers.Thanks = function( $scope ){
	$scope.formSkip = $scope.parentObj.formSkip;

	$scope.galleryClick_thanks = function(){
		philips.analytics.trackConversion ({
			pagename:"bottle_design",
			name:"interaction",
			description:"watch_gallery"
		});
		$scope.openGallery();
	}


}


aventBottles.controller( controllers );
