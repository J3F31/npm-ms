import {World, Type} from '@lastolivegames/becsy'
import {worldDefs} from './ecs-defs'
import entityDefs from './config.json'

const worldRef = await World.create({
    defs: [worldDefs]
})

const findComponentInWorldDefs = (id) => {
    let component = undefined;
    for (const val in worldDefs) {
        if (worldDefs[val].name == id) component = worldDefs[val];
    }
    if (component == undefined) console.warn(`could not find component ${id}`);
    return component;
}

worldRef.build(sys => {
    const savedEntities = {}
    for (const [name, components] of Object.entries(entityDefs.entities)) {
        const entity = sys.createEntity();
        for (let [componentName, componentProperties] of Object.entries(components)) {
            savedEntities[name] = entity;

            const component = findComponentInWorldDefs(componentName);
            for (let fieldName in componentProperties) {
                if(component.schema[fieldName] === Type.ref || component.schema[fieldName].type === Type.ref) {
                    componentProperties[fieldName] = savedEntities[componentProperties[fieldName]]
                }
            }
            entity.add(component, componentProperties);
        }
    }
})

const run = () => {
    worldRef.execute();
    requestAnimationFrame(run);
}
run();