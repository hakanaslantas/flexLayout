$(document).ready(function(){

	var BasicView = Backbone.View.extend({
		el: '.demo-content',
		render: function(){
			var that = this;
			$.get('templates/basic.html', function(data){
				that.$el.html('').append(data);
			});
			//load prism async to highlight code tags
			loadCSS('./css/prism.css');
			require(['./libs/prism.js'], function(prism) {
			    Prism.highlightAll();
			});
			return this;
		}
	});

	var AdvanceView = Backbone.View.extend({
		el: '.demo-content',
		render: function(){
			var that = this;
			$.get('templates/advance.html', function(data){
				that.$el.html('').append(data);
			});
			return this;
		}
	});

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

	var AppView = Backbone.View.extend({
		el: '#app',
		events: {
			'click .demo-tab': 'contentSwitch'
		},
		initialize: function(){
			this.render();
		},
		render: function(){
			//show basic tab when loaded
			this.$el.find('.demo-basic').click();
		},
		contentSwitch: function(e){
			var $el = $(e.target);
			this.$el.find('.demo-tab').removeClass('active');
			$el.addClass('active');
			//change url to load corresponding views
			switch($el.data().hash){
				case '#basic':
					window.location.hash = $el.data().hash;
				break;
				case '#advance':
					window.location.hash = $el.data().hash;
				break;
				case '#more':
					window.location.hash = $el.data().hash;
				break;
				default:
				break;
			}
		}

	});
	
	var AppRouter = Backbone.Router.extend({
		routes: {
			'basic': 'basic',
			'advance': 'advance',
			'more': 'more'
		},
		basic: function(){
			new BasicView().render();
		},
		advance: function(){
			new AdvanceView().render();
		},
		more: function(){
			new MoreView().render();
		}
	});

	//backbone router
	new AppRouter();
	Backbone.history.start();

	//kick start
	var App = new AppView();

	
});
