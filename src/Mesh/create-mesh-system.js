import { System } from "@lastolivegames/becsy";
import { ComponentScene } from "../Scene/babylon-scene-component";
import { ComponentPosition } from "../Transforms/position-component";
import { ComponentBabylonMesh } from "./babylon-mesh-component";
import { optionsBabylonMesh } from "./options-babylon-mesh";
import { MeshBuilder } from "@babylonjs/core";

export class SystemCreateMesh extends System {
    #entities = this.query(q => q.added.with(ComponentBabylonMesh).write.using(ComponentPosition).read)
    #scenes = this.query(q => q.added.with(ComponentScene).read)

    constructor() {
        super()
        this.schedule(s => s.afterWritersOf(ComponentScene))
    }

    execute() {
        for (let entity of this.#entities.added) {
            const sceneRead = this.#scenes.added[0].read(ComponentScene)
            const entityWrite = entity.write(ComponentBabylonMesh)

            switch (entityWrite.method) {
                case Object.keys(optionsBabylonMesh)[0]:
                    entityWrite.mesh = MeshBuilder.CreateBox('', {}, sceneRead.value);
                    break;
                case Object.keys(optionsBabylonMesh)[1]:
                    entityWrite.mesh = MeshBuilder.CreateSphere('', {}, sceneRead.value);
                    break;
                default:
                    console.warn(`The mesh could not be created`);
            }
            if (!entity.has(ComponentPosition)) return
            const entityRead = entity.read(ComponentBabylonMesh)
            const posRead = entity.read(ComponentPosition)
            entityRead.mesh.position.set(posRead.x, posRead.y, posRead.z)
        }
    }
}