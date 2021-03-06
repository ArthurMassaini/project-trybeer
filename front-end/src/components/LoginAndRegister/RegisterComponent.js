import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import React, { useState, useContext } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import MessageComponent from '../MessageComponent';
import BeerContext from '../../context/BeerContext';

function RegisterComponent({
  formData: { name, email, password },
  onInputChange,
  onHandleSubmit,
  validateInputs,
}) {
  const [unchecked, setUnchecked] = useState(false);
  const { errorMessage } = useContext(BeerContext);
  return (
    <Form size="large">
      <Segment stacked>
        <span>Nome</span>
        <Form.Input
          fluid
          placeholder="Nome"
          value={ name }
          name="name"
          data-testid="signup-name"
          onChange={ (e) => onInputChange(e) }
        />
        <span>Email</span>
        {errorMessage && <MessageComponent>{errorMessage}</MessageComponent>}
        <Form.Input
          fluid
          placeholder="Email"
          value={ email }
          name="email"
          data-testid="signup-email"
          onChange={ (e) => onInputChange(e) }
        />
        <span>Senha</span>
        <Form.Input
          fluid
          placeholder="Senha"
          value={ password }
          type="password"
          name="password"
          data-testid="signup-password"
          onChange={ (e) => onInputChange(e) }
        />
        <Button
          color="blue"
          fluid
          size="large"
          data-testid="signup-btn"
          disabled={ validateInputs() }
          onClick={ () => onHandleSubmit() }
        >
          Cadastrar
        </Button>
        <span>Quero vender</span>
        <form>
          <input
            type="checkbox"
            id="queroVender"
            name="queroVender"
            data-testid="signup-seller"
            checked={ unchecked }
            onChange={ (e) => {
              setUnchecked(!unchecked);
              onInputChange({ target: { name: e.target.name, value: e.target.checked } });
            } }
          />
        </form>
      </Segment>
    </Form>
  );
}

RegisterComponent.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  validateInputs: PropTypes.func.isRequired,
};

export default RegisterComponent;
