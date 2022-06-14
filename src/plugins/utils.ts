import {Plugin} from "osbx";
import {Position} from "osbx/lib/src/sprite";
import {PJ_CONSTS} from "../constants";

export default class Utils extends Plugin {

  removeBackground(path: string): void {
    this.createSprite(path).fade(0, 0);
  }

}

export function map_rhythms(rhythms: number[], callback: Function): number {
  let duration = 0;
  let old_value = 0;
  rhythms.map(e => {
    const value = e * PJ_CONSTS.TICK_TIME;
    duration += value;
    callback(duration, old_value);
    old_value = duration;
  }, duration);
  return duration;
}

export function generate_circle(position: Position, radius: number, element_count: number, callback: Function) {
  const inc = (Math.PI * 2) / element_count;
  for(let i = 0; i < Math.PI * 2; i += inc) {
    const element_position = {
      x: position.x + Math.cos(i) * radius,
      y: position.y + Math.sin(i) * radius,
    };

    callback(element_position, i);
  }
}
