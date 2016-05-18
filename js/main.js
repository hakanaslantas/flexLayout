$(document).ready(function(){

	//config require here
	require.config({
		baseUrl: './',
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
			//show basic tab when loaded--
			if(window.location.hash)
				this.$el.find('.demo-' + window.location.hash.slice(1)).click();
			else
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

	require(['./js/view/basic', './js/view/advance.js', './js/view/more.js'], function(BasicView, AdvanceView, MoreView){

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
	
});
