import "./App.css";
// import json from './json.json';
import Canvas from "./components/Canvas";
import { fabric } from "fabric";

import { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

function App() {
  const [canvas, setCanvas] = useState('');
  const [text, setText] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [objs, setObjs] = useState([]);
 
  useEffect(() => {
    const tempCanvas = initCanvas('canvas');
    if(tempCanvas){
      
      
    //   console.log(json);
    //   tempCanvas.loadFromJSON(json, function() {
    //     tempCanvas.renderAll();
    //     setObjs([1,...objs]);
    //  },function(o, object){ 
       
    //    if(object.type ==='triangle' || object.type ==='rect' || object.type ==='circle'){
    //     object.set('fill', 'red');
    //    }
    //     }); 
    setCanvas(tempCanvas);
      tempCanvas.on('object:added', function(o) {
        console.log("new object added");
        console.log(o.target.setControlsVisibility({
          bl: true,
          br: true,
          mb: false,
          ml: false,
          mr: false,
          mt: false,
          tl: true,
          tr: true,
          mtr: true,
        }));
        
        setObjs([1,...objs]);
      });
    }
    
  }, []);

  const initCanvas = (id) => { 
    return new fabric.Canvas(id, {
    height: 500,
    width: 800,
    backgroundColor: '#897ebd'
  });
  
}

////////// left panel controls ///////////////
const toggleDraw = (value) =>{
  console.log('drawing mode' + value);
  console.log(typeof value)
  canvas.isDrawingMode = value;
    canvas.renderAll();
};
  const addRect = () => {
    console.log(objs);
    console.log("add rect")
      const rect = new fabric.Rect({
        width: 100,
        height: 80,
        fill: 'green'
      });
      rect.on('selected', ()=>{
        rect.set('stroke', 'black');
        rect.set('strokeWidth', 2);
      });
      rect.on('deselected', ()=>{
        rect.set('stroke', '');
      });
      const dim = {width: rect.width, height: rect.height, radius: ''};
      setDimensions(dim);
      canvas.add(rect);
      canvas.renderAll();
 
 
  };

  const addCircle = () => {
      const circle = new fabric.Circle({
        radius: 50,
        fill: 'yellow',
        left: 120,
         top: 120,
         //lockSkewingX: true
      });
      circle.on('selected', ()=>{
        circle.set('stroke', 'black');
        circle.set('strokeWidth', 2);
      });
      circle.on('deselected', ()=>{
        circle.set('stroke', '');
      });
      const dim = {height: '', width: '', radius: circle.radius};
      setDimensions(dim);
      canvas.add(circle);
      canvas.renderAll();
  };
  const addTriangle = () => {
      const tri = new fabric.Triangle({
        width: 40,
        height: 55,
        fill: 'blue',
        left: 70, 
        top: 70
      });
      tri.on('selected', ()=>{
        tri.set('stroke', 'black');
        tri.set('strokeWidth', 2);
      });
      tri.on('deselected', ()=>{
        tri.set('stroke', '');
      });
      const dim = {width: tri.width, height: tri.height, radius: ''};
      setDimensions(dim);
      canvas.add(tri);
      canvas.renderAll();
  };

  //////////////// Right Panel Controls //////////

const changeFill = (value) => {
  const aObj = canvas.getActiveObject();
  console.log(value);
  aObj.set('fill', value);
  canvas.renderAll();
};
const changeStroke = (value) => {
  const aObj = canvas.getActiveObject();
  console.log(value);
  aObj.set('stroke', value);
  canvas.renderAll();
};
const changeDimensions = (value) => {
  const aObj = canvas.getActiveObject();
  console.log(typeof value);
  console.log(value.width);
  aObj.set('width', parseFloat(value.width));
  if(value.height){aObj.set('height', parseFloat(value.height));}
  if(value.radius){aObj.set('radius', parseFloat(value.radius));}
  setDimensions(value);
  canvas.renderAll();
}
const addImage = () => {
   fabric.Image.fromURL('https://www.ineedamobile.com/wp-content/uploads/2019/03/iphone-x-600x598.png', img => {
    img.scale(0.5).set('flipX', true);
    img.on('selected', ()=>{
      img.set('stroke', 'black');
      img.set('strokeWidth', 4);
    });
    img.on('deselected', ()=>{
      img.set('stroke', '');
    });
    canvas.add(img);
  });
  canvas.renderAll();
};
const addImg = (url) => {
  fabric.Image.fromURL(url, img => {
    img.scale(0.5).set('flipX', true);
    canvas.add(img);
    img.on('selected', ()=>{
      img.set('stroke', 'black');
      img.set('strokeWidth', 4);
    });
    img.on('deselected', ()=>{
      img.set('stroke', '');
    });
    canvas.setActiveObject(img);
  });
  canvas.renderAll();
};

const addText = () => {
  const text = new fabric.Text('Hello World', {top: 150, left: 150});
  text.on('selected', ()=>{
    setText(text.text);
  })
  canvas.add(text);
  canvas.setActiveObject(text);
  setText(text);
  const dim = {width: text.width, height: text.height, radius: ''};
  setDimensions(dim);
  
  canvas.renderAll();
};
const changeText = (value) => {
  const activeText = canvas.getActiveObject();
  activeText.text = value;
  setText(text);
canvas.renderAll();
};

const addSvg = (url) => {
  fabric.loadSVGFromURL(url, (objects, option) => {
    const obj = fabric.util.groupSVGElements(objects, option);
    obj.scale(0.5);
   canvas.add(obj);
   canvas.renderAll();

});
};

const clearCanvas =()=>{
  const objects = canvas.getObjects();
  objects.forEach(e => {
    canvas.remove(e);
  });
  setObjs([]);
};

const download = () => {
const url = canvas.toDataURL();
console.log(url);
const link = document.createElement("a");
  link.download = "canvas.png";
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  return (
    <div className="App">
      <div className="leftpanel">
        <LeftPanel
        addRect={addRect}
        addCircle={addCircle}
        addTriangle={addTriangle}
        addImage={addImage}
        addImg={addImg}
        addText={addText}
        addSvg={addSvg}
        toggleDraw={toggleDraw}
        />
        
      </div>
      <div className="canvas-view">
        <Canvas />
      </div>
      <div className="rightpanel">
        <RightPanel
        canvas={canvas}
        changeFill={changeFill}
        changeStroke={changeStroke}
        changeDimensions={changeDimensions}
        dimensions = {dimensions}
        text={text.text}
        changeText={changeText}
        clearCanvas={clearCanvas}
        objects={objs}
        download={download}
        />
      </div>
    </div>
  );
}

export default App;
