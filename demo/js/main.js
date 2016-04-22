$(document).ready(function(){
	var TestView = Backbone.View.extend({
		el: $('#test'),

		render: function(){
			var that = this;
			$.get('templates/basic.html', function(data){
				that.$el.append(data);
			});
			return this;
		}
	});

	var test = new TestView();
	test.render();
});
