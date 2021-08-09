import React, { useState, useEffect } from "react";
import EstruturaDaPagina from "../components/EstruturaDaPagina";
import Secao from "../components/Section";
import Cadastro from "../components/filme/Cadastro";
import Listagem from "../components/filme/Listagem";
//import { filmes } from '../util/constantes';
import FilmeAPI from "../services/filmes";
import { useTranslation } from "react-i18next";

const Filme = (props) => {
  const [filmes, setFilmes] = useState([]);
  const [filmeEmEdicao, setFilmeEmEdicao] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("Passou pelo useEffect");
    carregarFilmes();
  }, []);

  useEffect(() => {
    console.log("FilmeEmEdicao no Update", filmeEmEdicao);

    return () => console.log("Encerrou o componente");
  }, [filmeEmEdicao]);

  /* componentDidMount() {
        this.carregarFilmes();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.filmeEmEdicao === this.state.filmeEmEdicao && 
            prevState.filmes === this.state.filmes) {
            return;
        }

        console.log("this.state.filmeEmEdicao no Update", this.state.filmeEmEdicao);
    } */

  const carregarFilmes = async () => {
    const filmes = await FilmeAPI.buscarFilmes();
    setFilmes(filmes);
  };

  function editarFilme(filme) {
    setFilmeEmEdicao(filme);
  }

  const excluirFilme = (filme) => {
    FilmeAPI.excluirFilme(filme.id).then(() => carregarFilmes());
  };

  const salvarFilme = (filme) => {
    if (filme.id) {
      FilmeAPI.atualizarFilme(filme).then(() => {
        carregarFilmes();
        setFilmeEmEdicao(null);
      });
      return;
    }

    FilmeAPI.inserirFilme(filme).then(() => {
      carregarFilmes();
      setFilmeEmEdicao(null);
    });
  };

  const limparFilmeEmEdicao = () => {
    console.log("filmeEmEdicao ", filmeEmEdicao);
    setFilmeEmEdicao(null);
  };

  return (
    <>
      <EstruturaDaPagina title={t("TITLE.FILMES")} subtitulo="Teste">
        <Secao titulo={t("TITLE.CAD_FILMES")}>
          <Cadastro
            filme={filmeEmEdicao}
            salvar={salvarFilme}
            limpar={limparFilmeEmEdicao}
          />
        </Secao>
        <Secao titulo={t("TITLE.LISTA_FILMES")}>
          <Listagem
            filmes={filmes}
            editar={editarFilme}
            excluirFilme={excluirFilme}
          />
        </Secao>
      </EstruturaDaPagina>
    </>
  );
};

export default Filme;
