import {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const CategoryForm = ({ categoryData, setCategoryData, createCategory,status, editCategory, show, handleClose }) => {
  
  return (
    
    <>
    {/* <Button variant="primary" onClick={handleShow}>
      Launch demo modal
    </Button> */}

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{status === 'create'? 'Create' : 'Edit'} Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={status ==='create'? createCategory: editCategory}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={categoryData.name}
          placeholder="Category name"
          onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
        />
      </Form.Group>
      {/* {setCategoryData('electronics')} */}

      <button type="submit" className='submit'>
        Submit
      </button>
    </Form>

      </Modal.Body>
  
    </Modal>
  </>
);
}



export default CategoryForm;
