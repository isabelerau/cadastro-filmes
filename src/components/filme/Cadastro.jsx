import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Button, Grid, TextField } from "@material-ui/core";
//import { useTranslation } from "react-i18next";
import Translator from "../Translator";

const FILME_INICIAL = {
  titulo: "",
  subtitulo: "",
  diretor: "",
  elenco: [],
};

const FilmeSchema = yup.object().shape({
  titulo: yup.string().required(<Translator path="MESSAGES.TITULO" />),
  subtitulo: yup.string().required(<Translator path="MESSAGES.SUBTITULO" />),
  diretor: yup.string().required(<Translator path="MESSAGES.DIRETOR" />),
});

const Cadastro = (props) => {
  const { filme, salvar, limpar } = props;

  const history = useHistory();

  //const { t } = useTranslation();

  const salvarFilme = (values, actions) => {
    console.log("values ", values);
    salvar(values);
    actions.resetForm();
    setTimeout(() => actions.setSubmitting(false), 5000);
    history.push("/filmes/listagem");
  };

  const handleChange = (name, value, setFieldValue) => {
    setFieldValue(name, value);
  };

  const handleNovoFilme = (handleReset) => {
    limpar();
    handleReset(FILME_INICIAL);
  };

  const voltar = () => {
    history.replace("/filmes/listagem");
  };

  const voltarHistory = () => {
    history.goBack();
  };

  return (
    <Formik
      enableReinitialize
      validateOnMount={true}
      validationSchema={FilmeSchema}
      initialValues={filme || FILME_INICIAL}
      onSubmit={(values, actions) => salvarFilme(values, actions)}
      render={({
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
        isSubmitting,
        handleReset,
      }) => (
        <Form>
          <>
            <Grid container spacing={3}>
              <Grid item xs={11}>
                <Field
                  component={TextField}
                  name="titulo"
                  size="small"
                  label={<Translator path="LABEL.TITULO" />}
                  variant="outlined"
                  fullWidth
                  value={values.titulo}
                  onFocus={() => setFieldTouched("titulo")}
                  onChange={(event) =>
                    handleChange("titulo", event.target.value, setFieldValue)
                  }
                  error={touched.titulo && errors.titulo}
                  helperText={touched.titulo && errors.titulo}
                />
              </Grid>
              <Grid item xs={11}>
                <Field
                  component={TextField}
                  fullWidth
                  size="small"
                  label={<Translator path="LABEL.SUBTITULO" />}
                  name="subtitulo"
                  value={values.subtitulo}
                  onFocus={() => setFieldTouched("subtitulo")}
                  onChange={(e) =>
                    handleChange("subtitulo", e.target.value, setFieldValue)
                  }
                  variant="outlined"
                  error={touched.subtitulo && errors.subtitulo}
                />
              </Grid>
              <Grid item xs={11}>
                <Field
                  component={TextField}
                  fullWidth
                  size="small"
                  name="diretor"
                  value={values.diretor}
                  onChange={(e) =>
                    handleChange("diretor", e.target.value, setFieldValue)
                  }
                  onFocus={() => setFieldTouched("diretor")}
                  label={<Translator path="LABEL.DIRETOR" />}
                  variant="outlined"
                  error={touched.diretor && errors.diretor}
                  helperText={touched.diretor && errors.diretor}
                />
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={2} justify="flex-end">
                  <Grid item>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/filmes/listagem"
                    >
                      <Translator path="LABEL.BACK_LINK" />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={voltar}>
                      <Translator path="LABEL.BACK_DINAMICO" />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={voltarHistory}>
                      <Translator path="LABEL.GO_BACK" />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => handleNovoFilme(handleReset)}
                    >
                      <Translator path="LABEL.NOVO" />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <Translator path="LABEL.SALVAR" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <div className="formulario">
                        <div className="campo-formulario">
                            <label>Título:</label>
                            <Field 
                                className="input-formulario" 
                                name="titulo" 
                                placeholder="Título" 
                            />
                            {touched.titulo && errors.titulo && <span className="erro-campo-formulario">{errors.titulo}</span>}
                        </div>
                        <div className="campo-formulario">
                            <label>Subtitulo:</label>
                            <Field
                                className="input-formulario"
                                name="subtitulo"
                                placeholder="Subtitulo"
                            />
                            {touched.subtitulo && errors.subtitulo && <span className="erro-campo-formulario">{errors.subtitulo}</span>}
                        </div>
                        <div className="campo-formulario">
                            <label>Diretor:</label>
                            <Field
                                className="input-formulario"
                                name="diretor"
                                placeholder="Diretor"
                            />
                            {touched.diretor && errors.diretor && <span className="erro-campo-formulario">{errors.diretor}</span>}
                        </div>
                        <div className="botoes">
                            <button className="botao-formulario" onClick={() => {handleReset(FILME_INICIAL)}} >Novo</button>
                            <button className="botao-formulario" type="submit" disabled={isSubmitting}>Salvar</button>
                        </div>
                    </div> */}
          </>
        </Form>
      )}
    />
  );
};

export default Cadastro;
