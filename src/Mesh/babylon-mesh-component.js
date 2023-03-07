import { Type } from "@lastolivegames/becsy";
import { AbstractMesh } from '@babylonjs/core'
import { optionsBabylonMesh } from "./options-babylon-mesh";

export class ComponentBabylonMesh {
    static schema = {
        mesh: {type: Type.object, default: undefined},
        method: {type: Type.staticString(Object.keys(optionsBabylonMesh)), default: undefined}
    }
    /**
     * @type {AbstractMesh}
     */
    mesh = undefined
    /**
     * @type {string}
     */
    method = undefined
}