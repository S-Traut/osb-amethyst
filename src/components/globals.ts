import {Component} from "osbx";
import {PJ_CONSTS} from "../constants";
import Background from "../plugins/background";
import Utils from "../plugins/utils";

export default class Globals extends Component {

  private utils = this.getPlugin(Utils);
  private bg = this.getPlugin(Background);

  background() {
    this.utils.removeBackground(PJ_CONSTS.BASE_BG);
        
  }

  foreground(): void {
    this.bg.setVignette(1245, 301245);
  }

}
