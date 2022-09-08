import * as dat from 'lil-gui';

export default class Debug {
  constructor() {
    this.active = window.location.hash == "#debug";
    console.log(this.active, window.location.hash)

    this.ui = new dat.GUI();
    
  }
}