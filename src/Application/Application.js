import * as THREE from 'three'
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Resources from './Utils/Resources.js';

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import World from './World/World.js';

import sources from './sources.js'
import Debug from './Utils/Debug.js';

let instance = null;

export default class Application {
  constructor(canvas) {

    if(instance) { return instance }
    instance = this;

    this.activeObject = window.location.hash.replace("#", "");


    // global access
    window.experience = this;

    // options
    this.canvas = canvas;

    //setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();

    this.scene = new THREE.Scene();
    
    this.resources = new Resources();
    this.fetchResources();

    this.camera = new Camera();
    this.renderer = new Renderer();

    this.world = new World();

    // events
    this.sizes.on("resize", () => this.resize())
    this.time.on("tick", () => {
      this.update();
    })
    document.getElementById("storePosition").addEventListener("click", () => this.storePosition());
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    // console.log("tick")
    this.camera.update();
    this.renderer.render();
  }
  fetchResources() {
    fetch("https://api.datacratie.cc/clipping")
      .then(r => r.json())
      .then(data => {
        console.log("fetched data")
        this.resources.addResources(data)
      })
  }
  storePosition() {
    console.log("hello")
    this.world.activeElement.storePosition();
  }
}