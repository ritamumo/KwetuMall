import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const PickupPointForm = ({
  show,
  handleShow,
  handleClose,
  status,
  pickupPointData,
  setPickupPointData,
  createPickupPoint,
  editPickupPoint,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{status === 'create' ? 'Create' : 'Edit'} PickupPoints</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={status === 'create' ? createPickupPoint : editPickupPoint}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="CBD"
                value={pickupPointData.location}
                onChange={(e) => {
                  setPickupPointData({ ...pickupPointData, location: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Star Mall"
                value={pickupPointData.name}
                onChange={(e) => {
                  setPickupPointData({ ...pickupPointData, name: e.target.value });
                }}
              />
              </Form.Group>
              <button className="pickuppointbtn" type="submit">
                Submit
              </button>
            
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PickupPointForm;
