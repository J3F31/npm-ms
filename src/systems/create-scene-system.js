import { System } from "@lastolivegames/becsy";
import { ComponentBabylonScene } from "../components/babylon-scene";

export class SystemCreateScene extends System {
    scene = this.singleton.read(ComponentBabylonScene)

    initialize() {
        this.scene.value = undefined
        console.log('')
    }
}