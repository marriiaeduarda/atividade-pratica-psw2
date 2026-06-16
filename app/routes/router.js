const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
   res.render("pages/index");
});
router.post("/calcular", (req, res) => {
   const { nome, cpf, valor } = req.body;
   if (nome.length < 3) {
       return res.send("Nome inválido");
   }
   if (!/^\d{11}$/.test(cpf)) {
       return res.send("CPF inválido");
   }
   const valorMatricula = parseFloat(valor);
   if (valorMatricula <= 0) {
       return res.send("Valor inválido");
   }
   let desconto = 0;
   if (valorMatricula <= 100) {
       desconto = 2;
   } else if (valorMatricula <= 500) {
       desconto = 7;
   } else if (valorMatricula <= 1500) {
       desconto = 12;
   } else {
       desconto = 18;
   }
   const valorDesconto = valorMatricula * desconto / 100;
   const valorFinal = valorMatricula - valorDesconto;
   res.render("pages/index", {
       nome,
       cpf,
       valorMatricula,
       desconto,
       valorDesconto,
       valorFinal
   });
});
module.exports = router;