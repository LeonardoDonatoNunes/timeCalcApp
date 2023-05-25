function adicionarCampos() {
    var camposDinamicos = document.getElementById("campos-dinamicos");
    var tabela = document.getElementById("horarios");

    var novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
        <td>
            <div class="form-group">
                <label for="entrada">Início</label>
                <input type="time" name="entrada[]" class="entrada">
            </div>
        </td>
        <td>
            <div class="form-group">
                <label for="saida">Fim</label>
                <input type="time" name="saida[]" class="saida">
            </div>
        </td>
        <td>
            <button class="remover-btn" onclick="removerCampos(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;

    tabela.appendChild(novaLinha);
}

function removerCampos(botao) {
    var linha = botao.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}


function calcularTempo() {
    var entradas = document.getElementsByClassName("entrada");
    var saidas = document.getElementsByClassName("saida");

    var tempos = [];

    for (var i = 0; i < entradas.length; i++) {
        var entrada = entradas[i].value;
        var saida = saidas[i].value;

        var diferenca = calcularDiferenca(entrada, saida);
        tempos.push(diferenca);
    }

    var total = tempos.reduce(function(a, b) {
        return a + b;
    }, 0);

    var horas = Math.floor(total / (60 * 60 * 1000));
    var minutos = Math.floor((total % (60 * 60 * 1000)) / (60 * 1000));

    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "Tempo total: " + horas + " horas e " + minutos + " minutos.";
}

function calcularDiferenca(entrada, saida) {
    var tempoInicial = new Date("2000-01-01 " + entrada);
    var tempoFinal = new Date("2000-01-01 " + saida);

    var diferenca = tempoFinal - tempoInicial;

    if (diferenca < 0) {
        diferenca += 24 * 60 * 60 * 1000;  // adiciona 24 horas em milissegundos
    }

    return diferenca;
}

function atualizarPagina() {
    location.reload();
}