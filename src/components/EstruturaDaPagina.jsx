import { Component } from "react";
import Translator from "./Translator";

class EstruturaDaPagina extends Component {
  render() {
    return (
      <div className="mainPage">
        <div className="header">
          <h1>
            <Translator path="TITLE.LOCADORA" />
          </h1>
          <h2>{this.props.title}</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default EstruturaDaPagina;
