# altmp-js-3dtext-spawner

## Description

This adds client-side utilities to help you render attachable 3D Text.

RoadMap:
* Add container utilities. (foreach, get(id), and more...)
* Add some getters & setters. (Position, rotation)

## Instalation

1. Clone the repository.
2. Install as regular alt:v resource.

## Static Text3D Example (Not attached)

```
import ALTText3D from "altmp-js-3dtext-spawner";

ALTText3D.new(
    `~o~Orange text. ~w~White text.`,
    {
        x: 0,
        y: 0,
        z: 80
    },
    { //<-- This one is optional.
      //<-- Showing all default values
        font = 0, 
        color = [255, 255, 255, 255], 
        centre = true, 
        scale = 1, 
        maxRenderDist = 20
    }
);
```

## Dynamic Prop Example (Attached to player)

```
import alt from "alt";
import ALTText3D from "altmp-js-3dtext-spawner";

ALTText3D.new(
    `~o~Orange text. ~w~White text.`,
    () => {
        return alt.getLocalPlayer().pos;
    }
);
```

