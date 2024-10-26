import { Vertice } from "./questao1.js";

const types = {
    1: "Escaleno",
    2: "Isóceles",
    3: "Equilátero",
};

export class BasePolygon {
    get sides() {
        const sides = [];
        this.vertices.forEach((vertice, index) => {
            const prev_sides = this.vertices.slice(index + 1, this.vertices.length);
            prev_sides.forEach((vertice2) => {
                sides.push(vertice.distance(vertice2));
            });
        });
        return sides;
    }

    get perimeter() {
        const sides = this.sides;

        return sides.reduce((acc, cur) => acc + cur, 0);
    }
}

export class Triangle  extends BasePolygon {
    #vertices

    constructor(default_vertices) {
        super();
        if (default_vertices?.length === 3) {
            this.#vertices = default_vertices;
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
        this.#vertices = [v1, v2, v3];
    }

    #validate_triangle(v1, v2, v3) {
        return (
            v1.distance(v2) === 0 ||
            v1.distance(v3) === 0 ||
            v2.distance(v3) === 0
        );
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
        return new Triangle(this.#vertices);
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

//console.log("Area Triangulo 1: " + tri1.area)
//console.log("Tipo Triangulo 1: " + tri1.type())
//console.log("Triangulo 2 == Triangulo 3: " + tri2.equals(tri3))
//
//console.log("Fim da Questão 2")
