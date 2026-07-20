(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib._16024105 = function() {
	this.initialize(img._16024105);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1600,1014);


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,1080);


(lib.Bitmap1_1 = function() {
	this.initialize(img.Bitmap1_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,768);


(lib.Bitmap56copy = function() {
	this.initialize(img.Bitmap56copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,480,360);


(lib.Bitmap57 = function() {
	this.initialize(img.Bitmap57);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,816,612);


(lib.Bitmap66copy = function() {
	this.initialize(img.Bitmap66copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,506,335);


(lib.Bitmap67 = function() {
	this.initialize(img.Bitmap67);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,375);


(lib.Bitmap69 = function() {
	this.initialize(img.Bitmap69);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,650,446);


(lib.Bitmap71 = function() {
	this.initialize(img.Bitmap71);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,450,249);


(lib.Bitmap72 = function() {
	this.initialize(img.Bitmap72);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,259,194);


(lib.Bitmap73 = function() {
	this.initialize(img.Bitmap73);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,290,174);


(lib.Bitmap74 = function() {
	this.initialize(img.Bitmap74);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,826,617);


(lib.Bitmap75 = function() {
	this.initialize(img.Bitmap75);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,263);


(lib.Bitmap76 = function() {
	this.initialize(img.Bitmap76);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,300);


(lib.Bitmap77 = function() {
	this.initialize(img.Bitmap77);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,604,339);


(lib.Bitmap78 = function() {
	this.initialize(img.Bitmap78);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,263);


(lib.Bitmap79 = function() {
	this.initialize(img.Bitmap79);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,425,248);


(lib.Bitmap80 = function() {
	this.initialize(img.Bitmap80);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,450,338);


(lib.Bitmap81 = function() {
	this.initialize(img.Bitmap81);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,500);


(lib.Bitmap82 = function() {
	this.initialize(img.Bitmap82);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,576,576);


(lib.Bitmap83 = function() {
	this.initialize(img.Bitmap83);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,509);


(lib.dahliatubers1 = function() {
	this.initialize(img.dahliatubers1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,572,480);


(lib.ekormat = function() {
	this.initialize(img.ekormat);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,600,512);


(lib.image295 = function() {
	this.initialize(img.image295);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,900,800);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.zfbnzbdfbdfb = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-192.3,-19,384.70000000000005,38);


(lib.zdfbzfbzfdbfdbfd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap82();
	this.instance.setTransform(-288,-288);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-288,-288,576,576);


(lib.zbzfbzfbb = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap66copy();
	this.instance.setTransform(-253,-167.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-253,-167.5,506,335);


(lib.ugchgchghkgc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap71();
	this.instance.setTransform(-225,-124.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-225,-124.5,450,249);


(lib.txtjhvjs = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-269,-20.7,538.1,41.4);


(lib.txt32 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiLFAQAHgJAHgHIAUASQgIAKgGAGQgJgKgLgIgAhpE/IALgRQAKAGAKAMIgMAPIgTgQgAl2EzQAGgJAHgIIAUASQgHALgHAGIgTgSgAlVExQAGgKAGgGQAJAGAKAMQgFAKgGAFIgUgRgADMEQQAGgJAIgHQAKAHAJALQgEAJgKAHIgTgSgABvESIAMgRQALAIAIAKIgMAPIgTgQgArjEQIAOgQQAKAHALALQgGAKgJAGIgUgSgACOEPIAOgPQAJAGAKAMIgNAPIgUgSgAieEPQgOgRAAgfQAAgMAFgPQAFgRAFgKIAHADQgKAYABASQAAAKACAJQADAJAIAIQAHAHALAFQALADAMAAQAWAAAegOQAOgHABgFQgDgGgMgEQgNgFgUAAIgBgDIALgSIBCAAQALAAAKgBQAKgCAMgGIgMgKQgKgMgCAAQgHgGgDAAIgFAAIAAgCIAFgTIAFAAQAagGATAAQAdAAATAJIgFASIgdAbQAQAKAWAAIAKAAQALAAAHgEQAJgFABgGIAHgSIAKgJIABACQgEANAAAGQAAAJAGAFQAJAHAMAAIAGAAQALAAAIgEQAIgFADgGIAEgSIAMgJIAAACQgDANAAAGQABAJAEAFQAJAHAMAAIAPAAIANgQIACgMIAAgVQAAgegDgvIgBgQQAAgFACgGIALgJIAAACQAAANAPAYIgMAIQADAfAAAXQAAATgGAPQAUgWAQgJQAGgFAJgBQAHgDAKAAQAPAAAMAMQAMAMgBASQAAAEgCAIIgHAMQAHABALAAIALAAQALAAAHgEQAJgGAAgMQAAgngEgwIgCgMIAAgJQAAgGAEgGIAJgJIACABQAAAPAOAXIgLAJIACAcIAAAeQAAAbgHAPIgGALQgEAGgFADQgKAEgLAAIgGAAQgcAAgbgGQgdAGg6AAIgPAAQgbAAgIgSIgBAAQgDAJgLAFQgHAEgMAAIgIAAQgZAAgJgSQgEAJgKAFQgJAEgKAAIgJAAQgOAAgOgGQgPgEgMgJQgPAKgQAFQgNAEgOAAIgPAAIAAAMQAAADgDAIQgBAHgDADQgPAOgXAJQgVAJgUAAQgdAAgRgSgAE/CqQgNAJgVAYIAPAAQAkAAAVgDQAYgEAGgJQAAgLgLgJQgKgJgNAAQgRAAgRAMgAASCgIALAKIAUARQAUgOAMgMQgSgEgOAAQgPAAgQADgAJYEPIADgGQAIAEAMAAQAQAAASgQQASgRADgSIgFgHQgHgLgHgNIAJgUIABgBQAJATAGAIQAJAKANAAIAHAAQAYAAAIgDQALgEAAgDQAAgJgSghQAGgLAHgJQAIAMAEAOQAHAPgBAKQABARgMAPQgHAGgKABQgJADgTAAIgHAAQgKAAgGgGIgCAAIACAGQAAAPgIAMQgIARgLAHQgLAJgKAAQgQAAgagNgAmIEBQgRgSAAgbQAAgbALgZIAHADQgFASgBAQQABAUAIANQARAUAYAAQANAAANgDQAKgDAMgGQAPgJAIgJQAAgFgUgEQgTgDgWAAIgBgCIAIgQQAWgDAJgDQALgFgBgGIAAgGQgHACgLAAQgeAAgHgRQgBgEgBgGQAAgJADgJQAEgIAFgGQAJgKALAAQAJAAAHAJQAIAHAGAPQAGARAAAWQAAAMgHAMQAMADACAFQAEAEAAALQgBAJgEAJQgFAKgQALQgMAJgPADQgOAEgQAAQgYAAgSgPgAkkCVQgJgcgQAAQgIAAgFAEQgHAFAAAGQAAAGALAEQAJADAMAAIANAAIAAAAgAxkDZQgYgPAAgdQAAgWAKgSIAHABQgFAPAAALQAAAYAVANQAVALAhAAQAbAAAegIIAWgGIACgBQAAgJgQghIALgUIACAAQAHAMADAOQAHAPgBAKQAAAJgCAIIgHAMQgMAHgZAGQgdAGgYAAQglAAgVgNgARrDjQABgMAAgWIAAgPQAAgngFhCQAHgLAJgHIACABQAEAtAABIQAAASgCALQAAAGgCAGQgDAGgKAJgAHyDjQADgMAAgWIAAgPQAAgngIhCIARgSIABABQAFAtAABIIAAAdIgFAMQgDAGgHAJgAoODjQACgMAAgWIAAgPQAAgpgGhAIAQgSIACABQAEAvAABGQABARgCAMQAAAGgDAGQgDAGgIAJgAQUDgQgaAAgIgSQgFAJgJAFQgJAEgLAAIgHAAQgNAAgLgHQgJgGgLgOIgNgTIgBAAQAAAWgOALQgPANghAAIgIAAQgJAAgHgDQgGgBgGgFQgGgHgDgMQgCgIABgVQgBgogEg8IAQgPIACAAQABAZAAAjIAAA9IAAAJQAAAOAOAEQAFADAFAAIAJAAQAaAAAPgKQAJgFAAgDQAAgEgFgIQgEgKgMgOIgYgbIgLgKIgBgLQAAgGAFgHQABgDAEgDQAWgPBRgYIABAAQgEAKgKALQgLADgaAJQgkANgPAIIAAABQAJAGAQAGIgEAJQAXAVAnAtQAHAJAHAFQAIAEAKAAIAGAAQALAAAHgEQAKgFABgGIAFgSIALgJIACACQgFANABAGQAAAJAFAFQAIAHAOAAIAFAAQALAAAJgEQAJgGAAgMQgBgkgFgzIgBgVQAAgGAFgGQAEgFAFgEIACABQgBAPAOAXIgKAJIAAAcIABAeQABAbgHAPIgFALQgFAGgGADQgJAEgMAAgAplDgQgZAAgJgSQgEAJgKAFQgJAEgKAAIgIAAQgbAAgHgSQgFAJgIAFQgKAEgMAAIgEAAQgKAAgHgDQgHgBgEgFQgIgHgBgMQgCgIAAgVQAAgngFg9QANgMAEgDQADAZAAAjIAAA9IAAAJQAAAOAOAEQAEADAGAAIAGAAQALAAAHgEQAJgFACgGIAEgSIAMgJIACACQgFANAAAGQAAAJAGAFQAIAHANAAIAGAAQALAAAHgEQAJgFABgGIAHgSIAKgJIABACQgEANAAAGQAAAJAGAFQAJAHAMAAIAGAAQALAAAIgEQAJgGAAgMQABgngFgwIgBgVQgBgGAFgGQADgFAGgEIABABQgBAPAPAXIgKAJIABAcIAAAeQAAAbgGAPQgDAIgDADQgFAGgEADQgKAEgLAAgAt/DgQgKAAgGgDQgHgBgFgFQgHgHgCgMQgCgIABgVQgBglgEg/IAQgPIADA8IAAA9IAAAJQAAAOANAEQAGADAFAAIAFAAQAYAAAJgDQAJgEAAgDQAAgGgEgMQgDgJgKgPQAHgLAHgJQAHAMAFAOQAEAPABAKQAAARgLAPQgGAGgKABQgLADgUAAgAPPB6QAGgJAHgHIAUASQgHAKgHAFQgJgJgKgIgAPwB3IANgPQAIAGAKAMIgLAPIgUgSgAqZB3IAPgSIATASQgFALgIAGIgVgRgAxFBlIAOgPQAKAIAKAKIgOAPIgUgSgALCBkIAMgPQAJAGALAMIgMAPIgUgSgAuBBkIANgPQAJAGAKAMQgHAKgGAFQgHgJgMgJgAwjBkIANgRQAJAIAJAKQgGALgGAEIgTgQgALiBiIANgQIAUASQgIAKgFAFIgUgRgAthBiQAHgJAHgHQAJAHAJALIgMAPIgUgRgAlRBBIAOgQQAKAHAKALQgHAJgHAHIgUgSgALLBAIAMgPQALAHAJALQgGAJgGAGIgUgSgAmBiFIACgFQALAGAOAAQAbAAAWgbQAOgPACgMQgLADgLAAQgRAAgIgHQgNgJAAgPQAAgPALgOQANgPALAAQAIAAAHAGQAGAFAEAJQALATAAAbQAAAYgMAUQgVAfgXAAQgYAAgXgQgAlPjnQgHAFAAAEQAAAIAJAGQAJAEALAAQAKAAAJgBQgFgOgFgJQgIgJgKAAQgHAAgGAGgAAGiKQgLgNAAgYQAAgUALgYIAHADQgIARAAAMQAAAQAJALQAKANASAAQAPAAAQgHQANgJAFgIIAAgDQABgDAAgEQAAgvgGhYIAPgPIABAAQADBGAAAwIACAMQADAGADADQAGAFAKAAIAHAAQAKAAAIgDQAHgFACgHIAEgSQAEgFAIgEIAAABIgCAPQAAAIACADQACAEAFAFQASgdARgPQAJgHAHgFQALgEAKAAQARAAAKAKQALALAAAQQAAAMgJARIAZAAQALAAAQgDIgEgOQgBgEAAgIQAAgYAOgQIAOgLQAHgEAFAAQAFAAAFAEIAJAOQAHAMgBAMQAAATgKAUQALADAPAAIAJAAQAKAAAJgFQAJgEAAgOIgFhXIgDgVQAAgEAHgGQACgFAHgEIABAAQgCAPAPAYIgKAJIABAcIAAAdQAAAcgFAOIgHAMIgJAHQgKAGgKAAIgIAAQgaAAgdgMQgfAMgSAAIgHAAQgYAAgagGQgSAGgUAAQgjAAgOgSQgKASgYAAIgFAAQgTAAgIgNQgCAQgEAJQgHALgMAHQgRALgSAAQgWAAgOgOgADgjcQgOAKgPAUQALADAUAAIAZgCQAMgDAGgDQAPgGAAgGQgDgKgJgIQgJgHgKAAQgPAAgOAMgAFgjtQgIAJgDAJQAEARAUAGQAHgCAKgGQAJgHgBgFQAAgHgCgIQgIgPgJAAQgKAAgJAJgAnmiaQgMgPAAgYQAAgSAMgYIAGADQgIAPAAANQABAPAIAMQAKAOATAAQAPAAAOgJQANgGAFgJQABgFAAgGQAAgigFg8IgBgVQAAgJADgFQADgEAIgGIABAAQAAASANAVQgEAEgHAFQACAuAAAYQAAAMgBAIQgBANgHARQgFAKgNAIQgIAGgKADIgSABQgUAAgOgNgAkKijIAAgCQAygHAZgPIgFgOIgOgVIgRgZIgTgbIgNgUIgEgMQAAgEAIgMIAbAeIgEAJIAWAiQAMASAEALQAIANAAARIABAAQAOgLAAgVQAAgWgFgtIgBgMIAAgOQAAgHADgFQADgEAHgGIAAAEQAAAMAOAVIgKAJIABA8QAAAPgFASIgJARQgEAGgGAEQgJAIgLADQgLAEgLAAQgQAAgZgHgAH3ijQACgLAAgWIAAgRQgBgogGg/QAIgLAJgHIACAAQAEAtAABJQAAARgCAKQAAAIgCAGQgEAGgIAHgAh4ijQABgLAAgWIAAgRQAAgngFhAQAHgLAJgHIACAAQAEAtAABJQAAASgCAJQAAAIgEAGQgDAGgIAHgAFgk2QAHgMAGgGIATASQgFAKgIAGIgTgQg");
	this.shape.setTransform(123.4,18.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(8.5,-15.3,229.8,67.7);


(lib.svdfvfvfv = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,51,102,0.8)").s().p("AiBAiQgOAAgKgKQgKgKAAgOIAAAAQAAgNAKgKQAKgKAOAAIEDAAQAOAAAKAKQAKAKAAANIAAAAQAAAOgKAKQgKAKgOAAg");
	this.shape.setTransform(5.7405,-0.9392,0.8226,1.3195);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-5.4,27,9);


(lib.srthyllll = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap57();
	this.instance.setTransform(-395,-222,0.9559,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-395,-222,780,612);


(lib.shape149 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D98248").s().p("AAJAxQAEg0gGgbQAJAEADAAIABAAIABAAQAEARgGAVIAAAAQgHAgAAAFgAAPgnIAAgCIACAFgAgWgwIAEADIgCAAg");
	this.shape.setTransform(1.5714,12.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E19562").s().p("AAiCnIAGgyIADAAQgBAFAJAFIAAABIABABIAAAAIACABIABABIAdALIgJAkgAAGCkQAOg3gCgjQgDgggFgUIACAAIAMAHIADA0QACAmgLAvgAgGCkIgIgCIADgnIADghIAAgfIgDgTIgBgBIgGgQIAAgBIgRggIgDgGIAAgCIgDgOIAAgEQgLg6AIgKQgEACgFAiQgGAqAYAvIghA7IgsgQIAcgsQAOgXgBg0QgCg1AOgYIARgaIACgBIgBAAQApgkA5AkIAFANIAVAuQAKAVAKAqQALAqgBAtQgCAqgIAnIgqgQIgCgBIAIgeQAJgngQgbQgPgYgXgSQgUgQgEgcQgGgcAIglIABgKQgFAEgJAXQgNAkAHAZQAGAZAYATIAIAGIACACIABABQAOANAKAQIAAACIg8gdIgFgCIANAKQAEAOACAkQACAkgEAkIgDAig");
	this.shape_1.setTransform(-1.5207,6.0625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("ABNCxIgygMIghgIIgVgHIABgNIAAAAIABgeIADgkQACgOgCgNIgEgUIgcA2IgGADIgFAAIg8gXIgDgDIgCgFIABgFQAQgXARgjQARglgDgnQgCgmAQgXQAJgOAUgLIgRAaQgOAYABA0QABA0gOAYIgbArIArARIAig8QgZguAHgqQAFgiADgCQgIAKALA6IABADIADAOIAAACIACAGIASAhIAAAAIAFAQIABABIAEAUIAAAeIgEAhIgDAnIAJADIAAAAIADgiQAFglgDgkQgCgkgEgNIgMgLIAFADIA7AcIADACIgCgEQgLgPgOgNIAAgBIgDgCIgIgHQgXgTgHgZQgHgZAOgjQAJgXAFgFIgCALQgHAlAFAbQAEAdAUAPQAXATAQAYQAQAagKAoIgHAdIACABIApAQQAIgmACgqQABgtgKgqQgLgrgJgUIgVguIgGgNIABAAQAdAeAIAPQANAbAMAtQAMAtgFBGQgFBHgHAAIgIACIgQApIgDAEIgEACIgFABgAArBkIgGAxIAoALIAKgkIgdgLIgBAAIgCgBIgBgBIAAgBIgBAAQgIgFAAgFQAAgFAIggIAAAAQAGgWgFgSIAAAAIgCABQgCAAgJgEQAGAagEA2gAAMAFQAFAUADAgQACAjgOA2IAMACQALgvgCglIgDg0IgMgIIgDgCg");
	this.shape_2.setTransform(-1.7867,7.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.8,-11.7,26.1,37.3);


(lib.shape148 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4B0101").s().p("AhnArQABgQgHggIgBgKQARAPA5ABQA4ABApgRQApgTALgPQgDAagHAPQhAAAgwA4IgBACgAhwgXIAAgBIABABg");
	this.shape.setTransform(194.2,297.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B71D0D").s().p("AAugXQgPAYgfALQgTAIgaAEQApgsAygDg");
	this.shape_1.setTransform(199.2,300.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgkAcQg5gBgRgQIgCgGIAtADIBFgDQApgFBFgbIABABIAAAEQgLAPgpASQgnARg0AAIgGAAg");
	this.shape_2.setTransform(194.225,294.9026);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AiGA4QgLgHAwADQADgRgKgtIgYgMIgGgDIgcgPIgBgBQgBAAAAgBQAAAAAAAAQAAAAAAAAQABABABAAIAiAJIBGAKQAqADA9gOQA+gNAVgKIgKgTIAFAEIASAOIANAJIALAHIgYgDIgFAmQgJAwg7AYQgYAKgnAAQg2AAhVgUgAhdgFIACAJQAGAhgBAQIBdAHIABgCQAwg5BAAAQAHgOADgaIAAgEIAAgBIAAAAQhGAbgpAGIhFADIgsgDgAAVA7QAagDATgIQAggLAQgZQg0ADgpAsgAhfgNIABAAIgBgBg");
	this.shape_3.setTransform(192.4611,296.6137);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AggADIgMgHQAuAMAqgUIgHAHQgSASgTAAQgPAAgRgKg");
	this.shape_4.setTransform(192.3,305.8097);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(175.9,289.1,33.099999999999994,18);


(lib.shape146 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E19562").s().p("AgHCeIAAAAIgCgCIghg3QgKgtAAgxIgFgaIgIAaQAAAyALAvIABACIATAhQgQgMgHgKQgUgwgFgsQgCg4AHgpQAJg8ASgYIAKgNIgBAAIAAgBIAFgBIAfACIANADIAAABIAAgBIADABIAGAGIARAWIAOAYIAPAiIACAFIAFAfQgDATAAANQAAAKAEAPIAGASIAGAMIgxAGQgCgUgIgbIgKgfIgQgfQADAfACAIQgEA6ADAlIAAABIATA3IAAAAIAKAeIgfALg");
	this.shape.setTransform(0.1015,4.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgFCxIgDgCIgKgRIgWgPQgVgPgIgOIgBAAQgVgygEgtIAAgBQgCg5AGgrQAKhAAkgeIAEgBIAAAAIgJANQgTAYgJA8QgGApACA4QAEAsAUAwQAHAKARAMIgUghIgBgCQgLguAAgyIAJgbIAEAbQAAAwALAtIAhA4IABABIAAAAIAIAOIAfgLIgKgeIgBAAIAAAAIgSg3IAAgBQgDglAEg6QgDgHgDggIARAfIAJAgQAIAaACAUIAxgGIgFgMIgGgSQgEgOAAgLQAAgNADgTIgGgfIgCgFIgOghIgOgZIgRgVIgGgHIAOAGIASAWIAOAXIAFAJQAJAQAEAPIAGAfIgBACIgCAeIADAaIAOAiIABADIgBADIgBABIglAFIgZABIgCAAIgDAAQgGgBABgGQABgGgJgoQgCAmADAaIASA2IAMAlIAAAEIgEAEIgpAOg");
	this.shape_1.setTransform(0.1515,5.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D98248").s().p("AAhCXIAAgBIAAABgAgdiWIAAABIgDABg");
	this.shape_2.setTransform(-1.075,2.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-12.2,19.3,35.8);


(lib.shape83 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#626473").s().p("ABzDrIg1gVQgagMgYgNIgBAAIikhPQgWgLABgUQABgUAMgPIAagbIAUgRIAAAAQgeALgVAOIgBgcQgBgpgJhbQAJgnAZgYQAYgXAhgIIBCgIQAhAAAfALQAcALAZAWQAZAVAKAhIACARIAVDMIgggxQgMgUgIgUQADAdAKAXQALAWANAUIAVAfIAKAMIAGAPQACAMgDAVQgDAUgQAYQgMAQgQAAQgHAAgHgDg");
	this.shape.setTransform(1.1818,5.1982);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AB8EBQkuiFgHgQQgIgQACgSQACgRAFgLQABgegDgmIgIh5IABgIQADgfAYgWQAYgXAdgLQAegMAfgDIA+gDQAgAEAcAQQAcAQAVAZQAUAZAHAeIADALIAWDkIAPAYQAGALACANQAEAZgJAYQgKAagRAUQgOAPgSAAIgGAAgAh0AAIgUARIgaAaQgMAQgBAUQgBAUAWAKICkBPIABABQAYANAaALIA1AWQAZAKARgYQAQgXADgVQADgUgCgMIgGgPIgKgNIgVgeQgNgVgLgWQgKgWgDgeQAIAVAMATIAgAxIgVjLIgCgSQgKgggZgWQgZgWgcgKQgfgMghABIhCAHQghAIgYAYQgZAXgJAnQAJBbABApIABAcQAVgNAegLg");
	this.shape_1.setTransform(1.276,5.2459);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.2,-20.5,39,51.5);


(lib.SFvdsfvSVsDVsdvsg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap77();
	this.instance.setTransform(-302,-169.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-302,-169.5,604,339);


(lib.sfghadhadfhadfh = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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QAbgHAWAAQAgABAWAIIgGAWIggAdQATALAXgBIALAAQAaAAAKgDQALgFAAgDQAAgHgGgMIgNgaQAHgNAHgJIABAAQAIANAFAOQAGASAAAMQAAAIgEAKQgDAHgGAIQgHAHgLACQgLADgVAAgASfgOIALAKQAJAJAOAJIABAAQAVgOANgNIAAAAQgUgFgPgBQgQAAgSAFgANIA4QgeAAgJgTQgFAIgKAGQgKAFgMAAIgGAAQgLAAgHgDQgIgDgGgEQgIgJgCgMIgBgeQAAgugFhDIARgRIACAAQACAbAAAoIABBEIAAALQAAANAOAGQAFACAHAAIAGAAQAMAAAJgEQAJgFACgIIAGgTIAMgJIACABQgEAOAAAIQAAAJAGAFQAJAJAOgBIAGAAQAbAAAKgDQAKgFAAgDQAAgHgFgMIgNgaQAHgNAHgJIABAAQAHANAFAOQAGASAAAMQAAAIgDAKQgDAHgHAIQgGAHgLACQgLADgWAAgAzpA4QgeAAgIgTIgBAAQgFAIgKAGQgKAFgMAAIgIAAQgRAAgJgFQgJgFgEgHIgBAAQgPARgRAAQgQAAgEgQIgBAAQgOAQgSAAQgQAAgCgQQgOAQgaAAIgFAAQgLAAgIgDQgHgDgGgEQgIgJgCgMQgCgJAAgVQAAgugEhDIARgRIABAAQACAbABAoIAABEIAAALQAAANAOAGQAGACAGAAIAJAAQANgBAKgCQAKgGAGgJIAKgNIAOgFIABABIgJAPQgDAGAAAFQAAAEACADQADACAFAAQAJABAHgHIAHgGIAFgJIAEgLIAPgGIAAABIgGAQIgBALQAAADACAEQADADAFAAQAHAAAGgEQAHgFAEgMIADgPIAPgJIAAAAQgEAPAAAKQAAAKAIAGQAIAEAOAAIAIAAQAMAAAJgEQAJgFACgIIAGgTIANgJIABABQgEAOAAAIQAAAJAGAFQAJAJAOgBIAGAAQAbAAAKgDQALgFAAgDQAAgHgGgMIgNgaQAHgNAHgJIABAAQAHANAFAOQAGASAAAMQAAAIgDAKQgDAHgHAIQgGAHgLACQgLADgWAAgA7sgDQAGgFACgFQADgEAAgGQAAgIgMgKIgSgPQgIgGgDgFQgDgFAAgJQAAgRAOgNQAOgNASAAQAFAAAHADQAIACAGAGIAFAEIABAGQAAAFgEAEQgFAEgDAAIgLgHQgLgIgLAAQgHAAgFACQgEAFAAAGQAAAHAKAJIASANQANAKAGAGQAFAHAAAJQAAALgMAKQgJAKgLADgA2xg2QAGgIAIgIQAKAGALAOQgHAKgHAHIgVgVgA2Og4IAPgSQAKAJALALQgHAMgHAFIgWgTgA02g5QAHgKAIgIQAKAIALAMQgIAMgGAFIgWgTgA0Sg7IAPgRQAKAGALAMQgIANgGAFQgMgMgKgHgAIbhPQAHgLAHgGQALAHALANQgIAKgGAHIgWgUgAI/hSIAOgSQAKAJAMAMQgJALgGAFQgLgKgKgJgANlhNIgLgJIAPgTQALAHALANQgGAJgJAJIgLgKgAzMhNIgLgJIAPgTQALAHALANQgGAJgJAJIgLgKgA2nhdQAGgJAIgJQALAIAKAMQgHAMgHAFQgMgLgJgIgAT/hdQgIgBgBAAIAAgBIAZgLQAOgGAHgHQgLgCgGgDQgFgGAAgIQAAgKAIgIQAIgGAJgBQAGABAFAFQAFAIAAAMIgBAIIAHADIgJANIgFgCQgLANgcAKIgJgBgAUaiUQgEABAAADQAAAGAHACQAGAFALABIAAgCQAAgHgEgGQgEgFgFAAQgEAAgDACgAYDhqIgLgLIAPgSQALAIALAMQgGAKgJAJQgEgGgHgEg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180.6,-16.3,361.2,32.7);


(lib.sfbfgbgfggffg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AkUBzQAGgHAHgGQAGAGAKAKIgLANIgSgQgAj3ByQAFgIAHgHIARAQQgGAKgGAEQgHgIgKgHgAg2BKIAMgOQAIAGAJALQgGAIgFAFIgSgQgAAdBKQAHgKAFgFQAIAGAKAKQgGAIgIAGIgQgPgAgZBIIALgOIARAQQgFAKgGADIgRgPgAklBHQgNgOAAgbQABgLADgOQAEgNAHgLIAFAEQgJAUAAAQQAAAJAEAJQADAIAFAGQAGAGAKAEQAJAEALAAQAWAAAagNQAMgGABgFQgCgFgMgDQgMgEgSAAIgBgCIAMgRIA6AAQALAAAHgCQAJgCAMgEIgLgIIgKgKQgHgHgDAAIgFAAIAAgBIAFgRIAGAAQAVgFASAAQAZAAASAIIgFAQIgaAXQAPAJATAAIAIAAQAKAAAIgEQAGgEADgFIAEgQIALgHIABABQgEAMAAAFQAAAIAFADQAHAHALAAIAFAAQAKAAAGgEQAIgEABgFIAGgQIAJgHIABABQgCAMAAAFQgBAIAFADQAIAHAKAAIAOAAIAKgNIADgMIAAgRIgBgkIgDgiIgBgOQAAgEADgEQACgFAHgDIABAAQAAANANAUIgKAHIACAxQAAARgGAMIABAAQARgSAOgJQAHgDAGgDQAIgCAHgBQAOAAALAMQALAKAAAPQAAAGgDAFIgFALIAQABIAIAAQAJAAAIgFQAIgEAAgLQgBghgEgsIAAgJIAAgJQAAgFADgGIAIgIIACABQgBANANAWQgEADgGADIACAbIAAAZQAAAZgGALQgCAHgEAEQgCAEgGADQgIAFgKAAIgFAAQgaAAgXgFQgZAFg0AAIgPAAQgLAAgIgEQgHgDgDgJIgBAAQgFAIgIAEQgHAEgKAAIgGAAQgLAAgHgEQgJgDgDgJIgBAAQgDAIgJAEQgIAEgKAAIgHAAQgNAAgMgFQgNgFgLgIIgBAAQgMAKgOAEQgMAEgOAAIgOAAIABAKQAAAEgCAGIgEAIQgPAOgTAHQgTAIgQgBQgbABgPgRgACEgRQgNAJgTAUIAOAAQAhAAASgEQAVgDAFgHQAAgJgKgIQgIgHgNgBQgOAAgOAKgAiHgaIAJAJQAHAHALAHIABAAQAQgLALgKIAAgBQgPgEgNAAQgMAAgPADgAEiAhQACgKAAgUIAAgOQAAgjgFg4QAGgKAJgHIABAAQADAoAABBIgBAYQAAAFgDAGQgDAGgHAHg");
	this.shape.setTransform(166.55,-247.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AaqFGQAFgHAHgGQAIAHAIAJIgLAOIgRgRgAbGFFQAGgIAGgHIARAQQgGAKgFAEIgSgPgACSEpIAMgPQAIAGAJAKQgFAIgHAGIgRgPgAzOEpIAMgPQAJAGAIAKQgEAIgIAGIgRgPgA2uEpIAMgPQAJAGAJAKQgFAIgIAGIgRgPgAD7EnIADgFQAGADAKAAQAQAAAQgNQAQgPACgRIgEgGQgHgLgGgMIAIgRIABAAQAHASAHAGQAIAJAMAAIAFAAQAWAAAHgDQAJgEAAgDQAAgFgFgKQgCgIgIgOIALgQIABAAQAGAKAEALQAFAOAAAKQAAAIgDAHQgDAGgFAGQgEAGgKACQgJACgRAAIgEAAQgLAAgFgFIAAAAIAAAFIgBALQgCAGgDAGQgJAPgJAHQgJAIgIAAQgQgBgWgLgAxlEnIADgFQAHADAKAAQAPAAAQgNQAQgPACgRQgBgDgDgDQgHgLgGgMIAIgRIACAAQAGASAHAGQAIAJAMAAIAFAAQAWAAAIgDQAIgEAAgDQAAgFgEgKIgKgWQAEgJAHgHQAGAKAEALQAFAOAAAKQAAAIgDAHQgDAGgEAGQgFAGgJACQgKACgQAAIgFAAQgKAAgFgFIgBAAIABAFIgCALIgFAMQgIAPgJAHQgJAIgJAAQgPgBgXgLgAaqElQgIgEgIgHQgPgPAAgXQAAgZAKgXIAFADQgFAQAAAPQAAARAJANQAOAQAVAAQANAAAKgDQAKgDAKgFQANgHAGgIQAAgEgRgEQgQgEgUAAIAAAAIAHgPQATgDAIgDQAKgEAAgFIAAgFQgHACgJAAQgbAAgGgPQgDgFAAgFQAAgIAEgHQACgIAFgFQAJgJAJAAQAIAAAHAIQAHAHAFANQAFAPAAAUQAAAKgGAKQAJAEAEAEQACAEAAAIQAAAKgEAHQgEAJgOAJQgMAIgMAEQgMAEgPAAQgLAAgKgEgAbQCmQgFAEAAAEQAAAGAJADQAIAFALAAIAMgBQgEgMgFgIQgHgGgHAAQgGAAgGAFgAp7EaIACgEQAKAFAMgBQAXABAVgXQAMgOACgLQgKADgKAAQgOAAgJgGQgJgIAAgOQAAgOAJgMQALgMAKAAQAGAAAHAEQAFAFAEAIQAKARAAAYQAAAVgLASQgTAcgUAAQgUAAgWgPgApPDEQgGAEAAAEQAAAGAIAGQAIADAKAAQAJABAIgCQgDgMgHgHQgHgJgJAAQgFAAgGAGgAi/EdIACgFQAIACAIAAQAQABAPgMQAOgMAHgQQACgFAAgDIgBgDIgBgEQgIgSgKgOIALgUIABABIAKAUIAFAMQADAHAAAJIAAAQQAAATgTAWQgNAOgMAAQgQAAgWgLgANFEWQgLgMAAgWQAAgRALgUIAFACQgHAOAAAMQAAAMAIALQAKAMAQAAQANAAAMgIQANgGAEgIIAAgCIABgIQAAgogFhQIAOgMIABABQADA/AAApIABALQADAFADADQAFAEAJABIAFAAQAKAAAHgDQAHgFACgGIAFgQIAJgHIACABQgEAMAAAFQAAAIAFAEQAIAGALABIAFAAQASgBAHgaQADgIAIgKQAKgJAJAAQANAAAIAQQAIAPADAUQgFAUgLAAQgVAAgXgSIgCAAQgFAUgUAAIgGAAQgMAAgHgEQgIgDgEgJQgEAIgIAEQgIAEgKAAIgFAAQgRAAgHgLQgDANgDAIQgGAKgLAHQgOAJgRAAQgUAAgLgMgAQiDKQgFAEgDAHQAFAJAPAGQALAFAHAAQAEAAABgBQgDgRgHgIQgGgJgHABQgHAAgFADgA78EGQgLgMAAgVQAAgQAKgWIAGADQgGAOAAALQAAAOAHAKQAFAGAGADQAGACAIAAQAOABANgIQAMgGAEgHIABgKQAAgdgEg2IgBgKIgBgJIABgGIACgGQADgEAGgGIABABQAAAPANAUQgEADgHAFIADA+QAAAKgCAIQgCAMgEAOQgGAKgLAGQgHAEgIADQgIACgIAAQgUAAgLgNgAXGEDQgIgJAAgLIAAAAQgIAHgJAFQgIADgLAAIgDAAQgJAAgGgCQgGgCgEgFQgHgHgBgJQgCgHAAgTQAAgjgDg2IANgOIABAAIADA1IAAA3IAAAJQAAAMALAEIAJACIAEAAQALgBAIgCQAJgDAIgIQAEgYAQgPQAQgPAQAAQAIABAFAEQAHAEAAAGQAAAIgEAIIAAAAQgHgMgMABQgFAAgFABQgFABgFADQgOAKgDANIAAABQAIgFAHAAQAMABAHAHQAEAFACAEIABAKQAAAIgDAIQgIAPgNAAQgMAAgJgKgAXJDoQACAIAHAGQAHAFAIABQAHAAACgFQAAgHgGgGQgGgGgKAAQgGAAgFAEgA12EEIgRgFIAAgBQAtgHAVgNQAAgEgFgIQgDgGgIgNIgQgWIgQgZIgMgSQgEgGAAgEIAEgHIAEgHIAAAAIALANIANANIgEAIIAUAfQAKAQAFAKQAGALAAAOIACAAQALgHAAgUQAAgTgDgoIgCgMIgBgMQAAgGAEgEIAIgKIACABIgBADQAAAGAEAIIAIARIgJAHIABA2QAAANgFAPIgGAOQgEAHgGAEQgIAFgKAFQgKADgJAAQgKAAgKgCgAm0D3QgVgNAAgaQAAgUAJgQIAGACQgEAOAAAJQAAAVATALQASALAdgBQAYABAbgHQAMgDAIgEIABgBQAAgFgEgKIgKgWQAFgKAGgGIABAAQAFAKAEALQAFAOAAAKQAAAHgCAGIgGAMQgKAGgXAGQgaAGgVAAQghAAgTgNgAYjEAQACgKAAgUIAAgPQAAgjgGg5QAHgJAIgHIABAAQAEApAABAIgBAZQAAAGgEAFQgCAGgHAHgALSEAQACgKAAgUIAAgPQAAgjgFg5QAHgJAIgHIABAAQADApAABAIAAAZQAAAGgEAFQgDAGgGAHgAqNEAQABgKAAgUIAAgPQAAgjgFg5QAHgJAIgHIABAAQAEApAABAIgBAZQAAAGgDAFIgKANgAT8D+QgMAAgHgFQgIgFgEgLQgPAHgPgBQgMAAgHgEQgIgEAAgJQAAgGAGgMQAIgUAngVIgBgLIAMgMIACAAIAABGIABANQACAEADADQAEAFALAAIAHAAQASgBAHgaQADgIAIgKQAKgJAJAAQANAAAIAQQAIAPACAUQgEAUgLAAQgVAAgYgSIgBAAQgFAUgUAAgAUqDKQgFAEgDAHQAFAJAPAGQALAFAHAAQAEAAABgBQgDgRgHgIQgGgJgHABQgHAAgFADgASyDVQAAAEAFABQAFADAJAAQAJAAAMgEIAAglQgoAVAAAMgAKGD+QgMAAgIgEQgIgDgDgJIgBAAQgEAIgIAEQgIAEgJAAIgGAAQgNAAgJgIQgHgEgJgNIgOgQIgBAAQAAATgLAKQgOAMgeAAIgFAAQgJAAgGgCQgGgCgFgFQgGgHgCgJIgBgaQAAghgEg4IAOgOIABAAQACAXAAAeIABA3IAAAJQAAAMALAEQAEABAGABIAIAAQAJgBAJgCQAKgBAIgFQAHgFAAgDQAAgDgDgHQgEgIgLgNIgWgYIgKgKIgBgIQAAgFAEgIQACgDAEgCQAKgIAagJIA3gTIABABQgFAKgGAIIgjAMQggAMgMAHQAIAFAOAHIgEAHQAUASAiApQAIAIAGADQAHAFAIAAIAHAAQAIAAAIgDQAIgFABgGIAEgQIALgHIAAABQgDAMAAAFQAAAIAFAEQAHAGALABIAGAAQAKAAAHgFQAIgEAAgLQAAghgEgtIgBgKIgBgJQAAgFAFgFIAIgIIABABQgBANANAWQgEADgGAEIACAaIABAZQAAAagHAMIgFAKQgEAFgEACQgJAFgKAAgAB+D+QgJAAgHgCQgFgCgFgFQgGgHgCgJQgCgHAAgTQAAgjgEg2IAPgOIABAAIACA1IAAA3IAAAJQAAAMALAEIAKACIAFAAQAVAAAHgDQAJgEAAgDQAAgFgFgKQgCgIgHgOQAFgJAFgHIABAAQAGAKAEALQAFAOAAAKQAAAIgDAHQgCAGgFAGQgFAGgKACQgIACgRAAgAAOD+QgLAAgGgGQgJgGgEgNIgBAAQgBAJgJAGQgRAKgNAAQgMAAgIgIQgGgIAAgMIABgLIAFAAQABATAUABQAGgBAHgCIALgGIAHgEQAEgDAAgDQAAgHgEgPIgJgiIAFgIIAFgHIABABQAHAaAHAoQADAKAGAHQAGAFAIABIAGAAQAJAAAIgFQAHgEAAgLQAAgigEgsIgCgTQAAgEAFgGIAIgIIABABQAAANAMAWIgJAHIABAaIABAZQAAAagGAMIgFAKQgEAFgEACQgJAFgLAAgAjoD+QgJAAgGgCQgGgCgEgFQgHgHgBgJIgBgaQAAgjgEg2IANgOIACAAQACAXAAAeIAAA3IAAAJQAAAMAMAEQAEABAEABIAFAAQAWAAAIgDQAJgEAAgDQAAgFgFgKIgLgWIAMgQIAAAAQAGAKAEALQAFAOAAAKQAAAIgDAHQgCAGgGAGQgEAGgJACQgJACgSAAgAraD+QgXAAgIgQIAAAAQgEAIgIAEQgIAEgKAAIgGAAQgMAAgKgIQgHgEgJgNIgOgQQAAASgMALQgNAMgfAAIgFAAQgJAAgGgCQgGgCgEgFQgGgHgCgJQgCgHAAgTQAAgigEg3IAPgOIABAAIACA1IAAA3IAAAJQAAAMALAEIAKACIAIAAQAXAAANgJQAHgFAAgDQAAgDgDgHQgEgIgLgNQgIgKgOgOIgJgKIgBgIQAAgFAEgIQABgDAEgCQALgIAZgJIA3gTIABABQgFAKgGAIIgiAMQggAMgNAHQAJAFAOAHIgFAHQAVASAiApQAHAIAGADQAHAFAJAAIAGAAQAJAAAHgDQAIgFABgGIAEgQIALgHIABABQgEAMAAAFQAAAJAFADQAHAGAMABIAGAAQAJAAAHgFQAIgEAAgLQAAgigEgsIgBgKIgBgJQAAgFAFgFIAIgIIABABQAAANAMAWQgEADgGAEIACAaIABAZQAAAagHAMIgEAKQgEAFgEACQgJAFgLAAgAziD+QgJAAgGgCQgGgCgFgFQgGgHgCgJQgBgHAAgTQAAgjgEg2IAOgOIABAAIACA1IAAA3IAAAJQAAAMALAEIAKACIAFAAQAVAAAIgDQAIgEAAgDQAAgFgEgKIgKgWQAFgJAGgHQAHAKAEALQAEAOAAAKQAAAIgDAHQgCAGgFAGQgFAGgJACQgJACgRAAgA3FD+QgWAAgWgGIgPAEQgJACgLAAQgeAAgLgQIgBAAQgGAIgJAFQgHADgJAAIgEAAQgIAAgGgCQgGgCgFgFQgGgHgCgJIgBgaQAAgigEg3IAOgOIABAAQACAXAAAeIABA3IAAAJQAAAMALAEIAJACIAFAAQALAAAGgDQAGgFACgGIAEgRIAKgIIAAACQgCAIAAAFQAAAHACADQACAEAFADQAHgMAGgHQAIgKAJgJQAIgHAHgDQAJgFAKAAQAPAAAKAKQAIAKAAANQAAAMgIAPIAXAAQAVAAAIgDQAIgEAAgDQAAgFgEgKIgKgWIALgQIABAAQAGAKAEALQAEAOAAAKQAAAIgCAHIgIAMQgFAGgJACQgIACgSAAgA4NDMQgMAJgNATQAJADASAAQAKgBAMgCQAKgCAGgDQANgEAAgHQgBgIgJgHQgIgHgKAAQgNAAgMAKgAO2CjQAGgJAGgGQAIAGAJAKIgLAOIgSgPgAJICjIAMgPQAIAGAJAKIgLAOQgJgJgJgGgAsYCjIAMgPQAJAGAIAKQgGAJgFAFQgJgJgJgGgAPTCgIAMgOIARARQgGAJgFAEIgSgQgAJlCgIAMgOQAIAHAJAKQgHAJgFAEIgRgQgAr7CgIAMgOQAIAHAJAKIgLANIgSgQgAmXCRIALgPIASAQQgHAKgFAEIgRgPgAFZCQQAFgJAHgGIARAQQgHAJgFAEIgRgOgAwHCQQAGgJAGgGQAIAHAJAJIgLANQgIgIgKgGgAl6CPIALgPIASAQQgHAKgFAEIgRgPgAF2CNIAMgOIAQAQQgGAJgFAFIgRgQgAvqCNIAMgOQAIAGAJAKQgHAJgFAFIgRgQgAXOCKQAFgHAHgHIAQAQQgGAKgFAEIgRgQgAjSCSIgJgIIAMgOQAJAGAJAJQgFAJgHAGIgJgIgAXqCJIAMgPIARAQQgGAKgGAEIgRgPgAO+CCQAGgHAGgGIARAPQgGAKgFAEIgSgQgAbTB3IgJgHIANgPIASAQQgGAJgHAFIgJgIgAFhBvIAMgOQAIAHAJAJQgHAKgFAEIgRgQgAv/BvIAMgOQAIAHAJAJQgHAKgEAEIgSgQgAoIhqQAGgJAGgGIARAQIgLAOIgSgPgAnrhtQAFgHAGgHQAIAGAKAKQgHAKgFAEQgHgIgKgIgAGtiLIACgEQAKAFAMgBQAVABAUgVIAJgKQAEgFACgFIgIAAQgXAAgLgIQgMgHAAgRQAAgMAIgLQAEgHAGgDQAGgEAHAAQAKAAAKANQAIAOAEAXIAQAAQAPAAALgFQgDgIAAgMQAAgPAJgMQAIgKAHgEIACgPIACAAIAZAUIAbAUQAKAHAEAHQAFAHAAALQAAAMgHAHQgIAJgPAAQgJAAgOgEIgcgGQgYAKgRAAIgQAAQAAAGgDAJQgDAIgFAHQgIAMgLAHQgKAGgHAAQgSAAgYgPgAJajJQANAFAPAAQAHAAAFgCQAEgCAAgDQAAgHgIgJIgYgQQgBARgLARgAHWjgQgFAEAAAFQAAAKAQAEQAFACAIAAIAOABQgDgOgHgIQgIgJgIAAQgHAAgFAFgAI9jvQgJAJAAAGQAAAEAFAEQAEAGAIADQAJgDAFgEQAJgEAAgGQAAgJgFgIQgFgGgFAAQgIAAgIAIgAiFiLIADgEQAGADALAAQAPAAAQgNQAQgPACgRIgEgGQgHgLgGgMIAIgRIACAAQAGARAHAHQAIAJAMAAIAFAAQAWAAAHgEQAIgDAAgDQAAgFgEgKIgKgWIAKgQIABAAQAGAKAEALQAFANAAALQAAAIgDAHQgDAGgEAGQgFAGgJACQgJACgQAAIgFAAQgLAAgEgFIgBAAIABAFIgCALIgFAMQgIAPgJAIQgJAGgJABQgPAAgXgNgAoXiYQgNgOAAgZQAAgSAIgTIAHADQgFANAAAMQAAAVANALQAMALASAAQAIAAAKgCQAMgEALgGIANgJQAFgEAAgCQAAgDgHgCQgGgDgKgCQgWgDgFgGQgGgGAAgHQAAgVAQgSQAJgHAKgHQALgGAIAAQAGAAAEAIQAEAHAAAHQAAADgGANIgDAAQgBgJgDgEQgEgFgDAAQgFAAgGADQgGACgHAFIgKALQgEAEAAAFQAAAHAVAEIAQADQAIADAEADQAEACABAFQACAEAAAFQAAAHgEAHQgDAKgFAEQgMALgPAGQgQAHgPAAQgZAAgOgPgAyAibQgLgMAAgWQAAgRAKgUIAGACQgGANAAANQAAANAHAKQAJAMAQAAQAOAAANgHQAMgHAEgIIABgCIAAgIQAAgngEhQQAHgJAGgEIABAAQACBAAAApQAAAFACAGQACAFAEADQAFAEAJABIALAAQASAAATgHQATgHAXgNIAAgBQgcgLgSAAQgNAAgGAIIABAHIgEAOIgBAAIgHgUQAAgMAJgHQAJgIAOAAQAQAAAgAOQAMADAOABIANAAIgIAPQgRABgJAFIgZARQgfAUghAAIgLAAQgRAAgGgLIgBAAQgBANgEAIQgGALgLAGQgOAKgRAAQgUAAgLgNgA76idQgNgMAAgUQAAgNAEgMQADgJAGgKIAFADIgFAQQgDAHAAAFQAAARAKAJQAGAFAHACQAHAEAJgBQAJAAAJgDQALgEAHgFQAJgJAAgEIAAgOIgEgMQgFgSgHgMIALgTIABAAQAIAPAEAOQAEAPAAARQAAAMgDAKQgDAMgFAEQgJAKgNAGQgOAHgNAAQgVAAgMgNgArNiuIgQgEIAAgBQAsgGAWgOQAAgEgFgIQgDgGgJgNIgPgWIgRgZQgIgLgDgHQgEgGAAgEIADgHIAEgHIABAAQAGAIASASIgFAIIAUAeIAQAbQAGALABAOIAAAAQAMgHAAgUQAAgTgEgoIgBgMIgBgMQAAgGADgEIAJgKIACABIgBADQAAAGAEAJIAIAQIgJAHIABA1QAAAOgFAPIgGAOQgEAHgGAEQgIAFgKAEQgLAEgJAAQgJAAgLgDgAaOiwIAAgLQAAgWgLghQgJgdgPgeIALgRIADAAIAKAPIALAMIgHAIQAIAQAHAaQAGAZAAAPQAAAFgEAIIgIANgAFSixQABgKAAgUIAAgPQAAgjgFg4QAHgJAIgIIABAAQAEApAABAIgBAZQAAAFgDAGIgKANgAjfixQACgKAAgUIAAgPQAAgjgGg4QAGgJAIgIIACAAQAEAoAABBQAAAQgCAJQAAAFgDAGQgCAGgHAHgALmi1QgDgDAAgGQAAgGADgEQAEgDAGAAQAGAAAEADQADAEAAAGQAAAGgDADQgEAEgGAAQgGAAgEgEgA1+iyIgBgBQAigMAXgQQgDgLgKgSQgKgRgUgaIgLgPQgFgHAAgDQAAgDAEgLIABAAQAFAGAIAGIAPAJIgFAJQAPAUAJAQQAMAVAAALIgBAJIABAAQAGgGAEgGQAFgHABgKIAAgdIAAgaIgCgaQAHgJAGgDIABAAIABBXIABATQABAJACAGQADAFAEAEQAFAFAGAAIAFAAQAIAAAIgFQAIgEAAgMQAAghgEgsIgBgJIgBgJQAAgFAFgGIAIgIIABABQAAANAMAWIgJAGIABAbIAAAZQAAAZgFAMQgDAHgDAEQgDAEgFADQgJAFgJAAIgGAAQgLAAgJgKQgKgMAAgUIgCAAQgEAQgJAJQgHAIgMAFIgOAFIgQABgAtxi6QgIgHAAgQIAAgLIAGAAQABALAFAFQAGAHANAAQAIAAAIgDQAHgBAJgGQABgBAAAAQABAAAAgBQABAAAAgBQAAAAAAgBQAAgGgEgHQgDgHgHgIQgNgNgSgJQgFgCAAgEQAAgEAIgNIABAAIATAOQAKAIAHAJQAPASAAASQAAAMgGANQgXAOgTAAQgNABgHgJgAEFizQgLAAgIgEQgIgDgEgJIAAAAQgEAIgIAEQgIAEgKAAIgGAAQgMAAgKgIQgHgEgJgNIgOgQQAAASgMALQgOAMgeAAIgFAAQgJAAgGgCQgGgCgFgFQgFgHgDgJIgBgaQAAgjgEg2QAJgKAGgEIABAAQABAXAAAeIABA3IAAAJQAAAMALAEIAKACIAIAAQAJAAAJgDQALgBAHgFQAHgFAAgCQAAgEgDgHQgEgIgLgOQgIgJgOgNIgKgLIAAgIQAAgGAEgHQABgDAEgCQALgIAZgJIA3gSIABAAQgFAKgGAJIgiALQggAMgNAHQAIAGAOAGIgEAHQAUASAjApQAHAIAGADQAHAFAIAAIAHAAQAJAAAHgEQAIgEABgGIAEgQIALgHIABABQgEAMAAAFQAAAIAFAEQAHAHAMAAIAGAAQAJAAAHgFQAIgEAAgMQAAghgEgsIgBgJIgBgJQAAgFAFgGIAIgIIABABQAAANAMAWIgKAGIACAbIABAZQAAAZgHAMIgEALQgEAEgFADQgIAFgLAAgAksizQgKAAgHgGQgJgGgEgNIgBAAQgCAJgIAGQgQAKgPAAQgMAAgGgIQgHgGAAgOIAAgMIAGAAQABAVAUAAQAFAAAIgDIALgFIAHgFQADgDAAgDQAAgHgEgPIgJgiIAGgIIAFgHIABABQAHAbAHAnQACAKAHAHQAGAGAJAAIAGAAQAIAAAIgFQAIgEAAgMQAAgfgEguIgBgJIgBgJQAAgGAFgFIAIgIIABABQAAANAMAWIgJAGIABAbIAAAZQAAAZgFAMIgGALQgDAEgFADQgJAFgKAAgA3GizQgOAAgHgEQgHgEgDgHIgBAAQgLAPgOAAQgOAAgDgNQgLANgPAAQgNAAgBgNIgBAAQgLANgVAAIgEAAQgIAAgHgCQgFgCgFgFQgHgHgBgJIgBgaQAAgigEg3IAOgOIABAAQACAXAAAeIABA3IAAAJQAAAMAKAEQAFACAFAAIAHAAQALAAAHgEQAIgDAGgIIAHgLIALgEIABABIgHANQgDAFAAADQAAAEADABQACADADAAQAIAAAFgFQADgCADgEIAEgHIAEgJIALgGIABABQgEAJgBAFQgCAFAAAEQAAADACACQACAEAEAAQAGAAAFgEQAFgDAEgLIADgMIALgHIABAAQgEAMAAAJQAAAHAHAEQAGAFALAAIAGAAQAWAAAHgEQAJgDAAgDQAAgFgFgKQgCgHgIgPIALgQIABAAQAGAKAEALQAFANAAALQAAAIgDAHQgDAGgFAGQgEAGgKACQgJACgRAAgAYOjfIADgLIA0AAIgDALgALmj3QgDgDAAgGQAAgGADgDQAEgEAGAAQAGAAADAEQAEADAAAGQAAAGgEADQgDAFgGAAQgGAAgEgFgADHkOQAGgJAGgGQAIAHAJAJQgGAJgFAFIgSgPgADkkRIAMgNQAIAGAJAKIgLANIgSgQgAgnkhQAGgIAGgHQAIAHAJAJIgLANIgSgOgAgKkkIALgNQAHAFAKAJQgHAKgFAFIgQgQgAvhkbIgIgIIAMgPQAIAGAJAJQgFAJgHAGIgJgHgA24knIANgPIASAQQgGAJgHAGIgSgQgA7ZkjIgIgHIAMgPQAIAGAJAKQgFAHgHAHIgJgIgAlsk/IAMgPQAJAGAJAJQgFAJgHAGIgSgPgAgflCIAMgOQAIAGAJAKQgHAJgEAFIgSgQg");
	this.shape_1.setTransform(50.875,-226.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129.1,-260.7,360,68.5);


(lib.sfbfgbfbfbfsh = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhCANIABgCIADACIgCACIgCgCgAg+ANIABgCIACACIgBACIgCgCgAg4AKIABgBIACABQACAAADgCIACgDIgBgBIgBgCIABgCIAGgBIABABIACABIABgBIACgCIACgCIACAAIADABIABADIAAACIADAAIAFgBIAFgBIgGgCIgCABIAAABIgBABIgBgCQAAAAAAAAQAAgBABAAQAAAAAAAAQAAgBABAAIACgBIAGACIADAAIACAAIgBACIgDAAIgDACIgEACIgEAAIgBAAIgGAAIgCAAIgCAAIgEAAIgBACIAAAAIAAgDQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBIgFACIAAABIAAADQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAgBAAQAAgBgBAAgAgigBIgDADIADAAIADAAIACgBIABgBIgBgBIgCgBIgDABgAALAJIAAAAIACAAIAEgCQAAAAABgBQAAAAAAAAQAAgBABAAQAAgBAAAAIgBgBIgBgDIABgBIAAAAIACACIACABIABAAIADAAIABgBIAAgBIgBgDIABgCIAAAAIABADIABACIAAACIgBABIgCABIgDAAIgBAAIgCAAIAAAAIAAACIgBABIgCADIgCABIgEgCgAhEAIQgBgCAAgDIABgEIAAABIAAACQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAABABAAQABAAAAAAQABAAAAAAIACAAIADgBIACgBIAAgBIgBgBIgCAAIgDgBIgBgCQAAAAAAAAQABgBAAgBQAAAAAAgBQABAAAAgBIADgCIACAAIABABIABABIgBACIgBgBIgBgBIgBAAIgCABIgBACIAAABQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAAAIACABIACAAIAAABIAAABIAAACIgBACIgDACIgEABQgBAAgBAAQAAAAgBgBQAAAAgBAAQAAgBgBAAgABEABIAAgBIAAgLIABgCIABAAIAAANIAAACIgBABIgBACIAAgEgAAAABIAAgBIAAgLIABgCIAAAAIAAANIAAACIAAABIgBACIAAgEgAA7AEIgDAAIgBgCIgCACIgCAAIAAAAIgDgBIgCgCIgCgBQAAAAAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgCABgEAAIAAAAIgCAAIgBgBIgBgCIgBgCIAAgLIACgBIAAAGIAAAHIAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAABABAAIABAAIABAAIACAAIACgBIABgBIAAAAIgCgDIgDgDIgBgBIAAgBIAAgBIABgBIAEgCIAHgCIgBACIgEABIgGADIADABIgBABIAHAGIACACIACAAIAAAAIACAAIABgCIABgBIABAAIAAABIAAABIACABIACAAIACAAIAAgCIAAgJIAAgCIAAgBIABgBIACAEIgBABIAAADIAAADIgBAEIAAABIgBABIgDAAgAgJAEQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAgBIAAgBIABAAQAAAAAAABQAAAAABABQAAAAAAAAQABAAABAAIABAAIACAAIABgCIgBgJIAAgBIAAgBIABgBIABgBIABAEIgBABIAAADIAAADIAAAEIgBABIgBABIgCAAgAAzgGIACgCIACACIgCACIgCgCgAA3gGIABgCIACACIgBACIgCgCgAA3gGIAAAAgAAZgIIACgCIACACIgBACIgDgCgAAWgIIABgCIACACIgBACIgCgCgAgUgIIABgCIACACIgBACIgCgCgAgkgJIABgBIADABIgCACIgCgCgAAXgMIABgCIACACIgBACIgCgCg");
	this.shape.setTransform(1.675,-0.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.3,-1.6,14,3.1);


(lib.SDfdsfafesefsef = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("ATCF4QgHgCgFgEQgMgHgHgOQgHgNAAgOIAAgJIgPABIgFAAQgLAAgHgCQgIgDgGgGQgIgIgCgLQgCgJABgYQAAgsgGhDIASgRIABAAQACAbABAmIABBGIAAAKQAAAPANAFQAGADAHAAIAWAAIAKgpQAJgbANgUIACAAIAHAKQALARAGALQAHAOAAALQAAANgEAMIAoAAQAMAAAJgFQAKgFACgHIAFgUIANgKIABACQgEAPAAAGQAAALAGAFQAJAIAOAAIAPAAQAOgBAOgEIAAgBQgWgNAAgXQAAgLAIgOQAHgLAKgHQAJgGAMgBQANABALAHQAKAJAIAOIgEADQgIgGgHgDQgIgCgKAAQgOAAgLAFQgJAFAAAGQAAAOAQAMIAMAHQAGADAEAAQAKAAAOgEIAdgKIABABIgKAYQgQAFgTAFIgeAJIgYAHQgMADgKAAIgKAAQgOAAgKgEQgKgFgEgKIgBAAQgEAJgLAGQgJAEgNAAIgJAAQgJAAgGgCIgBAAQAEAGACAHIABANIgBALIgEALQgFAHgHAFQgIAGgIgBQgHABgHgCgASnE5QABAHADAHQADAHAFAFQAHAJAKAFQAJAFAJAAQAGAAACgCQADgDAAgEQAAgMgHgKQgLgPgTAAIgVABgASpEjQATgBAKgDQANgDAAgGQAAgIgIgMIgQgZIgBAAQgLAggGAagAZyFiIACgHQALAEAKgBQAUABASgPQASgOAKgWQABgFAAgDIAAgFIgCgFQgKgXgNgSIAOgXIABAAIANAZIAGAPQADAJAAALIAAAVQAAAYgXAbQgRARgOAAQgTABgdgOgAYBFiIACgHQAKAEALgBQASABATgPQATgOAJgWQACgEAAgEIgBgFIgCgFQgKgXgMgSIANgXIABAAIAOAZQAEAIACAHQACAJABALIAAAVQAAAYgYAbQgQARgOAAQgUABgcgOgAXwE9QACgMABgZIAAgSQAAgsgIhIQAJgLAKgJIABABQAGAyAABRQgBAUgBAKQAAAIgFAHQgDAGgIAKgAQIE4QgEgEAAgHQAAgIAEgEQAFgFAHAAQAHAAAEAFQAFAEAAAIQAAAHgFAEQgEAFgHAAQgHAAgFgFgEAgRAE6QgeAAgIgTIgBAAQgFAJgKAGQgKAEgMAAIgHAAQgOAAgJgHQgKgGgFgRIgBAAQgCALgMAHQgUAMgRAAQgQAAgIgJQgJgJAAgRIABgNIAHAAQABAZAaAAQAHgBAJgDQAHgCAHgEQAFgDADgEQAEgDAAgEQAAgJgEgSIgLgqIANgUIABABQAJAhAJAyQACAOAJAHQAHAIALAAIAIAAQALAAAJgFQAKgFABgHIAGgUIAMgKIACACQgEAPgBAGQABALAGAFQAJAIAOAAIAPAAQANgBAOgEIAAgBQgWgOABgWQAAgLAHgOQAIgLAJgHQALgGALgBQANABAKAHQALAJAHAOIgDADQgHgGgJgDQgHgCgLAAQgNAAgKAFQgLAFAAAGQAAAOAQAMIANAHQAGADAEAAQAKAAAOgEIAegKIABABIgKAYQgRAFgTAFIgfAJIgWAHQgNADgKAAgAQKD/QAHgGACgFQADgEAAgHQAAgHgMgLIgSgNQgIgGgEgGQgDgFAAgIQABgRAOgNQANgOASAAIAAAAQAFAAAHACQAJAEAGAEIAFAGQABACAAADQAAAFgFAEQgEAFgEAAIgLgJQgLgIgKAAQgIABgEADQgEAEAAAHQAAAGAJAJIATAOQANAJAFAHQAFAHABAHQAAAMgMALQgKAJgKAEgAUCDJQAHgKAIgIQAKAHALANQgHALgHAGIgWgTgAUmDGQAHgJAIgJQAKAIALAMQgIAMgGAFIgWgTgAfXDFIAPgTQALAIALAMQgGALgKAHIgVgTgAahCsIAQgTQAKAJAMAMQgHAKgIAIIgXgUgAPphYQgbgUAAglQAAggAZgZQAXgZAkgIIAAgBQgQgFgMgDQgLgCgNAAQgPAAgIAJIADAQIgFAOIgCABIgLgeQABgOAMgKQAKgJASAAQAUAAApAQQAOAGARABIARgBIAAABIgLASIgaAFIgYAHQgfAMgSAPQgTARAAASQAAAdAbAQQAZAQAoABQAWAAAagFIAAADQgSAPgMAGQgQADgTAAQgnABgYgTgAzFhzQAGgIAJgJQAJAIAMAMQgJAMgGAFIgVgUgAyhh1IAPgSQAKAJALALQgJAMgGAFIgVgTgAosh4QAHgKAHgHQAKAGAMANQgIALgHAGIgVgTgAJ2h5IAPgTQALAJAMALQgHALgJAIIgWgUgAxch5IAPgTQALAIAMAMQgHALgJAIIgWgUgAoIh6IAOgSQAKAHAMANQgIALgHAGIgVgTgAhThuQgLgFgJgIQgTgVAAgdQAAgQAFgPQADgMAGgQIAHAEIgFATQgDAKAAAJQAAAWALAPQARAVAZAAQAfAAAXgOQARgLAFgHQAAgFgSgEQgQgFgXgCIgCgBIAJgTQAPgDAJgEQAGgDADgEIAAgVQgBglgCgwIgCgNIgBgLQAAgGAFgGIAKgLIABACQAAARAQAZQgHAGgFAEIABAgIABAgQAAAQgCAMQgEANgHAMQARAEAFAGQAEAGAAALQAAALgIAOQgTAVgXAKQgTAHgVAAQgNAAgMgEgA7Uh+QgPgPAAgZQAAgRAFgOQADgLAIgMIAHADQgFAJgDAKQgCAJAAAHQAAAWANALQAFAFAJADQAKAEAKAAQAMAAAMgFQAMgEAJgIQAHgFAEgEQADgFAAgFIgBgLIgGgTQgHgTgHgMIAMgUIACAAQAJASAGASQAEAMAIAEQAGADAQAAIAGAAQAWABAKgiQACgKALgMQAMgLAMAAQAPAAAMAUQAJARACAbQgFAYgOAAQgaAAgdgWIgBAAQgIAYgZAAIgHAAQgQAAgLgIIAAAAQgBANgDANQgEALgEAGQgKAMgSAJQgSAJgRAAQgZAAgRgQgA4KjvQgHAFgEAJQAIALASAIQANAFAJAAQAFAAABgCQgEgUgIgLQgHgKgKAAQgJABgFAEgA0DiBQgKgEgPgHIADgGQAJAEAIAAQAcAAAXgaQAHgJAEgFQAEgIAAgEQgDgIgGgIIgOgQIAGgYIABAAIAPAMQAFAEAKAAQAHAAAGgFQAEgCAEgJIAIgOIACAAIAEAdQAGAZAKAHQAIAEAIAAIAGAAQALAAAKgEQAJgFACgHIAGgUIAMgKIABACQgDAPAAAHQAAAKAFAFQAKAHANAAIAQAAQAPAAAMgBQANgDAJgGQAKgFAAgEQAAgLgMgRQgQgWgogfQgHgFAAgMQAAgFAEgHQAEgGAKgGQAPgHAcgKIA5gUIABACQgEAJgJAOIgfAJQgbAJghAQIAAAAIAeALIgFAKQAXASAMAQQANASAAAPQAAAMgDAKQgDAKgGAGQgJAIgOAEQgRAFgZAAIgLAAQgPAAgJgEQgKgFgFgKIAAAAQgFAJgKAFQgKAFgNAAIgGAAQgRAAgIgIQgJgKgGgWIgEgTIgBAAQgFAJgGAGQgIAFgIAAQACALAAAOIAAAKIgDAKQgDAIgFAHQgJANgKAIQgKAHgHAAQgMAAgMgDgAQQicQAJgMAHgHQAKAIALAMQgFAKgKAIIgWgTgADUijQgNgQABgaQAAgVAMgaIAGACQgIASAAAPQAAAQAKAMQAGAIAIAEQAJAEAKAAQAQAAAPgJQAPgIAGgKIABgLQgBgmgFhCIgBgMIAAgNQAAgJAEgFQAEgGAHgGIACABQAAASAPAYIgNALIACBNIgBAXQgBAOgHASQgHAMgOAJQgIAGgLADQgKADgJAAQgaAAgOgQgEAhkgClQgKgKgGgQIgBAAQgKAJgKADQgJAEgNAAIgFAAQgLAAgIgDQgHgCgGgFQgHgJgDgMQgCgIAAgXQAAgsgEhFQAMgMAFgFIACABQACAbAAAnIAABEIAAAMQAAAOAPAFQAFADAGgBIAFAAQANAAAKgDQAJgEAKgGQgEgrAAg8IgBgNIAAgPQgBgKAGgGQADgEAIgGIACABIgBAIQAAAJAEALIAKASIgNAKIAAA9IACAeIABAAQAMgGAMAAQAGgBAFADQAHADADAEQAFAFACAHQADAHgBAIQAAAQgJAKQgJAJgLAAQgMAAgLgJgEAhlgDJQADAKAKAIQAJAGAJABQAFAAAEgEQgBgJgGgIQgHgJgLAAQgIAAgHAFgA+7ilQgLgKgFgQIgBAAQgKAJgKADQgKAEgNAAIgEAAQgLAAgIgDQgIgCgFgFQgIgJgCgMQgCgIABgXQAAgsgGhFQAMgMAGgFIABABQACAbABAnIAABEIAAAMQAAAOAOAFQAGADAGgBIAEAAQANAAALgDQAKgEAJgGQgFgrAAg8IAAgNIgBgPQAAgKAGgGIAKgKIACABIgBAIQABAJAEALQADAIAHAKIgOAKIABA9QABARABANIABAAQAMgGAMAAQAGgBAFADQAGADAEAEQAEAFACAHQADAHAAAIQAAAQgKAKQgIAJgMAAQgMAAgKgJgA+6jJQADAKAJAIQAJAGAJABQAFAAAEgEQABgJgIgIQgGgJgLAAQgJAAgGAFgAZminIgWgGIAAgCQA4gHAcgRQgBgFgGgLIgPgWIgTgcIgVggIgOgVQgEgJAAgEQAAgDADgHIAGgIIABAAIAMAPIARARIgGALIAZAmIAUAgQAHAPABASIABAAQAPgLAAgXQAAgZgFgyIgBgOIgBgPQAAgJAEgEIALgNIABACIgBADQABAIAEAKIALAUIgMAJIACBDQAAASgGATQgEAKgFAIQgEAHgIAGQgKAHgNAEQgNAFgLAAQgLgBgNgCgAK9inIgWgGIAAgCQA3gHAcgRQgBgFgFgLIgPgWIgTgcIgVggIgOgVQgFgJABgEQAAgDADgHIAFgIIABAAIANAPIARARIgGALIAZAmIATAgQAIAPAAASIABAAQAPgLABgXQAAgagGgxIgBgOIgBgPQAAgJAFgEQACgFAJgIIABACIgBADQAAAIAEAKQAEAJAIALIgMAJIABBDQAAARgFAUQgFAKgEAIQgFAHgIAGQgJAHgNAEQgMAFgMAAQgLgBgNgCgAswi2QgbgSAAggQAAgZALgUIAHADQgFARAAALQAAAbAYAOQAWAMAmAAQAdAAAjgIQAPgEAJgEQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAAAAAQAAgHgGgMQgEgKgIgRQAGgMAHgKIABAAQAIAOAFANQAGASAAANQAAAJgDAIIgHANQgNAJgdAGQghAIgaAAQgpAAgXgPgAc9isQACgMAAgZIAAgSQgBgsgGhIQAJgLAJgIIABAAQAGAyAABRIgBAfQgBAHgEAHQgEAGgIAJgANIisQACgMAAgZIAAgSQABgsgHhIQAIgKAKgJIACAAQAFAygBBRIgBAfQAAAHgEAHQgDAGgJAJgABEisQACgMABgZIAAgSQAAgrgHhJQAJgLAJgIIACAAQAFAyAABRIgCAfQAAAHgEAHQgDAGgJAJgA9lisQACgMABgZIAAgSQgBgqgGhKQAIgLAKgIIABAAQAFAyABBRQAAATgCAMQgBAHgDAHQgEAGgIAJgAmZiyQgPgIgLgLIgBAAQgEAKgIAFQgLAHgOAAIgHAAQgOAAgJgEQgLgFgEgKIgBAAQgEAJgLAFQgJAFgNAAIgGAAQgLAAgHgDQgHgCgGgFQgIgJgCgMQgCgIAAgXQAAgtgEhEQALgMAGgFIABABQACAbABAnIAABEIAAAMQAAAOAOAFQAGADAGgBIAHAAQALAAAJgEQAJgFACgHIAGgUIANgKIABACQgEAPAAAHQAAAKAGAFQAKAHANAAIAJAAQAOAAAHgHQAGgGAFgOQAEgRALgKQAJgJAKAAQAHAAAFADQAFAEAFAGIAHAMIALAXQAEAHAHAEQAIAEAKAAIAPAAQAQAAAMgBQAOgDAJgGQAJgFABgEQgBgLgNgRQgQgWgogfQgGgFAAgMQAAgFAFgHQADgGAKgGQAPgHAbgKIA7gUIABACQgGALgJAMQgOADgPAGQgcAJgiAQIAAAAIAfALIgEAKQAWASAMAQQANASAAAPQAAAMgDAKQgDAKgFAGQgKAIgPAEQgQAFgYAAIgMAAQgSAAgLgQIAAAAQgCAKgEAEQgGAGgHAAIgBAAQgKAAgPgHgAmljrQgFAEgDAIQABAEAIAIQAFAFAHAEIAOAGQAIADAEAAIAFgBQAAgBABAAQAAgBAAAAQABgBAAAAQAAgBAAgBQAAgFgCgGQgDgHgEgGQgGgJgFgEQgHgEgGAAQgHAAgGAFgAd/i2QgKgKAAgUIABgOIAHAAQABAOAGAHQAIAIAPAAQALAAAKgDQAJgDALgGQADgCAAgDQAAgHgEgJQgFgJgIgKQgQgQgWgMQgFgDgBgEQABgFAIgQIACAAQAMAHAMAKQAMAKAIAMQATAWAAAVQAAARgHAQQgeARgWAAQgRAAgJgJgA1TizQgJgFgFgMQgEgJgBgOQAAgJADgKIAIgRQAJgOAKgKIACgTIADgBQAFAGAXASQAWASADAMQACAIAAAMQAAAKgCAJQgDALgFAFQgPARgXAAQgOABgJgHgA1ajfQAAAKAJAIQAJAHANAAQAPABAOgLQAIgFAAgHQAAgIgKgMQgLgOgTgKQgcAXAAASgEgiWgCvIAIgOQAGgFAFgCIAAgBQgVgHAAgPQAAgIAFgHQADgGAFgFQAHgGAIgEQAJgEAIAAQAHABAGAEQAFADAAAHQAAAJgJAIIgBAAQgCgGgDgEQgEgFgGAAIgJACIgHAEQgFADgBADQABAHAHAFQAFADAFACQAIACAGAAQAOAAARgDIABACIgKASQgmAEgcARgAWkivQgoAAAAgfIABgKIAHgEIAAAAQABAVAgAAIAIAAQAbAAAJgDQALgEAAgEQAAgHgFgMIgOgbIAPgWIAAAAQAIAOAFANQAGASAAANQAAAJgDAJQgEAHgGAJQgGAGgLACQgMADgVAAgAT7ivQgOAAgJgEQgKgFgFgKIgBAAQgEAJgLAFQgJAFgNAAIgGAAQgKAAgIgDQgHgCgGgFQgIgJgCgMQgBgIAAgXQgBgtgEhEIARgRIABABQACAbABAnIAABEIAAAMQAAAOAPAFQAFADAGgBIAHAAQALAAAJgEQAKgFACgHIAFgUIANgKIABACQgEAPAAAHQAAAKAGAFQAKAHAOAAIAOAAQAXAAAXgIQAYgIAdgSIAAAAQgigNgYAAQgPAAgJAJIADAKIgGAQIgBAAIgKgZQABgOAMgKQALgJARAAQAVAAAoAQQAPAGAQABIARAAIgLATQgVAAgLAHIgfAUQgUANgTAGQgVAGgWAAgAJaivQgbAAgdgHIgSAFQgMACgNAAQgmAAgOgTIgBAAQgHAKgLAFQgKAEgLAAIgEAAQgLAAgHgDQgIgCgGgFQgIgJgCgMQgBgIAAgXQAAgtgFhEIASgRIABABQACAbAAAnIABBEIAAAMQAAAOAOAFQAFADAHgBIAHAAQAMAAAIgDQAIgFACgIIAFgVIAMgKIABABQgCAKAAAIQAAAHABAEQADAGAGADIARgYQAKgNALgKQAKgJAJgEQAMgGALAAQATAAALAMQALAMAAARQABAOgKATIAcAAQAbAAAKgDQALgEAAgEQAAgHgHgMQgDgKgJgRQAHgNAHgJIAAAAQAJAOAEANQAHASgBANQAAAJgDAJQgEAHgGAJQgGAGgLACQgMADgVAAgAH/jsQgPALgQAXQAMADAWAAQANAAAPgCQAMgCAIgEQAPgGABgIQgCgMgKgIQgLgIgMAAQgQAAgQANgASvkhIAPgSQAJAIAMAMQgJAMgGAGIgVgUgATTkjQAGgKAIgHQAKAHAMAMQgIALgHAGIgVgTgA6ukjIAOgTQAMAIALAMQgHALgJAHIgVgTgAsNk3IAPgRQAKAHALANQgIAKgGAHIgWgUgAWlk5QAHgKAIgIQAKAJALAMQgHAKgHAHIgWgUgArpk6QAHgJAIgIQAJAHAMANQgIAMgGAFIgWgUgAXJk7IAPgSQAKAIALAMQgHALgHAGQgLgLgLgIgA1llVIAQgSQAJAJALAMQgHALgGAFIgXgTgA1BlXIAPgSQAKAIALAMQgHAMgGAFIgXgTgAeClbIAPgUQALAIALAMQgFAKgKAJIgWgTg");
	this.shape.setTransform(-5.65,-270.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(1));

	// Layer_1
	this.instance = new lib.Bitmap83();
	this.instance.setTransform(-267,-193,0.65,0.6943);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-267,-307.9,520,468.29999999999995);


(lib.SDFBDFBDFBDFB = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap79();
	this.instance.setTransform(-212.5,-124);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-212.5,-124,425,248);


(lib.ljgcljghckhgckhckhg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap76();
	this.instance.setTransform(-200,-150);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-200,-150,400,300);


(lib.ljdfnvjkadnbklajdbdabfb = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(-19.225,0.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-155.7,-17.3,273,35.2);


(lib.ljDFgkljDFg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(47.5,478.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1473.2,157.4,3041.5,642.6);


(lib.kskjsrhgbers = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FF00").s().p("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");
	this.shape.setTransform(90.725,18.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(66,66,66,0.698)").s().p("EjkdBTvMAAAindMHI7AAAMAAACndg");
	this.shape_1.setTransform(39.65,-6.875);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1422.5,-542.7,2924.3,1071.7);


(lib.kjdbkdjfbfd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(-804.125,312.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1718.3,33,1828.3999999999999,559.8);


(lib.kjdbjkdfkdfdfg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.ekormat();
	this.instance.setTransform(-299,-161,0.9532,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-299,-161,571.9,512);


(lib.khbjhbkccccc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AvnC8QAKgNALgMQANAMAQAPQgLARgIAHIgfgagAu1C5QAKgOAJgKQAPAKAPARQgLAPgIAIIgegagAtVCOIAEgJQAPAHAQAAQAhAAAigcQAbgdAAgRQAAgGgGgIIgMgQIAHgfQArgRAygQQACAQAHALQAHAMAPAIIAYggQAOgRAPgOQAOgMAMgGQAPgIARAAQAaAAAQAQQAPAQAAAYQAAASgNAaIAwAAQAgAAAhgLQAhgLAogYQgwgRghgBQgVAAgKANIACANIgIAVIgCAAIgNggQACgVAPgMQAQgNAXAAQAdAAA3AWQAUAJAYAAIAVAAIgOAbQgdAAgPAIIgrAcQgbASgbAIQgbAIgfAAIgSAAQgnAAgmgJQgMAFgNACQgQACgSAAQgeAAgSgIQgIALgMAXIgGgDQAGgWAGgSQgVgQgDgXQgoAOgXAKQADAKAAAIIgBAkQgBAZgVAZQgeAfgcAAQgZAAgkgYgAoqgTQgUAOgXAeQARAFAeAAQASAAATgEQASgCALgFQAWgIAAgLQgDgPgPgLQgOgLgQAAQgWgBgWATgABdCHIACgJQAMAGASgBQAbAAAbgYQAbgZAFgbIgHgMQgNgRgLgVIAPgdIACAAQAMAcALANQAOANAVAAIAIAAQAkAAAOgEQAPgFABgIQAAgGgJgTIgSglQAKgQAJgMIACAAQAJATAHATQAJAYgBAPQAAANgDANQgFALgJALQgIAIgQAFQgOACgfAAIgIAAQgQAAgKgIIAAAIQAAAJgDALQgCALgEAJQgQAagQAOQgQAKgOABQgbgBgkgSgAwBBuQgVgZgBgpQAAghAOgdIALACQgIAYAAAVQAAAiAWAUQAUAUAgAAQANAAATgFQAUgGASgLQAMgHAKgIQAJgHAAgDQAAgFgMgFQgLgFgQgBQgmgGgJgLQgJgJAAgNQAAgkAbgcQAPgPASgKQARgMAPAAQALAAAGANQAHAOAAALQAAAHgLAVIgEAAQgDgQgGgIQgFgIgFAAQgJAAgKAFQgLAGgKAIQgNAIgFAIQgIAKAAAHQAAAMAjAGIAeAHQANADAHAFQAGAFACAGQADAHAAALQAAAJgHAPQgGAPgHAHQgVATgaAMQgbAMgZAAQgsAAgYgbgAOEBDQAEgSAAggIAAgYQgBg8gJhkQAKgOAOgNIADABQAHBFAABvQAAAagCAPQAAALgGAJQgEAJgMALgAg/BDQADgSAAggIAAgYQAAg6gKhmQAMgOAOgNIACABQAGBFAABvQAAAagBAPQgBALgGAJQgEAJgMALgAzqA9QgFgGAAgLQAAgJAFgGQAHgHAJAAQAJAAAGAHQAIAHAAAIQAAALgIAGQgFAGgKAAQgJAAgHgGgAR3A/QgPAAgJgCQgLgFgHgIQgLgLgDgRQgDgKABghQAAg6gIhfIAagXIAAABQADAlACA1IAABfIAAANQAAAUATAIQAIACAIAAIAKAAQAdAAANgsQAFgPAPgPQAPgPARgBQAWABAOAbQAOAXADAlQgHAggUABQgjAAgpgfIgCAAQgJAhgjAAgATFgYQgLAHgFAMQALAOAaALQARAIAOAAQAGAAACgDQgGgbgLgPQgLgOgOAAQgKABgIAGgAMBA/QgUAAgNgGQgOgGgGgOQgIANgNAGQgOAHgRAAIgLAAQgUAAgQgMQgNgJgQgUIgWgcIgCAAQABAggVARQgXAUgzAAIgKAAQgPAAgLgCQgKgFgHgIQgMgLgDgRQgCgKAAghQAAg7gGheQAPgRAJgGIABABQADAlABA1IAABfIAAANQAAAUAUAIQAHACAJAAIAOAAQARAAAQgCQARgEAMgJQAMgIgBgEQAAgFgDgLQgJgQgRgVQgPgRgWgYQgPgOgCgDIgBgPQAAgJAGgMIAIgKQAUgLAsgQQAigOA9gSIABABQgJAPgMARQgTAEgnAOQg3AWgWAKIAAACQAPAKAYAKIgIALQAjAhA8BEQAKAOALAFQANAHAPAAIAJAAQAPAAANgFQAOgHACgKIAIgaIARgOIABADQgFAVAAAIQAAAOAIAGQAOAKAUAAIAJAAQAPAAANgHQAOgIABgSQgCg3gHhOIgBgQIgBgQQAAgIAHgIIAOgPIADABQgBAXAWAkIgRAOIACAsIABAsQAAApgKAWQgDALgGAHQgFAHgJAEQgPAIgQAAgAjGA/Qg2AAAAgrIABgNIAJgHIAAABQACAdAsAAIANAAQAPAAANgHQAOgIAAgSQgCg4gGhNIgBggQgBgIAHgIIAOgPIACABQgBAXAWAkQgHAHgJAHIADAsIAAAsQAAArgKAUQgEALgFAHQgGAHgJAEQgPAIgQAAgAzngSQAIgHAEgHQAFgHAAgIQAAgLgRgMIgagTQgKgJgEgIQgEgIAAgKQAAgXATgUQATgRAYAAQAGAAAKADQAMAEAJAIQAEADABADQADADAAAEQAAAIgHAFQgFAGgGgBIgPgLQgPgLgOAAQgKABgGAFQgGAGABAHQAAALANAMIAZASQARANAIAKQAHAJAAAKQAAARgQAPQgNAMgOAGgAKXhdIATgWQAPAJAQARQgLAQgJAIIgegcgALJhfQAIgNALgMQANALARAQQgLAQgJAIQgPgPgOgLgAD7h9IAVgZQAPAMAOAPQgLARgIAHIgfgagAlUhyIgPgMQAMgTAIgHQAPALARAQQgKANgMAMQgGgIgJgGgAEtiAIAUgYQAOALAPAQQgKAPgJAIQgQgQgOgKgApAiEIAVgaQAPALAPAQQgKAOgLALIgegagAELi0QAIgNALgLQAOAKAPASQgLAPgJAJIgcgcg");
	this.shape.setTransform(233.45,-233.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,51,102,0.8)").s().p("AiBAiQgOAAgKgKQgKgKAAgOIAAAAQAAgNAKgKQAKgKAOAAIEDAAQAOAAAKAKQAKAKAAANIAAAAQAAAOgKAKQgKAKgOAAg");
	this.shape_1.setTransform(238.2209,-237.6415,12.2846,10.8436);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.8,-274.8,402.9,74.30000000000001);


(lib.jjgchkkcghcgh = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap75();
	this.instance.setTransform(-175,-131.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-131.5,350,263);


(lib.jhjhjhgjh = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AJ/A7IAHgJIALAKIgHAJIgLgKgAAAA7IAHgKIALAKQgDAFgFAEIgKgJgAkvA7IAIgKQAGAFAFAFIgIAJIgLgJgAKRA6IAHgJIALAKIgHAJIgLgKgACuA6IACgDQAEACAGAAQAKAAAKgJQAKgJABgKIgCgFIgIgNIAFgLIAAAAQAFALAEADQAFAGAHAAIAEAAQANAAAFgCQAFgCAAgCQAAgDgDgHIgGgMIAHgLIAAAAIAHAOQADAIAAAGQAAAFgCAFIgFAHQgDAEgGABQgFABgLAAIgDAAQgGAAgDgDIgBAAIAAADIAAAIIgDAHQgGAJgGAEQgFAFgFAAQgKAAgOgHgAoBAzIABgCIAKABQAKAAAJgIQAJgGAFgLIABgEIgBgCIgBgDQgFgLgGgJIAHgLIAAAAIAHAMIADAHQACAFAAAFIAAAKQAAAMgMAOQgIAIgIAAQgJABgOgIgAIMAdQgGgFgEgGQgEgHAAgHQAAgMAGgKIAEACQgDAIAAAFQAAAGADAFQAEAGAFADQAGADAIACIAQABQARAAARgEIgBgCQgCgDAAgDIgBgHQAAgMAIgKIAIgFQAEgDACAAQADAAADADQADADACAFQAEAGAAAGIgCALIgEALQAFABAJAAIAFAAQAGAAAEgCQAFgCABgEIADgKIAGgEIABAAIgCAKQAAAGADACQAEAEAHAAIAIAAIAOgBQAGgBAFgDQAFgDAAgCQAAgFgHgIQgIgKgUgQQgDgDAAgGQAAgCACgDQACgEAFgCIAVgJIAdgKIABABIgHALIgPAFQgOAFgRAHIAQAGIgDAFQAMAJAGAIQAGAJAAAGQAAAHgBAEQgCAFgDADQgEAFgIACQgIACgMAAIgGAAQgHAAgFgCQgFgDgCgEIgBAAQgCAEgFADQgFACgGAAIgFAAIgMgBIgPgEQgLAEgOACQgOACgMAAQgVAAgLgGgAJXgHQgEAFgCAFQABAEADADQAEADAGACQAEgBAFgDQAFgFAAgCQAAgEgCgEQgFgIgFAAQgFAAgFAFgAjWAcQgNgIAAgRQAAgLAFgLIAEADQgDAHAAAGQAAANAMAGQALAHATAAQAPAAARgEIAMgEIABgBQAAgDgDgHIgGgMIAHgLIAAAAIAGAOQADAIAAAGQAAAEgBAEIgEAHQgGAFgPADQgQADgNAAQgUABgMgIgAqbAcQgNgIAAgRQAAgLAGgLIADADQgCAHAAAGQAAANAMAGQALAHATAAQAPAAAQgEIANgEIABgBQAAgDgDgHIgHgMIAHgLIABAAQAEAHACAHQADAIAAAGQAAAEgBAEIgEAHQgGAFgPADQgQADgNAAQgVABgMgIgAB1AhQACgGAAgMIAAgKQAAgTgEglIAJgKIABABQADAZAAAnIgBAPQAAAEgCADIgGAIgArRAfQgCgCAAgEQAAgDACgDQADgCADAAQAEAAACACQACADAAADQAAAEgCACQgCADgEgBQgDABgDgDgAGlAgQgHAAgFgCQgFgDgCgEIgBAAQgCAEgFADQgFACgGAAIgEAAQgIAAgGgEQgEgEgGgHIgIgLIgBAAQAAANgHAFQgJAIgSAAIgEAAQgFAAgEgBQgEgBgDgEQgEgDgBgHIAAgPQAAgVgDgjIAJgIIABAAIABAhIAAAiIAAAFQAAAIAHACIAGABIAFAAQAPAAAIgGQAEgDAAgBIgCgGQgCgFgHgIIgOgOIgGgHIAAgFQAAgEACgEIAEgEQAGgEAQgGQANgEAWgHIAAABIgHALIgVAHQgUAHgIAEIAOAIIgDAFQANALAVAZQAEAEAFACQAEADAFAAIAEAAQAGAAAEgCQAFgCABgEIADgKIAGgEIABAAIgCAKQAAAGADACQAEAEAHAAIADAAQAOAAAFgCQAFgCAAgCQAAgDgDgHIgGgMIAHgLIAAAAIAHAOQADAIAAAGQAAAFgCAFIgFAHQgDAEgGABQgFABgLAAgABFAgQgOAAgFgJIAAAAQgCAEgGADQgEACgHAAIgEAAQgHAAgEgCQgFgDgDgEIAAAAQgCAEgGADQgDACgHAAIgCAAQgGAAgEgBQgDgBgDgEQgEgDgBgHIgBgPQAAgVgCgjIAIgIIABAAIABAhIAAAiIAAAFQAAAIAHACIAGABIAEAAQAFAAAEgCQAFgCABgEIACgKIAHgEIAAAAIgCAKQAAAGADACQAFAEAHAAIAEAAQAFAAAFgCQAFgCABgEIACgKIAHgEIAAAAIgCAKQAAAGADACQAFAEAHAAIAEAAQAFAAAFgDQAFgCAAgIQAAgUgDgbIAAgGIgBgFQAAgEADgDIAFgFIABAAQAAAJAHANIgFAEIAAARIABAQQAAAPgEAIIgDAFQgCADgDACQgGADgGAAgAhXAgQgFAAgEgBQgEgBgDgEQgEgDgBgHIAAgPQAAgVgDgjIAJgIIABAAIABAhIAAAiIAAAFQAAAIAHACIAGABIADAAQANAAAFgCQAGgCAAgCQAAgDgDgHIgHgMIAHgLIABAAIAGAOQADAIAAAGQAAAFgCAFIgFAHQgDAEgFABQgGABgLAAgAk7AgQgGAAgEgBQgDgBgDgEQgEgDgBgHIgBgPQAAgUgCgkIAIgIIABAAIABAhIABAiIAAAFQAAAIAHACIAFABIADAAQAOAAAFgCQAFgCAAgCQAAgDgDgHIgGgMIAHgLIAAAAIAGAOQADAIAAAGQAAAFgBAFIgFAHQgDAEgGABQgFABgLAAgAmBAgQgHAAgEgDQgFgEgDgJIAAAAQgCAHgFACQgKAHgJAAQgIAAgEgEQgEgFAAgJIAAgGIAEgBQAAANANAAIAIgBIAHgEIAEgDIACgEIgCgMIgFgVIADgFIADgFIABABIAJAoQABAGAEAEQAEAEAFAAIAEAAQAGAAAEgDQAFgCAAgIIgDgvIAAgGIAAgFQAAgEACgDIAFgFIABAAQAAAJAIANIgGAEIABARIAAAQQAAAPgEAIIgDAFQgCADgDACQgGADgGAAgAobAgQgGAAgDgBQgEgBgDgEQgEgDgBgHIgBgPQAAgUgCgkIAJgIIAAAAIACAhIAAAiIAAAFQAAAIAHACIAGABIADAAQANAAAFgCQAFgCAAgCQAAgDgDgHIgGgMIAHgLIAAAAIAHAOQADAIAAAGQAAAFgCAFIgFAHQgDAEgGABQgFABgLAAgArQACIAFgEQABgDAAgCQAAgFgGgEIgJgHQgEgDgBgDQgCgDAAgEQAAgIAHgHQAHgGAJgBIAGABQAEACADADIACACIABADQAAADgCACIgEACIgFgFQgGgEgFAAQgEAAgCACQgCADAAADQAAADAFAFIAJAGQAGAFADADQADAEAAADQAAAGgGAGQgFADgFACgAF+gYIAIgJIAKAKIgHAJIgLgKgAGQgZIAIgJIAKAKIgHAJIgLgKgAAogZIAIgKIALAKQgDAFgFAEIgLgJgAjEgjIAHgJIALAKIgHAJIgLgKgAqJgjIAIgJIAKAKIgHAJIgLgKgAGlgkIAHgJIALAKIgIAIIgKgJgADpgkIAHgJIALAKIgHAIIgLgJgAhYgkIAHgJQAGAEAFAGIgHAIIgLgJgAiyglIAHgIQAFAEAGAGIgIAIIgKgKgAp3glIAIgIIAKAKIgHAIIgLgKgAG3gmIAHgIQAFAEAFAGQgDAFgEADIgKgKgAD7gmIAHgIIALAKIgHAIIgLgKgAhGgmIAHgIIALAKIgHAIIgLgKgAoTgnIAIgJIALAJQgEAGgEAEIgLgKgAJUgxIAIgJQAGAEAFAGQgDAFgFAEIgLgKgADug4IAHgJQAFAEAGAGIgHAJIgLgKg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.6,-6.9,147.3,13.8);


(lib.jhgvljgkhgcgkhc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap73();
	this.instance.setTransform(-145,-87);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145,-87,290,174);


(lib.hgchghfhjhkckc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("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");
	this.shape.setTransform(43,0.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-154.7,-38.7,395.5,78.80000000000001);


(lib.shape296 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.image295, null, new cjs.Matrix2D(1,0,0,1,-450,-127.6)).s().p("EhGTAT8MAAAgn3MCMnAAAMAAAAn3g");
	this.shape.setTransform(0,-516);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.image295, null, new cjs.Matrix2D(1,0,0,1,-450,-400)).s().p("EhGTA+gMAAAh8/MCMnAAAMAAAB8/g");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-450,-643.6,900,1043.6);


(lib.gchvchkfc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("AvsryIfZAAIAAXlI/ZAAg");
	this.shape.setTransform(-0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-102,-77,204,154.1);


(lib.fnfgf = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.Bitmap1_1();
	this.instance.setTransform(46,242,0.4,0.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(251.35,66.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(34.5,-82.3,433.7,631.5);


(lib.fjjhgjghjghjhghg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap56copy();
	this.instance.setTransform(-381,-297,1.6251,1.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-381,-297,780.1,504);


(lib.fghsfsfsfbdfb = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Bitmap1, null, new cjs.Matrix2D(0.25,0,0,0.25,-244.6,-163.5)).s().p("Ax4MHIAA4NMAjxAAAIAAYNg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114.5,-77.5,229.1,155);


(lib.ergergegergsgs = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AmzEhQgEgPgKgfQgMgfAAgNQAAgGACgKQACgHAEgGIAHgKIAPgMIANgNIABAAQAJAIALAMIAJALIAHAKQADAEAGADQAGACAFAAIAGAAQAIAAAGgDQAHgDACgGIADgPIAJgGIABABQgCAKAAAFQgBAIAFADQAGAGAKAAIAIAAIARgBQAJgCAKgDIAAgBIgJgIIgKgJQgGgGgDAAIgFAAIAGgQIADAAQAUgFAQAAQAXAAARAHIgGAOIgWAWIAAABQANAHARAAIAPAAIAKgMQABgFABgGIAAgQIgBggIgCgdIgCgOQABgEADgEIAHgHIABABQAAALALASIgIAHIABAsQAAAPgEALQAQgRANgHQAFgEAGgCIANgBQANAAAJAJQAKAJAAAOQAAAFgCAFIgFAKIAOABIAIAAQAIAAAGgDQAIgDABgGIAEgPIAJgGIABABQgDAKAAAFQAAAIAEADQAHAGAKAAIAGAAQAHAAAGgEQAHgEABgKQgBgegDgoIgBgIIgBgIQABgFAEgEIAHgIIABABQgBAMALATIgJAGQACAEAAAUIABAXQAAAWgGALQgCAHgCACQgEAFgEACQgHAEgJAAIgFAAQgKAAgGgDQgIgDgDgHIgBAAQgEAGgGAEQgIADgIAAIgGAAQgWAAgWgEQgXAEguAAIgOAAQgLAAgMgEQgLgEgLgIIgBAAQgLAJgMAEQgKADgNAAIgHAAQgLAAgGgDQgIgDgDgHIAAAAQgDAGgIAEQgGADgKAAIgFAAQgIAAgFgDQgFgDgEgHIgBABQgCAIgEAGQgFAGgGAAQgPAAgJgMQgKgMgBgSQgPANAAAIQAAAJAGAVIAKAgQAFAPAAAEQAAAIgDALgAmoCeQgDADgBADQAAAMALAKQAHAGAKAAQADAAADgBQAAgBABAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgEgFgHIgIgKQgHgGgHgGIgFAEgAiVCfQgLAHgQATIALAAQAeAAAQgDQAUgDAEgGQAAgJgJgHQgIgHgLAAQgMAAgOAJgAkNCWIAAABIAIAHQAHAHAJAHIABAAIAZgUIAAgBQgOgDgMAAQgLAAgNACgAD6EgQABgKgHgVIgNgoQgCgIgBgHQABgJADgJQAFgMAHgFIgCgSQAAgEACgFIAGgHQAGgGAGAAQAJAAAIAHQANAKAIAQQABADAAAFQAAAFgEAJQgXgDgOAAQgKAAgGAEQgGADAAADQABAIAFAUIALAoIACAMQAAAHgDAMgAETCjIALADIAAgCQgHgKgFgEQgHgGgJAAQgEAAgEABIAAAHIgDANQAHgCAMAAIAJAAgAlkDyIALgNIAPAOIgKANIgQgOgAKCDxIAKgOQAJAGAHAJQgEAHgGAGIgQgOgAlKDwQAEgHAGgGIAQAOQgGAJgEADIgQgNgALgDwIADgFQAGADAJAAQAOAAAOgNQAOgNACgPIgDgGQgGgIgFgMIAGgPIACAAQAGAPAGAGQAHAIALAAIAEAAQAUAAAGgDQAJgDgBgDQABgEgFgJQgCgHgHgNIAKgPIABAAQAFAJAEALQAFAMgBAJQAAAHgDAHIgGALQgEAFgJABQgIACgPAAIgEAAQgKAAgEgEIgBAAIAAAEIgBALQgBAGgDAEQgIAOgIAGQgIAHgIAAQgOAAgUgKgABGDkIACgEQAJAEALAAQAUAAASgUQAMgNACgJQgKACgIAAQgNAAgIgGQgJgGAAgNQAAgMAJgLQALgLAIAAQAFAAAHADQAFAFADAHQAEAHACAJQACAKABALQAAATgLAQQgQAZgSAAQgTAAgTgNgABuCWQgGAEAAAEQAAAFAIAFQAHADAJAAQAHAAAHgBQgCgLgGgGQgHgIgHAAQgEAAgGAFgAprDkIACgEQAJAEALAAQAKAAAKgFQAKgFAKgKQALgNABgJQgJACgJAAQgNAAgHgGQgJgGAAgNQAAgMAJgLQAJgLAJAAQAGAAAFADQAFAFAFAHQAIAPAAAWQAAATgKAQQgRAZgSAAQgSAAgUgNgApDCWQgFAEAAAEQAAAFAHAFQAHADAJAAQAIAAAHgBQgDgLgFgGQgHgIgIAAQgFAAgFAFgATvDgQgJgLAAgTQABgPAIgTIAFACQgGAMAAALQAAAMAIAJQAHALAPAAQAMAAAMgHQALgGADgHIAAgCIACgGQAAgkgFhIIAMgMIACABIABBeQAAAFACAEQACAGAEACQADAEAKAAIADAAQAIAAAHgDQAHgDABgGIAEgPIAJgGIACABQgEAKAAAFQABAIAEADQAGAGALAAIAFAAQAQAAAHgYQABgIAJgIQAIgIAIAAQALAAAJAOQAGANACATQgDARgLAAQgSAAgWgQIAAAAQgGASgSAAIgEAAQgLAAgHgDQgHgDgE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IgEAEIgQgOgABShUIAKgMQAHAFAJAJQgGAIgFAFQgHgIgIgHgAyjhTIALgNIAPAOIgKANIgQgOgAhdhsIALgNQAGAFAJAKIgKAMIgQgOgAhDhuIAKgNIAQAPQgGAIgEAEIgQgOgAGVhvIACgEQAJAEAKAAQAUAAARgSQAHgFACgEQADgFACgEIgHAAQgUAAgLgHQgLgHAAgOQAAgMAHgJQAEgHAFgDQAGgDAGAAQAKAAAIAMQAIAMACAUIAPAAQAOAAAKgEQgDgHAAgLQAAgNAIgLQAHgJAHgEQAAgHACgGIABAAQAIAIAPAKIAYASQAJAGAEAHQAEAHAAAJQAAAKgGAHQgIAIgNAAQgIAAgMgDQgMgCgOgFQgVAKgQAAIgNAAQgBAGgDAHQgDAIgEAGQgHALgKAGQgJAGgFAAQgRAAgWgOgAIyimQALAEANAAQAGAAAEgDQAFgBgBgDQAAgGgIgHQgGgGgPgKQgBARgIAPgAG6i8QgFAEAAAEQAAAJAPAEIALACIANAAQgCgMgIgHQgGgIgIAAQgFAAgFAEgAIWjJQgHAIAAAFQAAAEAEAEQADAFAIADIAMgFQAJgGgBgFQAAgHgEgHQgEgGgFAAQgIAAgHAHgAAqh7QgLgNAAgWQAAgRAHgQIAGACQgEAMAAALQAAATALALQALAJAQAAQAIAAAJgCQALgDAJgGQAGgDAGgFQAFgEAAgCQAAgCgGgDIgPgDQgUgDgFgFQgEgGAAgGQAAgTAOgPQAHgIAKgGQAJgGAHAAQAGAAAEAIQADAGAAAGQABADgGAMIgCAAQgCgIgDgEQgCgFgEAAQgEAAgGADQgFACgGAFIgKAJQgDAFAAADQAAAHATAEIAPADQAHACAEACQACADACADQACAEgBAFQABAGgEAHQgDAIgFAEQgKAKgOAGQgOAHgNAAQgYAAgMgPgAy8hwQgJgDgGgGQgOgPAAgVQAAgWAKgUIAEACQgEAOAAAOQAAAPAIAMQALAPAUAAQALAAAKgDQAJgCAJgFQALgHAGgHQAAgDgPgDQgPgEgSAAIAAgBIAHgNQAQgCAIgDQAJgDgBgFIAAgFQgGACgIAAQgYAAgGgOQgCgEAAgEQAAgIACgGQADgHAFgFQAHgIAJAAQAIAAAGAHQAGAGAEAMQAFAOAAASQAAAKgFAIQAIADADAEQACADAAAIQAAA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");
	this.shape.setTransform(57.25,-229.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AlMBoIALgMQAGAFAJAJQgGAIgFAEIgPgOgAkyBnQAEgIAHgFIAOAOQgFAJgFADIgPgNgAlbBAQgMgMAAgZQAAgKADgMQAEgMAFgJIAGACQgIATAAANQAAAJACAIQADAHAFAGQAGAGAJADQAIADAKAAQATAAAXgLQALgGACgDQgDgFgKgEQgMgDgPAAIgBgCIAKgQIA3AAQAKAAALgCIAAgBQgQgJAAgQQAAgIAGgKQAFgIAGgFQAIgFAIAAQAKAAAIAGQAGAFAGALIgCACQgGgEgGgCQgFgCgIAAQgJAAgJAEQgGAEAAADQAAAKAMAJQADAEAGACIAGABQAHAAAKgCIAWgHIABABIgHAPIgaAIQgQAEgFADIgRAFQgJACgIAAIgLAAIAAAJIgDAJIgDAIQgNALgRAHQgSAHgPAAQgYAAgMgPgAD1AhQgHgBgJgDIAAgBQAogGAVgMQgBgEgFgGIgKgQIgNgVIgQgWQgHgKgDgGQgDgGAAgDIACgHIADgGIABAAIAJALIANANIgFAHIASAcIAPAXQAFAKABAMIAAAAQAMgHAAgQQAAgSgFglIAAgKIgBgKQABgGACgEQABgDAHgFIABAAIAAADQAAAGADAHIAIAOQgFAFgEACIACAwQgBAMgEANQgDAIgDAFQgEAGgFADQgHAGgJADQgJADgJAAQgIAAgJgCgAFZAeQACgJAAgSIAAgMQAAgfgFg0QAHgJAGgGIABABQAEAjAAA7IAAAVQgCAGgDAEQgCAFgGAHgAB+ANQgFAIgJAEQgGADgIAAIgFAAQgWAAgWgFQgWAFguAAIgNAAQgVAAgGgOIgBAAQgDAHgHADQgIAEgIAAIgEAAQgJAAgFgCQgFgCgFgEQgEgGgDgJIgBgWQAAgfgDgxQAIgKAFgCIAAAAQACAUAAAbIABAyIAAAIQAAAJAKAEIAJABIAEAAQAIAAAHgCQAHgEABgFIAEgOIAJgHIABABQgCALAAAFQAAAHAEADQAGAFAKAAIAMAAIAKgLIACgLIAAgPIAAggIgCgeIgCgNQAAgFADgDIAIgHIAAAAQAAAMALASIgJAGIABAsQAAAPgDAMIAAAAQAPgRANgIQAFgDAGgCIAOgCQANAAAJAKQAJAJAAAOQABAFgDAEIgEAKIAOAAIAIAAQAJAAAFgCQAHgDAAgGIAFgPIAIgGIABAAQgCAIgBAFQABAFACADQABADAEADIANgRQAHgKAIgGQAIgHAHgDQAJgFAIAAQAKAAAGAFQAGADAEAHQADAGAAAKQAAAFgDAHQgFAQgXAHQgMAFgVAAQgcAAgLgPgACrgRQgMAKgMAPQAKACAQAAQAIAAALgCQAIgCAIgDIAIgEQACgDAAgCQgBgIgGgGQgGgGgKAAQgLAAgNAJgAAUgOQgLAHgQARIALAAQAdAAAQgCQAUgDAFgGQAAgIgJgIQgIgHgLAAQgNAAgNAKgAhJg3IALgOQAHAFAIAJQgEAHgHAGIgPgNg");
	this.shape_1.setTransform(171.65,-246.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-115.7,-258.4,345.9,58.29999999999998);


(lib.shape113 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(1,1,1,0)").s().p("Eg4gAwUMAAAhgnMBxBAAAMAAABgng");
	this.shape.setTransform(360.35,292.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.3,-16.9,723.4,618.4);


(lib.shape93 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E19562").s().p("AgwCzIgPgDQgDAAgEgKQgEgLgBgNIgCgSIAAgQIgEhFIgEhnIgDhAIAHgJIAAABIADgCQBJhQBbBJIADAiQADA5gNA6QgNA7gaAuQgaAtgMANQgMANgNABg");
	this.shape.setTransform(-0.2129,0.446);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AguCsQgQgFgLgHQgMgIgFgKIgFgRIgDgiIgCg1IgEhDIgChIIABglIAPgQIADBAIAFBmIADBGIAAAPIACASQABAOAEAKQAEAKAEABIAOADIAZACQANgBAMgNQAMgOAagtQAbgtANg6QAMg8gDg5IgDgiIAXAUIgCABIgCBGIgGAwQgSBEgVAoIgfA6QgLASgJAGIgOAKIgJADIgcADg");
	this.shape_1.setTransform(-0.05,3.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.7,-17.6,21.299999999999997,38);


(lib.shape92 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E19562").s().p("AgqBoQgbgRgLgeQgKgcAAggIAAgCIABhUIA+gDQAtgJAxgRIAAAAQAMAfAFAlIAGBEQABAegJAXIgIAOIgKAKQgWAVgdADIgHAAQgaAAgWgPg");
	this.shape.setTransform(3.8048,19.6608);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DC8145").s().p("AhOAEIALgBIA7gJQAmgHAjgPIACgBIAMAeQgxARgtAJIg+ADg");
	this.shape_1.setTransform(2.575,7.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5A8E24").s().p("AhlCvIg2jLQARigBmAMIABAAIAAAAQAiAWAYAdQAbAjAUAoIAsBVIAqBQIgSAKQglAUgrAOIhWATg");
	this.shape_2.setTransform(-0.2,-11.5419);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgCEzQgbgNgQgaQgSgagGgdIgFggIAAgBIgBgiIgCg9IgBgZIgDABIgwgEIgkjfIA3DLIBJADIBVgTQAsgOAkgTIASgKIgqhQIgshWQgUgogbgjQgYgdghgWQAsAJAeAnQAfAmAXArIAvBeIAcA8IABABIAEAKIACAEIg/AhIACAGIAJAdIAKAqIAJA0QAFAjgBASQAAATgGAUQgGAUgIAKIgJANQgUAYgfAHQgMADgLAAQgTAAgRgIgABTAZQgjAPgnAHIg6AKIgLABIABAaIAABUIAAACQAAAhAKAcQAKAeAbARQAYARAfgCQAegDAVgVIALgKIAHgOQAKgXgBgeIgHhFQgFglgMgfIAAAAIgMgfgAgtk6IAAAAIAAAAIABAAg");
	this.shape_3.setTransform(0.775,2.2524);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.8,-29.3,33.2,63.099999999999994);


(lib.shape91 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AggADIgMgHQAuAMAqgUIgHAHQgSASgTAAQgPAAgRgKg");
	this.shape.setTransform(192.65,302.1597);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AiNASIAAgHIAOAEIBNAHIBmgIQA0gKAegRIgKgSIAFADIASANIAZAOIgfgDQg3AYgwAHIhpAGQgqgCgggNgAijAHIAAAAIgIgFIAeAJIAAAHgAiNALg");
	this.shape_1.setTransform(193.675,293.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(176.5,290.3,34.400000000000006,13.199999999999989);


(lib.shape90 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_12
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DB7860").s().p("AkSA+QgagDgTgTQgUgTAAgVQAAgXAUgOQATgOAaAEQAbADATATQATATAAAWQAAAWgTAOQgPALgUAAIgLgBgADJAoQgYgNAAgXQAAgWAYgTQAYgUAhgEQAigFAYANQAYANAAAXQAAAVgYAUQgYATgiAFIgRABQgXAAgRgJg");
	this.shape.setTransform(192.675,285.5515);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_11
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgIB6QgvgEgTgPQgTgPgGgSQgIgZADggQAEg4AageQAYgXAegEQA8gDAgA0IAKAPIAIAYQAMAhACAhIgDA6IAFADIgJAFIgZACQgPABgTAAQgVAAgZgBgABEBxIATgCIACgpIgBgCIgCgMQgBgrgSghIgFgOIgLgNQgJgLgGgCQgngbgoAhIgLAKQgKAQgHASQgLAZADAeQACAbAJASQAKARA4AEIA3ACQgBAAAAAAQgBAAABAAQAAAAAAAAQABAAABAAIALgBgAAjg3IABAAIAAAAgAhAhyQAbgPAhAMQg6AEgjAuQAEggAdgPg");
	this.shape_1.setTransform(168.0702,267.2447);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E19562").s().p("AgoC1IgIgDQgagJgOgbIgOgtQgLg5AAgpQAAgUADgTIABgyQAAgKADgMIAGgWQADgPAGgNQAIgQAUgBQADgDADAAIA9AEQARACAZAOQAhASAWAfQALAPACAlIgBBrIgCAOIgBAeIgBAFIgQAhIgYAdQgZAYgeACIgegBIgBABgAgWiGQgeAFgYAWQgaAfgEA4QgCAfAIAaQAFARATAPQATAQAwADQAuAEAhgDIAagDIAIgEIgFgEIADg5QgCghgLghIgJgYIgJgPQgfgyg4AAIgGAAgAhCiTQgcAPgFAgQAkguA5gFQgOgFgNAAQgRAAgQAJg");
	this.shape_2.setTransform(168.225,270.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	// Layer_10
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAxAyQhxgNhQhWQCiAqB/ABQgKA4hJAAIgNAAg");
	this.shape_3.setTransform(217.3163,241.6821,1,0.7861,0,-165.0005,14.9992);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Agpg4QAPgIASAAQBDABAtAuQh9gPhSBhQAPhiAvgXg");
	this.shape_4.setTransform(164.975,242.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	// Layer_9
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("Ah9CHIgNAAIAAgBIAMgHQgOiSBDhDQAxgnA7ANQA8AMAdA4QAPAjAAAxQgBAygaAWQgMALhUALIh5AFgAhHgzQg8A5AYB2IBAAEQA1gBBbgWQAlhzhNgtQgjgagfAAQgjAAgfAegAAnh3IgjgFQgjADglAKQAegVAigGIARABQAeABAbAPQAOAJAJAOQgagOgcgHg");
	this.shape_5.setTransform(212.7,265.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E19562").s().p("AhtCxQg2g3AAgmQAAgHADgZIAEgoIgGh1QAAgpAKgTQAPgdAygfQAXgPA1AHQAxAGASASQAaAMAOASIAUAgQAQAZAJAkIAMA+IALB5QAABIg5AmQgsAeg1AAQg8AAg7g8gAhah6QhDBDAOCSIgLAHIAAABIAMAAIAVAEIB5gFQBTgLANgLQAagWABgyQAAgxgQgjQgdg4g8gMQgOgEgNAAQgrAAgmAegABNiGQgJgPgPgIQgagPgdgBIgSgBQgiAGgeAVQAlgKAkgDIAiAFQAcAHAaAOIAAAAg");
	this.shape_6.setTransform(214.35,268.8494);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5}]}).wait(1));

	// Layer_8
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgQBTQgRgDgHgbQgIgbAHgiQAIgiARgWQAQgWARADQASAEAHAbQAHAbgHAhQgHAjgSAWQgPATgOAAIgEgBgAgGg8QgIAHgCANQgDAMAEALQAFAKAIABQAHACAIgHQAIgIACgNQADgNgEgKQgEgKgIgCIgDAAQgHAAgGAHg");
	this.shape_7.setTransform(213.7435,267.9505);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgFAfQgIgCgFgJQgEgLADgMQACgNAIgHQAIgIAIABQAIACAEALQAEAKgDAMQgCAMgIAIQgGAGgFAAIgEAAg");
	this.shape_8.setTransform(204.325,266.0848);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7}]}).wait(1));

	// Layer_7
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgEAfQgIgCgEgKQgEgJACgMQACgNAHgIQAHgIAHABQAIABAEALQACAFABAHQgGANgEAQIAAABQgGAHgGAAIgCAAg");
	this.shape_9.setTransform(163.9042,265.3693);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgNBUQgQgDgIgaQgHgbAFghIACgIQADgQAGgOQAFgLAGgIQAQgXAPADQAQACAIAaQAHAagFAiQgGAjgQAWQgOAVgOAAIgDAAgAgHg7QgHAIgCANQgCAMAEAKQAEAKAIABQAHABAHgIQAHgIACgNQACgNgEgJQgEgKgIgCIgDAAQgFAAgGAIg");
	this.shape_10.setTransform(168.775,269.0498);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9}]}).wait(1));

	// Layer_6
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AA9BcIgMABQgBAAAAAAQgBAAAAAAQAAAAAAAAQABAAAAAAIg3gCQg4gEgJgRQgKgSgCgbQgCgdAKgaQAHgSALgQIAKgKQAoghAoAbQAGACAIALIALANIAGAOQARAiACAqIACAMIABACIgDApIgTACgAAfhLIAAAAIAAAAg");
	this.shape_11.setTransform(168.501,269.2425);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(1));

	// Layer_5
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AhqBlQgYh1A8g6QA9g6BHA1QBNAtglB0QhbAVg1ACg");
	this.shape_12.setTransform(212.5974,267.5165);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1));

	// Layer_4
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgZAkIgOAFQgVAKgPAOIABgCQAQgdAhgSIAfAJQAHgQgOhWQAbA3gGA6QAeAOAaAbQgygbgzgOg");
	this.shape_13.setTransform(184.125,277.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(1));

	// Layer_3
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgRgFQASgHAQARIgEACIgGABQgJAAgPgNg");
	this.shape_14.setTransform(186.1,286.2203);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1));

	// Layer_2
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#DC8145").s().p("AAoAsIgXgPQgUgQgPgBIAEgEIgRgDIgBADIgGgDIABAAIgEgBIAAgDIAHgBQAOgIAGgkIADAcIgEASQAVAEAYAaIALAMIABABg");
	this.shape_15.setTransform(186.3,279.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1));

	// Layer_1
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000099").s().p("AAAAAIAAAAIAAAAg");
	this.shape_16.setTransform(235.925,274.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#47350E").s().p("AAAAAIAAgBIABADg");
	this.shape_17.setTransform(234.625,244.375);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#E1997B").s().p("AAAABIAAgBIAAABg");
	this.shape_18.setTransform(209.15,231.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#DB8460").s().p("Ak3BBIACABIAAAAIALAOgAEQARIAAAAIgBABgAE1hPIADAFIgBAAg");
	this.shape_19.setTransform(221.55,277.625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#DC8145").s().p("AoFAtIgCgWIACgVQADgTAIAAIABAAIACACQAKAMAOAcQgZAIAAAeIAAAEQgJgCgEgUgAHZAaQAhgqglgmQAQgQAaAFIACAAIAHAUIAAAMQgBAMgJANQgWAcgPAGg");
	this.shape_20.setTransform(201.475,276.7155);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E6A377").s().p("AgWFAQgUgLgTgUQgSgUgGgxQgGgyAPgVQAPgWAZAVIAOANIgCArIgEgFQgOgTgRgCIAEAEIgCAAQgHAAgEAUIgCAVIADAWQAEAUAJACIACAQIABgHQAGggASgCQgBADABAOQACAfADAQIADAPgABXlAIAAABIgCACg");
	this.shape_21.setTransform(156.5143,256.725);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E19562").s().p("AiGG3QhFgHgfggIgWgYIANAYIACAEIgcgGQgUgDgygVQgzgWgqgjQgzgzgIgZQgIgZgBgJIgGgxQgFgoAHhFIABgFIgCg2QgBgXAAgrIgBhhIAAgDIABgEIADhLQACg1AKgjQAIggAcgpIAEgFIAAAGIACAOIAHAXIAegoIACgCIAVAuIAdgrIAQAsIAdgrIAZAqIAdg0IASApIAAAAIACAGIAkg7IAeA7IAlg5IAjA4IAYg2IAfA3IAdgyIAgAxIABADIAUg2IAZAyIAWgwIAPAsIAdgsIAdAqIAegwIAYAtIANgSIACAJIABAAQAFAbAMAiIAAABIACAEQALAfALAXIAAAAIAMAZIAAAAIABACIABABIAAABIAEAZIgBAAIACADIAFApQAGBCAFBnIgEBVIAAAAIAAAAQAxhdA7gPIBEgDQASAHAGASQARAtgGAwQgHAggXAeQglAygzgBQgtgBgLgHIAUATQggA4g6ArQg7AshDAdQguAVgxAIIgWACIAIgUIgGAGQg2AuhIACIgcAAgAkdEOIABgBIgBAAgAiRC8IgMgOIAAAAIgBgBIgBAAgAGaA6QAUATgCAaQgCATgGAGIADgCIABgBQAPgGAWgdQAJgNACgMIAAgMIgIgUIgDgFQgIgRggARQgjASgUA4QAhgsALAAIAAAAgAAclkIABAAIAAgCgAkhl2IAAABIABgCg");
	this.shape_22.setTransform(206.3146,266.825);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#36150E").s().p("AFfF0IAAgKIgQjRIAAAAIAZACIgFgFIgZgeIgBgCIgCgDIgNgbIAAAAIghhZQgJgeAAgdIAAgJIAEgYIAAAAIgBAAQgcAcgHAWIgbgyIgbA0IgbgxIgbAuIgWgvIgVAwIgagyIAAAAIgDAGQgLAagGATIgBAAIghguIgZAvIgig1QgRAigHATIggg4IAAAAIgBAAIggA5Igdg5IgBAAIgCAAIgjAzIgCgEIAAAAIAAAAIgVgpIgcA0IgTgqIghAwIgMg7IggA5IgRgzIgGAGQgMAMgKAPIAAAAIgGAKIABgTIAHgjIAAAAIgmApIgCACQgfAlgMArQgGAUgDAZIgFA3IAACwIgahyQgThdAKhkQALhmBlhvIARgPQAjgeAngYQBgg0BogVQBSgPBMACQBIAEBGATQA8ARA8AcQAyAXAuAhQAGgXgGgKQAUAagNAQQAjgiASAZQgSgKgbAWQBTBFAaBiQAoCYgyDlQgZgDg5ANQgkAOggAiIgEAFIAAgCg");
	this.shape_23.setTransform(203.2301,229.2076);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhnJkQgvgGgtgbIgpgJIgBAAQghgHglgQIgzgaQgygegfgmIggg0IgdgRQgugcgNg8QgMg8ATgoQASgoAxAcQABgGgDgSIgnirQgfh9AOhoQAMhlBnhrIAZgZIgFAHIAPgRQAlgbAlgVQBhgxBogTQBVgRBWAFQBAAEBBANIAwAPQBmAnA1AmQACgIgJgjQAqAlACAUQANgGALACQAkAFgHAlQgYgOgRAHQAiAdAWAfQBHBlgFCpQgFCggXA7IgCAGIADADQAUAUAJAdQALApgGAsQgJArgeAnQglAwhJABQgyBIhOA0QhTA4hGASQhGASgLgEIgRAKQgtAZhIAAIgVgBgAjFIqQAfAgBGAHIACABIAbgBQBIgBA2gvIAHgFIgIAUIAWgDQAxgIAugUQBCgdA8gsQA5grAgg5IgTgTQAKAIAuABQAyAAAmgxQAXgeAHggQAFgxgQguQgGgSgTgHIhEAEQg6AOgxBeIgBAAIAEhWQgEhmgHhBIgFgpIAAgEIgEgYIgBgCIgBgBIgBgCIABABIgNgaIAAABQgKgXgLgfIgCgFIAAgBQgMghgGgbIAAgBIgCgJIgNASIgYgtIgeAxIgdgrIgdAtIgQgsIgWAvIgZgyIgUA2IgBgCIgggyIgdAzIgfg3IgXA2Igjg4IglA4Igeg7IgkA7IgDgFIAAgBIgSgpIgdA0IgZgpIgcArIgQgsIgeArIgUguIgBgCIgCAEIgeAnIgHgXIgCgOIAAgGIgDAFQgcAqgIAfQgKAjgDA1IgDBLIgBAEIABADIABBgQgBAsABAWIACA4IAAAEQgHBGAFAnIAGAxQABAJAIAaQAIAZAyAyQAqAkAzAVQAzAVAUAEIAbAFIgBgEIgOgXgAnfF3IgDgQQgEgQgCgfQgBgOACgCQgTABgFAgIgBAHIgDgQIAAgEQAAgeAZgHQgOgegKgMIgCgCIgEgDQARACAPASIAEAFIACgrIgOgNQgZgUgPAVQgPAWAGAxQAFAyATAUQASATAUAMIAEABgAFmCYIAEgEQAfgiAlgOQA5gOAYAEQAyjkgoiZQgahihThFQAcgWARAKQgRgZgjAiQAMgRgUgaQAGAKgGAYQgtgigzgXQg8gcg7gQQhGgThJgEQhLgDhSAQQhpAVhgA0QgmAXgkAeIgQAQQhmBugKBmQgLBmAUBcIAZByIABivIAEg4QAEgZAFgTQAMgtAggkIABgCIAmgqIAAABIgGAiIgBATIAFgJIABAAQAJgPAMgNIAGgGIARAzIAhg4IALA6IAhgwIAUArIAcg1IAUApIABAAIAAABIABADIAkgyIACgBIABABIAcA5IAhg5IAAgBIABABIAfA4QAHgTASgiIAiA1IAZgvIAhAtIAAAAQAGgTAMgZIACgGIABAAIAZAxIAWgvIAVAuIAbgtIAbAwIAbgzIAcAyQAGgWAdgcIABgBIAAABIgEAYIAAAJQAAAdAJAeIAgBZIABAAIANAbIACADIABACIAZAfIAFAFIgZgDIgBAAIAQDRIAAAJIAAAAIABACgAHREBQADgagUgSQgLgBghAsQATg3AjgTQAggRAJASIABAFQgagFgQAQQAlAlghArIgBABIgEADQAGgGACgUgAj7jbIABgCIgBACg");
	this.shape_24.setTransform(202.5943,251.3514);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(146.1,190.1,113.00000000000003,122.6);


(lib.shape89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5A8E24").s().p("AhaGYQiOgEiFgmIAAgDIAAgsQAAhqARiHIAAgBIAEgiQASiAAmiKIABAAIgBgBIAAABIAAgBIAAgGIAHhmIAhgXIASgMIADgCIAAABIAaAlQANAQARAKQAQALAlAHQAlAHAfgFIAVgEQAdgKAagRQAagSAWgeQAVgeAEgOIAhAHQAXAGAcANIAeAOIANAHIANAGIAMAHIAMAHIAVANIARAOIARAPIAIAMIAFAQIAEATIADAQIACASIACAVIABAMIABAMIAAANIAGBCIAGBZIAAAAIAAAHQAEARAAAhIABAGQAICQgEBCIgEAwQhEAlhyAeQhiAaiAAAIgrgBgAhzivQg3AAgkAiQgnAkAAAwQAAAwAnAhQAkAiA3AAQAzgCAmgjQAkgiAAgvQAAgxgkgiQgkgggxAAIgEAAgAkalMIAAAAIgDAEIgDACIAGgGg");
	this.shape.setTransform(3.3783,5.8607);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E19562").s().p("Ah0AtIA0gWQAjgOCGhDIAMADIAAAAIgBAFQgLAagVAYQgTAUgWAPQgXANgbAHIhAADQgagDgTgKg");
	this.shape_1.setTransform(-0.475,-29.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DC8145").s().p("AhdAwQgRgMgMgRIgHgOIgHgPIAAAAIAygTIA9gPIBGgKIBHAEIAVADQiHBCghAPIg0AVg");
	this.shape_2.setTransform(-3.75,-30.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC33").s().p("AhZBUQgmgiAAgwQAAgwAmgjQAlgjA1AAQA0gBAmAiQAkAhABAxQgBAvgkAjQgmAjg0ABQg1AAglghg");
	this.shape_3.setTransform(-8.4,-0.0532);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AjhGjQhSgNg6gPIgNgCIgDhGQgDg2ALhgIAWitQALhNAwiCIADgFIAAABIAAAAIABAAIgBABQgmCJgSCAIgEAjIAAAAQgRCIAABqIAAArIAAADQCFAnCOAEQCbAFBygeQBygfBEglIAEgwQAEhCgIiQIgBgGQAAgggEgSIAAgIIAAAAIgGhYIgGhCIAAgMIgBgNIgBgLIgCgWIgCgSIgDgQIgEgTIgFgPIgIgMIgRgPIgRgOIgVgNIgMgHIgMgHIgNgHIgNgGIgegOQgcgNgXgGIghgIQgEAOgVAfQgWAegaARQgZARgeAKIgVAEQgfAGglgHQglgHgQgLQgRgLgNgQIgaglIAAAAIgDACIgSALIghAXIABgHIADgVIAQgLIAXgOIAIgDIA4gWIAegIIA4gNIA+gGQAbgCAfADIA9AHIABABIAFAAIAGACIA3AQQAbAJAaANIAVALIAMAHIAMAHIALAHIARALIALAIIALAHIAKAIIARAQIALAQIAFANIACAQIADARIACAPIACAQIACAQIABAPIABAWIAAACIAFBBQABAgADAeIADA7IACAYQAHBdgCA9IgDBIIAAAtQiXBRizAPQg3AEg0AAQhaAAhNgMgAhhmTIg9APIgzATIABAAIAHAQIAHAOQALARASAMIAKAHQASAKAaAEIBBgEQAcgHAWgNQAVgPAUgVQAUgXALgaIABgGIAAAAIgMgCIgWgDIhGgEg");
	this.shape_4.setTransform(3.4561,5.0485);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.8,-38,76.6,86.2);


(lib.shape88 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#404248").s().p("AiUBIQh0gEgpgaIgQgQIgBgzIgBgQQAngNBdgIICLgLIB+ADQBfADBSAQIBJANIgBA+IgNADIgMACIjyAnQglAGhJAAIhegCg");
	this.shape.setTransform(1.525,-1.794);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#626473").s().p("AARBVIAAgCIgFgBIi1gCQhggnglgeIgDgDIgPgLIgChPIARAQQApAaB0AEQCSAEA5gIIDzgnIALgCIAOgDIgFBVIjfBCIgjAJIgqAJg");
	this.shape_1.setTransform(1.575,9.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhaCRIgQgCIgMgBIgKgCIgegGIgGgCIgFgCIC0ADIAGAAIAAACIgMAJIgtADgAFCgiIABg/IhJgNQhSgQhfgDIh+gDIiLALQhdAJgnANIABAQIABAzIABBOIgCgCIgDgBIgMgJIAAiNIAAgBQAFgSB8gLICSgJICBAEICUAMIAxAGIBMAMIgFCaIgRAJg");
	this.shape_2.setTransform(1.625,4.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.3,-10.6,67.9,29.5);


(lib.shape87 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#626473").s().p("AiODxIgPgLIgMkWIgBADQgBgmADgRIAHgmIAIggQAbhXBZgQQBWgPBDA4QA+A0gIBQQgCBAABAgIACDMIgIAFQgxAng6AXQggAKggAAQhAAAhGgkg");
	this.shape.setTransform(-0.7345,3.8167);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AidEHIgSgQIgJiPIgBgjIgChpIABgoIACgQIAFgdQAEgVAPgfIAIgQQAqhABMgJQBcgHBHA6QBGA5gMBXIgDBfIACC6IgOAUIAAAAIAAAAIgBABIABgCIgCjNQgBgfAChAQAIhQg+g0QhDg4hWAPQhZAQgbBXIgIAgIgHAmQgDARABAmIABgDIAMEWIgBAAgACsDqIAAAAIAAAAIAAAAg");
	this.shape_1.setTransform(-0.8053,0.5074);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.6,-25.8,37.7,57.3);


(lib.shape86 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#626473").s().p("AAkDBQgrggg0gXQg0gXg6gOIgFgEQgGgFACgLQACgMAGgOQAGgOALgNIAPgSIAHgGIghAVIgBhgIAAgCIAAAAQAIhQAjguIATgUIAQgLQASgMAXgGIAygGQBOAAAsBAQAZAkAFAWIAEAUIABADQAACIACAnIgCgCIgtgvQAQAfAYAnQAXAmAAAvQAAAvg3Akg");
	this.shape.setTransform(-1.425,6.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("ABwESIhCg4IgcgRIAAAAIgUgOQhgg7hDgFQgWgCgIgUQgFgZAIgSQAJgTAAADIgBgzQgCg3ACgRIAGgkQAIgjANgbIAUggIAQgSQALgKANgIIAAAAQApgbA9AAQBYAAAzBJQAZAkAHAfIABAGIABACIABAWIAAAhIAFCrIAFAQQATA3gUAqQgUApgxAVgAiJAKIgPASQgLANgGAOQgGAOgCAMQgCALAGAFIAFAEQA6AOA0AXQA0AXArAgIBYA+QA3gkAAgvQAAgvgXgmQgYgngQgfIAtAvIACACQgCgnAAiIIgBgDIgEgUQgFgWgZgkQgshAhOAAIgyAGQgXAGgSAMIgQALIgTAUQgjAugIBQIAAAAIAAACIABBgIAhgVg");
	this.shape_1.setTransform(-1.5231,6.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.3,-20.8,39.6,55);


(lib.shape85 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC33").s().p("AgUAXQgJgJAAgOQAAgMAJgKQAIgKAMABQAMgBAJAKQAJAKAAAMQAAAOgJAJQgJAKgMAAQgMAAgIgKg");
	this.shape.setTransform(13.55,0.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5A8E24").s().p("AiuA2IgaAAQACgiALgWQALgWAMgJIANgKQAVgLAYgBQAWACAUAJIACABQATALAMATICJgPIgGgKIAcAAIA8gHIAIAjQAHAcgFAjQhtADhkAAQhUAAhPgCgABrABIAAAAIAAgBg");
	this.shape_1.setTransform(0.3042,0.1386);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AjIBDIGRAAIAAANImRAEgAAnhCQgCgNAMgEQAXAIAiACQAhACAdgJQAcgIgFAcQgaAMgcAAIgRABQgoAAgpgTg");
	this.shape_2.setTransform(0.05,0.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AjUBfIAAgQIABgXQADgfALgaQALgdAZgQIAKgHIAXgHIAogDIAVAFIAHACIABAAIBSgMQAGgeAbAHIAtAGQAmABAggIQAfgIABAjQAAAKgDAHQAEAGAGAgQAGAhgGBIgAjJBVIGSgFIAAgNImRAAgAiVgpIgMAJQgMAJgLAWQgMAWgBAjIAaAAQCsAFDIgGQAFgkgHgcIgJgjIg7AHIgcAAIAFAKIiIAQQgNgUgSgKIgDgBQgTgKgXgCQgYABgVAMgAgvgxQAVARADALIAXgEQgOgWgPgFgAgPg2QAFACAXAaIAagDIgkgbgAALgbIAAAAgAARg5IAjAaIAigDIg6gagAAnhBQAxAWAxgFQAbABAbgMQAFgdgcAJQgdAIgigCQghgCgXgIQgNAEADAOgABtACIAAAAIABABg");
	this.shape_3.setTransform(0.0565,-0.0003);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D9D9D9").s().p("AhCgIIASgCQAPAFAPAVIgYADQgDgKgVgRgAgigMIATgDIAjAaIgZAEQgYgZgFgCgAgBgQIAKgCIA6AYIgiADg");
	this.shape_4.setTransform(1.975,-4.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.2,-9.4,42.599999999999994,18.9);


(lib.shape84 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#626473").s().p("AiWDVIgChgIgFiuIgChCQAEgfAQgeQAPgfAdgVQAdgWAggGQAigEAfALQAdALAZAUQAXAUASAfIAFALQANAlAFBbIAFBpIAGCNQgbARgZALIgQAHQg4AVgwAAQhNAAg9g1gAiRDCIABgDIAAgHg");
	this.shape.setTransform(0.675,4.0269);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AilDqQgCiQgFh5IgEg2IABgCIAEgOQAIgdALgbQANgeAWgUQAYgXAegKQAdgLAdAEQAgACAgAOQAdAOAYAZQAVAYAOAdIAFALIAHAXIABAIQAFAZABAaIALEYIgPAMIgHiNIgEhpQgFhbgNglIgGgLQgRgfgXgUQgZgUgdgLQgggLghAEQggAGgdAWQgdAVgPAfQgQAegFAfIADBCIAFCuIACBgg");
	this.shape_1.setTransform(0.5,0.4063);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.1,-24.5,35.3,55.2);


(lib.shape82 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC33").s().p("AgUAXQgJgJAAgOQAAgMAJgKQAIgKAMABQAMgBAJAKQAJAKAAAMQAAAOgJAJQgJAKgMAAQgMAAgIgKg");
	this.shape.setTransform(13.55,0.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5A8E24").s().p("AiuA2IgaAAQACgiALgWQALgWAMgJIANgKQAVgLAYgBQAWACAUAJIACABQATALAMATICJgPIgGgKIAcAAIA8gHIAIAjQAHAcgFAjQhtADhkAAQhUAAhPgCgABrABIAAAAIAAgBg");
	this.shape_1.setTransform(0.3042,0.1386);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AjIBDIGRAAIAAANImRAEgAAnhCQgCgNAMgEQAXAIAiACQAhACAdgJQAcgIgFAcQgaAMgcAAIgRABQgoAAgpgTg");
	this.shape_2.setTransform(0.05,0.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AjUBfIAAgQIABgXQADgfALgaQALgdAZgQIAKgHIAXgHIAogDIAVAFIAHACIABAAIBSgMQAGgeAbAHIAtAGQAmABAggIQAfgIABAjQAAAKgDAHQAEAGAGAgQAGAhgGBIgAjJBVIGSgFIAAgNImRAAgAiVgpIgMAJQgMAJgLAWQgMAWgBAjIAaAAQCsAFDIgGQAFgkgHgcIgJgjIg7AHIgcAAIAFAKIiIAQQgNgUgSgKIgDgBQgTgKgXgCQgYABgVAMgAgvgxQAVARADALIAXgEQgOgWgPgFgAgPg2QAFACAXAaIAagDIgkgbgAALgbIAAAAgAARg5IAjAaIAigDIg6gagAAnhBQAxAWAxgFQAbABAbgMQAFgdgcAJQgdAIgigCQghgCgXgIQgNAEADAOgABtACIAAAAIABABg");
	this.shape_3.setTransform(0.0565,-0.0003);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D9D9D9").s().p("AhCgIIASgCQAPAFAPAVIgYADQgDgKgVgRgAgigMIATgDIAjAaIgZAEQgYgZgFgCgAgBgQIAKgCIA6AYIgiADg");
	this.shape_4.setTransform(1.975,-4.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.2,-9.4,42.599999999999994,18.9);


(lib.shape81 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000033").s().p("AAzAvIAAAAIABAAgAgzgvIABAAIAAABg");
	this.shape.setTransform(-0.975,-7.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgSCUIgMgTIgDgGIgaAOIgRhHQgLg1gCgvQgCg6AIg6IAMgOIADgDIABAAIAAAAIgBASIgCATIgCAjIAAAvIADArIAHA7QAFAgAIAaIAFgDIAggWQgPgngDgnQgEgngBgCIgKgsIAoA8IAUAfIAtgfIgmgzIABgLQADgTgIgfQARAeAAAaIgBgBIAAABIABAAIAAABIABABIAEAGIAFAHIADgUQABgWgGgXQgFgYgFgGIAAAAIABABIABABQATALAHAgQAHAggGAYIgEALIAQAUIAFAHIgTARIAeAwIgZAeIABADIABACIAAgBIAEAHIACAEIgsAxIgEgHIgfAdgAABBeIgOAOIgBABIgEADIAHAOIALASIAEgFIAXgYIgDgFQgNgcgLhDIgSgcQAHBAAMArgAAmBuIACgCIAIgHIAEgFIgBgBIgGgMIAAAAIgZg0IAAgBIgEADIABAEIACALIACAJIAAAAQAGAYALAdgAAvANIgMAIIABACIAMAaIAIARIABAAIAPgPIABAAIgYgogAAjhIg");
	this.shape_1.setTransform(0.6716,4.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E19562").s().p("AgLCWIgHgOIAEgDIABgBIAOgNQgMgsgHhBIASAeQALBDANAbIADAGIgXAXIgEAFgAg+BOIgHg8IgDgqIAAguIACgjIACgUIABgRIADgBIABgCIABgBIALgLQApgfAsA+IgBgCQAFAGAFAYQAGAYgBAVIgDAVIgFgHIgEgHIgBgBIAAgBQAAgagRgdQAIAegDATIgBAMIAmAxIgtAhIgUghIgog6IAKArQABACAEAnQADAoAPAnIggAVIgFAEQgIgagFghgAAVBRIAAABIgCgKIgCgLIgBgEIAEgCIAAABIAZAzIAAAAIAGAMIABABIgEAFIgIAHIgCACQgLgdgGgYgAA4BaIgIgQIgMgaIgBgDIAMgIIACgCIAYAoIgBABIgPAOg");
	this.shape_2.setTransform(0.675,1.7305);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.3,-15.1,18,36.1);


(lib.shape80 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E19562").s().p("Ag9DMIgEgCQgPgOgFgTIgEgZQgCgyACgyIABgSIACg2IALhoQAGgyAHgaIBXgEQAjADAXAOIABAAIAHABIgLAjIgHAWIgjB5QgKAkgFAlIgBAHIgGA0IgDApIgGAcQgHASgRAHQgJADgIAAQgOAAgNgJgABRjCIABgBIgBAAg");
	this.shape.setTransform(0.175,3.1606);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag6DWIgDgBQgOgJgJgOQgJgOgEgQQgEgTAAgYIABhOIAAgaIABgRQACg2AJhOQAJhOARgDIADgBIgDABIADAAQgHAagGAxIgKBpIgCA2IgBASQgCAyACAxIADAaQAGATAPANIADADQAVAOAYgJQAPgGAJgSIAFgdIAEgoIAFg0IACgIQAEgkAKgkIAjh5IAIgWIAKgjQAPALgPArIgBADIgQAwQgXBIgNBJIgBAHIgFAtIgEAyIgBAMQgDAYgQARQgRAQgWABg");
	this.shape_1.setTransform(-0.1775,4.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.3,-18.1,20.3,44.1);


(lib.shape79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5A8E24").s().p("Ah/CHQAThCAchBQAXg2AfgzQAQgaASgYQAggrAyASQAbAKAHAdQAHAZgFAaIgOBXIgoC1g");
	this.shape.setTransform(-0.4913,-2.276);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E19562").s().p("AgoAwQgegOgGgVQgFgUALgvIB4AYIAEABIASAFIAGACIABAAIAAAAIgBAAQgLA5gmANQgTAHgQAAQgSAAgQgHgABOgaIABAAIgBACg");
	this.shape_1.setTransform(-4.2667,21.3814);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DC8145").s().p("ABJAZIAAgDIAAABIAAACIAAABIgGgCIgSgFIgFgBIh4gWIAAABIAFgWICUAeIgEAVg");
	this.shape_2.setTransform(-3.7375,16.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgiD+QgtgCgagUQgbgVAGglIAIgxIAFgXIgKgDIgXgGQAph7Aag0IArhTQARgfAhgjQAigfAsANQAZAJASAWQALANABARQABAZgCAYIgMBOIgDAQIgiCsIgFAUIgZgFIgHAYQgNAwgTAVQgSATgoAAIgEAAgAhsDEQAGAVAeAOQAfAOAngOQAlgNALg6IABAAIg5gMIA4AMIAAAAIABAAIADgWIiTgfIgGAWIABAAQgLAuAFAVgAAOjMQgSAYgQAaQgfAygXA4QgcBAgTBCIDHAvIAoi0IAOhYQAFgagHgZQgHgegbgJQgPgGgNAAQgfAAgXAfgAAuCgIAAgCIABACgAhmCBIAAgBIBcAUgAhnCBIABgBIgBABg");
	this.shape_3.setTransform(-1.0719,3.0831);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.8,-22.3,29.5,50.8);


(lib.dghfdgfddfg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag7AyIACgGQAJAFAMAAQAUgBATgRQATgTADgSIgEgIQgLgOgGgOIAKgXIABAAQAJAWAIAIQALALAPAAIACAAIAAAXIgDAAQgNAAgGgFIAAAGQgBAGgCAIIgEAPQgMARgMALQgKAIgKABQgUAAgagQg");
	this.shape.setTransform(-87.95,-20.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("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LgGAMAAQAGAAAGACQAFADAFAFQADAFADAHQADAGAAAIQgBAQgJAKQgJAJgLAAQgNAAgKgJgAa/JVQAEAKAIAIQAKAHAIAAQAGAAADgEQAAgJgGgIQgHgIgKAAQgKAAgGAEgApPJoQgagRAAghQAAgZAMgUIAGADQgEAQAAAMQAAAbAYAOQAVAMAlAAQAfAAAhgIQAPgDAKgEIABgCQAAgGgEgNIgOgbQAIgMAHgJIABAAQAGANAFAOQAHARAAANQAAAJgEAIIgGAOQgNAIgeAGQggAIgZAAQgpAAgZgPgEAgrAJyQADgNAAgYIAAgSQgBgsgGhIQAJgKAKgJIAAAAQAFAyABBRIgBAfQgBAHgEAHIgLAQgAWXJyQABgNAAgYIAAgSQABgsgIhIIAUgTIABAAQAEAzAABQIgBAfQAAAHgEAHQgEAGgJAKgABJJyQACgMAAgZIAAgSQAAgsgFhIQAHgLALgIIABAAQAEAyAABRIgBAfQAAAHgDAHIgMAQgAXYJoQgJgKgBgUIABgNIAIAAQAAANAHAHQAHAIARAAQAKAAALgDQAJgDAKgGQADgCAAgCQAAgIgDgJQgFgJgIgKQgRgQgWgMQgFgDAAgEQAAgFAJgQIACAAIAWARQAMALAKALQASAXABAVQAAAQgIAQQgdASgYAAQgPAAgLgKgATiJvQgfAAgHgTIgBAAQgFAJgKAGQgLAEgMAAIgHAAQgQAAgLgIQgKgHgMgPIgQgUIgBAAQAAAXgOANQgSAOgkAAIgHAAQgMAAgHgCQgHgDgHgFQgHgIgDgMIgBggQAAgtgEhDIAQgRIADAAQACAbAAAnIAABFIAAALQABAPAOAEQAEADAHAAIAKAAQANAAALgDQANgDAIgFQAKgGgBgDQAAgFgDgIQgHgMgNgPIgbgeIgMgMIAAgKQgBgHAGgJQACgEAEgDQANgJAggMIBFgXIABABQgFALgKAMIgpAOQgoAPgSAJQALAHATAIIgHAJQAaAXAsAzQAHAJAIAFQAKAFALAAIAGAAQAMAAAKgFQAIgEADgIIAGgUIAMgJIABABQgDAPAAAHQAAAKAFAFQAKAIAOAAIAGAAQAbAAAKgEQALgEgBgEQABgGgHgNIgMgbQAGgMAHgJIACAAQAHANAFAOQAFARABANQgBAJgDAJQgCAIgIAIQgFAGgMADQgLACgVAAg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NAHAPAAQAcAAAagdQAQgRACgOQgNADgMAAQgRAAgMgIQgMgJABgRQgBgRAMgPQAOgQANAAQAIAAAIAGQAGAFAGAKQAGAKACANQAEANABAPQAAAbgPAWQgYAkgXAAQgbAAgbgTgATQtzQgIAGAAAFQAAAIAKAGQAKAGAMAAQALAAAKgDQgEgPgIgJQgJgJgMAAQgGAAgGAFgAvpsIQgRgSABgeQgBgXAKgXIAIACQgHASAAAPQABAZAQAPQAOAOAYAAQALAAAMgEQAPgEANgIIAQgKQAGgGAAgCQAAgEgIgDQgHgDgOgCQgagEgIgIQgGgHAAgJQgBgbAWgVQAJgLANgHQAOgJAJAAQAJAAAGAKQADAKAAAIQABAFgJAPIgBABQgEgMgEgGQgCgFgFAAQgGAAgIADIgQAKQgIAGgEAGQgGAHAAAFQAAAJAbAGIATAEQALACAFAEQADAEACAEQADAFAAAIQAAAHgFALQgFAKgGAGQgNANgUAJQgVAJgSAAQgeAAgRgUgAUtsnQACgNABgYIAAgSQgBgsgFhIQAHgLALgJIABABQAEAyABBRIgCAfQAAAHgDAHIgMAPgAQlsnQADgNAAgYIAAgSQAAgsgGhIQAHgLALgJIACABQAEAyAABRQAAAUgCALQAAAHgDAHIgNAPgAMastQgPgHgLgMIgBAAQgDAKgJAGQgLAGgOAAIgHAAQgNAAgKgEQgKgFgFgKIgBAAQgEAJgLAFQgJAFgNAAIgIAAQgPAAgHgFQgLgGgEgPQgUAIgRAAQgPAAgKgFQgKgGAAgKQAAgJAHgNQAKgZAxgaIgCgOIAQgQIABAAIABBXQAAAKACAGQACAHAEADQAFAFAOAAIAIAAQANAAAIgEQAJgFADgHIAFgUIAOgKIABACQgFAPAAAGQABALAFAFQAKAHAOAAIAJAAQANAAAIgHQAFgGAFgOQAEgRALgJQAJgJALAAQAGAAAFACQAGADAEAHIAHAMIALAXQAFAHAHAEQAHAEALAAIAGAAQAUAAANgFQgDgLAAgPQAAgRAMgRQAJgMAJgFIACgSIACAAQAKAKAWAPIAiAYQAMAKAGAJQAEAJAAAMQABAPgKAKQgKAKgSAAQgLAAgRgDQgRgEgSgGQgeANgVAAIgHAAQgTAAgLgQQgCAJgDAFQgHAGgHAAQgLAAgPgHgAMOtmQgFAEgE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");
	this.shape_1.setTransform(-71.05,-31.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,51,102,0.8)").s().p("Ax0EjQh7AAhXhVQhYhVAAh3IAAgDQAAh3BYhVQBXhVB7AAMAjpAAAQB6AABYBVQBYBVAAB3IAAADQAAB3hYBVQhYBVh6AAg");
	this.shape_2.setTransform(-56.0934,-67.2422,2.4753,6.0384);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-412.3,-242.6,712.4000000000001,350.8);


(lib.dghbadfbgadfg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217.2,-46.5,434.5,93);


(lib.dgdrgdgdg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.dahliatubers1();
	this.instance.setTransform(-286,-240);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-286,-240,572,480);


(lib.DFbFbfbvf = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.8,-14.5,327.70000000000005,29.1);


(lib.dfbdfbfdbfd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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AOgBIARAAQAZAAAMgDQAIgCAGgEQAFgEAAgEIAAgDIgTABQgfAAgJgSQgDgGAAgGQAAgKAEgIQADgJAGgGQALgMAKAAQALAAAHAJQAJAJAGAPQAHATAAAVQgBARgHAKQgIAIgPAEQgPAEgWABIgRAAQgLAAgHgGIAAAAIAAAGIgBANQgCAHgEAFQgIASgMAIQgJAIgKgBQgRAAgagMgAPJjWQgEAEAAAGQAAAKANADQAMAFAXgBQgDgMgIgKQgIgKgKAAQgIAAgHAFgAGAhaQgNgOAAgYQAAgTAJgUIAEACQgEAPAAAMQAAATANALQAMALAPAAQASAAAQgJQAJgGADgGQAFgFAAgFQAAgFgEgLQgCgHgHgIQgDgFgIgJIAFgVIACAAIAMALQAGADAIAAQAHABAFgFQADgDAEgGIAHgOIACAAIAEAaQAFAYAKAGIAGAEIAGAAIAGAAQAYABAJgDQAJgDAAgFQAAgGgFgLIgLgZQAGgKAGgIIABAAQAHAMAFANQAEAPAAALQABAJgDAIIgJAOQgFAGgLACQgJACgUABIgFAAQgOgBgIgIQgHgJgFgVIgFgRIgBAAQgIASgQgBQAFANAAATQAAAPgFAMQgFAKgNAIQgSALgTAAQgWABgOgQgA63haQgNgOAAgYQAAgTAJgUIAGACQgFAPAAAMQAAATAMALQAMALARAAQARAAAPgJQAKgGAEgGQAEgFAAgFQAAgFgEgLQgCgHgGgIIgNgOIAHgVIAAAAIAOALQAEADAJAAQAHABAEgFQAEgDADgGIAIgOIABAAIAFAaQAFAYAJAGIAHAEIAHAAIAEAAQAZABAJgDQAKgDAAgFQAAgGgFgLIgNgZQAHgKAHgIIAAAAQAHAMAEANQAGAPAAALQgBAJgDAIQgCAHgHAHQgFAGgJACQgKACgVABIgEAAQgOgBgJgIQgGgJgGgVIgFgRIgBAAQgHASgPgBQAEANAAATQAAAPgEAMQgHAKgLAIQgSALgTAAQgYABgOgQgAC2haIACgFQAJADAKgBQARAAARgNQARgMAIgUIABgHIAAgEIgDgFQgIgUgMgRIANgUIABAAIAMAWIAGAOQACAIAAAKIAAATQAAAUgVAaQgPAQgMAAQgTAAgZgOgABPhaIADgFQAJADAKgBQAQAAARgNQARgMAIgUIABgHIgBgEIAAgFQgJgUg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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-200.2,-30.7,400.4,61.5);


(lib.dadfgadfgadfgfg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap67();
	this.instance.setTransform(-250,-187.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-250,-187.5,500,375);


(lib.cnxgnxfgcnxgfngn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-224.7,-112.5,449.5,225.1);


(lib.bg1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img._16024105, null, new cjs.Matrix2D(0.216,0,0,0.252,-129.3,-127.7)).s().p("AtyT+MAAAgn7IblAAMAAAAn7g");
	this.shape.setTransform(-41.55,7.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129.9,-120,176.7,255.6);


(lib.adfgadgadrg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap69();
	this.instance.setTransform(-314,-234,1,0.6989);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-314,-234,650,311.7);


(lib.adfbfd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(-6.45,0.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-127.8,-15,242.7,31.3);


(lib.adfbdfbdfbdsf = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AngGWIARgVQAMAIANAOQgIALgJAIIgZgUgA1nGWIARgVQAMAIANAOQgIALgKAIIgYgUgAZDGSIADgGQAOAHAQAAQAdAAAcgcIANgPQAFgHABgHIgKAAQgfAAgQgKQgPgLAAgVQAAgSAKgPQAGgJAIgFQAIgFAJAAQAPAAAMASQANATAEAfIAXAAQAOAAAIgFQAKgFACgIIAFgYIAOgLIABACQgDAMAAAHQAAAJACAFQACAFAHAEQALgRAIgJQALgPAMgLQALgKAKgFQAMgGANAAQAVAAANAOQAMANAAASQAAAQgKAVIAsAAQAfAAAOgFQAKgCAHgFQAHgFAAgEIAAgFIgYABQgnAAgJgWQgEgIAAgHQAAgLAEgLQAEgKAIgIQANgOANAAQAMAAALALQAJALAHASQAJAXAAAaQAAAVgLAMQgJAKgSAFQgRAFgcAAIgWAAQgfAAgegHIgVAFQgNACgOAAQgqAAgQgWIgBAAQgHAMgNAGQgKAEgMAAIgUAAQAAAJgEAMQgFALgGAKQgLAQgPAKQgOAJgJAAQgaAAghgVgAc/EWQgQANgSAYQANAFAYAAQAPAAAQgDQAOgDAJgEQARgGAAgJQgCgNgMgIQgLgJgOAAQgRAAgSANgAawFAQgEgSgLgMQgKgMgMAAQgIAAgIAHQgHAFAAAHQAAANAXAGQAHADAKAAIAUABIAAAAgAf7EPQgDgQgJgMQgLgMgLAAQgKAAgIAGQgHAGAAAGQAAAMARAFQAPAFAbAAIAAAAgAi0GSIADgGQAOAHAQAAQAdAAAcgcIAMgPQAFgHACgHIgKAAQgfAAgQgKQgQgLAAgVQAAgSAKgPQAHgJAIgFQAIgFAJAAQAPAAAMASQANATAEAfIAWAAQAVAAAPgGQgEgMAAgQQAAgUAMgSQAKgNAKgFQABgLACgKIACAAQAMALAXARIAlAbQAOAKAFAKQAGAKAAAOQAAAQgJALQgLALgUAAQgNAAgSgEQgSgEgVgGQgRAHgMADQgOAEgMAAIgWAAQAAAJgFAMQgEALgGAKQgLAQgPAKQgOAJgKAAQgZAAghgVgAA6E9QARAGAVAAQAJAAAGgDQAHgCAAgEQAAgKgNgLQgKgKgVgNQgCAYgOAXgAhIFAQgDgSgLgMQgKgMgMAAQgIAAgIAHQgHAFAAAHQAAANAXAGQAHADAKAAIATABIAAAAgAAQEJQgLALAAAJQAAAFAGAGQAGAHALAFQAMgEAHgFQANgHAAgHQAAgNgHgKQgHgJgHAAQgLAAgMAMgAyyGQQgRgSAAgbQAAgSAFgQQAEgMAIgNIAIAEQgFAJgDALQgEALAAAHQAAAYAOAMQAHAGAKAEQALADALAAQAMAAAOgFQAOgFAKgHIAKgLQAFgFAAgGQAAgGgCgHQgCgIgEgMQgJgVgHgNQAIgOAGgHIABAAQALAUAGATQAEAMAJAFQAIAEAQAAIAQAAQAOAAAQgFIAAgBQgYgPAAgZQAAgMAJgOQAHgNALgHQALgIANAAQAOAAAMAJQAMAIAHAQIgDAFQgJgIgIgCQgJgEgLAAQgPAAgMAGQgKAGAAAFQAAAQARAOIANAHQAIAEAEAAQALAAAPgEIAhgLIABABIgLAaIgnALIgiAKIgZAHQgOAEgLAAIgKAAQgTAAgLgJIAAAAQgBAPgEANQgEANgEAGQgLAOgUAJQgVAKgSAAQgcAAgRgRgAU+GLQgPgSAAgcQAAgQAFgPQADgPAIgLIAHAEQgKAWAAAQQAAAYAQAPQAOANAUAAQASAAASgMQAQgMAGgPQgDgkgTgdQAFgKAKgMIACAAQANAXAEAcIASgbQAMgOAMgLQALgKAMgGQANgGANAAQAOAAAKAGQAJAGAFAKQAFAKAAAOQAAAJgEALQgJAaghALQgTAGggAAQgMAAgXgFQgDATgFANQgIASgTALQgTAMgVAAQgdAAgQgTgAXiEVQgTAPgRAXQANAFAaAAQANAAAPgEQAOgDALgFIAMgHQAFgEAAgEQgDgNgJgJQgKgJgOAAQgRAAgUAPgAEFGLQgPgSAAgcQAAgQAEgPQAEgPAHgLIAJAEQgKAWAAAQQAAAYAOAPQAOANAWAAQARAAARgMQAQgMAHgPQgDgkgTgdQAFgKAKgMIABAAQAOAXADAcQALgQAIgKQAMgPAMgKQALgLAKgFQAMgGANAAQAVAAANAOQAMANAAASQAAAQgKAVIAsAAQAfAAAOgFQAJgCAHgFQAHgFAAgEIAAgFIgXABQgnAAgKgWQgDgHAAgIQAAgLAEgLQAEgLAIgHQANgOANAAQAMAAAKALQAKALAHASQAIAXAAAaQAAAVgKAMQgJAKgSAFQgSAFgcAAIgYAAQgcAAgfgHQgLADgJACQgNACgOAAQgQAAgKg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");
	this.shape.setTransform(-0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-211.2,-42.6,422.4,85.30000000000001);


(lib.xvbFVDFvVDSXVDV = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.DFbFbfbvf("synched",0);
	this.instance.setTransform(17.95,-137.3,1.21,1.21,0,0,0,0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3));

	// Layer_2
	this.instance_1 = new lib.cnxgnxfgcnxgfngn("synched",0);
	this.instance_1.setTransform(0,39.35);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).wait(2));

	// Layer_3
	this.instance_2 = new lib.Bitmap80();
	this.instance_2.setTransform(-220,168);

	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Bitmap81, null, new cjs.Matrix2D(1,0,0,1,-177.5,-286.8)).s().p("EgbuAhUMAAAhCnMA3dAAAMAAABCng");
	this.shape.setTransform(-2.5,373.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-224.7,-154.8,454.7,741.8);


(lib.vhhghghh = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.gchvchkfc("synched",0);
	this.instance.setTransform(-55.65,183.1,1.2882,1.2843,0,0,0,-0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.Bitmap72();
	this.instance_1.setTransform(-185,86);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-186.9,84.1,262.8,197.79999999999998);


(lib.txt122 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.sfbfgbfbfbfsh("synched",0);
	this.instance.setTransform(3.7,-0.65);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,51,102,0.8)").s().p("AiBAiQgOAAgKgKQgKgKAAgOIAAAAQAAgNAKgKQAKgKAOAAIEDAAQAOAAAKAKQAKAKAAANIAAAAQAAAOgKAKQgKAKgOAAg");
	this.shape.setTransform(5.7436,-0.9262,0.5484,0.8796);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.2,-3.9,18,6);


(lib.txt1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.txtjhvjs("synched",0);
	this.instance.setTransform(5.9,-3.5,0.042,0.042,0,0,0,1.2,-1.2);

	this.instance_1 = new lib.txt32("synched",0);
	this.instance_1.setTransform(-3.6,-0.6,0.0702,0.0702,0,0,0,0.7,-1.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,51,102,0.8)").s().p("AiBAiQgOAAgKgKQgKgKAAgOIAAAAQAAgNAKgKQAKgKAOAAIEDAAQAOAAAKAKQAKAKAAANIAAAAQAAAOgKAKQgKAKgOAAg");
	this.shape.setTransform(5.7405,-0.9392,0.8226,1.3195);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-5.4,27,9);


(lib.sdhsdfdfsh = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.sfghadhadfhadfh("synched",0);
	this.instance.setTransform(14.45,-69.45,1.1,1.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(288));

	// Layer_2
	this.instance_1 = new lib.Bitmap78();
	this.instance_1.setTransform(-284,57,1.6719,1.6821);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(288));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-284,-87.4,585.2,586.8);


(lib.sdcvefcerferfer = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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BALgCAJQgCAJgGAJQAKAEAQAAIALAAQALAAAJgEQAKgDAFgJIAJgNIANgEIAAABIgIANQgCAHAAADQAAAFACABQACADAEAAQAIAAAHgFQADgDADgFIAGgSIAKgHIABABQgCAJAAAHQAAAJAFAGQAFAFAHAAQAFAAABgCQADgCAAgEQAAgIgEgTIAOgPIACABQADARAAAMQAAAGgDAGQAAAGgDAGQgGAIgGAEQgGAGgIAAQgFAAgFgEQgFgDgFgHIgBAAQgNAPgRAAQgOAAgCgPIgBAAQgLAPgYAAIgIAAQgNAAgMgDQgOgDgQgFQgdALgTAAIgGAAQgZAAgHgSIgBAAQgEAHgIAFQgJAGgMAAIgHAAQgIAAgGgCIgBAAQADAFACAHQACAFAAAFIgCALQgBAGgCADQgEAHgHAFQgHAEgIAAIgLgBgAACDrIAEALQADAHAEAFQAHAHAJAFQAJAEAIAAQAFAAACgBQACgDABgEQAAgLgIgJQgJgNgSAAQgJAAgKACgAAEDWQATAAAIgDQALgCAAgGQAAgHgGgMIgPgVIgBAAQgJAagHAZgADFCkQgIAIgDALQAEAQATAFQAJgCAJgGQAJgGAAgGQgBgHgEgIQgEgHgDgEQgFgEgEAAQgJAAgJAKgAKaETQgMgOAAgXQAAgNAEgNQADgLAGgJIAGACQgIASAAAOQAAAUAMALQAMALAQAAQAPAAAOgKQAOgKAFgLQgCgegQgYQAEgIAIgKIACAAQALASACAYIAPgXQALgLAJgJQAKgIAIgFQAMgFAKAAQALAAAJAFQAHAFAEAJQAEAHAAAMQAAAHgDAJQgHAVgcAJQgPAGgaAAQgKAAgTgFQgDAQgDAKQgHAPgQAKQgPAJgRAAQgXAAgOgQgAMgCzQgPAMgOATQALAEAVAAQALAAAMgDQALgCAJgFQAHgDADgCQAEgEgBgDQgBgKgIgIQgHgIgMAAQgPAAgQANgAHHEMIADgFQALAFANAAQANAAAMgGQANgHALgMQAOgQACgMQgLADgMAAQgOAAgLgIQgLgIAAgQQAAgPALgOQANgNALAAQAHAAAHAEQAGAGAFAJQAGAJACALQADAMAAAOQAAAYgNAUQgVAfgWAAQgYAAgYgQgAH5CqQgGAEgBAGQAAAHAJAFQAKAFAKAAQAKAAAJgCQgDgNgIgIQgHgJgLAAQgFA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");
	this.shape.setTransform(4.7,78.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AiRBwIADgGQAMAHAPAAQAbAAAZgaIALgNQAFgGABgHIgJAAQgdAAgOgJQgOgKAAgTQAAgRAJgMQAGgIAHgFQAIgFAIAAQANAAALARQAMARAEAbIAXAAQAMAAAJgEQAKgEAHgJIAJgOIAPgFIAAABIgIAPQgEAHAAAEQAAAEADADQADACAEAAQAJAAAIgFIAGgHQAEgFACgFIAEgLIAOgFIABABIgGAPQgCAHAAAFQAAAEADADQADADAFAAQAGAAAHgEQAEgCACgFQADgEABgHIAEgOIAOgJIABABQgFAPAAAJQAAALAJAFQAIAEAOAAIAIAAQALAAAKgFQAKgFAAgPQgBgmgFg5IgBgNIgBgLQAAgGAGgGIAKgKIACABQgBARAQAZIgMAKIABAgIABAgQAAAfgHAPQgDAIgEAFQgEAGgGADQgLAFgMAAIgIAAQgQAAgKgFQgIgEgEgIIgBAAQgPARgRAAQgRAAgDgPIgBAAQgOAPgSAAQgQAAgCgQIgBAAQgNAQgZAAIgTAAQgBAJgDAKQgEALgGAIQgKAPgOAJQgMAIgJAAQgXAAgegTgAheAFQgGAGAAAFQAAANAUAGQAHACAJAAIARAAQgDgQgKgLQgJgKgKAAQgIAAgHAFgAlkBpQgNgPAAgaQAAgOAEgOQADgOAHgKIAHAEQgJAUAAAOQAAAWAOAMQAMALAUAAQARAAARgLQARgLAEgOQgBgOgFgMIgNgZQAFgJAHgKIABAAQAGALAGAQIAEALQAEAGAHAAQAGAAAHgEQAIgFACgKIAFgRIALgGIABABQgCAIAAAJQAAALAGAFQAGAFAIAAQAEAAADgCQADgCAAgEQAAgMgGgSQAKgMAGgFIABAAQAEAVAAANQAAAKgGAOQgEAJgGAGQgIAGgIAAQgHAAgGgEQgHgEgFgHQgNASgTAAIgFAAQgBAQgFAMQgHAQgSAKQgSAKgUAAQgaAAgPgQgAEIBAQACgNAAgYIAAgSQAAgrgHhIQAIgKAKgJIACAAQAFAyAABQIgBAfQgBAHgEAHQgDAGgJAKgAoABAQgHAAgEgEQgFgFAAgHQAAgHAFgFQAEgFAHAAQAHAAAFAFQAEAFAAAHQAAAHgEAFQgFAEgGAAgAG5A9QgLAAgHgCQgIgDgFgFQgIgIgCgNQgCgIAAgWQAAgrgFhFIASgSIABABQACAbABAnIAABEIAAAKQAAAPAOAFQAGACAGAAIAHAAQAVAAAKghQADgJALgMQALgLAMAAQAQAAALAUQAKAQACAbQgFAYgPAAQgZAAgegWIgBAAQgHAYgZAAgAHxgCQgHAEgEAJQAIALATAIQAMAFAKAAQAFAAABgCQgEgUgIgKQgIgJgKAAQgIAAgGAEgAoJACQAGgFACgEQADgFAAgGQAAgIgMgKIgSgOQgIgGgDgGQgDgFAAgIQAAgRAOgNQAOgOASAAQAEAAAIADQAIADAGAFIAFAFIABAFQAAAFgEAFQgFAEgDAAIgLgIQgLgIgLAAQgHAAgFADQgEAEAAAHQAAAGAKAJIASANQANAKAGAHQAFAHAAAIQAAALgMALQgJAIgLAEg");
	this.shape_1.setTransform(155.1,-90.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(2));

	// Layer_2
	this.instance = new lib.jjgchkkcghcgh("synched",0);
	this.instance.setTransform(4.95,401.45,1.2,1.2);

	this.instance_1 = new lib.ljgcljghckhgckhckhg("synched",0);
	this.instance_1.setTransform(3,399);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-205,-103.6,420,662.9);


(lib.sprite297 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape296("synched",0);
	this.instance.setTransform(0,203);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite297, new cjs.Rectangle(-450,-440.6,900,1043.6), null);


(lib.ani5555555 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_6
	this.instance = new lib.Bitmap74();
	this.instance.setTransform(-84,-102,0.343,0.343);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(817).to({_off:false},0).wait(167).to({_off:true},1).wait(93));

	// Layer_5
	this.instance_1 = new lib.jhgvljgkhgcgkhc("synched",0);
	this.instance_1.setTransform(57,4);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(469).to({_off:false},0).wait(166).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(47).to({startPosition:0},0).to({_off:true},1).wait(393));

	// Layer_4
	this.instance_2 = new lib.ugchgchghkgc("synched",0);
	this.instance_2.setTransform(57,3.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(240).to({_off:false},0).to({_off:true},229).wait(609));

	// Layer_2
	this.instance_3 = new lib.adfgadgadrg("synched",0);
	this.instance_3.setTransform(49.2,26.15,0.4229,0.576,0,0,0,0.2,0.1);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(31).to({_off:false},0).to({_off:true},209).wait(838));

	// Layer_1
	this.instance_4 = new lib.jhjhjhgjh("synched",0);
	this.instance_4.setTransform(96.3,-210.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(635).to({startPosition:0},0).to({_off:true},1).wait(1).to({_off:false},0).wait(47).to({startPosition:0},0).to({_off:true},1).wait(10).to({_off:false},0).wait(289).to({startPosition:0},0).to({_off:true},1).wait(93));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-168,-217.3,450,345.3);


(lib.lmxbmlBlXCbvXCB = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.dghbadfbgadfg("synched",0);
	this.instance.setTransform(48.5,-0.15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2));

	// Layer_2
	this.instance_1 = new lib.zfbnzbdfbdfb("synched",0);
	this.instance_1.setTransform(49.25,201.15);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-168.7,-46.7,434.5,266.9);


(lib.khbjhbkccccccopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.ljdfnvjkadnbklajdbdabfb("synched",0);
	this.instance.setTransform(263.3,-234.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,51,102,0.8)").s().p("AiBAiQgOAAgKgKQgKgKAAgOIAAAAQAAgNAKgKQAKgKAOAAIEDAAQAOAAAKAKQAKAKAAANIAAAAQAAAOgKAKQgKAKgOAAg");
	this.shape.setTransform(238.2209,-237.6415,12.2846,10.8436);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.8,-274.8,402.9,74.30000000000001);


(lib.jhvjhvjj = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EAj2AUyQhshQAAiUQAAiABkhoQBchgCQggIAAgEQhAgYgwgIQgsgIg0AAQg8AAgkAkIAQBAIgUA4IgIAEIgsh4QAEg8AsgkQAsgkBEAAQBUAACgBAQA8AYBEAAIBEAAIgwBMQggAEhIAQQg8AQggAMQiAAwhIBAQhMBAAABIQAABwBsBEQBoBACgAAQBYAABogQIAAAIQhMBAgsAYQhEAMhIAAQicAAhghIgEBJSATWQgsgUgggcQhQhUAAh0QAAhAAQg8QAQg0AYg8IAgAMQgUAsgEAkQgMAoAAAkQAABUAsBAQBEBUBkAAQB4AABgg4QBIgsAYgcQAAgUhMgUQhEgQhcgIIgEgEIAohUQB8gQBMgwQA0gkAMgkQAMgkAAhoQAAhAgEhcQAAgUgIiUQAkgsAcgYIAIAEQAIC8AAEkQAABoAsA8QAkAgA0AAIA4AAQA0AAA8gQIAAgEQhYg4AAhYQAAgsAgg4QAcgsAkgcQAsgcAsAAQA0AAAsAgQAoAgAgA8IgQAMQgggYgcgMQgggIgoAAQg4AAgsAUQgkAUAAAUQAAA4BAA0QAUAQAcAMQAYAMAQAAQAoAAA4gQQAggIBUggIAEAEIgoBcQhAAYhMAUQhYAYgkAMIhcAcQgwAMgoAAIgkAAQhcAAgwhAQgog0gEhcQgMAwggAgQgcAcgoAcQAkAMAUAYQAMAUAAAoQAAAsgcA4QhUBUhcAkQhMAghUAAQg0AAgwgUgEhMNATOQgcgIgYgQQgsgggcg0Qgcg0AAg4IAAgkQgcAEggAAIgUAAQgwAAgcgMQgggIgUgYQgggggIgwQgIggAAhgQAAisgUkUQAwgwAYgUIAEAEQAIBsAECYIAAEUIAAAsQAAA8A4AUQAYAIAYAAIBcAAQAUhYAUhIQAghsA4hQIAEgEIAcAsQAwBEAUAsQAcA4AAAoQAAA4gMAsICgAAQAwAAAkgQQAkgUAIgcIAYhQIA0goIAEAIQgQA8AAAYQAAAsAYAUQAkAcA4AAIA8AAQA0AAA4gQIAAgEQhUg4AAhYQAAgsAgg4QAYgsAogcQAogcAwAAQA0AAAsAgQAoAgAcA8IgMAMQgggYgcgMQgggIgoAAQg4AAgsAUQgkAUAAAUQAAA4BAA0QAUAQAYAMQAcAMAQAAQAoAAA4gQQAggIBUggIAEAEIgoBcQhAAYhMAUQhYAYgkAMIhcAcQgwAMgoAAIgoAAQg8AAgkgQQgogUgUgoQgUAkgoAUQgoAUgwAAIgkAAQgkAAgYgIIgEAAQAQAYAIAcQAEAcAAAUQAAAYgEAYQgIAYgMAUQgQAcgcAUQggAUggAAQgcAAgcgEgEhN5APSQAAAcAQAcQAMAcAUAUQAcAkAoAUQAkAUAkAAQAUAAAMgMQAMgIAAgQQAAgwgcgsQgsg4hMAAQgoAAgsAEgEhNxAN2QBMAAAogMQAwgMAAgYQAAgggcg0QgQgggwhAIgEAAQgoB4gcBsgADyRyIAIgYQAoAMAsAAQBMAABMg8QBIg4AkhUQAIgQAAgQQAAgIgEgMQAAgEgIgQQgkhYg0hMQAcg0AYgoIAEAAIA4BkQAQAkAIAYQAMAkAAAsIAABUQAABchcBwQhEBEg4AAQhQAAhwg4gEgxNARyIAIgYQAoAMAsAAQBMAABMg8QBIg4AkhUQAIgQAAgQQAAgMgMgcQgohcgwhIQAcg0AYgoIAEAAIA4BkQAQAgAIAcQAMAkAAAsIAABUQAABchcBwQhEBEg4AAQhQAAhwg4gEg4VARyIAMgYQAoAMAoAAQBMAABMg8QBIg4AkhUQAIgQAAgQIAAgUQgEgEgEgQQgohYg0hMQAgg4AYgkIAEAAIA0BkQAUAkAIAYQAIAkAAAsIAABUQAABchcBwQhABEg8AAQhMAAh0g4gAZyPiQAIgwAAhkIAAhIQAAisgYkkQAggsAogkIAIAEQAQDIAAFEQAABMgEAsQAAAggQAcQgQAYggAkgAudPiQAIg0AAhgIAAhIQAAiwgckgQAggsAogkIAIAEQAUDEAAFIQAABMgEAsQgEAggQAcQgMAYgkAkgEg5VAPiQAIg0AAhgIAAhIQAAiwgckgQAkgsAogkIAEAEQAUDMAAFAQAABMgEAsQgEAggQAcQgMAYgkAkgEhXJAPiQgYAAgUgUQgUgQAAggQAAgcAUgQQAUgUAYAAQAcAAAUAUQAQAQAAAcQAAAggQAQQgUAUgYAAgEgj5APWIAgg4QAYgYAQgEIAAgEQhQgcAAg8QAAggAQgcQAMgYAUgUQAcgYAkgQQAkgQAcAAQAgAAAUAQQAYAQAAAcQAAAkgkAgIgEAAQgIgYgQgQQgMgUgYAAQgQAAgUAIQgQAEgMAIQgYAQAAAMQAAAcAcAQQAUAQAYAIQAcAIAYAAQA8AABEgMIAAAEIgkBMQicAQhwBEgEA5aAOWQg4BAhoAAIggAAQh8AAh0gYQiAAYkEAAIhcAAQigAAAAh8IAAgoIAcgUIAEAAQAEBYCAAAIBYAAIA4hEQAIgcAEggIAAhYQAAhEgIhsQgEhcgIhIQgEgsAAgcQAAgYAQgYQAMgQAggYIAEAEQAABABABkIgwAoQAECYAABYQAABYgYA8IAEAAQBYhgBEgoQAggUAkgIQAkgMAkAAQBIAAA0A0QA0A0AABQQAAAYgMAgQgIAUgQAgQAUAEA4AAIA0AAQA4AAAkgQQAogQAYgkIAsg8IA4gUIAEAEQgcAogIAYQgQAcAAAQQAAAQAMAMQAIAIAUAAQAkAAAcgUQAUgQAIgYIAchQIAsgYIAEAAQgMAoAAAkQAAAkAcAYQAUAYAgAAQAQAAAMgIQAMgIAAgQQAAgogUhUQAggkAkgcIAEAAQAMBMAAA4QAAAYgIAgQgIAYgMAYQgYAkgYAUQggAYgcAAQgYAAgYgQQgcgQgUgcIgEAAQg8BAhIAAQhAAAgIhAgEAwCALmQg8AshgBkIBEAAQCkAABcgMQBsgUAYgkQAAgwgwgoQgwgog8AAQhEAAhMA0gAT2PWQg4AAgkgcQgogcgUhAIgEAAQgIAsgsAYQhUA0hEAAQg8AAgkgkQgggkAAhEIAAg0IAggEQAEBkBkAAQAcAAAggMQAggIAcgQQAUgMAQgQQAMgQAAgMQAAgkgQhMQgMgwggh0QAIgQAQgYIAcgoIAEAEQAkCEAkDIQAIA0AkAgQAcAcAsAAIAcAAQAwAAAkgUQAogYAAg4QAAikgUjgQgEggAAgQQgEgcAAgQQAAgYAUgYIAsgsIAEAEQAABEA8BoQgUAUgcAQQAEAUAEBwQAEBQAAAwQAAB8ggBAQgMAggMAQQgUAYgYAMQgsAYgwAAgAAePWQg7AAgkgUQgogYgUg8QhIAghMAAQg8AAgkgUQgkgYAAgsQAAggAYg0QAshkDAhsIgEg0QAggoAcgYIAIAAQAAB0AEDoQAAAoAEAYQAIAcAQAMQAYAUAzAAIAgAAQBsAAAogQQAogMAAgUQAAgYgUg0QgQgkgkhIQAcgwAcgkIAEAAQAcA4AUA0QAYBEAAA0QAAAogQAkQgMAggYAgQgYAYgsAIQgsAMhYAAgAlVMKQAAAUAcAMQAcAIAoAAQAsAABAgUIgEi4QjIBoAAA8gA1JPWQg4AAgogQQgogUgQgoIgEAAQgUAkgoAUQgoAUgwAAIgYAAQgsAAgcgMQgggIgYgYQgcgggMgwQgEggAAhgQAAiogUkYQAwgwAYgUIAEAEQAIBsAACYQAEBcAAC4IAAAsQAAA8A4AUQAYAIAYAAIAYAAQAwAAAkgQQAkgUAIgcIAYhQIA0goIAEAIQgQA8AAAYQAAAsAYAUQAkAcA4AAIAYAAQBsAAAogQQAsgMAAgUQAAgYgYg0QgQgkgkhIQAcgwAcgkIAEAAQAgA4AQA0QAcBEAAA0QAAAogQAkQgMAcgYAkQgcAYgsAIQgsAMhYAAgEhXtALmQAYgUAMgUQAMgUAAgYQAAgggwgoQg4gogUgMQgcgYgQgYQgMgYAAgcQAAhEA4g4QA4g0BIAAQAUAAAcAIQAkAMAYAUQAMAMAEAIQAIAMAAAMQAAAUgUAQQgQAQgQAAIgsggQgsgggsAAQgcAAgQAQQgQAQAAAYQAAAcAkAkIBIA0QA4AoAUAcQAUAcAAAcQAAAwgsAsQgoAkgoAQgEhINAIOQAcgkAggkQAoAgAsAwQggAwgYAYIhYhQgEhF9AIGQAcgkAggkQAoAgAsAwQggAsgYAYQgwgsgogggA4xICQAkgwAYgcQAsAgAsAwQgYAogkAgQgUgUhEg4gA1JGuQAcgoAcggQAoAgAsAwQgcAwgcAUQgogogsgkgAy9GmQAcgoAgggQAoAgAsAwQgcAsgcAYQgsgsgsgggEguRAGeQAkgsAYggQAsAkAwAsQgcAsgkAgQgUgUhEg8gACSG+QgcgYgQgMQAkg0AYgYQAsAgAsAwQgYAogkAgQgUgUgYgUgAk5ESQAYgkAggkQAoAgAwAwQgkAwgYAUQgsgsgogggA0hEOQAYgkAgggQAoAgAwAwQggAsgcAYQgsgsgogkgAipEKQAcgoAcggQAoAgAsAwQgcAsgcAYQgogogsgkgEg+dgChQAggoAcggQAoAcAsA0QggAsgYAYQgsgsgsgggEg8NgCtQAcgkAgggQAoAcAsAwQggAwgYAYQgogogwgogAxFlxQAcgoAcggQAoAcAsA0QggAwgYAUQgogogsgkgA7llxQAcgoAcggQAoAcAwA0QgkAwgUAUQgsgogsgkgAeql1QAggsAcggQAsAgAsAwQgYAsgkAcIhYhMgAu5l9QAcgkAgggQAoAcAsA0QggAsgYAYQgogogwgogA5Vl9QAcgkAcggQAoAcAwA0QggAsgcAYQgogogsgogEg/xgGBQhAhIAAiIQAAg4AUhEQAUhEAgg0IAcAMQgwBwAABMQAAAsAQAsQAQAsAcAcQAkAkAsAQQAwAUA0AAQBsAACEhAQA4gkAIgQQgMgcg4gUQhAgUhUAAIgEgMIA0hUIEYAAQAsAAAkgQQAogUAIgcIAUhQIA0goIAEAIQgQA8AAAYQAAAsAYAUQAkAcA4AAIAcAAQAwAAAkgUQAogYAAg4QAAikgUjgQgEggAAgQQgEgcAAgQQAAgYAUgYQAQgUAcgYIAEAEQAABEA8BoQgUAUgcAQQAEAUAEBwQAEBQAAAwQAAB8ggBAQgMAggMAQQgUAYgYAMQgsAYgwAAIgcAAQg4AAgogQQgogUgQgoIgEAAQgUAkgoAUQgoAUgwAAIg4AAIAAA0QAAAQgMAkQgMAcgIAMQhEBAhkAoQhgAkhUAAQiEAAhIhQgEhhxgGBIAMgYQAwAcA8AAQBsAABkhoIAsg0QAUgcAEgYIgkAAQhwAAg8gkQg4goAAhMQAAhEAog0QAUggAcgUQAggUAgAAQA0AAAwBEQAsBEAQBwIBgAAQA0AAAsgIQA0gMAggYQAkgYAAgMQAAgQgMgkQgYgsg0hAQgogwhEhEIgwg0QgEgcAAgMQAAgcAUgkQAIgQAQgMQA4gkCAgsQBkgoCwg0IAAAEQgUAsgkAwQg4AMhwAoQigA8hEAkIAAAEQAsAYBIAgIgYAkQBoBgCsDIQAgAoAgAQQAkAUAsAAIAcAAQAsAAAkgQQAogUAIgcIAUhQIA0goIAEAIQgQA8AAAYQAAAsAYAUQAoAcA4AAIAYAAQBsAAAogQQAogMAAgUQAAgYgUg0QgQgkgkhIQAcgwAcgkIAEAAQAcA4AUA0QAYBEAAA0QAAAogQAkQgMAggYAgQgYAYgsAIQgsAMhYAAIgYAAQg8AAgkgQQgogUgUgoQgUAkgoAUQgoAUgwAAIggAAQg8AAgwgkQgkgYgwg8IhAhUIgEAAQAABgg8AwQhEA8iUAAIhUAAQAAAkgQAoQgQAogYAkQgoA8g4AkQgwAggkAAQhcAAh4hMgEhblgKtQgQhEgkgoQgogsgoAAQggAAgcAYQgYAUAAAYQAAAwBQAYQAcAIAkAEIBIAAIAAAAgEhppgHdQg8g8AAhkQAAhAAUg8QAMgsAggwIAcAQQgUAggMAoQgMAoAAAYQAABUA0AwQAYAUAkAQQAoAMAoAAQAsAAA0gUQAwgQAkgcQA0goAAgUQAAgkgIgkQgEgYgMgkQgchcgkg4QAohEAUgcIAEAAQAoBMAUBIQAUBMAABQQAAA4gQA4QgQA4gUAYQgwA0hEAcQhEAghAAAQhoAAhAhAgEAzGgJBQAIg0AAhgIAAhIQAAiwgYkgQAggsAogkIAIAEQAQDIAAFEQAABQgEAoQAAAggQAcQgQAYggAkgAGWpBQAIg0AAhgIAAhIQAAiwgckgQAkgsAkgkIAIAEQAUDIAAFEQAABMgEAsQgEAggQAcQgMAYgkAkgEgrBgJBQAIgwAAhkIAAhIQAAiwgYkgQAkgsAkgkIAEAEQAUDEAAFIQAABMgEAsQAAAggQAcQgQAYggAkgEA8igJdQgkgYgUgsQgUgoAAg4QAAggAMgoIAghIQAkg0AogoQAAgYAIg0IAIgEQAYAYBcBEQBUBIAMA0QAMAgAAAwQAAAkgMAoQgMAsgQAUQhABEhcAAQg0AAgkgYgEA8GgMNQAAAoAkAgQAkAcA0AAQA8AAA4goQAggYAAgYQAAgggogwQgsg0hMgsQhwBYAABMgEBjegJNQgsAAgcgMQgggIgUgYQgggggIgwQgIggAAhgQAAisgUkUQAwgwAYgUIAEAEQAIBsAECYIAAEUIAAAsQAAA8A4AUQAYAIAYAAIAcAAQBUAAAoiEQAMgsAsgsQAsgsAwAAQBAAAAsBMQAoBIAIBsQgUBgg8AAQhkAAh4hYIgEAAQgcBghkAAgEBm+gNNQgcAUgQAkQAgAsBMAgQAwAUAoAAQAUAAAEgIQgQhQgggsQgggogoAAQggAAgYAUgEBUCgJNQgsAAgggMQgcgIgYgYQgggggIgwQgIggAAhgQAAisgQkUQAsgwAYgUIAEAEQAIBsAECYIAAEUIAAAsQAAA8A4AUQAYAIAYAAIBIAAQBwAAA0gQQAkgIAYgUQAcgUAAgMQAAgMgEgEQgYAEg8AAQiMAAgkhUQgMgYAAgcQAAgoAQgoQAMgoAcgcQAwgwAwAAQAsAAAkAoQAkAkAYBIQAgBQAABgQAABMgkAoQggAohEAUQhAAQhkAAgEBV2gPZQgYAUAAAYQAAAoBAAUQA0AUBggEQgMg4gggoQgkgwgsAAQgkAAgcAYgEBKqgJNQg4AAgkgcQgogcgUhAIgEAAQgMAsgsAYQhQA0hEAAQhAAAgggkQgggkAAhEIAAg0IAcgEQAIBkBkAAQAcAAAggMQAggIAcgQQAUgMAQgQQAMgQAAgMQAAgkgQhMQgMgwggh0QAkg8AQgUIAEAEQAgCAAoDMQAIA0AgAgQAgAcAsAAIAYAAQBsAAAogQQAsgMAAgUQAAgYgYg0QgQgkgkhIQAcgwAcgkIAEAAQAcA4AUA0QAYBEAAA0QAAAogMAkQgMAcgcAkQgYAYgsAIQgsAMhYAAgEAtGgJNQh8AAh0gYQiEAYkAAAIhIAAQg4AAgkgQQgsgUgQgoIgEAAQgQAkgsAUQgkAUg0AAIgkAAQg4AAg4gMQg8gMhIgYQiEAwhQAAIgcAAQg8AAgkgUQgogYgUg8QhIAghMAAQg8AAgkgUQgkgYAAgsQAAgkAUgwQAwhkDAhsIgEg0QAggoAcgYIAIAAQAAB0AEDoQAAAoAEAYQAIAcAQAMQAYAUA0AAIAgAAQAsAABMgQQgQgcgIggQgEgUAAgkQAAgsAQgsQAQgwAkgkQAcggAggUQAggUAUAAQAUAAAYAYQAYAUAUAoQAcA0AAA0QAAAwgMAwQgMAkgYAsQAsAMBIAAIAoAAQAsAAAkgQQAogUAIgcIAUhQIA0goIAEAIQgQA8AAAYQAAAsAYAUQAkAcA4AAIBEAAIA4hEIAIg8IAAhYQAAhEgEhsQgEhcgIhIQgEgwAAgYQAAgYAMgYQAQgQAcgYIAIAEQAABAA8BkIgwAoQAICYAABYQAABUgcBAIAEAAQBYhgBIgoQAcgUAkgIQAogMAgAAQBIAAA0A0QA4A0AABQQAAAYgMAgQgIAUgUAgQAYAEA0AAIAsAAQAwAAAkgUQAogYAAg4QAAikgUjgQgEggAAgQQgEgcAAgQQAAgYAUgYIAsgsIAEAEQgEBEBABoQgUAUgcAQQAEAsAEBYQAEBQAAAwQAAB8ggBAQgMAggMAQQgUAYgYAMQgsAYgwAAgEAmugM9QhAAshcBkIBEAAQCgAABcgMQBsgUAYgkQAAgwgsgoQgwgohAAAQhEAAhIA0gAYeuNQgkAogMAsQAQBIBUAcQAogIAoggQAogcAAgYQAAgcgUgkQgQgkgQgQQgUgQgUAAQgoAAgoAogAPesZQAAAUAcAMQAYAIAsAAQAsAABAgUIgEi4QjIBoAAA8gAAOpNQg3AAg4gMQg8gMhEgYQiIAwhQAAIgcAAQhwAAgghQIgEAAQgUAkggAUQgoAYg0AAIgcAAQg8AAgkgQQgogUgUgoQgUAkgoAUQgoAUgwAAIggAAQg4AAgogQQgogUgQgoIgEAAQgUAkgoAUQgoAUgwAAIggAAQg4AAgogQQgogUgQgoIgEAAQgUAkgoAUQgoAUgwAAIggAAQg8AAgggUQgogYgUg8QhMAghIAAQg8AAgkgUQgogYAAgsQAAggAYg0QAshkDEhsIgIg0QAkgoAYgYIAIAAQAEB0AADoQAAAoAIAYQAEAcAQAMQAYAUA4AAIAgAAQAwAAAkgQQAkgUAIgcIAYhQIA0goIAEAIQgQA8AAAYQAAAsAYAUQAkAcA4AAIAcAAQAwAAAkgQQAkgUAIgcIAYhQIA0goIAEAIQgQA8AAAYQAAAsAYAUQAkAcA4AAIAcAAQAwAAAkgQQAkgUAIgcIAYhQIA0goIAEAIQgQA8AAAYQAAAsAYAUQAkAcA4AAIAcAAQAsAAAogYQAUgIAIgUQAIgYAAgkQAAhkgEh4QgEhQgMicIAAgkIBAhEIAEAEQAMB0AECcIAAE4QAAAgAYAYQAcAcA8AAIAUAAQAsAABMgQQgQgcgEggQgEgUAAgkQAAgsAMgsQAUgwAggkQAgggAggUQAcgUAYAAQAUAAAUAYQAYAUAUAoQAcA0AAA0QAAAwgMAwQgMAkgYAsQAsAMBHAAIAoAAQAsAAAogUQAogYAAg4QgEikgUjgQgEggAAgQQgEgcAAgQQAAgYAYgYQAQgUAYgYIAIAEQgEBEBABoQgYAUgYAQQAAAsAEBYQAEBQAAAwQAAB8gcBAQgMAggQAQQgQAYgYAMQgsAYgwAAgAkJuNQgkAogMAsQAUBIBUAcQAkgIAoggQAogcAAgYQAAgggQggQgkhEgoAAQgoAAgoAogEgh5gMZQAAAUAgAMQAYAIAoAAQAwAABAgUIgEi4QjMBoAAA8gEg11gQVQAcgkAggkQAoAgAsAwQggAwgYAYQgsgsgsgkgEhQpgQVIA4hIQAsAkAsAsQggAwgYAYIhYhQgEgzlgQdQAcgoAgggQAoAgAsAwQggAsgYAYQgwgsgogggEhOZgQdQAYgkAggkQAoAgAwAwQggAsgcAYQgsgsgogggA1NwhQAkg0AYgYQAsAgAsAwQgYAogkAgQgcgcg8gwgEBLWgQhIAQgcIAQgQIAUgMQgcgIgQgQQgQgQAAgYQAAggAkgkQAwgoAsAAQAUAAAMAIQAMAMAAAQQAAAMgIAMQgEAIgMAQQgMgcgMAAQgIgEgQAAQgQAAgUAIQgQAIAAAMQAAAYAkAMQAgAMAoAAQAYAAA0gEQgQAggMAUQhwAQhUAogEhL5gR1QAcgoAgggQAoAgAsAwQggAwgYAUQgogkgwgogEhJpgR9QAcgoAgggQAoAgAsAwQggAsgYAYQgwgsgogggEhnBgR9QgcgYgQgMQAog0AUgYQAsAgAwAwQgcAsgkAcQgQgQgcgYgAXGzFQAcgoAgggQAkAcAwA0QggAsgYAYQgwgsgogggAZWzRQAcgoAggcQAkAcAwAwQggAwgYAUQgsgkgsgogAkNzVQAggsAcggQAsAkAsAsQgcAsggAcIhYhMgEA7agTlQAcgkAggkQAoAgAsAwQggAwgYAUQgogkgwgogEA9qgTtQAcgoAgggQAoAgAsAwQggAsgYAYQgwgsgogggEBVqgTxQAog0AUgYQAsAgAsAwQgYAogkAgQgYgYhAg0gAP60RQAcgoAcggQAoAgAwAwQgkAwgYAUQgogogsgkgEghdgURQAcgoAgggQAoAgAsAwQggAwgYAUQgsgogsgkgASK0ZQAYgoAgggQAoAcAsA0QggAsgYAYQgogogsgkgA/N0ZQAcgoAgggQAoAgAsAwQggAsgYAYQgogogwgkg");
	this.shape.setTransform(25.7,57.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.svdfvfvfv("synched",0);
	this.instance.setTransform(18.95,65.55,58.3112,44.6592,0,0,0,5.7,-0.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-765.3,-138,1573.3,403.6);


(lib.intromobilerrrrr = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg4gAwUMAAAhgnMBxBAAAMAAABgng");
	this.shape.setTransform(-34.65,92.3319,1,1.4401);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg4ghFjMBxBAAAMAAACLHMhxBAAAg");
	this.shape_1.setTransform(-34.65,92.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.749)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_2.setTransform(-34.65,92.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(1,1,1,0.502)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_3.setTransform(-34.65,92.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(1,1,1,0.251)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_4.setTransform(-34.65,92.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EA4hgwTMAAABgnMhxBAAAMAAAhgng");
	this.shape_5.setTransform(-34.65,92.3319,1,1.4401);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(1,1,1,0)").s().p("Eg4gAwUMAAAhgnMBxBAAAMAAABgng");
	this.shape_6.setTransform(-34.65,92.3319,1,1.4401);

	this.instance = new lib.shape113("synched",0);
	this.instance.setTransform(-395,-328.55,1,1.4401);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_4},{t:this.shape_1}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.instance}]},1).to({state:[]},1).wait(187));

	// Layer_2
	this.instance_1 = new lib.shape146("synched",0);
	this.instance_1.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(193));

	// Layer_3
	this.instance_2 = new lib.shape93("synched",0);
	this.instance_2.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(193));

	// Layer_4
	this.instance_3 = new lib.shape92("synched",0);
	this.instance_3.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(193));

	// Layer_5
	this.instance_4 = new lib.shape91("synched",0);
	this.instance_4.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_5 = new lib.shape148("synched",0);
	this.instance_5.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(32).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(3).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(4).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(2).to({skewX:1.4195},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(3).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(4).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(1).to({skewX:1.4195},0).wait(29));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(34).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(5).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(6).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(5).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(33));

	// Layer_6
	this.instance_6 = new lib.shape90("synched",0);
	this.instance_6.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(32).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(3).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},2).wait(4).to({regX:-0.1,regY:-0.1,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(2).to({scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(3).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},2).wait(4).to({regX:-0.1,regY:-0.1,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(1).to({skewX:3.59},0).wait(29));

	// Layer_7
	this.instance_7 = new lib.shape89("synched",0);
	this.instance_7.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(193));

	// Layer_8
	this.instance_8 = new lib.shape88("synched",0);
	this.instance_8.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(193));

	// Layer_9
	this.instance_9 = new lib.shape87("synched",0);
	this.instance_9.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(193));

	// Layer_10
	this.instance_10 = new lib.shape86("synched",0);
	this.instance_10.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(193));

	// Layer_11
	this.instance_11 = new lib.shape85("synched",0);
	this.instance_11.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(193));

	// Layer_12
	this.instance_12 = new lib.shape84("synched",0);
	this.instance_12.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(193));

	// Layer_13
	this.instance_13 = new lib.shape83("synched",0);
	this.instance_13.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(193));

	// Layer_14
	this.instance_14 = new lib.shape82("synched",0);
	this.instance_14.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(193));

	// Layer_15
	this.instance_15 = new lib.shape81("synched",0);
	this.instance_15.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_16 = new lib.shape149("synched",0);
	this.instance_16.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(51).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(117));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(55).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(117));

	// Layer_16
	this.instance_17 = new lib.shape80("synched",0);
	this.instance_17.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(51).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(117));

	// Layer_17
	this.instance_18 = new lib.shape79("synched",0);
	this.instance_18.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(193));

	// Layer_22
	this.instance_19 = new lib.bg1("synched",0);
	this.instance_19.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(193));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-397.3,-363.1,725.4000000000001,901.7);


(lib.intromobile8678687 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg4gAwUMAAAhgnMBxBAAAMAAABgng");
	this.shape.setTransform(-34.65,92.3319,1,1.4401);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg4ghFjMBxBAAAMAAACLHMhxBAAAg");
	this.shape_1.setTransform(-34.65,92.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.749)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_2.setTransform(-34.65,92.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(1,1,1,0.502)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_3.setTransform(-34.65,92.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(1,1,1,0.251)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_4.setTransform(-34.65,92.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EA4hgwTMAAABgnMhxBAAAMAAAhgng");
	this.shape_5.setTransform(-34.65,92.3319,1,1.4401);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(1,1,1,0)").s().p("Eg4gAwUMAAAhgnMBxBAAAMAAABgng");
	this.shape_6.setTransform(-34.65,92.3319,1,1.4401);

	this.instance = new lib.shape113("synched",0);
	this.instance.setTransform(-395,-328.55,1,1.4401);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_4},{t:this.shape_1}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.instance}]},1).to({state:[]},1).to({state:[]},298).wait(100));

	// Layer_2
	this.instance_1 = new lib.shape146("synched",0);
	this.instance_1.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(404));

	// Layer_3
	this.instance_2 = new lib.shape93("synched",0);
	this.instance_2.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(404));

	// Layer_4
	this.instance_3 = new lib.shape92("synched",0);
	this.instance_3.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(404));

	// Layer_5
	this.instance_4 = new lib.shape91("synched",0);
	this.instance_4.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_5 = new lib.shape148("synched",0);
	this.instance_5.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(46).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(2).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(52).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(2).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(18).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},9).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(2).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(2).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},6).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).wait(19).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},9).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(2).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(2).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},6).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).wait(31).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},9).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(2).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(2).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},6).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},4).wait(3).to({_off:false},0).wait(37));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(48).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},2).wait(53).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},2).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(9).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},2).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(6).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(20).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(9).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},2).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(6).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(32).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(9).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},2).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(6).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false},0).to({_off:true},3).wait(37));

	// Layer_6
	this.instance_6 = new lib.shape90("synched",0);
	this.instance_6.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(46).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(53).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(19).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},13).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({startPosition:0},0).wait(2).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},11).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(19).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},13).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({startPosition:0},0).wait(2).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},11).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(31).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},13).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({startPosition:0},0).wait(2).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},11).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(52));

	// Layer_7
	this.instance_7 = new lib.shape89("synched",0);
	this.instance_7.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(404));

	// Layer_8
	this.instance_8 = new lib.shape88("synched",0);
	this.instance_8.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(404));

	// Layer_9
	this.instance_9 = new lib.shape87("synched",0);
	this.instance_9.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(404));

	// Layer_10
	this.instance_10 = new lib.shape86("synched",0);
	this.instance_10.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(404));

	// Layer_11
	this.instance_11 = new lib.shape85("synched",0);
	this.instance_11.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(404));

	// Layer_12
	this.instance_12 = new lib.shape84("synched",0);
	this.instance_12.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(404));

	// Layer_13
	this.instance_13 = new lib.shape83("synched",0);
	this.instance_13.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(404));

	// Layer_14
	this.instance_14 = new lib.shape82("synched",0);
	this.instance_14.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(404));

	// Layer_15
	this.instance_15 = new lib.shape81("synched",0);
	this.instance_15.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_16 = new lib.shape149("synched",0);
	this.instance_16.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(51).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(57).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(119).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(99));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(55).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(61).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7189,x:-13.45,y:250.65},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(124).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7189,x:-13.45,y:250.65},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(101));

	// Layer_16
	this.instance_17 = new lib.shape80("synched",0);
	this.instance_17.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(51).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(57).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(119).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(99));

	// Layer_17
	this.instance_18 = new lib.shape79("synched",0);
	this.instance_18.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(404));

	// Layer_22
	this.instance_19 = new lib.bg1("synched",0);
	this.instance_19.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(404));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-397.3,-363.1,725.4000000000001,901.7);


(lib.intromobile6egret = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.shape146("synched",0);
	this.instance.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_3
	this.instance_1 = new lib.shape93("synched",0);
	this.instance_1.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance_2 = new lib.shape92("synched",0);
	this.instance_2.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_5
	this.instance_3 = new lib.shape91("synched",0);
	this.instance_3.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_4 = new lib.shape148("synched",0);
	this.instance_4.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(28).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},4).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},3).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(4).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},4).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},3).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(12).to({startPosition:0},0).to({_off:true},1).wait(12));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(30).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},3).wait(12).to({_off:false},0).to({_off:true},3).wait(26));

	// Layer_6
	this.instance_5 = new lib.shape90("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(28).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},10).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},4).wait(3).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(4).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},4).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},4).wait(3).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(12).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_7
	this.instance_6 = new lib.shape89("synched",0);
	this.instance_6.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_8
	this.instance_7 = new lib.shape88("synched",0);
	this.instance_7.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_9
	this.instance_8 = new lib.shape87("synched",0);
	this.instance_8.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_10
	this.instance_9 = new lib.shape86("synched",0);
	this.instance_9.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_11
	this.instance_10 = new lib.shape85("synched",0);
	this.instance_10.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_12
	this.instance_11 = new lib.shape84("synched",0);
	this.instance_11.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_13
	this.instance_12 = new lib.shape83("synched",0);
	this.instance_12.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_14
	this.instance_13 = new lib.shape82("synched",0);
	this.instance_13.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_15
	this.instance_14 = new lib.shape81("synched",0);
	this.instance_14.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_15 = new lib.shape149("synched",0);
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(28).to({startPosition:0},0).to({_off:true},1).wait(12));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(41));

	// Layer_16
	this.instance_16 = new lib.shape80("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(28).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_17
	this.instance_17 = new lib.shape79("synched",0);
	this.instance_17.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	// Layer_22
	this.instance_18 = new lib.bg1("synched",0);
	this.instance_18.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(83).to({startPosition:0},0).to({_off:true},1).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-300.5,-363.1,530.1,830.9000000000001);


(lib.intromobile3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_19
	this.instance = new lib.zbzfbzfbb("synched",0);
	this.instance.setTransform(-33,147.5);

	this.instance_1 = new lib.dadfgadfgadfgfg("synched",0);
	this.instance_1.setTransform(-33,149.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},138).to({state:[{t:this.instance_1}]},176).to({state:[{t:this.instance_1}]},95).to({state:[]},1).wait(28));

	// Layer_2
	this.instance_2 = new lib.shape146("synched",0);
	this.instance_2.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},138).wait(300));

	// Layer_3
	this.instance_3 = new lib.shape93("synched",0);
	this.instance_3.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},138).wait(300));

	// Layer_4
	this.instance_4 = new lib.shape92("synched",0);
	this.instance_4.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:true},138).wait(300));

	// Layer_5
	this.instance_5 = new lib.shape91("synched",0);
	this.instance_5.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_6 = new lib.shape148("synched",0);
	this.instance_6.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(20).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(10).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},8).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(7).to({startPosition:0},0).to({_off:true},2).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).wait(2).to({scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},1).wait(300));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(22).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(10).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(12).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(8).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(9).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(306));

	// Layer_6
	this.instance_7 = new lib.shape90("synched",0);
	this.instance_7.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(20).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(22).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(2).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).to({_off:true},1).wait(300));

	// Layer_7
	this.instance_8 = new lib.shape89("synched",0);
	this.instance_8.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({_off:true},138).wait(300));

	// Layer_8
	this.instance_9 = new lib.shape88("synched",0);
	this.instance_9.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({_off:true},138).wait(300));

	// Layer_9
	this.instance_10 = new lib.shape87("synched",0);
	this.instance_10.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({_off:true},138).wait(300));

	// Layer_10
	this.instance_11 = new lib.shape86("synched",0);
	this.instance_11.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({_off:true},138).wait(300));

	// Layer_11
	this.instance_12 = new lib.shape85("synched",0);
	this.instance_12.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({_off:true},138).wait(300));

	// Layer_12
	this.instance_13 = new lib.shape84("synched",0);
	this.instance_13.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({_off:true},138).wait(300));

	// Layer_13
	this.instance_14 = new lib.shape83("synched",0);
	this.instance_14.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({_off:true},138).wait(300));

	// Layer_14
	this.instance_15 = new lib.shape82("synched",0);
	this.instance_15.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).to({_off:true},138).wait(300));

	// Layer_15
	this.instance_16 = new lib.shape81("synched",0);
	this.instance_16.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_17 = new lib.shape149("synched",0);
	this.instance_17.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(37).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(15).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).to({_off:true},24).wait(300));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(41).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7189,x:-13.45,y:250.65},0).to({startPosition:0},11).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(325));

	// Layer_16
	this.instance_18 = new lib.shape80("synched",0);
	this.instance_18.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(37).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},11).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).to({_off:true},24).wait(300));

	// Layer_17
	this.instance_19 = new lib.shape79("synched",0);
	this.instance_19.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).to({_off:true},138).wait(300));

	// Layer_22
	this.instance_20 = new lib.bg1("synched",0);
	this.instance_20.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).to({_off:true},138).wait(300));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-300.5,-363.1,530.1,830.9000000000001);


(lib.intromobile2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.shape146("synched",0);
	this.instance.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(72));

	// Layer_3
	this.instance_1 = new lib.shape93("synched",0);
	this.instance_1.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(72));

	// Layer_4
	this.instance_2 = new lib.shape92("synched",0);
	this.instance_2.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(72));

	// Layer_5
	this.instance_3 = new lib.shape91("synched",0);
	this.instance_3.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_4 = new lib.shape148("synched",0);
	this.instance_4.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(24).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).wait(16));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(28).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(20));

	// Layer_6
	this.instance_5 = new lib.shape90("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(24).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(28));

	// Layer_7
	this.instance_6 = new lib.shape89("synched",0);
	this.instance_6.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(72));

	// Layer_8
	this.instance_7 = new lib.shape88("synched",0);
	this.instance_7.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(72));

	// Layer_9
	this.instance_8 = new lib.shape87("synched",0);
	this.instance_8.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(72));

	// Layer_10
	this.instance_9 = new lib.shape86("synched",0);
	this.instance_9.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(72));

	// Layer_11
	this.instance_10 = new lib.shape85("synched",0);
	this.instance_10.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(72));

	// Layer_12
	this.instance_11 = new lib.shape84("synched",0);
	this.instance_11.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(72));

	// Layer_13
	this.instance_12 = new lib.shape83("synched",0);
	this.instance_12.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(72));

	// Layer_14
	this.instance_13 = new lib.shape82("synched",0);
	this.instance_13.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(72));

	// Layer_15
	this.instance_14 = new lib.shape81("synched",0);
	this.instance_14.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_15 = new lib.shape149("synched",0);
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(17));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(17));

	// Layer_16
	this.instance_16 = new lib.shape80("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(17));

	// Layer_17
	this.instance_17 = new lib.shape79("synched",0);
	this.instance_17.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(72));

	// Layer_22
	this.instance_18 = new lib.bg1("synched",0);
	this.instance_18.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(72));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-300.5,-363.1,530.1,830.9000000000001);


(lib.intromobile = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg4gAwUMAAAhgnMBxBAAAMAAABgng");
	this.shape.setTransform(-34.65,92.3319,1,1.4401);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg4ghFjMBxBAAAMAAACLHMhxBAAAg");
	this.shape_1.setTransform(-34.65,92.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.749)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_2.setTransform(-34.65,92.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(1,1,1,0.502)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_3.setTransform(-34.65,92.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(1,1,1,0.251)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_4.setTransform(-34.65,92.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EA4hgwTMAAABgnMhxBAAAMAAAhgng");
	this.shape_5.setTransform(-34.65,92.3319,1,1.4401);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(1,1,1,0)").s().p("Eg4gAwUMAAAhgnMBxBAAAMAAABgng");
	this.shape_6.setTransform(-34.65,92.3319,1,1.4401);

	this.instance = new lib.shape113("synched",0);
	this.instance.setTransform(-395,-328.55,1,1.4401);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_4},{t:this.shape_1}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.instance}]},1).to({state:[]},1).wait(298));

	// Layer_2
	this.instance_1 = new lib.shape146("synched",0);
	this.instance_1.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(304));

	// Layer_3
	this.instance_2 = new lib.shape93("synched",0);
	this.instance_2.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(304));

	// Layer_4
	this.instance_3 = new lib.shape92("synched",0);
	this.instance_3.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(304));

	// Layer_5
	this.instance_4 = new lib.shape91("synched",0);
	this.instance_4.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_5 = new lib.shape148("synched",0);
	this.instance_5.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(40).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({startPosition:0},0).wait(6).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false},0).wait(1).to({startPosition:0},0).wait(35).to({regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(2).to({_off:false,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false,scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},2).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(10).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({skewX:-4.9479},0).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(42).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(18).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(9).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(2).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(37).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(2).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(12).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(25));

	// Layer_6
	this.instance_6 = new lib.shape90("synched",0);
	this.instance_6.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(40).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(20).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(5).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(4).to({skewX:-3.355},0).wait(33).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4139,skewX:-4.0656,skewY:-184.5737,x:148.75,y:-343.45},0).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},6).wait(1).to({startPosition:0},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({regX:0,regY:0,scaleX:1.414,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(10).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({startPosition:0},2).to({startPosition:0},3).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(26));

	// Layer_7
	this.instance_7 = new lib.shape89("synched",0);
	this.instance_7.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(304));

	// Layer_8
	this.instance_8 = new lib.shape88("synched",0);
	this.instance_8.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(304));

	// Layer_9
	this.instance_9 = new lib.shape87("synched",0);
	this.instance_9.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(304));

	// Layer_10
	this.instance_10 = new lib.shape86("synched",0);
	this.instance_10.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(304));

	// Layer_11
	this.instance_11 = new lib.shape85("synched",0);
	this.instance_11.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(304));

	// Layer_12
	this.instance_12 = new lib.shape84("synched",0);
	this.instance_12.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(304));

	// Layer_13
	this.instance_13 = new lib.shape83("synched",0);
	this.instance_13.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(304));

	// Layer_14
	this.instance_14 = new lib.shape82("synched",0);
	this.instance_14.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(304));

	// Layer_15
	this.instance_15 = new lib.shape81("synched",0);
	this.instance_15.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_16 = new lib.shape149("synched",0);
	this.instance_16.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(57).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(166));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(61).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7189,x:-13.45,y:250.65},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(167));

	// Layer_16
	this.instance_17 = new lib.shape80("synched",0);
	this.instance_17.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(57).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(166));

	// Layer_17
	this.instance_18 = new lib.shape79("synched",0);
	this.instance_18.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(304));

	// Layer_22
	this.instance_19 = new lib.bg1("synched",0);
	this.instance_19.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(304));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-397.3,-363.1,725.4000000000001,901.7);


(lib.intromo4545 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.shape146("synched",0);
	this.instance.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_3
	this.instance_1 = new lib.shape93("synched",0);
	this.instance_1.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_4
	this.instance_2 = new lib.shape92("synched",0);
	this.instance_2.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_5
	this.instance_3 = new lib.shape91("synched",0);
	this.instance_3.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_4 = new lib.shape148("synched",0);
	this.instance_4.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(20).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(7).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},4).wait(2).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},52).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(20).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).wait(20).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},4).wait(2).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(5).to({scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(12).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).wait(1).to({startPosition:0},0).wait(3).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).wait(1).to({startPosition:0},0).wait(57).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},1).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(34).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},4).wait(2).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(5).to({scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(12).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).wait(1).to({startPosition:0},0).wait(3).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).wait(1).to({startPosition:0},0).wait(3).to({startPosition:0},0).wait(19).to({startPosition:0},0).to({_off:true},1).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(29).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(52).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},4).wait(21).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(6).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(13).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(59).to({_off:false},0).to({_off:true},4).wait(41).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(6).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(13).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(28));

	// Layer_6
	this.instance_5 = new lib.shape90("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(20).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(7).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(16).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},2).wait(1).to({skewX:-4.9479},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(72).to({scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(16).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(20).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},0).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},2).wait(1).to({skewX:-4.9479},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(20).to({regX:-0.1,regY:-0.1,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(16).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(3).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).wait(100).to({regX:0,regY:0,scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,y:-317.7},0).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},2).wait(1).to({skewX:-4.9479},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(20).to({regX:-0.1,regY:-0.1,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(16).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(3).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).wait(7).to({startPosition:0},0).wait(19).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_7
	this.instance_6 = new lib.shape89("synched",0);
	this.instance_6.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_8
	this.instance_7 = new lib.shape88("synched",0);
	this.instance_7.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_9
	this.instance_8 = new lib.shape87("synched",0);
	this.instance_8.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_10
	this.instance_9 = new lib.shape86("synched",0);
	this.instance_9.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_11
	this.instance_10 = new lib.shape85("synched",0);
	this.instance_10.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_12
	this.instance_11 = new lib.shape84("synched",0);
	this.instance_11.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_13
	this.instance_12 = new lib.shape83("synched",0);
	this.instance_12.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_14
	this.instance_13 = new lib.shape82("synched",0);
	this.instance_13.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_15
	this.instance_14 = new lib.shape81("synched",0);
	this.instance_14.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_15 = new lib.shape149("synched",0);
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(87).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(2).to({startPosition:0},0).wait(221).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(2).to({startPosition:0},0).wait(147).to({startPosition:0},0).to({_off:true},1).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(91).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7189,x:-13.45,y:250.65},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(227).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7189,x:-13.45,y:250.65},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(154));

	// Layer_16
	this.instance_16 = new lib.shape80("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(87).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(2).to({startPosition:0},0).wait(221).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(2).to({startPosition:0},0).wait(147).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_17
	this.instance_17 = new lib.shape79("synched",0);
	this.instance_17.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	// Layer_22
	this.instance_18 = new lib.bg1("synched",0);
	this.instance_18.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(564).to({startPosition:0},0).to({_off:true},1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-300.5,-363.1,530.1,830.9000000000001);


(lib.hvchhghgh = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.hgchghfhjhkckc("synched",0);
	this.instance.setTransform(-47.55,-303.5,1.08,1.08,0,0,0,0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2));

	// Layer_1
	this.instance_1 = new lib.zdfbzfbzfdbfdbfd("synched",0);
	this.instance_1.setTransform(0.95,34.05,0.7,0.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-345.2,427.2,580.9);


(lib.hama = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_30
	this.instance = new lib.sprite297();
	this.instance.setTransform(0,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-450,-440.1,900,1043.6);


(lib.Fbabertagbtaet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.kjdbkdjfbfd("synched",0);
	this.instance.setTransform(143,-0.1,0.216,0.216,0,0,0,0,0.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(112).to({_off:false},0).wait(291).to({startPosition:0},0).to({_off:true},1).wait(418));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AB2COIAOgRQALAHALAMQgJAMgGAGQgMgMgJgIgACaCMQAGgJAIgJQALAIALAMQgJAMgGAFIgVgTgABgBXQgQgSAAgiQABgOAEgRQAFgRAHgNIAHADQgLAbABATQAAAMADALQAEAKAIAIQAHAIANAFQALAEAOAAQAZAAAhgQQAPgIACgFQgDgHgPgEQgOgGgWAAIgBgCIAMgVIBGAAQASAAAPgGQgFgKAAgOQABgSALgQQAKgMAIgFQACgJADgKIAAAAQAMAKATAPIAjAZQANAJAEAJQAHAJAAAMQAAAOgJAKQgLAKgRAAQgMAAgRgDQgRgDgSgGQgfAMgVAAIgPAAIABAOQAAAEgDAIIgEALQgTAQgYAJQgYAKgUAAQghAAgTgUgAFXAJQAPAGASAAQAIAAAHgDQAFgCABgEQAAgHgMgLQgIgIgVgNQgCAWgLAUgAEwglQgJAKgBAIQAAAFAGAFQAFAGAJAEQAMgCAGgFQAMgGABgHQAAgLgHgKQgGgJgHAAQgKAAgLAMgAmRBLIABgHQAMAEAJAAQAUAAATgPQARgOAKgWQACgEAAgEIgCgKQgKgVgOgSIAPgYIABAAIAMAaQAFAIADAHQABAJAAAKIAAAUQAAAYgWAcQgRARgPAAQgSAAgdgOgAgxAnQACgNAAgZIAAgRQABgsgIhIQAJgKAJgJIADAAQAEAzAABQQAAATgCALQAAAHgDAHQgEAGgJAKgAqDAiQgEgFgBgHQABgHAEgFQAFgFAGAAQAHAAAEAFQAGAFAAAHQAAAHgGAFQgDAFgIAAQgGAAgFgFgAIxAjQgMAAgGgCQgIgCgGgGQgHgIgDgMQgCgIABgXQAAgrgGhFQAMgNAGgEIACAAQACAbABAnIAABFIAAALQgBAOAOAFQAGACAHAAIAHAAQAUAAAKggQADgLAMgMQAKgLAMAAQAQAAALAUQALASABAZQgFAYgPAAQgZAAgegWIgBAAQgHAYgZAAgAJogcQgHAFgDAJQAHALAUAHQALAGAKAAQAGAAABgCQgEgTgIgLQgJgKgJAAQgJAAgGAEgAiRAjQgMAAgJgGQgMgHgFgRIgBAAQgCALgKAHQgUAMgSAAQgQAAgHgJQgKgJABgQIABgNIAHAAQABAYAZAAQAHAAAIgDIAPgHIAJgFQADgEAAgEQAAgIgEgTIgLgqIAGgKIAGgJIACABQAIAiAJAxQAEANAHAHQAJAHAKAAIAHAAQAMAAAKgFQAJgGABgNQgCgngEg6IgBgMIgBgLQAAgHAFgGIALgKIABABQAAARAPAaIgMAJIABAhIABAgQAAAfgGAOIgHANQgFAGgFADQgLAFgNAAgAnGAjQgPAAgJgFQgJgGgFgOQgUAIgRAAQgQAAgIgGQgLgFABgKQAAgJAFgNQALgYAxgbIgBgOIAPgPIACAAIABBXQAAAKABAGQABAFAFAEQAFAFAPAAIAIAAQAaAAAKgEQALgEgBgEQABgFgHgNIgMgbQAGgNAHgIIACAAQAIANAEAOQAGARABANQAAAJgFAJQgCAHgHAIQgGAHgMACQgLACgUAAgAojgPQAAAGAHACQAGADAKAAQAMAAAQgFIgBguQgzAaABAOgAqCgXIAJgKQADgFAAgGQAAgIgMgKIgSgOQgIgFgCgGQgDgGAAgHQAAgRANgOQAOgOASAAQAEAAAIADQAJADAGAFIADAFQACADAAADQAAAEgEAFQgFAEgDAAIgLgIQgLgIgLAAQgHAAgEAEQgEADgBAHQAAAHALAIIASAOQAMAJAGAHQAFAHAAAIQABALgMALQgLAKgJADgAm0hrIAPgTQALAJALALQgGALgKAHIgVgTgAodiMQAHgKAJgIQAIAHAMANQgHALgGAGIgXgTgAn5iPQAHgKAIgIIAVAUQgHAMgGAFIgXgTg");
	this.shape.setTransform(139.05,-33.95);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(19).to({_off:false},0).wait(384).to({_off:true},1).wait(418));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,51,102,0.8)").s().p("AiBAiQgOAAgKgKQgKgKAAgOIAAAAQAAgNAKgKQAKgKAOAAIEDAAQAOAAAKAKQAKAKAAANIAAAAQAAAOgKAKQgKAKgOAAg");
	this.shape_1.setTransform(0.3769,41.306,15.201,35.1905);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(403).to({_off:true},1).wait(418));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-248.9,-79.2,498.6,241.10000000000002);


(lib.basala2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(223.525,391.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("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");
	this.shape_1.setTransform(91.15,26.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.instance = new lib.svdfvfvfv("synched",0);
	this.instance.setTransform(18.95,146.8,58.3112,97.754,0,0,0,5.7,-0.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-765.3,-298.8,1573.3,883.5999999999999);


(lib.basala = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg4gAwUMAAAhgnMBxBAAAMAAABgng");
	this.shape.setTransform(-34.65,92.3319,1,1.4401);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg4ghFjMBxBAAAMAAACLHMhxBAAAg");
	this.shape_1.setTransform(-34.65,92.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.749)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_2.setTransform(-34.65,92.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(1,1,1,0.502)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_3.setTransform(-34.65,92.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(1,1,1,0.251)").s().p("Eg4gBFkMAAAiLHMBxBAAAMAAACLHg");
	this.shape_4.setTransform(-34.65,92.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EA4hgwTMAAABgnMhxBAAAMAAAhgng");
	this.shape_5.setTransform(-34.65,92.3319,1,1.4401);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(1,1,1,0)").s().p("Eg4gAwUMAAAhgnMBxBAAAMAAABgng");
	this.shape_6.setTransform(-34.65,92.3319,1,1.4401);

	this.instance = new lib.shape113("synched",0);
	this.instance.setTransform(-395,-328.55,1,1.4401);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_4},{t:this.shape_1}]},1).to({state:[{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.instance}]},1).to({state:[]},1).to({state:[]},298).wait(152));

	// Layer_2
	this.instance_1 = new lib.shape146("synched",0);
	this.instance_1.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(456));

	// Layer_3
	this.instance_2 = new lib.shape93("synched",0);
	this.instance_2.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(456));

	// Layer_4
	this.instance_3 = new lib.shape92("synched",0);
	this.instance_3.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(456));

	// Layer_5
	this.instance_4 = new lib.shape91("synched",0);
	this.instance_4.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_5 = new lib.shape148("synched",0);
	this.instance_5.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(32).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},45).wait(1).to({_off:false,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(2).to({skewX:1.4195},0).to({_off:true},1).wait(6).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(5).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(1).to({skewX:1.4195},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({startPosition:0},1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},7).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(5).to({regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(2).to({skewX:1.4195},0).to({_off:true},1).wait(5).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(4).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},3).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(1).to({skewX:1.4195},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},8).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},40).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(5).to({regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(2).to({skewX:1.4195},0).to({_off:true},1).wait(5).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(4).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},3).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(1).to({skewX:1.4195},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(5).to({startPosition:0},0).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(2).to({regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(2).to({regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(2).to({skewX:1.4195},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).wait(1).to({skewX:1.4195},0).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(19));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(34).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(45).to({_off:false,regX:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(6).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(7).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},9).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(7).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(10).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(7).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(5).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(3).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(8).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(40).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(10).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(7).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(5).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(3).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(16).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(3).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(19));

	// Layer_6
	this.instance_6 = new lib.shape90("synched",0);
	this.instance_6.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(32).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},2).wait(45).to({regX:-0.1,regY:-0.1,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(30).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(15).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(30).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(2).to({scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},16).to({startPosition:0},7).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(28).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},2).wait(33).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({skewX:3.59},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(15).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(30).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(2).to({scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},16).to({startPosition:0},7).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(50));

	// Layer_7
	this.instance_7 = new lib.shape89("synched",0);
	this.instance_7.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(456));

	// Layer_8
	this.instance_8 = new lib.shape88("synched",0);
	this.instance_8.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(456));

	// Layer_9
	this.instance_9 = new lib.shape87("synched",0);
	this.instance_9.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(456));

	// Layer_10
	this.instance_10 = new lib.shape86("synched",0);
	this.instance_10.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(456));

	// Layer_11
	this.instance_11 = new lib.shape85("synched",0);
	this.instance_11.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(456));

	// Layer_12
	this.instance_12 = new lib.shape84("synched",0);
	this.instance_12.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(456));

	// Layer_13
	this.instance_13 = new lib.shape83("synched",0);
	this.instance_13.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(456));

	// Layer_14
	this.instance_14 = new lib.shape82("synched",0);
	this.instance_14.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(456));

	// Layer_15
	this.instance_15 = new lib.shape81("synched",0);
	this.instance_15.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_16 = new lib.shape149("synched",0);
	this.instance_16.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(51).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(380));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(55).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(380));

	// Layer_16
	this.instance_17 = new lib.shape80("synched",0);
	this.instance_17.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(51).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(380));

	// Layer_17
	this.instance_18 = new lib.shape79("synched",0);
	this.instance_18.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(456));

	// Layer_22
	this.instance_19 = new lib.bg1("synched",0);
	this.instance_19.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(456));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-397.3,-363.1,725.4000000000001,901.7);


(lib.ani1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.fghsfsfsfbdfb("synched",0);
	this.instance.setTransform(30.15,-12.65,2.7,2.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-279,-221.9,618.5,418.5);


(lib.adgadfgasdgasgasgsagsag = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(1.6,-55.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	// Layer_3
	this.instance = new lib.adfbdfbdfbdsf("synched",0);
	this.instance.setTransform(-8.75,105);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1));

	// Layer_2
	this.instance_1 = new lib.SDFBDFBDFBDFB("synched",0);
	this.instance_1.setTransform(-9.5,317);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-222,-96.2,425,537.2);


(lib.adfadfgdsfag = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.dfbdfbfdbfd("synched",0);
	this.instance.setTransform(4.15,-47.45,1.1,1.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(415));

	// Layer_2
	this.instance_1 = new lib.SFvdsfvSVsDVsdvsg("synched",0);
	this.instance_1.setTransform(-0.8,323.65,0.9744,1.2124,0,0,0,0.2,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(415));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-295.2,-81.2,588.5,610.2);


// stage content:
(lib.x_f_r_lession2_HTML5Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,27,334,573,709,1126,1536,1854,2411,2699,2996,3068,3364,3470,4004,4198,4439,4501,4858,5286,5504,5706,5820,6011,6459,6753,6899,7191,7271,7914,7997,8168,8319];
	this.streamSoundSymbolsList[27] = [{id:"_1",startFrame:27,endFrame:296,loop:1,offset:0}];
	this.streamSoundSymbolsList[334] = [{id:"_2",startFrame:334,endFrame:539,loop:1,offset:0}];
	this.streamSoundSymbolsList[573] = [{id:"_3",startFrame:573,endFrame:622,loop:1,offset:0}];
	this.streamSoundSymbolsList[709] = [{id:"_4",startFrame:709,endFrame:1102,loop:1,offset:0}];
	this.streamSoundSymbolsList[1126] = [{id:"_5",startFrame:1126,endFrame:1475,loop:1,offset:0}];
	this.streamSoundSymbolsList[1536] = [{id:"_6",startFrame:1536,endFrame:1839,loop:1,offset:0}];
	this.streamSoundSymbolsList[1854] = [{id:"_7",startFrame:1854,endFrame:2407,loop:1,offset:0}];
	this.streamSoundSymbolsList[2411] = [{id:"_8",startFrame:2411,endFrame:2686,loop:1,offset:0}];
	this.streamSoundSymbolsList[2699] = [{id:"_9",startFrame:2699,endFrame:2945,loop:1,offset:0}];
	this.streamSoundSymbolsList[2996] = [{id:"_10",startFrame:2996,endFrame:3068,loop:1,offset:0}];
	this.streamSoundSymbolsList[3068] = [{id:"_11",startFrame:3068,endFrame:3348,loop:1,offset:0}];
	this.streamSoundSymbolsList[3364] = [{id:"_12",startFrame:3364,endFrame:3450,loop:1,offset:0}];
	this.streamSoundSymbolsList[3470] = [{id:"_13",startFrame:3470,endFrame:3997,loop:1,offset:0}];
	this.streamSoundSymbolsList[4004] = [{id:"_15",startFrame:4004,endFrame:4197,loop:1,offset:0}];
	this.streamSoundSymbolsList[4198] = [{id:"_16",startFrame:4198,endFrame:4421,loop:1,offset:0}];
	this.streamSoundSymbolsList[4439] = [{id:"_17",startFrame:4439,endFrame:4477,loop:1,offset:0}];
	this.streamSoundSymbolsList[4501] = [{id:"_18",startFrame:4501,endFrame:4839,loop:1,offset:0}];
	this.streamSoundSymbolsList[4858] = [{id:"_19",startFrame:4858,endFrame:5269,loop:1,offset:0}];
	this.streamSoundSymbolsList[5286] = [{id:"_20",startFrame:5286,endFrame:5484,loop:1,offset:0}];
	this.streamSoundSymbolsList[5504] = [{id:"_21",startFrame:5504,endFrame:5700,loop:1,offset:0}];
	this.streamSoundSymbolsList[5706] = [{id:"_22",startFrame:5706,endFrame:5808,loop:1,offset:0}];
	this.streamSoundSymbolsList[5820] = [{id:"_23",startFrame:5820,endFrame:5991,loop:1,offset:0}];
	this.streamSoundSymbolsList[6011] = [{id:"_24",startFrame:6011,endFrame:6448,loop:1,offset:0}];
	this.streamSoundSymbolsList[6459] = [{id:"_25",startFrame:6459,endFrame:6726,loop:1,offset:0}];
	this.streamSoundSymbolsList[6753] = [{id:"_26",startFrame:6753,endFrame:6881,loop:1,offset:0}];
	this.streamSoundSymbolsList[6899] = [{id:"_27",startFrame:6899,endFrame:7186,loop:1,offset:0}];
	this.streamSoundSymbolsList[7191] = [{id:"_28",startFrame:7191,endFrame:7265,loop:1,offset:0}];
	this.streamSoundSymbolsList[7271] = [{id:"_29",startFrame:7271,endFrame:7894,loop:1,offset:0}];
	this.streamSoundSymbolsList[7914] = [{id:"_30",startFrame:7914,endFrame:7993,loop:1,offset:0}];
	this.streamSoundSymbolsList[7997] = [{id:"_31",startFrame:7997,endFrame:8168,loop:1,offset:0}];
	this.streamSoundSymbolsList[8168] = [{id:"_32",startFrame:8168,endFrame:8315,loop:1,offset:0}];
	this.streamSoundSymbolsList[8319] = [{id:"_33",startFrame:8319,endFrame:8517,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_27 = function() {
		var soundInstance = playSound("_1",0);
		this.InsertIntoSoundStreamData(soundInstance,27,296,1);
	}
	this.frame_334 = function() {
		var soundInstance = playSound("_2",0);
		this.InsertIntoSoundStreamData(soundInstance,334,539,1);
	}
	this.frame_573 = function() {
		var soundInstance = playSound("_3",0);
		this.InsertIntoSoundStreamData(soundInstance,573,622,1);
	}
	this.frame_709 = function() {
		var soundInstance = playSound("_4",0);
		this.InsertIntoSoundStreamData(soundInstance,709,1102,1);
	}
	this.frame_1126 = function() {
		var soundInstance = playSound("_5",0);
		this.InsertIntoSoundStreamData(soundInstance,1126,1475,1);
	}
	this.frame_1536 = function() {
		var soundInstance = playSound("_6",0);
		this.InsertIntoSoundStreamData(soundInstance,1536,1839,1);
	}
	this.frame_1854 = function() {
		var soundInstance = playSound("_7",0);
		this.InsertIntoSoundStreamData(soundInstance,1854,2407,1);
	}
	this.frame_2411 = function() {
		var soundInstance = playSound("_8",0);
		this.InsertIntoSoundStreamData(soundInstance,2411,2686,1);
	}
	this.frame_2699 = function() {
		var soundInstance = playSound("_9",0);
		this.InsertIntoSoundStreamData(soundInstance,2699,2945,1);
	}
	this.frame_2996 = function() {
		var soundInstance = playSound("_10",0);
		this.InsertIntoSoundStreamData(soundInstance,2996,3068,1);
	}
	this.frame_3068 = function() {
		var soundInstance = playSound("_11",0);
		this.InsertIntoSoundStreamData(soundInstance,3068,3348,1);
	}
	this.frame_3364 = function() {
		var soundInstance = playSound("_12",0);
		this.InsertIntoSoundStreamData(soundInstance,3364,3450,1);
	}
	this.frame_3470 = function() {
		var soundInstance = playSound("_13",0);
		this.InsertIntoSoundStreamData(soundInstance,3470,3997,1);
	}
	this.frame_4004 = function() {
		var soundInstance = playSound("_15",0);
		this.InsertIntoSoundStreamData(soundInstance,4004,4197,1);
	}
	this.frame_4198 = function() {
		var soundInstance = playSound("_16",0);
		this.InsertIntoSoundStreamData(soundInstance,4198,4421,1);
	}
	this.frame_4439 = function() {
		var soundInstance = playSound("_17",0);
		this.InsertIntoSoundStreamData(soundInstance,4439,4477,1);
	}
	this.frame_4501 = function() {
		var soundInstance = playSound("_18",0);
		this.InsertIntoSoundStreamData(soundInstance,4501,4839,1);
	}
	this.frame_4858 = function() {
		var soundInstance = playSound("_19",0);
		this.InsertIntoSoundStreamData(soundInstance,4858,5269,1);
	}
	this.frame_5286 = function() {
		var soundInstance = playSound("_20",0);
		this.InsertIntoSoundStreamData(soundInstance,5286,5484,1);
	}
	this.frame_5504 = function() {
		var soundInstance = playSound("_21",0);
		this.InsertIntoSoundStreamData(soundInstance,5504,5700,1);
	}
	this.frame_5706 = function() {
		var soundInstance = playSound("_22",0);
		this.InsertIntoSoundStreamData(soundInstance,5706,5808,1);
	}
	this.frame_5820 = function() {
		var soundInstance = playSound("_23",0);
		this.InsertIntoSoundStreamData(soundInstance,5820,5991,1);
	}
	this.frame_6011 = function() {
		var soundInstance = playSound("_24",0);
		this.InsertIntoSoundStreamData(soundInstance,6011,6448,1);
	}
	this.frame_6459 = function() {
		var soundInstance = playSound("_25",0);
		this.InsertIntoSoundStreamData(soundInstance,6459,6726,1);
	}
	this.frame_6753 = function() {
		var soundInstance = playSound("_26",0);
		this.InsertIntoSoundStreamData(soundInstance,6753,6881,1);
	}
	this.frame_6899 = function() {
		var soundInstance = playSound("_27",0);
		this.InsertIntoSoundStreamData(soundInstance,6899,7186,1);
	}
	this.frame_7191 = function() {
		var soundInstance = playSound("_28",0);
		this.InsertIntoSoundStreamData(soundInstance,7191,7265,1);
	}
	this.frame_7271 = function() {
		var soundInstance = playSound("_29",0);
		this.InsertIntoSoundStreamData(soundInstance,7271,7894,1);
	}
	this.frame_7914 = function() {
		var soundInstance = playSound("_30",0);
		this.InsertIntoSoundStreamData(soundInstance,7914,7993,1);
	}
	this.frame_7997 = function() {
		var soundInstance = playSound("_31",0);
		this.InsertIntoSoundStreamData(soundInstance,7997,8168,1);
	}
	this.frame_8168 = function() {
		var soundInstance = playSound("_32",0);
		this.InsertIntoSoundStreamData(soundInstance,8168,8315,1);
	}
	this.frame_8319 = function() {
		var soundInstance = playSound("_33",0);
		this.InsertIntoSoundStreamData(soundInstance,8319,8517,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(27).call(this.frame_27).wait(307).call(this.frame_334).wait(239).call(this.frame_573).wait(136).call(this.frame_709).wait(417).call(this.frame_1126).wait(410).call(this.frame_1536).wait(318).call(this.frame_1854).wait(557).call(this.frame_2411).wait(288).call(this.frame_2699).wait(297).call(this.frame_2996).wait(72).call(this.frame_3068).wait(296).call(this.frame_3364).wait(106).call(this.frame_3470).wait(534).call(this.frame_4004).wait(194).call(this.frame_4198).wait(241).call(this.frame_4439).wait(62).call(this.frame_4501).wait(357).call(this.frame_4858).wait(428).call(this.frame_5286).wait(218).call(this.frame_5504).wait(202).call(this.frame_5706).wait(114).call(this.frame_5820).wait(191).call(this.frame_6011).wait(448).call(this.frame_6459).wait(294).call(this.frame_6753).wait(146).call(this.frame_6899).wait(292).call(this.frame_7191).wait(80).call(this.frame_7271).wait(643).call(this.frame_7914).wait(83).call(this.frame_7997).wait(171).call(this.frame_8168).wait(151).call(this.frame_8319).wait(198));

	// eqra
	this.instance = new lib.SDfdsfafesefsef("single",0);
	this.instance.setTransform(248,382);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(8168).to({_off:false},0).wait(349));

	// eqra
	this.instance_1 = new lib.hvchhghgh("single",0);
	this.instance_1.setTransform(239.3,447);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7913).to({_off:false},0).wait(131).to({startPosition:1},0).to({_off:true},124).wait(349));

	// Layer_7
	this.instance_2 = new lib.xvbFVDFvVDSXVDV("single",0);
	this.instance_2.setTransform(237.8,228.55);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(7190).to({_off:false},0).wait(81).to({startPosition:1},0).wait(456).to({startPosition:2},0).to({_off:true},186).wait(604));

	// txt
	this.instance_3 = new lib.adgadfgasdgasgasgsagsag("single",0);
	this.instance_3.setTransform(251.3,205.2);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(6753).to({_off:false},0).wait(164).to({startPosition:1},0).to({_off:true},273).wait(1327));

	// othker
	this.instance_4 = new lib.lmxbmlBlXCbvXCB("single",0);
	this.instance_4.setTransform(189.25,132.4);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(6458).to({_off:false},0).wait(163).to({startPosition:1},0).to({_off:true},132).wait(1764));

	// basala
	this.instance_5 = new lib.basala2("synched",0);
	this.instance_5.setTransform(229.65,110.65,0.28,0.28,0,0,0,0.2,0);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(5992).to({_off:false},0).to({_off:true},466).wait(2059));

	// basala
	this.instance_6 = new lib.basala("synched",0,false);
	this.instance_6.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(5992).to({_off:false},0).to({_off:true},466).wait(2059));

	// takffff
	this.instance_7 = new lib.sdhsdfdfsh("synched",0);
	this.instance_7.setTransform(239.15,151.15);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(5704).to({_off:false},0).to({_off:true},288).wait(2525));

	// tafkeer
	this.instance_8 = new lib.adfadfgdsfag("synched",0);
	this.instance_8.setTransform(239.15,151.15);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(5286).to({_off:false},0).to({_off:true},418).wait(2813));

	// txt
	this.instance_9 = new lib.sdcvefcerferfer("single",0);
	this.instance_9.setTransform(239.15,151.15);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(4439).to({_off:false},0).wait(412).to({startPosition:1},0).to({_off:true},437).wait(3229));

	// Layer_9
	this.instance_10 = new lib.jhvjhvjj("synched",0);
	this.instance_10.setTransform(229.65,110.65,0.28,0.28,0,0,0,0.2,0);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(4008).to({_off:false},0).to({_off:true},210).wait(4299));

	// intro
	this.instance_11 = new lib.intromobilerrrrr("synched",0,false);
	this.instance_11.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(3998).to({_off:false},0).to({_off:true},220).wait(4299));

	// enbat
	this.instance_12 = new lib.ani5555555("synched",0,false);
	this.instance_12.setTransform(139.05,442.7,1.8007,1.8005,0,0,0,0.1,0.1);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(3361).to({_off:false},0).to({_off:true},636).wait(226).to({_off:false,startPosition:637},0).wait(48).to({startPosition:817},0).to({_off:true},168).wait(4078));

	// Layer_2
	this.instance_13 = new lib.vhhghghh("synched",0);
	this.instance_13.setTransform(391.2,393.45,1.2,1.2);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(3111).to({_off:false},0).to({_off:true},250).wait(5156));

	// Layer_13
	this.instance_14 = new lib.Fbabertagbtaet("synched",0);
	this.instance_14.setTransform(241.05,117.4);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(2957).to({_off:false},0).to({_off:true},404).wait(5156));

	// intro8
	this.instance_15 = new lib.intromobile8678687("synched",0,false);
	this.instance_15.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(2957).to({_off:false},0).to({_off:true},404).wait(5156));

	// Layer_5
	this.instance_16 = new lib.fnfgf("synched",0);
	this.instance_16.setTransform(-10.3,167.7);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(2411).to({_off:false},0).to({_off:true},546).wait(5560));

	// Layer_23
	this.instance_17 = new lib.dghfdgfddfg("synched",0,false);
	this.instance_17.setTransform(298.05,182.15);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1867).to({_off:false},0).to({_off:true},544).wait(6106));

	// ani
	this.instance_18 = new lib.intromo4545("synched",0,false);
	this.instance_18.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1846).to({_off:false},0).to({_off:true},565).wait(6106));

	// txt
	this.instance_19 = new lib.adfbfd("synched",0);
	this.instance_19.setTransform(242.5,64.45);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1202).to({_off:false},0).to({_off:true},644).wait(6671));

	// pic
	this.instance_20 = new lib.kjdbjkdfkdfdfg("synched",0);
	this.instance_20.setTransform(245.9,569.8,0.5,0.5,0,0,0,0.1,0);

	this.instance_21 = new lib.dgdrgdgdg("synched",0);
	this.instance_21.setTransform(239.5,371.05,0.5,0.5);

	this.instance_22 = new lib.srthyllll("synched",0);
	this.instance_22.setTransform(245.9,569.8,0.5,0.5,0,0,0,0.1,0);

	this.instance_23 = new lib.fjjhgjghjghjhghg("synched",0);
	this.instance_23.setTransform(239.5,355.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_21},{t:this.instance_20}]},1246).to({state:[{t:this.instance_23},{t:this.instance_22}]},297).to({state:[]},303).wait(6671));

	// txt
	this.instance_24 = new lib.sfbfgbgfggffg("synched",0);
	this.instance_24.setTransform(178.4,441.7,1.2,1.2);

	this.instance_25 = new lib.ergergegergsgs("synched",0);
	this.instance_25.setTransform(178.4,441.7,1.2,1.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},1202).to({state:[{t:this.instance_25}]},341).to({state:[]},303).wait(6671));

	// Layer_8
	this.instance_26 = new lib.khbjhbkccccccopy2("synched",0);
	this.instance_26.setTransform(20,373.7);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1109).to({_off:false},0).to({_off:true},84).wait(7324));

	// ani
	this.instance_27 = new lib.intromobile6egret("synched",0,false);
	this.instance_27.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1109).to({_off:false},0).to({_off:true},84).wait(7324));

	// txt_explor
	this.instance_28 = new lib.kskjsrhgbers("synched",0);
	this.instance_28.setTransform(230.5,146.65,0.2,0.2,0,0,0,0.2,0.2);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(699).to({_off:false},0).wait(398).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(7408));

	// Layer_1
	this.instance_29 = new lib.intromobile3("synched",0,false);
	this.instance_29.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(699).to({_off:false},0).wait(398).to({startPosition:398},0).to({alpha:0,startPosition:409},11).to({_off:true},1).wait(7408));

	// txt_3
	this.instance_30 = new lib.khbjhbkccccc("synched",0);
	this.instance_30.setTransform(14,408.75);
	this.instance_30.alpha = 0;
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(582).to({_off:false},0).to({alpha:1},8).wait(94).to({startPosition:0},0).to({alpha:0},12).to({_off:true},1).wait(7820));

	// sce_3
	this.instance_31 = new lib.intromobile2("synched",0,false);
	this.instance_31.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(548).to({_off:false},0).wait(132).to({startPosition:71},0).to({alpha:0},17).to({_off:true},1).wait(7819));

	// txt_2
	this.instance_32 = new lib.ljDFgkljDFg("synched",0);
	this.instance_32.setTransform(230.85,521.2,0.14,0.14);
	this.instance_32.alpha = 0;
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(338).to({_off:false},0).to({alpha:1},12).to({_off:true},191).wait(7976));

	// sce2
	this.instance_33 = new lib.ani1("synched",0,false);
	this.instance_33.setTransform(211,310,0.72,0.72,0,0,0,-5,2.6);
	this.instance_33.alpha = 0;
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(335).to({_off:false},0).to({alpha:1},12).to({_off:true},194).wait(7976));

	// txt_1
	this.instance_34 = new lib.txt1("synched",0,false);
	this.instance_34.setTransform(264.2,200.75,12,12,0,0,0,8.3,3.2);
	this.instance_34.alpha = 0;
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(160).to({_off:false},0).to({alpha:1},11).wait(72).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(8263));

	// txt2
	this.instance_35 = new lib.txt122("synched",0,false);
	this.instance_35.setTransform(270.3,210.65,14.4,14.4,0,0,0,8.3,3.2);
	this.instance_35.alpha = 0;
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(254).to({_off:false},0).to({alpha:1},9).wait(40).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(8202));

	// sce1
	this.instance_36 = new lib.intromobile("synched",0,false);
	this.instance_36.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(325).to({startPosition:303},0).to({alpha:0},10).to({_off:true},1).wait(8181));

	// BG
	this.instance_37 = new lib.hama("synched",0);
	this.instance_37.setTransform(269.95,-483.1,0.5555,1,0,0,0,53.8,-764.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(8517));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(76.3,241.3,570.3000000000001,643.5999999999999);
// library properties:
lib.properties = {
	id: 'F540AC4C55821E44A5E27BAABA137EBB',
	width: 480,
	height: 800,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/_16024105.jpg", id:"_16024105"},
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/Bitmap1_1.png", id:"Bitmap1_1"},
		{src:"images/Bitmap56copy.png", id:"Bitmap56copy"},
		{src:"images/Bitmap57.png", id:"Bitmap57"},
		{src:"images/Bitmap66copy.png", id:"Bitmap66copy"},
		{src:"images/Bitmap67.png", id:"Bitmap67"},
		{src:"images/Bitmap69.png", id:"Bitmap69"},
		{src:"images/Bitmap71.png", id:"Bitmap71"},
		{src:"images/Bitmap72.png", id:"Bitmap72"},
		{src:"images/Bitmap73.png", id:"Bitmap73"},
		{src:"images/Bitmap74.png", id:"Bitmap74"},
		{src:"images/Bitmap75.png", id:"Bitmap75"},
		{src:"images/Bitmap76.png", id:"Bitmap76"},
		{src:"images/Bitmap77.png", id:"Bitmap77"},
		{src:"images/Bitmap78.png", id:"Bitmap78"},
		{src:"images/Bitmap79.png", id:"Bitmap79"},
		{src:"images/Bitmap80.png", id:"Bitmap80"},
		{src:"images/Bitmap81.png", id:"Bitmap81"},
		{src:"images/Bitmap82.png", id:"Bitmap82"},
		{src:"images/Bitmap83.png", id:"Bitmap83"},
		{src:"images/dahliatubers1.jpg", id:"dahliatubers1"},
		{src:"images/ekormat.jpg", id:"ekormat"},
		{src:"images/image295.jpg", id:"image295"},
		{src:"sounds/_1.mp3", id:"_1"},
		{src:"sounds/_10.mp3", id:"_10"},
		{src:"sounds/_11.mp3", id:"_11"},
		{src:"sounds/_12.mp3", id:"_12"},
		{src:"sounds/_13.mp3", id:"_13"},
		{src:"sounds/_15.mp3", id:"_15"},
		{src:"sounds/_16.mp3", id:"_16"},
		{src:"sounds/_17.mp3", id:"_17"},
		{src:"sounds/_18.mp3", id:"_18"},
		{src:"sounds/_19.mp3", id:"_19"},
		{src:"sounds/_2.mp3", id:"_2"},
		{src:"sounds/_20.mp3", id:"_20"},
		{src:"sounds/_21.mp3", id:"_21"},
		{src:"sounds/_22.mp3", id:"_22"},
		{src:"sounds/_23.mp3", id:"_23"},
		{src:"sounds/_24.mp3", id:"_24"},
		{src:"sounds/_25.mp3", id:"_25"},
		{src:"sounds/_26.mp3", id:"_26"},
		{src:"sounds/_27.mp3", id:"_27"},
		{src:"sounds/_28.mp3", id:"_28"},
		{src:"sounds/_29.mp3", id:"_29"},
		{src:"sounds/_3.mp3", id:"_3"},
		{src:"sounds/_30.mp3", id:"_30"},
		{src:"sounds/_31.mp3", id:"_31"},
		{src:"sounds/_32.mp3", id:"_32"},
		{src:"sounds/_33.mp3", id:"_33"},
		{src:"sounds/_4.mp3", id:"_4"},
		{src:"sounds/_5.mp3", id:"_5"},
		{src:"sounds/_6.mp3", id:"_6"},
		{src:"sounds/_7.mp3", id:"_7"},
		{src:"sounds/_8.mp3", id:"_8"},
		{src:"sounds/_9.mp3", id:"_9"},
		{src:"sounds/yas.mp3", id:"yas"},
		{src:"sounds/no.mp3", id:"no"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['F540AC4C55821E44A5E27BAABA137EBB'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;