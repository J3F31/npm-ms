import { ComponentTest } from "../components/test-component"
import { System } from "@lastolivegames/becsy";

export class SystemTest extends System {
    #entities = this.query(q => q.added.with(ComponentTest).read)

    execute() {
        for (let e of this.#entities.added) {
            console.log('New entity added!!!')
        }
    }
}