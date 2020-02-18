class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados() {
    for(let i in this) {
      if (this[i] == undefined || this[i] == '' || this [i] == null) {
        return false;
      } 
    }
    return true
  }
} 

class Bd {

  constructor() {
    let id = localStorage.getItem('id');
  
    // Lógica do id
    if(id === null) {
      localStorage.setItem('id', 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id')
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    // É necessário transformar o objeto literal em JSON
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(d));

    localStorage.setItem('id', id);
 }

 recuperarTodosRegistros() {

  let despesas = Array()

  let id = localStorage.getItem('id');

   for (let i = 1; i <= id; i++) {
   
    // Recuperar despesa em objeto literal
    let despesa = JSON.parse(localStorage.getItem(i));
    
    // Verificando se existe a possibilidades de índices pulados
    if (despesa === null) {
      continue;
    }

    // Acrescentando despesa
    despesas.push(despesa);
  }

  return despesas;
 }

}

let bd = new Bd()

function cadastrarDespesa() {

  let ano = document.getElementById('ano');
  let mes = document.getElementById('mes');
  let dia = document.getElementById('dia');
  let tipo = document.getElementById('tipo');
  let descricao = document.getElementById('descricao');
  let valor = document.getElementById('valor');

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value,
  )

  if (despesa.validarDados()) {
    bd.gravar(despesa);
    let titulo = document.getElementById('modal_titulo');
    let btn = document.getElementById('modal_btn');

    document.getElementById('modal_titulo_div').className = "modal-header text-success";
    titulo.innerHTML = 'Despesa cadastrada com sucesso!';
    titulo.className = 'ml-auto'

    btn.className = 'btn btn-success'
    btn.innerHTML = 'Voltar'
  
    $('#modalRegistraDespesa').modal('show');
  } else {

    let btn = document.getElementById('modal_btn');

    document.getElementById('modal_titulo_div').className = "modal-header text-danger";
    document.getElementById('modal_titulo').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'

    btn.className = 'btn btn-danger'
    btn.innerHTML = 'Voltar e corrigir'

    $('#modalRegistraDespesa').modal('show');
  }
}

function carregarListaDespesas() {

  let despesas = Array ()
  despesas = bd.recuperarTodosRegistros();

  let listaDespesas = document.getElementById('listaDespesas');

  // Percorrer listando todas despesas
  despesas.forEach(function(despesa) {
    
    // Criando linhas (tr)
    var linha = listaDespesas.insertRow();

    // Criando colundas (td)
    linha.insertCell(0).innerHTML = `${despesa.dia}/${despesa.mes}/${despesa.ano}`;
    linha.insertCell(1).innerHTML = despesa.tipo;
    linha.insertCell(2).innerHTML = despesa.descricao;
    linha.insertCell(3).innerHTML = despesa.valor;

  });  
}