import { Type } from "@lastolivegames/becsy";

export class ComponentPosition {
    static schema = {
        x: {type: Type.float32, default: 0},
        y: {type: Type.float32, default: 0},
        z: {type: Type.float32, default: 0}
    }
    /**
     * @type {number}
     */
    x = 0
    /**
     * @type {number}
     */
    y = 0
    /**
     * @type {number}
     */
    z = 0
}