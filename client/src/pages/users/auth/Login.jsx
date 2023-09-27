// const Login = ()=>{
//     return(
//         <div className="loginBody">
//         <div className="login">

//             <h5 className="h5">Login</h5>
//             <hr/>
//             <form className="form">
//             <input className="email" placeholder="Email"></input>
//             <input className="password" placeholder="Password"></input>
//             <button className="submit" type="submit">Submit</button>
//             </form>
            
//         </div>
//         </div>
//     )
// }

// export default Login

import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
const Login = () => {
  const [loginData, setLoginData] = useState({email: '', password: ''})
  const login = async(e) =>{
    e.preventDefault();
    const {data} = await axios.post('http://localhost:5000/login', loginData);
    console.log(data);
    if(data.message === 'User authenticated successfully'){
      Cookies.set('token', data.token);
      // navigate to home page
      window.open('/', '_self');
    }
  }
  return (
    <div className="loginBody">
      <div className="login">
        <h1>Login</h1>
        <hr />
        <Form onSubmit={login}>
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Email"
            value={loginData.email}
            onChange={(e)=> setLoginData({...loginData, email: e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Password"
            value={loginData.password}
            onChange={(e)=> setLoginData({...loginData, password: e.target.value})}/>
          </Form.Group>
          <button className="submit">Login</button>
        </Form>
      </div>
    </div>
  );
};
export default Login;