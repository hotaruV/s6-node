function schemaGen() {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result1= ' ';
    for ( let i = 0; i < 6; i++ ) {
        if (i==2) {
            result1 += '-'
        }else{
            result1 += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }
    return result1;
}

module.exports = schemaGen