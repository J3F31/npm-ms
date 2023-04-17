<details>
<summary style="font-size: 30px; font-weight: bold;"> Summary </summary>

## Description

This is a code package used for the development of Moyosa Spaces.
It is coded with Javascript, Babylon.js and Becsy ECS. <br>
[Becsy documentation](https://lastolivegames.github.io/becsy/) <br>
[Babylon main page](https://www.babylonjs.com/) <br>
[Babylon documentation](https://doc.babylonjs.com/) <br>

## Modules

This package uses modules to divide scripts, each module has a descriptive title of it's content.
For a detailed overview of the modules check out [this figma file](https://www.figma.com/file/lY0LF6FVY5E6ImkDbVjbbl/Thesis?node-id=0%3A1&t=0DHrVB6j6mPdrQXQ-1).

## Terminology

| ECS Terms | Description |
|-----------|-------------|
| Component | A component is an object that can store data but should have no behavior. |
| System    | Systems are used to transform data stored on the components. |
| Entity    | An entity is an object that has a unique ID, very much like a JavaScript object. Its purpose is to group components together; it may have up to one component of each type. |
| Prefab    | A prefab is the default form of a specific entity. Entities with a prefab reference will take any component and value missing from the prefab. |
| World     | A world is basically a container for entities, components and systems, and you'll usually want to have exactly one in your application. |
s
See more in [becsy docs](https://lastolivegames.github.io/becsy/)

| Terms     | Description |
|-----------|-------------|
| Hotspot   | An hotspot is an object in the 3D world that is clickable and does something when clicked. |
| Waypoint  | A waypoint is a kind of hotspot. When clicking these hotspots, it moves the camera to that position. |

</details>

<details>
<summary style="font-size: 30px; font-weight: bold;"> Development </summary>

> This section is about how to add, remove or edit code in the package.

## Test project



## Dependencies

This package is using `@babylonjs/core` and `@lastolivegames/becsy`. Update the versions of these in `package.json` if necessary.

## Versioning

The `version.sh` script saves different versions of the code package.
Use semantic versioning and add a description to clarlify what the new version is for.
```
npm run version [option] {message}
```
In the [option] argument use "major" for a full release, "minor" for a specific function implementation and "patch" for small edits.
Follow with a meaningful commit description in the {message} argument.
```
npm run version help
```
A version summary of all past updates is visible in `version.md`.

</details>

<details>
<summary style="font-size: 30px; font-weight: bold;"> Usage </summary>

> This section is about how to use the package in a new project.

## Setup

## ECS Imports

An `ecs-defs.js` file exists with all the **Components** and **Systems** in the code package.
There is no need to import any of the **Components** or **Systems**, although you can if you wish to reuse a specific one.
Import the `ecs-defs.js` in order to create your **ECS World**.
```
import { World } from '@lastolivegames/becsy'
import { WorldDefs } from '@moyosa/spaces/src'

const WorldRef = await World.create({
    defs: [WorldDefs]
})
```

## Entities

**Entities** hold **Components** and allow **Systems** to interact with them. Elements in the scene are defined by these **Entities**.
Some entities can be repeated multiple time, but with different data values. **Prefabs** define the base entity for an element, and are used not to repeat a lot of text.
Create a `config.json` file in the src folder with this structure. Add specific **Entities** in the "entities" group to create them in the **World**.
```
{
    "entities": {

    },
    "prefabs": {
        
    }
}
```

# Camera entity

> The `ComponentCamera` attributes which define the field of view are set to these values as default. You can ommit the attributes if these are the values you need. Otherwise, add the attribute with a new value to overwrite it.

```
"Camera": {
    "ComponentCamera": {"fov": 70, "defaultFov": 80, "minFov": 45, "maxFov": 80, "fovMode": 0},
    "ComponentBabylonNode": {},
    "ComponentPosition3D": {"x": 0, "y": 10, "z": 0},
    "ComponentEulerRotation": {"x": 0, "y": 0, "z": 0},
    "ComponentLookAround": {"lookVelocityX": 1, "lookVelocityY": 1},
    "ComponentCameraZoom": {},
    "ComponentZoomVelocity": {"value": 1}
},
```

# Waypoiny entity

> Add `"ComponentCurrentWaypoint": {}` to only one **Waypoint Entity**. This will define the starting position.

```
"Waypoint": {
    "prefab": "waypoint",
    "ComponentCurrentWaypoint": {},
    "ComponentName": {"value": "scene0"},
    "ComponentWaypoint": {"cameraPositionX": 0, "cameraPositionY": 0, "cameraPositionZ": 0},
    "ComponentPosition3D": {"x": 0, "y": 0, "z": 0}
},
```

# Cubemap entity

> The **System** which creates the cubemaps will look into `/assets/cubemaps/` for cubemap assets. The specific cubemap entity defines the component and asset name with the name attribute. For instance scene0.

```
"Cubemap": {
    "ComponentEnvironmentCubemap": {"name": "scene0", "projectionPositionX": 0, "projectionPositionY": 0, "projectionPositionZ": 0}
},
```

# Waypoint prefab

> Add only one instance of the **Waypoint** to the **Prefab** group. The values set here will be the default ones for any waypoint **Entity** with `"prefab": "waypoint"`.

```
"waypoint": {
    "ComponentName": {"value": "waypoint prefab"},
    "ComponentWaypoint": {"cameraPositionX": 0, "cameraPositionY": 1.65, "cameraPositionZ": 0},
    "ComponentPosition3D": {"x": 13.28592041, "y": 0, "z": -0.00092},
    "ComponentEulerRotation": {"x": 1.570796326794897, "y": 0, "z": 0},
    "ComponentHotspot": {},
    "ComponentRingHotspot": {"type": 0, "addHoloGlow": true, "color": [0, 1, 1]}
}
```

## World

In your **World** creation file or `index.js` add the following template in order to create **Entities** from `config.json` and read **Components** as **Systems** from `ecs-defs.js` *(edit import paths if necessary)*
```
import { World } from '@lastolivegames/becsy'
import { WorldDefs } from '@moyosa/spaces/src/ecs-defs'
import entityDefinitions from './config.json'
import { iterateOverConfig } from '@moyosa/spaces'

const worldRef = await World.create({
   defs: [WorldDefs]
})

worldRef.build(sys => {
   iterateOverConfig(sys, entityDefinitions.entities)
})

const run = () => {
   worldRef.execute();
   requestAnimationFrame(run);
}
run();
```
</details>