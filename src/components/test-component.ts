import {component, field, Type} from '@lastolivegames/becsy'

@component export class ComponentTest {
    @field({type: Type.object, default: undefined}) declare value: number
}