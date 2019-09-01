 import "./test.js";
import "./testfolder/hoho.js";
import "./testfolder/test2.js";


class Piћe {
    constructor () {
        this.naziv = ''
    }
}

class Kafa extends Piћe {
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