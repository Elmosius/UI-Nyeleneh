export default class MatrixUtility {
    static createRotationMatrix(angle) {
        return [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ];
    }

    static transformDot(dot, matrix) {
        const new_x = matrix[0][0] * dot.x + matrix[0][1] * dot.y;
        const new_y = matrix[1][0] * dot.x + matrix[1][1] * dot.y;
        return { x: new_x, y: new_y };
    }

    static transformArray(dotArray, matrix) {
        return dotArray.map(dot => this.transformDot(dot, matrix));
    }
}
