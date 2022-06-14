import {Component} from "osbx";
import {AmethystSection, PJ_CONSTS, SECTIONS_TYPES} from "../constants";
import Background from "../plugins/background";
import Text from "../plugins/text";

export default class Sections extends Component {

  private bg: Background = this.getPlugin(Background);
  private text: Text = this.getPlugin(Text);

  // in 1/1
  private pulse_rhythm_snares: number[] = [
    2, 4, 4, 4, 2, 2, 4, 4, 4, 2
  ];

  private pulse_rhythm_kicks: number[] = [
    2.5, 0.5, 2, 1, 2, 3, 0.5, 1, 1, 1, 0.5, 0.5, 0.5
  ];

  init() {
    for(const section of PJ_CONSTS.SECTIONS) {
      this.generate_section(section);
    }
  }

  private section_white(section: AmethystSection) {
    this.bg.setColor(section.start, section.end, PJ_CONSTS.COLORS.white);
    
  }

  private section_black(section: AmethystSection) {
    this.bg.setWubSection(
      section.start, 
      section.end, 
      PJ_CONSTS.SPRITES.BG_BLUR_BW, 
      PJ_CONSTS.BASE_BG,
      PJ_CONSTS.SPRITES.BG_BLUR,
      this.pulse_rhythm_snares,
      this.pulse_rhythm_kicks
    );

    this.text.circle(section.mapper, section.start, section.end, { x: 500, y: 240 });
  }

  private generate_section(section: AmethystSection) {
    switch(section.type) {
      case SECTIONS_TYPES.WHITE: this.section_white(section); break;
      case SECTIONS_TYPES.BLACK: this.section_black(section); break;
    }
  }

}
