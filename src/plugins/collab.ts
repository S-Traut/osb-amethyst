import {Plugin} from "osbx";

interface CollabSectionsCallback<T> {
  (section: T, plugin: Collab): void
}

export default class Collab extends Plugin {

  generate_sections<T>(sections: T[], callback: CollabSectionsCallback<T>) {
    for(const section of sections) {
      callback(section, this);
    } 
  }
}
