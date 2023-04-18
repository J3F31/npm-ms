import { World } from '@lastolivegames/becsy'
import entityDefinitions from './config.json'
import { createEntities } from '@moyosa/spaces'
import { WorldDefs } from '@moyosa/spaces'

const worldRef = await World.create({
   defs: [WorldDefs]
})

worldRef.build(sys => {
   createEntities(sys, entityDefinitions)
})

const run = () => {
   worldRef.execute();
   requestAnimationFrame(run);
}
run();