(function(){
	define(function(){
		var AdvanceView = Backbone.View.extend({
			el: '.demo-content',
			events: {
				'click #apply-advance-layout': 'apply-advance-layout',
				'click #reset-advance-layout': 'reset-advance-layout',
				'click #apply-advance-options': 'apply-advance-options',
				'click #reset-advance-options': 'reset-advance-options',
				'change #wrap-advance-layout': 'wrap-advance-layout',
				'change #wrap-advance-options': 'wrap-advance-options'
			},
			render: function(){
				var that = this;
				$.get('templates/advance.html', function(data){
					//inject template
					that.$el.html('').append(data);
					//load prism async to highlight code tags
					loadCSS('./css/prism.css');
					require(['./js/libs/prism.js'], function(prism) {
				    	Prism.highlightAll();
					});
					//layoutConfg codemirror and result area
					that.$el.find('#code-advance-layout').flexlayout(['1:#codemirror-advance-layout', '1:#result-advance-layout'], {
						dir: 'v',
						height: '400px'
					});
					//setup layoutConfig code mirror
					that.$el.find('#codemirror-advance-layout').html('<textarea id="mycode-advance-layout" cols="3" rows="1"></textarea>');
					that.cmlc = CodeMirror.fromTextArea(that.$el.find('#mycode-advance-layout')[0], {
						mode: 'javascript',
						lineWrapping: false,
						lineNumbers: true,
					});
					//set up default value
					that.cmlc.getDoc().setValue("//change layoutConfig array and apply.\n" +
						"//use developer tools to check attributes \n\n"+
						" var layoutConfig = [\n\t'100px:#top', \n\t['1:#content', ['1', '5']], \n\t'50px:#footer'\n]; \n\n "+
						"$('#result-advance-layout').flexlayout(layoutConfig);");
					//execute script inside code mirror
					var slc = document.createElement('script');
					slc.textContent = '(function(){' + that.cmlc.getDoc().getValue() + '})();';//use closure to protect vars
					document.body.appendChild(slc);

					//options codemirror and result area
					that.$el.find('#code-advance-options').flexlayout(['1:#codemirror-advance-options', '1:#result-advance-options'], {
						dir: 'v',
						height: '500px'
					});
					//setup options code mirror
					that.$el.find('#codemirror-advance-options').html('<textarea id="mycode-advance-options" cols="3" rows="1"></textarea>');
					that.cmop = CodeMirror.fromTextArea(that.$el.find('#mycode-advance-options')[0], {
						mode: 'javascript',
						lineNumbers: true,
					});
					//set up default value
					that.cmop.getDoc().setValue("//change layoutConfig array and apply.\n" +
						"//use developer tools to check attributes \n\n"+
						" var layoutConfig = [\n\t'20px:#fixed', \n\t['2', ['1', '1']], \n\t['3', ['1', '1', '1']]\n]; \n\n "+
						"$('#result-advance-options').flexlayout(layoutConfig, {\n"+
							"\t\t dir: 'v', //give initial direction, auto flip\n"+
							"\t\t adjust: [false, true],\n"+
							"\t\t bars: [{flex: '0 0 1px', 'background-color': '#ccc'}, {flex: '0 0 3px', 'background-color': '#999'}],\n"+
					"\t});");
					//execute script inside code mirror
					var sop = document.createElement('script');
					sop.textContent = '(function(){' + that.cmop.getDoc().getValue() + '})();'; //use closure to protect vars
					document.body.appendChild(sop);
				});
				

				return this;
			},
			'apply-advance-layout': function(){
				this.$el.find('#result-advance-layout').html('');
				var s = document.createElement('script');
				s.textContent = '(function(){' + this.cmlc.getDoc().getValue() + '})();';//use closure to protect vars
				document.body.appendChild(s);
			},
			'reset-advance-layout': function(){
				//set up default value
				this.cmlc.getDoc().setValue("//change layoutConfig array and apply.\n" +
					"//use developer tools to check attributes \n\n"+
					" var layoutConfig = [\n\t'100px:#top', \n\t['1:#content', ['1', '5']], \n\t'50px:#footer'\n]; \n\n "+
					"$('#result-advance-layout').flexlayout(layoutConfig);");
			},
			'apply-advance-options': function(){
				this.$el.find('#result-advance-options').html('');
				var sop = document.createElement('script');
				sop.textContent = '(function(){' + this.cmop.getDoc().getValue() + '})();';//use closure to protect vars
				document.body.appendChild(sop);
			},
			'reset-advance-options': function(){
				//set up default value
				this.cmop.getDoc().setValue("//change options and apply.\n" +
					"//use developer tools to check attributes \n\n"+
						" var layoutConfig = [\n\t'20px:#fixed', \n\t['2', ['1', '1']], \n\t['3', ['1', '1', '1']]\n]; \n\n "+
						"$('#result-advance-options').flexlayout(layoutConfig, {\n"+
							"\t\t dir: 'v', //give initial direction, auto flip\n"+
							"\t\t adjust: [false, true],\n"+
							"\t\t bars: [{flex: '0 0 1px', 'background-color': '#ccc'}, {flex: '0 0 3px', 'background-color': '#999'}],\n"+
					"\t});");
			},
			'wrap-advance-layout': function(){
				this.cmlc.setOption('lineWrapping', !this.cmlc.options.lineWrapping);
			},
			'wrap-advance-options': function(){
				this.cmop.setOption('lineWrapping', !this.cmop.options.lineWrapping);
			}

		});

		return AdvanceView;
	});
})();