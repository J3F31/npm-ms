import { Type } from "@lastolivegames/becsy";

export class ComponentScene {
    static schema = {
        value: {type: Type.int16, default: undefined}
    }
    /**
     * @type {number}
     */
    value = 0
}