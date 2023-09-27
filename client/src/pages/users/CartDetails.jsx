import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { TrashCan } from '@carbon/icons-react';
import CheckoutForm from '../../components/CheckoutForm';
import authApi from '../../api/authApi';

const CartDetails = () => {
  const [items, setItems] = useState([]);

  const getCartItems = async () => {
    const { data } = await authApi.get('/get-cart-items');
    console.log(data);
    if (data.message === 'Fetched cart items') {
      setItems(data.data);
    }
  };

  const getTotal =()=>{
    //[1,2,3,4]
    //[{product: {sellingPrice: 1000}, quantity: 1}]
    return items.reduce((a, b)=> a + (b.product.sellingPrice * b.quantity), 0)
    
  }
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <Container>
      <nav>
        <Navbar></Navbar>
      </nav>
      <div>
        {items.map((item) => {
          return (
            <div key={item.product._id}>
              <ul>
                <li className="cart">
                  <img style={{ height: '50px', width: '50px' }} src={'http://localhost:5000/' + item.product.image}></img>
                  <p style={{ margin: 0 }}>{item.product.name}</p>
                  <p style={{ margin: 0 }}>{item.quantity}</p>
                  <p style={{ margin: 0 }}>{item.product.sellingPrice}</p>
                  <p style={{ margin: 0 }}>
                    <TrashCan />
                  </p>
                </li>

                {/* <li className="cart">
                <img style={{height: '50px', width: '50px'}} src='/images/cardimage.png'></img> 
            <p style={{margin: 0}}>Fridge</p>
            <p style={{margin: 0}}>5</p>
            <p style={{margin: 0}}>20000</p>
            <p style={{margin: 0}}><TrashCan /></p>
            </li> */}
              </ul>
            </div>
          );
        })}

        <div></div>
        <p style={{ textAlign: 'center' }}>Total Ksh.{getTotal().toLocaleString()}</p>

        <CheckoutForm />
      </div>
    </Container>
  );
};

export default CartDetails;
