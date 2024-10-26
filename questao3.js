import PromptSync from "prompt-sync";
import { Vertice } from "./questao1.js";
import { BasePolygon } from "./questao2.js";

const prompt = PromptSync({
    sigint: true,
});

export class Polygon extends BasePolygon {
    #vertices;
    constructor(default_vertices) {
        super();
        if (default_vertices) {
            this.#vertices = default_vertices;
            return;
        }
        const vertices = [];

        while (true) {
            console.log(`Vertice ${vertices.length + 1}:`);
            const new_vertice = new Vertice();
            if (!this.#validate_vertices(vertices, new_vertice)) {
                console.log("Tente novamente\n");
                continue;
            }
            vertices.push(new_vertice);

            const keep_adding = prompt("Deseja continuar? (s/n) ");
            if (keep_adding.toLowerCase() === "n") {
                if (vertices.length < 3) {
                    throw new Error("Poligono deve ter pelo menos 3 vertices");
                }
                break;
            }
        }

        this.#vertices = vertices;
    }

    get vertices() {
        return this.#vertices;
    }

    #validate_vertices(vertices, new_vertice) {
        const exists = vertices.some((vertice) => vertice.equal(new_vertice));
        if (exists) {
            console.log("Vertice já existe");
            return false;
        }
        return true;
    }

    addVertice(vertice) {
        if (this.#validate_vertices(this.#vertices, vertice)) {
            this.#vertices.push(vertice);
        }
    }

    qtdVertices() {
        return this.#vertices.length;
    }
}

//console.log("Questão 3:")
//const polygon = new Polygon();
//
//console.log("Quantidade de vertices: " + polygon.qtdVertices());
//polygon.addVertice(new Vertice());
//console.log("Quantidade de vertices: " + polygon.qtdVertices());
//console.log("Perímetro: " + polygon.perimeter);
//
//console.log("Fim da Questão 3")
