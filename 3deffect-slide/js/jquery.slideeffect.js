/*
 * the pagination plugin developed by Jubayer Shamshed.
 * If you have any problem then contact me. my email id: j3shamshed@yahoo.com. 
 * Be sure about subject of e-mail.
 * Please advertise this plugin, do not remove comment portion
 * */

(function($) {

	jQuery.fn.jubayerpagination = function(options) {
		var opt = {

			speed : 2000,
			delay : 150,
			//easing : 'easeInOutElastic',
			paginationActiveUrl:'images/round_active.png',
			paginationInActiveUrl:'images/round_inactive.png',
			paginationImageWidth: 32,
			lowerLimit:0,
			upperLimit:3,
			numberOfShow:4,
			auto:true
		};
		var o = jQuery.extend(opt, options);
		var lowerLimit=o.lowerLimit;
		var upperLimit=o.upperLimit;
		var count_loop=0;
		var count = 1;
		return this
				.each(function() {
					var e = $(this);
					var Slider = function() {
						this.now_view = e.find('div.view');
						this.now_view_img = e.find('div.view img');
						this.main = e.find('div.main_total_effect');
						this.now_view_width = this.main.width();
						this.now_view_height = this.main.height();
						this.now_view_count = (this.now_view.length); // Match
						// index
						this.number_pagination = (this.now_view_count) / o.numberOfShow;

						this.go = function(lowerLimit, upperLimit, track,
								trackActiveIndex) { // Rotate images
							
							$('div.pagination img#' + trackActiveIndex).attr(
									'active', 'inactive').attr('src',
									'images/round_inactive.png');
							$('div.pagination img#' + track).attr('active',
									'active').attr('src',
									'images/round_active.png');
							
							if (track > 1) {
								for ( var j = 0; j < lowerLimit; j++) {
									this.now_view.eq(j).removeClass('show');
								}for(var j = upperLimit; j < this.now_view_count; j++){
									
									this.now_view.eq(j).removeClass('show');
								}
							}else{
								for ( var j = upperLimit; j < this.now_view_count ; j++) {
									this.now_view.eq(j).removeClass('show');
								}
							}
							
							
							
							for ( var i = lowerLimit; i <= upperLimit; i++) {
								
								this.now_view.eq(i).delay(o.delay).addClass('show');
							}
							
							
						};
						
						this.autoGo =function(){
							var trackActiveIndex = this
							.getActiveIndexPagination();
							if(count==1){
								this.go(o.lowerLimit, o.upperLimit, count,
										trackActiveIndex);
							}else{
								 upperLimit = (count*o.numberOfShow)-1;
								    lowerLimit = (count*o.numberOfShow)-(o.numberOfShow);
									this.go(lowerLimit, upperLimit,
											count, trackActiveIndex);
							}
							
						};
						this.getActiveIndexPagination = function() {
							
							var returnTypeIndex;
							$('div.pagination img').each(function() {

								if ($(this).attr('active') == 'active') {

									returnTypeIndex = $(this).attr('id');
								}
							});

							return returnTypeIndex;
						};

						this.next = function(track, active) {
							
							
							var trackActiveIndex = this
									.getActiveIndexPagination();
							if (track == 1 && active != 'active') {
							
								this.go(o.lowerLimit, o.upperLimit, track,
										trackActiveIndex);
							} else if (track > 1 && active != 'active') {
							
								    upperLimit = (track*o.numberOfShow)-1;
								   // var sum = o.numberOfshow;
								    lowerLimit = (track*o.numberOfShow)-(o.numberOfShow);
									this.go((lowerLimit), (upperLimit),
											track, trackActiveIndex);
								
							}
						};

						this.init = function() {
							
							for(var i=lowerLimit; i<=upperLimit; i++){
								
								this.now_view.eq(i).addClass('show');
							}
							if (this.number_pagination > 1) {
								
								for ( var i = 1; i <= (this.number_pagination); i++) {
									$('div.pagination')
											.append(
													'<img id="'
															+ i
															+ '" src="'+o.paginationInActiveUrl+'">');
									count_loop = i;
								}
								
								var img_pagination_width = o.paginationImageWidth;
								$('div.pagination').css('width',
										(img_pagination_width * count_loop))
										.css('margin-left', 'auto').css(
												'margin-right', 'auto').css(
												'margin-top', 0).css(
												'margin-bottom', 0);
								$('div.pagination img').eq(0).attr('src',
										o.paginationActiveUrl).attr(
										'active', 'active');
								this.navNext = e.find('div.pagination img');
							}
						};

					};

					var slider = new Slider();
					slider.init();
					slider.navNext.click(function(e) { // Click next button
						e.preventDefault();
						var track = $(this).attr('id');
						var active = $(this).attr('active');
						
						slider.next(track, active);
					});
					
					
					
					if (o.auto === true) {
						
						var timer = function(){
							if(count<=count_loop)
							{
								slider.autoGo();
							}else{
								count=1;
								slider.autoGo();
							}
							count++;
						};
						
						var interval = setInterval(timer, o.speed);
			
						// Pause when hovering image
						e.hover(function(){clearInterval(interval);}, function(){interval=setInterval(timer, o.speed);});
				
					}

				});
	};

})(jQuery);