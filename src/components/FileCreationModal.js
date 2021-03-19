import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default class FileCreationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    }

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle = () => {
    this.setState({ show: !this.state.show });
  }

  handleSubmit = async () => {
    if (this.props.doAddFile)
      this.props.doAddFile(this.state.name);
    this.toggle();
  }

  onTextChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <>
        <Button style={{ width: "10rem" }} size="sm" variant="dark" onClick={this.toggle}>Créer un fichier</Button>
        <Modal show={this.state.show} onHide={this.toggle} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Créer un fichier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Control name="name" type="text" size="sm" placeholder="Nom fichier" value={this.state.name ? this.state.bame : ""} onChange={this.onTextChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.toggle}>
              Annuler
            </Button>
            <Button variant="primary" disabled={!this.state.name.length} onClick={this.handleSubmit}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}