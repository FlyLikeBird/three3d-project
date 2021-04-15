import React, { useEffect } from 'react';
import * as THREE from 'three';
// import 'three/example/js/controls/OrbitControls';
import { OrbitControls } from 'three-orbitcontrols';
// console.log(THREE);
// console.log(OrbitControls);
// console.log(THREE.OrbitControls);

function Test(){
    /**
     * 创建场景对象Scene
     */
    useEffect(()=>{
        var scene = new THREE.Scene();
        var p1 = new THREE.Vector3(1.2, 2.6, 3.2);
        var p2 = p1.clone();
        p2.copy(p1);
        console.log(p2);
        console.log ( p1 === p2);
     /**
      * 创建立方体网格模型
      */
     var cubeGeometry = new THREE.BoxGeometry(100, 100, 100);; 
     var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        // wireframe:true
     }); //材质对象Material
     var mesh = new THREE.Mesh(cubeGeometry, material);
     var mesh2 = mesh.clone();
     mesh2.translateX(200);
     scene.add(mesh, mesh2); //网格模型添加到场景中
    // //  创建球体网格模型
    // var geometry2 = new THREE.SphereGeometry(60, 40, 40);
    // var material2 = new THREE.MeshLambertMaterial({
    //   color: 0xff00ff,
    // //   transparent:true,
    // //   opacity:0.5
    // });
    // var mesh2 = new THREE.Mesh(geometry2, material2);
    // scene.add(mesh2);
    var geometry = new THREE.BufferGeometry();
    var vertex = new Float32Array([
        0, 0, 0, 
        50, 0, 0, 
        0, 100, 0, 
        0, 0, 0, 
        0, 0, 100,
        50, 0, 0, 

    ]);
    var colors = new Float32Array([
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
    ])
    var normals = new Float32Array([
        0, 0, 1, //顶点1法向量
        0, 0, 1, //顶点2法向量
        0, 0, 1, //顶点3法向量
      
        0, 1, 0, //顶点4法向量
        0, 1, 0, //顶点5法向量
        0, 1, 0, //顶点6法向量
      ]);
    var attribute = new THREE.BufferAttribute(vertex,3);
    geometry.attributes.position = attribute;
    geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
    geometry.attributes.color = new THREE.BufferAttribute(colors,3);
    var material = new THREE.MeshBasicMaterial({
        vertexColors:THREE.VertexColors, //三角面颜色
        side: THREE.DoubleSide //两面可见
      }); //材质对象
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    //  scene.add(mesh);
     
      /**
      * 光源设置
      */
     //点光源
    //  var point = new THREE.PointLight(0xffffff);
    //  point.position.set(-400, -200, -300); 
    //  scene.add(point); 
    // 平行光
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directionalLight);
     //环境光
    //  var ambient = new THREE.AmbientLight(0x444444);
    //  scene.add(ambient);
     
     /**
      * 相机设置
      */
     var width = window.innerWidth; //窗口宽度
     var height = window.innerHeight; //窗口高度
     var k = width / height; //窗口宽高比
     var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
     //创建相机对象
     var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
     camera.position.set(200, 300, 200); //设置相机位置
     camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
     /**
      * 创建渲染器对象
      */
     var renderer = new THREE.WebGLRenderer();
     renderer.setSize(width, height);//设置渲染区域尺寸
     renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
     document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
     //执行渲染操作   指定场景、相机作为参数
     renderer.render(scene, camera);
     function render(){
         renderer.render(scene, camera);
     }
     var controls = new OrbitControls(camera, renderer.domElement);
     console.log(controls);
     controls.addEventListener('change', render);
    },[])
     
    return (
        <div>hello </div>
    )
}

export default Test;