import { World } from '@lastolivegames/becsy'
import { WorldDefs } from '@moyosa/spaces'
import entityDefinitions from './config.json'
import { createEntities } from '@moyosa/spaces'

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