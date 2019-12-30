/* global document, browser, chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './options.scss';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serverPath: 'http://localhost:7000', custom: false, saved: false };

    this.handleServer = this.handleServer.bind(this);
    this.handleCustomServer = this.handleCustomServer.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleCustomServer(event) {
    this.setState({ ...this.state, saved: false, serverPath: event.target.value });
  }

  handleServer(event) {
    if (event.target.value !== 'custom') {
      this.setState({ serverPath: event.target.value, saved: false, custom: false });
    } else {
      this.setState({ ...this.state, custom: true, saved: false });
    }
  }

  handleSave(event) {
    (chrome || browser).storage.sync.set({
      serverPath: this.state.serverPath,
    }, () => {
      this.setState({ ...this.state, saved: true });
    });
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSave} className="Options__form">
        <Form.Group>
          <Form.Label>Choose server path:</Form.Label>
          <Form.Control as="select" onChange={this.handleServer}>
            <option>http://localhost:7000</option>
            <option>http://sample.com:7000</option>
            <option>custom</option>
          </Form.Control>
        </Form.Group>
        {this.state.custom &&
        <Form.Group>
          <Form.Label>Custom server address</Form.Label>
          <Form.Control value={this.state.serverPath} onChange={this.handleCustomServer} type="text" />
        </Form.Group>}
        <Form.Group>
          <Button type="submit" className="Options_save">Save</Button>
          {this.state.saved && <Alert variant="success">Options saved</Alert>}
        </Form.Group>
      </Form>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('display-container'));
