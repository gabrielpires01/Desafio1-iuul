import { DateTime } from "luxon";
import promptSync from "prompt-sync";


const prompt = promptSync({ sigint: true });
const estadosCivil = ["S", "C", "V", "D"];
class Pessoa {
    constructor() {
        while (true) {
            const nome = prompt("Nome: ");
            if (this.#valida_nome(nome)) {
                this.nome = nome;
                break;
            }
        }
        while (true) {
            const cpf = prompt("CPF: ");
            if (this.#valida_cpf(cpf)) {
                this.cpf = parseInt(cpf);
                break;
            }
        }
        while (true) {
            const renda = prompt("Renda: ");
            if (this.#valida_renda(renda)) {
                this.renda = parseFloat(renda.replace(",", "."));
                break;
            }
        }
        while (true) {
            const estadoCivil = prompt("Estado Civil (S, C, V ou D): ");
            if (this.#valida_civil(estadoCivil)) {
                this.estadoCivil = estadoCivil.toUpperCase();
                break;
            }
        }
        while (true) {
            const dependentes = prompt("Dependentes: ");
            if (this.#valida_dependentes(dependentes)) {
                this.dependentes = parseInt(dependentes);
                break;
            }
        }

        while (true) {
            const dataNascimento = prompt("Data de Nascimento: ");
            const data = this.#valida_data(dataNascimento);
            if (data) {
                this.dataNascimento = data;
                break;
            }
        }
    }

    #valida_nome(nome) {
        if (nome.length < 5) {
            console.log("Pelo menos 5 caracteres");
            return false;
        }
        return true;
    }

    #valida_cpf(cpf) {
        if (cpf.length !== 11) {
            console.log("CPF Invalido");
            return false;
        }
        const cpf_number = parseInt(cpf);
        if (isNaN(cpf_number)) {
            console.log("CPF Invalido");
            return false;
        }
        return true;
    }

    #valida_renda(renda) {
        if (renda < 0) {
            console.log("Renda Invalida");
            return false;
        }
        return true;
    }

    #valida_dependentes(dependentes) {
        if (dependentes < 0 || dependentes > 10) {
            console.log("Dependentes Invalidos");
            return false;
        }
        return true;
    }

    #valida_civil(estadoCivil) {
        if (!estadosCivil.includes(estadoCivil?.toUpperCase())) {
            console.log("Estado Civil Invalido");
            return false;
        }
        return true;
    }

    #valida_data(dataNascimento) {
        const date = DateTime.fromFormat(dataNascimento, "dd/MM/yyyy", {
            locale: "pt-BR",
        });
        if (!date.isValid) {
            console.log("Data Invalida");
            return false;
        }
        return date.toJSDate();
    }

    formata_cpf(cpf) {
        return cpf.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    formata_renda(renda) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(renda);
    }

    formata_data(data) {
        return DateTime.fromJSDate(data).toFormat("dd/MM/yyyy");
    }

    get pessoa() {
        console.log("\n\n\n");
        console.log(
            "Nome: ",
            this.nome,
            "\nCPF: ",
            this.formata_cpf(this.cpf),
            "\nRenda: ",
            this.formata_renda(this.renda),
            "\nData de Nascimento: ",
            this.formata_data(this.dataNascimento),
            "\nEstado Civil: ",
            this.estadoCivil,
            "\nDependentes: ",
            this.dependentes,
        );
    }
}

const pessoa = new Pessoa();
pessoa.pessoa;
