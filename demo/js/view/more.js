(function(){
	define(function(){
		var MoreView = Backbone.View.extend({
			el: '.demo-content',
			render: function(){
				var that = this;
				$.get('templates/more.html', function(data){
					that.$el.html('').append(data);
				});
				return this;
			}
		});

		return MoreView;
	});
})();