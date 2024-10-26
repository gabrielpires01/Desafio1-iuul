import PromptSync from "prompt-sync";

const prompt = PromptSync({
    sigint: true,
});

class Aluno {
    constructor() {
        this.nome = prompt("Nome: ");
        this.matricula = prompt("Matricula: ");
        this.p1 = null;
        this.p2 = null;
    }

    get notaFinal() {
        const p1 = this.p1 || 0;
        const p2 = this.p2 || 0;
        return (p1 + p2) / 2;
    }

    set notaProva(prova) {
        const nota = parseFloat(prompt("Nota: "));
        if (prova === 1) {
            this.p1 = nota;
        } else if (prova === 2) {
            this.p2 = nota;
        }
    }
}

export class Turma {
    constructor(alunos) {
        this.alunos = new Map(alunos.map((aluno) => [aluno.matricula, aluno]));
    }

    #valida_matricula(matricula) {
        if (!this.alunos.has(matricula)) {
            throw new Error("Aluno nao existe");
        }
    }

    addAluno() {
        console.log("\nAdicionar Aluno");
        const aluno = new Aluno();
        if (this.alunos.has(aluno.matricula)) {
            throw new Error("Aluno ja existe");
        }
        this.alunos.set(aluno.matricula, aluno);
        return aluno;
    }

    removeAluno() {
        console.log("\nRemove Aluno");
        const matricula = prompt("Matricula: ");
        this.#valida_matricula(matricula);
        this.alunos.delete(matricula);
    }

    setNota() {
        const matricula = prompt("Matricula Para Nota: ");
        const aluno = this.alunos.get(matricula);
        this.#valida_matricula(matricula);
        console.log(`Provas do ${aluno.nome}`);
        while (true) {
            const prova = parseInt(prompt(`Prova (1 ou 2): `));
            if (prova !== 1 && prova !== 2) {
                console.log("Prova Invalida");
                continue;
            }
            break;
        }
        aluno.notaProva = prova;
    }

    #parseNota(nota) {
        if (nota == null) {
            return "-";
        }
        return parseFloat(nota).toFixed(1);
    }

    notasTurma() {
        const alunos = new Map([...this.alunos.entries()].sort(([, alunoA], [, alunoB]) => alunoA.nome.localeCompare(alunoB.nome)));

        console.log("\n---------------------------------");
        console.log("Matricula Nome        P1  P2  NF ");
        console.log("---------------------------------");

        alunos.forEach((aluno) => {
            console.log(
                `${aluno.matricula}  ${aluno.nome} ${this.#parseNota(aluno.p1)} ${this.#parseNota(aluno.p2)} ${this.#parseNota(aluno.notaFinal)}`
            );
        })
        console.log("-----------------------------");
    }
}

//console.log("Questão 4\n");
//console.log("Aluno 1:");
//const aluno1 = new Aluno();
//
//console.log("Aluno 2:");
//const aluno2 = new Aluno();
//
//console.log("Aluno 3:");
//const aluno3 = new Aluno();
//
//const turma = new Turma([aluno1, aluno2, aluno3]);
//turma.addAluno();
//
//turma.removeAluno();
//
//turma.setNota();
//turma.setNota();
//turma.setNota();
//turma.setNota();
//
//turma.notasTurma();
//console.log("Fim da Questão 4");
