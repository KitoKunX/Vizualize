/* This HTML5 Video Player Script is developed by KitoKunX. Do not remove credits if used for another program or used externally. */
		
		var video, img, canvas_rect, canvas_circ, ctx_rect, ctx_circ, source, context, analyser, array;
		function createVideoElement(musicFile, doLoop, doAutoplay){
			video = document.createElement('video');
			video.src = musicFile;
			video.id = "visualizerAudio";
			video.loop = doLoop;
			video.autoplay = doAutoplay;
			
		}
		createVideoElement("../../../videos/knk.mp4", true, true);
		window.addEventListener("load", _init);
		function _init(){
			img = document.createElement("img");
			img.style.position = "absolute";
			img.style.top = "0px";
			img.style.left = "0px"; 
			document.getElementById('frame').appendChild(img);
			document.getElementById('frame').appendChild(video);
			context = new webkitAudioContext() || new AudioContext(); 
			analyser = context.createAnalyser(); 
			canvas_rect = document.createElement('canvas');
			canvas_rect.id = "rect_analyser";
			canvas_rect.width = $(window).width();
			canvas_circ = document.createElement('canvas');
			canvas_circ.width = 300;
			canvas_circ.height = 300;
			canvas_circ.id = "circ_analyser";
			document.getElementById("frame").appendChild(canvas_rect);
			document.getElementById("frame").appendChild(canvas_circ);
			canvas_rect = document.getElementById("rect_analyser");
			canvas_circ = document.getElementById("circ_analyser");
			ctx_rect = canvas_rect.getContext('2d');
			ctx_circ = canvas_circ.getContext('2d');
			source = context.createMediaElementSource(video); 
			source.connect(analyser);
			analyser.connect(context.destination);
			_loop();
		}
		function _rectLoop(){
			ctx_rect.clearRect(0, 0, canvas_rect.width, canvas_rect.height);
			ctx_rect.fillStyle = '#00CCFF'; 
			bars = 300;
			for (var i = 0; i < bars; i++) {
				bar_x = i * 4.3;
				bar_width = 2;
				bar_height = -(array[i] / 2.5);
				ctx_rect.fillRect(bar_x, canvas_rect.height, bar_width, bar_height);
			}
		}
		function _circLoop(){
			circles = 10;
			ctx_circ.clearRect(0, 0, canvas_circ.width, canvas_circ.height);
			ctx_circ.fillStyle = '#00CCFF';
			ctx_circ.strokeStyle = "#000080";
			for (var i = 0; i < circles; i++) {
				ctx_circ.beginPath();
				radius = (array[i] / 2);
				ctx_circ.arc(canvas_circ.width / 2, canvas_circ.height / 2, radius, 0, 2*Math.PI);
				ctx_circ.stroke();
			}
		}
		function  _loop(){
			window.webkitRequestAnimationFrame(_loop) || window.requestAnimationFrame(_loop);
			array = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(array);
			_rectLoop();
			_circLoop();
			/*var bg = document.createElement("canvas"); 
			bg.width = window.innerWidth; 
			bg.height = window.innerHeight; 
			bg.getContext('2d').drawImage(video, 0, 0, bg.width, bg.height); 
			img.src = bg.toDataURL();*/
			

		}
