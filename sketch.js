var canvas = document.getElementById("main");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };


const createScene =  () => {
    const scene = new BABYLON.Scene(engine);

    BABYLON.SceneLoader.ImportMesh(
        null,
        "",
        "./models/gato.glb",
        scene,
        function () {          
            scene.createDefaultCameraOrLight(true, true, true);
            scene.createDefaultEnvironment();        
    });

    return scene;
}


window.initFunction = async function() {
    
    
    var asyncEngineCreation = async function() {
        try {
        return createDefaultEngine();
        } catch(e) {
        console.log("the available createEngine function failed. Creating the default engine instead");
        return createDefaultEngine();
        }
    }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene        
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
