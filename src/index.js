import { World } from '@lastolivegames/becsy'
import entityDefinitions from './config.json'
import { createEntities, WorldDefs } from '@moyosa/spaces'

const worldRef = await World.create({
   defs: [WorldDefs]
})

worldRef.build(sys => {
   createEntities(sys, entityDefinitions.entities)
})

const run = () => {
   worldRef.execute();
   requestAnimationFrame(run);
}
run();