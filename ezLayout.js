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

	var _opts = {}; /*store options*/

	$.fn.ezLayout = function(options){
		//validate options type
		if($.isArray(options)){
			_opts.layout = options;
			_opts = $.extend({}, $.fn.ezLayout.defaults, _opts);
		}else{
			_opts = $.extend({}, $.fn.ezLayout.defaults, options);
		}


		//-------------------------------------------------------
		//think what is the order of adding the tasks
		//or how?
		//trim first then run?
		//or adding while running tasks?
		return this.each(function(index, el){
			//every el has its own task queue
			var _taskQue = [];  /*task queue, iteratively go through layers of layout process instead of recursing*/
			_taskQue.push({//push the first task into queue
				element: el,
				options: _opts
			});
			while(_taskQue.length){
				setLayout(_taskQue[0].element, _taskQue[0].options, _taskQue);
			}
		});

		function setLayout(el, options, _tq){
			var $el = $(el);
			//set requesting div as display flex
			//***need to add check
			$el.css({display: 'flex', 'flex-flow': 'row',  'justify-content': $.fn.ezLayout.flexConfig['justify-content']});

			// stores information for every layer
			var _trimmed = [], 
			// stores id and class information
				_describe,
				$insert;
			// go through layout array
			$.each(options.layout, function(index, config){
				//initialize _trimmed[index]
				_trimmed[index] = [];
				if($.isArray(config)){//this el has multi-layer layout
					_trimmed[index] = config[0].split(':');
					//get the el and 
					//
					//
					if(/(px|em|%)/.test(config[0].split(':')[0]))//fixed width
						$insert = $('<div style="flex: 0 0 ' + config[0].split(':')[0] + ';" ' + config[0].split(':')[1] + '></div>');
					else
						$insert = $('<div style="flex: ' + config[0].split(':')[0] + ' 1 0;"  ' + config[0].split(':')[1] + '></div>');
					$insert.appendTo($el);

					console.log($insert[0], config[1]);
					_tq.push({
						element: $insert,
						options: {
							layout: config[1]
						}
					});
					//$insert.ezLayout(config[1]);
				}else{//single layer layout
					_trimmed[index] = config.split(':');

					//add div with flex setup
					
					if(/(px|em|%)/.test(config.split(':')[0]))//fixed width
						$insert = $('<div style="flex: 0 0 ' + config.split(':')[0] + ';" ' + config.split(':')[1] + '></div>');
					else
						$insert = $('<div style="flex: ' + config.split(':')[0] + ' 1 0;"  ' + config.split(':')[1] + '></div>');
					$insert.appendTo($el);
					
				}
			});

			_tq.shift();

			console.log(_tq);

			/////////now write pseudo-code
			/**
			 * The options we get here is an object. What is the first step ?
			 *
			 * trim the layout array and study the layers of the layouts and consult the direction, adjust and barstyle
			 * check whether those configurations are arrays or single string
			 *
			 *
			 *
			 *
			 *
			 * -- now .each element has its own taskque instead of a global task queue
			 * -- direction, adjust and barstyle now only takes a single string, if some wanted to same direction layout then just simply chain the method
			 * -- only consults barstyle if it is adjustable
			 * -- 
			 */

			//no need to return the element, $(selector).each() returns this.
			//return el;
		}
		
	};

	/*default config for the plugin*/
	$.fn.ezLayout.defaults = {
		/*defines the final layout, ['...', '...'], []*/
		layout: [
			'100px:id="left" class="left-1 left-2"',
			'2:id="center"',
			['1:id="right"', ['1:class="right-top"','3:id="right-bottom" class="bg-primary"']]
		],
		/*defines the direction of the layout; 'h', 'v'*/
		direction: 'v',
		/*defines the height of the parent block; '...string...'*/
		height: '100%',
		/*defines the width of the parent block '...string...'*/
		width: '100%',
		/*defines wether the width/height of created blocks can be adjusted or not, boolean*/
		adjust: false,
		/*defines the style of divide bars between created blocks, {...css object}, '...string of class name...', false*/
		barstyle: false
	};

	/**
	 * Default flexbox config used inside the plugin. if you do not like the default config, you can change it here.
	 */
	$.fn.ezLayout.flexConfig = {
		'justify-content': 'flex-start'
	};
	
}(window.jQuery));