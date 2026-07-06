(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"maktabati_L1_HTML5 Canvas_atlas_1", frames: [[0,0,1920,1080]]},
		{name:"maktabati_L1_HTML5 Canvas_atlas_2", frames: [[0,1644,1653,264],[0,1330,1574,312],[0,1016,1634,312],[0,0,1600,1014]]},
		{name:"maktabati_L1_HTML5 Canvas_atlas_3", frames: [[1274,525,347,71],[1822,159,101,115],[1332,478,54,43],[1440,473,54,43],[699,356,65,52],[1973,159,54,43],[1973,204,54,43],[1925,249,54,43],[766,356,65,52],[1981,249,54,43],[1924,318,51,36],[1977,318,51,36],[1332,432,61,44],[1874,356,51,36],[0,0,881,354],[1822,0,183,157],[1925,159,46,52],[642,356,55,63],[1496,473,41,48],[833,356,43,59],[1274,432,56,77],[1395,432,43,59],[1924,294,87,22],[1440,432,63,39],[1874,276,48,48],[0,356,640,427],[642,432,630,300],[1540,302,332,221],[1540,0,280,300],[883,0,655,430]]}
];


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



(lib.CachedBmp_37 = function() {
	this.initialize(img.CachedBmp_37);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4853,277);


(lib.CachedBmp_36 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(img.CachedBmp_34);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4741,313);


(lib.CachedBmp_33 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(img.CachedBmp_21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,5710,313);


(lib.CachedBmp_20 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(img.CachedBmp_19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4134,282);


(lib.CachedBmp_18 = function() {
	this.initialize(img.CachedBmp_18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4122,277);


(lib.CachedBmp_17 = function() {
	this.initialize(img.CachedBmp_17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3922,285);


(lib.CachedBmp_16 = function() {
	this.initialize(img.CachedBmp_16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3965,1696);


(lib.CachedBmp_15 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(img.CachedBmp_12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2055,267);


(lib.CachedBmp_11 = function() {
	this.initialize(img.CachedBmp_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3725,329);


(lib.CachedBmp_10 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4865,313);


(lib._16024105 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib._6dpi20 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap18 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap19 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap20 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap49 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap55 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap56 = function() {
	this.initialize(ss["maktabati_L1_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();
// helper functions:

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


(lib.zdbdfvdvdsv = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("EAjkAJKIAOggQApAVBCgBQBeABBjhYQBkhaAPhmQgIgTgRgWQgtg/gkhMQAWgyAdg6IAHgBQAsBqAoArQAxA1BMAAIAmAAQBtgBAvilQAPg0A2g7QA7g2A6AAQBQAAA2BjQAxBWAMCFQgbB4hHAAQiBAAiUhuIgGAAQgkB5h9ABIgjAAQg+AAgggfIgEAAIACAhQAAAjgJAlQgKAogTAgQg0Bdg8AxQg4Asg2AAQhggBiIhIgEAxPAAGQghAYgUAtQAlA5BeAmQA/AbAwAAQAZAAAFgKQgThkgrg2QgmgwgvAAQgpAAgfAVgAXfIwQAtg8AegjQA3AoA5A7QghA2gtAlQgVgUhYhLgEg0sAIiQhEhNAAh/QAAhJAThGQAThCAggzIAkAQQgtBkAABLQAABtBEA8QA+A3BhABQBXgBBVg2QBXg4AShIQgGhHgZg8QgJgUg3hoQAWguAng0IAFAAQAdAzAeBZIAVA0QATAeAkAAQAfAAAggUQAngZANgvIAXhbIA4ggIAEAFQgKArAAAxQAAA0AiAdQAcAYAnAAQAUAAAOgLQAPgMAAgTQAAg2gehiQA0g+AegZIAFADQAUBnAABEQAAAzgdBEQgVAwghAcQglAfgpAAQghAAghgTQgjgTgYgjIgCAAQg9BXhhAAIgYAAQgGBSgaA7QgjBPhbA1QhZAzhjAAQiCAAhIhSgEgmDAILIALggQAzARA0AAQBggBBdhJQBahIAvhqQALgVAAgUQAAgNgOgkQgyhvg9hcQAkhCAegzIAFABIBDB+QAWAqAKAhQAOAuAAA2IAABnQAAB1h1CNQhRBVhJABQhiAAiNhIgEAiiAFWQAKhBAAh5IAAhbQAAjagiloQAqg2AygsIAIADQAYD/AAGPQAABegGA7QgCAlgUAjQgSAfgqAugAqhFWQAKhBAAh5IAAhbQAAjaghloQApg0AyguIAIADQAZD/AAGPQAABegHA7QgCAlgUAjQgRAfgrAugAS6FHQhPAAhRgcQhTgdhDg0IgEAAQhSA7hSAaQhJAXhYABIgyAAQhKgBgrgZQgygegZhKQhdAphbAAQhNAAgtgbQgvgcAAg2QAAgrAdhBQA4h6DyiGIgGhFQAmgtAkggIAKAAQAEClABEMQAAAyAIAeQAIAiAUARQAcAZBFAAIA+AAQBHgBAsgGQA9gLBEgdIAAgEQgagRgngmIhChBQgpgmgXAAIgdAAIgCgCIAkhrIAdgDQCKgfBvAAQCfAABvAvIghBkIiiCVIAAAEQBgA0B0AAIBeAAQBxAAB4gqQB4goCQhXIABgEQivhAh1AAQhNAAgpAtIALAvIgcBUIgJAAIguh7QAGhMA4gtQA3guBVABQBoAADJBRQBJAcBWACIBLgBIADABIgxBhQhngDg6AmIibBlQjAB8jTABgAA5BHQAAAaAkAOQAgAMAzAAQA5AABRgaIgFjkQj8CCAABIgALpgfIAAADQAQAPAmAlQAvAsBFAwIAEAAQBohLBDg/IAAgDQhkgYhJAAQhUABhYARgAx+FHQhEAAgtghQgzglgahSIgFAAQgLA4g4AhQhlA/hVAAQhOAAgqguQgqgsAAhSQAAgfACgmIAlgDQAFB9B+AAQAjAAArgOQAmgNAkgUQAagPARgTQARgTAAgRQAAgqgWheQgPg+goiTIAggxQATgcAPgTIAFAEQAtCtAsDwQAMBDApAmQAoAkA2AAIAkAAQA5AAAvgaQAxgcAAhIQgCjBgYkhIgGg+QgEghAAgWQAAgfAcgfQATgXAggcIAHAFQgDBUBOCBQgbAYgfAYIAHCiQAFBjAAA9QAACcgmBNQgQAogRAYQgVAdgeAPQg3Acg9AAgABbotQAkgyAlgmQAvAkA7A/QgpA7geAaQg0gxg4gvgAEOo6QAjgvAngpQAvAlA7A/QgoA5gfAdQgzgxg6gxg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-344.1,-65.8,688.3,131.7);


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
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(123.4,18.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(8.5,-15.3,229.8,67.7);


(lib.shape199 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AgtAUIAFgVQAFgKANgGQANgHAIAHIAFAKQACAFgOAFQgOAFAAAMQgBALgLAAQgLAAAAgLgAARgLIgFgHIAFgJIALgDIANADIAFAJQAAAFgFACQgFAEgIAAg");
	this.shape.setTransform(-5,-0.375);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(112,112,253,0.498)").s().p("AhvAXQgJgcAXgRQAXgSAygJQAwgJAxAUQAyAUgKAlQgLAlgvgHIhIgDIg5AGQgcAAgJgdg");
	this.shape_1.setTransform(0.8075,0.0103);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.6,-5.2,22.9,10.5);


(lib.shape198 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#6D0101").s().p("AjDC9QgOgDgIgLQgHgLABgOQADgNALgIQD4ivDACmQAKAJABAOQACAOgJAKQgKALgNABQgNABgMgJQiciDjJCPQgJAGgKAAIgGAAgAh3ARQgNgMgCgPQgBgRAKgMQAMgNAQgBQARgCANAKQANALABARQABARgLAMQgKAMgRACIgCAAQgPAAgMgJgAAzACQgOgKgBgRQgBgRALgNQALgMAQgCQARgBANALQAMAKABARQACAQgKANQgLAMgRABIgFAAQgNAAgLgIgAjTgRQgOgBgJgKQgJgLABgOQABgNALgJIB3hjQAKgJAOABQAOABAJALQAJAKgBAOQgBAOgLAJIh3BjQgJAHgLAAIgEAAgACzgcIh7hkQgLgJgBgOQgCgOAJgKQAJgLAOgCQAOgBAKAJIB8BkQALAIAAAPQACANgJALQgIALgOABIgEAAQgLAAgKgHg");
	this.shape.setTransform(-30.45,-11.5519);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#B30000").ss(2,1,1).p("Al3p6IjkEyIGIEbIlqG7IEsDtIE9nwIGMEeICkipImRlsIDulyIjKh5Ij0Etg");
	this.shape_1.setTransform(-29.45,2.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("Ao9GOIFqm7ImIkbIDlkyIFxFQID0ktIDKB5IjtFyIGQFsIikCpImMkeIk9HvgAoylOIFwEKIAKAMQACAHAAAIQgCAIgFAGIlXGkID8DHIEsnVQAEgGAIgEIAPgCQAIAAAGAEIF4EPIB9iBIl6lXQgIgHgBgLQgCgKAGgJIDelaIibhdIjmEaQgFAGgHADIgPABQgIgCgGgEIlak7g");
	this.shape_2.setTransform(-29.45,2.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#FF0000","#FF9900"],[0.306,1],0,-52.1,0,52.2).s().p("AnrGFIFFmOQAKgNADgPQACgQgGgPQgHgPgNgJIlYj4ICbjRIFDElQAMALAQADIAdgCQAPgGAKgMIDWkGIBsBBIjNFAQgMASADAUIAAABQADAUAPAPIFlFDIhYBbIljkBQgNgJgQgCQgQgBgOAHQgPAHgHANIkdG7g");
	this.shape_3.setTransform(-29.525,2.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AoTGJIFXmkQAFgGABgIQABgIgDgHIgKgNIlwkJIDAkBIFaE6QAGAFAIACIAOgBQAIgDAFgGIDlkaICbBdIjdFaQgGAIABALQACAKAHAIIF6FXIh9CBIl3kPQgHgEgIgBIgPADQgHADgFAHIkrHVgAoJlUIFYD4QANAJAGAPQAHAPgCAQQgDAPgKANIlFGOIDMChIEcm7QAIgNAPgHQAOgHAPABQAQACANAJIFkEBIBYhbIlmlDQgOgPgDgUIAAgBQgDgUALgSIDOlAIhshBIjWEGQgKAMgPAGIgdACQgQgDgMgLIlDklg");
	this.shape_4.setTransform(-29.5,2.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.071)").s().p("AkVJ4IkojqIFmm2IACgCIgBgEIgCgCImDkYIDhksIAEADIAEgEIFpFHIACACIAEgBIACgBIDwkpIC7BxIgDAEIi2htIjvElIgDADIgHAAIgFgCIlplIIjcEoIF9EUIAEAFIABAGIgCAGIljGxIEjDlIE2nlIAFgEIAGgBQADAAADACIGCEXICViZIAEAEIiYCdImHkaIgCgBIgEABIgCACIk6HpgAJNEHIAHgHIgHgGIACgGIgEAEImAlcIgDgGIABgJIDilfIAFADIjiFfIgBAFIACADIGNFnIgMANgAGwnPgAGsnUIAFgHIgIgGIACgFIAOAJIgJAOgAl3p0IgDAAIAEgGIAEAFIgCABIgDAAg");
	this.shape_5.setTransform(-28.475,6.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.149)").s().p("AorGMIFfmtIAEgIIgBgKIgGgHIl5kQIDVkfIFkFEIAIAEIAJgBQAEgCADgDIDrkhICyBrIgDAFIiuhoIjoEcQgEAFgGADIgLABQgGgCgFgEIlfk/IjOEVIF0EMIAIAKQACAGAAAGIgFAMIlcGoIEQDWIEwnaQADgGAGgCIAMgDQAGABAGAEIF6ERICNiSImAlbQgGgGgBgIQgBgJAFgHIDhlfIAFADIjhFfQgEAGABAGQABAGAEAEIGAFcIgEAEIAEAEIiQCWIl/kVQgEgDgFAAIgIACIgHAGIk0Hgg");
	this.shape_6.setTransform(-28.675,6.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.11)").s().p("AkWJ3IAAAAIAAAAgAo1GNIFjmyIACgGIgBgGIgEgFIl+kTIDdkoIgEgEIADABIAAAAIADgBIABgBIgDAFIFpFHIAFADIAGgBIAEgDIDuklIC3BuIgDAFIizhrIjqEgQgEAEgDACIgJAAIgJgEIljlDIjWEfIF5EQIAHAHIABAJIgEAJIlfGtIEZDdIE0ngIAHgGIAIgBQAFAAAEADIF+EUICRiVIAFAEIiVCZImDkYQgCgCgDAAIgGABIgFAEIk2HmgAJMEEQAAADgBgDIAAAAIABAAIgBgIIACgDIAHAGIgHAHgADHhgQgEgFgBgGQgBgGADgFIDilgIAFADIjiFgIgBAIIADAGIGAFcIgEAFgAGqnWIAAAAQgBgBAAAAQAAgBAAAAQAAAAABABQAAAAABABIAAABIgBgBgAGrnWIgEgJIACgCIAIAFIgFAHg");
	this.shape_7.setTransform(-28.45,6.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(0,0,0,0.2)").s().p("AorGLIFcmpIAEgLQABgGgDgGIgHgKIl1kNIDPkUIFfE+QAEAFAHACIAMgBQAFgDAEgFIDokdICuBpIjhFfQgFAHABAJQABAIAGAFIGAFcIiNCSIl7kRQgFgFgGAAIgNACQgFADgEAFIkwHbgAJGEIIgFgEIgEgEIAEgEIAEgEIAEgEIgCAFIgCADIABAIIgBAAIAAAAQABAEAAgEIABADIACAEgAGlnTIgFgDIgFgCIADgFIADgFIADgFIABAAIgCAGIgCACIAEAJIABABIADAGgAGknWIAAAAQABADAAgDIgCgBIABABgAGbnYg");
	this.shape_8.setTransform(-27.85,6.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(0,0,0,0.031)").s().p("AkVJ/IksjsIgCgEIACgEIFmm3ImDkXIgDgEIACgEIDkkyIADgCIADAAIADABIFtFMIDwkoIADgCIAEAAIDKB5IACADIABACIgBADIjrFvIGNFnIABADIABADIgCADIikCpIgDACIgEgCImHkaIk6HrIgDACIgDAAgAl6p1IjhEtIGDEYIACACIABADIgCADIlmG2IEoDpIAEADIE6nqIACgCIAEAAIACABIGHEaICYidIAMgNImNlnIgCgEIABgEIDilfIAJgPIgOgIIgBgBIi7hwIjwEpIgCABIgEABIgCgCIlplIIgEgEgAkWJ4IABgBIgBAAg");
	this.shape_9.setTransform(-28.475,6.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-90.8,-62.2,123.3,132.9);


(lib.shape194 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#3C5500").s().p("Al/CeQgZgCgRgTQgQgUACgaQACgZATgRIDci1QATgRAaACQAZACARAUQARATgCAaQgDAZgTARIjcC2QgRAOgWAAIgGAAgAFUCJIjki4QgUgRgDgZQgDgaARgTQAQgUAagDQAZgDAUAQIDkC4QATAQADAaQADAZgQAUQgRAUgZADIgHAAQgWAAgQgNg");
	this.shape.setTransform(0.0311,-6.7629);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44,-22.6,88.1,31.700000000000003);


(lib.shape193 = function(mode,startPosition,loop,reversed) {
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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3C5500").s().p("ABHATQgEgEAAgFIgCgGIgFgCIgGACIgDAGQAAAFgDAEQgEADgEAAQgFAAgDgDQgEgEAAgFQAAgMAJgKQAJgJAOAAQAMAAAKAJQAJAKAAAMQAAAFgEAEQgDADgFAAQgFAAgDgDgAguATQgEgEAAgFIgCgGIgGgCIgGACIgCAGQAAAFgDAEQgEADgEAAQgFAAgEgDQgEgEAAgFQAAgMAKgKQAJgJANAAQANAAAJAJQAKAKAAAMQgBAFgDAEQgDADgFAAQgFAAgDgDg");
	this.shape.setTransform(-9.925,-7.375);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3C5500").s().p("Ag1BLQgngRgcgRQgjgVgOgUQgQgXAPgfQAJgWAVgHQAXgIAZARQAaARAUAIIAuAIIAwgIQATgIAagRQAagQAXAHQAUAHAKAWQAKAVgGAVQgHAXgZAPQgmAZgfAQQghARgqADQgagEgbgIgAiCg7QgNADgGANQgGAMAEANQAEAPAPAJIBBAmQAcAKAcAGIA1gGIAwgUQBOgsgRghQgHgNgLgEQgOgEgPALIgmAWIgNAGIhAAJIgogJIgygcQgMgIgJAAIgIACg");
	this.shape_1.setTransform(-9.4572,7.8444);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhDAtIhBgmQgPgJgEgPQgEgNAGgMQAGgNANgDQANgFAQALIAyAcIAoAJIBAgJIANgGIAmgWQAPgLAOAEQALAEAHANQARAhhOAsIgwAUIg1AGQgcgGgcgKg");
	this.shape_2.setTransform(-9.4537,7.7448);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#499201").ss(2,1,1).p("AHWhRIqiJUIkJiIIApmeIDFD2IHbrVg");
	this.shape_3.setTransform(14.05,-26.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#92D400","#FFFF00"],[0.306,1],0,-42.9,0,43).s().p("AmtFUIAekqICYDAQAKAMANgBQAMgBAJgNIHBqtIC4FfIp5Iug");
	this.shape_4.setTransform(13.525,-25.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AnBFnIAklkICuDbQAEAGAHABQAGgBAFgHIHOrBIDNGIIqOJBgAmvFZIDiBzIJ4ouIi3lfInBKuQgKANgMAAQgNABgKgMIiYi/g");
	this.shape_5.setTransform(13.8,-25.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C0E601").s().p("AnVF8IApmfIDFD2IHbrVIDiGyIqiJTgAnEFsID2B+IKNpBIjNmIInOLBQgEAHgGABQgHgBgEgGIivjbg");
	this.shape_6.setTransform(14.05,-26.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	// Layer_1
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.071)").s().p("AnVF8IApmfIDBDyIACABIADAAIACgCIHXrQIDjGyIqjJTgAnRF5IEECEIKepOIjemoInULKQgBACgCABIgGAAIgFgDIi5jpg");
	this.shape_7.setTransform(14.45,-24.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(0,0,0,0.11)").s().p("AnQF3IAomQIC6DoIAEADIAGAAQADgBABgCIHTrKIDeGoIqdJPgAnLF0ID+CCIKYpKIjZmeInOLDIgHAFIgIABQgEgCgCgDIi0jgg");
	this.shape_8.setTransform(14.4,-23.925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(0,0,0,0.2)").s().p("AnFFvIAkl1ICsDXIAKAGIALAAQAFgCADgFIHLq9IDUGUIqUJHg");
	this.shape_9.setTransform(14.3,-23.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(0,0,0,0.149)").s().p("AnKFzIAlmCIC0DgQACADAFABIAIgBIAGgEIHPrEIDYGeIqYJKgAnGFxID4B/IKUpHIjTmUInLK9QgDAFgFACIgLAAIgKgGIisjYg");
	this.shape_10.setTransform(14.35,-23.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(0,0,0,0.031)").s().p("AjPIHIkIiIIgCgCIgBgCIAqmfIABgDIADgBIAEACIDADxIHYrQIACgBIADAAIACACIDjGxIABADIgCADIqiJTIgDABgAnVF7IEICIIKjpUIjjmxInXLQIgCABIgDABIgCgCIjBjxg");
	this.shape_11.setTransform(14.45,-24.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.9,-78.8,96,106.69999999999999);


(lib.shape175Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("AgYAlIAAAAIgHgEIgCgBIAAAAIgIgFIgCgEIABgDIAAgBQgHgJgDgTIgDgCIgCgDIACgEIAOgKIASgIIABAAIAAAAIABgBQAzgKAQARQASASgJAWQgJAWgaAIIgaACg");
	this.shape.setTransform(0.0389,-0.0219);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.7,-4.2,11.600000000000001,8.4);


(lib.shape172Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("AD7G4IgYgCIgFgBQgrgMgYg4QgfhIgPhMQgQhMgFg1QgCgbgIggIgBAAIgDgOIgQguIgBgCIDekkIABACIABAAIABAEIADALIAAABIABABIAHAbIAEASIAEASQAJAnAEAkIAAABIAAADIABADIAAABIAAABIAKB7IABAmIAFCrQABBSgFBYQgGBbhDACgAh1gUQgrgCgngOQgfgMgagRQghgVgSggQgXgmAAguQgBgjALghIAMgeIAAAAIADgHIACgFIAHgOQAcg1A3gZQA1gZAjgGIABAAIBMgEIBaAFQAzADAiALQAhAKAqAVIADABIAFADIAFADIAAgBQARAJAOALQATAPALAUIADAFIAAABIjiEmIgDABIgBAAIhRAJgAhAiyIABAAIAAgBIgBAAIgGAAg");
	this.shape.setTransform(2.1822,22.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgBAAIADAAIgDAAg");
	this.shape_1.setTransform(7.3125,20.1125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.9,-21,66.19999999999999,88);


(lib.shape169Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("AjTG0QghgCgSgPQgSgOgEgJIAAABIgLgYIAAABQgHgPgKghIgThTIgOhaIgOhTIgKgxIAAgBIgCgPIgKgqIAAgBIgBg/QACgnARgrIAAABQALggANgTQANgTASgUIArgnIAAgBQAggUAagOIAggRQATgMALgFQApgTAkgLQAjgMAegDIBLgIIABAAQAugEAuAEQAuADA1AcQAwAYAaAgIAAABIAcAsIAAABIANAjQAUBohNBHQhEBAhbAMIgBAAQhXAKhNgmIAAAAIgEgDIgQBbIgMA7IgOBHIgLA8IAAABIgMAvQgBAIgHAUIgRAqIAAABIAAAAIgNAcQgNAagcAPQgYAMgbAAIgKAAgAh1EIIAAgBQACgCAIgBIAJAAIgIAAQgKAAAAADIgBAAIAAABg");
	this.shape.setTransform(0.0155,-0.0066);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.3,-43.6,76.69999999999999,87.30000000000001);


(lib.shape166Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000066").s().p("AhLAgIgBgDIAAgDIABgCIADgBQAZgCAIgFQAHgGACgQQAEgWAMgLQALgMAOgCIAbABIAAAAQANADALAIQAMAIADAUIAAADIgCADIgDAAIgDgBIgLABIAAAAQgRAHgDANIAAAAQgEAQgIAKIAAABQgJAKgdAEIgIAAQgaAAgdgWg");
	this.shape.setTransform(0,0.0767);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-5.3,15.5,10.8);


(lib.shape163Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000066").s().p("AhhAhQgfgZAOg5IABgDIADgBIADAAIACACQASAiAXAFIAqgCIAvgUIA5gCIABAAIALAHQAWAPADAmIgBAEIgDACIgDgBQgigTgZATQgcAWgtADIgKAAQgnAAgcgVg");
	this.shape.setTransform(0.0096,0.0167);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.9,-5.4,23.9,10.9);


(lib.shape160Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000066").s().p("AAVA2QgtgDgcgWQgZgTgiATIgDABIgDgCIgBgEQADgmAWgPIALgHIABAAIA5ACQAcANAUAHIAoACIABAAQAWgFATgiIACgCIADAAIADABIABADQAOA5gfAZIgBAAQgbAVgnAAIgKAAg");
	this.shape.setTransform(0.0298,0.0167);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.9,-5.4,23.9,10.9);


(lib.shape157Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("Ag3ATQgPgfAXgSIAAAAQAVgSAXACIAfAGIAGACIABABIAJAEIAAAAIAKAIIAIAJIAAAEIgCADIgCABIgBAEIgHAPIgMAOIABADIgCADIgNAJQgIAFgaACIgFAAQgaAAgOgcg");
	this.shape.setTransform(-0.0211,-0.0058);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.2,-4.7,12.4,9.4);


(lib.shape154Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#00B058").s().p("AhKFbQgFgYAHgPQAHgPABgNQABgOgCgIIgYg3QgVgvADglIADgdQAEgVAIgSQANggAJgNQAKgMAKgSQAKgSAEgXIADgcQADgvgPgnQgOgmgVgrIgDgQQABgpAhAaQgKgTAIgOQAHgNATAFIAMAQQgBgbATgIQAUgHAEApIAKgOQAMgNAMAQQAGAQgHAKQARgSAOAQQAKAPgPAjIgcA+QgOAbgEAoQgEAaAIAiQAEANAHAOIAaAwIASAuIADAQIADASQADAZgDAhQgEAsgUApQgUApAAAKQgBAJAHASQAHARgCASIgPADIgBAAIgmACIg3ACg");
	this.shape.setTransform(0.0242,-0.2824);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.8,-35.5,21.700000000000003,70.5);


(lib.shape151Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("Ah9G9QgGgBgDgEQgFgFABgGQBFoiCBjrQgDgFgCgIIgBgEIAAgBQAAggAagiIABAAQADgFAFgBQAmgJAMAhIAAAGIAAABQgDAegKAQIgBABIgQATIgBABQgNAHgJABQh+DohEIYQgBAGgEAEIgLADg");
	this.shape.setTransform(-0.0091,-0.0062);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.9,-44.5,27.8,89);


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


(lib.shape148Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("AhVHlIAAAAQgFgFAAgGQAGpoBmj6QgEgFgDgIIgBgEIAAgBQgDggAXgkQACgFAFgBQAlgOAPAfIACAHIAAAAQAAAegJARIgOAWIgBABQgLAJgKABQhkD3gGJfQAAAGgEAFIAAAAQgFAEgGAAQgGAAgEgEg");
	this.shape.setTransform(0.025,0.0096);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-48.9,18.1,97.9);


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


(lib.shape145Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("AgIH8QgGAAgFgDIAAgBIgFgKQgSp5AXkBQgHgDgFgHQgIgNAAgQIABgeQACgSALgOIAGgFIAJgEQAYgDAKAHIAMANIAEASIAAAUQACAVgGANQgFAOgJAEQgJAFgBgBQgBgBgCANQgUECAQJqIgDAKIgBABQgDAEgGAAg");
	this.shape.setTransform(-0.0089,-0.0179);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-50.8,8.1,101.6);


(lib.shape142Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#006600").s().p("ABJHnIAAgBQgEgEAAgGQgHpbhrjwQgDACgJgCQgJgCgHgKIgLgUIgGgQIgGgVQgEgPAEgNQAEgOAMgFIANgGIAOgBQAOAAAJAMQAJANAIAcQAHAbgBAPQgBAOgIAFQBsD4AHJcQAAAGgEAEIgBABQgEAEgGAAQgGAAgFgEg");
	this.shape.setTransform(-0.125,-0.426);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-49.5,19.8,98.2);


(lib.shape139Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#006600").s().p("ABxGvQgFgEgBgGQhAoDh+joQgJAAgNgIIgBgBQgGgEgKgQQgLgQgDgeIAAAAIABgHQALghAmAKIAJAFQAaAiAAAhIAAAAIAAAEIgGAOQCBDrBBILQABAGgEAFQgEAFgGABIgDAAQgFAAgDgDgAhPlUIAAAAIgBgBgAhUljIACgBIgBgBgAhXlmIgBgBIgBAAgAhRlpIAAACIABgEg");
	this.shape.setTransform(0.01,0.0038);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAEAMIAAgBIABABgAABgEIABAAIgCABgAgEgHIABABIAAAAgAADgJIAAgCIAAAEg");
	this.shape_1.setTransform(-8.45,-35.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-43.4,27.4,86.8);


(lib.shape136Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("AAqDRIgCgDIAAgBIhIgGIgCADIgEABIgDgCIgBgDQAHg9ABgmQAAgcgBgbQhJgbgPgcQgQgdgFgXQgGgZANgqQAMgqAtgXIADgCIAVgJIABAAIBYgDIAAAAIALABIAAABIAXAFQAHgBABAFIABACIAIAAIAaAPQAXARAHAeQAHAbAAAbIAAAAQgBAbgIAWQgIAVgaAXQgZAXgmAHIAAAzQABAZAIBWIgBAEIgDABg");
	this.shape.setTransform(0.0294,0.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.6,-20.8,29.299999999999997,42.1);


(lib.shape133Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("AElIdQgdgLgVgYQgWgYgVg1QgWg2gLhRIgQhwQgGgggOglQgPgmgZgjQgZgjg5gvQg3gwhOAPQhRAOg5ACIgBAAIgQAAIgegFQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAgBgBAAIAAgEIAAAAQgmgOgYgiQgYgggJgnQgIgigBghQAAgYAEgZIABgJIAGgYIAFgOQAMgdAZgjQAZgiAhgaQAhgZAjgQQAjgRAggHIBHgHIBEAIQAdAIAgANQAhAOAcASIAsAhIAlApIAGAHIADgCIAEACIABAEIgCADIAjAmIAFAGIABgDIAAgDIAaAlIAAAAIAEAFIAfAzQAPAbAKAbIARAyIAOAsQAIAVAQBBIASBYIAOBUIAAAAQALA9ADAnIAEBUIABBbQAAAugKArQgLAtgmACIgKAAQgfAAgYgIgADfliIABgBIgEgEg");
	this.shape.setTransform(0.2234,0.2602);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.4,-54.6,83.3,109.80000000000001);


(lib.shape130Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003399").s().p("AlWIeQgUgHgTgQQgugnABgsIAChNQABgkAEgWIAJg4IAQhgIAAgBIAOhUIAUhZIAYhXIAOgsIARgyQAKgbAPgbIAAABQAOgcAWgfIAQgVIAAgBIAAgBIAigsQAcgkAdgYIAAABIA0goQAYgRAjgNIgBAAIA+gWQAegJAoAAIBIAHQAgAIAkARIAbAOQAWAMAUAPQAhAbAaAiQAZAkANAdIgBAAQANAeADAtQADAsgNA2QgNA0glAkIAAAAQgmAkg8gCIiVgJIgHAAIgvABQgzAGggAcQgyApgNAmQgOAngKAtIgRBQIgSBRIgaBnQgQA5geAlQggAlgtAMIgBAAIgFABg");
	this.shape.setTransform(0.003,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.6,-54.6,85.30000000000001,109.2);


(lib.shape127Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003399").s().p("AgZJ8IgKgIIgBgBQgegdgTg8QgWhFgHhZIgMieIgHh6IgHhjQgEhfg0gpIhqhSQg3gpgPhMQgPhNAig9IAAAAQAhg8A3gqQA2gqBfgTQBegSBfAHIBQANIAAAAIACAAIABABIABAAIANADIgBAAIAPAEIABABIACAAIAaAKIATAIIADABIABABIAAAAIAEACIAFADIAAgBIAVAMIAAAAQA7AkAcA1QATAjAFAjQADAXgEAXIgCALQgJAwgYAtIgBABQhCBNgxArQgLAJgIAOIAAgDIAAABIgBADIgEAGQgaAtgGBUIAAABQgLAsgGBLIAAAAIAAAFIAAABIgBAEIAAABIgMCVQgFA9gNBJIgLA8QgWBtgjAoQgXAZgXAAQgPAAgRgNg");
	this.shape.setTransform(-0.008,0.0168);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.8,-64.8,75.6,129.7);


(lib.shape124Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("AhMA6IgMgIIgCgCIgBgCIgCgTQAAgVAIgSQAHgVAIgGIAYgQIACgBQAZgDALAEQALADAOAOIAAAAQAKALAMgCQAMgCAKgGQAKgHAHgEIAJgHIADgBIADACIABAEIgCAVQgDATgIAPIgLANIgSALQgMAHgSgBIgBAAQgSgCgIgFQgIgEgGgCIgTAAQgMABgGAFIAAAAIgHAJIgFASIgCACIgDABg");
	this.shape.setTransform(-0.0015,0.0183);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-5.8,18.8,11.7);


(lib.shape121Hit = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#003366").s().p("ABJA6IgCgCIgIgVIgLgKQgGgEgJAAIgBAAIgPABQgHABgIAFQgIAFgSABQgTABgMgGIAAAAIgSgMIgKgNIgBAAQgIgPgDgSIgCgWIABgDIADgCIAEABIAJAHIARAKQAJAGANADQALACALgLQANgPALgDIAAAAQALgEAaAEIABABIAYAPIABAAQAHAGAIAVQAHATAAAUIAAABIgCATIgCADIgLAJIgDABg");
	this.shape.setTransform(-0.025,0.0433);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-5.8,18.8,11.8);


(lib.shape116 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("AAiAbIgMAJIghAGQgaACgOgbQgNgbAUgQQAUgRAUACIAeAGIAGACIABAAIAIAEIAJAIIAHAI");
	this.shape.setTransform(-0.022,-0.004);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009D4F").s().p("AgzARQgNgbAUgQQAUgRAUACIAeAGIAGACIABAAIAIAEIAJAIIAHAIIAAAJIgHAPIgQAQIgMAJIghAGIgDAAQgYAAgNgZg");
	this.shape_1.setTransform(-0.022,-0.004);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.7,-5.2,13.4,10.4);


(lib.shape114 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("Ag0gNIABgBIANgKIARgHIABgBQAwgKAPAQQAPAPgHATQgIAUgYAHIgYACIgQgEIgHgFIgCgBIgIgF");
	this.shape.setTransform(0.025,-0.0211);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009D4F").s().p("AgVAhIgHgFIgCgBIgIgFQgLgHgDgcIABgBIANgKIARgHIgBAAIACgBQAwgKAPAQQAPAPgHATQgIAUgYAHIgYACg");
	this.shape_1.setTransform(0.025,-0.0211);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00B058").s().p("AgPAKIABAAQAMgLASgJIgBAEIgQAGIgNAKIgBABg");
	this.shape_2.setTransform(-3.7,-2.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.3,-4.7,12.7,9.4);


(lib.shape112 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("ABJgMQgEgSgJgHQgLgIgMgCIgZgBQgMACgKAKQgLALgDAUQgDASgJAHQgIAGgcACQAfAYAdgDQAbgEAHgJQAIgJADgPQADgOAUgJg");
	this.shape.setTransform(-0.025,0.0719);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC66").s().p("AhIAcQAcgCAIgGQAJgHADgSQADgUALgLQAKgKAMgCIAZABQAMACALAIQAJAHAEASIgRABQgUAJgDAOQgDAPgIAJQgHAJgbAEIgHAAQgaAAgbgVg");
	this.shape_1.setTransform(-0.025,0.0719);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.3,-5.8,16.6,11.8);


(lib.shape110 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("ABRgfIg1ACIgwAUIgsACQgZgEgUglQgNA1AdAYQAdAXAsgDQArgDAcgVQAbgVAlAVQgEgkgUgOg");
	this.shape.setTransform(-0.0012,0.0173);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC66").s().p("AhdAdQgdgYANg1QAUAlAZAEIAsgCIAwgUIA1gCIAKAGQAUAOAEAkQglgVgbAVQgcAVgrADIgKAAQgmAAgZgUg");
	this.shape_1.setTransform(-0.0012,0.0173);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.4,-5.9,24.9,11.9);


(lib.shape108 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("ABBgHQAZgEAUglQANA1gdAYQgdAXgsgDQgrgDgbgVQgcgVgkAVQADgkAUgOIAKgGIA2ACIAwAUg");
	this.shape.setTransform(0.0262,0.0173);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC66").s().p("AAVAxQgrgDgbgVQgcgVgkAVQADgkAUgOIAKgGIA2ACIAwAUIArACQAZgEAUglQANA1gdAYQgZAUgmAAIgKAAg");
	this.shape_1.setTransform(0.0262,0.0173);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.4,-5.9,24.9,11.9);


(lib.shape106 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("ABXgeQgDASgHAOIgKAMIgRALQgLAGgRgBIgZgGIgPgHIgUAAQgOABgHAGIgJAMIgFARIgNgIIgCgSQAAgUAHgSQAHgTAHgGIAXgPQAYgDALADQAJADANAOQANANAOgDQANgDALgGIAQgLIAJgHg");
	this.shape.setTransform(0.0484,0.0125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC66").s().p("AhWAtIgCgSQAAgUAHgSQAHgTAHgGIAXgPQAYgDALADQAJADANAOQANANAOgDQANgDALgGIAQgLIAJgHIgCAVQgDASgHAOIgKAMIgRALQgLAGgRgBIgZgGIgPgHIgUAAQgOABgHAGIgJAMIgFARg");
	this.shape_1.setTransform(0.0484,0.0125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.8,-6.3,19.8,12.7);


(lib.shape104 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("AAtgzQgYgEgLAEQgKADgMANQgNAOgNgDQgOgDgKgHIgRgKIgJgHIACAVQADASAIAOIAJALIARALIAdAFIAYgGQAIgEAHgCIASgBQAKAAAIAFQAHAEAFAHIAJAWIALgJIACgTQAAgTgHgSQgHgTgHgGg");
	this.shape.setTransform(-0.025,0.0375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC66").s().p("ABDAgQgFgHgHgEQgIgFgKAAIgSABQgHACgIAEIgYAGIgdgFIgRgLIgJgLQgIgOgDgSIgCgVIAJAHIARAKQAKAHAOADQANADANgOQAMgNAKgDQALgEAYAEIAXAPQAHAGAHATQAHASAAATIgCATIgLAJg");
	this.shape_1.setTransform(-0.025,0.0375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.9,-6.4,19.8,12.9);


(lib.shape102 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("ABlmIQiEDohFIp");
	this.shape.setTransform(-2.3,3.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AgRAlQgGgEgEgMQABgbAXgeQAXgGAIAUQgDAZgIAOIgOAQQgMAJgIgFg");
	this.shape_1.setTransform(9.625,-39.1516);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC66").s().p("AgRAlQgGgEgEgMQABgbAXgeQAXgGAIAUQgDAZgIAOIgOAQQgHAFgHAAQgDAAgDgBg");
	this.shape_2.setTransform(9.625,-39.1516);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.4,-44,26.8,88);


(lib.shape100 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("AA4mzQhqD2gFJx");
	this.shape.setTransform(-1.95,3.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AgNAmQgHgDgEgMQgDgbAUgfQAWgJAKATQAAAZgHAOIgLASQgLAKgJgEg");
	this.shape_1.setTransform(5.0608,-43.4748);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC66").s().p("AgNAmQgHgDgEgMQgDgbAUgfQAWgJAKATQAAAZgHAOIgLASQgHAHgHAAIgGgBg");
	this.shape_2.setTransform(5.0608,-43.4748);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.5,-48.4,17.1,96.9);


(lib.shape98 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("AAHnCQgYD8ASKJ");
	this.shape.setTransform(-1.048,4.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AgDAoQgHgCgHgKQgKgaAMgiQATgPAOAQQAHAZgDAPIgHAUQgJANgJgCg");
	this.shape_1.setTransform(0.0435,-45.0809);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC66").s().p("AgDAoQgHgCgHgKQgKgaAMgiQATgPAOAQQAHAZgDAPIgHAUQgIALgHAAIgDAAg");
	this.shape_2.setTransform(0.0435,-45.0809);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.2,-50.1,6.5,100.30000000000001);


(lib.shape96 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("Ag9mwQBzDxAIJw");
	this.shape.setTransform(2.1,3.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AAQAlQAGgDAEgMQACgbgVgfQgXgHgJATQABAZAIAOIAMASQALAJAJgFg");
	this.shape_1.setTransform(-5.62,-43.2311);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC66").s().p("AgEAhIgMgSQgIgOgBgZQAJgTAXAHQAVAfgCAbQgEAMgGADQgDACgDAAQgHAAgHgGg");
	this.shape_2.setTransform(-5.62,-43.2311);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.2,-48.1,18.5,96.30000000000001);


(lib.shape94 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("Ahil9QCEDoBBIT");
	this.shape.setTransform(2.3,3.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AASAlQAGgEAEgMQgBgbgXgeQgXgGgIAUQADAZAJAOQAIANAFADQAMAJAIgFg");
	this.shape_1.setTransform(-9.425,-38.0516);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC66").s().p("AgCAhQgFgDgIgNQgJgOgDgZQAIgUAXAGQAXAeABAbQgEAMgGAEQgDABgDAAQgHAAgHgFg");
	this.shape_2.setTransform(-9.425,-38.0516);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.2,-42.9,26.4,85.8);


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
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("AhMjAIAWgKIBWgCIALABIAYAGIAEABIALAFQALAEAOAKQAWAQAGAcQAHAbAAAaQgBAagIAVQgIAUgZAWQgZAXgnAHIAAA3QABAaAIBVAglDGQAHg9ABgmIgBg6QhJgbgPgbQgQgdgFgXQgGgXAMgoQAMgpArgWIACgB");
	this.shape.setTransform(0.0152,0.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00B058").s().p("AglDGQAHg9ABgmIgBg6QhJgbgPgbQgQgdgFgXQgGgXAMgoQAMgpArgWIACgBIABAAIgBAAIAAAAIAWgKIBWgCIALABIAYAGIAEABIALAFQALAEAOAKQAWAQAGAcQAHAbAAAaQgBAagIAVQgIAUgZAWQgZAXgnAHIAAA3QABAaAIBVgAhJjGIATgEIgWAKgAg2jKg");
	this.shape_1.setTransform(0.0152,0.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.1,-21.3,30.299999999999997,43.1);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#006600").ss(1,1,1).p("ABTANIgagwQgHgOgEgNQgIgiAEgaQAEgoAOgbIAcg+QAPgjgKgPQgOgQgRASQAHgKgGgQQgMgQgMANIgKAOQgEgpgUAHQgTAIABAbIgMgQQgTgFgHANQgIAOAKATQghgagBApIADAQQAVArAOAmQAPAngDAvIgDAcQgEAXgKASQgKASgKAMQgJANgNAgQgIASgEAVIgDAdQgDAlAVAvIAYA3QACAIgBAOQgBANgHAPQgHAPAFAYABKFdQACgSgHgRQgHgSABgJQAAgKAUgpQAUgpAEgsQADghgDgZIgDgSIgDgQIgSguIABADQALAUAGAXAAUAHIgUABQgJAEgEAEIgLANIgRAbQgJARgEAUIgBACQgEAVABAOIACAbIAFAdQADAQAIAOQAIAOAKAAQAJgBAFgFQAFgFABgJQAAgJgEgPIgMgiQgIgUAEgTQACgNAEgHIAEgGIAIgGIAWgBQALADADAKIABACIACAZIgCAYIgEAUIgIAXQgGAMAAAIQgBAJAEAHQAFAIALgDIAQgJIAFgKIAIgWIAGghQADgTgCgRIgCgZIgCgLQgCgSgIgTQgIgSgIgKQgIgJgMgBg");
	this.shape.setTransform(0.0242,-0.5574);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00D56A").s().p("AgtBiQgIgPgEgQIgEgdIgDgbQgBgMAFgVIAAgDQAFgUAJgQIAQgbIALgNQAFgFAJgDIATgCQAMABAJAKQAIAJAHATQAIASADASIABALIADAZQABARgCASIgGAiIgIAWIgFAJIgRAKQgLACgEgHQgFgIABgIQABgJAFgMIAIgWIAFgVIACgXIgDgYIAAgDQgEgJgLgDIgWAAIgHAHIgFAFQgEAHgCAOQgDASAHATIAMAjQAFAOgBAJQAAAJgFAFQgFAFgKABIgBABQgJAAgHgOg");
	this.shape_1.setTransform(0.594,11.2509);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00B058").s().p("AhKFbQgFgYAHgPQAHgPABgNQABgOgCgIIgYg3QgVgvADglIADgdQAEgVAIgSQANggAJgNQAKgMAKgSQAKgSAEgXIADgcQADgvgPgnQgOgmgVgrIgDgQQABgpAhAaQgKgTAIgOQAHgNATAFIAMAQQgBgbATgIQAUgHAEApIAKgOQAMgNAMAQQAGAQgHAKQARgSAOAQQAKAPgPAjIgcA+QgOAbgEAoQgEAaAIAiQAEANAHAOIAaAwIASAuIADAQIADASQADAZgDAhQgEAsgUApQgUApAAAKQgBAJAHASQAHARgCASIgPADIgBAAIgmACIg3ACgAAAAFQgJAEgEAEIgLANIgRAbQgJARgEAUIgBACQgEAVABAOIACAbIAFAdQADAQAIAOQAIAOAKAAQAJgBAFgFQAFgFABgJQAAgJgEgPIgMgiQgIgUAEgTQACgNAEgHIAEgGIAIgGIAWgBQALADADAKIABACIACAZIgCAYIgEAUIgIAXQgGAMAAAIQgBAJAEAHQAFAIALgDIAQgJIAFgKIAIgWIAGghQADgTgCgRIgCgZIgCgLQgCgSgIgTQgIgSgIgKQgIgJgMgBgABlA4gABTAKIABADQALAUAGAXgABTAKg");
	this.shape_2.setTransform(0.0242,-0.2824);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.8,-36.5,23.700000000000003,72);


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
	this.shape.graphics.f().s("#003366").ss(1,1,1).p("AgBADIADgG");
	this.shape.setTransform(-30.275,-30.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#003399").ss(1,1,1).p("AD7GzIACAAQA/gCAGhXQAFhXgBhSIgFirIgBgmIgKh6IAAgDIgBgDIAAgDQgEgkgJgnIgEgSIgMguIgEgPIgBgCIgBgCQgKgWgVgQIgfgTIgFgDIgGgDIgBAAQgqgVghgKQghgLgygDIhbgFIhLAEQgiAGg1AZQg1AYgbAzIgHAOIgCAFAA8gjIgMADQgnAJgpAAIhVgCQgqgCgngOQgdgLgbgSQgfgTgSggQgWgkAAgtQgBgiALghIALgdAEEi3QgIg7gQAkIgeA9QgPAhgUATQgUATgQAIIgRAKQgYAMgbAHIgHACAA/gdIgDgGAD5GzIgWgCIgDgBQgqgLgXg2QgehHgPhMQgQhMgFg1QgCgbgJggIgDgOIgQgt");
	this.shape_1.setTransform(0.0322,-0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#97B9FF").s().p("Ag/BiIABgBQAVg2AqgzIAhggIADgDQAZgXAZgNQAZgOAbgHIADgBQAMAGAFAJIABAOQgoAegSATIgJAKIgWAfQgNAWgJAaIgJAgIgEANIAAAAIgGAAIgEAAQgqAAgvgNgAA8BqIAXg4IAAgBIABgDIgDAlQgCARgTAHgAiIBDIgQgTIAAgBQARgdAYgWQAdgcBHgyIAVAkIgKAKQgdAagTAgIgCAEIgBAAQgUAigLAfIAAABQgtgQgJgJgAieASQABgSAOgdQANgdAhgSQAggSAggHIBRgJIA+ADQgjAMgWAQIgpAgIgBAAIgBABIgOgoIAAgBIADgCIgEABIABACIgHAEIgBgDIhMAlIgHAFIgFADQglAagWAqg");
	this.shape_2.setTransform(-10.025,-29.0991);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6699FF").s().p("ADcGyQgqgMgXg2QgehHgPhMQgQhLgFg2QgCgbgJggIgDgOQARgEArgQQArgSBJg5IAIBGIACAfIAGA0IAEAkIADAkIADAvIAFBBIADBbQAAAzgeARQgZAOgHAAgAA4giIAHgBIgEAHgAEzheIgBgeIAAgdIAKB6QgGgfgDgggACDhAIABABIgSAIgAiHhnIg3gJQAFgoASgmQAwANAtgBIAGABQgEAmAFAlIgcABQgUAAgUgCgAg5hnQABgjAMgrQAUgIACgQIADglQALgnANgPIAogkQAagVAYgIIBKgVQg9ACgYAHIgcAMIgCgOQgEgKgMgFIA2gPIgXgCQgOgBguAMIAWADIADADIABABQgcAGgYAPQgZANgYAXIgDACIghAhQgrA0gWA2IAghmQAOgRARgPIALgKIAAAAIABgBIAAgBIApgfQAWgQAjgMIg9gEIhTAJQggAIggASQggASgOAdQgOAeAAASIgCAJIAAAAIgQAnQgHAXgBAcQgtg2AfhUIAHgNQAbgzA1gZQA1gYAigHIBLgEIBbAFQAyADAhALQAhAKAqAVIABAAIAGAEIAFACQASAPAAAUIgBAsQgDApgUAjQgLATgUATQAIguAfhHQgpAdgJAmQgJAlAHAVQgvAug7AJQAEg/AigzIAbgiQAsgwA3giQhLAVg2A9QgvA1gEBKIgCAaQgvANgjAAIgJAAgAjdh6QgfgPgcgbQADgpAVgkIAPATQAKAKAsAQQgRApADAogAhAi+IAKggQAIgaANgWIAXghIgFAMIgGAaQABANgBANIAAAAIgWA5IgBAAIgDABIgGABIgOACgAiwjBIgLgEQAMgfAUgiIABAAIAAgBIABgBIAAgBIAAgBIAMgRIgaBcgAkGj6IgBgIIgBgCQAXgsAkgaIAFgCIAIgFIBLglIgBAFQhFAwgcAcQgYAXgSAdgAkIkFIAAABIAAAAgAh2lxIAKgHIgbBTIgGAKgAhtl5IAAABIABAAIgEAAg");
	this.shape_3.setTransform(0.4178,-0.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5F84E7").s().p("ADgGjIADAAIAWADIgMABQgLAAgCgEgAD7GmIgCAAIgWgDQAHAAAZgOQAegRAAgzIgDhbIgFhBIgDgvIgDgkIgEgkIgGg0IgCgeIgIhHQhJA5grASQgrAQgRAEIgQgtIAAgCIAEgHQAbgIAYgMQgYAMgbAIIgHACIgMACQgnAJgpABIhVgCQgqgCgngPQgdgLgbgRQgfgUgSgfQgWglAAgsQgBgjALggIALgeIAEgHQgEgKAGAGIgCAEIACgEQgfBTAtA2QABgcAHgWIAQgoIABADIABAIIAFAJIABABQgVAjgDApQAcAcAfAPIAUAHQgDgpARgpIAAgBIALAEIAJACIAAABQgSAmgFApIA3AIQAiAEAigDQgFglAEgmIABAAIAAAAIAOgDIAGgBIADgBIABAAIgBABQgMAsgBAiQAmACA1gPIACgaQAEhKAvg1QA2g8BLgWQg3AjgsAvIgbAiQgiAzgEA/QA7gJAvguQgHgUAJgmQAJglApgeQgfBHgIAvQAUgUALgTQAUgjADgpIABgsQAAgUgSgPIAfAUQAVAPAKAXIABABIABACIAEAQIAMAtIATCWIAAAMQADAfAGAfIABAoIAFCqQABBSgFBXQgGBWg/ADgAB2hGIASgIIgBgBIgRAJgADsjcIgeA+QgPAggUATQgUATgQAJQAQgJAUgTQAUgTAPggIAeg+IAAgBQAGgMAEAAIABAAIAAAAQAIAAAFAkQgFgkgIAAIAAAAIgBAAQgEAAgGAMIAAABgAEakQIAAAAIAAgBgAEWkWIAAAAIgBgBgAD5GmgAE3h4IgBgKIAKBUgAEoj8QAJAnAEAkIAAADIABAEIAAABIAAABIAAgCIAAACIAAAeIAAAIgAgRkYIAGgaIAFgLIAHgKQASgTApgeIAcgLQAYgIA9gCIhKAVQgYAIgaAVIgoAkQgNAQgLAmIgCADQABgNgBgNgAiXkVIAAAAIACgEIAAACIAAABIgBAAIAAABgAk8kdQgCgJAJgLIAFgHIgLAegAkwk4gAhZleIABgBIgBABgAhpmIIAEgBIgDACIgBAAIAAgBIgDACgAAmmVIgDgCIgWgEQAugMAOABIAXACIg2APIgDABg");
	this.shape_4.setTransform(0.0322,1.3101);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.6,-44.5,67.30000000000001,89);


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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AABABIgBgB");
	this.shape.setTransform(-4.1,-5.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#003399").ss(1,1,1).p("AgogzIAXALQBFAeBOgJQBagMBDg/QBLhFgUhlIgMgiIgcgtQgZgfgvgYQg0gbgtgDQgugEguAEIhLAIQgdADgjALQgjALgpAUIgeAQIgYAUIghAlIgkAzIgQAlQgHAQgEAXQgPBAgEA/IgBAHIAAAKIgBAiIAAAYIAEA7IAFBEIAJBYIAOBTIAMAuIAIAXQADAIAMANQANAOAXACAgqg0IgCgBIgJgIQgYgQgXgcQgcgngKgxIgLgdIgCgFQgNgbgUgGIgJgBIgOAAIgKADIgLAGIgUATQgLAJgSAoAgqg0QABgBABACIABABAjyGvQAgADAagOQAbgOAMgZIAMgcIARgrQAHgTACgIIALgwIAMg8IANhHIAMg7IALg8IAGglAgogzIgBgBIgBAA");
	this.shape_1.setTransform(0.0355,-0.0061);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#97B9FF").s().p("AAVBwIgEgJIgTgjIgGgKIgQgZIgegnQgQgTgQgMIgVgPQgEgUAEgLIAGgRIAAgBIABAAIAEABQAeAEAfAMIAFACIAIADIAZAiQAXAlAjATQAiATAMAsQANAsgpACgAguBXIgJgIIgTgTQgQgQgMg3IgEgSQAdAcAXAbQAXAcAOAYIAQAeIAAABQgegMgPgKgAglhjQgTgJgjgDQgCgCAQgFQAQgFAMAMIANAMIAAABg");
	this.shape_2.setTransform(-1.8165,-26.0735);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6699FF").s().p("Aj1GeQgZgHgPgTIgMguIgOhTIgJhYIgFhEIgEg7IAAgYIABgiIAAgKIABgHIApgVQAegQAghJQAhhKANBSQAFA8AkAhQgoBtgIA3IgRCDIgKBrQgDAegKANIgBgDIAAADQgGAJgIAAIgFAAgAAfhIQgBgYgLgiIA5AIQApgCgMgsQgMgsgjgUQgigTgXglIgZgiIArAXQANAHAPANIAfAeIAYAdIATAaIARAbIAMAXIAIAVIAMAWIALAeIgeAHIgPABIggABgACqiVQgQgigWgeQgXgegagaQgbgagXgOIghgTIgUgIIgTgGIgMgMQgMgMgQAFQgQAEABADQAkADASAIIAHAKIAEAGIACADIgFgCIgHAAIACgBQgggNgdgDIgEgBIABgDIAHgHIguAAIAkAKIAAABIgDAKIhRgJIAegQQApgUAjgLQAjgLAegDIBKgIQAvgEAtAEQAtADA0AbQAvAYAZAfQALASAAAVIABAjIgGAlIgMgnIgOgaIgZgiIgnggQgcgWgbgKIgmgNIgagGIA3AeQAoAWAbAXQAcAWAMARIARAZIAKARIAHAQIAGAZIghA9IgLgsIgSgoQgOgXgWgcIgighIgjgbQgPgJgegMQgdgMgegIQgfgJgpAAQAbAKAZAHQAYAHAhANQAfANAbAUQAbATAoAsIAgAqIAGAKIAMAXQALAXADAaIghAcIgcAPIgUALQgHgqgOgigAg/h8Qgig5gFgRIgGgVIgUgeQgRgZglAAQgGgrAAgZIAZAaIAAAAIAAAAIA6A7IAAADQANA3APARIAUASIAIAIQAQALAeALIAKAWIAOAmQgjAAgxgygAgCiGIgBAAIgQgfIgJgOIAvAxgAhukoIAWAQQAPALAQATIAfApIAPAYIAHALIASAiIAFAKgAhpkBIgDgPQAdAbAWAdQARAUAMARgAijk8IAAAAIATAFIAiAPIgNgFIALAFQAAAAAAABQAAAAAAAAQAAAAABAAQAAAAAAgBQACgCAEAbgAhukogAhulHIADgGIBEAHIhHAeQgDgUADgLg");
	this.shape_3.setTransform(-1.6,-1.719);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5F84E7").s().p("AjzGnIAAgrQAHgIAEgQIC9mgIgGAlIgLA8IgMA7IgNBHIgMA8IgLAwQgCAIgHATIgRArIgMAcQgMAZgbAOQgWALgaAAIgKAAgAiVEAIAAgBIABgBIAIgCIAAAAIAJAAIgHAAIgCAAQgGABgCABIgBABIAAAAIAAABgAkXGXQgMgNgDgIIgIgXQAPATAZAHQALADAIgMIAAArQgXgCgNgOgAjWjJQAMACAHApQAFA8AkAhQgoBtgIA3IgRCDIgKBrIgDATIgLAYgAgSgwIgXgLIgBgCIgDg5QAcATAVAAIgNgmIgLgWIAAAAIABAAIAUAEQALAiACAYIBJAKIAfgBIAQgBIAdgHIgLgeIgLgWIgIgVIgMgXIgRgbIgUgaIgXgdIgfgeQgPgNgOgHIgqgXIgOgCIgBgSIAGAJIAEAGIABADIgFgCIAJAEIgPgUIAAAAIABAAIgBAAIATAGIAUAIIAhATQAXAOAbAaQAaAaAXAeQAWAeAPAiQAPAiAGAqIAVgLIAcgPIAhgcQgEgagKgXIgMgXIgGgKIgggqQgogsgbgTQgbgUgggNQgggNgYgHQgYgHgdgKQArAAAdAJQAfAIAdAMQAeAMAPAJIAjAbIAiAhQAWAcANAXIATAoIALAsIAgg9IgFgZIgHgQIgKgRIgRgZQgNgRgbgWQgcgXgogWIg2geIAaAGIAlANQAcAKAcAWIAnAgIAYAiIAPAaIALAnIAHglIgBgjQgBgVgKgSIAcAtIAMAiQAUBlhLBFQhDA/haAMQgRACgRAAQg8AAg1gXgAlFi3QAEgXAHgQIAQglIAkgzIAhglIAYgUIgFBjIgIACIgLAGIgUATQgLAJgSAoQASgoALgJIAUgTIALgGIAIgCIgEBDQgLgCgQAlQghBJgeAQIgoAVQAEg/APhAgAgqg8IABABIABABgAgqg8IAAgBIABACgAgqg9IgBABIABgBgAg2hFQgYgQgXgcQgcgngKgxIgLgdIgCgFQgNgbgUgGIgJgBIgOAAIgCABIACgBIAOAAIAJABQAUAGANAbIACAFIALAdQAKAxAcAnQAXAcAYAQIAJAIgAhQiVQgjg5gEgRIgHgVIgTgeQgRgZglAAQgGgrAAgZICWASIAKDnQgRgMgSgTgAh7koQgDgbgCACQAAABgBAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIgLgFIANAFIgjgPIgSgFgAFJkyQAIgBAEAjgAg5lwIABABIAAAAgAg5lwIABABIAAAAgAh5lxIgkgKIAuAAIgHAHIgBADIgBgBIgBACg");
	this.shape_4.setTransform(0.1355,0.7939);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.6,-44.1,71.30000000000001,88.30000000000001);


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
	this.shape.graphics.f().s("#003399").ss(1,1,1).p("ADflkIAbAlIADAFIAfAzIAZA1IAQAyIAPAsIAXBWIATBXIAOBUQAKA9ADAnIAEBUIABBaQABAugKAqQgKAqgjABQgjACgcgKQgbgKgVgXQgVgXgVg1QgWg1gKhQIgRhxQgGgfgOgnQgPgmgZgjQgZgkg6gwQg5gxhRAPQhQAPg5ACIgRgBIgcgEAkyhCQgogOgagjQgXghgJgnQgIghgBghQgBgZAEgZIACgIIAGgZIAEgNQAMgeAZgiQAZgjAhgZQAhgaAkgQQAjgQAggIIBHgHIBEAJQAcAHAhAOQAhANAbATIAtAhIAkAoIAJAL");
	this.shape.setTransform(-0.0266,0.0102);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#003366").ss(1,1,1).p("ADhimIAmAqIACACAkHCnIgBAA");
	this.shape_1.setTransform(-4.225,-23.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#97B9FF").s().p("Ah4A+IgCgEIAegiIAQgPIANgKQAlgdAqgRIAHgDIACAAIABgBQAhgMAlgEIAWgCIAIAAIACAAIAAACQABAKgJAIQgXAJgTAMQgRALgkAnIgBAAIgiARIgBAAQglAVgVAeQgdgCgWgagAhlgJQAVgXA3ggQA1ggBQAJQg8AFgeAMQgeALgeATQgfASgaAXIgdAcQAFgQAWgWg");
	this.shape_2.setTransform(-20.0487,-40.3476);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6699FF").s().p("AjNDwIAAgBIAAABgAi/BSQAJgdAQgbIANgQIAKgKIAEgEIAwghQAWgOAfgIQAfgJAegFQAfgFBRAIQgbgOgQgDIgygFIhOAHIglALQAkgoAQgKQATgNAWgIQAJgIAAgKIgBgCQBXACA4ARQgxgagfgGIhSgGQAKADAGAJIACAHIgEAAIgEgBIgWACQgkAFghAMIgCAAIgBABIgHACQgrARglAdIgOAMIgQAOIgeAjIADADQAVAbAdABQAWgdAkgVIACgBIAigQIgGAGIgIAJIgLANIgNAMIgMALIgQAMQgKAGgFABIgNgCIgBAAQgaAhgIAoIgBALQghgGgagVQAIgoAigyIgGgMIgBgKIABgFIABgBQgPARgSAlQgMAYAAAkQgTgNgSggIABgHIAGgZIAFgNQAMgeAZgiQAZgjAhgZQAhgaAjgQQAjgQAggIIBGgHIBEAJQAdAHAhAOQAhANAcATIAsAhIAlAoIAJALIAaAeQgqAlgzAWIgpAQQhYAbhaAUIhCANIhAAKQALgWAYgTQAegYA1gMIBogSIBsgKIhKgFIg7ACIg1AHIhBARQgUAHgRAMIgfAbIgIAJQgNAOgEAQgAjjhCIAcgdQAbgXAegTQAegSAfgMQAfgMA6gFQhOgJg3AhQg3AggVAXQgVAXgFAQgAg4jcQglADgiAOQgjANgOAKIgkAcIBQggIAXgIIAegIIAngHIAogEIBCgDQgNgHgkgBg");
	this.shape_3.setTransform(-10.075,-30.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5F84E7").s().p("AEpISQgbgKgVgXQgVgYgVg0QgWg1gKhRIgRhwQgGgggOgmQgPgngZgjQgZgig6gxQg5gxhRAPQhQAOg5ACIgRAAIgcgFIgBAAIAAAAQgogNgagkQgXgggJgnQgIgigBghQgBgYAEgZQASAgATAMQABgkAMgYQARgmAPgRIAAABIgBAGIABAJIAGAMQgiAzgJApQAaAUAiAHIABgMQAHgoAbghIAAAAIANABQAGAAAJgGIAQgNIANgKIAMgNIALgMIAIgJIAHgHIABAAIAmgMIBOgGIAyAEQAQAEAbANQhRgIgfAFQgfAFgfAJQgfAJgWANIgvAiIgEAFIgKAJIgNARQgRAagIAdIAtACQAEgRAMgOIAIgJIAfgbQARgMAUgHIBCgSIA2gGIA6gCIBKAFIhrAKIhqATQg0ALgfAYQgXAUgMAWIBBgKIBBgNQBbgUBXgcIAqgQQAzgXAqgkIgbgfIAmAqIAKALIgIgJIgCgCIACACIAbAmIADAEIAfA0IAZA1IAQAxIAPAtIAXBVIATBXIAOBVQAKA8ADAoIAEBTIABBbQABAugKApQgKAqgjACIgKAAQgdAAgYgIgAhHnhIgCAAIgCgGQgFgJgKgDIBRAGQAfAGAxAZQg4gQhWgDgAkUnvQAOgLAigNQAigNAlgDIBKgCQAlAAANAHIhCADIgqAFIgnAGIgdAJIgYAHIhQAhgAhNnhIAEAAg");
	this.shape_4.setTransform(-0.0266,0.8602);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.4,-55.6,84.8,111.30000000000001);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#003399").ss(1,1,1).p("AEOnvQgOgIgNgGQgkgRgfgHIhHgHQgoAAgdAIIg9AWQghANgYARIg0AnQgdAYgbAjIgiAtIAAAAIgQAVIgkA7QgPAagJAbIgRAxIgPAtIgXBXIgUBYIgOBVIgQBgIgJA5QgEAVgBAiIgCBOQAAAqArAlQASAQATAHIAtADIAFgBQAsgLAfgkQAeglAPg4IAahmIAShRIARhQQAKgtAOgoQAOgnAygqQAigdA1gGIAvgBIAIABICUAJQA6ABAkgjQAkgiANg0QANg0gDgsQgDgsgMgdQgMgdgZgiQgZgjghgZg");
	this.shape.setTransform(0.0037,-0.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#97B9FF").s().p("ABQBHQgtgPgmABIhmADQg/AEAZgiQAZgiAugaIADgBIACgBIADgBIA6gMIAcgCIAYgBIABAAIAzACIABABIACAAIADAAIAGABIAbAEIAFACIAFAMQAGASgDAUQgIgFgRgEIgIgCIg/gFIg9ACIgkAFIgaAHQgLADgmAVQA5gPAhgDIAqgDIAwACQAiACAmAMIALAEIABAAIgFANQgLAdgcAAQgKAAgMgEgAAAg8IAegIQA5gLAYAKIAOAJQg4gJhFAJIgDABg");
	this.shape_1.setTransform(3.6715,-42.5879);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5F84E7").s().p("Al9IDIAPgIIAPgMQALgNAHgRIAQgpIARg0IAGgYIAGgYIAFgbIAWiJQAHgxAOgxIALglIAIgXQANgeASgbQAagmAigiIAcgZQAOgLARgKQAUgMAWgKQAbgLAbACIBxAEIBCgHIgfgSQgOgIgagKQgagKgjgEIhGgCQghAChPAPQAvgTAjgIIAYgCIAxgFIAtABIAeAGIAQAFIAOAGIASAIIALAHIANAKIAVAWQAfgLAIgPQghgqgdgRIgtgXIhTgiIA7AKQAaAHAWAKQAVAKARAMQARAMAHAIIAdAqQAagRAEgcIgggqIgdgeIgpgdIgugZIgBgBIADgGIAAABIADgPIAGADIgBgBIAdANIARALIAfAYIAcAaQAVAVASAoQAOgkgBgjIgVgXIgagZIgfgaQgSgNgPgGIgWgLIgmgOIgEgBIAEABIgCgFIgEgGIgFgGIgJgEQAhAFAgAOIAiAOIABABIAPAIQAMAIAZAYQAYAXAMAVIgRgwQgWgtglgkIApAcQAhAaAZAiQAZAiAMAeQAMAdADArQADAsgNA1QgNAzgkAjQgkAjg6gCIiUgJIgIgBIgvABQg0AHgjAcQgyArgOAmQgOAogKAuIgRBQIgSBQIgaBnQgPA3geAlQgfAkgsALIgFACgAhBnuIA9gOIgDABIAEgBIhDAcIgDABIg4ANQAggTAggJg");
	this.shape_2.setTransform(4.004,2.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6699FF").s().p("AlWIFQgrglABgqIAChOQAAgiAEgWIAJg5IAQhgIAPhUIAThZIAYhWIAOgtIARgxQAKgbAPgaIAkg7IAPgVIABgBIAhgsQAcgkAcgXIA0gnQAYgRAhgNIA+gWQAdgIAnAAIBHAHQAgAHAjARQAOAGANAIQAmAjAVAtIASAwQgMgUgZgYQgZgYgMgHIgOgJIgCAAIghgPQghgOgggFIAIAEIAFAGIAEAHIACAEIgEgBIgbgEIgGgBIgDgBIgCAAIgBAAIgzgDIgBAAIgYABIgdADIg6AMIgDAAIBDgbQBGgKA4AKIgOgKQgYgKg5AMIgfAHIg9APQggAJgfASIA3gNIgDACQgtAagZAiQgZAiA/gDIBlgEQAnAAAtAOQAtAPAQgoIAFgMIAuAZIApAdIAdAeIAfAqQgDAcgbARIgcgqQgIgIgQgMQgRgMgWgKQgVgKgbgHIg7gKIBUAiIAsAYQAeARAhApQgJAPgeALIgVgWIgNgKIgMgHIgSgIIgNgGIgRgFIgegFIgsgCIgyAFIgZADQgjAHguAUQBOgQAjgBIBFACQAjADAbAKQAaAKAOAIIAfASIhCAHIhxgEQgcgBgcALQgWAJgUAMQgPAKgPALIgcAZQgiAigaAmQgRAbgNAfIgIAWIgMAlQgOAxgHAxIgWCJIgFAbIgFAYIgHAZIgRAzIgPApQgHARgMANIgOAMIgPAIQgTgHgTgPgAFNlOIgbgaIgfgYIgRgLIgdgNIAAABIgFgDIgDAQIAAgCIgDAGIgLgDQgmgNgigCIgwgCIgrAEQghACg4APQAmgUAKgDIAagHIAkgGIA+gCIA/AGIAIACQARAEAIAFQADgVgGgTIgFgMIAlAPIAWAKQAQAHASAMIAfAaIAaAZIAUAYQACAigOAkQgTgngVgWg");
	this.shape_3.setTransform(-3.618,-0.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-43.1,-55.1,86.30000000000001,110.2);


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
	this.shape.graphics.f().s("#003366").ss(1,1,1).p("ADKoYQADAXgEAWIgCALQgJAwgYAsQhCBNgwAqQgMAKgJAOIAAABIgEAGQgbAugFBXQgLAsgGBKIAAAGIgBAFIgMCWQgFA9gNBIIgLA8QgWBsgiAnQgjAmglgbIgKgI");
	this.shape.setTransform(16.9692,10.7065);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#003399").ss(1,1,1).p("AC3piIgOgEIgOgEIAAAAIgCAAIhQgNQhegHheASQhdATg2ApQg2ApggA8QghA7AOBLQAPBKA1AoIBrBSQA1AqAFBhIAGBkIAIB6IALCeQAIBYAVBFQATA6AdAdAF0mjQgFghgSgjQgcgzg5gkIgVgLIgFgDIgEgCIgBgBIgCAAIgUgJIgZgJ");
	this.shape_1.setTransform(-0.0713,-0.9832);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#97B9FF").s().p("ABCCOIgHgDQgKgzgKgWIgXgvIgVglIgNgUIgVgcIgWgYIACAAQAZgSAagLQAqgSAYgDIAAABIAFAYIAFAYIAIAzIAKBNIAGA4IAEAuQgIAEgJAAQgGAAgHgBgAAcB5IglgiIg8gyIgngkQgZgZApgmIARgRIAAABIAkArIAYAjIAaAyQARAjAFAUIAAACIABACIAGAYIABACgABsBWIgEg8IgIhDIgLhBIgGgfIAAgBIgBgEIAVAFQARAHABATIABAdIgBBoQgBA+gGAdg");
	this.shape_2.setTransform(-15.6889,-45.362);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5F84E7").s().p("AhVJqIgKgJQgEgJAUABQAVABAFhEQAFhEAKgpIAAhyQgCgUACgqIABh2IgBhcQgEgTAFhaQADhHAUg7IAAgHIACgeQgBg7AEg7IAGg7IALhiIADhAIABgcIACgIIACgFIAIgCQAIAAAAATIgCA3IgJBeIgKBJQgGAsgBAkIgEA6QAagwAZgeIA0hBIAMg6IACgeQACgtgGgsIgFgVQgEgKAIgGIAFAAIAGABIADAGIAEALIADAMIADATQACANgBAUIgBAtQAAAagLAkIAagoQASggAFg+QAFg+gfgUIAUAIIABABIACABIAEACIAEACIAVAMQA6AjAbAzQATAjAFAiQABAcgEAcQgJAvgYAsQhCBNgwArQgMAJgJAPIAAAAIgEAHQgbAugGBWQgLAsgGBLIAAAGIgBAFIgMCVQgFA9gNBIIgLA9QgWBrghAnQgVAXgVAAQgPAAgPgLgAhykEIgJhEIAFAAQAJgGABgLIABAjIgCAvIgBAagAiylMIAAgDQAGAJAOgBQAEAcgCAXQgBAFgBAAQgFAAgPg9gAknojIgIgJIgFgLQgBgPAQAGIANAPIgIAGIgGAJgAiMpgIAAAAIAAABgAigphQgEgPAKgDQAJgEAFAUIAAADIgQgCIgEACg");
	this.shape_3.setTransform(6.2697,1.4804);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6699FF").s().p("AhQIjQgWhFgHhYIgMieIgHh6IgHhkQgEhhg2gqIhqhSQg2gogOhKQgPhLAhg7QAhg8A2gpQA2gpBdgTQBdgSBfAHIBQANIABAAIABAAIANAEIAOAEIADABIAaAJQAfAUgFA+QgFA+gSAgIgaAoQALgjAAgaIABguQABgTgCgNIgDgUIgDgMIgEgKIgDgHIgGgBIgFABQgIAGAEAKIAFAVQAGArgCAtIgCAeIgMA7Ig0BAQgZAfgaAvIAEg5QABglAGgrIAKhJIAJheIACg3QAAgUgIABIgIACIgCAEIgCAIIgBAcIgDBAIgMBjIgGA6QgEA7ABA8IgCAeIAAAGQgUA8gDBHQgFBaAEASIABBdIgBB2QgCApACAVIAAByQgKAogFBFQgFBEgUgBQgUgBAEAJQgegdgSg6gAgzjsIAEAXIABgZIACgwIgBgiQgBAKgJAHIgFAAgAj1oeIAFAKIAIAJIgRARQgpAmAaAaIAmAkIA9AyIAmAiIAMAOQATBPADgXQACgWgEgdQgOABgGgIIgHgYIAAgCIgBgCQgFgUgRgjIgbgzIgYgjIgjgrIAGgJIAIgFIgNgQIgIgBQgIAAABALgAhbpbQgKAEAEAPQgYADgsASQgaALgYASIgCAAIAVAYIAWAcIAMAUIAXAmIAXAvQAJAWALAzIAHADQAQAEANgHIgEguIgGg4IgKhOIgIgzIgEgYIgFgYIAEgDIAQADIAAABIABABIAGAfIAKBBIAIBEIAEA8IACAbQAGgdABg+IAChpIgCgdQAAgTgRgHIgVgFQgEgRgIAAIgCAAgAF0mjQADAXgEAWIgCALQAEgcgBgcg");
	this.shape_4.setTransform(-0.0021,-0.9832);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.3,-65.3,76.6,130.7);


(lib.shape57 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_21
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.5,1,1).p("AAAAOQgFAAgEgEQgFgEAAgGIAFgKQAEgEAFAAQAGAAAEAEQAFAFAAAFQAAAGgFAEQgEAEgGAAg");
	this.shape.setTransform(-4.25,-97.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgFgEABgGIAEgJQAEgEAFgBQAGABAEAEQAFAEAAAFQAAAGgFAEQgEAFgGAAQgFAAgEgFg");
	this.shape_1.setTransform(-4.25,-97.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_20
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(0.5,1,1).p("AAAAOQgFAAgEgEQgEgEAAgGIAEgKQAEgEAFAAQAGAAAFAEQADAFAAAFQAAAGgDAEQgFAEgGAAg");
	this.shape_2.setTransform(-9.5,-93.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgFgEAAgGIAFgJQAEgFAFAAQAGAAAEAFQAEAEABAFQgBAGgEAEQgEAFgGgBQgFABgEgFg");
	this.shape_3.setTransform(-9.5,-93.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_19
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(0.5,1,1).p("AAAAOQgFAAgEgEQgEgEAAgGIAEgKQAEgEAFAAQAGAAAEAEQAFAFAAAFQAAAGgFAEQgEAEgGAAg");
	this.shape_4.setTransform(-7.5,-105.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgFgEABgGIAEgKQAEgDAFAAQAGAAAEADQAFAFAAAFQAAAGgFAEQgEAEgGAAQgFAAgEgEg");
	this.shape_5.setTransform(-7.5,-105.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_18
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(0.5,1,1).p("AAOAAQAAAGgDAEQgFAEgGAAQgFAAgEgEQgEgEAAgGIAEgKQAEgEAFAAQAGAAAFAEQADAFAAAFg");
	this.shape_6.setTransform(-11.5,-99.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgEgEgBgGIAFgJQAEgEAFgBQAGABAFAEQADAEAAAFQAAAGgDAEQgFAFgGAAQgFAAgEgFg");
	this.shape_7.setTransform(-11.5,-99.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_17
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(0.5,1,1).p("AAOAAQAAAGgDAEQgFAEgGAAQgFAAgEgEQgEgEAAgGIAEgKQAEgEAFAAQAGAAAFAEQADAFAAAFg");
	this.shape_8.setTransform(-19.5,-99.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgEgEgBgGIAFgJQAEgEAFgBQAGABAEAEQAEAEAAAFQAAAGgEAEQgEAFgGAAQgFAAgEgFg");
	this.shape_9.setTransform(-19.5,-99.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8}]}).wait(1));

	// Layer_16
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(0.5,1,1).p("AAAAOQgFAAgEgEQgEgEAAgGIAEgKQAEgEAFAAQAGAAAFAEQADAFAAAFQAAAGgDAEQgFAEgGAAg");
	this.shape_10.setTransform(-15.5,-111.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgFgEABgGIAEgJQAEgFAFAAQAGAAAEAFQAFAEAAAFQAAAGgFAEQgEAFgGgBQgFABgEgFg");
	this.shape_11.setTransform(-15.5,-111.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10}]}).wait(1));

	// Layer_15
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(0.5,1,1).p("AAAAOQgFAAgEgEQgEgEAAgGIAEgKQAEgEAFAAQAGAAAFAEQADAFAAAFQAAAGgDAEQgFAEgGAAg");
	this.shape_12.setTransform(-25.5,-107.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgFgEABgGIAEgKQAEgDAFAAQAGAAAEADQAFAFAAAFQAAAGgFAEQgEAEgGABQgFgBgEgEg");
	this.shape_13.setTransform(-25.5,-107.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(1));

	// Layer_14
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(0.5,1,1).p("AAAAOQgFAAgEgEQgEgEAAgGQAAgFAEgFQAEgEAFAAQAGAAAFAEQADAFAAAFQAAAGgDAEQgFAEgGAAg");
	this.shape_14.setTransform(-21.5,-111.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgEgEgBgGQABgFAEgEQAEgFAFAAQAGAAAFAFQADAEAAAFQAAAGgDAEQgFAFgGgBQgFABgEgFg");
	this.shape_15.setTransform(-21.5,-111.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14}]}).wait(1));

	// Layer_13
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(1,1,1).p("ABLAHQgsgqhJgZQgLgHgNAEQgNADgGALIgBABQgGALAEANQADANAnAMQAmANAfAbQAfAcANgEQANgDAGgLIABgBQAGgLgEgNQgDgNgLgGg");
	this.shape_16.setTransform(35.425,-88.428);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.rf(["#660000","#996600"],[0,1],0.4,-0.2,0,0.4,-0.2,4.4).s().p("AAXApQgfgbgmgNQgngMgDgNQgEgNAGgLIABgBQAGgLANgDQANgEALAHQBJAZAsAqQALAGADANQAEANgGALIgBABQgGALgNADIgDABQgNAAgcgZg");
	this.shape_17.setTransform(35.425,-88.428);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16}]}).wait(1));

	// Layer_12
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(1,1,1).p("ABLAHQgsgqhJgZQgLgHgNAEQgNADgGALIgBABQgGALAEANQADANAnAMQAmANAfAbQAfAcANgEQANgDAGgLIABgBQAGgLgEgNQgDgNgLgGg");
	this.shape_18.setTransform(38.075,-89.678);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.rf(["#660000","#996600"],[0,1],0.4,-0.2,0,0.4,-0.2,4.4).s().p("AAXApQgfgbgmgNQgngMgDgNQgEgNAGgLIABgBQAGgLANgDQANgEALAHQBJAZAsAqQALAGADANQAEANgGALIgBABQgGALgNADIgDABQgNAAgcgZg");
	this.shape_19.setTransform(38.075,-89.678);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18}]}).wait(1));

	// Layer_11
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(0.5,1,1).p("AAAAOQgFAAgEgEQgEgEAAgGIAEgKQAEgEAFAAQAGAAAFAEQADAFAAAFQAAAGgDAEQgFAEgGAAg");
	this.shape_20.setTransform(-27.5,-113.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgFgEAAgGIAFgKQAEgDAFAAQAGAAAEADQAEAFABAFQgBAGgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_21.setTransform(-27.5,-113.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20}]}).wait(1));

	// Layer_10
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(0.5,1,1).p("AALAKQgFAFgGAAQgFAAgEgFQgFgEAAgGQAAgFAFgEQAEgFAFAAQAGAAAFAFQAEAEAAAFQAAAGgEAEg");
	this.shape_22.setTransform(-4.95,80.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgEgEAAgGQAAgFAEgEQAEgFAFAAQAGAAAFAFQADAEAAAFQAAAGgDAEQgFAFgGgBQgFABgEgFg");
	this.shape_23.setTransform(-4.95,80.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22}]}).wait(1));

	// Layer_9
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(1,1,1).p("AAAg5QAYAAARARQARARAAAXQAAAYgRARQgRARgYAAQgXAAgRgRQgRgRAAgYQAAgXARgRQARgRAXAAg");
	this.shape_24.setTransform(-4.15,65.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.rf(["#666600","#999900"],[0,1],0.1,0,0,0.1,0,7.1).s().p("AgoApQgRgRAAgYQAAgXARgRQARgRAXAAQAYAAARARQARARAAAXQAAAYgRARQgRARgYAAQgXAAgRgRg");
	this.shape_25.setTransform(-4.15,65.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24}]}).wait(1));

	// Layer_8
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(1,1,1).p("AggAkQAjgTAqgDQApgDAHgLQAHgKgEgNIAAgBQgDgMgMgHQgLgHgNAEQg8ABhGAiQgNADgGALQgHALAEANIAAABQADAMAMAHQALAGAlgRg");
	this.shape_26.setTransform(-39.875,-105.6203);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.rf(["#660000","#996600"],[0,1],0,-0.3,0,0,-0.3,4.4).s().p("AhQAvQgMgHgDgMIAAgBQgEgNAHgLQAGgLANgDQBGgiA8gBQANgEALAHQAMAHADAMIAAABQAEANgHAKQgHALgpADQgqADgjATQgbAMgNAAQgFAAgDgBg");
	this.shape_27.setTransform(-39.875,-105.6203);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26}]}).wait(1));

	// Layer_7
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(1,1,1).p("AggAkQAjgTAqgDQApgDAHgLQAHgKgEgNIAAgBQgDgMgMgHQgLgHgNAEQg8ABhGAiQgNADgGALQgHALAEANIAAABQADAMAMAHQALAGAlgRg");
	this.shape_28.setTransform(-38.875,-108.4203);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.rf(["#660000","#996600"],[0,1],0,-0.3,0,0,-0.3,4.4).s().p("AhQAvQgMgHgDgMIAAgBQgEgNAHgLQAGgLANgDQBGgiA8gBQANgEALAHQAMAHADAMIAAABQAEANgHAKQgHALgpADQgqADgjATQgbAMgNAAQgFAAgDgBg");
	this.shape_29.setTransform(-38.875,-108.4203);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28}]}).wait(1));

	// Layer_6
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(0.5,1,1).p("AAAAOQgFAAgEgEQgEgEAAgGQAAgFAEgFQAEgEAFAAQAGAAAFAEQADAFAAAFQAAAGgDAEQgFAEgGAAg");
	this.shape_30.setTransform(-17.5,-105.85);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgFgEAAgGQAAgFAFgFQAEgDAFAAQAGAAAEADQAFAFAAAFQAAAGgFAEQgEAEgGAAQgFAAgEgEg");
	this.shape_31.setTransform(-17.5,-105.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_31},{t:this.shape_30}]}).wait(1));

	// Layer_5
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#000000").ss(0.5,1,1).p("AAAAOQgFAAgEgEQgFgEAAgGIAFgKQAEgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAEQgFAEgGAAg");
	this.shape_32.setTransform(-2.5,-90.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.rf(["#660000","#996600"],[0,1],0,0,0,0,0,1.8).s().p("AgJAKQgEgEgBgGIAFgJQAEgEAFgBQAGABAFAEQADAEAAAFQAAAGgDAEQgFAFgGAAQgFAAgEgFg");
	this.shape_33.setTransform(-2.5,-90.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_33},{t:this.shape_32}]}).wait(1));

	// Layer_4
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#000000").ss(1,1,1).p("AAYghIABg+IAAiNIgBh9IgBgmIADiTIADiRIAAiNIgBhdQBegjAXA0QAYA4hrAoIABB9IAACNIgDCRIgCCTQgCBNAQBNQABADAEADQA3AvAxA1QAsAvAoAyQAlAwAdA1IAJARQAgA/ARBEQASBHACBKQACBHgRBFQgKArgTAmIggA3IgCADIgBAAIgpA0QgKANgyAiQhDAuhPANIh6AGQg2gDg0gUIgcgMIgxgcQhCgogthAIggg3QgTgmgKgqQgQhGAChHQAChKARhHQAMgxAVguIASgjQAWgpAbgmQAzhEA3hAIBXhbIAHgKQATgoAEgrQAIhQABhOIADidIACiNIAAh6IAAg9QhqgoAYg4QAWg0BnAjIAABdIAACNIgDCRIgCCTIAAAmIABB9IAACNIAAAXIgCBeQAFAZAlAcQAmAbAyA6QAyA6A0BjQA6BzgRB5QgPBmg/A/IgYAWQhUBCg3gDIgIgfQA9gEAwgyIAaggQA9hVAAh5QAAh5g9hWQg8hVhUAAQhWAAg9BVQgSAagNAdQgQAMgIASIgNAhQgGARgNAOQgMAPgUABQgTABgNgOQgNgPgHgVIABgBIAAgBIAIghQAYhPAxhCQBYh6AsgiQArgjAWgWQANgOANg2AifKbIACADIAKAQIAbAgQAmAnAuALIADAbQAHAvBPgKQBPgKBPhdIAJgLQBFhYgBhrQAAhygihYQgzhkgzg8Qgyg9gnggQgoghgBgNIACg3QANAmAXARQBVA/BbB8QBaB7AEClQAECEg+BZIgjAqQhiBhiKABIgBAAIgBAAIAAAAQhFgBg6gYQg8gYgxgxIgjgqQgbgngPgvIgDgNQAIgUAPgOQAPgPAYABQAXABAPAPQAPAOAGARIAOAeQAGANARAGgAiyFIQgdBDAABVQAABsAwBP");
	this.shape_34.setTransform(-3.4753,3.121);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#006600").s().p("AgFHRIgCAAIAAAAQhFAAg6gYQg8gZgxgxIgjgpQgbgngPgwIgDgMQAIgVAPgOQAPgOAYABQAXABAPAPQAPAOAGAQIAOAfQAGANARAGIACACIAKAQIAbAhQAmAnAuAKIADAbQAHAwBPgKQBPgLBPhcIAJgLQBFhYgBhsQAAhygihWQgzhkgzg9Qgyg9gnggQgogggBgOIACg4QANAoAXAQQBVA/BbB8QBaB8AECjQAECEg+BaIgjApQhiBiiJAAgAALGbIgIggQA9gEAwgxIAaghQA9hVAAh4QAAh4g9hWQg8hVhUAAQhWAAg9BVQgSAZgNAdQgQANgIASIgNAhQgGAQgNAOQgMAPgUABQgTABgNgPQgNgOgHgUIABgCIAAgBIAIggQAYhPAxhDQBYh5AsgjQArgiAWgXQANgOANg2IgCBfQAFAZAlAbQAmAcAyA6QAyA6A0BiQA6BygRB5QgPBmg/BAIgYAVQhQBAg2AAIgFAAg");
	this.shape_35.setTransform(-2.8906,42.375);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(51,153,0,0.502)").s().p("AiROVIgcgMIgxgcQhCgogthAIggg3QgTgmgKgqQgQhGAChHQAChKARhHQAMgxAVguIASgjQAWgpAbgmQAzhEA3hAIBXhbIAHgKQATgoAEgrQAIhQABhOIADidIACiNIAAh6IAAg9QhqgoAYg4QAWg0BnAjIAABdIAACNIgDCRIgCCTIAAAmIABB9IAACNIAAAXQgNA2gNAOQgWAWgrAjQgsAihYB6QgxBCgYBPIgIAhIAAABIgBABQAHAVANAPQANAOATgBQAUgBAMgPQANgOAGgRIANghQAIgSAQgMQgdBDAABVQAABsAwBPQgRgGgGgNIgOgeQgGgRgPgOQgPgPgXgBQgYgBgPAPQgPAOgIAUIADANQAPAvAbAnIAjAqQAxAxA8AYQA6AYBFABIAAAAIABAAIABAAQCKgBBihhIAjgqQA+hZgEiEQgEilhah7Qhbh8hVg/QgXgRgNgmIABg+IAAiNIgBh9IgBgmIADiTIADiRIAAiNIgBhdQBegjAXA0QAYA4hrAoIABB9IAACNIgDCRIgCCTQgCBNAQBNQABADAEADQA3AvAxA1QAsAvAoAyQAlAwAdA1IAJARQAgA/ARBEQASBHACBKQACBHgRBFQgKArgTAmIggA3IgCADIgBAAIgpA0QgKANgyAiQhDAuhPANIh6AGQg2gDg0gUg");
	this.shape_36.setTransform(-3.4753,3.121);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34}]}).wait(1));

	// Layer_3
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#000000").ss(1,1,1).p("AD+MyIAsgwIAIgLIA2hWQAvhMAYiYQAXiXggjDQgcixgCi9QgCi9gti+Qgui+ARhbIBGAEQgHBZAQBBIAdB8IAUBfIAOBeIAJBgIAFBdIAEBeQACBGAHBFIARCFIAMBiIAHBgQACAwgCAwQgBAwgFAvQgFAwgLAwIgaBhIgKAfIgJAWIgSAlIgaAsIgYAlIgMAPIgOATIghAkIgOAOIgFAFQgkAigjAWIgLAGQgiAUgiALIgKAEIgBAAQgDACgDAEQgHALAAAPIAAAuAjTQGQgygUgsgbIgigZQgWgSgTgWIgPgTIgOgTIgXgjIgNgZIgbg6IgJgYIgJgkQgHgWgKhEQgKhEAEhAQAEhAANhEQANhCARhBQAOgyAGgzQAGgzgBgzQgBgygIgzIgRhmIgThlIgQhlIgMhlQgGgzgBg0IAAhqIALhqIAThpQAOhCAeg9IAnhIIA/ASQgpA7gWBFQhEDYAUDiQARDGAnDDQAmC8gdC9AgtunQATAEAUgEAhIL2IABgyIAFgnIAeAEIAHAAQAEAQgBATIgBAKQgDAVAEAXAi9RYIAAguQAAgPgHgLIgGgGIgBgBIgIgDQAFAAAEAE");
	this.shape_37.setTransform(0.0571,4.125);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.lf(["rgba(51,153,0,0.702)","rgba(51,153,0,0)"],[0,1],0,-3.9,0,4).s().p("AiiAnIABgtQAAgPgHgLIgGgGIFdAAQgEACgCAEQgHALAAAPIAAAtg");
	this.shape_38.setTransform(-2.7,111.425);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFCC66").s().p("AifNJIgDgbIABgyIAFgnIAeAEIAHAAQAEAQgBATIgBAKQgDAVAEAXIAJAfQA3ADBThCIAYgWQA+g/APhmQARh5g6hzQgzhjgxg6Qgyg6gmgbQgmgcgFgZIABheIABgXIAAiNIgBh9IgBgmIADiTIADiRIAAiNIgBhdQATAEAUgEIAABdIAACNIgDCRIgCCTIAAAmIABB9IAACNIgBA9IgBA4QABANAnAhQAnAgAyA9QAyA8AzBkQAiBYABByQAABrhFBYIgJALQhOBdhPAKQgOACgLAAQg4AAgGgng");
	this.shape_39.setTransform(9.0752,-1.488);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(51,153,0,0.702)").s().p("ACTQxIldAAQgEgEgFAAQAFAAAEAEIgBAAIgIgEQgygUgsgbIgigYQgWgTgTgWIgPgTIgOgTIgXgjIgNgZIgbg6IgJgYIgJgkQgHgWgKhEQgKhEAEhAQAEg/ANhEQANhCARhCQAOgxAGg0QAGgzgBgzQgBgzgIgyIgRhmIgThlIgQhlIgMhlQgGgzgBgzIAAhrIALhqIAThoQAOhDAeg9IAnhIIA/ASQgpA7gWBFQhEDZAUDhQARDHAnDCQAmC9gdC9QgVAtgMAxQgSBHgCBKQgCBHARBGQAKAqASAnIAhA2QAtBABBAoIAxAdIAdAMQAzATA3ADIB5gFQBPgOBEguQAxgiALgNIAsgvIAIgMIA2hWQAvhMAYiXQAXiYggjDQgcixgCi9QgCi9gti+Qgui9ARhcIBGAEQgHBaAQBBIAdB7IAUBfIAOBeIAJBgIAFBdIAEBfQACBFAHBEIARCGIAMBiIAHBhQACAwgCAvQgBAwgFAwQgFAvgLAwIgaBhIgKAgIgJAVIgSAlIgaAsIgYAlIgMAPIgOATIghAkIgOAOIgFAFQgkAigjAWIgLAGQgiAUgiAMIgKADg");
	this.shape_40.setTransform(0.0571,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37}]}).wait(1));

	// Layer_2
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(1,1,1).p("ABlCSQgnA4g3AEIgHAAIgdgEQgpgNgfgrQgqg8AAhTQAAhTAqg7QAqg8A7AAQA7AAAqA8QAqA7ABBTQgBBTgqA8gAB3DuQgsAtg2AIIgLABIgKAAIgjgEIgQgFQglgNgfggIgaggIgLgRIgCgCQgwhPAAhsQAAhUAehEQAMgdATgZQA9hVBUAAQBVAAA9BVQA9BWAAB4QAAB5g9BVg");
	this.shape_41.setTransform(-3.625,51.15);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFCC66").s().p("AAADLIgdgEQgpgMgfgsQgqg7AAhUQAAhTAqg7QAqg8A7AAQA7AAAqA8QAqA7ABBTQgBBUgqA7QgnA4g3AEg");
	this.shape_42.setTransform(-3.625,51.425);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(0,153,51,0.753)").s().p("AgjEgIgQgFQglgNgfggIgaggIgLgQIgCgDQgwhQAAhrQAAhUAehDQAMgdATgaQA9hVBUAAQBVAAA9BVQA9BWAAB4QAAB4g9BWIgbAgQgsAtg2AHIgLABIgKABgAhliMQgqA8AABTQAABUAqA6QAfAsApAMIAdAFIAHAAQA3gEAng5QAqg6ABhUQgBhTgqg8Qgqg7g7AAQg7AAgqA7g");
	this.shape_43.setTransform(-3.625,51.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41}]}).wait(1));

	// Layer_1
	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").ss(1,1,1).p("AAIADIgDgBIgMgE");
	this.shape_44.setTransform(-8,79.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_44).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.1,-116.3,106.4,232.7);


(lib.shape56 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AApApQgRARgYAAQgXAAgRgRQgRgRAAgYQAAgXARgRQARgRAXAAQAYAAARARQARARAAAXQAAAYgRARg");
	this.shape.setTransform(-0.6,14.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#666600","#999900"],[0,1],0.1,0,0,0.1,0,7.1).s().p("AgoApQgRgRAAgYQAAgXARgRQARgRAXAAQAYAAARARQARARAAAXQAAAYgRARQgRARgYAAQgXAAgRgRg");
	this.shape_1.setTransform(-0.6,14.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("ABliMQAqA8ABBTQgBBUgqA7QgnA4g3AEIgHAAIgdgEQgpgMgfgsQgqg7AAhUQAAhTAqg8QAqg7A7AAQA7AAAqA7gACSjOQA9BWAAB4QAAB5g9BVIgbAgQgsAtg2AIIgLABIgKAAIgjgEIgQgFQglgNgfggIgaggIgLgQIgCgDQgwhPAAhsQAAhUAehEQAMgdATgZQA9hVBUAAQBVAAA9BVg");
	this.shape_2.setTransform(0.025,0);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC66").s().p("AAADLIgdgEQgpgMgfgsQgqg7AAhUQAAhTAqg7QAqg8A7AAQA7AAAqA8QAqA7ABBTQgBBUgqA7QgnA4g3AEg");
	this.shape_3.setTransform(0.025,0.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,153,51,0.753)").s().p("AgjEgIgQgFQglgNgfggIgaghIgLgPIgCgDQgwhPAAhsQAAhUAehDQAMgeATgZQA9hVBUAAQBVAAA9BVQA9BWAAB4QAAB5g9BUIgbAhQgsAtg2AIIgLABIgKAAgAhliLQgqA7AABTQAABUAqA7QAfArApANIAdADIAHAAQA3gDAng4QAqg7ABhUQgBhTgqg7Qgqg8g7AAQg7AAgqA8g");
	this.shape_4.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.6,-30.2,43.3,60.4);


(lib.sffgfgfg = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AwVI7QAxg/AbggQA5ArA2A5QgfA0guAoQgighhMhAgEgmfAHxIAKggQA0ARAzAAQBhAABdhKQBahHAvhqQAKgVAAgUQAAgKgEgOIgJgZQgxhsg+hgQAihAAgg0IAFABIBCB+QAXArAKAfQAOAvAAA2IAABnQAAB1h1CNQhSBVhIAAQhiAAiNhIgAIBEKQhBgogjg/QglhCAAhTQAAh4A3hoIAlAQQgbBSAAA8QAAA+AiA3QAgA1A5AiQBjA7DFAAQCWAACngpQBDgPA4gZQBBgZAAgTQAAgJgFgLQgiADhDAAQiyAAguhjQgOggAAgjQAAg0ASgwQATgxAhgjQA9g9A7gBQBuAABEC5QAnBlAAB3QAAAvgIAeQgJAigWAbQgwAeg0AUQgiANg+ASQjTA5iWAAQjPAAhwhIgARYjBQghAaAAAdQAABjEKgBQgPhIgpg0Qgtg5g1AAQgsAAgjAcgAkaE9QAKg+AAh8IAAhbQAAjaghloQAtg4AugqIAJACQAYD6AAGUQAABegHA8QgCAlgUAiQgRAggrAugAXOE3IgEgHQDShPCQheQgMhFhDhvQhAhuh9ikQgwg+gSgaQgegsAAgUQAAgaAZg9IAEAAQAhAiAyAlQAiAYA7AmIgfA3QBaB8A6BlQBKCAAABGIgEA6IADACQAognAbgpQAagpAHhAQAEgrAAiJQAAhCgEhfIgIiiIAkgrQAUgUAUgQIAIADQAJEoAAD5QAABKAEAnQAFA5APAkQAPAkAeAYQAgAaAkAAIBCAAQBCAABHgTIAAgFQhshHAAhuQAAg4AohDQAig5AwggQAzgjA7AAQBAAAA2AoQA0AnAlBIIgSATQgmgggngOQgngNgzAAQhFAAg1AbQgwAYAAAaQAABHBQA8QAcAWAgAPQAhAOAUAAQAvAABHgTQAqgMBqgjIAEAFIgxBzQhRAdhgAZQhtAcgsAOQhSAbgiAIQg+AQgxAAIgvAAQhKAAg2g+QhAhHAAh8IgHgBQgZBdg5A/QgvAyhJAiQg0AVgoAHQgsAKg2gBgEgqvAEcQgvgfgZg2QgXg0AAhGQAAgqARgwQAMgkAbgzQAqhCAyg0QAAgdALhAIANgFQAdAbByBZQBoBYAQA/QAPAqAAA8QAAAtgOAyQgPA1gVAaQhRBVhwAAQhFAAgrgcgEgrVAA/QAAAzAwAlQAvAlA9AAQBKAABHgyQApgeAAgfQAAgrgzg5Qg3hEheg2QiOBxAABfgAr7EtQhIAAgugVQgzgXgWgzIgEAAQgXAtgzAaQgxAYg+AAIgjAAQhEAAgtggQgzglgahTIgFAAQgMA5g3AhQhmA+hVAAQhNAAgrgtQgqgtAAhSQAAgjADgiIAkgDQAHB9B9AAQAjAAAqgOQAngMAjgUQAbgQAQgSQASgUAAgQQAAgrgWhdQgQhAgoiSIAggwQATgdAQgSIAFADQAtCvArDuQANBDApAnQAnAjA2AAIAlAAQA5AAAsgVQAxgXAKgmIAbhkIBAguIAFAGQgUBLAAAhQAAA1AfAYQAtAlBGAAIAlAAQA5AAAvgZQAygcAAhJQgDjNgYkVIgGg9QgEgiAAgVQAAgfAcgfQARgVAigeIAHAEQgCBVBNCBQgaAYggAXIAHCjQAFBjAAA9QAACcglBMQgRApgRAXQgVAdgeAPQg3Acg9AAgEAldgGnIg3guQAwhAAcgfQA2AoA5A8QggA1gtAmQgXgXgggbgEgsIgIPQAigvAogqQAyAoA4A8QgnA4ggAeQgygvg7gygEgpUgIbQAhgvAogpQAyAnA4A8QgmA3ghAeQg5g2gzgqgARanxIg3gvQAsg7AfgkQA2AoA6A8QggA0guAnQgWgWgggbgA4to7QApg4AigoQA3AoA5A8QghA2gsAmQgZgYhVhIg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-283.1,-66.7,566.3,133.5);


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
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(-6.25,-1.3,0.0347,0.0347);

	this.instance_1 = new lib.CachedBmp_35();
	this.instance_1.setTransform(7,-2.35,0.0347,0.0347);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.2,-2.3,16.7,4);


(lib.sdvfmhmhhjh = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(-1185.3,-78.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1185.3,-78.3,2370.5,156.5);


(lib.sdfsdsdsds = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap56();
	this.instance.setTransform(-157.45,-237,0.48,0.48);

	this.instance_1 = new lib.Bitmap55();
	this.instance_1.setTransform(-157.45,-63,1.1248,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-157.4,-237,314.9,474);


(lib.nsvbjhsdbfksdjfbksdf = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-847.6,-80.4,1695.2,160.9);


(lib.ljhgvljglhgjl = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EhIFgSvMCQLAAAMAAAAlfMiQLAAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EhIFASwMAAAglfMCQLAAAMAAAAlfg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-462.4,-121,924.8,242);


(lib.ljgcljhglhgl = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EhSogSKMClRAAAMAAAAkVMilRAAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EhSoASLMAAAgkVMClRAAAMAAAAkVg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-529.9,-117.2,1059.8,234.5);


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
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(-1427.55,-78.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1427.5,-78.3,2855,156.5);


(lib.ljafjlaflasf = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(522.4,186.05,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_19();
	this.instance_1.setTransform(-594.8,-70.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-594.8,-70.5,2067,388.6);


(lib.ljadlanfljafaf = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(24.2,179.7,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_17();
	this.instance_1.setTransform(74.95,-71,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(24.2,-71,2061,389.2);


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
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-991.3,-424.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-991.3,-424,1982.5,848);


(lib.kjadbvkjadbnkjadfbvakjdfvadvdv = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-220.15,-88.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-220.1,-88.5,440.5,177);


(lib.khsbkSBgksgsgseg = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eh2vhYxMDtfAAAMAAACxjMjtfAAAg");
	this.shape.setTransform(-1384.175,82.1);

	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["maktabati_L1_HTML5 Canvas_atlas_1"],0);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(3,0,0,3,-1681.7,-1826)).s().p("Eh2vBYyMAAAixjMDtfAAAMAAACxjg")
	}.bind(this);
	this.shape_1.setTransform(-1384.175,82.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2145.2,-487.1,1522.1,1138.4);


(lib.khgckhckfk = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg6MgTVMB0ZAAAMAAAAmrMh0ZAAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("Eg6MATWMAAAgmrMB0ZAAAMAAAAmrg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-373.5,-124.7,747,249.5);


(lib.khfxkxkgjgxjrzjtz = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EhCngSWMCFPAAAMAAAAktMiFPAAAg");
	this.shape.setTransform(-0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EhCnASXMAAAgktMCFPAAAMAAAAktg");
	this.shape_1.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-427.4,-118.5,854.8,237);


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
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(233.85,-237.055,0.2,0.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,51,102,0.8)").s().p("AiBAiQgOAAgKgKQgKgKAAgOIAAAAQAAgNAKgKQAKgKAOAAIEDAAQAOAAAKAKQAKAKAAANIAAAAQAAAOgKAKQgKAKgOAAg");
	this.shape_1.setTransform(238.2209,-237.6415,12.2846,10.8436);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.8,-274.8,402.9,74.30000000000001);


(lib.jhvjljgvljglj = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Egi1gQ8MBFrAAAMAAAAh5MhFrAAAg");
	this.shape.setTransform(-0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("Egi1AQ8MAAAgh4MBFrAAAMAAAAh4g");
	this.shape_1.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-224,-109.4,448,218.9);


(lib.jhjmhjj = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(0,-0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-773.4,-76.7,1546.9,153.4);


(lib.jgjgjgjgjhkfhg = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EgyIgQRMBkRAAAMAAAAgjMhkRAAAg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EgyIAQSMAAAggjMBkRAAAMAAAAgjg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-321.8,-105.1,643.7,210.3);


(lib.ihdbhadbfkiaf = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(277.6,172.35,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_11();
	this.instance_1.setTransform(-390.15,-82.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-390.1,-82.2,1862.5,388.09999999999997);


(lib.hjbihvljhvljyvkjv = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EgqVgP8MBUrAAAIAAf5MhUrAAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EgqVAP9IAA/5MBUrAAAIAAf5g");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-271.9,-103.1,543.9,206.2);


(lib.hbhjlhvj = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EglxgQnMBLjAAAMAAAAhPMhLjAAAg");
	this.shape.setTransform(-0.025,-0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EglxAQoMAAAghPMBLjAAAMAAAAhPg");
	this.shape_1.setTransform(-0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-242.8,-107.4,485.6,214.8);


(lib.sprite549_hp = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-44.35,-33.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite549_hp, new cjs.Rectangle(-44.3,-33.5,91.5,78.5), null);


(lib.phasegg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		playSound("sound145overtodown");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Layer 4
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-5.35,-6.75,0.264,0.264);

	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(-7.1,-8.75,0.264,0.264);

	this.instance_2 = new lib.CachedBmp_9();
	this.instance_2.setTransform(-5.95,-7.4,0.264,0.264);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#BF0000").ss(1,1,1).p("ABMg9QALAJAIALQANATAAAWQAAAXgNATQgIAKgLAJQgfAagtAAQgsAAgfgaQgggZAAgkQAAgjAggaQAfgZAsAAQAtAAAfAZg");
	this.shape.setTransform(0.1414,-0.4546,1.1969,1.4068);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BF0000").s().p("AhLA9QgfgZgBgkQABgjAfgaQAfgZAsAAQAtAAAfAZQALAJAIALQANATAAAWQAAAXgNATQgIAKgLAJQgfAagtAAQgsAAgfgag");
	this.shape_1.setTransform(0.1414,-0.4546,1.1969,1.4068);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-13.6,27.7,26.4);


(lib.butten_back_g_d2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(255,255,255,0)","#FFFFFF"],[0.792,1],7.7,0.4,0,7.7,0.4,15.5).s().p("AgfBxQgtgtAAhAQAAg/AtgtQArgsBAAAIAAAUIABAAQgrAIghAhQgsAtABA/QgBA/AsAtIAZAUQgfgLgagZg");
	this.shape.setTransform(-8.725,-1.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["rgba(255,255,255,0)","#FFFFFF"],[0.792,1],-4.2,14.1,0,-4.2,14.1,15.5).s().p("AgIAEIggADIgBAAIAAgSIABAAQAuAAAkAYQgYgJgaAAg");
	this.shape_1.setTransform(3.075,-15.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["rgba(0,0,0,0.251)","rgba(0,0,0,0.498)"],[0,1],9.2,-17.8,9.2,17.8).s().p("AghB+Qg0g0AAhKQAAhJA0g0QAxgzBGgCIAAAaQg8ABgpArQgtAtAAA/QAABAAtAsQApArA8ACIAAAaQhGgDgxgyg");
	this.shape_2.setTransform(-10.275,-0.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["rgba(0,0,0,0.251)","rgba(0,0,0,0.498)"],[0,1],-8.9,-17.8,-8.9,17.8).s().p("AhYCzIAAgaIAGAAQA8gCApgrQAtgsAAhAQAAg/gtgtQgqgsg+AAIgDAAIAAgaIAGAAQBGACAxAzQA0A0AABJQAABKg0A0QgxAyhGADg");
	this.shape_3.setTransform(7.25,-0.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["rgba(0,0,0,0)","rgba(0,0,0,0.451)"],[0.549,1],6,-4.2,0,6,-4.2,21.3).s().p("AAJCHIgXgUQgtgtABhAQgBg/AtgsQAfggAqgJIAADXIABAAIAABGQgbAAgYgIg");
	this.shape_4.setTransform(-6.4003,4.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["rgba(0,0,0,0)","rgba(0,0,0,0.451)"],[0.549,1],-7.6,-4,0,-7.6,-4,21.3).s().p("AhLCRIAAhGIgBAAIAAjXIAigEQAbAAAXAIIAYAUQAtAtAABAQAAA/gtAtQgrAsg/AAg");
	this.shape_5.setTransform(7.175,4.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_2
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCCC").s().p("Ah0B2QgwgxAAhEQAAhEAwgxQAwgxBEAAQBEAAAwAxQAxAxAABEQAABEgxAxQgwAwhEAAQhEAAgwgwg");
	this.shape_6.setTransform(-1.175,-1.175);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Layer_1
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["rgba(255,255,255,0.298)","rgba(0,0,0,0.298)"],[0,1],10,19.9,10,-19.9).s().p("AgoCNQg6g6AAhTQAAhSA6g6QA5g6BSAAIAAGNQhSAAg5g6g");
	this.shape_7.setTransform(-11.05,-0.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["rgba(255,255,255,0.298)","rgba(0,0,0,0.298)"],[0,1],-9.9,19.9,-9.9,-19.9).s().p("AhjDHIAAmNIABAAQBTAAA5A6QA5A6AABSQAABTg5A6Qg5A6hTAAg");
	this.shape_8.setTransform(8.8,-0.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.9,-20.9,39.7,39.9);


(lib.butten_back_g_d1 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(255,255,255,0.682)").s().p("AAAD5QhmAAhIhJQhJhJAAhmQAAhnBJhJQBIhIBmgBIAAAAQBnAABIBJQBJBJAABnQAABmhJBJQhIBJhnAAg");
	this.shape.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.8,-24.9,49.6,49.8);


(lib.butten_back_g_d = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(0,0,0,0.2)").s().p("AAAD5QhqgBhNhIQhMhJABhnQgBhmBMhKQBNhIBqAAIABAAQBrAABMBIQBMBKgBBmQABBnhMBJQhMBIhrABg");
	this.shape.setTransform(0,0.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.9,-23.9,51.9,49.8);


(lib.btn_play = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		playSound("sound145overtodown");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Layer 5
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-3.85,-7.35,0.2755,0.2755);

	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(-3.7,-9.9,0.2755,0.2755);

	this.instance_2 = new lib.CachedBmp_6();
	this.instance_2.setTransform(-3.85,-7.35,0.2755,0.2755);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#BF0000").ss(1,1,1).p("ABghJQAcAWAIAdQAEAKAAAMQAAAMgEAMQgIAcgcAVQgoAfg4AAQg4AAgngfQgogeAAgrQAAgqAogfQAngeA4AAQA4AAAoAeg");
	this.shape.setTransform(0.95,0.4608,1,1.235);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BF0000").s().p("AhfBJQgogeAAgrQAAgqAogfQAogeA3AAQA4AAAoAeQAcAWAIAdQADAKAAAMQAAAMgDAMQgIAcgcAVQgoAfg4AAQg3AAgogfg");
	this.shape_1.setTransform(0.95,0.4608,1,1.235);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.6,-13.4,29.1,27.8);


(lib.EXPLOR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


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


(lib.shape92_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E19562").s().p("AgqBoQgbgRgLgeQgKgcAAggIAAgCIABhUIA+gDQAtgJAxgRIAAAAQAMAfAFAlIAGBEQABAegJAXIgIAOIgKAKQgWAVgdADIgHAAQgaAAgWgPg");
	this.shape_2.setTransform(3.8048,19.6608);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#DC8145").s().p("AhOAEIALgBIA7gJQAmgHAjgPIACgBIAMAeQgxARgtAJIg+ADg");
	this.shape_3.setTransform(2.575,7.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5A8E24").s().p("AhlCvIg2jLQARigBmAMIABAAIAAAAQAiAWAYAdQAbAjAUAoIAsBVIAqBQIgSAKQglAUgrAOIhWATg");
	this.shape_4.setTransform(-0.2,-11.5419);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgCEzQgbgNgQgaQgSgagGgdIgFggIAAgBIgBgiIgCg9IgBgZIgDABIgwgEIgkjfIA3DLIBJADIBVgTQAsgOAkgTIASgKIgqhQIgshWQgUgogbgjQgYgdghgWQAsAJAeAnQAfAmAXArIAvBeIAcA8IABABIAEAKIACAEIg/AhIACAGIAJAdIAKAqIAJA0QAFAjgBASQAAATgGAUQgGAUgIAKIgJANQgUAYgfAHQgMADgLAAQgTAAgRgIgABTAZQgjAPgnAHIg6AKIgLABIABAaIAABUIAAACQAAAhAKAcQAKAeAbARQAYARAfgCQAegDAVgVIALgKIAHgOQAKgXgBgeIgHhFQgFglgMgfIAAAAIgMgfgAgtk6IAAAAIAAAAIABAAg");
	this.shape_5.setTransform(0.775,2.2524);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

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


(lib.shape90_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#DB7860").s().p("AkSA+QgagDgTgTQgUgTAAgVQAAgXAUgOQATgOAaAEQAbADATATQATATAAAWQAAAWgTAOQgPALgUAAIgLgBgADJAoQgYgNAAgXQAAgWAYgTQAYgUAhgEQAigFAYANQAYANAAAXQAAAVgYAUQgYATgiAFIgRABQgXAAgRgJg");
	this.shape_3.setTransform(192.675,285.5515);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_11
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgIB6QgvgEgTgPQgTgPgGgSQgIgZADggQAEg4AageQAYgXAegEQA8gDAgA0IAKAPIAIAYQAMAhACAhIgDA6IAFADIgJAFIgZACQgPABgTAAQgVAAgZgBgABEBxIATgCIACgpIgBgCIgCgMQgBgrgSghIgFgOIgLgNQgJgLgGgCQgngbgoAhIgLAKQgKAQgHASQgLAZADAeQACAbAJASQAKARA4AEIA3ACQgBAAAAAAQgBAAABAAQAAAAAAAAQABAAABAAIALgBgAAjg3IABAAIAAAAgAhAhyQAbgPAhAMQg6AEgjAuQAEggAdgPg");
	this.shape_4.setTransform(168.0702,267.2447);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E19562").s().p("AgoC1IgIgDQgagJgOgbIgOgtQgLg5AAgpQAAgUADgTIABgyQAAgKADgMIAGgWQADgPAGgNQAIgQAUgBQADgDADAAIA9AEQARACAZAOQAhASAWAfQALAPACAlIgBBrIgCAOIgBAeIgBAFIgQAhIgYAdQgZAYgeACIgegBIgBABgAgWiGQgeAFgYAWQgaAfgEA4QgCAfAIAaQAFARATAPQATAQAwADQAuAEAhgDIAagDIAIgEIgFgEIADg5QgCghgLghIgJgYIgJgPQgfgyg4AAIgGAAgAhCiTQgcAPgFAgQAkguA5gFQgOgFgNAAQgRAAgQAJg");
	this.shape_5.setTransform(168.225,270.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_10
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(202.25,238.5,0.3331,0.3331);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(154.5,236.05,0.3331,0.3331);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_9
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ah9CHIgNAAIAAgBIAMgHQgOiSBDhDQAxgnA7ANQA8AMAdA4QAPAjAAAxQgBAygaAWQgMALhUALIh5AFgAhHgzQg8A5AYB2IBAAEQA1gBBbgWQAlhzhNgtQgjgagfAAQgjAAgfAegAAnh3IgjgFQgjADglAKQAegVAigGIARABQAeABAbAPQAOAJAJAOQgagOgcgHg");
	this.shape_6.setTransform(212.7,265.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E19562").s().p("AhtCxQg2g3AAgmQAAgHADgZIAEgoIgGh1QAAgpAKgTQAPgdAygfQAXgPA1AHQAxAGASASQAaAMAOASIAUAgQAQAZAJAkIAMA+IALB5QAABIg5AmQgsAeg1AAQg8AAg7g8gAhah6QhDBDAOCSIgLAHIAAABIAMAAIAVAEIB5gFQBTgLANgLQAagWABgyQAAgxgQgjQgdg4g8gMQgOgEgNAAQgrAAgmAegABNiGQgJgPgPgIQgagPgdgBIgSgBQgiAGgeAVQAlgKAkgDIAiAFQAcAHAaAOIAAAAg");
	this.shape_7.setTransform(214.35,268.8494);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_8
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgQBTQgRgDgHgbQgIgbAHgiQAIgiARgWQAQgWARADQASAEAHAbQAHAbgHAhQgHAjgSAWQgPATgOAAIgEgBgAgGg8QgIAHgCANQgDAMAEALQAFAKAIABQAHACAIgHQAIgIACgNQADgNgEgKQgEgKgIgCIgDAAQgHAAgGAHg");
	this.shape_8.setTransform(213.7435,267.9505);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgFAfQgIgCgFgJQgEgLADgMQACgNAIgHQAIgIAIABQAIACAEALQAEAKgDAMQgCAMgIAIQgGAGgFAAIgEAAg");
	this.shape_9.setTransform(204.325,266.0848);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8}]}).wait(1));

	// Layer_7
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgEAfQgIgCgEgKQgEgJACgMQACgNAHgIQAHgIAHABQAIABAEALQACAFABAHQgGANgEAQIAAABQgGAHgGAAIgCAAg");
	this.shape_10.setTransform(163.9042,265.3693);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgNBUQgQgDgIgaQgHgbAFghIACgIQADgQAGgOQAFgLAGgIQAQgXAPADQAQACAIAaQAHAagFAiQgGAjgQAWQgOAVgOAAIgDAAgAgHg7QgHAIgCANQgCAMAEAKQAEAKAIABQAHABAHgIQAHgIACgNQACgNgEgJQgEgKgIgCIgDAAQgFAAgGAIg");
	this.shape_11.setTransform(168.775,269.0498);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10}]}).wait(1));

	// Layer_6
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AA9BcIgMABQgBAAAAAAQgBAAAAAAQAAAAAAAAQABAAAAAAIg3gCQg4gEgJgRQgKgSgCgbQgCgdAKgaQAHgSALgQIAKgKQAoghAoAbQAGACAIALIALANIAGAOQARAiACAqIACAMIABACIgDApIgTACgAAfhLIAAAAIAAAAg");
	this.shape_12.setTransform(168.501,269.2425);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1));

	// Layer_5
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AhqBlQgYh1A8g6QA9g6BHA1QBNAtglB0QhbAVg1ACg");
	this.shape_13.setTransform(212.5974,267.5165);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(1));

	// Layer_4
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgZAkIgOAFQgVAKgPAOIABgCQAQgdAhgSIAfAJQAHgQgOhWQAbA3gGA6QAeAOAaAbQgygbgzgOg");
	this.shape_14.setTransform(184.125,277.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1));

	// Layer_3
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgRgFQASgHAQARIgEACIgGABQgJAAgPgNg");
	this.shape_15.setTransform(186.1,286.2203);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1));

	// Layer_2
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#DC8145").s().p("AAoAsIgXgPQgUgQgPgBIAEgEIgRgDIgBADIgGgDIABAAIgEgBIAAgDIAHgBQAOgIAGgkIADAcIgEASQAVAEAYAaIALAMIABABg");
	this.shape_16.setTransform(186.3,279.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(1));

	// Layer_1
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000099").s().p("AAAAAIAAAAIAAAAg");
	this.shape_17.setTransform(235.925,274.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#47350E").s().p("AAAAAIAAgBIABADg");
	this.shape_18.setTransform(234.625,244.375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#E1997B").s().p("AAAABIAAgBIAAABg");
	this.shape_19.setTransform(209.15,231.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#DB8460").s().p("Ak3BBIACABIAAAAIALAOgAEQARIAAAAIgBABgAE1hPIADAFIgBAAg");
	this.shape_20.setTransform(221.55,277.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#DC8145").s().p("AoFAtIgCgWIACgVQADgTAIAAIABAAIACACQAKAMAOAcQgZAIAAAeIAAAEQgJgCgEgUgAHZAaQAhgqglgmQAQgQAaAFIACAAIAHAUIAAAMQgBAMgJANQgWAcgPAGg");
	this.shape_21.setTransform(201.475,276.7155);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E6A377").s().p("AgWFAQgUgLgTgUQgSgUgGgxQgGgyAPgVQAPgWAZAVIAOANIgCArIgEgFQgOgTgRgCIAEAEIgCAAQgHAAgEAUIgCAVIADAWQAEAUAJACIACAQIABgHQAGggASgCQgBADABAOQACAfADAQIADAPgABXlAIAAABIgCACg");
	this.shape_22.setTransform(156.5143,256.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E19562").s().p("AiGG3QhFgHgfggIgWgYIANAYIACAEIgcgGQgUgDgygVQgzgWgqgjQgzgzgIgZQgIgZgBgJIgGgxQgFgoAHhFIABgFIgCg2QgBgXAAgrIgBhhIAAgDIABgEIADhLQACg1AKgjQAIggAcgpIAEgFIAAAGIACAOIAHAXIAegoIACgCIAVAuIAdgrIAQAsIAdgrIAZAqIAdg0IASApIAAAAIACAGIAkg7IAeA7IAlg5IAjA4IAYg2IAfA3IAdgyIAgAxIABADIAUg2IAZAyIAWgwIAPAsIAdgsIAdAqIAegwIAYAtIANgSIACAJIABAAQAFAbAMAiIAAABIACAEQALAfALAXIAAAAIAMAZIAAAAIABACIABABIAAABIAEAZIgBAAIACADIAFApQAGBCAFBnIgEBVIAAAAIAAAAQAxhdA7gPIBEgDQASAHAGASQARAtgGAwQgHAggXAeQglAygzgBQgtgBgLgHIAUATQggA4g6ArQg7AshDAdQguAVgxAIIgWACIAIgUIgGAGQg2AuhIACIgcAAgAkdEOIABgBIgBAAgAiRC8IgMgOIAAAAIgBgBIgBAAgAGaA6QAUATgCAaQgCATgGAGIADgCIABgBQAPgGAWgdQAJgNACgMIAAgMIgIgUIgDgFQgIgRggARQgjASgUA4QAhgsALAAIAAAAgAAclkIABAAIAAgCgAkhl2IAAABIABgCg");
	this.shape_23.setTransform(206.3146,266.825);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#36150E").s().p("AFfF0IAAgKIgQjRIAAAAIAZACIgFgFIgZgeIgBgCIgCgDIgNgbIAAAAIghhZQgJgeAAgdIAAgJIAEgYIAAAAIgBAAQgcAcgHAWIgbgyIgbA0IgbgxIgbAuIgWgvIgVAwIgagyIAAAAIgDAGQgLAagGATIgBAAIghguIgZAvIgig1QgRAigHATIggg4IAAAAIgBAAIggA5Igdg5IgBAAIgCAAIgjAzIgCgEIAAAAIAAAAIgVgpIgcA0IgTgqIghAwIgMg7IggA5IgRgzIgGAGQgMAMgKAPIAAAAIgGAKIABgTIAHgjIAAAAIgmApIgCACQgfAlgMArQgGAUgDAZIgFA3IAACwIgahyQgThdAKhkQALhmBlhvIARgPQAjgeAngYQBgg0BogVQBSgPBMACQBIAEBGATQA8ARA8AcQAyAXAuAhQAGgXgGgKQAUAagNAQQAjgiASAZQgSgKgbAWQBTBFAaBiQAoCYgyDlQgZgDg5ANQgkAOggAiIgEAFIAAgCg");
	this.shape_24.setTransform(203.2301,229.2076);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhnJkQgvgGgtgbIgpgJIgBAAQghgHglgQIgzgaQgygegfgmIggg0IgdgRQgugcgNg8QgMg8ATgoQASgoAxAcQABgGgDgSIgnirQgfh9AOhoQAMhlBnhrIAZgZIgFAHIAPgRQAlgbAlgVQBhgxBogTQBVgRBWAFQBAAEBBANIAwAPQBmAnA1AmQACgIgJgjQAqAlACAUQANgGALACQAkAFgHAlQgYgOgRAHQAiAdAWAfQBHBlgFCpQgFCggXA7IgCAGIADADQAUAUAJAdQALApgGAsQgJArgeAnQglAwhJABQgyBIhOA0QhTA4hGASQhGASgLgEIgRAKQgtAZhIAAIgVgBgAjFIqQAfAgBGAHIACABIAbgBQBIgBA2gvIAHgFIgIAUIAWgDQAxgIAugUQBCgdA8gsQA5grAgg5IgTgTQAKAIAuABQAyAAAmgxQAXgeAHggQAFgxgQguQgGgSgTgHIhEAEQg6AOgxBeIgBAAIAEhWQgEhmgHhBIgFgpIAAgEIgEgYIgBgCIgBgBIgBgCIABABIgNgaIAAABQgKgXgLgfIgCgFIAAgBQgMghgGgbIAAgBIgCgJIgNASIgYgtIgeAxIgdgrIgdAtIgQgsIgWAvIgZgyIgUA2IgBgCIgggyIgdAzIgfg3IgXA2Igjg4IglA4Igeg7IgkA7IgDgFIAAgBIgSgpIgdA0IgZgpIgcArIgQgsIgeArIgUguIgBgCIgCAEIgeAnIgHgXIgCgOIAAgGIgDAFQgcAqgIAfQgKAjgDA1IgDBLIgBAEIABADIABBgQgBAsABAWIACA4IAAAEQgHBGAFAnIAGAxQABAJAIAaQAIAZAyAyQAqAkAzAVQAzAVAUAEIAbAFIgBgEIgOgXgAnfF3IgDgQQgEgQgCgfQgBgOACgCQgTABgFAgIgBAHIgDgQIAAgEQAAgeAZgHQgOgegKgMIgCgCIgEgDQARACAPASIAEAFIACgrIgOgNQgZgUgPAVQgPAWAGAxQAFAyATAUQASATAUAMIAEABgAFmCYIAEgEQAfgiAlgOQA5gOAYAEQAyjkgoiZQgahihThFQAcgWARAKQgRgZgjAiQAMgRgUgaQAGAKgGAYQgtgigzgXQg8gcg7gQQhGgThJgEQhLgDhSAQQhpAVhgA0QgmAXgkAeIgQAQQhmBugKBmQgLBmAUBcIAZByIABivIAEg4QAEgZAFgTQAMgtAggkIABgCIAmgqIAAABIgGAiIgBATIAFgJIABAAQAJgPAMgNIAGgGIARAzIAhg4IALA6IAhgwIAUArIAcg1IAUApIABAAIAAABIABADIAkgyIACgBIABABIAcA5IAhg5IAAgBIABABIAfA4QAHgTASgiIAiA1IAZgvIAhAtIAAAAQAGgTAMgZIACgGIABAAIAZAxIAWgvIAVAuIAbgtIAbAwIAbgzIAcAyQAGgWAdgcIABgBIAAABIgEAYIAAAJQAAAdAJAeIAgBZIABAAIANAbIACADIABACIAZAfIAFAFIgZgDIgBAAIAQDRIAAAJIAAAAIABACgAHREBQADgagUgSQgLgBghAsQATg3AjgTQAggRAJASIABAFQgagFgQAQQAlAlghArIgBABIgEADQAGgGACgUgAj7jbIABgCIgBACg");
	this.shape_25.setTransform(202.5943,251.3514);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]}).wait(1));

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


(lib.shape88_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#404248").s().p("AiUBIQh0gEgpgaIgQgQIgBgzIgBgQQAngNBdgIICLgLIB+ADQBfADBSAQIBJANIgBA+IgNADIgMACIjyAnQglAGhJAAIhegCg");
	this.shape_5.setTransform(1.525,-1.794);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#626473").s().p("AARBVIAAgCIgFgBIi1gCQhggnglgeIgDgDIgPgLIgChPIARAQQApAaB0AEQCSAEA5gIIDzgnIALgCIAOgDIgFBVIjfBCIgjAJIgqAJg");
	this.shape_6.setTransform(1.575,9.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhaCRIgQgCIgMgBIgKgCIgegGIgGgCIgFgCIC0ADIAGAAIAAACIgMAJIgtADgAFCgiIABg/IhJgNQhSgQhfgDIh+gDIiLALQhdAJgnANIABAQIABAzIABBOIgCgCIgDgBIgMgJIAAiNIAAgBQAFgSB8gLICSgJICBAEICUAMIAxAGIBMAMIgFCaIgRAJg");
	this.shape_7.setTransform(1.625,4.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(1));

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


(lib.shape86_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#626473").s().p("AAkDBQgrggg0gXQg0gXg6gOIgFgEQgGgFACgLQACgMAGgOQAGgOALgNIAPgSIAHgGIghAVIgBhgIAAgCIAAAAQAIhQAjguIATgUIAQgLQASgMAXgGIAygGQBOAAAsBAQAZAkAFAWIAEAUIABADQAACIACAnIgCgCIgtgvQAQAfAYAnQAXAmAAAvQAAAvg3Akg");
	this.shape_5.setTransform(-1.425,6.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("ABwESIhCg4IgcgRIAAAAIgUgOQhgg7hDgFQgWgCgIgUQgFgZAIgSQAJgTAAADIgBgzQgCg3ACgRIAGgkQAIgjANgbIAUggIAQgSQALgKANgIIAAAAQApgbA9AAQBYAAAzBJQAZAkAHAfIABAGIABACIABAWIAAAhIAFCrIAFAQQATA3gUAqQgUApgxAVgAiJAKIgPASQgLANgGAOQgGAOgCAMQgCALAGAFIAFAEQA6AOA0AXQA0AXArAgIBYA+QA3gkAAgvQAAgvgXgmQgYgngQgfIAtAvIACACQgCgnAAiIIgBgDIgEgUQgFgWgZgkQgshAhOAAIgyAGQgXAGgSAMIgQALIgTAUQgjAugIBQIAAAAIAAACIABBgIAhgVg");
	this.shape_6.setTransform(-1.5231,6.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5}]}).wait(1));

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


(lib.shape84_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#626473").s().p("AiWDVIgChgIgFiuIgChCQAEgfAQgeQAPgfAdgVQAdgWAggGQAigEAfALQAdALAZAUQAXAUASAfIAFALQANAlAFBbIAFBpIAGCNQgbARgZALIgQAHQg4AVgwAAQhNAAg9g1gAiRDCIABgDIAAgHg");
	this.shape_5.setTransform(0.675,4.0269);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AilDqQgCiQgFh5IgEg2IABgCIAEgOQAIgdALgbQANgeAWgUQAYgXAegKQAdgLAdAEQAgACAgAOQAdAOAYAZQAVAYAOAdIAFALIAHAXIABAIQAFAZABAaIALEYIgPAMIgHiNIgEhpQgFhbgNglIgGgLQgRgfgXgUQgZgUgdgLQgggLghAEQggAGgdAWQgdAVgPAfQgQAegFAfIADBCIAFCuIACBgg");
	this.shape_6.setTransform(0.5,0.4063);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.1,-24.5,35.3,55.2);


(lib.shape82_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFCC33").s().p("AgUAXQgJgJAAgOQAAgMAJgKQAIgKAMABQAMgBAJAKQAJAKAAAMQAAAOgJAJQgJAKgMAAQgMAAgIgKg");
	this.shape_4.setTransform(13.55,0.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5A8E24").s().p("AiuA2IgaAAQACgiALgWQALgWAMgJIANgKQAVgLAYgBQAWACAUAJIACABQATALAMATICJgPIgGgKIAcAAIA8gHIAIAjQAHAcgFAjQhtADhkAAQhUAAhPgCgABrABIAAAAIAAgBg");
	this.shape_5.setTransform(0.3042,0.1386);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#666666").s().p("AjIBDIGRAAIAAANImRAEgAAnhCQgCgNAMgEQAXAIAiACQAhACAdgJQAcgIgFAcQgaAMgcAAIgRABQgoAAgpgTg");
	this.shape_6.setTransform(0.05,0.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AjUBfIAAgQIABgXQADgfALgaQALgdAZgQIAKgHIAXgHIAogDIAVAFIAHACIABAAIBSgMQAGgeAbAHIAtAGQAmABAggIQAfgIABAjQAAAKgDAHQAEAGAGAgQAGAhgGBIgAjJBVIGSgFIAAgNImRAAgAiVgpIgMAJQgMAJgLAWQgMAWgBAjIAaAAQCsAFDIgGQAFgkgHgcIgJgjIg7AHIgcAAIAFAKIiIAQQgNgUgSgKIgDgBQgTgKgXgCQgYABgVAMgAgvgxQAVARADALIAXgEQgOgWgPgFgAgPg2QAFACAXAaIAagDIgkgbgAALgbIAAAAgAARg5IAjAaIAigDIg6gagAAnhBQAxAWAxgFQAbABAbgMQAFgdgcAJQgdAIgigCQghgCgXgIQgNAEADAOgABtACIAAAAIABABg");
	this.shape_7.setTransform(0.0565,-0.0003);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D9D9D9").s().p("AhCgIIASgCQAPAFAPAVIgYADQgDgKgVgRgAgigMIATgDIAjAaIgZAEQgYgZgFgCgAgBgQIAKgCIA6AYIgiADg");
	this.shape_8.setTransform(1.975,-4.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(1));

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


(lib.shape80_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E19562").s().p("Ag9DMIgEgCQgPgOgFgTIgEgZQgCgyACgyIABgSIACg2IALhoQAGgyAHgaIBXgEQAjADAXAOIABAAIAHABIgLAjIgHAWIgjB5QgKAkgFAlIgBAHIgGA0IgDApIgGAcQgHASgRAHQgJADgIAAQgOAAgNgJgABRjCIABgBIgBAAg");
	this.shape_5.setTransform(0.175,3.1606);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ag6DWIgDgBQgOgJgJgOQgJgOgEgQQgEgTAAgYIABhOIAAgaIABgRQACg2AJhOQAJhOARgDIADgBIgDABIADAAQgHAagGAxIgKBpIgCA2IgBASQgCAyACAxIADAaQAGATAPANIADADQAVAOAYgJQAPgGAJgSIAFgdIAEgoIAFg0IACgIQAEgkAKgkIAjh5IAIgWIAKgjQAPALgPArIgBADIgQAwQgXBIgNBJIgBAHIgFAtIgEAyIgBAMQgDAYgQARQgRAQgWABg");
	this.shape_6.setTransform(-0.1775,4.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5}]}).wait(1));

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


(lib.dfbmjmjmhjgfhm = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-367.2,-82.2,734.5,164.4);


(lib.dfbdfjkj = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(-1216.25,-78.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1216.2,-78.2,2432.5,156.5);


(lib.dbfffdg = function(mode,startPosition,loop,reversed) {
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

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-586.1,-67.8,1172.2,135.6);


(lib.Path = function(mode,startPosition,loop,reversed) {
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["maktabati_L1_HTML5 Canvas_atlas_3"],24);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-20,797.5)).s().p("EhOHA+5MAAAh9xMCcPAAAMAAAB9xg")
	}.bind(this);
	this.shape.setTransform(500,402.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,1000,805), null);


(lib.bnmhmh = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("Ak7JFQAkgyAlgmQAyAnA4A8QgpA7gdAbQg2gzg3gugAiII5QAjgvAngpQAyAnA3A8QgoA5geAdQgzgyg6gvgAKaI2IAOgfQAqAUBBAAQBfAABjhYQBkhZAPhmQgIgUgRgVQgtg/gkhNQAVgyAeg4IAGgBQAsBoAoAsQAyA0BMAAIAlAAQA5AAAvgZQAxgdAAhIQgCjFgZkcIgGg+QgDgiAAgVQAAggAcgeQATgXAggdIAHAGQgDBUBOCAQgbAaggAWIAICjQAFBiAAA+QAACbgmBNQgQAogRAYQgVAdgeAPQg3Acg+AAIghAAQg+AAgggeIgEAAIACAhQAAAigJAmQgKAogSAgQg1Bdg8AwQg3Asg2AAQhhAAiIhJgABjHpIAOgfQA9AgBKAAQBHAABFgjQBGglBAhGQBPhXAIhEQg8AQg/AAQhZAAg2gpQg8guAAhYQAAhSA7hMQBIhOA9AAQApAAAkAbQAlAcAbAzQA7BqAACUQAACJhGBrQh1Cxh6ABQiFAAiGhbgAF4g4QgjAcAAAaQAAApAyAdQAvAcA9gBQA5ABAwgMQgUhMgngrQgrgyg5AAQghABgkAcgAbFFCQAKhAAAh5IAAhbQAAjbghlnQApg1AyguIAIADQAYD6AAGUQAABkgGA1QgCAlgUAjQgRAfgrAvgAlREzQhSAAgwgYQgqgVgTgqIgGAAQhKBXhVAAQhTAAgShOIgEAAQhGBOhbAAQhRAAgIhPIgEAAQhEBPiCAAIgkAAQhLAAgqgZQgzgegZhLQhcAphcABQhNgBgsgaQgwgcAAg2QAAgsAdhBQA5h5DxiGIgFhGQAoguAhgeIAKAAQAECQACEgQAAAzAHAeQAIAhAUASQAdAYBFAAIA2AAQBCgBAugTQAzgVAhgtIAvhJIBHgZIAEAEQghA6gLAVQgRAkAAASQAAAWAPAMQAOANAWAAQAsAAAlgcQARgMAQgXQARgXAKgYIAWg3IBHggIAEAFQgWA0gIAeQgIAeAAAaQAAAVAMAPQAPASAZAAQAhAAAfgVQAUgNANgXQAMgVAJggIAThKIBGguIAEADQgXBNAAAxQAAA1ArAaQAmAWBHAAIAlAAQCGAAAxgSQA1gUAAgVQAAgegdhCQgTgsgthZQAkg/AigpIAEAAQAmBCAZBFQAdBUAAA/QAAAxgRAuQgQAlgfApQgfAfg4ANQg4AMhrAAgA7WA0QAAAaAjAOQAgAMA0AAQA4AABRgaIgEjkQj8CBAABJgAuVjyQAigvAngpQAyAmA5A+QgpA5geAcQgygwg7gxgArhj+QAhgvAogqQAyAnA4A9QgmA3ghAfQgxgwg7gxgAtjm4QAigvAogpQAxAnA5A8QgnA4ggAeQg6g3gzgqgA61pBQAkgxAmgnQAvAlA7A/QgoA4gfAdQg0gyg5gvgA4BpNQAigwAngoQAvAlA7A+QgmA3ghAfQgxgvg7gyg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-183.3,-67.8,366.70000000000005,135.6);


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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["maktabati_L1_HTML5 Canvas_atlas_2"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(0.216,0,0,0.252,-129.3,-127.7)).s().p("AtyT+MAAAgn7IblAAMAAAAn7g")
	}.bind(this);
	this.shape.setTransform(-41.55,7.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129.9,-120,176.7,255.6);


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

	// Layer_3
	this.instance = new lib.Bitmap20();
	this.instance.setTransform(-307,-226,2.0438,2.0438);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(122).to({_off:false},0).wait(52));

	// Layer_2
	this.instance_1 = new lib.Bitmap19();
	this.instance_1.setTransform(-462,-226,1.5238,1.5238);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(59).to({_off:false},0).to({_off:true},64).wait(51));

	// Layer_1
	this.instance_2 = new lib.Bitmap18();
	this.instance_2.setTransform(-320,-235,1.1,1.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},60).wait(114));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-462,-235,960,469.7);


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


(lib.sprite200 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape199("synched",0);
	this.instance.setTransform(-0.8,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:0},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.4,-5.2,23.700000000000003,10.5);


(lib.sprite195 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape194("synched",0);
	this.instance.setTransform(0,6.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44,-15.8,88.1,31.700000000000003);


(lib.sprite117 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape116("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite117, new cjs.Rectangle(-6.7,-5.2,13.4,10.4), null);


(lib.sprite115 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape114("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite115, new cjs.Rectangle(-6.3,-4.7,12.7,9.4), null);


(lib.sprite113 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape112("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite113, new cjs.Rectangle(-8.3,-5.8,16.6,11.8), null);


(lib.sprite111 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape110("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite111, new cjs.Rectangle(-12.4,-5.9,24.9,11.9), null);


(lib.sprite109 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape108("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite109, new cjs.Rectangle(-12.4,-5.9,24.9,11.9), null);


(lib.sprite107 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape106("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite107, new cjs.Rectangle(-9.8,-6.3,19.8,12.7), null);


(lib.sprite105 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape104("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite105, new cjs.Rectangle(-9.9,-6.4,19.8,12.9), null);


(lib.sprite103 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape102("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite103, new cjs.Rectangle(-13.4,-44,26.8,88), null);


(lib.sprite101 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape100("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite101, new cjs.Rectangle(-8.5,-48.4,17.1,96.9), null);


(lib.sprite99 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape98("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite99, new cjs.Rectangle(-3.2,-50.1,6.5,100.30000000000001), null);


(lib.sprite97 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape96("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite97, new cjs.Rectangle(-9.2,-48.1,18.5,96.30000000000001), null);


(lib.sprite95 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape94("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite95, new cjs.Rectangle(-13.2,-42.9,26.4,85.8), null);


(lib.sprite93 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape92("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite93, new cjs.Rectangle(-15.1,-21.3,30.299999999999997,43.1), null);


(lib.sprite91 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape90("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite91, new cjs.Rectangle(-11.8,-36.5,23.700000000000003,72), null);


(lib.sprite89 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape88("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite89, new cjs.Rectangle(-33.6,-44.5,67.30000000000001,89), null);


(lib.sprite87 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape86("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite87, new cjs.Rectangle(-35.6,-44.1,71.30000000000001,88.30000000000001), null);


(lib.sprite85 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape84("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite85, new cjs.Rectangle(-42.4,-55.6,84.8,111.30000000000001), null);


(lib.sprite83 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape82("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite83, new cjs.Rectangle(-43.1,-55.1,86.30000000000001,110.2), null);


(lib.sprite81 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape80("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite81, new cjs.Rectangle(-38.3,-65.3,76.6,130.7), null);


(lib.sfgsdgsdgsdgsg = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.zdbdfvdvdsv("synched",0);
	this.instance.setTransform(-24.2,-480.7,1.5749,1.5749,0,0,0,0,0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1103));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_37();
	this.instance_1.setTransform(-1213.25,-69.25,0.5,0.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(81).to({_off:false},0).to({_off:true},586).wait(436));

	// Layer_2
	this.instance_2 = new lib.dfbmjmjmhjgfhm("synched",0);
	this.instance_2.setTransform(25.45,336.35,0.96,0.96,0,0,0,0.1,0);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(225).to({_off:false},0).to({_off:true},442).wait(436));

	// Layer_8
	this.instance_3 = new lib.dfbdfjkj("synched",0);
	this.instance_3.setTransform(25.05,653.35);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(300).to({_off:false},0).to({_off:true},367).wait(436));

	// Layer_7
	this.instance_4 = new lib.bnmhmh("synched",0);
	this.instance_4.setTransform(25.05,961.65);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(420).to({_off:false},0).to({_off:true},247).wait(436));

	// Layer_6
	this.instance_5 = new lib.sdvfmhmhhjh("synched",0);
	this.instance_5.setTransform(25.05,1270.05);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(483).to({_off:false},0).to({_off:true},184).wait(436));

	// Layer_5
	this.instance_6 = new lib.sffgfgfg("synched",0);
	this.instance_6.setTransform(33.45,1642.45);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(602).to({_off:false},0).to({_off:true},65).wait(436));

	// Layer_10
	this.instance_7 = new lib.jhjmhjj("synched",0);
	this.instance_7.setTransform(339,43);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(667).to({_off:false},0).wait(436));

	// Layer_11
	this.instance_8 = new lib.khsbkSBgksgsgseg("synched",0);
	this.instance_8.setTransform(1849.55,1061.95,1.3,1.3);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(775).to({_off:false},0).wait(328));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1213.2,-584.8,2454.5,2493.1);


(lib.pkadpfkafpaf = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.ljhgvljglhgjl("synched",0);
	this.instance.setTransform(6.65,11.75);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-455.7,-109.2,924.8,242);


(lib.okandflnalfdf = function(mode,startPosition,loop,reversed) {
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

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.khgckhckfk("synched",0);
	this.instance.setTransform(-2.75,-6.25);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-376.2,-131,747,249.5);


(lib.kjabfkakfjaf = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.khfxkxkgjgxjrzjtz("synched",0);
	this.instance.setTransform(-0.6,-5.45);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-428,-123.9,854.8,237);


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

	// Layer_2
	this.instance = new lib.shape146("synched",0);
	this.instance.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(138));

	// Layer_3
	this.instance_1 = new lib.shape93("synched",0);
	this.instance_1.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(138));

	// Layer_4
	this.instance_2 = new lib.shape92_1("synched",0);
	this.instance_2.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(138));

	// Layer_5
	this.instance_3 = new lib.shape91("synched",0);
	this.instance_3.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_4 = new lib.shape148("synched",0);
	this.instance_4.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(10).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},8).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(7).to({startPosition:0},0).to({_off:true},2).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).wait(2).to({scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(17));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(12).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(10).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(8).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(9).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(22));

	// Layer_6
	this.instance_5 = new lib.shape90_1("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(10).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(16).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(2).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17));

	// Layer_7
	this.instance_6 = new lib.shape89("synched",0);
	this.instance_6.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(138));

	// Layer_8
	this.instance_7 = new lib.shape88_1("synched",0);
	this.instance_7.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(138));

	// Layer_9
	this.instance_8 = new lib.shape87("synched",0);
	this.instance_8.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(138));

	// Layer_10
	this.instance_9 = new lib.shape86_1("synched",0);
	this.instance_9.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(138));

	// Layer_11
	this.instance_10 = new lib.shape85("synched",0);
	this.instance_10.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(138));

	// Layer_12
	this.instance_11 = new lib.shape84_1("synched",0);
	this.instance_11.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(138));

	// Layer_13
	this.instance_12 = new lib.shape83("synched",0);
	this.instance_12.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(138));

	// Layer_14
	this.instance_13 = new lib.shape82_1("synched",0);
	this.instance_13.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(138));

	// Layer_15
	this.instance_14 = new lib.shape81("synched",0);
	this.instance_14.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_15 = new lib.shape149("synched",0);
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(37).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(15).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(41).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7189,x:-13.45,y:250.65},0).to({startPosition:0},11).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(25));

	// Layer_16
	this.instance_16 = new lib.shape80_1("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(37).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},11).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(24));

	// Layer_17
	this.instance_17 = new lib.shape79("synched",0);
	this.instance_17.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(138));

	// Layer_22
	this.instance_18 = new lib.bg1("synched",0);
	this.instance_18.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(138));

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

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(126));

	// Layer_3
	this.instance_1 = new lib.shape93("synched",0);
	this.instance_1.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(126));

	// Layer_4
	this.instance_2 = new lib.shape92_1("synched",0);
	this.instance_2.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(126));

	// Layer_5
	this.instance_3 = new lib.shape91("synched",0);
	this.instance_3.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_4 = new lib.shape148("synched",0);
	this.instance_4.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(30).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(14));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(32).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(18).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(14));

	// Layer_6
	this.instance_5 = new lib.shape90_1("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(30).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(16).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(8));

	// Layer_7
	this.instance_6 = new lib.shape89("synched",0);
	this.instance_6.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(126));

	// Layer_8
	this.instance_7 = new lib.shape88_1("synched",0);
	this.instance_7.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(126));

	// Layer_9
	this.instance_8 = new lib.shape87("synched",0);
	this.instance_8.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(126));

	// Layer_10
	this.instance_9 = new lib.shape86_1("synched",0);
	this.instance_9.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(126));

	// Layer_11
	this.instance_10 = new lib.shape85("synched",0);
	this.instance_10.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(126));

	// Layer_12
	this.instance_11 = new lib.shape84_1("synched",0);
	this.instance_11.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(126));

	// Layer_13
	this.instance_12 = new lib.shape83("synched",0);
	this.instance_12.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(126));

	// Layer_14
	this.instance_13 = new lib.shape82_1("synched",0);
	this.instance_13.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(126));

	// Layer_15
	this.instance_14 = new lib.shape81("synched",0);
	this.instance_14.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_15 = new lib.shape149("synched",0);
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7189,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(37).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9837,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(15).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(12));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(41).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7189,x:-13.45,y:250.65},0).to({startPosition:0},11).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9604,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(13));

	// Layer_16
	this.instance_16 = new lib.shape80_1("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9017,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(37).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8701,skewY:147.1189,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6875,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},11).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2893,skewY:145.6252,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(12));

	// Layer_17
	this.instance_17 = new lib.shape79("synched",0);
	this.instance_17.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(126));

	// Layer_22
	this.instance_18 = new lib.bg1("synched",0);
	this.instance_18.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(126));

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
	this.instance_3 = new lib.shape92_1("synched",0);
	this.instance_3.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(304));

	// Layer_5
	this.instance_4 = new lib.shape91("synched",0);
	this.instance_4.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_5 = new lib.shape148("synched",0);
	this.instance_5.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(30).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({startPosition:0},0).wait(6).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false},0).wait(57).to({regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(2).to({_off:false,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},3).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(10).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({skewX:-4.9479},0).wait(10));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(32).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(18).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(9).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(58).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(5).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(12).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(11));

	// Layer_6
	this.instance_6 = new lib.shape90_1("synched",0);
	this.instance_6.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(30).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(20).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(58).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4139,skewX:-4.0656,skewY:-184.5737,x:148.75,y:-343.45},0).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},6).wait(1).to({startPosition:0},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},3).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(10).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4145,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9479,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(12));

	// Layer_7
	this.instance_7 = new lib.shape89("synched",0);
	this.instance_7.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(304));

	// Layer_8
	this.instance_8 = new lib.shape88_1("synched",0);
	this.instance_8.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(304));

	// Layer_9
	this.instance_9 = new lib.shape87("synched",0);
	this.instance_9.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(304));

	// Layer_10
	this.instance_10 = new lib.shape86_1("synched",0);
	this.instance_10.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(304));

	// Layer_11
	this.instance_11 = new lib.shape85("synched",0);
	this.instance_11.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(304));

	// Layer_12
	this.instance_12 = new lib.shape84_1("synched",0);
	this.instance_12.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(304));

	// Layer_13
	this.instance_13 = new lib.shape83("synched",0);
	this.instance_13.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(304));

	// Layer_14
	this.instance_14 = new lib.shape82_1("synched",0);
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
	this.instance_17 = new lib.shape80_1("synched",0);
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


(lib.flowerrr = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_21
	this.instance = new lib.shape57("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(35));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.1,-116.3,106.4,232.7);


(lib.butten_back_g_d3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.butten_back_g_d1("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.butten_back_g_d3, new cjs.Rectangle(-24.8,-24.9,49.6,49.8), null);


(lib.uhsdbfsdbfiaufa = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("Egl5AIjQhEhQAAiAQABhKAThFQAShCAhgzIAjAQQgsBkAABKQAABvBEBAQA/A8BgAAQBRAABOg4QBIgzAfhDQgPilhWiDQAXgpAtg6IAIABQA+BiAPCDQAxhKAlgvQAzg/A4gxQA0guArgWQA5gdA4AAQBgAAA7A+QA3A7AABUQAABFgvBfICXAAQBFAAAjgjQAegdAXhIQAahTAygwQAvgtAxAAQAjAAAaAOQAcAPAXAhQARAaATAiQAUAkAkBOQAQAjAlAUQAnAWA2gBIBIAAQBxABB4gpQB4gpCPhXIABgEQivhAh0AAQhNAAgpAuIALAuIgcBUIgKAAIgth7QAFhLA5gvQA4gsBUgBQBoAADIBQQBOAfBRABIBRAAIACABIg5BfQhmAAg4AjIibBmQhhA+hjAfQhkAghvgBIg9AAQgsAAghgQQgngUgcgtIgDAAQgJAwgVAXQgeAfgfAAQg5ABhKgkQhPglg2g7IgDAAQgWAygrAcQgxAhhIgBIgwAAQiAABiMghQgyAPgrAIQg5AKhCgBQhHABgtgJIgsgMQgNBXgXA4QgjBQhWA2QhYA2hfAAQiDAAhJhXgAujAXQgcAWgNAmQAHAXAkAiQAhAdAiATQAfATAlALQAkALAZAAQAQAAAIgDQAKgFAAgPQAAgagOgjQgNghgTgdQgcgpgfgWQgegUgfAAQglAAgdAXgA6TARQhIA4hTBwQA8ATBuAAQBBAABFgMQBDgMApgRQBNggAAgmQgJg8gzgmQgzgog/AAQhOAAhSA+gEAhlAFaQAMgzAAg/QAAiEg7i8QgoiAhdjfQAnhDAWgeIAQAAQAKAeASAlQATAmAQAUQAdAjA6ASQArAMAwAAQA8AAApgkQA1gwAMhrQATAFATAIIADApQAAB5g3BFQg5BIhrAAQgygBg7gQIgCACQAnBxARBOQAYBpAABnQAAApgLAeQgQArg0BPgAM9FTQALhBAAh5IAAhbQgBjaghloQApg1AygtIAIACQAZD7AAGTQgBBlgGA1QgCAlgTAiQgSAggqAvgAFVFDQjIAAAAiZQAAgXACgdIAigXIADABQAFBsCgAAIAtAAQA5ABAvgaQAygcAAhIQgCjFgZkdIgHg9QgCgjAAgUQAAghAbgdQATgYAhgcIAGAFQgDBUBPCBQgcAZggAXIAICjQAFBhAAA+QAACbgmBNQgQApgRAXQgVAegeAOQg3Acg+AAgAXAA5IAShOIFGAAIgUBOg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.hjbihvljhvljyvkjv("synched",0);
	this.instance.setTransform(-1.95,2.1);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-273.9,-101,543.9,206.2);


(lib.sjhsdbfsdfsdf = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("Egp3AI5QAigvAogqQAyAnA4A9QgpA5geAcQg8g4gxgogEgmEAJiQgfgbgggbQAcgnAjgmIAKgLQAyAnA4A9QgpA6gdAbIgugrgA/HImIAPgfQA/AhBKABQCFAAB+iBQAlgnATgZQAXghAIghIgtAAQiQAAhHguQhIgwAAhhQAAhTAwhCQAcgpAigXQAngZAqAAQBCAAA4BUQA7BXATCLIBnAAQA+AAAogUQArgVAJgpQAPhKAJgfQAYgXAlgZIAGAFQgPA1AAAhQAAAlANAYQANAXAeAUQAxhLAkguQAzhBA3gyQAygsA1gaQA/gfA6AAQA+AAAwAgQAoAbAXArQAXAwAAA8QAAAngSAxQgoB3iZAyQhVAdiTAAQjEAAhIhiIgDAAQgiA2g5AYQguAUg3AAIhZAAQgDAsgTA0QgTAzgdArQgxBMhIAtQg8AngrgBQh0ABiYhegAtEgRQhWBAhLBtQA8ATByAAQA/AABEgQQA+gOAxgXQAlgSASgOQAVgSAAgRQgJg7gsgpQgugpg9ABQhQAAhbBEgA3ZCvQgRhUgxg0Qgugzg0AAQgnAAghAaQghAbAAAcQAAA+BlAeQAiAKAuADQAcABA8AAIAAAAgEAsrAE9QAGggAAgoQAAiGhGjSQg8iyhci4QAshGAbgmIANACQAXAkAqAzIBGBRIgtAwQAxBnAoCaQAqCfAABfQAAAggXAwQgVAsgfAqgAQWE2QAKhCAAh5IAAhbQAAjZgiloQAigrAnglIATgSIAIACIABAQQAXD7AAGDQAABfgGA6QgCAmgUAiQgSAggqAugAIvEmQhGAAhIgOQhKgOhYgfQipA7hgAAIgbAAQg4AAglgMQgmgNgcgcQgngogLg9QgIgqAAh1QAAjdgYlSIAugvQAZgaARgNIAGADIADAkQAHB8ADCoQACByAADnIAAA1QAABLBGAZQAcAKAfAAIAdAAQA0AABhgXQgUghgIgnQgFgcAAgpQAAg5ATg2QAVg9AsguQAkgmAogYQAngYAZAAQAaAAAcAbQAeAcAZAwQAkBDAABBQAAA8gSA4QgOAwgfA0QA6ARBXAAIAzAAQA4AAAwgaQAxgcAAhIQgCjCgZkgIgGg9QgDgiAAgVQAAgfAcgfIAMgOQAQgSAXgTIAGAEQAAAQACARQAKBMBABoQgbAZggAXIAICjQAEBjAAA8QAACcglBNQgRApgRAXQgVAdgeAPQg2Acg+AAgADPhnQgtAvgOA4QAWBbBpAfQAxgKAxgjQAxgmAAgcQAAglgWguQgVgogUgUQgYgYgbAAQg0AAgxA1gEgj5AEmQhIAAgugVQgLgFgKgGQgjgXgSgoIgEAAQgXAtgzAaQgxAYg+AAIgcAAQg3AAgmgMQglgNgdgcQgngogLg9QgHgqAAh1QAAjWgZlZQA8hAAcgWIAGADQAKCIADDAQACByAADnIAAA1QAABLBGAZQAdAKAfAAIAhAAQA5AAAtgVQAwgXAKgmIAbhjIBAgvIAGAGQgOAxgEAeQgDARAAALQAAAPADANQAGAhAWARQAuAlBFAAIAmAAQA4AAAwgaQAxgcAAhIQgCjAgZkiIgGg9QgDgiAAgVQAAgfAcgfIAMgOQAQgSAXgTIAGAEQAAAQACARQAKBLBABpQgbAZggAXIAICjQAEBjAAA8QAACcglBNQgRApgRAXQgVAdgeAPQg3Acg9AAgEAgMAAbIAThNIFGAAIgVBNgADIoCQAtg7AegjQA3AnA5A8QggA0gtAnQgagYhUhIg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.jgjgjgjgjhkfhg("synched",0);
	this.instance.setTransform(-10.2,1.05);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-332,-104.1,643.7,210.39999999999998);


(lib.khadbfkjadbkfhafaf = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("A4BIiIALgfQAzARAzAAQBhgBBdhKQBahHAvhqQALgVAAgUQAAgKgFgOIgJgZQgwhsg/hfQAihBAgg0IAGABIBBB+QAXAqAKAgQAOAvAAA2IAABnQAAB1h1CNQhRBVhJAAQhhAAiOhIgADgFuQAKg+AAh8IAAhbQAAjaghloQAsg4AvgqIAIACQAZD5AAGVQAABfgHA7QgCAlgUAiQgRAggrAugA8RFNQgvgegZg3QgXg0AAhFQAAgrARgwQAMgkAbgzQAqhCAyg0QAAgdALhAIANgEQAdAbBzBYQBoBZAPA+QAPApAAA+QAAAsgOAyQgPA1gVAaQhQBVhxAAQhGAAgqgcgA83BwQAAAzAxAmQAuAlA9AAQBLAABGgzQApgeAAgfQAAgpgyg8Qg3hBhfg3QiNBvgBBggAXsE1QhEgxAAhfQAAhAAhg2QAbgqA8g2QhSgIgwglQgwgmAAg6QAAgsAQgrQAQgrAdgfQAhgkBPgzQBOgzBPgjIAKAMQgmBUgNAoQhdAug9AmQg/ApAAAPQAAAiBDAfQBNAkByAAQAWAAAtgEQgFAWgOAfQgMAfgIAPQheAthCAyQhFA3AAAiQAAAjAxAdQA2AhBTAAQBpAABXgoIAIAHQgHARgiAzQghAvgMANQgIAIgxAJQg2AJgvAAQhYAAg5gpgAj8FeQhEAAgtggQgzglgahSIgEAAQgNA4g3AhQhmA+hUAAQhOAAgrgtQgpgtAAhSQAAgiADgjIAkgDQAGB9B9AAQAjAAAqgOQAngMAjgUQAbgPAQgTQASgUAAgQQAAgrgWhdQgQhAgoiRIAggxQATgcAQgTIAFAEQAtCvArDuQANBDApAmQAoAjA2AAIAkAAQA4AAAwgZQAxgcABhIQgEjOgXkUIgHg+QgDghAAgWQAAgfAcgfQATgXAggcIAGAFQgCBVBNCAQgaAYghAXIAICjQAFBjgBA9QAACcgkBMQgQApgRAXQgWAdgdAPQg3Acg9AAgANjBTIAThOIFFAAIgUBOgA9pneQAhgvAogpQAzAnA3A9QgmA3ghAeQgygvg6gygA62nqQAhgvApgpQAxAnA4A8QglA3ghAfQg4g1g1gsgAqPoKQApg3AigoQA3AoA5A7QghA2gsAmQgZgYhVhIg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.jhvjljgvljglj("synched",0);
	this.instance.setTransform(-6.5,-13.2);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.5,-122.6,448,218.89999999999998);


(lib.jaadnladf = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AgdI3QAsg8AfgjQA2AnA6A8QghA1gtAnQgagZhThHgAwoHsIAKgfQA0ARA0AAQBfgBBehKQBahHAvhqQAKgUAAgVQAAgPgNgiQgzhwg9hbQAkhDAfgyIAFABIBCB+QAWAqAKAgQAOAvABA2IAABnQgBB1h0CNQhRBVhJAAQhiAAiNhIgA3sFPQgtgJg9gUIAAgKQEWgmCKhTQgDgZgeg1QgUghgzhOQglg4g7hVIhsicQgvhHgVglQgYgsAAgVQABgOARggQAMgXAOgVIAEAAQAmAzBxBvIgdA1IB6C+QBDBoAgA6QAnBGACBbIAFABQBLg2AAhzQgBh+gYj5QgBgSgFg3QgFgyAAgWQAAgpATgZQAOgUApgoIAHAFIgCATQAAAmAVAzQASApAkA7QgfAdgZARQAHCqAACkQAABVgfBfQgTA4gXAkQgZAngkAaQgwAkhBAWQhAAVg4AAQg7AAhBgOgAZgE6QAKgbADgbQADgWAAghQgBh/g6i+QgriOhXjVQAmhDAWgdIAQAAQAKAeASAlQATAmAQATQAVAbArAQQAkANAcAAQArAAAUgXQAXgbAAg+QAAgbgEgeQASgIAWgGQAQBMAYAhQAWAeAiAAQAfAAATgXQAYgbAAgxQAAgQgDgVQATAAAZAHQAIAtAAAeQAABSgkAyQgjAvg2AAQgtAAgugjIgDABQgQAngjAWQghAUgrAAQgmAAghgRIgBACQAnBwASBSQAYBtAABmQAAAvgKAaQgQAmg4BNgALdE4QAKhBAAh5IAAhbQAAjOghl0QArg3AwgrIAIACQAYD6AAGUQAABfgGA7QgCAlgUAiQgSAggqAugEggKAEoIAphEQAggdAVgIIAAgFQhmgkAAhLQAAglAUglQAQgdAbgYQAhgfAtgTQAsgTAmAAQAlAAAaAUQAbAVAAAfQgBAugqAoIgGAAQgKgegRgVQgRgXggAAQgTAAgYAJQgWAHgPAKQgaAQAAAQQAAAjAkAXQAXARAfAKQAhALAgAAQBJAABUgPIADAHIgtBcQjFAWiKBSgAD8EoQhIAAgugVQgzgXgXgzIgDAAQgXAugyAZQgxAYg/AAIgbAAQg3AAgmgMQgmgMgdgdQgmgogLg9QgIgqAAh0QAAjegYlRQA5g+AegZIAHAEQAKCHACDAQACByAADnIAAA1QAABLBGAZQAdAKAfAAIAiAAQA5AAAsgVQAwgXAJgmIAbhjIBAgvIAGAHQgVBKABAhQAAA1AeAYQAuAlBGAAIAlAAQA5AAAvgZQAygcgBhIQgCjOgZkUQgJhSAAgjQAAgfAcgfQASgWAhgdIAHAFQgDBUBOCBQgaAYggAXIAHCjQAEBjABA9QAACcglBMQgRApgRAXQgVAdgfAPQg2Acg+AAgAPrAdIAThNIFGAAIgUBNgAs8maQAtg7AfgkQA5AqA2A6QgfA0guAnQgegchQhEg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.hbhjlhvj("synched",0);
	this.instance.setTransform(-11.3,-16.5);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-254.1,-123.9,485.6,214.8);


(lib.button176 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape175Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.7,-4.2,11.600000000000001,8.4);


(lib.button173 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape172Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.9,-21,66.19999999999999,88);


(lib.button170 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape169Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.3,-43.6,76.69999999999999,87.30000000000001);


(lib.button167 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape166Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-5.3,15.5,10.8);


(lib.button164 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape163Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.9,-5.4,23.9,10.9);


(lib.button161 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape160Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.9,-5.4,23.9,10.9);


(lib.button158 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape157Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.2,-4.7,12.4,9.4);


(lib.button155 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape154Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.8,-35.5,21.700000000000003,70.5);


(lib.button152 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape151Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.9,-44.5,27.8,89);


(lib.button149 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape148Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-48.9,18.1,97.9);


(lib.button146 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape145Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-50.8,8.1,101.6);


(lib.button143 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape142Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-49.5,19.8,98.2);


(lib.button140 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape139Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-43.4,27.4,86.8);


(lib.button137 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape136Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.6,-20.8,29.299999999999997,42.1);


(lib.button134 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape133Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.4,-54.6,83.3,109.80000000000001);


(lib.button131 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape130Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.6,-54.6,85.30000000000001,109.2);


(lib.button128 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape127Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.8,-64.8,75.6,129.7);


(lib.button125 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape124Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-5.8,18.8,11.7);


(lib.button122 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.shape121Hit("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-5.8,18.8,11.8);


(lib.lamfamfaf = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("EhNqALWQAkgyAlgnQAxAlA5A/QgpA6gdAbQg7g3gygpgEhK3ALJQAkgvAmgpQAvAlA7A/QgqA7gdAaQgzgxg6gwgEhPUAG/QhRhaAAipQAAhGAYhVQAYhVAnhCIAkAQQg5CIABBgQgBA8AUA0QASA2AkAlQAqArA8AXQA5AVBDAAQCFAACjhQQBMgpAIgXQgQgjhHgYQhNgZhrAAIgHgMIBChrIGDAAQBCAABIgUIAAgFQhthFAAhwQAAg3AohDQAig5AwggQAzgjA8AAQBAAAA1AoQA0AnAlBIIgRATQgmgggogOQgmgOgzAAQhGAAg0AbQgxAZAAAaQAABHBQA+QAdAVAgAOQAgAPAUAAQAwAABGgTQApgLBrgkIAFAEIgyBzQhRAdhfAZQhtAcgsAOQhSAbgiAIQg+AQgyAAIhTAAQAFAiAAAhQAAAUgRAqQgOAjgMATQhYBPh6AwQh2AuhpAAQilAAhbhlgAE1GEIAKggQA0ARAzAAQBhAABdhKQBahHAvhqQAKgVAAgUQAAgKgFgPIgIgYQgyhvg9hdQAnhKAagqIAGABIBCB9QAWArALAhQANAuAAA2IAABmQAAB2h1CNQhRBVhIAAQhiAAiNhIgEAwyADnQgtgKg9gTIAAgKQEWgmCLhTQgEgZgfg0QgTgig0hOQgkg4g6hVIhsidQgxhGgUgmQgYgrAAgWQAAgNARggQANgZANgTIAFgBQAXAgArAtIBWBWIgfA1IB7C+QBCBnAhA6QAnBGABBbIAGABQBKg0AAh0QAAh8gYj8QAAgQgGg4QgFgxAAgYQAAgpATgZQAOgUApgoIAGAFIgBAUQAAAmAVAzQASAoAkA8QgfAdgaAQQAIC9AACRQAABYgfBcQgUA4gWAlQgZAmgkAbQgwAjhAAWQhBAWg5AAQg5AAhCgOgAu+DnQgtgKg+gTIAAgKQEWgmCLhTQgDgZgfg0QgUgigzhOIhgiNIhridQgwhGgUgmQgYgrAAgWQAAgNARggQANgZANgTIAEgBQAYAgArAtIBVBWIgeA1IB6C+QBCBnAhA6QAnBHACBaIAFABQBKg0ABh0QAAh8gZj8IgGhIQgFgyAAgXQAAgpAUgZQAOgUAogoIAHAFIgCAUQAAAmAWAzQARAnAlA9QggAdgZAQQAIC9gBCRQAABYgfBcQgTA4gXAlQgZAmgjAbQgwAjhCAWQhAAWg4AAQg6AAhBgOgEBJyADRQALgbADgbQACgVABgiQAAh+g6i+QgsiOhYjVQAohDAVgeIAQAAQAKAfATAkQASAmAQAUQAVAbAsAQQAjANAdAAQAqAAAUgYQAXgaAAg/QAAgbgDgeQARgHAVgHQARBMAYAhQAWAfAiAAQAfAAAUgXQAWgbAAgyQABgPgDgWQAUAAAZAIQAHAtAAAdQAABTgkAxQgjAwg1AAQguAAgugkIgEABQgOAngkAWQghAUgrAAQglAAgjgRIgBACQAoBwARBSQAZBuAABmQAAAugLAaQgPAng4BNgEA7wADPQALhAAAh6IAAhaQAAjOgil0QArg4AwgrIAJADQAYD6AAGVQAABdgHA7QgCAlgUAjQgRAfgrAvgAkADPQAKhBgBh5IAAhaQAAjbghlnQAqg2AxgtIAIADQAZD/AAGQQAABdgHA7QgCAlgTAjQgSAfgrAvgEAoTADAQhJAAgtgVQgzgYgXgyIgEAAQgXAtg0AaQgwAYg+AAIgpAAQhSAAgwgYQgrgWgSgqIgGAAQhKBYhVAAQhTAAgThOIgDAAQhHBOhaAAQhRAAgJhPIgDAAQhEBPiCAAIgaAAQg4AAglgMQgmgNgdgcQgngogKg9QgIgpAAh2QAAjRgYleQA6g/AdgXIAGADQALCIADDAQABByAADoIAAA1QABBJBGAZQAcALAfAAIAsAAQBDgBAugTQAygVAigtIAuhIIBIgaIAEAFQgiA6gKAVQgRAiAAATQAAAVAPANQAOANAWAAQArAAAmgcQARgNAQgWQAQgWALgYIAWg3IBHghIADAEQgVA2gIAeQgIAeAAAZQAAAVAMAPQAOASAaAAQAfAAAhgVQATgNAOgXQALgUAKggQANgyAFgYIBHgvIADADQgXBOABAxQAAA0AqAZQAnAXBHAAIApAAQA5AAAsgVQAxgXAKglIAbhlIBAguIAGAGQgVBLAAAhQAAA0AfAYQAtAmBGAAIAgAAQCHAAAxgSQA1gUAAgVQAAgdgdhCQgTgugthYQAjg/AjgqIAEAAQAmBDAZBFQAfBVAAA/QgBAwgSAtQgPAmggApQgfAfg4ANQg4AMhrAAgA7zBeIgDAAQgjA1g5AZQguAUg3AAIghAAQicAAiRgeQijAelCAAIhYAAQhHAAgvgVQgzgYgWgyIgEAAQgXAtg0AaQgwAYg+AAIgcAAQg3AAgmgMQgmgNgcgcQgngogLg9QgHgpAAh2QgBjWgYlZQA8hAAcgWIAGADQAKCIADDAQACByAADoIAAA1QAABJBGAZQAdALAfAAIAhAAQA5AAAtgVQAwgXAKglIAbhlIBAguIAGAGQgVBLAAAhQAAA0AfAYQAtAmBGAAIBSAAIBHhUQAIgiADgoQADgigBhNQAAhVgHiHQgHh1gIhaQgGg0AAgnQAAgeATgaQAQgXAlgcIAHAGQAABOBPB/Ig8AuQAIC+AABwQAABqghBQIAEAAQBvh2BWg0QAngYAugOQAtgOArAAQBZAABCBCQBDBDAABgQAAAhgOAkQgLAcgXAoQAdAFBDAAIA4AAQA/AAAogUQArgWAIgnQAOhDALgnQAWgWAngbIAFAGQgOA1AAAiQAAAkAMAYQAOAXAdAUQAyhLAjguQA1hCA2gxQAygsA1gaQA/gfA5AAQA+AAAwAgQApAbAWArQAXAxABA8QAAAngSAxQgoB2iaAyQhUAdiUAAQjDAAhIhigA2+h3QhWBAhMBsQA8AUByAAQBAAABDgQQA+gOAxgXQAmgSARgNQAVgSABgRQgJg9gtgoQgtgpg+AAQhPAAhbBFgEgnWgBsQhPA2h2B/IBWAAQDLAABygSQCIgVAdgvQAAg8g6gwQg6gyhOAAQhWAAhbA/gEA/+gBKIAUhOIFFAAIgVBOgAYpllQAigwAngoQAxAlA5A+QgoA5geAdQg0gyg5gvgAbclxQAiguAogrQAxAnA5A9QgpA5geAdQg0gyg5gvgEAiSgF4QAigvAogpQAyAnA4A8QgmA3ghAfQgxgvg8gygEAlGgGEQAhgvAogpQAyAnA4A8QgnA5ggAdQg5g3gzgqgEgxkgGJQAsg8AegjQA3AnA6A8QggA0guAnQgZgXhUhIgEAptgIMQAxg/AbgfQA5ApA3A6QggA1guAmQgWgWhYhKgAZborQAhgvAogqQAyAnA4A9QgnA4gfAeQg6g3gzgqg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.ljgcljhglhgl("synched",0);
	this.instance.setTransform(-6.1,2.05);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-536,-115.2,1059.8,234.5);


(lib.sprite294 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stop();
		*/
	}
	this.frame_126 = function() {
		/* gotoAndStop(1);
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(126).call(this.frame_126).wait(1));

	// Layer_7
	this.instance = new lib.sprite200("synched",0);
	this.instance.setTransform(-7.75,-10.45,0.3278,0.3278);
	this.instance.alpha = 0.6992;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).to({_off:true},125).wait(1));

	// Layer_4
	this.instance_1 = new lib.sprite200("synched",0);
	this.instance_1.setTransform(5,-11.25,0.3278,0.3278);
	this.instance_1.alpha = 0.6992;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).to({_off:true},125).wait(1));

	// Layer_3
	this.instance_2 = new lib.shape198("synched",0);
	this.instance_2.setTransform(20.35,-3.35,0.7102,0.7102);
	this.instance_2.alpha = 0.6992;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).to({_off:true},125).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.4,-47.8,87.9,94.69999999999999);


(lib.sprite196 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.instance = new lib.sprite195("synched",0);
	this.instance.setTransform(-10.55,-13.25,0.3572,0.3572);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_4
	this.instance_1 = new lib.shape193("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite196, new cjs.Rectangle(-33.9,-78.8,96,106.69999999999999), null);


(lib.sprite177 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button176();
	this.instance.setTransform(0.05,0);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button176(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite115();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite177, new cjs.Rectangle(-5.8,-4.2,11.7,8.4), null);


(lib.sprite174 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button173();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button173(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite89();
	this.instance_1.setTransform(2.15,23);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite174, new cjs.Rectangle(-30.9,-21,66.19999999999999,88), null);


(lib.sprite171 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button170();
	this.instance.setTransform(0.15,0);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button170(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite87();
	this.instance_1.setTransform(3.3,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite171, new cjs.Rectangle(-38.1,-43.6,76.6,87.30000000000001), null);


(lib.sprite168 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button167();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button167(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite113();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite168, new cjs.Rectangle(-7.8,-5.3,15.6,10.8), null);


(lib.sprite165 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button164();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button164(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite111();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite165, new cjs.Rectangle(-11.9,-5.4,23.9,10.9), null);


(lib.sprite162 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button161();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button161(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite109();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite162, new cjs.Rectangle(-11.9,-5.4,23.9,10.9), null);


(lib.sprite159 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button158();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button158(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite117();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite159, new cjs.Rectangle(-6.2,-4.7,12.4,9.4), null);


(lib.sprite156 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button155();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button155(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite91();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite156, new cjs.Rectangle(-11.3,-36,22.700000000000003,71), null);


(lib.sprite153 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button152();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button152(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite103();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite153, new cjs.Rectangle(-13.9,-44.5,27.8,89), null);


(lib.sprite150 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button149();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button149(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite101();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite150, new cjs.Rectangle(-9,-48.9,18.1,97.9), null);


(lib.sprite147 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button146();
	this.instance.setTransform(0.05,-0.15);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button146(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite99();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite147, new cjs.Rectangle(-4,-51,8.1,101.7), null);


(lib.sprite144 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button143();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button143(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite97();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite144, new cjs.Rectangle(-10,-49.5,19.8,98.2), null);


(lib.sprite141 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button140();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button140(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite95();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite141, new cjs.Rectangle(-13.7,-43.4,27.4,86.8), null);


(lib.sprite138 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button137();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button137(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite93();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite138, new cjs.Rectangle(-14.6,-20.8,29.299999999999997,42.1), null);


(lib.sprite135 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button134();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button134(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite85();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite135, new cjs.Rectangle(-41.9,-55.1,83.8,110.30000000000001), null);


(lib.sprite132 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button131();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button131(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite83();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite132, new cjs.Rectangle(-42.6,-54.6,85.30000000000001,109.2), null);


(lib.sprite129 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button128();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button128(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite81();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite129, new cjs.Rectangle(-37.8,-64.8,75.6,129.7), null);


(lib.sprite126 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button125();
	this.instance.setTransform(0.05,0);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button125(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite107();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite126, new cjs.Rectangle(-9.3,-5.8,18.8,11.7), null);


(lib.sprite123 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.button122();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button122(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.sprite105();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite123, new cjs.Rectangle(-9.4,-5.9,18.8,11.9), null);


(lib.flower = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_73
	this.ddrag12 = new lib.sprite177();
	this.ddrag12.name = "ddrag12";
	this.ddrag12.setTransform(218.35,201.75);

	this.timeline.addTween(cjs.Tween.get(this.ddrag12).wait(105));

	// Layer_69
	this.ddrag4 = new lib.sprite174();
	this.ddrag4.name = "ddrag4";
	this.ddrag4.setTransform(181.8,136.15);

	this.timeline.addTween(cjs.Tween.get(this.ddrag4).wait(24).to({x:8.2,y:158.65},25).wait(56));

	// Layer_65
	this.ddrag5 = new lib.sprite171();
	this.ddrag5.name = "ddrag5";
	this.ddrag5.setTransform(230.4,159.25);

	this.timeline.addTween(cjs.Tween.get(this.ddrag5).wait(24).to({x:459,y:197.75},25).wait(56));

	// Layer_61
	this.ddrag8 = new lib.sprite168();
	this.ddrag8.name = "ddrag8";
	this.ddrag8.setTransform(207.35,213.2);

	this.timeline.addTween(cjs.Tween.get(this.ddrag8).wait(105));

	// Layer_57
	this.ddrag10 = new lib.sprite165();
	this.ddrag10.name = "ddrag10";
	this.ddrag10.setTransform(196.95,210.15);

	this.timeline.addTween(cjs.Tween.get(this.ddrag10).wait(105));

	// Layer_53
	this.ddrag9 = new lib.sprite162();
	this.ddrag9.name = "ddrag9";
	this.ddrag9.setTransform(221.75,210.45);

	this.timeline.addTween(cjs.Tween.get(this.ddrag9).wait(105));

	// Layer_49
	this.ddrag11 = new lib.sprite159();
	this.ddrag11.name = "ddrag11";
	this.ddrag11.setTransform(201.15,201.55);

	this.timeline.addTween(cjs.Tween.get(this.ddrag11).wait(105));

	// Layer_45
	this.ddrag13 = new lib.sprite156();
	this.ddrag13.name = "ddrag13";
	this.ddrag13.setTransform(209.75,171.05);

	this.timeline.addTween(cjs.Tween.get(this.ddrag13).wait(105));

	// Layer_41
	this.ddrag18 = new lib.sprite153();
	this.ddrag18.name = "ddrag18";
	this.ddrag18.setTransform(227.1,160.25);

	this.timeline.addTween(cjs.Tween.get(this.ddrag18).wait(105));

	// Layer_37
	this.ddrag17 = new lib.sprite150();
	this.ddrag17.name = "ddrag17";
	this.ddrag17.setTransform(219.9,156.1);

	this.timeline.addTween(cjs.Tween.get(this.ddrag17).wait(105));

	// Layer_33
	this.ddrag16 = new lib.sprite147();
	this.ddrag16.name = "ddrag16";
	this.ddrag16.setTransform(210.8,153.9);

	this.timeline.addTween(cjs.Tween.get(this.ddrag16).wait(105));

	// Layer_29
	this.ddrag15 = new lib.sprite144();
	this.ddrag15.name = "ddrag15";
	this.ddrag15.setTransform(198.45,156.15);

	this.timeline.addTween(cjs.Tween.get(this.ddrag15).wait(105));

	// Layer_25
	this.ddrag14 = new lib.sprite141();
	this.ddrag14.name = "ddrag14";
	this.ddrag14.setTransform(191.85,159.05);

	this.timeline.addTween(cjs.Tween.get(this.ddrag14).wait(105));

	// Layer_21
	this.ddrag19 = new lib.sprite138();
	this.ddrag19.name = "ddrag19";
	this.ddrag19.setTransform(209.95,224.4);

	this.timeline.addTween(cjs.Tween.get(this.ddrag19).wait(105));

	// Layer_17
	this.ddrag1 = new lib.sprite135();
	this.ddrag1.name = "ddrag1";
	this.ddrag1.setTransform(174.45,148.7);

	this.timeline.addTween(cjs.Tween.get(this.ddrag1).wait(105));

	// Layer_13
	this.ddrag3 = new lib.sprite132();
	this.ddrag3.name = "ddrag3";
	this.ddrag3.setTransform(243.2,148.8);

	this.timeline.addTween(cjs.Tween.get(this.ddrag3).wait(105));

	// Layer_9
	this.ddrag2 = new lib.sprite129();
	this.ddrag2.name = "ddrag2";
	this.ddrag2.setTransform(209.55,138.75);

	this.timeline.addTween(cjs.Tween.get(this.ddrag2).wait(105));

	// Layer_5
	this.ddrag7 = new lib.sprite126();
	this.ddrag7.name = "ddrag7";
	this.ddrag7.setTransform(220.7,206.95);

	this.timeline.addTween(cjs.Tween.get(this.ddrag7).wait(105));

	// Layer_1
	this.ddrag6 = new lib.sprite123();
	this.ddrag6.name = "ddrag6";
	this.ddrag6.setTransform(199.15,206.65);

	this.timeline.addTween(cjs.Tween.get(this.ddrag6).wait(105));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,73.9,520.2,171.79999999999998);


(lib.butten_back_g_d4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_8
	this.instance = new lib.butten_back_g_d2("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.instance_1 = new lib.butten_back_g_d3();
	this.instance_1.setTransform(-1.15,-0.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_1
	this.instance_2 = new lib.butten_back_g_d("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.butten_back_g_d4, new cjs.Rectangle(-26,-25.8,52,51.7), null);


(lib.utdutuu = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stop()*/
	}
	this.frame_133 = function() {
		/* gotoAndStop(1);
		
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(133).call(this.frame_133).wait(1));

	// Layer_1
	this.instance = new lib.sprite196();
	this.instance.setTransform(-10.65,43.35);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1,mode:"synched",startPosition:0},133).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.6,-35.5,96,106.7);


(lib.sprite197 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stop()*/
	}
	this.frame_133 = function() {
		/* gotoAndStop(1);
		
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(133).call(this.frame_133).wait(1));

	// Layer_1
	this.instance = new lib.sprite196();
	this.instance.setTransform(-10.65,43.35);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1,mode:"synched",startPosition:0},133).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.6,-35.5,96,106.7);


(lib.butten_back_g_d5 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.butten_back_g_d4("synched",0);
	this.instance.setTransform(0,0.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.butten_back_g_d5, new cjs.Rectangle(-26,-25.8,52,51.7), null);


(lib.btnplay3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.butten_back_g_d5("synched",0);
	this.instance.setTransform(1.8,2.25,1.0905,1.0901);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.btnplay3, new cjs.Rectangle(-26.6,-25.9,56.7,56.4), null);


(lib.re_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		playSound("sound145overtodown");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Layer 1
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-16.95,-11.75,0.5,0.5);

	this.instance_1 = new lib.butten_back_g_d5("synched",0);
	this.instance_1.setTransform(0.05,-0.05,0.935,0.9346);

	this.instance_2 = new lib.CachedBmp_31();
	this.instance_2.setTransform(-20.3,-14.1,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_32();
	this.instance_3.setTransform(-16.95,-11.75,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_33();
	this.instance_4.setTransform(-16.95,-11.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{regX:0,scaleX:0.935,scaleY:0.9346,x:0.05,y:-0.05}},{t:this.instance}]}).to({state:[{t:this.instance_1,p:{regX:0.1,scaleX:1.1218,scaleY:1.1214,x:0.1,y:0}},{t:this.instance_2}]},1).to({state:[{t:this.instance_1,p:{regX:0,scaleX:0.935,scaleY:0.9346,x:0.05,y:-0.05}},{t:this.instance_3}]},1).to({state:[{t:this.instance_1,p:{regX:0,scaleX:0.935,scaleY:0.9346,x:0.05,y:-0.05}},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.1,-28.9,58.2,58);


(lib.next_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		playSound("sound145overtodown");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Layer 1
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(-12.25,-11.85,0.5,0.5);

	this.instance_1 = new lib.butten_back_g_d5("synched",0);
	this.instance_1.setTransform(0.05,-0.05,0.935,0.9346);

	this.instance_2 = new lib.CachedBmp_27();
	this.instance_2.setTransform(-14.7,-14.2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_28();
	this.instance_3.setTransform(-12.25,-11.85,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_29();
	this.instance_4.setTransform(-12.25,-11.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{regX:0,scaleX:0.935,scaleY:0.9346,x:0.05,y:-0.05}},{t:this.instance}]}).to({state:[{t:this.instance_1,p:{regX:0.1,scaleX:1.1218,scaleY:1.1214,x:0.1,y:0}},{t:this.instance_2}]},1).to({state:[{t:this.instance_1,p:{regX:0,scaleX:0.935,scaleY:0.9346,x:0.05,y:-0.05}},{t:this.instance_3}]},1).to({state:[{t:this.instance_1,p:{regX:0,scaleX:0.935,scaleY:0.9346,x:0.05,y:-0.05}},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.1,-28.9,58.2,58);


(lib.mainidea_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		playSound("sound145overtodown");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Layer 1
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-13.55,-10.25,0.5,0.5);

	this.instance_1 = new lib.btnplay3("synched",0);
	this.instance_1.setTransform(-1.5,-2,0.8574,0.8574);

	this.instance_2 = new lib.CachedBmp_23();
	this.instance_2.setTransform(-16.25,-12.3,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_24();
	this.instance_3.setTransform(-13.55,-10.25,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_25();
	this.instance_4.setTransform(-13.55,-10.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{regX:0,regY:0,scaleX:0.8574,scaleY:0.8574,x:-1.5,y:-2}},{t:this.instance}]}).to({state:[{t:this.instance_1,p:{regX:-0.2,regY:-0.2,scaleX:1.0287,scaleY:1.0287,x:-1.75,y:-2.35}},{t:this.instance_2}]},1).to({state:[{t:this.instance_1,p:{regX:0,regY:0,scaleX:0.8574,scaleY:0.8574,x:-1.5,y:-2}},{t:this.instance_3}]},1).to({state:[{t:this.instance_1,p:{regX:0,regY:0,scaleX:0.8574,scaleY:0.8574,x:-1.5,y:-2}},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.8,-28.7,58.2,57.9);


(lib.home_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		playSound("sound145overtodown");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Layer 1
	this.instance = new lib.sprite549_hp();
	this.instance.setTransform(-1.3,-2.7,0.2851,0.2851,0,0,0,0.2,0.2);

	this.instance_1 = new lib.butten_back_g_d5("synched",0);
	this.instance_1.setTransform(0.05,-0.05,0.935,0.9346);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{regX:0,scaleX:0.935,scaleY:0.9346,x:0.05,y:-0.05}},{t:this.instance,p:{regX:0.2,regY:0.2,scaleX:0.2851,scaleY:0.2851,x:-1.3,y:-2.7}}]}).to({state:[{t:this.instance_1,p:{regX:0.1,scaleX:1.1218,scaleY:1.1214,x:0.1,y:0}},{t:this.instance,p:{regX:-0.6,regY:-0.6,scaleX:0.342,scaleY:0.342,x:-1.55,y:-3.25}}]},1).to({state:[{t:this.instance_1,p:{regX:0,scaleX:0.935,scaleY:0.9346,x:0.05,y:-0.05}},{t:this.instance,p:{regX:0.2,regY:0.2,scaleX:0.2851,scaleY:0.2851,x:-1.3,y:-2.7}}]},1).to({state:[{t:this.instance_1,p:{regX:0,scaleX:0.935,scaleY:0.9346,x:0.05,y:-0.05}},{t:this.instance,p:{regX:0.2,regY:0.2,scaleX:0.2851,scaleY:0.2851,x:-1.3,y:-2.7}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.1,-28.9,58.2,58);


(lib.movstop = function(mode,startPosition,loop,reversed) {
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
	this.b_stop = new lib.phasegg();
	this.b_stop.name = "b_stop";
	this.b_stop.setTransform(0.05,1.2,1.8939,1.8939);
	new cjs.ButtonHelper(this.b_stop, 0, 1, 2, false, new lib.phasegg(), 3);

	this.instance = new lib.btnplay3();
	this.instance.setTransform(0.05,-0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.b_stop}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.movstop, new cjs.Rectangle(-26.6,-25.9,56.7,56.4), null);


(lib.movplaystop = function(mode,startPosition,loop,reversed) {
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
	this.b_next = new lib.btn_play();
	this.b_next.name = "b_next";
	this.b_next.setTransform(-0.85,-0.65,1.815,1.815);
	new cjs.ButtonHelper(this.b_next, 0, 1, 2, false, new lib.btn_play(), 3);

	this.instance = new lib.btnplay3();
	this.instance.setTransform(0.05,-0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.b_next}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.movplaystop, new cjs.Rectangle(-26.6,-25.9,56.7,56.4), null);


// stage content:
(lib.maktabatiL1_HTML5Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {n1:0,n2:681,n9:1233,n10:2383,n11:2618,n12:2767,nidwa:3273};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,28,198,334,559,681,682,824,1023,1233,1235,1456,1533,1652,1716,1837,1901,2005,2383,2384,2618,2620,2767,2770,2958,3272,3273];
	this.streamSoundSymbolsList[28] = [{id:"_1mp3copy",startFrame:28,endFrame:176,loop:1,offset:0}];
	this.streamSoundSymbolsList[198] = [{id:"_2",startFrame:198,endFrame:302,loop:1,offset:0}];
	this.streamSoundSymbolsList[334] = [{id:"_3",startFrame:334,endFrame:481,loop:1,offset:0}];
	this.streamSoundSymbolsList[559] = [{id:"_4",startFrame:559,endFrame:653,loop:1,offset:0}];
	this.streamSoundSymbolsList[682] = [{id:"_6",startFrame:682,endFrame:809,loop:1,offset:0}];
	this.streamSoundSymbolsList[824] = [{id:"_7",startFrame:824,endFrame:979,loop:1,offset:0}];
	this.streamSoundSymbolsList[1023] = [{id:"_8",startFrame:1023,endFrame:1213,loop:1,offset:0}];
	this.streamSoundSymbolsList[1235] = [{id:"_212",startFrame:1235,endFrame:1447,loop:1,offset:0}];
	this.streamSoundSymbolsList[1456] = [{id:"_22",startFrame:1456,endFrame:1519,loop:1,offset:0}];
	this.streamSoundSymbolsList[1533] = [{id:"_23",startFrame:1533,endFrame:1633,loop:1,offset:0}];
	this.streamSoundSymbolsList[1652] = [{id:"_24",startFrame:1652,endFrame:1697,loop:1,offset:0}];
	this.streamSoundSymbolsList[1716] = [{id:"_25",startFrame:1716,endFrame:1829,loop:1,offset:0}];
	this.streamSoundSymbolsList[1837] = [{id:"_26",startFrame:1837,endFrame:1890,loop:1,offset:0}];
	this.streamSoundSymbolsList[1901] = [{id:"_27",startFrame:1901,endFrame:1991,loop:1,offset:0}];
	this.streamSoundSymbolsList[2005] = [{id:"_28",startFrame:2005,endFrame:2331,loop:1,offset:0}];
	this.streamSoundSymbolsList[2384] = [{id:"_29",startFrame:2384,endFrame:2597,loop:1,offset:0}];
	this.streamSoundSymbolsList[2770] = [{id:"_31",startFrame:2770,endFrame:2941,loop:1,offset:0}];
	this.streamSoundSymbolsList[2958] = [{id:"_32",startFrame:2958,endFrame:3204,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* 
		play_btn.addEventListener(MouseEvent.CLICK,playNow)
		
		function playNow(e:MouseEvent){
		play();
			play_btn.visible = false;
			stop_btn.visible = true;
		
		}
		
		stop_btn.addEventListener(MouseEvent.CLICK,stopNow)
		
		function stopNow(e:MouseEvent){
		stop();
		stop_btn.visible = false;
		play_btn.visible = true;
		
		
		}
		back_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler1);
		function mouseDownHandler1(event:MouseEvent):void
		{
		    gotoAndPlay("n1");
		 
			}
		 
		next_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler2);
		function mouseDownHandler2(event:MouseEvent):void
		{
		    gotoAndPlay("n2");
		}
		
		home_btn.addEventListener(MouseEvent.CLICK, onClick);  
		
		function onClick(event:MouseEvent):void
		{
		    // Unsubscribe to help Garbage Collector do its job.
		   home_btn.removeEventListener(MouseEvent.CLICK, onClick);  
		
		    // Hide the content.
		    visible = false;
			SoundMixer.stopAll();
		
		    // Remove all of its children.
		}
		idwa_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandleridwa);
		function mouseDownHandleridwa(event:MouseEvent):void
		{
		    gotoAndStop("nidwa");
		}*/
	}
	this.frame_28 = function() {
		var soundInstance = playSound("_1mp3copy",0);
		this.InsertIntoSoundStreamData(soundInstance,28,176,1);
	}
	this.frame_198 = function() {
		var soundInstance = playSound("_2",0);
		this.InsertIntoSoundStreamData(soundInstance,198,302,1);
	}
	this.frame_334 = function() {
		var soundInstance = playSound("_3",0);
		this.InsertIntoSoundStreamData(soundInstance,334,481,1);
	}
	this.frame_559 = function() {
		var soundInstance = playSound("_4",0);
		this.InsertIntoSoundStreamData(soundInstance,559,653,1);
	}
	this.frame_681 = function() {
		/* back_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler3);
		function mouseDownHandler3(event:MouseEvent):void
		{
		    gotoAndPlay("n1");
		 
			}
		 
		next_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler4);
		function mouseDownHandler4(event:MouseEvent):void
		{
		    gotoAndPlay("n3");
		}*/
	}
	this.frame_682 = function() {
		var soundInstance = playSound("_6",0);
		this.InsertIntoSoundStreamData(soundInstance,682,809,1);
	}
	this.frame_824 = function() {
		var soundInstance = playSound("_7",0);
		this.InsertIntoSoundStreamData(soundInstance,824,979,1);
	}
	this.frame_1023 = function() {
		var soundInstance = playSound("_8",0);
		this.InsertIntoSoundStreamData(soundInstance,1023,1213,1);
	}
	this.frame_1233 = function() {
		/* back_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler16);
		function mouseDownHandler16(event:MouseEvent):void
		{
		    gotoAndPlay("n8");
		 
			}
		 
		next_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler17);
		function mouseDownHandler17(event:MouseEvent):void
		{
		    gotoAndPlay("n10");
		}*/
	}
	this.frame_1235 = function() {
		var soundInstance = playSound("_212",0);
		this.InsertIntoSoundStreamData(soundInstance,1235,1447,1);
	}
	this.frame_1456 = function() {
		var soundInstance = playSound("_22",0);
		this.InsertIntoSoundStreamData(soundInstance,1456,1519,1);
	}
	this.frame_1533 = function() {
		var soundInstance = playSound("_23",0);
		this.InsertIntoSoundStreamData(soundInstance,1533,1633,1);
	}
	this.frame_1652 = function() {
		var soundInstance = playSound("_24",0);
		this.InsertIntoSoundStreamData(soundInstance,1652,1697,1);
	}
	this.frame_1716 = function() {
		var soundInstance = playSound("_25",0);
		this.InsertIntoSoundStreamData(soundInstance,1716,1829,1);
	}
	this.frame_1837 = function() {
		var soundInstance = playSound("_26",0);
		this.InsertIntoSoundStreamData(soundInstance,1837,1890,1);
	}
	this.frame_1901 = function() {
		var soundInstance = playSound("_27",0);
		this.InsertIntoSoundStreamData(soundInstance,1901,1991,1);
	}
	this.frame_2005 = function() {
		var soundInstance = playSound("_28",0);
		this.InsertIntoSoundStreamData(soundInstance,2005,2331,1);
	}
	this.frame_2383 = function() {
		/* back_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler18);
		function mouseDownHandler18(event:MouseEvent):void
		{
		    gotoAndPlay("n9");
		 
			}
		 
		next_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler19);
		function mouseDownHandler19(event:MouseEvent):void
		{
		    gotoAndPlay("n11");
		}*/
	}
	this.frame_2384 = function() {
		var soundInstance = playSound("_29",0);
		this.InsertIntoSoundStreamData(soundInstance,2384,2597,1);
	}
	this.frame_2618 = function() {
		/* back_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler21);
		function mouseDownHandler21(event:MouseEvent):void
		{
		    gotoAndPlay("n10");
		 
			}
		 
		next_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler22);
		function mouseDownHandler22(event:MouseEvent):void
		{
		    gotoAndPlay("n12");
		}*/
		/* stop();
		mc_1.buttonMode = true; // set the movieclip to act as a button
		mc_1.addEventListener(MouseEvent.CLICK, onButtonClick); // add mouse listener
		
		function onButtonClick(event : Event) : void
		{
		    trace("clicked" + event.target);
		    //gotoAndPlay("someFrameLabel"); // plays frame in current timeline
		    no_mc.gotoAndPlay("2"); // plays frame in instance "targetMc" timeline
		}
		mc_2.buttonMode = true; // set the movieclip to act as a button
		mc_2.addEventListener(MouseEvent.CLICK, onButtonClick2); // add mouse listener
		
		function onButtonClick2(event : Event) : void
		{
		    trace("clicked" + event.target);
		    //gotoAndPlay("someFrameLabel"); // plays frame in current timeline
		   no_mc.gotoAndPlay("2"); // plays frame in instance "targetMc" timeline
		}
		mc_3.buttonMode = true; // set the movieclip to act as a button
		mc_3.addEventListener(MouseEvent.CLICK, onButtonClick3); // add mouse listener
		
		function onButtonClick3(event : Event) : void
		{
		    trace("clicked" + event.target);
		    //gotoAndPlay("someFrameLabel"); // plays frame in current timeline
		   no_mc.gotoAndPlay("2"); // plays frame in instance "targetMc" timeline
		}
		mc_4.buttonMode = true; // set the movieclip to act as a button
		mc_4.addEventListener(MouseEvent.CLICK, onButtonClick4); // add mouse listener
		
		function onButtonClick4(event : Event) : void
		{
		    trace("clicked" + event.target);
		    //gotoAndPlay("someFrameLabel"); // plays frame in current timeline
		   ok_mc.gotoAndPlay("2"); // plays frame in instance "targetMc" timeline
		}*/
	}
	this.frame_2620 = function() {
		playSound("_30");
	}
	this.frame_2767 = function() {
		/* back_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler23);
		function mouseDownHandler23(event:MouseEvent):void
		{
		    gotoAndPlay("n11");
		 
			}
		 
		next_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler24);
		function mouseDownHandler24(event:MouseEvent):void
		{
		    play();
		}*/
		/* stop();
		mc_11.buttonMode = true; // set the movieclip to act as a button
		mc_11.addEventListener(MouseEvent.CLICK, onButtonClick5); // add mouse listener
		
		function onButtonClick5(event : Event) : void
		{
		    trace("clicked" + event.target);
		    //gotoAndPlay("someFrameLabel"); // plays frame in current timeline
		    no1_mc.gotoAndPlay("2"); // plays frame in instance "targetMc" timeline
		}
		mc_22.buttonMode = true; // set the movieclip to act as a button
		mc_22.addEventListener(MouseEvent.CLICK, onButtonClick6); // add mouse listener
		
		function onButtonClick6(event : Event) : void
		{
		    trace("clicked" + event.target);
		    //gotoAndPlay("someFrameLabel"); // plays frame in current timeline
		   ok1_mc.gotoAndPlay("2"); // plays frame in instance "targetMc" timeline
		}
		mc_33.buttonMode = true; // set the movieclip to act as a button
		mc_33.addEventListener(MouseEvent.CLICK, onButtonClick7); // add mouse listener
		
		function onButtonClick7(event : Event) : void
		{
		    trace("clicked" + event.target);
		    //gotoAndPlay("someFrameLabel"); // plays frame in current timeline
		   no1_mc.gotoAndPlay("2"); // plays frame in instance "targetMc" timeline
		}
		mc_44.buttonMode = true; // set the movieclip to act as a button
		mc_44.addEventListener(MouseEvent.CLICK, onButtonClick8); // add mouse listener
		
		function onButtonClick8(event : Event) : void
		{
		    trace("clicked" + event.target);
		    //gotoAndPlay("someFrameLabel"); // plays frame in current timeline
		   no1_mc.gotoAndPlay("2"); // plays frame in instance "targetMc" timeline
		}*/
	}
	this.frame_2770 = function() {
		var soundInstance = playSound("_31",0);
		this.InsertIntoSoundStreamData(soundInstance,2770,2941,1);
	}
	this.frame_2958 = function() {
		var soundInstance = playSound("_32",0);
		this.InsertIntoSoundStreamData(soundInstance,2958,3204,1);
	}
	this.frame_3272 = function() {
		/*     gotoAndPlay("n1");
		*/
	}
	this.frame_3273 = function() {
		/* back_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler223);
		function mouseDownHandler223(event:MouseEvent):void
		{
		    gotoAndPlay("n1");
		 
			}
		 
		next_btn.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler224);
		function mouseDownHandler224(event:MouseEvent):void
		{
		    gotoAndPlay("n1");
		}*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(28).call(this.frame_28).wait(170).call(this.frame_198).wait(136).call(this.frame_334).wait(225).call(this.frame_559).wait(122).call(this.frame_681).wait(1).call(this.frame_682).wait(142).call(this.frame_824).wait(199).call(this.frame_1023).wait(210).call(this.frame_1233).wait(2).call(this.frame_1235).wait(221).call(this.frame_1456).wait(77).call(this.frame_1533).wait(119).call(this.frame_1652).wait(64).call(this.frame_1716).wait(121).call(this.frame_1837).wait(64).call(this.frame_1901).wait(104).call(this.frame_2005).wait(378).call(this.frame_2383).wait(1).call(this.frame_2384).wait(234).call(this.frame_2618).wait(2).call(this.frame_2620).wait(147).call(this.frame_2767).wait(3).call(this.frame_2770).wait(188).call(this.frame_2958).wait(314).call(this.frame_3272).wait(1).call(this.frame_3273).wait(8599));

	// next_back
	this.back_btn = new lib.re_btn();
	this.back_btn.name = "back_btn";
	this.back_btn.setTransform(156.25,790,0.968,0.968,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.back_btn, 0, 1, 2, false, new lib.re_btn(), 3);

	this.next_btn = new lib.next_btn();
	this.next_btn.name = "next_btn";
	this.next_btn.setTransform(324.5,790.1,0.968,0.968,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next_btn, 0, 1, 2, false, new lib.next_btn(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.next_btn},{t:this.back_btn}]}).to({state:[{t:this.next_btn},{t:this.back_btn}]},681).to({state:[{t:this.next_btn},{t:this.back_btn}]},552).to({state:[{t:this.next_btn},{t:this.back_btn}]},1150).to({state:[{t:this.next_btn},{t:this.back_btn}]},235).to({state:[{t:this.next_btn},{t:this.back_btn}]},149).to({state:[{t:this.next_btn},{t:this.back_btn}]},506).to({state:[]},1).wait(8598));

	// butons
	this.home_btn = new lib.home_btn();
	this.home_btn.name = "home_btn";
	this.home_btn.setTransform(80.3,790.1,0.968,0.968,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.home_btn, 0, 1, 2, false, new lib.home_btn(), 3);

	this.idwa_btn = new lib.mainidea_btn();
	this.idwa_btn.name = "idwa_btn";
	this.idwa_btn.setTransform(405.3,789.95,0.968,0.968,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.idwa_btn, 0, 1, 2, false, new lib.mainidea_btn(), 3);

	this.stop_btn = new lib.movstop();
	this.stop_btn.name = "stop_btn";
	this.stop_btn.setTransform(239.15,788.35,0.8403,0.8403,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.stop_btn, 0, 1, 1);

	this.play_btn = new lib.movplaystop();
	this.play_btn.name = "play_btn";
	this.play_btn.setTransform(239.05,788.35,0.8403,0.8403);
	new cjs.ButtonHelper(this.play_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.play_btn},{t:this.stop_btn},{t:this.idwa_btn},{t:this.home_btn}]}).to({state:[]},3274).wait(8598));

	// idwa
	this.instance = new lib.kjadbvkjadbnkjadfbvakjdfvadvdv("synched",0);
	this.instance.setTransform(242.25,202.25);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3273).to({_off:false},0).to({_off:true},1).wait(8598));

	// Layer_25
	this.instance_1 = new lib.ljadlanfljafaf("synched",0);
	this.instance_1.setTransform(21.5,282.1,0.2,0.2,0,0,0,0,0.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2958).to({_off:false},0).to({_off:true},315).wait(8599));

	// q6
	this.instance_2 = new lib.ljafjlaflasf("synched",0);
	this.instance_2.setTransform(151.05,136.5,0.2,0.2,0,0,0,0,0.2);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2768).to({_off:false},0).to({_off:true},505).wait(8599));

	// circle__mc
	this.no1_mc = new lib.sprite294();
	this.no1_mc.name = "no1_mc";
	this.no1_mc.setTransform(337.05,275);

	this.ok1_mc = new lib.utdutuu();
	this.ok1_mc.name = "ok1_mc";
	this.ok1_mc.setTransform(185.25,271.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.ok1_mc},{t:this.no1_mc}]},2767).to({state:[]},1).to({state:[]},1).wait(9103));

	// Layer_19
	this.mc_44 = new lib.kjabfkakfjaf();
	this.mc_44.name = "mc_44";
	this.mc_44.setTransform(117.45,478.75,0.2,0.2,0,0,0,0.2,0.2);

	this.mc_33 = new lib.lamfamfaf();
	this.mc_33.name = "mc_33";
	this.mc_33.setTransform(340.6,479,0.2,0.2,0,0,0,0.2,0.2);

	this.mc_22 = new lib.okandflnalfdf();
	this.mc_22.name = "mc_22";
	this.mc_22.setTransform(139.15,373.65,0.2,0.2,0,0,0,0.2,0.2);

	this.mc_11 = new lib.pkadpfkafpaf();
	this.mc_11.name = "mc_11";
	this.mc_11.setTransform(350.5,373.25,0.2,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.mc_11},{t:this.mc_22},{t:this.mc_33},{t:this.mc_44}]},2767).to({state:[]},1).to({state:[]},1).wait(9103));

	// q2_2
	this.instance_3 = new lib.ihdbhadbfkiaf("synched",0);
	this.instance_3.setTransform(146.75,160.05,0.2,0.2,0,0,0,0.2,0);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2619).to({_off:false},0).to({_off:true},149).wait(9104));

	// q2_mp3
	this.mc_4 = new lib.khadbfkjadbkfhafaf();
	this.mc_4.name = "mc_4";
	this.mc_4.setTransform(147.7,457.35,0.24,0.24,0,0,0,0,0.4);

	this.mc_3 = new lib.jaadnladf();
	this.mc_3.name = "mc_3";
	this.mc_3.setTransform(373.45,458.65,0.24,0.24,0,0,0,0.2,0.4);

	this.mc_2 = new lib.uhsdbfsdbfiaufa();
	this.mc_2.name = "mc_2";
	this.mc_2.setTransform(138.1,363.1,0.24,0.24,0,0,0,0,0.2);

	this.mc_1 = new lib.sjhsdbfsdfsdf();
	this.mc_1.name = "mc_1";
	this.mc_1.setTransform(348.1,363.8,0.24,0.24,0,0,0,0.4,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.mc_1},{t:this.mc_2},{t:this.mc_3},{t:this.mc_4}]},2618).to({state:[]},1).to({state:[]},1).wait(9252));

	// circle__mc
	this.ok_mc = new lib.sprite197();
	this.ok_mc.name = "ok_mc";
	this.ok_mc.setTransform(185.25,271.65);

	this.no_mc = new lib.sprite294();
	this.no_mc.name = "no_mc";
	this.no_mc.setTransform(337.05,275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.no_mc},{t:this.ok_mc}]},2618).to({state:[]},1).to({state:[]},1).wait(9252));

	// txt
	this.instance_4 = new lib.nsvbjhsdbfksdjfbksdf("synched",0);
	this.instance_4.setTransform(271.7,166.05,0.2,0.2);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2524).to({_off:false},0).to({_off:true},95).wait(9253));

	// q2
	this.instance_5 = new lib.dbfffdg("synched",0);
	this.instance_5.setTransform(324,106.05,0.2,0.2);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(2384).to({_off:false},0).to({_off:true},384).wait(9104));

	// m1
	this.instance_6 = new lib.sfgsdgsdgsdgsg("synched",0);
	this.instance_6.setTransform(236.8,145.65,0.18,0.18,0,0,0,0.6,0.6);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1233).to({_off:false},0).wait(1150).to({mode:"single"},0).to({_off:true},829).wait(8660));

	// Layer_6
	this.instance_7 = new lib.sdfsdsdsds("synched",0);
	this.instance_7.setTransform(238.45,529);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1063).to({_off:false},0).to({alpha:1},7).to({_off:true},163).wait(10639));

	// Layer_5
	this.instance_8 = new lib.shape56("synched",0);
	this.instance_8.setTransform(244.9,430.85,1.54,1.54);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1004).to({_off:false},0).to({alpha:1},17).wait(26).to({startPosition:0},0).to({regX:0.1,regY:0.1,scaleX:2.2546,scaleY:2.2546,x:244.95,y:220.9},10).to({_off:true},176).wait(10639));

	// Layer_4
	this.instance_9 = new lib.flowerrr();
	this.instance_9.setTransform(251,350.15,0.4,0.4,0,0,0,0.1,0.2);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(933).to({_off:false},0).to({scaleX:1.6,scaleY:1.6,x:250.95,y:350.05},13).wait(63).to({alpha:0},11).to({_off:true},1).wait(10851));

	// Layer_3
	this.instance_10 = new lib.flower("synched",0,false);
	this.instance_10.setTransform(247.8,388,1,1,0,0,0,209.2,159.8);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(822).to({_off:false},0).wait(42).to({startPosition:42},0).to({scaleX:2,scaleY:2,x:247.85,y:388.05,startPosition:50},8).wait(66).to({startPosition:104},0).to({alpha:0},9).to({_off:true},1).wait(10924));

	// Layer_1
	this.instance_11 = new lib.intromobile3("synched",0,false);
	this.instance_11.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(681).to({_off:false},0).wait(128).to({startPosition:128},0).to({alpha:0,startPosition:137},13).to({_off:true},1).wait(11049));

	// txt_explor
	this.instance_12 = new lib.kskjsrhgbers("synched",0);
	this.instance_12.setTransform(242.6,583.3,0.2,0.2,0,0,0,0.2,0.2);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(681).to({_off:false},0).to({_off:true},18).wait(11173));

	// EXPOLRE
	this.instance_13 = new lib.EXPLOR("synched",0,false);
	this.instance_13.setTransform(239.95,269.95,1.1,1.1);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(681).to({_off:false},0).to({_off:true},25).wait(11166));

	// txt_3
	this.instance_14 = new lib.khbjhbkccccc("synched",0);
	this.instance_14.setTransform(14,408.75);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(564).to({_off:false},0).to({alpha:1},8).wait(94).to({startPosition:0},0).to({alpha:0},12).to({_off:true},1).wait(11193));

	// sce_3
	this.instance_15 = new lib.intromobile2("synched",0,false);
	this.instance_15.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(530).to({_off:false},0).wait(132).to({startPosition:123},0).to({alpha:0},17).to({_off:true},1).wait(11192));

	// txt_2
	this.instance_16 = new lib.ljDFgkljDFg("synched",0);
	this.instance_16.setTransform(230.85,521.2,0.14,0.14);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(338).to({_off:false},0).to({alpha:1},12).wait(174).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(11337));

	// sce2
	this.instance_17 = new lib.ani1("synched",0,false);
	this.instance_17.setTransform(211,310,0.72,0.72,0,0,0,-5,2.6);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(335).to({_off:false},0).to({alpha:1,startPosition:12},12).wait(177).to({startPosition:173},0).to({alpha:0},10).to({_off:true},1).wait(11337));

	// txt_1
	this.instance_18 = new lib.txt1("synched",0,false);
	this.instance_18.setTransform(264.2,200.75,12,12,0,0,0,8.3,3.2);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(160).to({_off:false},0).to({alpha:1},11).wait(72).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(11618));

	// txt2
	this.instance_19 = new lib.txt122("synched",0,false);
	this.instance_19.setTransform(270.3,210.65,14.4,14.4,0,0,0,8.3,3.2);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(254).to({_off:false},0).to({alpha:1},9).wait(40).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(11557));

	// sce1
	this.instance_20 = new lib.intromobile("synched",0,false);
	this.instance_20.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(325).to({startPosition:303},0).to({alpha:0},10).to({_off:true},1).wait(11536));

	// BG
	this.instance_21 = new lib.Path();
	this.instance_21.setTransform(240,400,0.48,0.9938,0,0,0,500,402.5);
	this.instance_21.alpha = 0.3984;

	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#515A61","#666666","#2A2E35","#23262D"],[0,0.314,0.733,1],0,0,0,0,0,646.3).s().p("EhOHA+5MAAAh9xMCcPAAAMAAAB9xg");
	this.shape.setTransform(239.9979,400.0003,0.48,0.9938);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_21}]}).wait(11872));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(23.9,370.8,800.5,501.59999999999997);
// library properties:
lib.properties = {
	id: '7C9E1DDE09162345B2BF7EC533E401AD',
	width: 480,
	height: 800,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_37.png", id:"CachedBmp_37"},
		{src:"images/CachedBmp_34.png", id:"CachedBmp_34"},
		{src:"images/CachedBmp_21.png", id:"CachedBmp_21"},
		{src:"images/CachedBmp_19.png", id:"CachedBmp_19"},
		{src:"images/CachedBmp_18.png", id:"CachedBmp_18"},
		{src:"images/CachedBmp_17.png", id:"CachedBmp_17"},
		{src:"images/CachedBmp_16.png", id:"CachedBmp_16"},
		{src:"images/CachedBmp_12.png", id:"CachedBmp_12"},
		{src:"images/CachedBmp_11.png", id:"CachedBmp_11"},
		{src:"images/CachedBmp_1.png", id:"CachedBmp_1"},
		{src:"images/maktabati_L1_HTML5 Canvas_atlas_1.png", id:"maktabati_L1_HTML5 Canvas_atlas_1"},
		{src:"images/maktabati_L1_HTML5 Canvas_atlas_2.png", id:"maktabati_L1_HTML5 Canvas_atlas_2"},
		{src:"images/maktabati_L1_HTML5 Canvas_atlas_3.png", id:"maktabati_L1_HTML5 Canvas_atlas_3"},
		{src:"sounds/_1mp3copy.mp3", id:"_1mp3copy"},
		{src:"sounds/_2.mp3", id:"_2"},
		{src:"sounds/_212.mp3", id:"_212"},
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
		{src:"sounds/_4.mp3", id:"_4"},
		{src:"sounds/_6.mp3", id:"_6"},
		{src:"sounds/_7.mp3", id:"_7"},
		{src:"sounds/_8.mp3", id:"_8"},
		{src:"sounds/yas.mp3", id:"yas"},
		{src:"sounds/sound145overtodown.mp3", id:"sound145overtodown"},
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
an.compositions['7C9E1DDE09162345B2BF7EC533E401AD'] = {
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
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;