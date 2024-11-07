import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const ReservaQuarto = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [hospede, setHospede] = useState({
    nome: '',
    cpf: '',
    data_checkin: '',
    data_checkout: ''
  });
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHospede((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      // colocar o id_quarto no objeto do hóspede antes de enviar para a API
      const reserva = { ...hospede, fk_quarto: id };

      // fazer a chamada para salvar a reserva no endpoint correto
      await axios.post('http://localhost:5001/reserva', reserva);
      
      setMensagem('Reserva realizada com sucesso!');
        navigate('/quartos');
      setErro(null);
    } catch (error) {
      setErro('Erro ao realizar a reserva.');
      setMensagem(null);
    }
  };

  return (
    <div className="reserva_quarto_form_container">
      <h2>Reserva</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      <form onSubmit={handleSubmit} className="reserva_quarto_form">
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Hóspede"
          value={hospede.nome}
          onChange={handleChange}
          required
        />
        <label>Cpf:</label>
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={hospede.cpf}
          onChange={handleChange}
          required
        />
        <label>Id quarto:</label>
        <input
          type="text"
          name="fk_quarto"
          value={id} 
          disabled
        />
        <label>Data Checkout:</label>
        <input
          type="date"
          name="data_checkout"
          value={hospede.data_checkout}
          onChange={handleChange}
          required
        />
        <label>Data Checkin:</label>
        <input
          type="date"
          name="data_checkin"
          value={hospede.data_checkin}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default ReservaQuarto;
