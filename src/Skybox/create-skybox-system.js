import { CubeTexture, MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { ComponentBabylonMesh } from "../Mesh/babylon-mesh-component";
import { ComponentScene } from "../Scene/babylon-scene-component";
import { ComponentPosition } from "../Transforms/position-component";
import { ComponentSkybox } from "./skybox-component";

export class SystemCreateSkybox extends System {
    #entities = this.query(q => q.added.with(ComponentSkybox).read)
    #scenes = this.query(q => q.added.with(ComponentScene).read)

    constructor() {
        super()
        this.schedule(s => s.afterWritersOf(ComponentScene))
    }

    execute() {
        for (let entity of this.#entities.added) {
            const sceneRead = this.#scenes.added[0].read(ComponentScene)
            // const posRead = entity.read(ComponentPosition)
            const meshRead = entity.read(ComponentBabylonMesh)
            const entityRead = entity.read(ComponentSkybox)
            console.log('New entity ComponentSkybox added with name: ', 'name')

            const skybox = MeshBuilder.CreateBox('name', {size: 10}, sceneRead.value)
            // skybox.position.set(e.position[0], e.position[1], e.position[2])
            const skyboxMat = new StandardMaterial('name', sceneRead.value)
            skyboxMat.backFaceCulling = false
            skyboxMat.disableLighting = true
            skyboxMat.reflectionTexture = CubeTexture.CreateFromImages([
                entityRead.assets[0], entityRead.assets[1], entityRead.assets[2], entityRead.assets[3], entityRead.assets[4], entityRead.assets[5]
            ], sceneRead.value, true)
            skyboxMat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
            skybox.material = skyboxMat
        }
    }
}