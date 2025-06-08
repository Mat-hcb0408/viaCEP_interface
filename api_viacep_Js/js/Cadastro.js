'use strict';

const limpaTela=(endereco)=>{
document.getElementById('endereco').value="";
document.getElementById('bairro').value="";
document.getElementById('cidade').value="";
document.getElementById('estado').value="";
}

const preencherForm=(endereco)=>{
document.getElementById('endereco').value=endereco.logradouro;
document.getElementById('bairro').value=endereco.bairro;
document.getElementById('cidade').value=endereco.localidade;
document.getElementById('estado').value=endereco.estado;
}

const isNumber=(numero)=>/^[0-9]+$/.test(numero);

const cepValido=(cep)=>cep.length==8 && isNumber(cep);
const pesquisaCep= async()=>{
    limpaTela();
    const cep=document.getElementById('cep').value;
    console.log(cep);
    const url=`http://viacep.com.br/ws/${cep}/json/`;
    if(cepValido(cep)){

        const dados= await fetch(url);
        const endereco= await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            Swal.fire({
                icon:'error',
                title:'Erro!',
                text: 'CEP inválido!'
            });
        }else{
            preencherForm(endereco);
        }
    }else{
        Swal.fire({
                icon:'error',
                title:'Erro!',
                text: 'CEP incorreto!'
            });
    }

}
document.getElementById('cep').addEventListener('focusout',pesquisaCep);
