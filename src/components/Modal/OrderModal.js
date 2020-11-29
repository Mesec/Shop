import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const orderModal = () => {
  return (
    <Modal show={false}>
      <Modal.Header style={{ marginBottom: "20px" }}>
        <Modal.Title>Order Now</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form type="submit">
          <Form.Group>
            <Form.Control
              type="text"
              name="address"
              placeholder="Address"
              size="sm"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Phone Number"
              size="sm"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer style={{ position: "relative", bottom: "10px" }}>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default orderModal;
