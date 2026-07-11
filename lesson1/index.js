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


(lib._6dpi20 = function() {
	this.initialize(img._6dpi20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,48,48);


(lib.Bitmap18 = function() {
	this.initialize(img.Bitmap18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,427);


(lib.Bitmap19 = function() {
	this.initialize(img.Bitmap19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,630,300);


(lib.Bitmap20 = function() {
	this.initialize(img.Bitmap20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,332,221);


(lib.Bitmap55 = function() {
	this.initialize(img.Bitmap55);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,280,300);


(lib.Bitmap56 = function() {
	this.initialize(img.Bitmap56);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,655,430);


(lib.Untitled1 = function() {
	this.initialize(img.Untitled1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,546,382);// helper functions:

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


(lib.sfnklkcsds = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AhXBbQAFgIAHgGQAIAGAJAJQgHAKgEAEIgSgPgAg6BZIAMgOQAIAGAJAKIgMANIgRgPgAgVBYIADgFQAKAFALAAQAVAAAUgUIAJgLQAEgFABgFIgHAAQgXAAgMgIQgLgHAAgQQAAgNAIgKQAEgGAGgEQAGgEAGAAQALAAAJANQAJANADAXIATAAQAKAAAIgDQAIgEAFgHIAIgMIALgDIABABIgHAMQgDAFAAADQAAAEACACQADACADAAQAHAAAGgFIAFgFQADgEACgEIADgJIAMgEIAAABIgFAMIgBAJQAAADACADQACADAEAAQAGAAAFgEQAFgDADgLIADgLIAMgHIAAAAQgEAMAAAIQAAAIAHAEQAGAEAMAAIAGAAQAJAAAIgEQAIgFAAgLQgBgggDgtIgBgJIgBgJQAAgFAFgFIAIgIIABAAQgBAOANAUIgJAIIABAaIAAAaQAAAYgFAMIgGAKQgDAFgFACQgJAFgKAAIgGAAQgNAAgHgEQgHgDgDgHIgBAAQgMAOgOAAQgNAAgDgNIAAAAQgMANgOAAQgNAAgBgNIgBAAQgLANgVAAIgPAAQAAAHgDAIQgDAIgFAHQgIAMgLAIQgKAGgHAAQgSAAgYgPgAA5AcQgCgOgIgIQgHgHgJAAQgGAAgFADQgGAEAAAFQAAAKARAFIAMACIAOAAIAAAAgAEzAxQABgKAAgTIAAgPQAAgigFg6QAHgIAIgHIABAAQAEAoAABAIgBAYQgBAGgDAGIgJAMgAjoAxQACgKAAgTIAAgPQAAgigGg6QAHgIAIgHIABAAQAEAoAABAIgBAYQAAAGgEAGQgCAFgHAHgAlBAvIAHgLIAIgGIAAgBQgQgFAAgNQAAgGADgFQADgEAEgEQAFgFAIgDQAHgDAGAAQAGAAAEADQAEADAAAFQAAAIgHAFIgBAAQgBgFgDgCQgDgEgFAAIgHACIgGADQgEABAAADQAAAFAGAEIAJAEQAFACAFAAQAMAAANgCIABABIgIAPQgfADgWANgAhZAvQgLAAgHgFQgJgGgEgNIAAAAQgCAJgJAFQgRAKgNAAQgNAAgGgHQgHgIAAgNIAAgLIAGAAQABAUAUAAQAGAAAHgCQAGgCAFgEQAFgCACgDQADgDAAgDQAAgHgDgOIgJghIAFgIIAFgIIABABQAHAcAHAlQACALAHAGQAGAGAJAAIAFAAQAVAAAIgDQAJgDAAgEQAAgEgFgLIgKgUIALgRIABAAQAGAKAEALQAFANAAAKQAAAIgDAHQgDAGgFAHQgFAFgJACQgJACgRAAg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.2,-10.6,64.5,21.299999999999997);


(lib.sfgsfgfgb = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AjCBcIgDgEQgOgOAAgYQAAgLACgLQADgLAEgIIAHABIgCAGQgEALAAAHQAAAMAEAJQADAJAHAIQAMANAVAAQAMAAAKgDQAMgDAOgIQASgNAAgFQAAgEgBgCIgJAAQgWAAgMgHQgMgIAAgQQAAgNAIgJQAFgHAFgEQAGgEAHAAQALAAAIAOQAKANADAWIAQAAQAJAAAIgFQAEgCACgEQABgEAAgIIAAgrIgDgvIAAgHIAMgNIABAAIADA3IAAA9QAAAGAFAFQAGAGALAAIAEAAIAEAAQAIgBALgDQgDgFgBgHIAAgKQAAgJADgIQADgKAHgHQAFgHAHgDQAGgEAFAAQAEAAAEAEQAEAFAEAHQAHALgBALQAAAIgCAJQgDAIgFAIQAKADAOAAIAHAAQAKAAAHgFQAIgEAAgMQgBgggDgrIgBgTQgBgFAFgFIAIgIIABABQAAANAMAVIgJAHIABAaIABAZQAAAZgGAMIgGALQgDAEgFACQgJAFgKAAIgGAAQgLAAgMgCQgMgDgOgEQgYAIgOABIgDAAIgGAAQgWAAgHgQIAAAAQgFAHgHAEQgHAFgLAAIgNAAQAAAJgCAJQgBAEgEAFIgGAIQgNAKgPAHQgRAIgSgBQgXAAgQgOgAiBACQgGAFABAEQAAAFAEAEQAEAEAIABIANADIANAAQgCgOgIgIQgEgEgEgCQgEgCgDAAQgHAAgFAEgAAggQQgHAIgCAIQAEAOARAGQAIgCAHgGQAIgGAAgEQAAgGgDgHQgHgNgIAAQgIAAgJAIgACnAxQABgKAAgTIAAgPQABgggGg7QAHgJAIgIIABABQAEAoAABAIgBAZQgBAGgCAFIgKAMgADSAEIACgHIAAAHgAiWg3IALgOQAIAGAJAKIgKANIgSgPgAh6g5IAMgOQAIAGAJAKQgGAJgFAFIgSgQgAAfhSIANgOQAIAFAKAKQgGAJgHAGIgSgQg");
	this.shape.setTransform(334.1,2.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Aj7D4QAFgHAGgHIARAQQgGAJgFAFIgRgQgAjfD2IAMgOIARAQQgGAJgFAFIgSgQgA16DzIALgPQAIAGAJAKQgGAJgFAEIgRgOgA1eDwQAGgHAGgHQAIAGAJAKIgLAOIgSgQgA0MDvIACgEQAKAEAMAAQAVABAUgVIAJgKQAEgFABgFIgHAAQgXAAgLgIQgMgHAAgQQAAgNAIgLQAEgGAGgFQAGgDAHAAQAKgBAJAOQAKAOADAXIAQAAQAKAAAHgEQAHgEABgGIAEgRIAKgIIABABQgDAJAAAFQAAAGACAEQACAEAFADIAOgTQAIgLAJgIQAIgHAIgEQAKgFAJAAQAKAAAIAFQAHAFADAGQAEAIAAAKQAAAGgDAHQgGAUgZAHQgNAFgYABQgfAAgMgQIAAAAQgGAIgJAEQgHAEgJAAIgOAAQgBAHgDAHQgDAJgFAHQgHAMgMAHQgKAGgGABQgTAAgYgQgAxTCUQgOAKgMASQAJAEATAAQAKAAALgDIARgGIAJgFQADgDAAgDQgBgJgHgHQgHgGgKAAQgNgBgOALgAzjCaQgFAEAAAFQAAAJAQAFIANACIAOABQgDgOgIgJQgHgIgIAAQgHAAgFAFgAlIDmQgMgNAAgVQAAgSAIgRIAFACQgEANAAALQAAAQALAKQAKAKAOAAQAQAAAOgJIAMgJQAEgEAAgFQAAgGgDgIQgDgHgFgHIgLgMIAFgTIACAAIALAJQAEADAIAAQAGAAAEgDQADgCADgHIAHgLIABAAIAEAWQAEAWAJAFIAGADIAGACIAFAAQAJAAAHgEQAIgEACgGIAEgQIAKgIIABACQgDALAAAGQAAAJAFAEQAHAFALABIAFAAQAJgBAPgEQgDgEgBgHIgBgLQAAgKADgIQAEgKAHgHQAFgGAHgEQAGgDAEgBQAEAAAFAFQAEAEAFAIQAFAKAAALQAAAKgDAIQgCAJgFAHQAJADAOABIAIAAQAJgBAIgFQADgBACgFQACgEAAgHIgCgsIgCgvIgBgIIANgNIABABQACAXABAfIAAA/QAAAGAFAFQAGAFALABIAPAAQAWgBAKgDQAHgCAFgDQAGgEAAgDIgBgEIgQACQgdgBgHgQQgCgFAAgFQAAgJADgHQACgIAGgGQAJgKAKAAQAJAAAHAIQAHAIAFANQAHARAAATQAAAPgIAJQgHAIgNADQgMAEgVAAIgPAAQgWAAgHgQIgBAAQgDAGgGAEQgIAFgKABIgHAAQgLAAgMgDQgMgCgOgFQgbAKgPAAIgGAAQgMAAgHgEQgJgEgDgIIgBAAQgDAIgJADQgHAFgKAAIgGAAQgNgBgHgHQgGgIgFgSIgEgQIAAAAQgIAPgNABQAEALAAARQAAANgEALQgGAJgKAHQgQAKgSAAQgUAAgMgNgAhTCHQgHAHgCAJQAEAPAQAFQAIgCAIgFQAIgHAAgEQAAgGgEgIQgGgMgIAAQgJAAgIAIgAA/B3QgFAFAAAEQAAAJANADQAKADAUABQgCgMgHgIQgIgKgIAAQgHAAgGAFgAJIDkIADgGQAJAGAMAAQAMgBALgFQALgGAKgLQANgOABgLQgKACgKABQgOgBgJgGQgJgIAAgNQAAgOAJgMQAMgMAKAAQAGAAAGAEQAGAFAEAHQAFAJACAJQADALAAAMQAAAWgMARQgSAdgUAAQgVAAgWgOgAJ1CMQgGAFAAADQAAAIAIAEQAIAEAJABQAKAAAHgCQgDgNgGgGQgHgIgJAAQgGgBgFAFgANlDlIABgEQAIADAJAAQAPgBAPgLQAOgMAIgRQACgDAAgDIgBgFIgCgDQgIgSgJgPIAKgTIABAAIALAUIAFANQACAHAAAJIAAAQQAAATgTAXQgNANgLAAQgQAAgWgMgATxDeQgLgMAAgVQAAgQAKgWIAGADQgHAOAAAMQAAAMAIAKQAJAMARAAQANAAAMgGQANgHAEgIIAAgCIABgHQAAgpgFhPIAOgOIABABQACBAAAApQAAAFACAGQACAFAEADQAFAEAJABIAFAAQAJAAAHgEQAIgEACgGIAEgQIAKgIIABACQgDALAAAGQAAAJAFAEQAHAFALABIAGAAQASAAAHgbQADgJAIgJQAKgJAJABQANAAAJAPQAHAOACAVQgEAUgLgBQgVAAgYgRIgBAAQgFATgVABIgFAAQgMAAgHgEQgIgEgEgIIgBAAQgDAIgJADQgHAFgKAAIgGAAQgQAAgHgMIgBAAQgCANgDAKQgGAKgLAGQgOAKgRAAQgUgBgLgNgAXOCTQgFAEgEAHQAGAJAPAHQALADAHAAQABAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQgDgQgHgJQgGgHgIAAQgGAAgFADgAq0DeQgKgMAAgVQAAgQAKgWIAFADQgGAOAAAMQAAAMAHAKQAKAMAQAAQANAAANgGQAMgHAEgIIABgCIAAgHQAAgpgEhPIANgOIABABQADBAAAApQAAAFACAGQACAFADADQAFAEAKABIAEAAQAKAAAHgEQAHgEACgGIAEgQIALgIIABACQgEALAAAGQAAAJAFAEQAHAFAMABIAGAAQARAAAIgbQACgJAJgJQAJgJAJABQANAAAJAPQAIAOACAVQgFAUgLgBQgVAAgXgRIgBAAQgGATgUABIgGAAQgMAAgHgEQgIgEgEgIIAAAAQgEAIgIADQgIAFgKAAIgGAAQgQAAgHgMIgBAAQgBANgEAKQgGAKgLAGQgOAKgRAAQgUgBgLgNgAnXCTQgFAEgDAHQAGAJAPAHQAKADAHAAQAEAAABgBQgDgQgHgJQgGgHgHAAQgHAAgFADgADeDAQgVgOAAgZQAAgUAJgQIAGACQgFANAAAJQAAAWAUALQARAKAeAAQAYAAAbgHIAUgFIABgCQAAgFgEgKIgLgWQAGgKAGgGIAAAAQAGAKAEALQAFANAAALQAAAHgCAGIgGALQgKAHgYAGQgZAFgVAAQghAAgTgMgAR+DJQACgKAAgUIAAgPQAAgjgFg5QAHgJAHgHIACABQADAoAABBIgBAYQAAAGgDAGQgDAEgHAIgALADJQACgKAAgUIAAgPQAAgjgFg5QAGgIAIgIIACABQADAoAABBIgBAYQAAAGgDAGQgDAEgHAIgAGHDJQACgKAAgUIAAgPQAAgggGg8QAHgJAIgHIABABQAEAoAABBIgBAYQAAAGgEAGQgCAEgHAIgAsmDJQABgKAAgUIAAgPQAAgjgFg5QAHgIAIgIIABABQAEAoAABBIgBAYQgBAGgDAGIgJAMgAM5DDQgIgEgDgJQgEgJAAgKQAAgHACgIIAHgOQAGgKAJgJIABgOIACgBIAXASQARAOACAKQADAGAAAKQAAAIgCAIQgDAJgDADQgNAOgSAAQgLAAgHgFgAMzCgQAAAJAIAFQAHAGAKABQAMgBALgHQAHgGAAgEQAAgHgIgJQgJgLgPgJQgXASAAAPgAG8DAQgIgHAAgRIABgKIAGAAQAAAKAFAGQAGAHANAAQAIAAAIgDQAIgCAIgFQABAAABgBQAAAAABgBQAAAAAAgBQAAAAAAgBQAAgFgDgIQgEgHgHgIQgMgNgSgJQgFgCAAgEQAAgEAIgNIABAAQAJAGAJAIQAKAIAHAJQAPASAAARQAAANgGANQgXAOgSAAQgOAAgHgIgAQyDHQgLAAgHgGQgIgGgEgNIgBAAQgCAJgJAGQgQAJgOABQgMAAgHgIQgHgHAAgNIABgLIAGgBQABAVAUAAQAFAAAHgDIAMgFQAEgDADgDQADgCAAgEQAAgGgEgPIgJgiIAFgIIAGgHIABABQAHAcAHAmQACAKAGAHQAHAFAIABIAGAAQAJAAAIgFQAIgFAAgLQgBghgEgsIgBgKIAAgIQAAgGAEgEIAJgJIABABQgBANANAVIgKAHIABAaIABAaQAAAZgGAMQgCAHgDAEQgEAEgEADQgJAFgKAAgAt0DHQgLAAgMgDQgMgCgOgFQgbAKgPAAIgFAAQgJAAgGgDQgGgBgEgFQgGgGgCgKQgBgHAAgTQAAgigEg3IAOgOIABABIACA0IAAA3IAAAJQAAALALAEQAFACAFABIAEAAQAJgBAPgEQgDgEgBgHIgBgLQAAgKADgIQAEgKAHgHQAFgGAHgEQAGgDAEgBQAEAAAFAFQAEAEAFAIQAFAKAAALQAAAKgDAIQgCAJgFAHQAJADAOABIAIAAQAKAAAHgFQAIgFAAgLQAAgggEgtIgBgKIgBgIQAAgGAFgEIAIgJIABABQgBANANAVIgJAHIABAaIABAaQAAAZgGAMIgGALQgDAEgFADQgJAFgKAAgAusCHQgIAHgCAJQAEAPAQAFQAIgCAIgFQAIgHAAgEQAAgGgEgIQgGgMgIAAQgJAAgHAIgA09DHQgMAAgHgEQgIgEgEgIIgBAAQgDAIgIADQgIAFgKAAIgFAAQgIAAgGgDQgGgBgFgFQgGgGgCgKIgBgaQAAgjgEg2IAOgOIABABIACA0IAAA3IAAAJQAAALALAEQAFACAFABIAFAAQAJAAAIgEQAHgEACgGIAEgQIAKgIIABACQgDALAAAGQAAAJAFAEQAHAFALABIAGAAQAKAAAHgFQAIgEAAgMQgBghgDgsIgBgKIgBgIQAAgGAFgEIAIgJIABABQgBANANAVIgJAHIABAaIAAAaQAAAZgFAMIgGALQgDAEgFADQgJAFgKAAgAViBsIAMgPIARAQQgGAJgGAFIgRgPgAi5BsIAMgPIARAQIgMAOIgRgPgApDBsIAMgPIARAQQgGAJgFAFIgSgPgAV/BpIAMgNQAIAFAJAKIgMAOQgJgJgIgHgAicBpIALgNQAJAFAIAKQgGAJgFAFIgRgQgAomBpIAMgNQAIAFAJAKQgGAJgFAFIgSgQgAk0BnIAMgPQAJAGAJAKQgFAIgHAHIgSgQgAD7BaIALgPQAIAGAJALIgLANIgRgPgAEXBXIAMgNQAIAFAJALQgGAIgFAFIgSgQgAVqBLIAMgOQAIAHAJAJQgGAKgFAEIgSgQgAo7BLIAMgOQAJAHAIAJQgGAKgFAEIgSgQgAhkBIQAGgJAGgGQAHAGAKALQgHAIgFAFIgRgPgAhHBFIAMgNQAHAFAJALQgGAIgFAFIgRgQgAuuBFIAMgPQAKAHAIAIQgFAKgHAGIgSgQgAMrBCIAMgPIARAQQgHAKgFAEIgRgPgANIBAQAEgHAHgIQAJAHAIAKQgGAJgFAEIgRgPgAA8A/IANgPQAIAHAJAJQgFAIgHAGIgSgPgAG/A8IAMgPQAIAGAKAKQgFAIgIAGIgRgPgAPyA6IAMgPQAJAHAJAJQgGAJgHAGIgRgQgAPbAoIgHgCIAAgBIAUgIQALgFAGgEQgJgCgFgEQgEgDAAgHQAAgHAHgGQAGgGAHAAQAFAAAEAEQAEAGAAAKIgBAGIAFACIgHAKIgDgCQgJAMgWAHIgIAAgAPxgEQgBABgBAAQAAABgBAAQAAABAAAAQAAABAAAAQAAADAFADQAFADAIACIABgEQAAgFgDgDQgDgFgEAAQgEAAgCACgAK9g4IAMgPQAJAHAJAJQgFAJgHAGIgSgQgABig6IAMgPQAJAHAJAJQgFAJgHAGIgSgQgAuDg8IADgFQAKAGAMAAQAVAAAUgVIAJgKQAEgFABgGIgHAAQgXABgLgIQgMgHAAgQQAAgNAIgLQAEgHAGgEQAGgDAHAAQAKAAAJANQAKAOADAWIATAAQAKAAAJgBQAKgDAHgFQAHgEAAgDQAAgDgDgHQgEgJgLgMIgWgYIgJgKIgBgJQAAgFAEgHQACgDADgDQALgGAagKIA3gTIABABIgMATQgLADgXAIQggAMgNAHIAAAAQAIAGAPAFIgFAIQAVATAiAoQAHAIAGAEQAHADAJAAIAFAAQAWAAAHgCQAJgDAAgEQAAgFgFgLIgKgVQAFgJAGgIIABAAQAGALAEALQAFANAAAKQAAAJgDAHQgDAGgFAGQgFAGgJABQgJACgRAAIgFAAQgMAAgKgGQgHgGgJgMIgNgQIgBAAQAAASgMAKQgNAMgeAAIgQAAQgBAHgDAJQgDAIgFAHQgIAMgLAHQgKAHgHAAQgSgBgZgPgAtZiSQgGAFAAAEQAAALARAEIANACIAOAAQgDgNgIgIQgHgJgJAAQgGAAgFAEgARvg7IACgFQAHADALAAQAPAAAPgOQAQgOADgQIgEgIQgHgKgGgLIAIgRIABgBQAHARAHAHQAHAIANAAIALAAQASABAUgIQATgGAXgOIAAAAQgcgKgTgBQgMAAgHAIIACAHIgEANIgCAAIgHgTQABgMAJgHQAJgIANAAQARAAAgANQAMAFANAAIAOAAIgKAQQgQgBgJAGIgZAQQgPAKgQAGQgQAEgSAAIgKAAQgKAAgFgEIAAAAIAAAEQAAAHgCAGQgBAFgDAGQgJAPgJAHQgJAIgJgBQgPAAgWgLgAT7hAIAMgOQAIAGAKAKQgGAIgHAGIgRgQgAFQg9QgMgNAAgUQAAgNAEgMQADgIAGgLIAFAEIgGAPQgCAHAAAGQAAAQAKAKQAFAEAHACQAIAEAIAAQAJAAAKgEQAKgEAHgGQAGgEACgDQADgDAAgEIgBgLIgEgOIgMgZQAFgJAFgHIABAAQAHAPAFAOQADAKAHADQAFACAMAAIAFAAQASABAHgbQADgJAIgJQAKgJAJAAQANAAAJAQQAIAOABAWQgEASgLAAQgVAAgYgRIgBAAQgFATgUAAIgGAAQgNAAgIgGIgBAAQAAAKgDALQgDAJgDAEQgIAKgOAHQgPAHgNAAQgVAAgNgMgAHxiYQgFAEgDAHQAFAJAQAHQAKADAHABQABgBABAAQABAAAAAAQABAAAAAAQABgBAAAAQgDgQgHgJQgGgHgIgBQgGABgFADgAlthHIACgGQAKAFAMABQALAAAMgGQALgGAKgLQANgOABgLQgKADgKAAQgOAAgJgHQgJgIAAgOQAAgNAJgMQAMgMAJAAQAHAAAGAEQAGAFAEAHQAJASAAAYQAAAVgLASQgSAcgUAAQgVAAgWgOgAlAifQgGAEAAAFQAAAGAIAFQAIAFAJAAQAJgBAIgCQgDgMgHgHQgGgHgKgBQgFAAgFAFgA8RhHIACgGQAKAFAMABQALAAALgGQALgGAKgLQANgOABgLQgJADgKAAQgOAAgJgHQgKgIAAgOQAAgNAKgMQALgMAKAAQAGAAAGAEQAGAFAEAHQAFAIACAKQADAMAAAMQAAAVgLASQgTAcgUAAQgVAAgVgOgA7lifQgGAEAAAFQAAAGAIAFQAIAFAKAAQAJgBAIgCQgEgMgGgHQgHgHgJgBQgFAAgGAFgAiAhFIACgGQAIADAIABQAQAAAPgNQAOgLAHgRQACgDAAgEIgBgDIgBgFQgIgRgKgPIALgSIABAAIAKATIAFAMQADAIAAAJIAAAQQAAATgTAXQgNANgMAAQgPAAgXgLgAJ6hBQgIgCgMgGIACgFQAIAEAGAAQAXAAASgVIAJgLQADgHAAgDQgCgGgFgIIgLgLIAFgTIABAAIALAJQAEADAIAAQAGAAAFgEQADgCADgGIAGgMIACAAIAEAYQAEATAIAGQAGAEAGgBIAMAAQANABAJgCQAKgCAIgFQAIgEAAgEQAAgHgLgPQgMgRgggZQgGgEAAgJQAAgFAEgFQADgFAIgEQAMgHAWgHIAugQIABABIgLATIgYAHQgWAHgbANIAYAJIgDAHQASAPAJAOQALAOAAAKQAAALgDAIQgCAIgFAFQgHAGgMAEQgNADgUAAIgIAAQgOAAgGgGQgHgHgEgTIgEgPIgBAAQgDAHgGAEQgGAGgHgBQACAIAAAMIAAAIIgCAIQgDAGgEAGQgHALgIAGQgIAGgGAAQgJAAgKgEgAvnhOQgMgMAAgVQAAgNAEgLQADgJAGgKIAFAEQgEAGgCAIQgCAIAAAGQAAAQAKAJQAFAFAHADQAIACAIAAQAJAAAKgEQAKgDAHgGQAKgIAAgEIgBgPIgDgMQgGgRgHgMIAMgSIABgBQAIAPADAOQAFAQAAAQQAAALgEALQgDAMgEAEQgKAKgNAHQgOAGgNAAQgUAAgNgNgANghfIgRgEIAAgCQAsgFAXgOQgBgEgFgIIgLgSIgQgXIgRgZIgLgRQgDgHAAgEQAAgCACgFIAEgHIABAAIALAMIANAOIgEAJIATAeIAQAaQAGALAAAPIABAAQAMgJAAgSQAAgUgEgpIgBgLIAAgLQAAgHADgEIAIgKIACABIgBADQAAAGAEAIIAIAQIgJAIIABA1QAAAOgFAPQgDAJgDAGQgEAGgGAEQgIAGgKAEQgKADgJAAQgKAAgKgDgEAhPgBhQACgJAAgJQAAgWgJgeQgHgUgOgkIAJgQIADAAIAEALIAGAJQAEAGAKADQAHACAHAAQAKAAAGgFQAJgJACgRIAGACIAAAHQAAAUgIAKQgJAMgRAAQgJAAgJgDIAAABIAJAeQAEARAAAQQAAAHgCAFQgDAHgIANgAWihiQACgLAAgTIAAgOQAAgkgGg5QAHgIAIgIIABABQAEApAAA/IgBAZQAAAGgDAFQgDAGgHAHgAPQhiQACgKAAgUIAAgOQAAgkgGg5IAPgQIABABQAEAoAABAIgBAZQAAAGgDAFIgKANgADchiQACgLAAgTIAAgOQAAgkgGg5QAHgIAIgIIABABQAEAoAABAIgBAZQAAAGgDAFIgKANgAzChiQABgLAAgTIAAgOQAAgkgFg5QAHgJAHgHIACABQAEAoAABAIgBAZQgBAGgDAFQgDAGgHAHgA8jhiQABgLAAgTIAAgOQAAgkgFg5QAHgIAIgIIABABQAEApAAA/IgBAZQgBAGgDAFIgJANgAYNhmQgEgEAAgFQAAgGAEgEQAEgDAFAAQAGAAAEADQADAEAAAGQAAAFgDAEQgEAEgGAAQgGAAgDgEgAQ7hlIAHgLQAFgEAEgCIAAgBQgRgFAAgMQAAgGADgGIAHgJQAFgFAIgDQAHgCAGAAQAGAAAEACQAEAEAAAFQAAAHgHAHIgBAAQgBgFgDgDQgDgEgFAAIgHACIgGACQgEADAAACQAAAGAGADQAEAEAFABQAFACAFgBQAMABANgDIABABIgIAPQgfADgWAOgAirhoQgIgEgEgJQgEgJAAgLQAAgGADgIIAGgOQAHgLAIgIIACgPIACgBIAXATQAQAOADAKQACAHAAAKQAAAHgCAIQgCAJgEADQgNAOgSAAQgLAAgGgFgAiyiLQAAAIAIAHQAIAFAJAAQAMAAAMgIQAGgEAAgGQAAgGgIgJQgJgLgPgJQgXASAAAPgAyNhqQgIgJAAgQIAAgKIAGAAQABALAFAFQAGAHANgBQAIAAAIgCQAHgCAJgFQABAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQAAgHgEgHQgEgIgGgHQgNgOgSgIQgEgDAAgDQAAgEAHgMIACgBQAJAGAJAHQAKAJAHAJQAPASAAARQAAANgGANQgXAOgTAAQgNAAgHgHgEgh2gBoQgIgEgEgJQgDgJAAgLQAAgGACgIIAHgOQAGgLAIgIIABgIIABgHIACgBIAXATQARAOACAKQADAGAAALQAAAHgDAIQgCAJgDADQgNAOgSAAQgLAAgHgFgEgh8gCLQAAAIAIAHQAHAFAKAAQAMAAALgIQAHgEAAgGQAAgGgJgJQgIgLgPgJQgXASAAAPgAVUhlQggAAAAgYIAAgIIAGgEIAAAAQABARAZAAIAIAAQAJABAHgFQAIgEAAgMQAAghgEgsIgBgKIgBgJQAAgEAFgGIAIgIIABABQAAANAMAVIgJAHIABAbIABAZQAAAZgGANQgDAGgDAEQgDAEgFADQgIAFgKgBgACPhlQgLABgIgEQgIgEgEgIIAAAAQgEAIgIAEQgIADgKAAIgFAAQgLABgHgGQgJgGgEgNIgBAAQgBAJgJAFQgQAKgOAAQgMABgGgIQgHgHAAgNIAAgLIAGgBQABAUATAAQAGABAHgDIALgFQAFgCACgDQADgDAAgEQAAgGgDgPIgJgiIAFgIIAFgHIABAAQAHAcAHAnQACAKAHAHQAGAFAJAAIAGAAQAJABAHgEQAIgDABgHIAFgQIAKgIIABABQgDAMAAAGQAAAIAEAFQAIAFALAAIAGAAQAJABAHgFQAIgEAAgMQAAgggEgtIgBgKIAAgJQAAgFAEgFIAIgIIABABQAAANAMAVIgJAHIABAbIABAZQAAAZgGANIgFAKQgEAEgFADQgIAFgKgBgAm9hlQgKABgIgGQgIgGgEgNIgBAAQgCAJgIAFQgRAKgNAAQgNABgGgIQgHgHAAgNIAAgLIAGgBQABAUAUAAQAGABAGgDIAMgFIAHgFQADgDAAgEQAAgGgEgPIgIgiIAFgIIAFgHIABAAQAHAcAHAnQACAKAHAHQAGAFAJAAIAPAAQAWAAAKgCQAHgDAGgEQAFgDAAgDIgBgEIgQABQgdAAgHgQQgCgFAAgGQAAgIADgIQADgHAFgGQAKgKAJAAQAJAAAHAIQAHAIAFANQAHARAAATQAAAPgIAJQgHAHgNAEQgMAEgVgBgAmki0QgFAEAAAFQAAAJANAEQALACATAAQgCgLgHgIQgIgKgIAAQgHABgGAEgA1nhlQgWAAgHgPIgBAAQgDAGgHAFQgIAEgKAAIgHAAQgLAAgMgCQgMgCgOgFQgbAJgPAAIgGAAQgMAAgHgDQgIgFgEgMQgPAGgOAAQgNAAgHgEQgIgFAAgIQAAgHAFgKQAJgUAngWIgBgLIAMgMIABAAIABBFIABANQACAGADADQAEADALAAIAHAAQAIAAAQgDQgEgGgBgGIgBgLQAAgJADgJQAEgKAHgHQAFgGAHgEQAGgDAEAAQAEAAAFADQAEAFAFAIQAFALAAAKQAAAJgDAJQgCAIgFAJQAJACAOAAIAIAAQAJAAAIgEQAEgCACgFQACgDAAgIIgBgsIgDgvIgBgHIAOgOIAAAAQACAYABAfIAAA+QAAAHAFAFQAGAFALAAIAPAAQAWAAAKgCQAHgDAGgEQAFgDAAgDIgBgEIgQABQgdAAgHgQQgCgFAAgGQAAgIADgIQADgHAFgGQAKgKAJAAQAJAAAHAIQAHAIAFANQAHARAAATQAAAPgIAJQgGAHgOAEQgMAEgVgBgA3gilQgIAIgCAJQAEAPARAFQAHgBAIgHQAIgGAAgEQAAgGgEgHQgDgHgDgDQgEgEgEAAQgJABgHAHgA5TiNQAAAEAFACQAFACAJAAQAJAAANgFIgBgkQgoAVAAAMgA1Oi0QgFAEAAAFQAAAJANAEQALACATAAQgCgLgHgIQgIgKgIAAQgHABgGAEgA/ChlQgLABgHgGQgIgGgEgNIgBAAQgCAJgIAFQgRAKgNAAQgNABgGgIQgHgHAAgNIAAgLIAGgBQABAUAUAAQAGABAGgDIAMgFIAHgFQADgDAAgEQAAgGgEgPIgIgiIAFgIIAFgHIABAAQAHAcAHAnQACAKAHAHQAGAFAJAAIALAAQASABAUgIQATgGAXgOIAAAAQgcgKgTgBQgMAAgHAIIACAHIgEANIgCAAIgHgTQABgMAJgHQAJgIANAAQARAAAgANQALAEAOABIAMAAIABAAIgIAQQgQgBgKAGIgZAQQgeAVgigBgAfliPIAAgJIABgEIA0AAIgDANgAYNinQgEgEAAgFQAAgGAEgEQADgEAGAAQAGAAADAEQAEAEAAAGQAAAFgEAEQgDAEgGgBQgGABgDgEgASTi8IAMgPQAJAFAJAKQgFAJgHAGIgSgPgAFujCIAMgPQAIAGAKAKQgGAIgHAHIgRgQgAqtjTIAMgOQAHAGAJAKQgGAJgFAFIgRgQgAqRjVIAMgOQAIAGAJAKQgGAJgFAFIgSgQgAvOjcIAMgPQAJAGAJAKQgFAIgHAHIgSgQgA3yjkIAMgNQAIAGAJAJQgHAKgEAEIgSgQgA3VjmQAFgHAHgHIARAQQgHAKgFAEIgRgQgAi6jpIAMgPIARARQgGAIgFAFIgSgPgAm6jpIAMgPQAIAHAJAKIgLANIgSgPgEgiEgDpIAMgPQAIAHAIAKQgGAIgFAFIgRgPgAidjrIAMgOQAIAGAJAKQgGAIgGAFIgRgPgAmdjrIAMgOQAIAGAJAKIgMANIgRgPgEghogDrIAMgOIARAQIgLANQgJgJgJgGgA1QjsIAMgPQAJAHAIAJQgEAIgIAGIgRgPgAyLjvIAMgPQAJAGAJAKQgFAIgHAHIgSgQgAAMjwIAMgQQAJAHAJAKQgFAHgHAHIgSgPgA5OjyIAMgPQAHAGAKALIgMANQgJgIgIgHgA4xj0QAFgIAGgGQAIAGAJAKQgGAJgFAEIgRgPg");
	this.shape_1.setTransform(153.225,17.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65,-8.7,436.5,52.7);


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
	this.shape.graphics.f("#FFFFFF").s().p("AgEAKIABgBIACACIgBABIgCgCgAgYAKIACgBIACACIgCABIgCgCgAAHAKIAAAAIACAAIADgBIACgEIAAgBIgCgCIABgCIAAAAIACADIACABIABAAIADgBIABAAIgBgCIgBgBIABgCIABACIABACIgBADIgCAAIgDABIgCgBIAAABIAAACIgCADIgCABIgEgCgAgyAJIABgBIACABQACAAADgDIABgCIgCAAIgCgBQgBAAAAAAQAAgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQAAAAABgBIACgBIABAAIABACIABADIgBAEQgCAEgCAAQgBAAAAAAQgBAAAAgBQgBAAgBAAQAAgBgBAAgAgtAAIAAAAIAAABIACABIACAAIgBgCIgCAAIgBAAgAg7AJIAAAAIABAAIAEgBIACgDIABgBIgBgBIgCgDIABgCIACACIAAABIABACIAAABQAAACgDADQAAAAAAAAQgBABAAAAQAAAAgBAAQAAAAAAAAIgEgBgAA7ADIAAgCIgBgJIACgCIAAALIAAADIAAABIgBABIAAgDgAAyAGQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAgBAAAAIgCABIgCABIAAAAIgDgBIgCgCIgBgCIgBADQgCACgDAAIgBAAIgBgBIgCAAIAAgCIgBgDIAAgJIACgBIAAAGIAAAFIAAABIABABIABABIABAAIAEgBIABgBIAAgBIgFgEIgBgBIAAgBIABgCIAAAAIAKgEIABAAIgCACIgEABIgEACIACACIgBAAIAHAGIABABIACABIAAAAIACgBIABgBIABgCIABAAIAAACIAAABIACABIABAAIACgBIAAgCIAAgHIAAgCIAAgBIABgBIACAEIgBABIAAACIAAADIgBADIAAABIgBABIgCABgAgGAGIgCgBIgBAAIgBgCIAAgDIAAgJIABgBIAAAAIAAAGIAAAFIAAABIACABIABABIAAAAIADgBIABAAIgBgDIABgCIAAAAIABACIABACIgCADIgBAAIgDABgAgTAGQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAgBAAAAIgBABIgCABIgBAAIgCgBIgBgCIgCACIgDABIgCgBIgBgCIAAgCIABAAQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAIADgBIABgBIAAAAIAAgCIgBgEIABgBIABAGIABACIACABIABAAIABgBIABgBIABgCIABAAIAAACIAAABIACABIABAAIACgBIABgCIgBgHIAAgBIAAgBIABgBIABgBIABAEIgBABIAAACIAAADIAAADIgBABIgBABIgCABgAAugEIACgBIACACIgCABIgCgCgAArgDIACgCIABACIgBABIgCgBgAARgFIABgCIACACIgBABIgCgBgAAUgGIABgBIACACIgBABIgCgCgAghgJIABgBIACABIgBACIgCgCgAASgJIABgBIACABIgBACIgCgCg");
	this.shape.setTransform(-0.275,-0.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHATIAAAAIACAAIADgBIABgDIgBABIgCgBIAAgCIAAgBIACgBIABAAIAAABIABADIgBADQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAAAAAIgEgBgAgBAOIAAgBIgBgBIgBAAIgBABIABABIABAAIABAAIAAAAgAgLATIgCgBIgBgDIABgDIgBACIABACIACABIACgBIABgBIAAAAIgBgGIAAgCIABgBIAAgBIABADIAAABIAAAEIAAABIgBACIgBACIgBABIgBAAgAADASIgDgBIAFgCIAAgBIgBgBIgDgDIgBgBIAAgCIABgBIACADIAAAAIABADIABABIABACIAAgCIAAgEIAAgCIAAgBIABgBIAAACIABABIgBABIAAADIAAACIgBACIAAAAIgBACIgCAAgAAKAPIAAgBIgBgHIABgCIABAAIAAAIIAAACIAAABIgBABIAAgCgAgEgFIAAAAIABAAIACgBIABgCIAAgBIAAgBIAAgCIAAgCIAAACIABABIAAABIAAACIgBADIgBABIgDgBgAgQgFIgBgCIABgCIAAgCIABABIgBACIABACIACABIACgBIABgBIAAgCIAAgCIAAgBIABACIAAAAIABABIAAgBIABgBIAAgBIABAAIAAABIABABIABAAIAAAAIAAgCIABgBIAAACIAAACIgBABIgBAAIgBAAIgBgBIgCACIAAAAIAAABIgCABIgCABIgDgBgAAQgHIAAgDIAAgBIAAgGIABgCIAAAIIAAACIAAABIgBABgAAJgIIgBgCIgBACIgCABIgBgBIgBgCIAAgBIABAAQAAABAAAAQAAAAAAABQAAAAAAAAQABAAAAAAIABAAIABgBIAAAAIAAgBIAAgBIgBgCIABgBIABAEIABABIABABIABAAIABAAIABgCIAAgFIgBgBIABgCIAAAAIABAAIAAADIAAAAIAAACIAAACIgBADIAAABIgBAAIgCABIgBgBg");
	this.shape_1.setTransform(8.8,-0.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.3,-2.3,16.9,4);


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
	this.shape.setTransform(0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87.8,-13.8,175.7,27.6);


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
	this.shape.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1427.5,-78.3,2855,156.7);


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
	this.shape.graphics.f("#FFFFFF").s().p("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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-991.3,-424,1982.6,848.1);


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


(lib.jadfbvuoavava = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("ACCCNIAPgSQAKAIALAMQgIALgGAGIgWgTgACmCKIAPgRQAKAHALANIgOARIgWgUgAi8BYIAPgTQALAIALAMQgHAKgIAIIgWgTgABtBVQgQgSAAgiQAAgOAFgRQAFgQAHgOIAIAEQgMAaAAAUQAAALAEALQAEAKAHAIQAIAJAMAFQAMADANAAQAbAAAggQQAPgHACgFQgDgHgOgFQgQgFgVAAIgBgCIANgWIBFAAQATAAAOgFQgEgLAAgOQAAgSAMgQQAJgMAJgFQAAgIADgLIACAAQAKALAVAPIAiAYQAMAKAGAJQAFAJAAAMQAAAOgJAKQgKAKgSAAQgLAAgRgDQgRgEgSgGQgfANgUAAIgPAAIAAANQAAAFgDAIIgFAKQgSARgYAJQgYAJgVAAQghAAgSgUgAFjAIQAPAFAUAAQAIAAAFgDQAGgCAAgDQAAgIgLgKQgJgJgUgNQgCAXgMAUgAE9gnQgKAKAAAJQAAAEAFAGQAGAGAKAEIASgHQALgHAAgGQAAgMgHgJQgGgJgGAAQgKAAgLALgAnYBJIACgGQAKADALAAQATAAASgPQASgOAKgVQACgEAAgFQAAgDgDgGQgKgVgMgTIANgYIABABIAOAZIAGAPQADAJAAALIAAAUQAAAXgYAcQgQARgOABQgUAAgcgPgAgkAlQACgNAAgYIAAgSQAAgrgHhIQAJgLAKgJIABAAQAFA0AABQQAAATgBAKQgBAIgDAHQgEAGgIAJgAqfAlQgHAAgEgEQgFgFAAgIQAAgGAFgFQAEgFAIAAQAHAAAEAFQAFAFAAAGQAAAIgFAFQgEAEgHAAgAoOAfQgKgHgFgKQgFgLAAgNQAAgIAEgKQACgHAGgLQAIgMAKgLIACgTIADgBIAdAYQAUARADAMQADAJAAAMQAAAKgCAJQgDAKgFAFQgQARgWAAQgOAAgIgFgAoWgMQAAAJAJAHQAKAIAMgBQAPAAAOgKQAIgEAAgHQAAgIgKgMQgLgNgTgMQgcAXAAAUgAI+AiQgLAAgIgCQgHgDgGgFQgIgJgCgMQgBgIAAgXQAAgqgFhFIARgSIABABQACAbABAmIAABGIAAAKQAAAOAOAFQAGACAGAAIAHAAQAWAAAJggQADgLALgMQAMgKALAAQARAAAKATQAKASADAZQgGAZgOAAQgaAAgdgXIgCAAQgHAZgZAAgAJ1gdQgGAFgEAIQAHAMATAGQANAGAJAAQAFAAABgCQgEgTgIgLQgIgKgJAAQgIAAgHAFgAiEAiQgOAAgKgFQgKgEgEgKIgBAAQgFAJgKAFQgKAFgMAAIgHAAQgOAAgJgHQgKgHgFgQIgBAAQgCAKgMAIQgUAMgRAAQgPAAgJgJQgIgJAAgQIAAgNIAIgBQABAYAZAAQAHAAAIgDQAIgCAHgEQAFgCAEgEQADgEAAgDQAAgIgEgTIgLgrIAGgJIAHgJIABAAQAJAjAJAwQACANAIAHQAIAHALAAIAHAAQAMAAAJgEQAJgEACgIIAGgUIANgJIABABQgEAPAAAHQAAALAGADQAJAIAOAAIAHAAQAMAAAJgFQAKgFAAgOQAAgngFg5IgCgNIAAgLQAAgGAFgGIALgKIABABQgBAQAQAaIgMAKIACAgIABAgQAAAggIAOQgDAIgEAEQgEAHgGACQgLAGgMAAgAqqgwQgFgFAAgHQAAgIAFgEQAEgFAHABIABAAQAHgBAEAFQAFAEAAAIQAAAHgFAFQgFAEgHAAQgHAAgEgEgAogiDIAOgRQALAIALAMQgIAKgHAHIgVgUgAn8iGIAOgRQAKAIALAMQgHALgHAGQgLgLgKgJgAkoiMIAPgTQALAIAMAMQgHAKgJAJIgWgUg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.7,-16,137.5,32);


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
p.nominalBounds = new cjs.Rectangle(-275.6,-212,542.4000000000001,392.3);


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
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAxAyQhxgNhQhWQCiAqB/ABQgKA4hJAAIgNAAg");
	this.shape_6.setTransform(217.3126,241.6826,1,0.7861,0,-165.0012,14.9983);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Agpg4QAPgIASAAQBDABAtAuQh9gPhSBhQAPhiAvgXg");
	this.shape_7.setTransform(164.975,242.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_9
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("Ah9CHIgNAAIAAgBIAMgHQgOiSBDhDQAxgnA7ANQA8AMAdA4QAPAjAAAxQgBAygaAWQgMALhUALIh5AFgAhHgzQg8A5AYB2IBAAEQA1gBBbgWQAlhzhNgtQgjgagfAAQgjAAgfAegAAnh3IgjgFQgjADglAKQAegVAigGIARABQAeABAbAPQAOAJAJAOQgagOgcgHg");
	this.shape_8.setTransform(212.7,265.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E19562").s().p("AhtCxQg2g3AAgmQAAgHADgZIAEgoIgGh1QAAgpAKgTQAPgdAygfQAXgPA1AHQAxAGASASQAaAMAOASIAUAgQAQAZAJAkIAMA+IALB5QAABIg5AmQgsAeg1AAQg8AAg7g8gAhah6QhDBDAOCSIgLAHIAAABIAMAAIAVAEIB5gFQBTgLANgLQAagWABgyQAAgxgQgjQgdg4g8gMQgOgEgNAAQgrAAgmAegABNiGQgJgPgPgIQgagPgdgBIgSgBQgiAGgeAVQAlgKAkgDIAiAFQAcAHAaAOIAAAAg");
	this.shape_9.setTransform(214.35,268.8494);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8}]}).wait(1));

	// Layer_8
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgQBTQgRgDgHgbQgIgbAHgiQAIgiARgWQAQgWARADQASAEAHAbQAHAbgHAhQgHAjgSAWQgPATgOAAIgEgBgAgGg8QgIAHgCANQgDAMAEALQAFAKAIABQAHACAIgHQAIgIACgNQADgNgEgKQgEgKgIgCIgDAAQgHAAgGAHg");
	this.shape_10.setTransform(213.7435,267.9505);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgFAfQgIgCgFgJQgEgLADgMQACgNAIgHQAIgIAIABQAIACAEALQAEAKgDAMQgCAMgIAIQgGAGgFAAIgEAAg");
	this.shape_11.setTransform(204.325,266.0848);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10}]}).wait(1));

	// Layer_7
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgEAfQgIgCgEgKQgEgJACgMQACgNAHgIQAHgIAHABQAIABAEALQACAFABAHQgGANgEAQIAAABQgGAHgGAAIgCAAg");
	this.shape_12.setTransform(163.9042,265.3693);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgNBUQgQgDgIgaQgHgbAFghIACgIQADgQAGgOQAFgLAGgIQAQgXAPADQAQACAIAaQAHAagFAiQgGAjgQAWQgOAVgOAAIgDAAgAgHg7QgHAIgCANQgCAMAEAKQAEAKAIABQAHABAHgIQAHgIACgNQACgNgEgJQgEgKgIgCIgDAAQgFAAgGAIg");
	this.shape_13.setTransform(168.775,269.0498);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(1));

	// Layer_6
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AA9BcIgMABQgBAAAAAAQgBAAAAAAQAAAAAAAAQABAAAAAAIg3gCQg4gEgJgRQgKgSgCgbQgCgdAKgaQAHgSALgQIAKgKQAoghAoAbQAGACAIALIALANIAGAOQARAiACAqIACAMIABACIgDApIgTACgAAfhLIAAAAIAAAAg");
	this.shape_14.setTransform(168.501,269.2425);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1));

	// Layer_5
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AhqBlQgYh1A8g6QA9g6BHA1QBNAtglB0QhbAVg1ACg");
	this.shape_15.setTransform(212.5974,267.5165);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1));

	// Layer_4
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgZAkIgOAFQgVAKgPAOIABgCQAQgdAhgSIAfAJQAHgQgOhWQAbA3gGA6QAeAOAaAbQgygbgzgOg");
	this.shape_16.setTransform(184.125,277.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(1));

	// Layer_3
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgRgFQASgHAQARIgEACIgGABQgJAAgPgNg");
	this.shape_17.setTransform(186.1,286.2203);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(1));

	// Layer_2
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#DC8145").s().p("AAoAsIgXgPQgUgQgPgBIAEgEIgRgDIgBADIgGgDIABAAIgEgBIAAgDIAHgBQAOgIAGgkIADAcIgEASQAVAEAYAaIALAMIABABg");
	this.shape_18.setTransform(186.3,279.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(1));

	// Layer_1
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000099").s().p("AAAAAIAAAAIAAAAg");
	this.shape_19.setTransform(235.925,274.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#47350E").s().p("AAAAAIAAgBIABADg");
	this.shape_20.setTransform(234.625,244.375);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E1997B").s().p("AAAABIAAgBIAAABg");
	this.shape_21.setTransform(209.15,231.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#DB8460").s().p("Ak3BBIACABIAAAAIALAOgAEQARIAAAAIgBABgAE1hPIADAFIgBAAg");
	this.shape_22.setTransform(221.55,277.625);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#DC8145").s().p("AoFAtIgCgWIACgVQADgTAIAAIABAAIACACQAKAMAOAcQgZAIAAAeIAAAEQgJgCgEgUgAHZAaQAhgqglgmQAQgQAaAFIACAAIAHAUIAAAMQgBAMgJANQgWAcgPAGg");
	this.shape_23.setTransform(201.475,276.7155);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E6A377").s().p("AgWFAQgUgLgTgUQgSgUgGgxQgGgyAPgVQAPgWAZAVIAOANIgCArIgEgFQgOgTgRgCIAEAEIgCAAQgHAAgEAUIgCAVIADAWQAEAUAJACIACAQIABgHQAGggASgCQgBADABAOQACAfADAQIADAPgABXlAIAAABIgCACg");
	this.shape_24.setTransform(156.5143,256.725);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E19562").s().p("AiGG3QhFgHgfggIgWgYIANAYIACAEIgcgGQgUgDgygVQgzgWgqgjQgzgzgIgZQgIgZgBgJIgGgxQgFgoAHhFIABgFIgCg2QgBgXAAgrIgBhhIAAgDIABgEIADhLQACg1AKgjQAIggAcgpIAEgFIAAAGIACAOIAHAXIAegoIACgCIAVAuIAdgrIAQAsIAdgrIAZAqIAdg0IASApIAAAAIACAGIAkg7IAeA7IAlg5IAjA4IAYg2IAfA3IAdgyIAgAxIABADIAUg2IAZAyIAWgwIAPAsIAdgsIAdAqIAegwIAYAtIANgSIACAJIABAAQAFAbAMAiIAAABIACAEQALAfALAXIAAAAIAMAZIAAAAIABACIABABIAAABIAEAZIgBAAIACADIAFApQAGBCAFBnIgEBVIAAAAIAAAAQAxhdA7gPIBEgDQASAHAGASQARAtgGAwQgHAggXAeQglAygzgBQgtgBgLgHIAUATQggA4g6ArQg7AshDAdQguAVgxAIIgWACIAIgUIgGAGQg2AuhIACIgcAAgAkdEOIABgBIgBAAgAiRC8IgMgOIAAAAIgBgBIgBAAgAGaA6QAUATgCAaQgCATgGAGIADgCIABgBQAPgGAWgdQAJgNACgMIAAgMIgIgUIgDgFQgIgRggARQgjASgUA4QAhgsALAAIAAAAgAAclkIABAAIAAgCgAkhl2IAAABIABgCg");
	this.shape_25.setTransform(206.3146,266.825);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#36150E").s().p("AFfF0IAAgKIgQjRIAAAAIAZACIgFgFIgZgeIgBgCIgCgDIgNgbIAAAAIghhZQgJgeAAgdIAAgJIAEgYIAAAAIgBAAQgcAcgHAWIgbgyIgbA0IgbgxIgbAuIgWgvIgVAwIgagyIAAAAIgDAGQgLAagGATIgBAAIghguIgZAvIgig1QgRAigHATIggg4IAAAAIgBAAIggA5Igdg5IgBAAIgCAAIgjAzIgCgEIAAAAIAAAAIgVgpIgcA0IgTgqIghAwIgMg7IggA5IgRgzIgGAGQgMAMgKAPIAAAAIgGAKIABgTIAHgjIAAAAIgmApIgCACQgfAlgMArQgGAUgDAZIgFA3IAACwIgahyQgThdAKhkQALhmBlhvIARgPQAjgeAngYQBgg0BogVQBSgPBMACQBIAEBGATQA8ARA8AcQAyAXAuAhQAGgXgGgKQAUAagNAQQAjgiASAZQgSgKgbAWQBTBFAaBiQAoCYgyDlQgZgDg5ANQgkAOggAiIgEAFIAAgCg");
	this.shape_26.setTransform(203.2301,229.2076);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhnJkQgvgGgtgbIgpgJIgBAAQghgHglgQIgzgaQgygegfgmIggg0IgdgRQgugcgNg8QgMg8ATgoQASgoAxAcQABgGgDgSIgnirQgfh9AOhoQAMhlBnhrIAZgZIgFAHIAPgRQAlgbAlgVQBhgxBogTQBVgRBWAFQBAAEBBANIAwAPQBmAnA1AmQACgIgJgjQAqAlACAUQANgGALACQAkAFgHAlQgYgOgRAHQAiAdAWAfQBHBlgFCpQgFCggXA7IgCAGIADADQAUAUAJAdQALApgGAsQgJArgeAnQglAwhJABQgyBIhOA0QhTA4hGASQhGASgLgEIgRAKQgtAZhIAAIgVgBgAjFIqQAfAgBGAHIACABIAbgBQBIgBA2gvIAHgFIgIAUIAWgDQAxgIAugUQBCgdA8gsQA5grAgg5IgTgTQAKAIAuABQAyAAAmgxQAXgeAHggQAFgxgQguQgGgSgTgHIhEAEQg6AOgxBeIgBAAIAEhWQgEhmgHhBIgFgpIAAgEIgEgYIgBgCIgBgBIgBgCIABABIgNgaIAAABQgKgXgLgfIgCgFIAAgBQgMghgGgbIAAgBIgCgJIgNASIgYgtIgeAxIgdgrIgdAtIgQgsIgWAvIgZgyIgUA2IgBgCIgggyIgdAzIgfg3IgXA2Igjg4IglA4Igeg7IgkA7IgDgFIAAgBIgSgpIgdA0IgZgpIgcArIgQgsIgeArIgUguIgBgCIgCAEIgeAnIgHgXIgCgOIAAgGIgDAFQgcAqgIAfQgKAjgDA1IgDBLIgBAEIABADIABBgQgBAsABAWIACA4IAAAEQgHBGAFAnIAGAxQABAJAIAaQAIAZAyAyQAqAkAzAVQAzAVAUAEIAbAFIgBgEIgOgXgAnfF3IgDgQQgEgQgCgfQgBgOACgCQgTABgFAgIgBAHIgDgQIAAgEQAAgeAZgHQgOgegKgMIgCgCIgEgDQARACAPASIAEAFIACgrIgOgNQgZgUgPAVQgPAWAGAxQAFAyATAUQASATAUAMIAEABgAFmCYIAEgEQAfgiAlgOQA5gOAYAEQAyjkgoiZQgahihThFQAcgWARAKQgRgZgjAiQAMgRgUgaQAGAKgGAYQgtgigzgXQg8gcg7gQQhGgThJgEQhLgDhSAQQhpAVhgA0QgmAXgkAeIgQAQQhmBugKBmQgLBmAUBcIAZByIABivIAEg4QAEgZAFgTQAMgtAggkIABgCIAmgqIAAABIgGAiIgBATIAFgJIABAAQAJgPAMgNIAGgGIARAzIAhg4IALA6IAhgwIAUArIAcg1IAUApIABAAIAAABIABADIAkgyIACgBIABABIAcA5IAhg5IAAgBIABABIAfA4QAHgTASgiIAiA1IAZgvIAhAtIAAAAQAGgTAMgZIACgGIABAAIAZAxIAWgvIAVAuIAbgtIAbAwIAbgzIAcAyQAGgWAdgcIABgBIAAABIgEAYIAAAJQAAAdAJAeIAgBZIABAAIANAbIACADIABACIAZAfIAFAFIgZgDIgBAAIAQDRIAAAJIAAAAIABACgAHREBQADgagUgSQgLgBghAsQATg3AjgTQAggRAJASIABAFQgagFgQAQQAlAlghArIgBABIgEADQAGgGACgUgAj7jbIABgCIgBACg");
	this.shape_27.setTransform(202.5943,251.3514);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]}).wait(1));

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


(lib.dfbdfbbjjm = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AiQBlQAGgIAHgHQAIAHAKAKQgHAKgFAFIgTgRgAhxBjQAGgJAGgGIATARQgHAKgFAEIgTgQgAAqBYIAOgRQAKAHAJAKQgGAJgHAHIgUgQgAjjBRQgMgNAAgYQAAgTAIgSIAFACQgEAOAAAMQAAARAMALQALALAPAAQARAAAQgJQAIgGAEgFQAEgFABgEQAAgGgEgKQgDgHgGgIQgEgFgHgHIAGgVIABAAIAMAKQAEAEAJAAQAGAAAGgEQADgCADgHIAGgNIACAAIAFAaQAFAVAIAHIAGACIAHABIAGAAQAKAAAHgDQAJgEACgHIAEgQIALgIIABABQgDAMAAAGQAAAJAFAEQAIAHAMgBIALAAQAVAAAUgGQAVgHAZgOIAAgBQgegLgVAAQgNAAgHAIIABAHIgEAOIgCAAIgHgUQAAgNAKgIQAJgIAPAAQATAAAiAOQAOAFANAAIAPAAIgKAQQgSAAgJAGIgbARQgRAMgRAEQgSAGgTAAIgJAAQgNAAgIgEQgJgEgEgIIgBAAQgEAHgIAFQgJAEgLAAIgFAAQgOAAgIgIQgHgIgFgUIgEgQIgBAAQgIAQgPAAQAFANAAARQAAAPgEAMQgGAJgMAIQgRAKgTAAQgWAAgNgOgADfAyQACgLAAgWIAAgPQAAglgGg+QAIgKAIgHIACABQADAqAABGIgBAaQAAAGgDAHQgDAFgHAIgACLAvQgjAAAAgaIABgJIAGgEIAAAAQABASAcAAIAIAAQAJAAAJgDQAIgGAAgMQgBgjgEgvIgBgLIgBgKQABgFAEgGIAJgIIACAAQgBAQANAVIgKAIIABAdIABAcQAAAagGAMQgDAIgDAEQgDAFgGACQgJAFgKAAgAg4g1IANgQQAJAGALALQgGAJgJAGIgSgQgAjNg3IANgRQAJAIAKAKQgFAKgIAFIgTgQg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24,-11.8,48.1,23.6);


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
	this.shape.graphics.bf(img._6dpi20, null, new cjs.Matrix2D(1,0,0,1,-20,797.5)).s().p("EhOHA+5MAAAh9xMCcPAAAMAAAB9xg");
	this.shape.setTransform(500,402.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,1000,805), null);


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
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-105.3,-16.5,210.7,33.1);


(lib.adfbdfvdfdb = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AjKBnQgTgRAAgdQAAgNADgNQACgMAFgKIAHACQgGARAAALQAAAaAPAPQAOAQAYAAQANAAAMgDQAOgFAOgJQAVgOAAgGQAAgEgBgDIgKAAQgZAAgNgIQgOgJAAgRQAAgPAJgLQAFgHAGgEQAHgFAIAAQAMAAAKAPQALAPADAZIASAAQAKAAAJgFQAFgCABgFQADgFAAgIIgCgwIgDg1IAAgJIAOgPIABABQADAaABAjIAABFQAAAHAFAGQAHAGAMAAIAFAAQAJAAASgEQgEgGgBgHIgBgMQAAgKADgKQAEgKAIgJQAGgHAIgEQAGgEAFAAQAFAAAFAFQAFAFAFAIQAGAMAAAMQAAAKgDAKQgDAJgFAJQAKADAQAAIAJAAQAKAAAJgFQAJgFAAgNQgBgkgEgxIgCgVQAAgGAFgFIAJgKIACABQgBAPAOAXIgLAJIACAeIABAcQAAAbgHAOQgDAHgDAEQgEAGgFADQgKAEgLAAIgIAAQgMAAgNgCQgNgCgQgGQgfAKgRAAIgHAAQgYAAgHgRIgBAAQgEAIgIAEQgJAFgLAAIgQAAQAAAKgCALQgBAEgEAGIgHAJQgOAMgRAHQgUAJgUAAQgaAAgSgRgAhXAfQgCgPgJgJQgEgFgFgCQgFgCgEAAQgHAAgGAEQgGAFAAAFQAAAGAFAEQAFAEAIADIAPACIAPAAIAAAAgAA1gSQgIAIgDAKQAFAQASAGQAJgCAJgHQAJgGAAgFQAAgHgEgHQgIgQgJAAQgJAAgJAKgADMA3QACgLAAgWIAAgQQAAglgGhDQAIgKAIgHIACAAQAEAtAABIIgBAcQAAAGgEAHIgLAOgAiZg+IANgQQAJAHALALIgNAPIgUgRgAh4hAIANgQQAJAHAKALIgNAPIgTgRgAA0hcIANgRQAKAHALALQgHAJgHAHIgUgRg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.2,-11.9,44.5,23.9);


(lib.adfbdfbfd = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AiSBQIALgNQAIAGAIAHQgFAJgGAFIgQgOgAlYBFIABgDQAIACAHAAQANAAAOgLQAMgJAGgQIACgGIgBgDIgBgDQgHgQgJgMIAKgQIAAAAIAKASIAFAJQABAHAAAHIAAAOQAAARgQAUQgLALgKAAQgOAAgUgKgABHAmQgIgHgFgIQgGgJAAgMQABgQAHgPIAGADQgFALAAAJQABAHAFAIQAEAIAIAFQAIAEAKACQAKABAOABQAUgBAYgFQAJgCAIgEQAJgDAAgDIAAgCIgPAAQgYAAgHgNQgCgFAAgFQAAgHADgHQACgHAEgFQAKgIAHAAQAQAAAJAaQAGAPAAAPIgBALQgCAFgDADQgGAEgHADIgOAFQgeAHgVABQgcgBgRgJgAC8gEQgCgLgFgHQgHgIgIAAQgFAAgFAEQgFADAAAEQAAAOAlABIAAAAgAgnAsQACgIAAgRIAAgOQAAgdgFgzQAGgHAHgGIABAAQAEAjAAA4IgBAVQgBAGgDAEIgIAMgADQArIAAgBQAdgLAUgMQgCgKgJgPQgJgPgRgYIgJgMQgFgFAAgEQAAgDAEgIIAAAAIALAJIAOAJIgFAIQAMAQAJAPQALASAAAJIgBAIIABAAQAFgFAEgGQADgEABgKIABgZIgBgXIgBgWIALgLIABAAIABBNIABAPQABAIACAFQACAEAEAEQAEAEAGgBIAJAAQAJAAAKgCIAAgBQgQgKABgPQgBgHAHgKQAEgHAHgFQAHgFAIAAQAGAAAFADIAFADQAIAFAFALIgCACQgGgFgFgCIgFgBIgIgBQgJAAgIAEQgGAEgBADQAAAKAMAIIAIAFQAEACADAAIAFAAIAMgCIAUgHIACAAIgHARIgZAHIgCABIgUAFIgQAFQgIACgIAAIgGAAQgLAAgHgJQgJgKAAgRIgBAAQgDANgJAJQgGAHgLAFIgMADQgGACgIAAgAl6AqIgEgCQgGgEgEgIQgEgHAAgKQAAgGADgGIAFgMQAFgIAFgFIAEgEIABgMIABgBIAVAQQAOANACAIQACAGAAAHQAAAHgCAHQgCAHgCAEQgLAMgQAAQgHAAgFgCgAl6gKQgJAKgBAJQABAHAGAGIADABQAGADAHAAQAKAAAJgGQAGgEABgFQgBgGgGgIQgJgJgMgIQgGAFgFAFgAhqAqQgKAAgGgCQgIgEgDgHQgDAHgIADQgGADgJAAIgFAAQgKAAgGgEQgHgFgEgMIgBAAQgBAIgIAEQgOAJgMAAQgKAAgHgGQgFgGAAgMIAAgKIAFAAQABARARAAQAFAAAGgCQAFgBAGgDIAFgFQADgCAAgCQAAgHgDgMIgIgdIAFgHIAEgGIABAAQAGAYAHAhQACAJAFAGQAGAEAHAAIAFAAQAIAAAGgCQAHgDABgGIAFgOIAJgFIAAABIgDAOQABAHAEAEQAGAEAKAAIAFAAQAIABAHgEQAGgEABgKQgBgagEgoIAAgJIgBgIQAAgFAFgEIAGgHIABABQAAALALATIgIAGIABAXIABAWQgBAWgFAKQgCAGgCADQgDAEgFADQgIADgIAAgAFIhBIAKgNQAJAGAHAIQgEAHgHAGIgPgOgAmKhJQAEgHAGgFIAGAGIAIAIIgIALIgBABIgPgOgAlyhLIALgMIAPAOQgGAIgEAEIgQgOgACUhLIAKgNQAIAFAJAIQgFAIgGAFIgQgNgAjchPIAKgOQAIAHAIAIQgFAHgGAFIgPgNg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.6,-9.3,79.30000000000001,18.700000000000003);


(lib.adbadfvbfdvsfvfsvdscdscsad = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AhXBcQAFgIAGgGQAIAGAKAKQgHAKgFAEIgRgQgAg6BaIALgOQAJAGAJAKQgHAJgFAFIgRgQgAgVBZIADgFQAKAGALAAQAWAAAUgWIAJgJQAEgGABgGIgHAAQgXAAgMgHQgLgIAAgPQAAgOAHgKQAFgGAFgEQAHgEAGAAQALAAAJANQAKAOADAWIASAAQALAAAHgDQAJgDAFgIIAIgMIALgDIABABIgHAMQgDAGAAADQAAADADADQABABAEAAQAHAAAGgFIAGgFQADgEABgEIAEgIIALgFIABABIgFAMQgCAFAAAEQAAAEADADQACACAEAAQAFAAAFgDQAGgEADgLIADgLIAMgHIAAAAQgDAMAAAIQAAAIAGAFQAHADALAAIAHAAQAJAAAIgEQAIgFAAgLQgBghgEgtIgBgJIgBgJQAAgFAFgFQADgEAGgFIABABQgBAOANAVIgKAHIABAbIABAZQAAAZgGANIgFAKQgEAFgFACQgIAEgKAAIgGAAQgOAAgHgDQgIgEgDgHIgBAAQgLAOgOAAQgOAAgCgMIgBAAQgMAMgOAAQgNAAgCgMIAAAAQgLAMgVAAIgQAAQAAAIgDAIQgDAIgFAHQgHAMgNAIQgJAGgHAAQgTAAgYgPgAAUACQgFAEAAAFQAAAKAQAFIANACIAPAAQgDgOgIgIQgIgHgIAAQgGAAgGADgAE3AyQABgKAAgUIAAgPQAAgigFg7QAHgIAIgHIABAAQAEAoAABBIgBAZQAAAGgEAGQgCAEgHAIgAjrAyQACgKAAgUIAAgPQAAgigGg7QAHgIAIgHIACAAQAEApAABAQAAAQgCAJQAAAGgDAGIgJAMgAlFAvIAIgLQAFgEADgBIAAgBQgRgGAAgMQAAgGAEgGQACgEAEgEIANgJQAHgCAGAAQAGAAAFADQAEADAAAFQAAAIgHAFIgBAAIgEgHQgDgDgFAAIgHABIgGADQgEABAAADQAAAGAFADIAJAFQAFABAGAAQALAAAOgCIABABIgHAPQghAEgWANgAhaAvQgLAAgIgFQgIgGgEgNIgBAAQgBAJgJAFQgRAKgOAAQgMAAgHgHQgHgHAAgOIABgKIAFgBQABAUAVAAQAGAAAGgCIAMgFQAFgDACgDQADgDAAgDQAAgHgEgOIgJghIAFgIIAGgJIABABQAHAdAHAlQACALAHAHQAHAFAIAAIAFAAQAWAAAIgDQAIgCAAgFQAAgEgEgLIgLgUQAGgLAGgHIAAAAQAHALAEALQAFANAAAKQAAAIgEAIQgCAGgFAHQgFAEgJACQgJACgSAAg");
	this.shape.setTransform(152.575,-15.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ai3D7IAMgPIARAQQgGAKgFAEQgKgJgIgGgAiaD5IAMgOQAJAGAJAKQgHAJgFAFIgSgQgAQMD1IAMgOQAIAFAJALQgGAKgFAEIgSgQgAQpDzIAMgOQAHAEAHAIIAAAIIgIAKIgSgQgAgHDvIAMgQQAJAHAJAJQgFAJgIAGQgFgGgMgJgAj2DyQgIgDgGgHQgNgMAAgWQAAgSAJgRIAFACQgFANAAALQAAAQAMALIAGAFQAIAEAKAAQAQAAAQgIQAHgFAEgFQAEgEgBgFQAAgFgCgJQgDgHgFgHIgLgMIAFgUIACAAIALAKQAEADAHAAQAHAAAEgEQADgCADgGIAHgMIACAAIAEAXQAEAVAJAGIAFADIAGABIAGAAQAJAAAHgDQAIgEACgGIAEgQIAKgIIABABQgDANAAAFQAAAIAGAFQAGAFAMAAIAMAAQASAAATgGQATgHAXgOIAAgBQgdgKgRAAQgNAAgGAHIACAIIgGANIAAAAIgIgUQABgMAJgIQAJgHAOAAQAQAAAgANQANAGANAAIAOAAIgKAPQgRAAgIAGIgZAQQgRALgPAFQgQAEgRAAIgLAAQgMAAgHgDQgJgEgDgIIgBAAQgDAHgJAFQgIADgJAAIgGAAQgNAAgHgHQgHgIgEgSIgFgQIAAAAQgIAQgNAAQAEALAAARQAAANgEAMQgGAIgKAIQgRAKgSAAQgKAAgIgEgAJnDkQgNgOAAgZQAAgTAIgSIAGABQgFAOAAANQAAAVANALQAMAMATAAQAIAAALgDQAMgEAKgFIANgJQAGgFAAgCQAAgDgIgDQgFgCgLgBQgWgDgGgHQgFgGAAgIQAAgUARgSQAJgIAKgHQALgGAHAAQAIAAADAIQAEAHAAAHQAAAEgGANIgDAAIgEgOQgDgFgEAAQgFAAgGADQgHADgGAFQgGAFgFAFQgDAFAAAEQgBAIAVAEIARAEQAJABADAEIAFAGQACAEAAAGQAAAHgEAIQgDAIgGAFQgLALgPAHQgRAHgPAAQgZAAgOgQgACiDLQACgKAAgUIAAgPQAAghgGg9QAHgJAIgGIABAAQAEApAABBQAAAQgCAJQAAAGgCAGIgKAMgAk5DLQgFAAgEgDQgDgEgBgHQABgFADgEQAEgEAGAAQAFAAAEAEQADAEAAAFQAAAHgDAEQgEADgFAAgAQJDIQgMAAgHgDQgIgEgEgIIAAAAQgEAHgJAFQgHADgLAAIgHAAQgNAAgNgEQgNgFgLgIIgBAAQgNAKgNAEQgMADgPAAIgIAAQgKAAgIgFQgHgGgFgNIAAAAQgDAJgIAFQgRAKgOAAQgNAAgGgHQgHgHAAgOIAAgKIAGgBQABAUAUAAQAHAAAHgCIALgFQAEgDADgDQADgDAAgDQAAgHgEgPIgIghIAEgIIAGgJIABABQAHAbAHAoQADALAGAHQAHAFAIAAIAJAAIATgBQAKgBALgFIAAgBQgFgCgFgHIgMgLQgGgGgEAAIgFAAIAGgRIAFgBQAVgFATAAQAaAAARAHIgEARIgbAYIAAABQAPAIATAAIAKAAQAKAAAGgDQAIgEACgGIAFgQIAKgIIAAABQgDANAAAFQAAAIAEAFQAJAFALAAIAFAAQAWAAAHgDQAJgCAAgFQAAgEgEgLIgKgVQAEgKAHgIIABAAQAFALAEALQAFAOABAKQgBAIgDAIIgHANQgGAEgIACQgKACgQAAgAN5CPIAAAAIAIAIQAIAIALAIIABAAQAQgMAMgLIAAgBQgRgDgMAAQgNAAgOADgAGoDIQgZAAgHgPIgBAAQgDAHgJAFQgIADgJAAIgHAAQgMAAgGgEQgJgEgDgMQgQAGgPAAQgNAAgGgEQgJgFAAgJQABgGAFgLQAKgUAmgWIgBgKIALgNIADAAIABBGIABANQABAGADACQAFAEALAAIAHAAQAJAAAIgDQAHgEACgGIAEgQIALgIIAAABQgDANAAAFQAAAIAGAFQAGAFAMAAIAGAAQARAAAIgaQADgJAIgKQAKgJAJAAQANAAAKAQQAHAPACAWQgEATgMAAQgVAAgYgSIgBAAQgGATgUAAgAHWCVQgFAEgDAHQAGAJAOAHQALAEAHAAQAEAAABgCQgDgQgGgJQgHgIgHAAQgHAAgFAEgAEYCfQAAAEAFADQAGABAJAAQAJAAANgEIgBglQgpAVAAAMgABTDIQghAAAAgYIAAgJIAGgEIABAAQAAASAaAAIAIAAQAIAAAIgEQAIgFAAgLQAAgigDgtIgCgJIAAgJQgBgFAFgFQADgEAFgFIABABQAAAOANAVIgJAHIABAbIAAAZQAAAagGANIgGAKQgDAFgEACQgKAEgKAAgAPKBsIANgOQAHAGAKAKQgGAJgGAFIgSgQgAPoBrIAMgPIARAQIg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IABAAQAFAoAABCIgBAZQgBAGgDAGQgCAEgIAIgARAhtQgDgEgBgGQABgGADgEQADgEAGAAQAGAAAEAEQADAEABAGQgBAGgDAEQgDADgHAAQgGAAgDgDgArLhyQgIgIAAgQIAAgMIAHAAQAAAMAFAFQAGAHAOAAQAHAAAJgDQAHgCAJgFQABgBAAAAQABAAAAgBQABAAAAgBQAAAAAAgBQAAgGgEgIQgEgHgGgIIgPgMIgQgKQgFgDAAgDQAAgFAIgMIABAAQAKAGAIAIQALAIAHAJQAPATAAARQAAAOgGAMQgYAPgTAAQgNAAgHgIgA4QhvQgHgFgEgJQgFgIAAgMQABgGACgJIAGgOQAHgKAJgJIABgPIACgBIAYATQAQAPADAKQACAHAAAJQAAAHgCAJQgDAIgDAEQgNAPgSAAQgLAAgHgFgA4WiTQAAAIAIAGQAHAGAKAAQAMAAAMgIQAGgFAAgFQAAgGgIgKQgJgLgPgJQgXATAAAPgABuhtIAGgLQAGgEADgBIAAgBQgQgGAAgMQAAgGADgGQADgFAEgEQAFgFAHgEQAIgCAGAAQAGAAAEADQAFADgBAFQABAIgIAGIgBAAQgBgFgDgDQgDgDgFAAIgHABQgEABgBACQgFACAAADQAAAGAGADIAJAFIAKABQAMAAAOgCIAAABIgHAPQggAEgXANgAf+hzQgLgIAAgPQAAgLAFgJQAFgHAJgJQgNAAgIgHQgHgGAAgJQAAgHACgHQADgHAFgGQAEgFAOgJQANgIALgFIADACIgJAUIgYAOQgLAGAAADQAAAFALAFQAMAGASAAIAMgBIgEAJIgDAHQgPAIgKAIQgMAIAAAGQAAAGAIAFQAJAFANAAQASAAAOgGIABABIgHALIgIAJQAAACgJABIgQABQgOAAgJgGgAHHhtQgMAAgOgEQgNgFgLgIIgBAAQgNAKgOAEQgLADgOAAIgIAAQgLAAgHgFQgJgGgEgNIgBAAQgBAJgKAFQgPAKgOAAQgOAAgGgHQgHgHAAgOIABgKIAFgBQACAUAUAAQAGAAAGgCIAMgFQAEgDADgDQAEgDAAgDQAAgHgFgPIgJghIAGgIIAFgJIABABIAPBDQABALAHAHQAGAFAKAAIAIAAIATgBQAKgBALgFIAAgBQgEgCgHgHIgKgLQgHgGgDAAIgGAAIAGgRIAEgBQAXgFASAAQAaAAASAHIgGARIgaAYIAAABQAPAIAUAAIAJAAQAJAAAIgEQAIgFAAgLQAAgigFgtIgBgSQAAgFAFgFQACgEAGgFIABABQgBAOANAVIgJAHIABAbIAAAZQABAagHANIgFAKQgEAFgEACQgKAEgJAAgAF8imIAAAAIAJAIQAHAIALAIIABAAQARgMALgLIAAgBQgQgDgMAAQgOAAgOADgAzRhtQgLAAgIgDQgIgEgEgIIAAAAQgEAHgIAFQgIADgKAAIgGAAQgLAAgHgFQgJgGgDgNIgBAAQgCAJgKAFQgQAKgNAAQgNAAgHgHQgHgHAAgOIAAgKIAHgBQAAAUAVAAQAFAAAHgCIAMgFQAFgDADgDQACgDAAgDQAAgHgEgPIgJghIAGgIIAGgJIAAABQAIAdAGAmQACALAHAHQAGAFAJAAIAHAAQAIAAAHgDQAIgEADgGIADgQIALgIIAAABQgCANAAAFQAAAIAEAFQAIAFALAAIAGAAQAKAAAHgEQAIgFAAgLQAAgigEgtIgBgJIgBgJQAAgFAFgFIAIgJIABABQAAAOAMAVIgJAHIABAbIAAAZQABAagGANIgGAKQgDAFgFACQgJAEgKAAgAeViYIADgNIA0AAIgDANgARAiwQgDgDgBgHQABgGADgDQADgEAGAAQAGAAADAEQAFADAAAGQAAAHgFADQgDAEgGAAQgGAAgDgEgAk+jFIAMgQQAKAHAIAJQgFAJgHAGIgSgPgAjPjWIgJgIIAMgPQAJAGAJAKQgFAJgHAGIgJgIgAt2jeIALgPQAKAHAIAJQgEAJgIAGIgRgQgAGCjiIANgPQAJAGAJAKQgFAIgIAHIgSgQgAoJjlIAMgPQAJAGAJAKQgFAJgIAFIgRgPgA8tjwIAMgPIABAAIABAAQAIAHAJAJQgGAIgHAGIgSgPgA4fjzIANgOIARAQQgGAJgGAFIgSgQgA4Bj1IAMgOQAHAGAKAKQgGAJgGAFIgRgQgAEXj6IAMgPQAJAGAJAKQgFAIgIAGIgRgPgA1Vj6IAMgPQAJAGAJAKQgFAIgHAGIgSgPg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210.9,-26.6,421.8,53.3);


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
	this.instance = new lib.adfbdfbfd("synched",0);
	this.instance.setTransform(174.55,-1.55);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(61.35,11.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-110.8,-11.5,344.4,46.2);


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


(lib.khbjhbkccccccopy = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.jadfbvuoavava("synched",0);
	this.instance.setTransform(318.4,-237.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,51,102,0.8)").s().p("AiBAiQgOAAgKgKQgKgKAAgOIAAAAQAAgNAKgKQAKgKAOAAIEDAAQAOAAAKAKQAKAKAAANIAAAAQAAAOgKAKQgKAKgOAAg");
	this.shape.setTransform(238.2209,-237.6415,12.2846,10.8436);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.8,-274.8,402.9,74.30000000000001);


(lib.intromobile66 = function(mode,startPosition,loop,reversed) {
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

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(163));

	// Layer_3
	this.instance_1 = new lib.shape93("synched",0);
	this.instance_1.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(163));

	// Layer_4
	this.instance_2 = new lib.shape92_1("synched",0);
	this.instance_2.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(163));

	// Layer_5
	this.instance_3 = new lib.shape91("synched",0);
	this.instance_3.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_4 = new lib.shape148("synched",0);
	this.instance_4.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(19).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(43).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},8).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(14));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(21).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(44).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(8).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(14));

	// Layer_6
	this.instance_5 = new lib.shape90_1("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(19).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(43).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(16).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(2).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(10));

	// Layer_7
	this.instance_6 = new lib.shape89("synched",0);
	this.instance_6.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(163));

	// Layer_8
	this.instance_7 = new lib.shape88_1("synched",0);
	this.instance_7.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(163));

	// Layer_9
	this.instance_8 = new lib.shape87("synched",0);
	this.instance_8.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(163));

	// Layer_10
	this.instance_9 = new lib.shape86_1("synched",0);
	this.instance_9.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(163));

	// Layer_11
	this.instance_10 = new lib.shape85("synched",0);
	this.instance_10.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(163));

	// Layer_12
	this.instance_11 = new lib.shape84_1("synched",0);
	this.instance_11.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(163));

	// Layer_13
	this.instance_12 = new lib.shape83("synched",0);
	this.instance_12.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(163));

	// Layer_14
	this.instance_13 = new lib.shape82_1("synched",0);
	this.instance_13.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(163));

	// Layer_15
	this.instance_14 = new lib.shape81("synched",0);
	this.instance_14.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_15 = new lib.shape149("synched",0);
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7184,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(49).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(15).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(37));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(53).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7184,x:-13.45,y:250.65},0).to({startPosition:0},11).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(38));

	// Layer_16
	this.instance_16 = new lib.shape80_1("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9011,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(49).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},11).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(37));

	// Layer_17
	this.instance_17 = new lib.shape79("synched",0);
	this.instance_17.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(163));

	// Layer_22
	this.instance_18 = new lib.bg1("synched",0);
	this.instance_18.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(163));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-300.5,-363.1,530.1,830.9000000000001);


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

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(68));

	// Layer_3
	this.instance_1 = new lib.shape93("synched",0);
	this.instance_1.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(68));

	// Layer_4
	this.instance_2 = new lib.shape92_1("synched",0);
	this.instance_2.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(68));

	// Layer_5
	this.instance_3 = new lib.shape91("synched",0);
	this.instance_3.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_4 = new lib.shape148("synched",0);
	this.instance_4.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(28).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},4).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},3).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(30).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},3).wait(13));

	// Layer_6
	this.instance_5 = new lib.shape90_1("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(28).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},10).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},4).wait(3).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(13));

	// Layer_7
	this.instance_6 = new lib.shape89("synched",0);
	this.instance_6.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(68));

	// Layer_8
	this.instance_7 = new lib.shape88_1("synched",0);
	this.instance_7.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(68));

	// Layer_9
	this.instance_8 = new lib.shape87("synched",0);
	this.instance_8.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(68));

	// Layer_10
	this.instance_9 = new lib.shape86_1("synched",0);
	this.instance_9.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(68));

	// Layer_11
	this.instance_10 = new lib.shape85("synched",0);
	this.instance_10.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(68));

	// Layer_12
	this.instance_11 = new lib.shape84_1("synched",0);
	this.instance_11.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(68));

	// Layer_13
	this.instance_12 = new lib.shape83("synched",0);
	this.instance_12.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(68));

	// Layer_14
	this.instance_13 = new lib.shape82_1("synched",0);
	this.instance_13.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(68));

	// Layer_15
	this.instance_14 = new lib.shape81("synched",0);
	this.instance_14.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_15 = new lib.shape149("synched",0);
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7184,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(13));

	// Layer_16
	this.instance_16 = new lib.shape80_1("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9011,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(13));

	// Layer_17
	this.instance_17 = new lib.shape79("synched",0);
	this.instance_17.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(68));

	// Layer_22
	this.instance_18 = new lib.bg1("synched",0);
	this.instance_18.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(68));

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

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(10).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},8).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(7).to({startPosition:0},0).to({_off:true},2).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).wait(2).to({scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(17));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(12).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(10).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(8).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(9).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(22));

	// Layer_6
	this.instance_5 = new lib.shape90_1("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(10).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(16).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(2).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(2).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17));

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
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7184,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(37).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(15).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(41).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7184,x:-13.45,y:250.65},0).to({startPosition:0},11).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(25));

	// Layer_16
	this.instance_16 = new lib.shape80_1("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9011,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(37).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},11).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(24));

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

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(30).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).wait(4).to({startPosition:0},0).to({_off:true},2).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).wait(14));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(32).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(18).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(6).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(14));

	// Layer_6
	this.instance_5 = new lib.shape90_1("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(30).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(16).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(8));

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
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7184,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(37).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(15).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(12));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(41).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7184,x:-13.45,y:250.65},0).to({startPosition:0},11).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(13));

	// Layer_16
	this.instance_16 = new lib.shape80_1("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9011,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(37).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},11).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(12));

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

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(30).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({startPosition:0},0).wait(6).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false},0).wait(57).to({regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(2).to({_off:false,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},3).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(10).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({startPosition:0},0).wait(10));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(32).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(18).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(9).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(58).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(5).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(12).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(11));

	// Layer_6
	this.instance_6 = new lib.shape90_1("synched",0);
	this.instance_6.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(30).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(20).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(58).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4139,skewX:-4.065,skewY:-184.5731,x:148.75,y:-343.45},0).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},6).wait(1).to({startPosition:0},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},3).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(10).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4145,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(12));

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
	this.instance_16.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7184,0.1,0);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(57).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(166));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(61).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7184,x:-13.45,y:250.65},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(167));

	// Layer_16
	this.instance_17 = new lib.shape80_1("synched",0);
	this.instance_17.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9011,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(57).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(166));

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


// stage content:
(lib.index = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,77,247,383,608,731,873,1072,1283,1464];
	this.streamSoundSymbolsList[383] = [{id:"_3",startFrame:383,endFrame:530,loop:1,offset:0}];
	this.streamSoundSymbolsList[608] = [{id:"_4",startFrame:608,endFrame:702,loop:1,offset:0}];
	this.streamSoundSymbolsList[731] = [{id:"_6",startFrame:731,endFrame:858,loop:1,offset:0}];
	this.streamSoundSymbolsList[873] = [{id:"_7",startFrame:873,endFrame:1028,loop:1,offset:0}];
	this.streamSoundSymbolsList[1072] = [{id:"_8",startFrame:1072,endFrame:1262,loop:1,offset:0}];
	this.streamSoundSymbolsList[1283] = [{id:"_9",startFrame:1283,endFrame:1443,loop:1,offset:0}];
	this.streamSoundSymbolsList[1464] = [{id:"_10",startFrame:1464,endFrame:2666,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_77 = function() {
		playSound("_1mp3copy");
	}
	this.frame_247 = function() {
		playSound("_2");
	}
	this.frame_383 = function() {
		var soundInstance = playSound("_3",0);
		this.InsertIntoSoundStreamData(soundInstance,383,530,1);
	}
	this.frame_608 = function() {
		var soundInstance = playSound("_4",0);
		this.InsertIntoSoundStreamData(soundInstance,608,702,1);
	}
	this.frame_731 = function() {
		var soundInstance = playSound("_6",0);
		this.InsertIntoSoundStreamData(soundInstance,731,858,1);
	}
	this.frame_873 = function() {
		var soundInstance = playSound("_7",0);
		this.InsertIntoSoundStreamData(soundInstance,873,1028,1);
	}
	this.frame_1072 = function() {
		var soundInstance = playSound("_8",0);
		this.InsertIntoSoundStreamData(soundInstance,1072,1262,1);
	}
	this.frame_1283 = function() {
		var soundInstance = playSound("_9",0);
		this.InsertIntoSoundStreamData(soundInstance,1283,1443,1);
	}
	this.frame_1464 = function() {
		var soundInstance = playSound("_10",0);
		this.InsertIntoSoundStreamData(soundInstance,1464,2666,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(77).call(this.frame_77).wait(170).call(this.frame_247).wait(136).call(this.frame_383).wait(225).call(this.frame_608).wait(123).call(this.frame_731).wait(142).call(this.frame_873).wait(199).call(this.frame_1072).wait(211).call(this.frame_1283).wait(181).call(this.frame_1464).wait(1248));

	// pic
	this.instance = new lib.Untitled1();
	this.instance.setTransform(-40,54);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1554).to({_off:false},0).to({_off:true},1157).wait(1));

	// txt
	this.instance_1 = new lib.adfbfd("synched",0);
	this.instance_1.setTransform(242.5,64.45);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1554).to({_off:false},0).to({_off:true},1157).wait(1));

	// Layer_13
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AiFBeQAFgIAGgGQAIAGAJAJIgLAOIgRgPgAhpBcIAMgOQAIAGAJAKQgGAJgFAEIgSgPgAAnBRIAMgPQAJAGAJAKQgFAIgHAGIgSgPgAjSBLQgMgNAAgUQAAgSAIgSIAFACQgEAOAAALQAAAPALALQAKAKAOAAQAQAAAOgJQAIgFAEgFQAEgEAAgEQAAgGgDgJQgDgGgFgHIgLgMIAFgTIACAAIALAKQAEADAIAAQAGAAAEgEQADgCADgGIAHgMIABAAIAEAXQAEAUAJAGIAGADIAGABIAFAAQAJAAAHgEQAIgDACgGIAEgPIAKgIIABABQgDALAAAFQAAAJAFAEQAHAGALAAIALAAQASAAATgHQATgGAYgNIAAgBQgdgKgSAAQgMAAgHAHIACAHIgFANIgBAAIgHgTQAAgMAJgHQAJgHAOAAQARAAAgAMQAMAFANAAIANAAIAAABIgJAOQgQAAgJAGIgZAQQgQAKgPAFQgQAFgSAAIgJAAQgMAAgHgEQgJgDgDgIIgBAAQgDAHgJAEQgHAEgKAAIgGAAQgNAAgHgIQgGgHgFgTIgEgOIAAAAQgIAOgNAAQAEAMAAAQQAAAOgEALQgGAIgKAHQgQALgSAAQgUAAgMgOgADPAuQABgKAAgTIAAgPQAAgigFg6QAHgJAIgGIABAAQAEAoAABBIgBAXQgBAGgDAGIgJAMgACAAsQggAAAAgZIABgIIAFgEIABABQABARAZAAIAHAAQAJAAAIgEQAIgFAAgLQgBgggDgtIgBgJIgBgJQAAgFAFgFIAIgIIABAAQgBAOANAVIgJAHIABAaIAAAaQAAAYgFAMIgGAKQgDAFgFACQgJAFgKAAgAg0gxIAMgPQAJAGAJAKQgFAIgIAGIgRgPgAi+gyIAMgQQAJAHAJAJQgFAJgHAGIgSgPg");
	this.shape.setTransform(414.025,568.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("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QADgNAHgKIAFACQgJAWAAAPQAAAKADAIQADAIAGAHQAHAGAJAEQAJAEALgBQAVAAAbgMQAMgGABgEQgDgGgLgEQgMgEgRAAIgBgCIAKgRIA4AAQAJAAAHgDQAIgEABgGIAFgQIAKgGIABAAQgDAMAAAEQAAAJAFAEQAHAGALAAIAGAAQAJAAAIgEQAIgEAAgMQgBgggEgtIgBgJIAAgJQAAgFAEgFIAIgIIABAAQAAAOAMAVIgJAIIABAaIABAZQAAAYgGANIgFAKQgEAEgEADQgJAEgKAAIgGAAQgLAAgIgDQgIgEgDgIIgBAAQgEAHgIAEQgIAEgKAAIgLAAIABALQAAADgDAGIgEAJQgOANgUAIQgTAHgQAAQgbAAgOgQgAIJBbIACgFQAKAFAMABQAVgBAUgUIAJgLQAEgFABgFIgHAAQgXAAgLgIQgMgHAAgPQAAgNAIgLQAEgGAGgEQAGgDAHAAQAKAAAJANQAKAMADAXIARAAQALAAAGgGQAFgEADgMQAFgMAIgIQAHgHAIAAQAGAAAEACQAEACAEAGIAGAJIAJASQACAFAGAEQAGADAJAAIAGAAQAJAAAHgDQAIgEABgGIAFgQIAKgGIABAAQgDALAAAFQAAAKAEADQAIAGALAAIAFAAQAWAAAHgDQAJgDAAgDQAAgFgFgLIgKgUQAGgKAFgHIABAAQAGAKAEAMQAFAMAAAKQAAAIgDAIQgDAFgFAHQgFAFgJACQgIACgSAAIgFAAQgLAAgIgDQgIgEgDgIIgBAAQgEAHgIAEQgIAEgKAAIgFAAQgHAAgGgCQgGgEgEgHIgBAAQgBAIgEADQgEAFgFABQgJAAgMgGQgNgGgJgKIAAAAQgEAJgHAEQgHAFgMAAIgOAAQgBAHgDAJQgDAHgFAIQgIALgLAIQgKAGgHAAQgSAAgYgPgAKaACQgEAEgCAGQABADAGAGQAFAFAFADQAFADAGABIAKACIAEgBQAAAAABAAQAAAAAAgBQAAAAABgBQAAAAAAgBQAAgEgDgFIgFgKQgEgHgFgDQgFgDgFAAQgGAAgFADgAIyAFQgFAEAAAFQAAAKAQAFIANACIAOAAQgDgNgIgIQgHgJgJAAQgGAAgFAEgAB4BbIACgFQAKAFAMABQAVgBAUgUIAJgLQAEgFABgFIgHAAQgXAAgLgIQgMgHAAgPQAAgNAIgLQAEgGAGgEQAGgDAHAAQAKAAAJANQAKAMADAXIATAAQAKAAAJgCQAKgCAHgFQAHgEAAgDQAAgEgDgGQgEgIgLgMQgIgKgOgOIgJgKIgBgJQAAgFAEgHIAFgGQALgHAagJIA3gTIABABIgMASIgiAMQggALgNAIIAAAAQAIAGAPAGIgFAHQAVATAiAnQAHAHAGAEQAHAEAJAAIAGAAQAJAAAHgDQAIgEABgGIAFgQIAKgGIABAAQgDAMAAAEQAAAJAFAEQAHAGALAAIAGAAQAJAAAIgEQAHgEAAgMQAAgegEgvIgBgJIAAgJQAAgFAEgFIAIgIIABAAQAAAOAMAVIgJAIIABAaIABAZQAAAYgGANIgFAKQgEAEgFADQgIAEgKAAIgGAAQgLAAgIgDQgIgEgDgIIgBAAQgEAHgIAEQgIAEgKAAIgFAAQgNAAgKgHQgHgFgJgMIgNgQIgBAAQAAASgMALQgNALgeAAIgQAAQgBAHgDAJQgDAHgFAIQgIALgLAIQgKAGgHAAQgSAAgYgPgAChAFQgFAEAAAFQAAAKAQAFIANACIAOAAQgDgNgIgIQgHgJgJAAQgGAAgFAEgEggZABbIADgFQAKAFAMABQAVgBAUgUIAJgLQAEgFABgFIgHAAQgXAAgMgIQgLgHAAgPQAAgNAHgLQAFgGAFgEQAHgDAGAAQALAAAJANQAJAMADAXIASAAQALAAAGgGQAEgEAEgMQAEgMAIgIQAIgHAIAAQAFAAAEACQAFACADAGIAGAJIAJASQADAFAGAEQAGADAIAAIAGAAQAJAAAIgDQAHgEACgGIAEgQIAKgGIABAAQgDAMAAAEQAAAJAFAEQAHAGALAAIAGAAQAVAAAIgDQAIgDAAgDQAAgFgEgLIgKgUQAFgKAGgHIAAAAQAHAKADAMQAFAMAAAKQAAAIgDAIQgCAFgFAHQgFAFgJACQgJACgRAAIgFAAQgMAAgHgDQgIgEgEgIIgBAAQgDAHgIAEQgIAEgKAAIgGAAQgPAAgIgNIAAAAQgCAIgDADQgFAFgFABQgJAAgMgGQgMgGgJgKIgBAAQgDAJgHAEQgIAFgLAAIgPAAQAAAHgDAJIgIAPQgIALgLAIQgKAGgHAAQgSAAgZgPgA+HACQgFAEgCAGQABADAGAGQAFAFAGADIALAEQAGACAEAAIADgBQABAAAAAAQAAAAA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");
	this.shape_1.setTransform(254.625,608.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},2194).to({state:[]},517).wait(1));

	// txt
	this.instance_2 = new lib.sfgsfgfgb("synched",0);
	this.instance_2.setTransform(90.55,503.55);

	this.instance_3 = new lib.dfbdfbbjjm("synched",0);
	this.instance_3.setTransform(404.65,156.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},1871).to({state:[{t:this.instance_2},{t:this.instance_3}]},252).to({state:[]},588).wait(1));

	// Layer_15
	this.instance_4 = new lib.adbadfvbfdvsfvfsvdscdscsad("synched",0);
	this.instance_4.setTransform(248,697.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2537).to({_off:false},0).to({_off:true},174).wait(1));

	// tittles
	this.instance_5 = new lib.adfbdfbfd("synched",0);
	this.instance_5.setTransform(64.05,246.9);

	this.instance_6 = new lib.adfbdfvdfdb("synched",0);
	this.instance_6.setTransform(108,349.4);

	this.instance_7 = new lib.sfnklkcsds("synched",0);
	this.instance_7.setTransform(65.9,170.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5}]},1572).to({state:[{t:this.instance_5},{t:this.instance_6,p:{x:108,y:349.4}}]},245).to({state:[{t:this.instance_5},{t:this.instance_6,p:{x:359.5,y:282.3}},{t:this.instance_7}]},650).to({state:[]},244).wait(1));

	// txt
	this.instance_8 = new lib.sfbfgbgfggffg("synched",0);
	this.instance_8.setTransform(178.4,441.7,1.2,1.2);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1656).to({_off:false},0).to({_off:true},1055).wait(1));

	// Layer_18
	this.instance_9 = new lib.khbjhbkccccccopy2("synched",0);
	this.instance_9.setTransform(20,373.7);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1463).to({_off:false},0).to({_off:true},91).wait(1158));

	// ani
	this.instance_10 = new lib.intromobile6egret("synched",0,false);
	this.instance_10.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1463).to({_off:false},0).to({_off:true},91).wait(1158));

	// txt
	this.instance_11 = new lib.khbjhbkccccccopy("synched",0);
	this.instance_11.setTransform(20,373.7);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1282).to({_off:false},0).to({alpha:1},15).wait(148).to({startPosition:0},0).to({startPosition:0},20).to({_off:true},1).wait(1246));

	// bathra
	this.instance_12 = new lib.intromobile66("synched",0,false);
	this.instance_12.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1282).to({_off:false},0).to({_off:true},182).wait(1248));

	// Layer_24
	this.instance_13 = new lib.sdfsdsdsds("synched",0);
	this.instance_13.setTransform(238.45,529);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1112).to({_off:false},0).to({alpha:1},7).to({_off:true},164).wait(1429));

	// Layer_25
	this.instance_14 = new lib.shape56("synched",0);
	this.instance_14.setTransform(244.9,430.85,1.54,1.54);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1053).to({_off:false},0).to({alpha:1},17).wait(26).to({startPosition:0},0).to({regX:0.1,regY:0.1,scaleX:2.2546,scaleY:2.2546,x:244.95,y:220.9},10).to({_off:true},177).wait(1429));

	// Layer_26
	this.instance_15 = new lib.flowerrr();
	this.instance_15.setTransform(251,350.15,0.4,0.4,0,0,0,0.1,0.2);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(982).to({_off:false},0).to({scaleX:1.6,scaleY:1.6,x:250.95,y:350.05},13).wait(63).to({alpha:0},11).to({_off:true},1).wait(1642));

	// Layer_27
	this.instance_16 = new lib.flower("synched",0,false);
	this.instance_16.setTransform(247.8,388,1,1,0,0,0,209.2,159.8);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(871).to({_off:false},0).wait(42).to({startPosition:42},0).to({scaleX:2,scaleY:2,x:247.85,y:388.05,startPosition:50},8).wait(66).to({startPosition:104},0).to({alpha:0},9).to({_off:true},1).wait(1715));

	// Layer_28
	this.instance_17 = new lib.intromobile3("synched",0,false);
	this.instance_17.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(730).to({_off:false},0).wait(128).to({startPosition:128},0).to({alpha:0,startPosition:137},13).to({_off:true},1).wait(1840));

	// txt_explor
	this.instance_18 = new lib.kskjsrhgbers("synched",0);
	this.instance_18.setTransform(242.6,583.3,0.2,0.2,0,0,0,0.2,0.2);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(730).to({_off:false},0).to({_off:true},18).wait(1964));

	// EXPOLRE
	this.instance_19 = new lib.EXPLOR("synched",0,false);
	this.instance_19.setTransform(239.95,269.95,1.1,1.1);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(730).to({_off:false},0).to({_off:true},25).wait(1957));

	// txt_3
	this.instance_20 = new lib.khbjhbkccccc("synched",0);
	this.instance_20.setTransform(14,408.75);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(613).to({_off:false},0).to({alpha:1},8).wait(94).to({startPosition:0},0).to({alpha:0},12).to({_off:true},1).wait(1984));

	// sce_3
	this.instance_21 = new lib.intromobile2("synched",0,false);
	this.instance_21.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(579).to({_off:false},0).wait(132).to({startPosition:123},0).to({alpha:0},17).wait(1984));

	// txt_2
	this.instance_22 = new lib.ljDFgkljDFg("synched",0);
	this.instance_22.setTransform(230.85,521.2,0.14,0.14);
	this.instance_22.alpha = 0;
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(387).to({_off:false},0).to({alpha:1},12).wait(174).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(2128));

	// sce2
	this.instance_23 = new lib.ani1("synched",0,false);
	this.instance_23.setTransform(211,310,0.72,0.72,0,0,0,-5,2.6);
	this.instance_23.alpha = 0;
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(384).to({_off:false},0).to({alpha:1,startPosition:12},12).wait(177).to({startPosition:173},0).to({alpha:0},10).to({_off:true},1).wait(2128));

	// txt_1
	this.instance_24 = new lib.txt1("synched",0,false);
	this.instance_24.setTransform(264.2,200.75,12,12,0,0,0,8.3,3.2);
	this.instance_24.alpha = 0;
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(209).to({_off:false},0).to({alpha:1},11).wait(72).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(2409));

	// txt2
	this.instance_25 = new lib.txt122("synched",0,false);
	this.instance_25.setTransform(270.3,210.65,14.3999,14.3999,0,0,0,8.3,3.2);
	this.instance_25.alpha = 0;
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(303).to({_off:false},0).to({alpha:1},9).wait(40).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(2348));

	// sce1
	this.instance_26 = new lib.intromobile("synched",0,false);
	this.instance_26.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(49).to({_off:false},0).wait(325).to({startPosition:303},0).to({alpha:0},10).to({_off:true},1).wait(2327));

	// BG
	this.instance_27 = new lib.Path();
	this.instance_27.setTransform(240,400,0.48,0.9938,0,0,0,500,402.5);
	this.instance_27.alpha = 0.3984;

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#515A61","#666666","#2A2E35","#23262D"],[0,0.314,0.733,1],0,0,0,0,0,646.3).s().p("EhOHA+5MAAAh9xMCcPAAAMAAAB9xg");
	this.shape_2.setTransform(239.9979,400.0003,0.48,0.9938);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.instance_27}]},49).wait(2663));

	// Layer_5
	this.instance_28 = new lib.Bitmap18();
	this.instance_28.setTransform(-3,0,0.563,0.4393);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).to({_off:true},50).wait(2662));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(23.9,370.8,800.5,501.59999999999997);
// library properties:
lib.properties = {
	id: 'C4FA467DD279484DB0C61631675A9212',
	width: 480,
	height: 800,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/_16024105.jpg", id:"_16024105"},
		{src:"images/_6dpi20.png", id:"_6dpi20"},
		{src:"images/Bitmap18.png", id:"Bitmap18"},
		{src:"images/Bitmap19.png", id:"Bitmap19"},
		{src:"images/Bitmap20.png", id:"Bitmap20"},
		{src:"images/Bitmap55.png", id:"Bitmap55"},
		{src:"images/Bitmap56.png", id:"Bitmap56"},
		{src:"images/Untitled1.png", id:"Untitled1"},
		{src:"sounds/_1mp3copy.mp3", id:"_1mp3copy"},
		{src:"sounds/_10.mp3", id:"_10"},
		{src:"sounds/_2.mp3", id:"_2"},
		{src:"sounds/_3.mp3", id:"_3"},
		{src:"sounds/_4.mp3", id:"_4"},
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
an.compositions['C4FA467DD279484DB0C61631675A9212'] = {
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