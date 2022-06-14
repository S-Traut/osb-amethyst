import {Plugin} from "osbx";
import {Layers, Origins, Position} from "osbx/lib/src/sprite";
import {generate_circle} from "./utils";

export default class Text extends Plugin {

  circle(text: string, start: number, end: number, position: Position) {

    generate_circle(position, 100, 25, (gpos: Position, angle: number) => {
      const sprite = this.createSprite("sb/a1.png", Layers.Background, Origins.BottomCentre, gpos);
      sprite.fade([start, end], [1, 1]);
      sprite.rotate(start, angle + Math.PI / 2);
      sprite.scale(start, 0.15);
    });

  }

}
