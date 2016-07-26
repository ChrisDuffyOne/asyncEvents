var events = require('events');

var progressBar = new events.EventEmitter();
progressBar.timeLimit = 0;

progressBar.on('onStart', function() {
	var _this = this;
	function delayCounter(){
		setTimeout(function(){
			_this.timeLimit++;
			if (_this.timeLimit === 100){
				_this.emit('onProgress');
				_this.emit('onEnd');
			}else if(_this.timeLimit % 10 === 0){
				_this.emit('onProgress');
				delayCounter();
			}else{
				delayCounter();
			}
		}, 25)
	};
	delayCounter();
});

progressBar.on('onProgress', function(){
	var tenth = this.timeLimit / 10;
	var remain = 10 - tenth;
	var i = 0;
	
	while(i < tenth){
		process.stdout.write("=");
		i++;
	};
	while(remain > 0){
		process.stdout.write("-");
		remain--;
	};
	process.stdout.write("\n");
})

progressBar.on('onEnd', function(){
	console.log("100 Complete");
	return;
})

progressBar.emit('onStart');