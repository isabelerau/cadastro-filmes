import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { excluirFilme } from "../../redux/filme/actions";
import Translator from "../Translator";

const Listagem = (props) => {
  const { filmes } = props;

  const dispatch = useDispatch();

  const handleExcluir = (filme) => {
    dispatch(excluirFilme(filme));
  };

  useEffect(() => {
    console.log("Filmes: ", filmes);
  }, [filmes]);

  return (
    <>
      {(!filmes || filmes.length === 0) && (
        <span>
          <Translator path="MESSAGES.FILMES" />
        </span>
      )}
      {filmes && filmes.length > 0 && (
        <>
          {/* <div className="listagem">
                    <table className="tabela-filmes">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Subtítulo</th>
                                <th>Diretor</th>
                                <th className="acoes" colSpan="2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.filmes && this.props.filmes.map(filme => (
                                <tr key={filme.id}>
                                    <td>{filme.titulo}</td>
                                    <td>{filme.subtitulo}</td>
                                    <td>{filme.diretor}</td>
                                    <td className="acoes"><button onClick={() => this.handleEditar(filme)}>Editar</button></td>
                                    <td className="acoes"><button onClick={() => this.handleExcluir(filme)}>Excluir</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
          <Grid container>
            <Grid item xs={11}>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Translator path="LABEL.TITULO" />
                      </TableCell>
                      <TableCell>
                        <Translator path="LABEL.SUBTITULO" />
                      </TableCell>
                      <TableCell>
                        <Translator path="LABEL.DIRETOR" />
                      </TableCell>
                      <TableCell align="center" colSpan={2}>
                        <Translator path="LABEL.ACOES" />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filmes.map((filme) => (
                      <TableRow key={filme.id}>
                        <TableCell width="25%">{filme.titulo}</TableCell>
                        <TableCell>{filme.subtitulo}</TableCell>
                        <TableCell width="20%">{filme.diretor}</TableCell>
                        <TableCell width="5%" align="center">
                          <IconButton
                            color="primary"
                            component={Link}
                            to={`/filmes/cadastro/${filme.id}`}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell width="5%" align="center">
                          <IconButton
                            color="primary"
                            onClick={() => handleExcluir(filme)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Listagem;
