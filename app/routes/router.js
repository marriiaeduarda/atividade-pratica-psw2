const express = require("express");
const router = express.Router();
const validacoes = require("../helpers/validarcpf");
router.get("/", (req, res) => {
   res.render("pages/index", {
       retorno: null,
       valores: {
           nome: "",
           cpf: "",
           valor: ""
       }
   });
});
router.post("/calcular", (req, res) => {
   let nome = req.body.nome;
   let cpf = req.body.cpf;
   let valor = req.body.valor;
   if(!validacoes.validarNome(nome)){
       return res.render("pages/index", {
           retorno: {
               erro: "Nome inválido. Digite pelo menos 3 caracteres."
           },
           valores: req.body
       });
   }
   if(!validacoes.validarCPF(cpf)){
       return res.render("pages/index", {
           retorno: {
               erro: "CPF inválido."
           },
           valores: req.body
       });
   }
   if(!validacoes.validarValor(valor)){
       return res.render("pages/index", {
           retorno: {
               erro: "Valor da matrícula deve ser maior que zero."
           },
           valores: req.body
       });
   }
   valor = parseFloat(valor);
   let percentual = 0;
   if(valor <= 100){
       percentual = 2;
   }else if(valor <= 500){
       percentual = 7;
   }else if(valor <= 1500){
       percentual = 12;
   }else{
       percentual = 18;
   }
   let valorDesconto = valor * (percentual / 100);
   let valorFinal = valor - valorDesconto;
   let objJson = {
       nome: nome,
       cpf: cpf,
       valorMatricula: valor.toFixed(2),
       percentual: percentual,
       valorDesconto: valorDesconto.toFixed(2),
       valorFinal: valorFinal.toFixed(2)
   };
   res.render("pages/index", {
       retorno: objJson,
       valores: req.body
   });
});
module.exports = router;