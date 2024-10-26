// import prompt from "prompt-sync"
import Vertice from "./questao1.js";

const types = {
    1: "Escaleno",
    2: "Isóceles",
    3: "Equilátero",
};

class Triangle {
    #v1;
    #v2;
    #v3;

    constructor(v1, v2, v3) {
        if (this.#validate_triangle(v1,v2,v3)) {
            throw Error("Not a triangle");
        }
        this.#v1 = v1;
        this.#v2 = v2;
        this.#v3 = v3;
        this.sides = this.#sides();
    }

    #validate_triangle(v1, v2, v3) {
        return (
            v1.distance(v2) === 0 ||
            v1.distance(v3) === 0 ||
            v2.distance(v3) === 0
        );
    }

    #sides() {
        const lado_a = this.#v1.distance(this.#v2);
        const lado_b = this.#v1.distance(this.#v3);
        const lado_c = this.#v3.distance(this.#v2);
        return [lado_a, lado_b, lado_c];
    }

    get perimeter() {
        const sides = this.sides;

        return sides.reduce((acc, cur) => acc + cur, 0);
    }

    get vertices() {
        return [this.#v1, this.#v2, this.#v3];
    }

    get area() {
        const sides = this.sides;
        const s = this.perimeter / 2;

        return Math.pow(
            s * (s - sides[0]) * (s - sides[1]) * (s - sides[2]),
            1 / 2
        );
    }

    type() {
        let equal_sides = 1;
        const sides = this.sides;
        if (sides[0] === sides[1]) equal_sides++;
        if (sides[0] === sides[2]) equal_sides++;
        if (equal_sides !== 3 && sides[1] === sides[2]) equal_sides++;

        return types[equal_sides];
    }

    equals(triangle) {
        const triangle_vertices = triangle.vertices;
        return triangle_vertices.every((vertice) =>
            this.vertices.some((v) => v.equal(vertice))
        );
    }

    clone() {
        return new Triangle(this.#v1, this.#v2, this.#v3);
    }
}

let v1 = new Vertice(0, 0);
let v2 = new Vertice(3, 4);
let v3 = new Vertice(3, 0);

const tri1 = new Triangle(v1, v2, v3);

let v4 = new Vertice(1, 1);
let v5 = new Vertice(4, 5);
let v6 = new Vertice(2, 2);

const tri2 = new Triangle(v4, v5, v6);

const tri3 = tri2.clone();

//console.log(tri1.area)
//console.log(tri1.type())
//console.log(tri2.equals(tri3))
