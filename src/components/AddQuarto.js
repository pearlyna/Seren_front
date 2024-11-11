import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/AddQuarto.scss";

function AdicionarQuarto() {
  const navegar = useNavigate();
  const [formulario, setFormulario] = useState({
    nome: "",
    banheiro: "Banheiroprivado",
    cama: "",
    wifi: "wifi",
    arcondicionado: "arcondicionado",
    avaliacao: 0,
    numero: 0,
    valor: 0,
    status: "Disponível",
    imagem: null,
  });

  const handleMudanca = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleMudancaNumero = (e) => {
    const { name, value } = e.target;

    // Remove qualquer caractere não numérico
    const valorNumerico = value.replace(/\D/g, "");

    // Formata o número com vírgulas como separadores de milhar
    const valorFormatado = valorNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: valorFormatado,
    }));
  };

  const handleMudancaArquivo = (e) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      imagem: e.target.files[0],
    }));
  };

  const handleEnvio = async (e) => {
    e.preventDefault();
    try {
      // Verifica se a imagem foi fornecida
      if (!formulario.imagem) {
        throw new Error("Imagem do quarto é obrigatória");
      }

      // Envia os dados para o backend
      const resposta = await fetch("http://localhost:5001/quarto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formulario.nome,
          banheiro: formulario.banheiro,
          tamCama: formulario.cama,
          wifi: formulario.wifi,
          ar_condi: formulario.arcondicionado,
          classiAvaliacao: formulario.avaliacao,
          numAvaliacao: formulario.numero.replace(/,/g, ""), // Remove as vírgulas antes de enviar ao backend
          status: formulario.status,
          valor: formulario.valor,
        }),
      });

      if (!resposta.ok) throw new Error("Erro ao salvar o quarto");
      const resultado = await resposta.json();

      // Se a imagem for fornecida, faz o upload
      const dadosFormulario = new FormData();
      dadosFormulario.append("imagem", formulario.imagem);
      const respostaImagem = await fetch(
        `http://localhost:5001/quarto/${resultado.id}/imagem`,
        {
          method: "PUT",
          body: dadosFormulario,
        }
      );

      if (!respostaImagem.ok) throw new Error("Erro ao salvar a imagem");

      alert("Quarto adicionado com sucesso!");
      navegar("/quartos");
    } catch (erro) {
      console.error("Erro ao salvar o quarto:", erro);
      alert(`Erro: ${erro.message}`);
    }
  };

  return (
    <div className="formulario_adicionar_quarto_container">
      <h1>Adicionar Quarto</h1>
      <form onSubmit={handleEnvio} className="formulario_quarto">
        <label>
          Imagem:
          <input type="file" name="imagem" onChange={handleMudancaArquivo} />
        </label>

        <label>
          Banheiro:
          <select
            name="banheiro"
            value={formulario.banheiro}
            onChange={handleMudanca}
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
            onChange={handleMudanca}
            required
          />
        </label>

        <label>
          WiFi:
          <select
            name="wifi"
            value={formulario.wifi}
            onChange={handleMudanca}
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
            onChange={handleMudanca}
            required
          />
        </label>

        <label>
          Ar condicionado:
          <select
            name="arcondicionado"
            value={formulario.arcondicionado}
            onChange={handleMudanca}
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
            onChange={handleMudanca}
            required
          />
        </label>

        <label>
          Status de disponibilidade:
          <input
            type="text"
            name="status"
            value={formulario.status}
            onChange={handleMudanca}
            disabled
          />
        </label>

        <label>
          Número de Avaliações:
          <input
            type="text"
            name="numero"
            value={formulario.numero}
            onChange={handleMudancaNumero}
            required
          />
        </label>

        <label>
          Valor:
          <input
            type="number"
            name="valor"
            value={formulario.valor}
            onChange={handleMudanca}
            required
          />
        </label>

        <button type="submit" className="botao_formulario largura-total">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default AdicionarQuarto;
