import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Sidebar from './Sidebar';
import PickupPointForm from '../../components/PickupPointForm';

const PickupPoints = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('create');
  const [pickupPoints, setPickupPoints] = useState([]);
  const [pickupPointData, setPickupPointData] = useState({
    location: '',
    name: '',
  });

  const handleClose = () => {
    setShow(false);
    setPickupPointData({ location: '', name: '' });
    setStatus('create');
  };
  const handleShow = () => setShow(true);

  const getPickupPoints = async () => {
    const { data } = await axios.get('http://localhost:5000/pickup-points');
    console.log(data);
    setPickupPoints(data.data);
  };

  const createPickupPoint = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/pickup-points/create', pickupPointData);
    console.log(data);
    if (data.message === 'Created pickup point') {
      setPickupPoints([...pickupPoints, data.data]);
      handleClose();
    }
  };
  const editPickupPoint = async (e) => {
    e.preventDefault();
    //1.get/fetch the specific pickuppoint we will be editing using the id
    //2.Populate our form using the data we fetch
    const { data } = await axios.post(
      `http://localhost:5000/pickup-points/update/${pickupPointData._id}`,
      pickupPointData
    );
    console.log(data);
    //3.send a request to the server with the new captured data and the id of the pickup point
    //4.update array of pickup points to reflect the changes
    if (data.message === 'Updated pickup point') {
      let updatedPickupPoints = pickupPoints.map((pickupPoint) => {
        if (pickupPoint._id === pickupPointData._id) {
          return data.data;
        } else {
          return pickupPoint;
        }
      });

      setPickupPoints(updatedPickupPoints);

      //5.close the modal
      handleClose();
    }
  };
  const handleEdit = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/pickup-points/${id}`);
    console.log(data);
    if (data.message === 'Fetched pickup point') {
      setStatus('edit');
      setPickupPointData(data.data);
      handleShow();
    }
  };

  const deletePickupPoint = async (id) => {
    const { data } = await axios.post(`http://localhost:5000/pickup-points/delete/${id}`);
    console.log(data);

    if (data.message === 'deleted pickup points') {
      let remainingPickupPoints = pickupPoints.filter((pickupPoint) => {
        return pickupPoint._id !== id;
      });
      setPickupPoints(remainingPickupPoints);
    }
  };

  useEffect(() => {
    getPickupPoints();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="adminContainer">
        <h1>Pickup points</h1>
        <button onClick={handleShow} className="createBtn">
          Create Pickup Points
        </button>
        <PickupPointForm
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
          status={status}
          pickupPointData={pickupPointData}
          setPickupPointData={setPickupPointData}
          createPickupPoint={createPickupPoint}
          editPickupPoint={editPickupPoint}
        />
        {/* {Assignment: Add a react bootstrap table} */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Location</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pickupPoints.map((pickupPoint) => {
              return (
                <tr key={pickupPoint._id}>
                  <td>{pickupPoint._id}</td>
                  <td>{pickupPoint.location}</td>
                  <td>{pickupPoint.name}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(pickupPoint._id);
                      }}
                      className="editBtn"
                    >
                      Edit
                    </button>
                    <button onClick={() => deletePickupPoint(pickupPoint._id)} className="deleteBtn">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default PickupPoints;
