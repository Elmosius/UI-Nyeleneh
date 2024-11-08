// menggunakan bantuan AI
export default class MatrixUtility {
    static applyCurtainEffect(imageLib, curtainHeight) {
        imageLib.curtainHeight = curtainHeight;
        imageLib.drawCurtain();
    }
}
