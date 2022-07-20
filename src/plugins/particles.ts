import {Plugin} from "osbx";
import {getRandomInt, PJ_CONSTS, SB_CONSTS} from "../constants";
import {Color} from "./background";
import {newEvent} from "dotosb";
import {Layers, Origins, Position} from "osbx/lib/src/sprite";

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

  stars(start: number, end: number) {
    const duration = end - start;
    for(let i = 0; i < 100; i++) {
      
      const position: Position = {
        x: getRandomInt(SB_CONSTS.LEFT, SB_CONSTS.RIGHT),
        y: getRandomInt(SB_CONSTS.TOP, SB_CONSTS.BOT)
      }

      const sprite = this.createSprite(
        "sb/d.png",                                
        Layers.Background, 
        Origins.Centre, 
        position
      );

      const blink_duration = getRandomInt(3000, 2000);
      sprite.createLoop(start, Math.round(duration / blink_duration), [
        newEvent("F", [0, blink_duration], [1, 0], 0)
      ]);
      sprite.scale(start, 0.03);
      
    }
  }

  gears(start: number, end: number) {
    let position: Position = {
      x: 0,
      y: 480
    }

    let delay = 0;

    while (position.y > -100) {
      
      const sprite = this.createSprite(
        `sb/g${getRandomInt(0, 6)}.png`,
        Layers.Background,
        Origins.Centre,
        position
      );

      sprite.fade([start + delay, end], [0.5, 0.5]);
      sprite.color(start + delay, [50, 50, 50]);
      sprite.rotate([start + delay, end], [0, getRandomInt(5, 15)]);
      sprite.scale([start + delay, start + delay + 300], [0.4, getRandomInt(15, 30) / 100], 19);

      position.x += getRandomInt(20, 30);
      position.y -= getRandomInt(10, 30);
      delay += 20;
    }
  }
}
