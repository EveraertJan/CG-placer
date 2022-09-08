import * as THREE from 'three'
import Application from "../Application.js";
import ActiveElement from './ActiveElement.js';
import Element from './Element.js';
import Floor from './Floor.js';
import Light from './Light.js';


export default class World {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.resources = this.application.resources;

    // this.addCube();

    this.floor = new Floor();
    this.lights = new Light();
    this.elements = [];

    this.resources.on("ready", () => {
      console.log("resources are loaded");
      Object.keys(this.resources.items).forEach((e, i) => {
        let newElement;
        if(this.resources.items[e].source.UUID == this.application.activeObject) {
          newElement = new ActiveElement(this.resources.items[e], i)
          this.activeElement = newElement;
        } else {
          newElement = new Element(this.resources.items[e], i)
        }
        this.elements.push(newElement);
      });
      this.drawElements();
    })
  }
  addCube() {
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: "gray"})
    )
    this.scene.add(testMesh)
  }
  drawElements() {
    // this.elements.forEach((e) => e.draw());
  }

}