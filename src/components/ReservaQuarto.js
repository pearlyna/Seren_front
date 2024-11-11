import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../estilos/ReservaQuarto.scss';

const ReservaQuarto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [hospede, setHospede] = useState({
    nome: '',
    cpf: '',
    data_checkin: '',
    data_checkout: ''
  });
  const [reservas, setReservas] = useState([]);
  const [reservaEditando, setReservaEditando] = useState(null); // Para acompanhar a reserva em edição
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    const carregarReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/reserva/quarto/${id}`);
        console.log(response.data); // Verifique se o CPF está presente nos dados
        setReservas(response.data);
      } catch (error) {
        setErro('Erro ao carregar reservas.');
      }
    };
    carregarReservas();
  }, [id]);
  

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
      const formattedCheckin = hospede.data_checkin.split('T')[0];
      const formattedCheckout = hospede.data_checkout.split('T')[0];
  
      const reserva = { 
        ...hospede, 
        fk_quarto: id,
        data_checkin: formattedCheckin,
        data_checkout: formattedCheckout
      };
  
      if (reservaEditando) {
        // Se estamos editando, envia uma requisição PUT
        await axios.put(`http://localhost:5001/reserva/${reservaEditando.id}`, reserva);
        setMensagem('Reserva atualizada com sucesso!');
        setReservas((prev) => 
          prev.map((r) => (r.id === reservaEditando.id ? { ...reserva, id: r.id } : r))
        );
        setReservaEditando(null); // Sai do modo de edição
      } else {
        // Se estamos criando uma nova reserva, envia uma requisição POST
        const response = await axios.post('http://localhost:5001/reserva', reserva);
        setMensagem('Reserva realizada com sucesso!');
        setReservas((prevReservas) => [
          ...prevReservas, 
          { ...reserva, id: response.data.id }
        ]);
      }
      
      // Reseta o formulário
      setHospede({ nome: '', cpf: '', data_checkin: '', data_checkout: '' });
      setErro(null);
  
      setTimeout(() => {
        navigate('/quartos');
      }, 2000);
    } catch (error) {
      setErro('Erro ao realizar a reserva.');
      setMensagem(null);
    }
  };

  const handleEdit = (reserva) => {
    console.log(reserva); // Verifique se o cpf está sendo passado aqui
  
    const formattedCheckin = reserva.data_checkin ? reserva.data_checkin.split('T')[0] : '';
    const formattedCheckout = reserva.data_checkout ? reserva.data_checkout.split('T')[0] : '';
  
    setHospede({
      nome: reserva.nome,
      cpf: reserva.cpf, // Adicione aqui para garantir que o cpf seja preenchido
      data_checkin: formattedCheckin,
      data_checkout: formattedCheckout,
    });
    setReservaEditando(reserva);
  };
  

  const handleDelete = async (reservaId) => {
    try {
      await axios.delete(`http://localhost:5001/reserva/${reservaId}`);
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== reservaId));
      setMensagem('Reserva deletada com sucesso!');
    } catch (error) {
      setErro('Erro ao deletar a reserva.');
    }
  };

  return (
    <div className="reserva_quarto_form_container">
      <h1 className='reserva_h1'>Reserva</h1>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit} className="reserva_quarto_form">
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={hospede.nome}
          onChange={handleChange}
          required
        />
        <label>Cpf:</label>
        <input
          type="text"
          name="cpf"
          placeholder="Cpf"
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
        <label>Data Checkin:</label>
        <input
          type="date"
          name="data_checkin"
          value={hospede.data_checkin}
          onChange={handleChange}
          required
        />
        <label>Data Checkout:</label>
        <input
          type="date"
          name="data_checkout"
          value={hospede.data_checkout}
          onChange={handleChange}
          required
        />
        <button className='button_cadastrar' type="submit">
          {reservaEditando ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      <ul className="reservas_list">
        {reservas.map((reserva) => (
          <li key={reserva.id} className="reserva_item">
            <p>{reserva.nome}</p>
            <p>{reserva.data_checkin?.split('T')[0]}</p>
            <p>-</p>
            <p>{reserva.data_checkout?.split('T')[0]}</p>
            <button onClick={() => handleEdit(reserva)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => handleDelete(reserva.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservaQuarto;
