import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols';
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
console.log(THREE);
// console.log(OrbitControls);
// console.log(THREE.OrbitControls);
// 前-红色
// 后-白色
// 左-紫
// 右-橙色
// 顶-绿色
// 底-蓝色
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
        let dom = document.getElementById('container');

        var width = dom.offsetWidth; //窗口宽度
        var height = dom.offsetHeight; //窗口高度
        var axisHelper = new THREE.AxisHelper(100);
        scene.add(axisHelper);
        var geometry = new THREE.CylinderGeometry(10,20,100,32);
        var material = new THREE.MeshBasicMaterial({
            color:0x0000ff,
            wireframe:true
        });
        var mesh = new THREE.Mesh(geometry, material);
        // var boxGeometry = new THREE.BoxGeometry(20,20,20);
        // var boxMaterial = new THREE.MeshBasicMaterial({
        //     color:0x00ff00,
        // });
        // let matArray = [];
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFF7F50}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0x00ffff}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0x0000ff}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0x0000ff}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0x0000ff}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0x0000ff}));

        // var boxMesh = new THREE.Mesh(boxGeometry, matArray);
        // boxMesh.translateX(100);
        // scene.add(mesh);
        // scene.add(boxMesh);
        // 添加轮廓模型
       
        var shape = new THREE.Shape();
        shape.moveTo(-100,100);
        shape.lineTo(100,100);
        shape.lineTo(100,-100);
        shape.lineTo(-100,-100);
        shape.closePath();
//        
        var shapeGeometry = new THREE.ExtrudeGeometry(
            shape,
            {
                amount:50,
                // extrudePath:curve,
                bevelEnabled:false
            }
        );
        var shapeMeterial = new THREE.MeshBasicMaterial({
            color:0x00ff00,
            wireframe:true
        });
        var shapeGeometry2 = new THREE.ExtrudeGeometry(
            shape,
            {
                amount:10,
                bevelEnabled:false
            }
        );
        var shapeMeterial2 = new THREE.MeshBasicMaterial({
            color:0xff0000,
            wireframe:true
        });
        var shapeMesh = new THREE.Mesh(shapeGeometry, shapeMeterial);
        // shapeGeometry.translate(0,0,10);
        var shapeMesh2 = new THREE.Mesh(shapeGeometry2, shapeMeterial2);
        // var group = new THREE.Group();
        // group.add(shapeMesh, shapeMesh2);
        // group.position.set(0,0,10);
        // scene.add(group);
        // console.log(group);

        shapeGeometry.computeBoundingBox();
        console.log(shapeGeometry.boundingBox);
        console.log(shapeGeometry.boundingBox.getCenter());
        var group = new THREE.Group();
        group.add(shapeMesh, shapeMesh2);
        // group.scale.set(2,2,2);
        var box = new THREE.Box3();
        box.expandByObject(group);
        console.log(box);
        console.log(group);
        scene.add(group);

        var loader = new OBJLoader();
        loader.load('/static/ceshi3.obj',object=>{
            console.log(object);
            let mesh = object.children[0];
            mesh.geometry.computeBoundingBox();
            mesh.geometry.center();
            // mesh.position.set(0,0,30);

            // mesh.rotateX(Math.PI/2);
            let box = mesh.geometry.boundingBox;

            var prevX = Math.abs(box.min.x - box.max.x);
            var prevY = Math.abs(box.min.y - box.max.y);
            var prevZ = Math.abs(box.min.z - box.max.z);
            var nowZ = 1/(prevZ/40);

            mesh.rotateX(Math.PI/2);
            // mesh.position.set(0,0,);
            console.log(nowZ);
            // mesh.scale.set(nowZ,nowZ,nowZ);
            console.log(box.min.z);
            // mesh.translate(0,0,Math.abs(box.min.z));
            console.log(mesh.geometry.boundingBox);
            console.log(mesh.geometry.boundingBox.getCenter());
            var xRatio = prevX / prevZ;
            var yRatio = prevY / prevZ;
            console.log(prevX, prevY, prevZ);
            // mesh.scale.set(xRatio * nowZ, yRatio*nowZ, nowZ);
            // mesh.geometry.translate(0,0,10);
            // mesh.translateZ(10);
            // mesh.geometry.rotateX(Math.PI/2);

            scene.add(object);
            
            render();

            
        })
        var point = new THREE.PointLight(0xffffff);
     point.position.set(200, 300, 100); 
     scene.add(point);
     /**
      * 相机设置
      */
     // console.log(dom.innerWidth);
     
     var k = width / height; //窗口宽高比
     var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
     //创建相机对象
    //  var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    var camera = new THREE.PerspectiveCamera(60, width/height, 1, 1000); 
         camera.up.set(0,1,0);

    camera.position.set(0,0,300); //设置相机位置
     camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
     // console.log(camera);
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