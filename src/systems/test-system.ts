import { ComponentTest } from "../components/test-component";
import { system, System } from "@lastolivegames/becsy";

@system(
    s => s.afterWritersOf()
) export class SystemTest extends System {
    private entities = this.query(q => q.added.with(ComponentTest).read)

    execute(): void {
        for (const entity of this.entities.added) {
            const entityRead = entity.read(ComponentTest);
            console.log('New entity added!!!', entityRead)
        }
    }
}