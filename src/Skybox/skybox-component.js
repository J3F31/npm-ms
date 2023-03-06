import { Scene, Vector3 } from "@babylonjs/core";
import { Type, Entity } from "@lastolivegames/becsy";

export class ComponentSkybox {
    static schema = {
        assets: {type: Type.weakObject, default: undefined}
    }
    /**
	 * @type {Array<string>}
	 */
	assets = undefined
}