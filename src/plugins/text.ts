import {generateTexture, getFont, Texture} from "ftgen";
import {Plugin} from "osbx";
import {Layers, Origins, Position} from "osbx/lib/src/sprite";
import {font, PJ_CONSTS} from "../constants";
import {generate_circle} from "./utils";

export default class Text extends Plugin {

  circle(text: string, start: number, end: number, position: Position) {

    let x = position.x;
    const scale = 0.6;

    for(const letter of text) {

      const texture = generateTexture(font, letter);
      if(texture.isEmpty) continue;

      const fixed_position = this.getXOffsetCentre(x, texture, scale);
      const name = this.createSprite(
        texture.path.replace("beatmap/", ""), 
        Layers.Background, 
        Origins.Centre, 
        { x: fixed_position, y: position.y }
      );

      name.fade([start, end], [1, 1]);
      name.additive(start, end);
      name.vScale([start, start + 1000], [scale, 0, scale, scale], 19);

      x += (texture.width * scale) + 8;
    }
  }

  simple(text: string, start: number, end: number, position: Position) {
    const texture = generateTexture(font, text);
    const name = this.createSprite(texture.path.replace("beatmap/", ""));
    name.color(start, [0, 0, 0]);
    name.fade([start, end], [1, 1]);
    name.additive(start, end);
    name.vScale([start, start + 1000], [0.6, 0, 0.6, 0.6], 19);
  }
  
  private getXOffsetCentre(x: number, texture: Texture, scale: number) {
    return x + (texture.width * 0.5) * scale; 
  }
}
