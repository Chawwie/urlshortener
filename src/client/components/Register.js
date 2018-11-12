
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { registerURL, STATUS_ERROR, STATUS_LOADING, STATUS_READY } from '../actions';

import { List, Container, Button, Form, Header, Message } from 'semantic-ui-react'

import './Register.css';

const mapStateToProps = (state) => {
  return {
    status: state.status,
    errorMessage: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerURL: (url) => dispatch(registerURL(url))
  }
}

class Register extends React.Component {

  state = { url: '' };

  handleChange = (event) => {
    this.setState({url: event.target.value});
  }

  handleSubmit = () => {
    this.props.registerURL(this.state.url);
  }
  
  render() {
    const { status, errorMessage } = this.props;

    return (
      <div className="register-container">
        <div className="input-container">
          <Header as='h2' content='Simplify your links' inverted />
          <Form onSubmit={this.handleSubmit} size="large" error={status === STATUS_ERROR}>
          <Form.Group widths='equal'>
            <Form.Field>
              <input placeholder='Your original URL here' value={this.state.url} onChange={this.handleChange} />
            </Form.Field>
            <Button type='submit' loading={status === STATUS_LOADING} >Submit</Button>
          </Form.Group>
          <Message
            error
            content={errorMessage}
          />
          </Form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerURL: PropTypes.func.isRequired
}

const ConnectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register);


export default ConnectedRegister;