import { ComponentTest } from "../components/test-component"
import { System } from "@lastolivegames/becsy";
import { ComponentBabylonScene } from "../components/babylon-scene";

export class SystemTest extends System {
    test = this.singleton.write(ComponentTest)

    initialize() {
        console.log("Testing a component!!!")
        this.test.value = 2
    }
}