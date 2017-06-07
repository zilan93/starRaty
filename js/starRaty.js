;(function($) {
	//代码封装
	var StarRaty = (function() {
		//半颗还是一颗
		var _select = function($this,e,that) {
			if((e.pageX - $this.offset().left) < $this.width() /2) {
				that.add = 0.5;
			} else {
				that.add = 1;
			}
		}
		//销毁事件
		var _destory = function(that) {
			that.$el.off();
		}
		//绑定事件
		var _bind = function(that){
			if(that.options.isHandle) {
				that.$el.on("mousemove",".img-item",function(e) {
					_select($(this),e,that);
					that.lightOn($(this).index() + that.add);
				}).on("click",".img-item",function(e) {
					_select($(this),e,that);
					that.options.lightStar = $(this).index() + that.add;
					that.lightOn(that.options.lightStar);
					_destory(that);
				}).on("mouseout",".img-item",function() {
					that.lightOn(that.options.lightStar);
				});
				//_destory(that);
			}
		}
		//html模板
		var _htmlTemplate = function(that) {
			var starHtml = '';
			for(var i = 0; i<that.options.total; i++) {
				starHtml += '<img src="'+ that.defaults.imgSrc +'star-off.png" alt="" class="img-item"/>';
			};
			that.$el.append(starHtml);
			_bind(that);
		};
		//添加文字
		var _addText = function(that,num) {
			if($(".tip-text").length == 0){
				var textHtml = '<span class="tip-text"></span>';
				that.$el.append(textHtml);
			}
			$('.tip-text').html(that.options.text[num-1]);
		};
		//定义构造函数
		var starFun = function() {};
		starFun.prototype.init = function(el,opt) {
			this.$el = $(el);
			this.defaults = {
				'total': 5,
				'lightStar': 3,
				'isHandle': true,
				'text': ['很差','较差','合格','较好','很好'],
				'isEntire': false,
				'imgSrc': 'img/'
			};
			this.options = $.extend({},this.defaults,opt);
			this.add = this.options.isEntire ? 1 : 0.5;
			//生成html；
			_htmlTemplate(this);
			this.children = this.$el.find(".img-item");
			//默认点亮星星
			this.lightOn(this.options.lightStar);
		};
		//点亮星星
		starFun.prototype.lightOn = function(number) {
			var self = this;
			var num = parseInt(number);
			$(this.children).each(function(index,item) {
				if(index < number) {
					item.src = self.defaults.imgSrc +'star-on.png';
				} else {
					item.src = self.defaults.imgSrc +'star-off.png';
				}
			});
			//半颗星星
			if(num < number && !this.options.isEntire) {
				$(this.children).eq(num).get(0).src = this.defaults.imgSrc +'star-half.png';
			}
			//添加文字
			_addText(this,Math.ceil(number));
		};
		return starFun;
	})();
	//jQuery插件绑定
	$.fn.starRaty = function(options) {
		return this.each(function() {
			new StarRaty().init(this,options);
		})
	}
})(jQuery);