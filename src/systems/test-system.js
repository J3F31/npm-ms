import { ComponentTest } from "../components/test-component";

export default class SystemTest extends System {
    #entities = this.query(q => q.added.with(ComponentTest).read)

    execute() {
        for (let entity of this.#entities.added) {
            console.log("An entity with ComponentTest was added!")
        }
    }
}