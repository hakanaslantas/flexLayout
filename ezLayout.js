/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 *
 *
 * expose functions/objects: defaults
 *
 * unexpose functions/objects: setLayout
 */

;(function($){

	/*task queue, iteratively go through layers of layout process*/
	var _taskQue = [];

	$.fn.ezLayout = function(options){
		var opts = $.extend({}, $.fn.ezLayout.defaults, options);

		return this.each(function(index, el){
			setLayout(el, opts);
		});

		function setLayout(el, options){
			console.log(el, options);
		}
		
	};

	$.fn.ezLayout.defaults = {
		/*defines the final layout, ['...', '...'], []*/
		layout: [
			'1:#left',
			['2:#right', ['1:#right-top','3:#right-bottom']]
		],
		/*defines the direction of the layout; 'h', 'v' or ['h', 'v', ...]*/
		direction: 'h',
		/*defines the height of the parent block; '...string...'*/
		height: '100%',
		/*defines the width of the parent block '...string...'*/
		width: '100%',
		/*defines wether the width/height of created blocks can be adjusted or not, boolean*/
		adjustble: false,
		/*defines the style of divide bars between created blocks, {...css object}, '...string of class name...', false, [..., ...]*/
		barstyle: false
	};
	
}(window.jQuery));