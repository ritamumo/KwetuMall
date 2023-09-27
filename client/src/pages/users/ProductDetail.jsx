import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import authApi from '../../api/authApi';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const ProductDetail = () => {
  const { id } = useParams();
  const [counter, setCounter] = useState(1);
  const [product, setProduct] = useState({});
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const getProduct = async () => {
    const { data } = await axios.get(`http://localhost:5000/products/${id}`);
    if (data.message === 'Fetched products') {
      setProduct(data.data);
    }
  };

  const addToCart = async () => {
    const { data } = await authApi.post('/add-to-cart', { productId: id, quantity: counter });
    // axios.post(`add-to-cart`)
    console.log(data);
    if (data.message === 'Added to cart') {
      setSuccess('Successfully added to cart');
    } else {
      setErr(data.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container>
      <Navbar></Navbar>
      <Row className="productCard">
        <Col>
          <img className="productCardImg" src={'http://localhost:5000/' + product.image}></img>
        </Col>

        <Col className=".productDetails">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <div className="flex">
            <div className="flex">
              <button className="counterBtn" onClick={() => setCounter(counter + 1)}>
                +
              </button>
              <p className="counter">{counter}</p>
              <button className="counterBtn" onClick={() => setCounter(counter - 1)}>
                -
              </button>
            </div>
            <p> Ksh {(product.sellingPrice * counter).toLocaleString()}</p>
          </div>
          <button onClick={addToCart} className="submit">
            Add to cart
          </button>
          {success ? (
            <>
              <p style={{ color: 'green' }}>Product added to cart</p>
              <p>
                To continue shopping click <a href="/">here</a>
              </p>
              <p>
                To view your cart <a href="/cart">here</a>
              </p>
            </>
          ) : null}
          {err ? <p className="err">{err}</p> : null}
        </Col>
      </Row>
    </Container>
  );
};
export default ProductDetail;
