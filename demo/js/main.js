$(document).ready(function(){

	var BasicView = Backbone.View.extend({
		el: '.demo-content',
		events: {
			'click #apply-layoutConfig': 'apply-layoutConfig',
			'click #reset-layoutConfig': 'reset-layoutConfig',
			'click #apply-options': 'apply-options',
			'click #reset-options': 'reset-options',
			'change #wrap-layout': 'wrap-layout',
			'change #wrap-options': 'wrap-options'
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
				//layoutConfg codemirror and result area
				that.$el.find('#code-layoutConfig').flexlayout(['1:#codemirror-layoutConfig', '1:#result-layoutConfig'], {
					dir: 'v',
					height: '400px'
				});
				//setup layoutConfig code mirror
				that.$el.find('#codemirror-layoutConfig').html('<textarea id="mycode-layoutConfig" cols="3" rows="1"></textarea>');
				that.cmlc = CodeMirror.fromTextArea(that.$el.find('#mycode-layoutConfig')[0], {
					mode: 'javascript',
					lineWrapping: true,
					lineNumbers: true,
				});
				//set up default value
				that.cmlc.getDoc().setValue("//change layoutConfig array and apply.\n" +
					"//use developer tools to check attributes \n\n"+
					" var layoutConfig = ['100px:#top', '3', '5']; \n\n "+
					"$('#result-layoutConfig').flexlayout(layoutConfig);");
				//execute script inside code mirror
				var slc = document.createElement('script');
				slc.textContent = that.cmlc.getDoc().getValue();
				document.body.appendChild(slc);

				//options codemirror and result area
				that.$el.find('#code-options').flexlayout(['1:#codemirror-options', '1:#result-options'], {
					dir: 'v',
					height: '500px'
				});
				//setup options code mirror
				that.$el.find('#codemirror-options').html('<textarea id="mycode-options" cols="3" rows="1"></textarea>');
				that.cmop = CodeMirror.fromTextArea(that.$el.find('#mycode-options')[0], {
					mode: 'javascript',
					lineWrapping: true,
					lineNumbers: true,
				});
				//set up default value
				that.cmop.getDoc().setValue("//change layoutConfig array and apply.\n" +
					"//use developer tools to check attributes \n\n"+
					" var layoutConfig = ['20px:#fixed', '2', '3', '5']; \n\n "+
					"$('#result-options').flexlayout(layoutConfig, {\n"+
						"\t\t dir: 'v',\n"+
						"\t\t adjust: true,\n"+
						"\t\t bars: {flex: '0 0 3px', 'background-color': '#999'},\n"+
				"\t});");
				//execute script inside code mirror
				var sop = document.createElement('script');
				sop.textContent = that.cmop.getDoc().getValue();
				document.body.appendChild(sop);
				//click wrap-options checkbox to disable wrap
				_.defer(function(){
					that.$el.find('#wrap-options').click();
				});
			});
			return this;
		},
		'apply-layoutConfig': function(){
			this.$el.find('#result-layoutConfig').html('');
			var s = document.createElement('script');
			s.textContent = this.cmlc.getDoc().getValue();
			document.body.appendChild(s);
		},
		'reset-layoutConfig': function(){
			//set up default value
			this.cmlc.getDoc().setValue("//change layoutConfig array and apply.\n" +
				"//use developer tools to check attributes \n\n"+
				" var layoutConfig = ['100px:#top', '3', '5']; \n\n "+
				"$('#result-layoutConfig').flexlayout(layoutConfig)");
		},
		'apply-options': function(){
			this.$el.find('#result-options').html('');
			var sop = document.createElement('script');
			sop.textContent = this.cmop.getDoc().getValue();
			document.body.appendChild(sop);
		},
		'reset-options': function(){
			//set up default value
			this.cmop.getDoc().setValue("//change options and apply.\n" +
				"//use developer tools to check attributes \n\n"+
				" var layoutConfig = ['20px:#fixed', '2', '3', '5']; \n\n "+
				"$('#result-options').flexlayout(layoutConfig, {\n"+
					"\t\t dir: 'v',\n"+
					"\t\t adjust: true,\n"+
					"\t\t bars: {flex: '0 0 3px', 'background-color': '#999'},\n"+
			"\t});");
		},
		'wrap-layout': function(){
			this.cmlc.setOption('lineWrapping', !this.cmlc.options.lineWrapping);
		},
		'wrap-options': function(){
			this.cmop.setOption('lineWrapping', !this.cmop.options.lineWrapping);
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
