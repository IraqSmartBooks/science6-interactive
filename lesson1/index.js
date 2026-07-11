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


(lib.Bitmap13 = function() {
	this.initialize(img.Bitmap13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,864,1821);// helper functions:

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


(lib.home = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap13();
	this.instance.setTransform(0,0,0.5555,0.4393);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:0.6111,scaleY:0.4832,x:-24,y:-40},0).wait(1).to({scaleX:0.5555,scaleY:0.4393,x:0,y:0},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24,-40,528,880);


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
	this.shape_3.setTransform(217.3126,241.6826,1,0.7861,0,-165.0012,14.9983);

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

	// Layer_2
	this.instance = new lib.shape146("synched",0);
	this.instance.setTransform(-157.45,282,1.4147,1.5008);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(304));

	// Layer_3
	this.instance_1 = new lib.shape93("synched",0);
	this.instance_1.setTransform(-163.5,244.45,1.4147,1.5008,0,0,180,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(304));

	// Layer_4
	this.instance_2 = new lib.shape92("synched",0);
	this.instance_2.setTransform(-157.85,194.3,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(304));

	// Layer_5
	this.instance_3 = new lib.shape91("synched",0);
	this.instance_3.setTransform(187.2,-319.2,1.4146,1.5007,0,0.4696,-179.4709,-0.1,-0.1);

	this.instance_4 = new lib.shape148("synched",0);
	this.instance_4.setTransform(200.15,-309.45,1.4145,1.5003,0,2.128,-177.6048);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5006,skewX:0.9433,skewY:-178.9387,x:190.9,y:-316.3},1).wait(30).to({regX:-0.1,regY:-0.1,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(2).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},2).to({_off:true},5).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(1).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(2).to({startPosition:0},0).wait(6).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false},0).wait(57).to({regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(2).to({_off:false,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},3).wait(2).to({_off:false,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},3).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(10).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4145,scaleY:1.5006,skewX:1.4195,skewY:-178.4027,x:194.7,y:-313.7},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({_off:true},3).wait(3).to({_off:false},0).to({startPosition:0},1).to({scaleX:1.4142,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},1).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4142,scaleY:1.5001,skewX:2.1325,skewY:-177.6006,x:200.1,y:-309.6},0).to({_off:true},1).wait(3).to({_off:false,regX:0,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({startPosition:0},0).wait(10));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(32).to({_off:false},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(18).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(8).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({_off:true},1).wait(9).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(58).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},2).wait(3).to({_off:false},0).to({_off:true},2).wait(3).to({_off:false,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(5).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(12).to({_off:false,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(4).to({_off:false,regX:0,regY:0,scaleX:1.4145,scaleY:1.5003,skewX:2.128,skewY:-177.6048,x:200.15,y:-309.45},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},2).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(1).to({_off:false,regY:0,scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({_off:true},1).wait(1).to({_off:false,regX:-0.1,regY:-0.1,scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},0).to({regX:0,scaleX:1.4139,scaleY:1.4998,skewX:-1.9381,skewY:-182.1815,x:167.65,y:-332.05},2).to({_off:true},1).wait(11));

	// Layer_6
	this.instance_5 = new lib.shape90("synched",0);
	this.instance_5.setTransform(186.25,-319.7,1.4146,1.5008,0,0.2645,-179.7027);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).wait(30).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},6).to({startPosition:0},7).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(17).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(20).to({startPosition:0},0).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},1).to({scaleX:1.4146,scaleY:1.5007,skewX:0.709,skewY:-179.2021,x:189.05,y:-317.7},1).to({scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},3).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(9).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(58).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4139,skewX:-4.065,skewY:-184.5731,x:148.75,y:-343.45},0).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},6).wait(1).to({startPosition:0},0).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},3).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(10).to({regX:-0.1,regY:-0.1,scaleX:1.4144,scaleY:1.5004,skewX:1.4149,skewY:-178.4075,x:194.65,y:-313.65},0).to({regX:0,regY:0,scaleX:1.4145,scaleY:1.5001,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},2).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4145,skewX:2.8377,skewY:-176.8065,x:205.5,y:-305.2},1).wait(1).to({regX:-0.1,regY:-0.1,scaleX:1.4148,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},0).to({startPosition:0},8).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},2).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4144,scaleY:1.499,skewX:-4.9473,skewY:-185.5646,x:142.8,y:-346.95},0).to({regX:-0.1,regY:-0.1,scaleX:1.4148,scaleY:1.5001,skewX:3.59,skewY:-175.9614,x:211.35,y:-300.9},1).to({scaleX:1.4141,scaleY:1.5002,skewX:0.7174,skewY:-179.1925,x:189.05,y:-317.75},1).to({regX:0,regY:0,scaleX:1.414,scaleY:1.5001,skewX:-0.5222,skewY:-180.5874,x:179.1,y:-324.6},1).to({scaleX:1.4138,scaleY:1.4993,skewX:-3.355,skewY:-183.7748,x:156.05,y:-339.25},2).wait(1).to({scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:-180,x:183.45,y:-321.8},0).wait(1).to({startPosition:0},0).wait(12));

	// Layer_7
	this.instance_6 = new lib.shape89("synched",0);
	this.instance_6.setTransform(-104.85,188.8,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(304));

	// Layer_8
	this.instance_7 = new lib.shape88("synched",0);
	this.instance_7.setTransform(-106.75,249,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(304));

	// Layer_9
	this.instance_8 = new lib.shape87("synched",0);
	this.instance_8.setTransform(-131.4,276.45,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(304));

	// Layer_10
	this.instance_9 = new lib.shape86("synched",0);
	this.instance_9.setTransform(-133.4,320.5,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(304));

	// Layer_11
	this.instance_10 = new lib.shape85("synched",0);
	this.instance_10.setTransform(-118.05,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(304));

	// Layer_12
	this.instance_11 = new lib.shape84("synched",0);
	this.instance_11.setTransform(-84.85,269.35,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(304));

	// Layer_13
	this.instance_12 = new lib.shape83("synched",0);
	this.instance_12.setTransform(-87.95,320.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(304));

	// Layer_14
	this.instance_13 = new lib.shape82("synched",0);
	this.instance_13.setTransform(-74.35,357.15,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(304));

	// Layer_15
	this.instance_14 = new lib.shape81("synched",0);
	this.instance_14.setTransform(-47.3,269.3,1.4158,1.4967,0,-9.4587,169.3789);

	this.instance_15 = new lib.shape149("synched",0);
	this.instance_15.setTransform(-13.45,250.65,1.4815,1.4311,0,-61.5358,115.7184,0.1,0);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(30).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(57).to({regX:0.1,regY:0.1,scaleX:1.4215,scaleY:1.4872,skewX:-18.9832,skewY:158.8339,x:-40.7,y:266.15},0).to({scaleX:1.4626,scaleY:1.4465,skewX:-48.7131,skewY:127.9608,x:-21,y:256.35},3).to({_off:true},1).wait(19).to({_off:false,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(1).to({startPosition:0},0).wait(166));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(34).to({_off:false},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(61).to({_off:false,regX:0.1,scaleX:1.4815,scaleY:1.4311,skewX:-61.5358,skewY:115.7184,x:-13.45,y:250.65},0).to({startPosition:0},15).to({scaleX:1.4655,scaleY:1.4435,skewX:-50.766,skewY:125.9608,x:-19.65,y:255.3},1).to({regY:0.1,scaleX:1.4237,scaleY:1.4879,skewX:-19.7273,skewY:158.0205,x:-39.85,y:267.35},3).to({_off:true,regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-53.9,y:272.7},2).wait(167));

	// Layer_16
	this.instance_16 = new lib.shape80("synched",0);
	this.instance_16.setTransform(-54.3,230.25,1.4144,1.4984,0,-5.9011,173.3644);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(30).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(57).to({scaleX:1.4157,scaleY:1.4937,skewX:-11.8194,skewY:166.746,x:-51.2,y:230.95},0).to({regX:0.1,regY:0.1,scaleX:1.4342,scaleY:1.4736,skewX:-29.8704,skewY:147.1194,x:-42.3,y:233.2},3).wait(1).to({regX:0,regY:0,scaleX:1.4471,scaleY:1.4641,skewX:-37.6879,skewY:138.9918,x:-38.9,y:232.9},0).to({startPosition:0},15).to({regX:0.1,scaleX:1.4361,scaleY:1.4715,skewX:-31.2891,skewY:145.6257,x:-41.6},1).to({regY:0.1,scaleX:1.4149,scaleY:1.4988,skewX:-6.1436,skewY:173.0923,x:-54.15,y:230.9},4).wait(1).to({regX:0,regY:0,scaleX:1.4147,scaleY:1.5008,skewX:0,skewY:180,x:-57.4,y:229.65},0).wait(1).to({startPosition:0},0).wait(166));

	// Layer_17
	this.instance_17 = new lib.shape79("synched",0);
	this.instance_17.setTransform(-65.4,175.95,1.4147,1.5008,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(304));

	// Layer_22
	this.instance_18 = new lib.bg1("synched",0);
	this.instance_18.setTransform(89.15,27.05,3,3.2512);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(304));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-300.5,-363.1,530.1,830.9000000000001);


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

	this.actionFrames = [0,20,190];
	this.streamSoundSymbolsList[20] = [{id:"_1mp3copy",startFrame:20,endFrame:168,loop:1,offset:0}];
	this.streamSoundSymbolsList[190] = [{id:"_2",startFrame:190,endFrame:294,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		this.home.on("click", function () {
		
		    this.gotoAndPlay(2);
		
		}.bind(this));
	}
	this.frame_20 = function() {
		var soundInstance = playSound("_1mp3copy",0);
		this.InsertIntoSoundStreamData(soundInstance,20,168,1);
	}
	this.frame_190 = function() {
		var soundInstance = playSound("_2",0);
		this.InsertIntoSoundStreamData(soundInstance,190,294,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(20).call(this.frame_20).wait(170).call(this.frame_190).wait(154));

	// txt_1
	this.instance = new lib.txt1("synched",0,false);
	this.instance.setTransform(264.2,200.75,12,12,0,0,0,8.3,3.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(152).to({_off:false},0).to({alpha:1},11).wait(72).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(98));

	// txt2
	this.instance_1 = new lib.txt122("synched",0,false);
	this.instance_1.setTransform(270.3,210.65,14.3999,14.3999,0,0,0,8.3,3.2);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(246).to({_off:false},0).to({alpha:1},9).wait(40).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(37));

	// sce1
	this.instance_2 = new lib.intromobile("synched",0,false);
	this.instance_2.setTransform(366.45,413.15,1,1,0,0,0,91.8,79.3);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).wait(325).to({startPosition:303},0).to({alpha:0},10).to({_off:true},1).wait(7));

	// BG
	this.instance_3 = new lib.Path();
	this.instance_3.setTransform(240,400,0.48,0.9938,0,0,0,500,402.5);
	this.instance_3.alpha = 0.3984;

	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#515A61","#666666","#2A2E35","#23262D"],[0,0.314,0.733,1],0,0,0,0,0,646.3).s().p("EhOHA+5MAAAh9xMCcPAAAMAAAB9xg");
	this.shape.setTransform(239.9979,400.0003,0.48,0.9938);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape},{t:this.instance_3}]},1).wait(343));

	// Layer_1
	this.home = new lib.home();
	this.home.name = "home";
	this.home.setTransform(240,400,1,1,0,0,0,240,400);
	new cjs.ButtonHelper(this.home, 0, 1, 2, false, new lib.home(), 3);

	this.timeline.addTween(cjs.Tween.get(this.home).to({_off:true},1).wait(343));

	// BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#515A61","#666666","#2A2E35","#23262D"],[0,0.314,0.733,1],0,0,0,0,0,646.3).s().p("EhOHA+5MAAAh9xMCcPAAAMAAAB9xg");
	this.shape_1.setTransform(239.9979,400.0003,0.48,0.9938);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).to({_off:true},2).wait(342));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(214.1,360,290.1,480);
// library properties:
lib.properties = {
	id: '44E23AB65F6AA0419670DE3E8C232091',
	width: 480,
	height: 800,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/_16024105.jpg?1783812409303", id:"_16024105"},
		{src:"images/_6dpi20.png?1783812409303", id:"_6dpi20"},
		{src:"images/Bitmap13.png?1783812409303", id:"Bitmap13"},
		{src:"sounds/_1mp3copy.mp3?1783812409303", id:"_1mp3copy"},
		{src:"sounds/_2.mp3?1783812409303", id:"_2"}
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
an.compositions['44E23AB65F6AA0419670DE3E8C232091'] = {
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