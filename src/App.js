import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import SofaModel from "./models/Sofa/Sofa.fbx";
var FBXLoader = require('three-fbx-loader');
// import SofaMaterial from "./models/Sofa/Sofa.mtl";

const OrbitControls = require('three-orbitcontrols');

class App extends Component {
  constructor(props){
    super(props);
    this.camera = null; this.scene = null; this.renderer= null; 
  }

  componentDidMount(){
    this.init();
    this.animate();
  }
 
  init = function() {
 
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    this.camera.position.z = 1;
    this.scene = new THREE.Scene(); 
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.background = new THREE.Color( 0xffffff );
    // var ambient = new THREE.AmbientLight( 0x444444 );
    // this.scene.add( ambient );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    this.scene.add( directionalLight );
    window.scene = this.scene;
    var loader = new FBXLoader();
    loader.load(
      SofaModel,
      ( obj ) => {
        obj.children[5].visible=false;
        obj.children[2].visible=false;
        obj.scale.set(0.2,0.2,0.2)
        this.scene.add( obj );
      },
    
      function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },
    
      function ( err ) {
        console.error( 'An error happened' );
      }
    );
  }
 
  animate = ()=>{
 
    requestAnimationFrame( this.animate );
    this.renderer.render( this.scene, this.camera );
  }
  
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
