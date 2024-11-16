import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../estilos/ReservaQuarto.scss";
import { API_URL } from '../api/constants'

const ReservaQuarto = () => {
  const { id } = useParams();

  const [hospede, setHospede] = useState({
    nome: "",
    cpf: "",
    data_checkin: "",
    horario_checkin: "",
    data_checkout: "",
    horario_checkout: "",
  });
  const [reservas, setReservas] = useState([]);
  const [reservaEditando, setReservaEditando] = useState(null);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  const hoje = new Date().toISOString().split("T")[0]; // data atual no formato

  // função para ver se o cpf contem 11 numeros
  const validarCPF = (cpf) => {
    const regex = /^\d{11}$/;
    return regex.test(cpf);
  };

  // verificar se o quarto esta disponivel para as datas selecionadas
  const verificarDisponibilidade = (dataCheckin, dataCheckout) => {
    return reservas.every((reserva) => {

      // se a reserva sendo editada for a mesma, ignore a comparacao
      if (reserva.id === reservaEditando?.id) {
        return true;
      }
      const reservaCheckin = reserva.data_checkin;
      const reservaCheckout = reserva.data_checkout;

      return (
        (dataCheckin >= reservaCheckout || dataCheckout <= reservaCheckin)
      );
    });
  };

  // carregar as reservas
  useEffect(() => {
    const carregarReservas = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`http://localhost:5001/reserva/quarto/${id}`);
=======
        const response = await axios.get(
          `${API_URL}/reserva/quarto/${id}`
        );
        console.log(response.data); // verificar se o cpf está presente nos dados
>>>>>>> c86b4ed64de0b8ce6358ea4c1c7e3aa436faea1b
        setReservas(response.data);
      } catch (error) {
        setErro("Erro ao carregar reservas.");
      }
    };
    carregarReservas();
  }, [id]);

  const handleMudar = (event) => {
    const { name, value } = event.target;
    setHospede((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEnviar = async (event) => {
    event.preventDefault();

    // validação do cpf
    if (!validarCPF(hospede.cpf)) {
      setErro("CPF deve conter 11 números.");
      return;
    }

    const checkinFormatado = hospede.data_checkin.split("T")[0];
    const checkoutFormatado = hospede.data_checkout.split("T")[0];

    // validacao para garantir que o check-out não seja anterior ao check-in
    if (new Date(checkoutFormatado) < new Date(checkinFormatado)) {
      setErro("A data de check-out não pode ser anterior à data de check-in.");
      return;
    }

    // verificar a disponibilidade do quarto
    if (!verificarDisponibilidade(checkinFormatado, checkoutFormatado)) {
      setErro("O quarto não está disponível para a data selecionada.");
      return;
    }

    const reserva = {
      ...hospede,
      fk_quarto: id,
      data_checkin: checkinFormatado,
      data_checkout: checkoutFormatado,
    };

    try {
      if (reservaEditando) {
        // enviar uma requisição PUT
<<<<<<< HEAD
        await axios.put(`http://localhost:5001/reserva/${reservaEditando.id}`, reserva);
=======
        await axios.put(
          `${API_URL}/reserva/${reservaEditando.id}`,
          reserva
        );
>>>>>>> c86b4ed64de0b8ce6358ea4c1c7e3aa436faea1b
        setMensagem("Reserva atualizada com sucesso!");
        setReservas((prev) =>
          prev.map((r) =>
            r.id === reservaEditando.id ? { ...reserva, id: r.id } : r
          )
        );
        setReservaEditando(null); // sair do modo de edição
      } else {
        // enviar uma requisição POST
<<<<<<< HEAD
        const response = await axios.post("http://localhost:5001/reserva", reserva);
=======
        const response = await axios.post(
          `${API_URL}/reserva`,
          reserva
        );
>>>>>>> c86b4ed64de0b8ce6358ea4c1c7e3aa436faea1b
        setMensagem("Reserva realizada com sucesso!");
        setReservas((prevReservas) => [
          ...prevReservas,
          { ...reserva, id: response.data.id },
        ]);
      }

      // reseta o form
      setHospede({
        nome: "",
        cpf: "",
        data_checkin: "",
        horario_checkin: "",
        data_checkout: "",
        horario_checkout: "",
      });
      setErro(null);

    } catch (error) {
      setErro("Erro ao realizar a reserva.");
      setMensagem(null);
    }
  };

  const handleEditar = (reserva) => {
    setHospede({
      nome: reserva.nome,
      cpf: reserva.cpf,
      data_checkin: reserva.data_checkin?.split("T")[0] || "",
      horario_checkin: reserva.horario_checkin || "",
      data_checkout: reserva.data_checkout?.split("T")[0] || "",
      horario_checkout: reserva.horario_checkout || "",
    });
    setReservaEditando(reserva);
  };

  const handleApagar = async (reservaId) => {
    try {
      await axios.delete(`${API_URL}/reserva/${reservaId}`);
      setReservas((prevReservas) =>
        prevReservas.filter((reserva) => reserva.id !== reservaId)
      );
      setMensagem("Reserva deletada com sucesso!");
    } catch (error) {
      setErro("Erro ao deletar a reserva.");
    }
  };

  return (
    <div className="reserva_container">
      <h1 className="reserva_h1">Reserva</h1>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <form onSubmit={handleEnviar} className="reserva_form">
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={hospede.nome}
          onChange={handleMudar}
          required
        />
        <label>Cpf:</label>
        <input
          type="text"
          name="cpf"
          placeholder="Cpf"
          value={hospede.cpf}
          onChange={handleMudar}
          required
        />
        <label>Id quarto:</label>
        <input type="text" name="fk_quarto" value={id} disabled />
        <label>Data Check-in:</label>
        <input
          type="date"
          name="data_checkin"
          value={hospede.data_checkin}
          onChange={handleMudar}
          min={hoje} // impedir a selecao de datas passadas
          required
        />
        <label>Horário Check-in:</label>
        <input
          type="time"
          name="horario_checkin"
          value={hospede.horario_checkin}
          onChange={handleMudar}
          required
        />
        <label>Data Check-out:</label>
        <input
          type="date"
          name="data_checkout"
          value={hospede.data_checkout}
          onChange={handleMudar}
          min={hoje}
          required
        />
        <label>Horário Check-out:</label>
        <input
          type="time"
          name="horario_checkout"
          value={hospede.horario_checkout}
          onChange={handleMudar}
          required
        />
        <button className="button_cadastrar" type="submit">
          {reservaEditando ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      <ul className="reservas_list">
        {reservas.map((reserva) => (
          <li key={reserva.id} className="reserva_item">
            <p>{reserva.nome}</p>
            <p>{reserva.data_checkin?.split("T")[0]}</p>
            <p>-</p>
            <p>{reserva.horario_checkin}</p>
            <p>|</p>
            <p>{reserva.data_checkout?.split("T")[0]}</p>
            <p>-</p>
            <p>{reserva.horario_checkout}</p>
            <button onClick={() => handleEditar(reserva)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => handleApagar(reserva.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservaQuarto;
