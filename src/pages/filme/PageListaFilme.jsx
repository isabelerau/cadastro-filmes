import { Button, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EstruturaDaPagina from "../../components/EstruturaDaPagina";
import Section from "../../components/Section";
import Listagem from "../../components/filme/Listagem";
import { buscarFilmes } from "../../redux/filme/actions";
import { getFilmes } from "../../redux/filme/selectors";
import { useTranslation } from "react-i18next";
import Translator from "../../components/Translator";

const PageListaFilme = (props) => {
  const filmes = useSelector(getFilmes);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(buscarFilmes());
  }, [dispatch]);

  /* function editarFilme(filme) {
        setFilmeEmEdicao(filme);
    } */

  /* const handleExcluirFilme = (filme) => {
        dispatch(excluirFilme(filme))
    } */

  return (
    <EstruturaDaPagina title={t("TITLE.FILMES")}>
      <Section titulo={t("TITLE.LISTA_FILMES")}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Grid container spacing={2} justify="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  component={Link}
                  to="/filmes/cadastro"
                >
                  <Translator path="LABEL.NOVO" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Listagem filmes={filmes} /* excluirFilme={handleExcluirFilme} */ />
          </Grid>
        </Grid>
      </Section>
    </EstruturaDaPagina>
  );
};

export default PageListaFilme;
