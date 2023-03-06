import { FreeCamera, Vector3 } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { ComponentScene } from "../Scene/babylon-scene-component";
import { ComponentCamera } from "./babylon-camera-component";

export class SystemCreateCamera extends System {
    #cameras = this.query(q => q.added.with(ComponentCamera).write)
    #scenes = this.query(q => q.added.with(ComponentScene).read)

    constructor() {
        super()
        this.schedule(s => s.afterWritersOf(ComponentScene))
    }

    execute() {
        for (let camera of this.#cameras.added) {
            const sceneRead = this.#scenes.added[0].read(ComponentScene)
            const camWrite = camera.write(ComponentCamera)
            camWrite.value = new FreeCamera('camera', new Vector3(0, 0, 0), sceneRead.value)

            const camRead = camera.read(ComponentCamera)
            camRead.value.attachControl()
            camRead.value.inertia = .5
        }
    }
}