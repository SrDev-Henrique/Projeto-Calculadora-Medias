const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" class="animated-img"/>';
const imgReprovado = '<img src="./images/reprovado.png" class="animated-img"/>';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const maxAtividades = 5
const notaMinima = 5

function showMe() {
    document.querySelector('.foot').style.opacity = '1';  
}

let linhas = '';

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (atividades.length < maxAtividades) {
        adicionaLinha();
        atualizaTabela();
        atualizaMediaFinal();

        
        if (atividades.length === maxAtividades) {
            document.getElementByClass('.addRowBtn').disabled = true;
        }
    } else {
        alert("Você já atingiu o número máximo de atividades!");
    }
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${(inputNomeAtividade.value)} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>';
        linha += `<td class="atividade">${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`;

        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }   

    return (somaDasNotas / notas.length).toFixed(1);
}