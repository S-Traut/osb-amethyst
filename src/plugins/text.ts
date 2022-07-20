import {generateTexture, getFont, Texture} from "ftgen";
import {Plugin} from "osbx";
import {Layers, Origins, Position} from "osbx/lib/src/sprite";
import {font, getRandomInt, PJ_CONSTS} from "../constants";
import {Color} from "./background";
import {generate_circle} from "./utils";

export default class Text extends Plugin {

  circle(text: string, start: number, end: number, position: Position) {

    let x = position.x;
    let delay = 0;

    const scale = 0.6;
    for(const letter of text) {

      const texture = generateTexture(font, letter);
      if(texture.isEmpty) continue;

      const fixed_position = this.getXOffsetCentre(x, texture, scale);
      const sprite = this.createSprite(
        texture.path.replace("beatmap/", ""), 
        Layers.Background, 
        Origins.Centre, 
        { x: fixed_position, y: position.y }
      );
  
      const start_time = start + delay;
      sprite.fade([start_time, end], [1, 1]);
      sprite.scale([
        start_time, 
        start + delay + getRandomInt(50, 100)
      ], [getRandomInt(1, 3), 0.6], 18);
      sprite.additive(start_time, end);
      sprite.moveX([start_time, end], [fixed_position, fixed_position - 50]);

      const sprite_end = this.createSprite(
        texture.path.replace("beatmap/", ""),
        Layers.Background,
        Origins.Centre,
        { x: fixed_position, y: position.y }
      );

      const start_time_tick = start + PJ_CONSTS.TICK_TIME * 2;
      const pop_interval = [start_time_tick, start_time_tick + 1000];
      sprite_end.fade(pop_interval, [0.6, 0]);
      sprite_end.scale(pop_interval, [1, 0.6], 19);
      sprite_end.additive(pop_interval[0], pop_interval[1]);

      const underline = this.createSprite("sb/p.png");
      underline.vScale([start_time, start_time + 1000], [0, 1, 100, 1], 19);
      underline.fade([start_time, end], [1, 1]);
      underline.moveX([start_time, end], [540, 460]);
      underline.moveY(start_time, 290)

      x += (texture.width * scale) + 8;
      delay += getRandomInt(10, 100);
    }
  }

  simple(text: string, start: number, end: number, position: Position, color: Color = PJ_CONSTS.COLORS.white) {
    
    const texture = generateTexture(font, text);
    const name = this.createSprite(
      texture.path.replace("beatmap/", ""),
      Layers.Background,
      Origins.Centre,
      position
    );
    
    name.fade([start, end], [1, 1]);
    name.vScale([start, start + 1000], [0.3, 0, 0.3, 0.3], 19);
    name.color(start, [color.r, color.g, color.b]);
    name.moveX([start, end], [position.x, position.x - 50]);
  }
  
  private getXOffsetCentre(x: number, texture: Texture, scale: number) {
    return x + (texture.width * 0.5) * scale; 
  }
}
