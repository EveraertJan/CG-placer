import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Application from './Application'

export default class Camera {
  constructor() {
    
    this.application = new Application();
    
    this.sizes = this.application.sizes;
    this.scene = this.application.scene;
    this.canvas = this.application.canvas;

    this.enableOrbital = false;

    this.application.debug.ui.add(this, 'enableOrbital')

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance.position.set(0, 0, 20)
    this.instance.lookAt(0, 10, 0);
    this.scene.add(this.instance)
  }
  setControls() {
    if(this.enableOrbital) {
      this.controls = new OrbitControls(this.instance, this.canvas);
      this.controls.enableDamping = true;
    }
  }
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }
  update() {
    if(this.enableOrbital) {
      if(this.controls) {
        this.controls.update()
      } else {
        this.setControls()
      }
    } else {
      this.controls = ""
    }
  }
}