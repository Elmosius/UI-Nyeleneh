import { IconClose } from "./components/icon.js";
import { Ketapel } from "./components/ketapel.js";
import { ImageLib } from "./lib/lib.js";

const lib = new ImageLib("my_canvas");
IconClose.draw(lib, 100, 100, 50, true);
Ketapel.draw(lib, 300, 300, 1, 0);
