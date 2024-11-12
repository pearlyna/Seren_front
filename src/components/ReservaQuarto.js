import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../estilos/ReservaQuarto.scss";
import { API_URL } from '../api/constants'

const ReservaQuarto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hospede, setHospede] = useState({
    nome: "",
    cpf: "",
    data_checkin: "",
    data_checkout: "",
  });
  const [reservas, setReservas] = useState([]);
  const [reservaEditando, setReservaEditando] = useState(null);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    const carregarReservas = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/reserva/quarto/${id}`
        );
        console.log(response.data); // verificar se o cpf está presente nos dados
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
    try {
      const checkinFormatado = hospede.data_checkin.split("T")[0];
      const checkoutFormatado = hospede.data_checkout.split("T")[0];

      const reserva = {
        ...hospede,
        fk_quarto: id,
        data_checkin: checkinFormatado,
        data_checkout: checkoutFormatado,
      };

      if (reservaEditando) {
        // enviar uma requisição PUT
        await axios.put(
          `${API_URL}/reserva/${reservaEditando.id}`,
          reserva
        );
        setMensagem("Reserva atualizada com sucesso!");
        setReservas((prev) =>
          prev.map((r) =>
            r.id === reservaEditando.id ? { ...reserva, id: r.id } : r
          )
        );
        setReservaEditando(null); // sair do modo de edição
      } else {
        // enviar uma requisição POST
        const response = await axios.post(
          `${API_URL}/reserva`,
          reserva
        );
        setMensagem("Reserva realizada com sucesso!");
        setReservas((prevReservas) => [
          ...prevReservas,
          { ...reserva, id: response.data.id },
        ]);
      }

      // reseta o form
      setHospede({ nome: "", cpf: "", data_checkin: "", data_checkout: "" });
      setErro(null);

      setTimeout(() => {
        navigate("/quartos");
      }, 2000);
    } catch (error) {
      setErro("Erro ao realizar a reserva.");
      setMensagem(null);
    }
  };

  const handleEditar = (reserva) => {
    console.log(reserva);

    const checkinFormatado = reserva.data_checkin
      ? reserva.data_checkin.split("T")[0]
      : "";
    const checkoutFormatado = reserva.data_checkout
      ? reserva.data_checkout.split("T")[0]
      : "";

    setHospede({
      nome: reserva.nome,
      cpf: reserva.cpf,
      data_checkin: checkinFormatado,
      data_checkout: checkoutFormatado,
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
        <label>Data Checkin:</label>
        <input
          type="date"
          name="data_checkin"
          value={hospede.data_checkin}
          onChange={handleMudar}
          required
        />
        <label>Data Checkout:</label>
        <input
          type="date"
          name="data_checkout"
          value={hospede.data_checkout}
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
            <p>{reserva.data_checkout?.split("T")[0]}</p>
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
