const express = require('express');
const soap = require('soap');
const app = express();
const port = 3000;

const urlProducao = 'https://ws.cfm.org.br:8080/WebServiceConsultaMedicos/ServicoConsultaMedicos?wsdl';

app.get('/api/consultar-medico', (req, res) => {
  const crm = req.query.crm;
  const uf = req.query.uf;
  const chaveIdentificacao = 'KM0ZCHAW';

  soap.createClient(urlProducao, (err, medico) => {
    if (err) {
      console.error('Erro ao conectar ao WSDL:', err);
      return res.status(500).json({ error: 'Erro ao conectar ao serviço SOAP' });
    }

    medico.Consultar({ crm: crm, uf: uf, chave: chaveIdentificacao }, (err, dadosMedico) => {
      if (err) {
        console.error('Erro na consulta:', err);
        return res.status(500).json({ error: 'Erro na consulta à API SOAP' });
      }

      res.json(dadosMedico);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});