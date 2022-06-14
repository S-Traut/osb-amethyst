import {Component, osbx} from "osbx";
import Globals from "./src/components/globals";
import Sections from "./src/components/sections";

class Main extends Component {

  init() {
    this.addComponent(Sections);
    this.addComponent(Globals);    
  }

}

osbx.create(Main);
