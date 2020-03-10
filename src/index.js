import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import FieldArraysForm from "./FieldArraysForm";
import chamaAPI from "./chamaAPI";


import './styles/global.css'

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div id="menu">
      <h2 id="jooj">Automato Generator</h2>
      <FieldArraysForm onSubmit={chamaAPI} />
      <section id="menus">
      <Values form="fieldArrays"  />
      </section>
    </div>
  </Provider>,
  rootEl
);
