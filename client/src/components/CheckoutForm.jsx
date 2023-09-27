import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const CheckoutForm = () => {
  const [show, setShow] = useState(false);
  const [PickupPoints, setPickupPoints]= useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getPickupPoints = async() =>{
    const{ data } = await axios.get('http://localhost:5000/pickup-points')
    if (data.message === 'Fetched pickup points')
    setPickupPoints(data.data);
  }

  useEffect(()=>{
    getPickupPoints();
  }, [])

  return (
    <div>
      
      <>
        <button onClick={handleShow} className="editBtn checkout">Proceed to checkout</button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Checkout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>Location</Form.Label>
                    <Form.Select>
                        <option>Choose Location</option>
                        {
                            PickupPoints.map((pickupPoint)=>{
                                return <option key={pickupPoint._id}>{pickupPoint.location}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Pickup Point</Form.Label>
                    <Form.Select>Choose Pickup point</Form.Select>
                </Form.Group>
                <button className='submit'>Checkout</button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default CheckoutForm
