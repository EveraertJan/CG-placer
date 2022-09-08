import * as THREE from 'three'
import Application from "../Application";

export default class Light {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.position = {
      x: 0,
      y: 0, 
      z: 50
    };
    this.setSunLight();
  }
  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#FFFFFF', 2)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 200
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(this.position.x, this.position.y, this.position.z)
    this.scene.add(this.sunLight)
    this.helper = new THREE.DirectionalLightHelper( this.sunLight, 5 );
    this.scene.add(this.helper)

    const skyColor = 0xFFFFFF;
    const groundColor = 0xEEEEEE;  
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    this.scene.add(light);
  }

    
}