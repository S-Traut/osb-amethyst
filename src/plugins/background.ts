import {Plugin} from 'osbx';
import { newEvent, OsbEvent } from "dotosb";
import {map_rhythms} from './utils';

export type Color = {
  r: number,
  g: number,
  b: number,
}

export default class Background extends Plugin {

  /**
  * Generate a vignette sprite from a given start to
  * an end.
  */
  setVignette(start: number, end: number) {
    const sprite = this.createSprite('sb/v.png');
    sprite.scale(start, 480.0 / 1080);
    sprite.fade([start, start + 1000], [0, 1]);
    sprite.fade([end - 1000, end], [1, 0]);
  }

  /**
   * Set a plain background with a color
   */
  setColor(start: number, end: number, color: Color) {
    const sprite = this.createSprite("sb/p.png");
    sprite.vScale(start, [854, 480]);
    sprite.fade([start, end], [1, 1]); 
    sprite.color(start, [color.r, color.g, color.b]);
  }

  flash(start: number, duration: number, intensity: number) {
    const sprite = this.createSprite("sb/p.png");
    sprite.vScale(start, [854, 480]);
    sprite.fade([start, start + duration], [intensity, 0]);
    sprite.additive(start, start + duration);
  }

  setWubSection(start: number, end: number, bg_path: string, clear_bg_path: string, blur_bg: string, snares: number[], kicks: number[]) {

    const duration = end - start;
    const snare_events: OsbEvent[] = [];
    const kick_events: OsbEvent[] = [];
    this.flash(start, 1000, 0.5);

    const background = this.createSprite(blur_bg);
    background.additive(start, end);
    background.fade([start, end], [0.5, 0.3]);
    background.scale(start, 480.0/1080);
    background.moveY([start, end], [250, 230]);
    background.rotate([start, end], [-0.02, 0.02]);

    let snares_duration = map_rhythms(snares, (current: number, old: number) => {
      snare_events.push(
        newEvent('F', [old, current], [0.6, 0], 7),     
        newEvent('S', [old, current], [0.48, 0.44444], 7),     
      );
    });

    const foreground_0 = this.createSprite(clear_bg_path);
    foreground_0.additive(start, end);
    foreground_0.moveY([start, end], [250, 230]);
    foreground_0.createLoop(start, Math.floor(duration / snares_duration), snare_events); 
    foreground_0.rotate([start, end], [-0.02, 0.02]);
    
    let kicks_duration = map_rhythms(kicks, (current: number, old: number) => {
      kick_events.push(
        newEvent('F', [old, current], [0.3, 0], 7),     
        newEvent('S', [old, current], [0.46, 0.44444], 7),     
      );
    });

    const foreground_1 = this.createSprite(clear_bg_path);
    foreground_1.additive(start, end);
    foreground_1.moveY([start, end], [250, 230]);
    foreground_1.createLoop(start, Math.floor(duration / kicks_duration), kick_events);
    foreground_1.rotate([start, end], [-0.02, 0.02]);
  }
}
