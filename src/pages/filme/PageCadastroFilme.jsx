import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import EstruturaDaPagina from "../../components/EstruturaDaPagina";
import Section from "../../components/Section";
import Cadastro from "../../components/filme/Cadastro";
import {
  buscarFilme,
  inserirFilme,
  atualizarFilme,
  limparFilmeAtual,
} from "../../redux/filme/actions";
import { getFilmeAtual } from "../../redux/filme/selectors";
import { useTranslation } from "react-i18next";

const PageCadastroFilme = (props) => {
  const { id } = useParams();
  const { t } = useTranslation();

  const filmeEmEdicao = useSelector(getFilmeAtual);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("FilmeEmEdicao no Update", filmeEmEdicao);

    return () => console.log("Encerrou o componente");
  }, [filmeEmEdicao]);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(buscarFilme(id));

    return () => dispatch(limparFilmeAtual());
  }, [dispatch, id]);

  const salvarFilme = (filme) => {
    if (filme.id) {
      dispatch(atualizarFilme(filme));
      return;
    }

    dispatch(inserirFilme(filme));
  };

  const limparFilmeEmEdicao = () => {
    console.log("filmeEmEdicao ", filmeEmEdicao);
    //setFilmeEmEdicao(null);
  };

  return (
    <EstruturaDaPagina
      title={t("TITLE.FILMES")}
      subtitulo={t("SUBTITLE.TESTE")}
    >
      <Section titulo={t("TITLE.CAD_FILMES")}>
        <Cadastro
          filme={filmeEmEdicao}
          salvar={salvarFilme}
          limpar={limparFilmeEmEdicao}
        />
      </Section>
    </EstruturaDaPagina>
  );
};

export default PageCadastroFilme;
