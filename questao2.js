import { Vertice } from "./questao1.js";

const types = {
    1: "Escaleno",
    2: "Isóceles",
    3: "Equilátero",
};

export class Triangle {
    #v1;
    #v2;
    #v3;

    constructor(default_v1, default_v2, default_v3) {
        if (default_v1 && default_v2 && default_v3) {
            this.#v1 = default_v1;
            this.#v2 = default_v2;
            this.#v3 = default_v3;
            return
        }
        let v1, v2, v3
        while (true) {
            console.log("Vertice 1:");
            v1 = new Vertice();
            console.log("Vertice 2:");
            v2 = new Vertice();
            console.log("Vertice 3:");
            v3 = new Vertice();
            if (!this.#validate_triangle(v1,v2,v3)) {
                break
            }
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

//console.log("Questão 2:")
//console.log("Triangulo 1:")
//const tri1 = new Triangle();
//console.log("Triangulo 2:")
//const tri2 = new Triangle();
//
//console.log("Triangulo 3 clone do Triangulo 2")
//const tri3 = tri2.clone();
//
//console.log("Area Triangulo 1: " + tri1.area)
//console.log("Tipo Triangulo 1: " + tri1.type())
//console.log("Triangulo 2 == Triangulo 3: " + tri2.equals(tri3))
//
//console.log("Fim da Questão 2")
