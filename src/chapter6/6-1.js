import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols';
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
console.log(THREE);
// console.log(OrbitControls);
// console.log(THREE.OrbitControls);

function createWallMesh(option){
    var shape = new THREE.Shape();
    var width = option.width || 500,height = option.height || 340, deepth= option.deepth || 14;
    var offset = option.offset || 20, doorWidth = option.doorWidth || 80;
    // 左下角内轮廓的点沿着逆时针方向绘制
    shape.moveTo(-(width/2 - deepth - offset),-(height/2 - deepth));
    shape.lineTo(-(width/2 - deepth),-(height/2 - deepth));
    shape.lineTo(-(width/2 - deepth), height/2 - deepth);
    shape.lineTo(width/2 - deepth, height/2 - deepth);
    shape.lineTo(width/2 - deepth, -(height/2 - deepth));
    shape.lineTo(-(width/2 - deepth - offset - doorWidth), -(height/2 - deepth));
    shape.lineTo(-(width/2 - deepth - offset - doorWidth), -height/2);
    shape.lineTo(width/2, -height/2);
    shape.lineTo(width/2, height/2);
    shape.lineTo(-width/2, height/2);
    shape.lineTo(-width/2, -height/2);
    shape.lineTo(-(width/2 - deepth - offset), -height/2);
    shape.closePath();
    // var shape2 = new THREE.Shape();
    // shape2.moveTo();
    // shape2.lineTo(-width/3, height/3);
    // shape2.lineTo(width/3,height/3);
    // shape2.lineTo(width/3, -height/3);
    // shape2.closePath();
    var geometry = new THREE.ExtrudeGeometry(shape,{
        amount:option.amount || 0,
        bevelEnabled:false
    });
    var material = new THREE.MeshLambertMaterial({
        color: option.color ,
        transparent:true,
        opacity: option.opacity || 0.5
    })
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function createDoorMesh(option){
    var shape = new THREE.Shape();
    var x = option.boxWidth / 2 - option.offset,y = option.boxHeight / 2 - option.deepth;
    shape.moveTo(-x,-y);
    shape.lineTo(-x + option.doorWidth, -y);
    shape.lineTo(-x + option.doorWidth,-(y + option.deepth));
    shape.lineTo(-x, -(y+option.deepth));
    shape.closePath();
    var geometry = new THREE.ExtrudeGeometry(shape,{
        amount:option.amount || 0,
        bevelEnabled:false
    });
    var material = new THREE.MeshBasicMaterial({
        color: option.color ,
        transparent:true,
        opacity: option.opacity || 0.5
    })
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function Test(){
    /**
     * 创建场景对象Scene
     */
    useEffect(()=>{
        var scene = new THREE.Scene();
        var shape = new THREE.Shape();
        var geometry = new THREE.PlaneGeometry(200,100);
        var wallMesh = createWallMesh({
            amount:140,
            color:0x1f819f,
            opacity:0.8
        });
        var stageMesh = createWallMesh({
            width:510,
            height:350,
            deepth:24,
            offset:15,
            amount:15,
            color:0xffffff,
            opacity:1
        });
        var doorMesh = createDoorMesh({
            boxWidth:500,
            boxHeight:340,
            offset:34,
            deepth:14,
            doorWidth:80,
            amount:140,
            color:0x000203,
            opacity:0.8
        });
        var group = new THREE.Group();
        stageMesh.translateZ(-15);
        group.add(wallMesh, stageMesh, doorMesh);
        // group.rotateX(-90);
        scene.add(group);
        var loader = new OBJLoader();
        loader.load('/static/camera.obj',object=>{
            console.log(object);
            // obj.scale.set(200,200,200);
            // center保存变换之前的坐标轴中心点
            // var center = new THREE.Vector3();
            // console.log(object.children[0].geometry.computeBoundingBox());
            // console.log(object.children[0].geometry.boundingBox.getCenter(center));
            // console.log(center);
            // object.children[0].geometry.center();
            // object.children[0].geometry.rotateX(Math.PI/2);
            // 多个模型组合
            if ( object.children && object.children.length){
                object.children.forEach(mesh=>{               
                    if ( mesh.name === '摄像头') {
                        console.log(mesh);
                        mesh.geometry.computeBoundingBox();
                        mesh.geometry.center();
                        let cameraWidth = Math.abs(mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x);
                        console.log(cameraWidth);
                        // mesh.geometry.rotateX(Math.PI/2);
                        // mesh.geometry.position = new THREE.Vector3(-250,0,100);
                        mesh.position.x = -236;
                        mesh.position.y = 0;
                        mesh.position.z = 100;
                        mesh.geometry.scale(0.8,0.8,0.8);
                        mesh.geometry.rotateX(Math.PI/2);
                        mesh.geometry.translate(Math.abs(mesh.geometry.boundingBox.max.x), 0,0 );
                        console.log(mesh.geometry.boundingBox);
                        // mesh.scale.set(0.5,0.5,0.5);
                        scene.add(mesh);
                    } else if ( mesh.name === '变压器') {
                        mesh.geometry.computeBoundingBox();
                        mesh.geometry.center();
                        scene.add(mesh);
                    }
                    // mesh.geometry.rotateX(Math.PI/2);
                    // console.log(mesh.geometry.boundingBox);
                })
            }
            // object.rotateX(Math.PI/2);
            // object.rotateX(Math.PI/2);
            render();
            let a = 0;
            setTimeout(()=>{
                camera.position.set(0,300,300);
                // camera.rotateX(Math.PI/16);
                render();
               //  function motion(){
               //      a = a + 0.05;
               //      // console.log(a);
               //      if ( a >= Math.PI/3) {
               //          console.log('close');
               //          console.log(scene.position);
               //          window.cancelAnimationFrame(timer);

               //      } else {
               //          console.log(-a);
               //          scene.rotateX(-0.05);
               //          render();
               //          window.requestAnimationFrame(motion);
               //      }
               //  }               
               // let timer = window.requestAnimationFrame(motion);
            },2000)
        })
     //点光源
     var point = new THREE.PointLight(0xffffff);
     point.position.set(200, 300, 100); 
     scene.add(point);
    
    // 平行光
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0,-100,500);
    directionalLight.target = wallMesh;
    scene.add(directionalLight);
    // directionalLight.castShadow = true;

     //环境光
    //  var ambient = new THREE.AmbientLight(0x444444);
    //  scene.add(ambient);
     
     /**
      * 相机设置
      */
     let dom = document.getElementById('container');
     console.log(dom.innerWidth);
     var width = dom.offsetWidth; //窗口宽度
     var height = dom.offsetHeight; //窗口高度
     var k = width / height; //窗口宽高比
     var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
     //创建相机对象
    //  var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    var camera = new THREE.PerspectiveCamera(60, width/height, 1, 1000); 
    camera.position.set(0, 0, 600); //设置相机位置
     camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
     console.log(camera);
     /**
      * 创建渲染器对象
      */
     var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
     renderer.setSize(width, height);//设置渲染区域尺寸
     renderer.setClearColor(0x000000, 0);
    //  renderer.setClearColor(0x041723, 1); //设置背景颜色
     dom.appendChild(renderer.domElement); //body元素中插入canvas对象
     //执行渲染操作   指定场景、相机作为参数
     render();
     function render(){
         renderer.render(scene, camera);
     }
     console.log(OrbitControls);
     var controls = new OrbitControls(camera, renderer.domElement);
     controls.addEventListener('change', render);
    },[])
     
    return (
        <div id='container' style={{ position:'absolute', width:'100%', height:'100%' }}></div>
    )
}

export default Test;