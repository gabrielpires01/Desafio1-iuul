import prompt_sync from "prompt-sync";

const prompt = prompt_sync({
    sigint: true,
});
export class Vertice {
    #x;
    #y;
    constructor(default_x, default_y) {
        if (default_x && default_y) {
            this.#x = default_x;
            this.#y = default_y;
        } else {
            const [x, y] = this.#get_x_and_y();
            this.#x = x;
            this.#y = y;
        }
    }

    #get_x_and_y() {
        let x, y;
        while (true) {
            x = Number(prompt("X location: "));

            if (Number.isNaN(x)) {
                console.log("Invalid X input");
            } else {
                break;
            }
        }
        while (true) {
            y = Number(prompt("Y location: "));

            if (Number.isNaN(y)) {
                console.log("Invalid Y input");
            } else {
                break;
            }
        }

        return [x, y];
    }

    get vertice() {
        return [this.#x, this.#y];
    }

    get distance() {
        return (obj) => {
            const [x, y] = obj.vertice;
            return Math.pow((this.#x - x) ** 2 + (this.#y - y) ** 2, 1 / 2);
        };
    }

    move() {
        console.log("Move to: ");
        const [x, y] = this.#get_x_and_y();
        this.#x = x;
        this.#y = y;
    }

    equal(vertice) {
        const dist = this.distance;
        return dist(vertice) === 0;
    }
}

//console.log("Questão 1:")
//console.log("Vertice 1:")
//let v1 = new Vertice()
//console.log("Vertice 2:")
//let v2 = new Vertice()
//console.log("Vertice 3:")
//let v3 = new Vertice()
//
//console.log("V1 == V3: " + v1.equal(v3))
//console.log("Distance V1 to V2: " + v1.distance(v2))
//v1.move()
//console.log("V1: " + v1.vertice)
//
//console.log("Fim da Questão 1")
