import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';

function LoginComponent({
  formData: { email, password },
  onInputChange,
  onHandleSubmit,
  validateInputs,
}) {
  const history = useHistory();

  return (
    <Form size="large">
      <Segment stacked>
        <span>Email</span>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="Email"
          name="email"
          data-testid="email-input"
          value={email}
          onChange={(e) => onInputChange(e)}
        />
        <span>Senha</span>
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Senha"
          type="password"
          name="password"
          data-testid="password-input"
          value={password}
          onChange={(e) => onInputChange(e)}
        />
        <Button
          color="blue"
          fluid
          data-testid="signin-btn"
          onClick={() => onHandleSubmit()}
          disabled={validateInputs()}
        >
          Entrar
        </Button>
        <br />
        <Button
          color="blue"
          fluid
          data-testid="no-account-btn"
          onClick={() => history.push('/register')}
        >
          Ainda não tenho conta
        </Button>
      </Segment>
    </Form>
  );
}

LoginComponent.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  validateInputs: PropTypes.func.isRequired,
};

export default LoginComponent;
