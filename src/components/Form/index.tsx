import React, { useState} from "react";
import { useForm } from "react-hook-form";
import api from "../../services/client";

import "./style.css";

const Form = () => {
    const [userIp, setUserIp] = useState('')
    const [error, setError] = useState(false)


    async function getIp(){
        api
        .get('')
        .then((response) => {
            setUserIp(response.data);
            console.log(userIp)
        })
        .catch((err) => {
            console.log('Opa...' + err);
            setError(true)
        })
    }

  return (
    <div className="form-container">
      <div className="form-info">
        <form>
          <div className="fields" id="name">
            <label>Nome</label>
            <input type="text" name="name"/>
          </div>
          <div className="row">
            <div className="fields">
              <label>Profissão</label>
              <input type="text" name="occupation" autoCapitalize="true" />
            </div>
            <div className="fields">
              <label>Celular</label>
              <input type="text" name="phone" />
            </div>
          </div>
          <div className="row">
            <div className="fields">
              <label>Meu IP</label>
              <input type="text" name="ip" value={userIp} readOnly />
            </div>
            <div className="ip-button">
                <button onClick={getIp}>
                  ENCONTRAR IP
                </button>
            </div>
          </div>
          <div className="btn-footer">
            <input type="submit" value="Salvar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
