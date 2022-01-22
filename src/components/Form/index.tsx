import React, { useState} from "react";

import { useForm } from "react-hook-form";
import api from "../../services/client";
import "./style.css";

const Form = () => {
  const [userIp, setUserIp] = useState('')
  const [error, setError] = useState(false)

  function getUserIp(){
    api
    .get('/ip')
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
                <input type="button" value="ENCONTRAR IP" onClick={getUserIp}/>
            </div>
          </div>

          <div className="action-buttons">
            <input type="submit" value="SALVAR" className='btn'/>
            <input type="button" value="LIMPAR" className='btn'/>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Form;
