import {component, field, Type} from '@lastolivegames/becsy'

@component class ComponentTest {
    @field({type: Type.boolean, default: false}) declare value: boolean;
}