/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 *
 *
 * expose functions/objects: defaults, flex default configs
 *
 * unexpose functions/objects: setLayout
 */

;(function($){

	$.fn.flexLayout = function(opts){
		var _options = {}; /*store options*/
		//consult options
		if($.isArray(opts)){
			_options.layout = opts;
			_options = $.extend({}, $.fn.flexLayout.defaults, _options);
		}else{
			_options = $.extend({}, $.fn.flexLayout.defaults, opts);
		}
		//setup layout iteratively
		return this.each(function(index, el){
			var _taskQue = [],  //task queue
				$el = $(el);
			/**
			 * Only setup height/width for the first layer, since the following layers will self-expand with style flex.
			 * Therefore, need to check whether el already has flex style properties(e.g. setup by previous chain calling), if yes do not setup height/wdith.
			 * 
			 * !Caveat: do not check $el.css('flex-XXX'), it returns wrong values. Use DOM node instead.
			 */
			if(!el.style['flex-grow'] && !el.style['flex-shrink'] && !el.style['flex-basis'])
				$el.css({height: _options.height, width: _options.width});
			//push the first task into queue
			_taskQue.push({
				$element: $el,
				options: _options
			});
			//traverse task queue
			while(_taskQue.length){
				setLayout(_taskQue[0].$element, _taskQue[0].options, _taskQue);
			}
		});
	};

	/**
	 * Default config for the plugin
	 */
	$.fn.flexLayout.defaults = {
		/*defines the final layout, ['...', '...'], []*/
		layout: [
			'100px:id="left" class="left-1 left-2"',
			'2:id="center"',
			['1:id="right"', ['1:class="right-top"','3:id="right-bottom" class="bg-primary"']]
		],
		/*defines the height of the parent block; '...string...'*/
		height: '100%',
		/*defines the width of the parent block '...string...'*/
		width: '100%',
		/*defines the direction of the layout; 'h', 'v' or ['h', 'v', 'v', ...]*/
		dir: 'v',
		/*defines wether the width/height of created blocks can be adjusted or not, boolean or [boolean, boolean]*/
		adjust: false,
		/*defines the style of divide bars between created blocks, {...css object}, '...string of class name...', boolean or [..., ..., ..., ...]*/
		bars: true
	};

	/**
	 * Default flexbox config used inside the plugin. if you do not like the default config, you can change it here.
	 */
	$.fn.flexLayout.flexConfig = {
		'justify-content': 'flex-start'
	};

	/**
	 * main layout setup function
	 */
	function setLayout($el, opts, _tq){
		//check direction configure to setup flex-flow
		var _flow = (($.isArray(opts.dir) ? opts.dir[0] : opts.dir) === 'v') ? 'row' : 'column';
		//setup flex parameters
		$el.css({display: 'flex', 'flex-flow': _flow,  'justify-content': $.fn.flexLayout.flexConfig['justify-content']});
		//go through layout array
		$.each(opts.layout, function(index, config){
				//get size
			var _dimension = $.isArray(config) ? config[0].split(':')[0] : config.split(':')[0],
				//check whether fixed or flexible
				_style = /(px|em|%)/.test(_dimension) ? 'style = "flex: 0 0 ' + _dimension + ';" ' : 'style="flex: ' + _dimension + ' 1 0;" ', 
				//check attributes
				_attribute = $.isArray(config) ? trimAttr(config[0].split(':')[1]) : trimAttr(config.split(':')[1]),
				//make block object
				_$block = $('<div ' + _style + _attribute + '></div>'),
				//save a copy of arraies, it might be multiple certain level of blocks; therefore do not 'shift' on original array
				_adjust = opts.adjust,
				_bars = opts.bars,
				_dir = opts.dir;
			//append block
			_$block.appendTo($el);
			//insert bars if necessary
			if(($.isArray(_bars) ? _bars[0] : _bars) && index < opts.layout.length - 1){
				var _barstyle = trimBarStyle($el, ($.isArray(_bars) ? _bars[0] : _bars)), //trim/fetch barstyle for later use, {}
					//bar object for later use, if necessar
					_$bar = $('<div ' + _barstyle + '></div>');
				//append bar
				_$bar.appendTo($el);
				//if adjustable
				if($.isArray(_adjust) ? _adjust[0] : _adjust){
					//check direction, insert cursor style accordingly
					_$bar.css({
						cursor: (function(){ return ($.isArray(_dir) ? _dir[0] : _dir) === 'v' ? 'ew-resize' : 'ns-resize'; })()
					});
				}
			}
			//multi-layer layout, push next layer into task que
			if($.isArray(config)){
				_tq.push({
					$element: _$block,
					options: {
						layout: config[1],
						dir: (function(){if($.isArray(_dir)) {_dir.shift(); return _dir[0];} else{ return (_dir === 'v') ? 'h' : 'v'; }})(),
						adjust: (function(){if($.isArray(_adjust)) _adjust.shift(); return (_adjust.length) /*in case length is less than levels*/ ?_adjust : $.fn.flexLayout.defaults.adjust; })(),
						bars: (function(){if($.isArray(_bars)) _bars.shift(); return (_bars.length) /*in case length is less than levels*/? _bars : $.fn.flexLayout.defaults.bars;})()
					}
				});
			}
		});
		//remove the current finished task
		_tq.shift();
	}

	/**
	 * Get barstyle given by user.
	 * Or fill the barstyle if user want adjust but did not provide bar style
	 */
	function trimBarStyle($el, bstyle){
		if($.type(bstyle) === 'boolean'){//no barstyle
			return 'style="flex: 0 0 3px;background-color: #999;"';
		}else if($.isPlainObject(bstyle)){//css object
			var _styleStr = 'style="';
			$.each(bstyle, function(key, value){
				_styleStr += key + ': ' + value + ';';
			});
			return _styleStr + '"';
		}else if($.type(bstyle) === 'string'){//string of class names
			return 'class="' + bstyle + '"';
		}else{//wrong input
			throw new Error('jQuery plugin::flexLayout::error on barstyle settings');
		}

	}

	/**
	 * Trim attributes given by user, if user uses selectors style(e.g. #, .)
	 *
	 * Note: if using selector style, the function performs under the assumption that only one 'id' exits.
	 * 		 That is, there is only one '#' in the selector style string.
	 */
	function trimAttr(attrStr){
		var _attr = '',
			_classArr = [];
		//empty
		if(!attrStr)
			return '';
		//selector style
		if(/(#|\.)/.test(attrStr) && !/(href)/.test(attrStr)){
			//remove spaces
			attrStr = attrStr.replace(/\s/g, '');
			//id extis
			if(/#.*?(?=\.|$)/i.test(attrStr)){
				_attr += attrStr.match(/#.*?(?=\.|$)/i)[0].replace('#', 'id="') + '"';
				//remove # part in the original string for later use
				attrStr = attrStr.replace(attrStr.match(/#.*?(?=\.|$)/i)[0], '');
			}
			if(attrStr){
				//add classes to attribute string
				_attr += ' class="';
				_classArr = attrStr.split('.');
				$.each(_classArr, function(index, str){
					if(str)//ignore empty string caused by split
						_attr += str + ((index === _classArr.length - 1) ? '' : ' ');
				});
				_attr +='"';
			}
			return _attr;
		}
		//inline style
		else{
			return attrStr;
		}
	}
	
}(window.jQuery));