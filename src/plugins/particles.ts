import {Plugin} from "osbx";
import {getRandomInt} from "../constants";
import {Color} from "./background";
import {newEvent} from "dotosb";
import {Layers, Origins} from "osbx/lib/src/sprite";

export default class Particles extends Plugin {

  blend(start: number, end: number, particle_count: number, colors: Color[]) {
    const duration = end - start;
    for(let i = 0; i < particle_count; i++) {
      const particle_duration = getRandomInt(3000, 7000);
      const color = colors[getRandomInt(0, colors.length - 1)];
      const posx = getRandomInt(-107, 854);
      const sprite = this.createSprite(
        'sb/hl.png', 
        Layers.Background, 
        Origins.Centre, 
        {x: posx, y: 0}
      );
      sprite.additive(start, end);
      sprite.scale(start, getRandomInt(2, 3));
      sprite.color(start, [color.r, color.g, color.b]);
      sprite.createLoop(start, Math.floor(duration / particle_duration), [
        newEvent('MY', [0, particle_duration], [100, -400], getRandomInt(4, 20)),
        newEvent('F', [0, 1000], [0, 0.6], 0),
      ]);
      
    }
  }
}
