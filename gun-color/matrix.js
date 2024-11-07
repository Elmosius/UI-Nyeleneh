export class MatrixUtility {
    constructor(){}
    static create_identity_matrix(){
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
            ];
        }
    
    static create_translation_matrix(Tx, Ty){
        return [
            [1, 0, Tx],
            [0, 1, Ty],
            [0, 0, 1]
            ];
        }
    
    static create_rotation_matrix(angle){
        return [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
            ];
        }
    
    static create_scale_matrix(Sx, Sy){
        return [
            [Sx, 0, 0],
            [0, Sy, 0],
            [0, 0, 1]
            ];
        }
    static multiply_matrix(m1, m2) {
        var hasil = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
            ]
        
            for (var i=0; i<3; i++){
                for (var j=0; j<3; j++){
                    for (var k=0; k<3; k++){
                        hasil[i][k] += m1[i][j] * m2[j][k];
                    }
                }    
            }
            return hasil;
        }
    
    static rotation_fp(xc, yc, theta){
        var m1 = this.create_translation_matrix(-xc,-yc);
        var m2 = this.create_rotation_matrix(theta);
        var m3 = this.create_translation_matrix(xc,yc);
    
        var hasil;
        hasil = this.multiply_matrix(m3, m2);
        hasil = this.multiply_matrix(hasil, m1);
        return hasil;
        }
    
    static scale_fp(xc, yc, Sx, Sy){
        var m1 = this.create_translation_matrix(-xc,-yc);
        var m2 = this.create_scale_matrix(Sx, Sy);
        var m3 = this.create_translation_matrix(xc,yc);
    
        var hasil;
        hasil = this.multiply_matrix(m3, m2);
        hasil = this.multiply_matrix(hasil, m1);
        return hasil;
        }
    
    static transform_titik(titik_lama, m){
        var x_baru = m[0][0]*titik_lama.x + m[0][1]*titik_lama.y +m[0][2]*1;
        var y_baru = m[1][0]*titik_lama.x + m[1][1]*titik_lama.y +m[1][2]*1;
        return {x: x_baru, y: y_baru}
        }
    
    static transform_array(array_titik, m) {
        var hasil = [];
        for (var i = 0; i < array_titik.length; i++) {
            var titik_hasil = this.transform_titik(array_titik[i], m);
            hasil.push(titik_hasil);
        }
        return hasil;
    }
}
