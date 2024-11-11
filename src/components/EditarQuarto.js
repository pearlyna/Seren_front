import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../estilos/EditarQuarto.scss";

const EditarQuarto = () => {
  const { id } = useParams(); // obter o id do quarto da url
  const navegar = useNavigate();

  const [formulario, setFormulario] = useState({
    nome: "",
    banheiro: "Banheiro privado",
    cama: "",
    wifi: "wifi",
    arcondicionado: "arcondicionado",
    avaliacao: 0,
    numeroAvaliacoes: 0,
    valor: 0,
    status: "Disponível",
    imagem: null,
  });

  // estado adicional para controlar o carregamento
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDadosQuarto = async () => {
      try {
        const resposta = await axios.get(`http://localhost:5001/quarto/${id}`);
        const dadosQuarto = resposta.data;
        setFormulario({
          nome: dadosQuarto.nome,
          banheiro: dadosQuarto.banheiro,
          cama: dadosQuarto.tamCama,
          wifi: dadosQuarto.wifi,
          arcondicionado: dadosQuarto.ar_condi,
          avaliacao: dadosQuarto.classiAvaliacao,
          numeroAvaliacoes: dadosQuarto.numAvaliacao,
          valor: dadosQuarto.valor,
          status: dadosQuarto.status,
          imagem: null,
        });
        setCarregando(false); // definir como false quando os dados são carregados
      } catch (erro) {
        console.error("Erro ao buscar dados do quarto:", erro);
        alert(`Erro: ${erro.message}`);
        setCarregando(false); // definir como false se tiver erro
      }
    };

    buscarDadosQuarto();
  }, [id]);

  const handleMudar = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleNumero = (e) => {
    const { name, value } = e.target;
    const valorNumerico = value.replace(/\D/g, "");
    const valorFormatado = valorNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: valorFormatado,
    }));
  };

  const handleImagem = (e) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      imagem: e.target.files[0],
    }));
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/quarto/${id}`, {
        nome: formulario.nome,
        banheiro: formulario.banheiro,
        tamCama: formulario.cama,
        wifi: formulario.wifi,
        ar_condi: formulario.arcondicionado,
        classiAvaliacao: formulario.avaliacao,
        numAvaliacao: formulario.numeroAvaliacoes.replace(/,/g, ""),
        status: formulario.status,
        valor: formulario.valor,
      });

      if (formulario.imagem) {
        const dadosFormulario = new FormData();
        dadosFormulario.append("imagem", formulario.imagem);
        await axios.put(
          `http://localhost:5001/quarto/${id}/imagem`,
          dadosFormulario,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert("Quarto atualizado com sucesso!");
      navegar("/quartos");
    } catch (erro) {
      console.error("Erro ao atualizar o quarto:", erro);
      alert(`Erro: ${erro.message}`);
    }
  };

  if (carregando) {
    return <div>Carregando dados do quarto...</div>;
  }

  return (
    <div className="editar_container">
      <h1>Editar Quarto</h1>
      <form onSubmit={handleEnviar} className="editar_form">
        <label>
          Imagem:
          <input type="file" name="imagem" onChange={handleImagem} />
        </label>

        <label>
          Banheiro:
          <select
            name="banheiro"
            value={formulario.banheiro}
            onChange={handleMudar}
            required
          >
            <option value="">Selecionar opção</option>
            <option value="Banheiro privado">Banheiro privado</option>
            <option value="Banheiro compartilhado">
              Banheiro compartilhado
            </option>
          </select>
        </label>

        <label>
          Nome do quarto:
          <input
            type="text"
            name="nome"
            value={formulario.nome}
            onChange={handleMudar}
            required
          />
        </label>

        <label>
          WiFi:
          <select
            name="wifi"
            value={formulario.wifi}
            onChange={handleMudar}
            required
          >
            <option value="">Selecionar opção</option>
            <option value="Wifi">Wifi</option>
            <option value="sem Wifi">sem Wifi</option>
          </select>
        </label>

        <label>
          Tamanho da cama:
          <input
            type="text"
            name="cama"
            value={formulario.cama}
            onChange={handleMudar}
            required
          />
        </label>

        <label>
          Ar condicionado:
          <select
            name="arcondicionado"
            value={formulario.arcondicionado}
            onChange={handleMudar}
            required
          >
            <option value="">Selecionar opção</option>
            <option value="Ar-condicionado">Ar-condicionado</option>
            <option value="sem Ar-condicionado">sem Ar-condicionado</option>
          </select>
        </label>

        <label>
          Classificação de avaliação:
          <input
            type="number"
            name="avaliacao"
            value={formulario.avaliacao}
            onChange={handleMudar}
            required
          />
        </label>

        <label>
          Status de disponibilidade:
          <input
            type="text"
            name="status"
            value={formulario.status}
            onChange={handleMudar}
            disabled
          />
        </label>

        <label>
          Número de Avaliações:
          <input
            type="text"
            name="numeroAvaliacoes"
            value={formulario.numeroAvaliacoes}
            onChange={handleNumero}
            required
          />
        </label>

        <label>
          Valor:
          <input
            type="number"
            name="valor"
            value={formulario.valor}
            onChange={handleMudar}
            required
          />
        </label>

        <button type="submit" className="form_botao full-width">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditarQuarto;
