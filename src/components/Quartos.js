import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../estilos/Quartos.scss";
import showerIcon from "../assets/imgs/showerIcon.png";
import bedIcon from "../assets/imgs/bedIcon.png";
import wifiIcon from "../assets/imgs/wifiIcon.png";
import airIcon from "../assets/imgs/airIcon.png";
import { API_URL } from '../api/constants'

const Quartos = () => {
  const navigate = useNavigate();
  const [quartos, setQuartos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchQuartos = async () => {
      try {
        const response = await fetch(`${API_URL}/quarto`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuartos(data);
        } else {
          setErro("Erro ao carregar quartos");
        }
      } catch (error) {
        console.error("Erro:", error);
        setErro("Erro ao carregar quartos");
      }
    };

    fetchQuartos();
  }, []);

  const handleAddQuarto = () => {
    navigate("/adicionar-quarto");
  };

  const handleApagar = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // tirar o quarto da lista após de deletar ele no backend
        setQuartos(quartos.filter((quarto) => quarto.id !== id));
      } else {
        setErro("Erro ao deletar quarto");
      }
    } catch (error) {
      console.error("Erro ao deletar quarto:", error);
      setErro("Erro ao deletar quarto");
    }
  };

  return (
    <div className="quartos">
      <h1>Gerenciamento dos Quartos</h1>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <div className="button_container">
        <button className="button" onClick={handleAddQuarto}>
          Adicionar quarto
        </button>
      </div>
      <div className="quarto_container">
        {quartos.map((quarto) => (
          <div key={quarto.id} className="quarto_wrapper">
            <div className="quarto_card">
              <img
                src={`${API_URL}/${quarto.imagem}`}
                alt="Quarto"
                className="quarto_img"
              />
              <div className="quarto_info">
                <h3>{quarto.nome}</h3>
                <p className="status">
                  {quarto.status === "Disponível"
                    ? "Disponível"
                    : "Indisponível"}
                </p>
                <div className="comodidades">
                  <div>
                    <img src={showerIcon} alt="Banheiro Icon" />
                    {quarto.banheiro}
                  </div>
                  <div>
                    <img src={bedIcon} alt="Cama Icon" />
                    {quarto.cama}
                  </div>
                  <div>
                    <img src={wifiIcon} alt="Wi-Fi Icon" />
                    {quarto.wifi}
                  </div>
                  <div>
                    <img src={airIcon} alt="Ar-condicionado Icon" />
                    {quarto.arcondicionado}
                  </div>
                </div>
                <div className="avaliacao_button">
                  <span>{quarto.avaliacao}</span>
                  <p>{quarto.numero} avaliações</p>
                </div>
                <p className="preco">R$ {quarto.valor}</p>
              </div>
            </div>
            <div className="buttoes_acao">
              <button
                className="editar"
                onClick={() => navigate(`/editar-quarto/${quarto.id}`)}
              >
                Editar
              </button>
              <button
                className="apagar"
                onClick={() => handleApagar(quarto.id)}
              >
                Apagar
              </button>
              <button
                className="reserva"
                onClick={() => navigate(`/reserva-quarto/${quarto.id}`)}
              >
                Reserva
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quartos;
