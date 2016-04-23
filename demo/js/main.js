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

	var BasicView = Backbone.View.extend({
		el: '.tab-content #basic',
		render: function(){
			var that = this;
			$.get('templates/basic.html', function(data){
				that.$el.html('').append(data);
			});
			return this;
		}
	});

	var AdvanceView = Backbone.View.extend({
		el: '.tab-content #advance',
		render: function(){
			var that = this;
			$.get('templates/advance.html', function(data){
				that.$el.html('').append(data);
			});
			return this;
		}
	});

	var MoreView = Backbone.View.extend({
		el: '.tab-content #more',
		render: function(){
			var that = this;
			$.get('templates/more.html', function(data){
				that.$el.html('').append(data);
			});
			return this;
		}
	});
	
	var AppRouter = Backbone.Router.extend({
		routes: {
		//	'': 'tabs',
			'basic': 'basic',
			'advance': 'advance',
			'more': 'more'
		},
		/*tabs: function(op1, op2){
			console.log(op1, op2);
		},*/
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

	new AppRouter();
	Backbone.history.start();


	  var hash = window.location.hash;
	  hash && $('ul.nav a[href="' + hash + '"]').tab('show');
	 
	 $('.nav-tabs a').click(function (e) {
	    //$(this).tab('show');
	    //var scrollmem = $('body').scrollTop();
	    window.location.hash = this.hash;
	    //$('html,body').scrollTop(scrollmem);
	  });


	
	
	
});
