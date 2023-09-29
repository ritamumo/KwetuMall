import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import authAPI from '../api/authApi';
import SuccessAlert from './SuccessAlert';
import { useNavigate } from 'react-router-dom';

//{Location: Juja, name: Ecomatt } {location: 'CBD, name: odeon}
//set ->javascript conscept
const CheckoutForm = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [names, setNames] = useState([]);
  const [locations, setLocations] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getLocationNames = (location) => {
    let filteredPickupPoints = pickupPoints.filter((pickupPoint) => {
      return pickupPoint.location === location;
    });
    setNames(filteredPickupPoints);
  };

  const getPickupPoints = async () => {
    const { data } = await axios.get('http://localhost:5000/pickup-points');
    if (data.message === 'Fetched pickup points') setPickupPoints(data.data);
    let locationsArr = [];
    for (let i = 0; i < data.data.length; i++) {
      locationsArr = [...locationsArr, data.data[i].location];
    }
    //locationsArr will be equal to: ['Juja', 'CBD', 'Juja']
    let newLocations = new Set(locationsArr);
    setLocations([...newLocations]);
  };

  const checkOut = async (e) => {
    e.preventDefault();
    const { data } = await authAPI.post('/clear-cart');
    console.log(data);
    if (data.message === 'Successfully checked out') {
      setShowAlert(true);
      //timeout
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  };

  useEffect(() => {
    getPickupPoints();
  }, []);

  return (
    <div>
      <>
        <button onClick={handleShow} className="editBtn checkout">
          Proceed to checkout
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Checkout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <SuccessAlert showAlert={showAlert} setShowAlert={setShowAlert} />
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Select onChange={(e) => getLocationNames(e.target.value)}>
                  <option>Choose Location</option>
                  {locations.map((location) => {
                    return <option key={location}>{location}</option>;
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pickup Point</Form.Label>
                <Form.Select>
                  <option>Choose Pickup point</option>
                  {names.map((name) => {
                    return <option key={name._id}>{name.name}</option>;
                  })}
                </Form.Select>
              </Form.Group>
              <button onClick={checkOut} className="submit">
                Checkout
              </button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default CheckoutForm;
