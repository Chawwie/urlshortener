
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { registerURL } from '../actions';

import { List, Container, Button, Form, Header, Message } from 'semantic-ui-react'

import './Register.css';

const mapDispatchToProps = (dispatch) => {
  return {
    registerURL: (url) => dispatch(registerURL(url))
  }
}

class Register extends React.Component {

  state = { url: '', shorturl: '', success: false };

  handleChange = (event) => {
    this.setState({url: event.target.value});
  }

  handleSubmit = () => {
    this.props.registerURL(this.state.url);
  }
  
  render() {
    return (
      <div className="register-container">
        <div className="input-container">
          <Header as='h2' content='Simplify your links' inverted />
          <Form onSubmit={this.handleSubmit} size="large">
          <Form.Group widths='equal'>
            <Form.Field>
              <input placeholder='Your original URL here' value={this.state.url} onChange={this.handleChange} />
            </Form.Field>
            <Button type='submit' >Submit</Button>
          </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerURL: PropTypes.func.isRequired
}

const ConnectedRegister = connect(null, mapDispatchToProps)(Register);


export default ConnectedRegister;