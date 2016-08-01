var lazyLoad = {
	elementObj : [],
	downloadCount : 0,

	getViewport: function(){
		/*alert(typeof viewportHeight); number类型*/
		var viewportHeight = 0;
		if(document.compatMode == 'BackCompact'){
			viewportHeight = document.body.clientHeight;
		}else{
			viewportHeight = document.documentElement.clientHeight;
		}
		return viewportHeight;
	},
	getScrollTop: function(){
		var elementScrollTop = 0;
		if(document.compactMode == 'BackCompat'){
			elementScrollTop = document.body.scrollTop;
		}else{
			elementScrollTop = document.documentElement.scrollTop;
		}
		return elementScrollTop;
	},
	getElementViewTop: function(element){
		if(element){
			var actualTop = element.offsetTop,
				current = element.offsetParent;
			while(current){
				actualTop += current.offsetTop;
				current = current.offsetParent;
			}
			return actualTop - this.getScrollTop();
		}
	},
	initElementMap: function(){
		var el = document.getElementsByTagName('img');
		for(var i=0, elementLen = el.length; i<elementLen; i++){
			if(el[i].getAttribute('data-lazy-src')){
				this.elementObj.push(el[i]);
				this.downloadCount++;
			}
		}
	},
	lazy: function(){
		/*防止多次加载*/
		if(!this.downloadCount){
			return 
		}
		var innerHeight = this.getViewport();
		for(var i=0, len=this.elementObj.length; i<len; i++){
			var eleToDoc = this.getElementViewTop(this.elementObj[i]);
			if(eleToDoc - this.getViewport() < innerHeight){
				this.elementObj[i].src = this.elementObj[i].getAttribute('data-lazy-src');
				delete this.elementObj[i];
				this.downloadCount--;
			}
		}
	},
	init: function(){
		var self = this;
		this.initElementMap();
        this.lazy();
		window.onscroll = function(){
			setTimeout(function(){
				/*console.log(this); this指向全局window*/
				self.lazy();
			}, 1000);
		};
	}
};

lazyLoad.init();
