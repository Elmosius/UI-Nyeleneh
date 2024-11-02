import { IconClose } from "./components/icon.js";
import { Ketapel } from "./components/ketapel.js";
import { WebTab } from "./components/tab.js";
import { ImageLib } from "./lib/lib.js";

const lib = new ImageLib("my_canvas");
// IconClose.draw(lib, 100, 100, 50, true, 10, 0 , { r: 255 });
// Ketapel.draw(lib, 300, 300, 1, 0);
// WebTab.draw(lib, 50, 50, 150, 400, 200, "Example Tab");

const tab = new WebTab(lib, lib.c_handler.width, lib.c_handler.height);
tab.drawTab();
