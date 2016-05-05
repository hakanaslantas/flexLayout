$(document).ready(function(){

	var BasicView = Backbone.View.extend({
		el: '.demo-content',
		events: {

		},
		render: function(){
			var that = this;
			$.get('templates/basic.html', function(data){
				that.$el.html('').append(data);
				//load prism async to highlight code tags
				loadCSS('./css/prism.css');
				require(['./libs/prism.js'], function(prism) {
			    	Prism.highlightAll();
				});
			
				/*var mycm = CodeMirror.fromTextArea(that.$el.find('#mycode')[0], {
					value: "layout1 = ['1', '3', '5'];",
					mode: 'javascript',
					lineWrapping: true,
					lineNumbers: true
				});

				mycm.getDoc().setValue("$('#result').flexlayout(['1', '3', '5'])", {
					height: ' ',
					width: ' '
				});*/

				
//
				that.$el.find('#code-layoutConfig').flexlayout(['1:#codemirror-layoutConfig', '1:#result-layoutConfig'], {
					dir: 'v',
					height: '300px'
				});

				that.$el.find('#codemirror-layoutConfig').html('<textarea id="mycode-layoutConfig" cols="3" rows="1"></textarea>');

				var mycm = CodeMirror.fromTextArea(that.$el.find('#mycode-layoutConfig')[0], {
					value: "layout1 = ['1', '3', '5'];",
					mode: 'javascript',
					lineWrapping: true,
					lineNumbers: true,
				});

				mycm.getDoc().setValue("$('#result-layoutConfig').flexlayout(['1', '3', '5'])", {
					height: ' ',
					width: ' '
				});



				var s = document.createElement('script');
				s.textContent = mycm.getDoc().getValue();
				document.body.appendChild(s);
				
				


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
			//show basic tab when loaded--
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
