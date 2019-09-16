 import "./test.js";
import "./fibonaci/fibonaci.js";


class Pice {
    constructor () {
        this.naziv = ''
    }
}

class Kafa extends Pice {
    constructor () {
        super();
        this.naziv = 'Kafa'
    }

    popij () {
        alert('Mmmmm... kafa')
    }
}

let mojaKafa = new Kafa()
mojaKafa.popij()


alert('Mmmmm... kafa') 