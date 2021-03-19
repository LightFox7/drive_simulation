import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default class ImportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      ready: false,
      file: undefined,
      name: "",
      err: ""
    }

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  toggle = () => {
    this.setState({ show: !this.state.show });
  }

  handleSubmit = async () => {
    if (this.props.doAddFile)
      this.props.doAddFile(this.state.name, this.state.file);
    this.toggle();
  }

  handleFileUpload = e => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      if (bstr)
        this.setState({ file: bstr, ready: true, name: file.name});
    };
    reader.readAsText(file, "UTF-8");
  }

  render() {
    return (
      <>
        <Button style={{ width: "10rem" }} size="sm" variant="dark" onClick={this.toggle}>Importer un fichier</Button>
        <Modal show={this.state.show} onHide={this.toggle} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Importer un fichier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.err ? this.state.err : ""}
            <Form.Group>
              <input
                type="file"
                onChange={this.handleFileUpload}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.toggle}>
              Annuler
            </Button>
            <Button variant="primary" disabled={!this.state.ready} onClick={this.handleSubmit}>
              Importer
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}