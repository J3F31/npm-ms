import { System } from "@lastolivegames/becsy";
import { Scene, Engine, Vector3, Color3, PointLight, CubeTexture, MeshBuilder, StandardMaterial, Texture } from '@babylonjs/core'
import { ComponentScene } from "./babylon-scene-component";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

export class SystemCreateBabylonScene extends System {
    #scenes = this.query(q => q.added.with(ComponentScene).write)

    execute() {
        for (let s of this.#scenes.added) {
            const sceneWrite = s.write(ComponentScene)
            const canvas = document.createElement('canvas');
            canvas.style.width = 100 + 'dvw';
            canvas.style.height = 100 + 'dvh';
            document.body.append(canvas)

            const engine = new Engine(canvas);
            const scene = new Scene(engine);

            // scene.skipPointerDownPicking = true;
            // scene.skipPointerMovePicking = true;
            // scene.skipPointerUpPicking = true;
            scene.useRightHandedSystem = true;
            scene.clearColor.set(.1, .1, .1, 1);

            sceneWrite.value = scene;

            // const light = new HemisphericLight('hemiLight', new Vector3(1, 0, 0), scene);
            // const light = new DirectionalLight("dirLight", new Vector3(-1, 0, -.7), scene);
            const light = new PointLight('pointLight', new Vector3(0, 0, 0), scene);
            light.diffuse = new Color3(1, .8, .7);
            ////light.groundColor = new Color3(0, 0, 0);
            light.specular = new Color3(0, 0, 0);
            light.intensity = 5;

            engine.runRenderLoop(() => {
                scene.render();
            });
            
            window.addEventListener("resize", () => {
                engine.resize();
            });

            // if (!this.scene.showInspector) return
            scene.debugLayer.show({
                embedMode: true
            });
        }
    }
}