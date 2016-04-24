// Created by MOONWALKERS
(function () {

	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}
	var width  = window.innerWidth,
	       height = window.innerHeight;

	// Moon params
	var radius  = 0.5,
	       segments = 256,
	       rotation = 50;

	// Earth params
	var radius2 = 1.8339,
	       segments2 = 512,
	       rotation2 = 50;

	var scene = new THREE.Scene(); //  The Main Scene 

	var camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
	camera.position.z = 1.5;  //  The Main Camera

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height); // Rendering the scene

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5,3,5);
	scene.add(light);



    var sphere = createSphere(radius, segments); // Moon
	sphere.rotation.y = rotation; 
	scene.add(sphere)

	var stars = createStars(90, 64);
	scene.add(stars);

	var earth = createSphere2(radius2, segments2); // Earth
    	earth.rotation.y = rotation;
    	
    	earth.position.z = -15;
    	earth.position.y = 5;
    	earth.position.x = 6;
    	scene.add(earth);
    
      
	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		sphere.rotation.y += 0.002;
		earth.rotation.y += 0.005;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture('images/final-moon.jpg')						
			})
		);
	}
		function createSphere2(radius2, segments2) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius2, segments2, segments2),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg')						
			})
		);
	}
	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/finalygalaxy.png'), 
				side: THREE.BackSide
			})
		);
	}

}());