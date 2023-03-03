import { Type } from "@lastolivegames/becsy"

export class ComponentTest {
    static schema = {
        value: {type: Type.int32, default: 0}
    }
    /**
	 * @type {number}
	 */
	value = 0
}