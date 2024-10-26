// import prompt from "prompt-sync"

export default class Vertice {
    #x;
    #y;
    constructor(x,y) {
        this.#x = x
        this.#y = y
    }

    #get_x_and_y() {
        // TODO change to prompt-sync
        const x = Number(prompt("x location: "))
        const y = Number(prompt("y location: "))

        return [x,y]
    }

    get vertice(){
        return [this.#x, this.#y]
    }

    get distance() {
        return (obj) => {
            const [x,y] = obj.vertice
            return Math.pow((this.#x - x)**2 + (this.#y - y)**2, 1/2) }
        }

    move() {
        const [x,y] = this.#get_x_and_y()
        this.#x = x
        this.#y = y
    }

    equal(vertice) {
        const dist = this.distance
        return dist(vertice) === 0
    }
}

let v1 = new Vertice(1,1)
let v2 = new Vertice(4,5)
let v3 = new Vertice(1,1)

//console.log(v1.equal(v3))
//console.log(v1.distance(v2))
//v1.move()
//console.log(v1.vertice)

