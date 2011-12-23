/*** 2d slider ***/
/*
 * TODO
 * 1. dry code Fx && direction selection methods
 * 2. check for unused methods
 *
 */

var HV_Slider = new Class({
	

	//** implements  **
	Implements: [Options],

	//** user-defined variables  **
	options: {
	  
	  container: 'relContainer',
	  startX: 2,
	  startY: 2,
	  pageHref: location.href,
	  duration: 1000
	},

	//** initialization  **
	initialize: function(options) {
		var self = this;
		var anchor = this.options.pageHref.split('#')['1'];

		//** getting rows of the slider container **
		row = $(this.options.container).getChildren('li')
		
		coordY = 0;
		row.each(function(item){
			coordY++;
			screens = item.getElements('li')
			
			coordX = 0;
			screens.each(function(slide){
				coordX++;
				slide.id = "screen-"+coordX+"-"+coordY;
				self.addControls(slide.id);
			})
		});

		//** set lnear dimensions for items && their containers
		self.setDimensions();

		//**  check query string for coords                           **
		//**  if empty - using the user-defined 'startX' && 'startY'  **
		/*
		if(anchor == null){
			self.slideTo(self.options.startX, self.options.startY);
		}
		else
		{
			//self.parseId();
			self.slideTo(coordX, coordY);
			//alert('Using incoming coords');
		}
		*/
	},

	
	start: function() {
		var self = this;
	},

	slideTo: function(coordX, coordY) {
		var self = this;
		//alert('Call from initializer with '+coordX+" "+coordY);
	},

	//** adding controls link to each screen
	addControls: function(passedId){
		var self = this;
		
		var toTop = new Element('a.toTop',{
			events: {
				click: function(){
					self.slideVer('top', this.rel, passedId);
				}
			}
		});
		toTop.set('rel', passedId+'-top');
		toTop.inject($(passedId));

		var toBot = new Element('a.toBot',{
			events: {
				click: function(){
					self.slideVer('bot', this.rel, passedId);
				}
			}
		});
		toBot.set('rel', passedId+'-bot');
		toBot.inject($(passedId));

		var toLeft = new Element('a.toLeft',{
			events: {
				click: function(){
					self.slideHor('left', this.rel, passedId);
				}
			}
		});
		toLeft.set('rel', passedId+'-left');
		toLeft.inject($(passedId));

		var toRight = new Element('a.toRight',{
			events: {
				click: function(){
					self.slideHor('right', this.rel, passedId);
				}
			}
		});
		toRight.set('rel', passedId+'-right');
		toRight.inject($(passedId));
	},

	slideVer: function(direction, screenId, passedId){
		var self = this;
		//y = self.parseRel(screenId)[1];
		
		var curRow = $(passedId).getParent().getParent();
		
		if(direction == 'top'){
			if(curRow === curRow.getParent().getFirst('li')){
			var step = curRow.scrollHeight * (curRow.getParent().getChildren().length-1);

				var slideFx = new Fx.Morph(curRow.getParent(), {
			    duration: self.options.duration,
			    transition: Fx.Transitions.Sine.easeOut
				});
				slideFx.start({
			    'top': -step  
				});

			}
			else{
				var curPos = curRow.offsetTop;
				var step = curRow.offsetTop - curRow.offsetHeight;

					var slideFx = new Fx.Morph(curRow.getParent(), {
				    duration: self.options.duration,
				    transition: Fx.Transitions.Sine.easeOut
					});
					slideFx.start({
				    'top': -step  
					});
			}
		}

		if(direction == 'bot'){
			if(curRow === curRow.getParent().getLast('li')){

				var slideFx = new Fx.Morph(curRow.getParent(), {
			    duration: self.options.duration,
			    transition: Fx.Transitions.Sine.easeOut
				});
				slideFx.start({
			    'top': 0  
				});

			}
			else{
				var curPos = curRow.offsetTop;
				var step = -curPos - curRow.offsetHeight;
				//curRow.getParent().setStyle('top', step)

				var slideFx = new Fx.Morph(curRow.getParent(), {
			    duration: self.options.duration,
			    transition: Fx.Transitions.Sine.easeOut
				});
				slideFx.start({
			    'top': step  
				});

			}
		}
	},

	slideHor: function(direction, screenId, passedId){
		var self = this;
		//x = self.parseRel(screenId)[0];
		//alert(x);

		var curItem = $(passedId);

		if(direction == 'left'){
			if(curItem === curItem.getParent().getFirst('li')){
				var step = curItem.offsetWidth * (curItem.getParent().getChildren().length-1);

				var slideFx = new Fx.Morph(curItem.getParent(), {
			    duration: self.options.duration,
			    transition: Fx.Transitions.Sine.easeOut
				});
				slideFx.start({
			    'left': -step  
				});

			}
			else{
				var curPos = curItem.offsetLeft;
				var step = curPos - curItem.offsetWidth;

				var slideFx = new Fx.Morph(curItem.getParent(), {
			    duration: self.options.duration,
			    transition: Fx.Transitions.Sine.easeOut
				});
				slideFx.start({
			    'left': -step  
				});
			}
		}

		if(direction == 'right'){
			if(curItem === curItem.getParent().getLast('li')){

				var slideFx = new Fx.Morph(curItem.getParent(), {
			    duration: self.options.duration,
			    transition: Fx.Transitions.Sine.easeOut
				});
				slideFx.start({
			    'left': 0  
				});
			}
			else{
				var curPos = curItem.offsetLeft;
				var step = -curPos - curItem.offsetWidth;

				var slideFx = new Fx.Morph(curItem.getParent(), {
			    duration: self.options.duration,
			    transition: Fx.Transitions.Sine.easeOut
				});
				slideFx.start({
			    'left': step  
				});
			}
		}
	},

	parseRel: function(screenId){
		x = screenId.split('-')['1'];
		y = screenId.split('-')['2'];
		return [x, y];
	},

	setDimensions: function(){
		var row = $$('.row');

		row.each(function(r){
				var width = r.getChildren('li').length * r.offsetWidth;
				
				r.getChildren('li').each(function(li){
					li.setStyle('width', r.offsetWidth)
				})

				r.setStyle('width', width);
		})
	}
})