import { Type } from "@lastolivegames/becsy";
import { Camera } from "@babylonjs/core";

export class ComponentCamera {
    static schema = {
        value: {type: Type.object, default: undefined}
    }
    /**
     * @type {Camera}
     */
}