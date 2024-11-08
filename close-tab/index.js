import { WebTab } from "./components/tab.js";
import { ImageLib } from "./lib/lib.js";

const lib = new ImageLib("my_canvas");
const tab = new WebTab(lib, lib.c_handler.width, lib.c_handler.height);
tab.drawTab();
