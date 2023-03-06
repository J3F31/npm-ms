import { Type } from "@lastolivegames/becsy";

export class ComponentScene {
    static schema = {
        value: {type: Type.weakObject, default: undefined}
    }
    /**
     * @type {Scene}
     */
    value = undefined
}