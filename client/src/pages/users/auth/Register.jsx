// const Register =()=>{
//     return(
//         <div>Register</div>
//     )
// }
// export default Register




import { useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useNavigate} from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstName: '', lastName: '', email: '', password: '', phoneNumber: ''
  });
  const register = async (e) => {
    e.preventDefault();
    console.log(registerData)
    const { data } = await axios.post('http://localhost:5000/register', registerData);
    console.log(data)
    if(data.message === 'User created'){
      navigate('/login')
    }
  }
  return (
    <div className="loginBody">
      <div className="register">
        <h1>Register</h1>
        <hr />
        <Form onSubmit={register}>
          <Row className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="First name"
                value={registerData.firstName}
                onChange={(e)=> setRegisterData({...registerData, firstName: e.target.value})}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={registerData.lastName}
                onChange={(e)=> setRegisterData({...registerData, lastName: e.target.value})}
              />
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e)=> setRegisterData({...registerData, email: e.target.value})}
            />
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e)=> setRegisterData({...registerData, password: e.target.value})}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Phone number"
                value={registerData.phoneNumber}
                onChange={(e)=> setRegisterData({...registerData, phoneNumber: e.target.value})}
              />
            </Col>
          </Row>
          <button className="submit">Register</button>
        </Form>
      </div>
    </div>
    // (First name, Last name) : row
    // email
    // (password, phone number) : row
  );
};
export default Register;