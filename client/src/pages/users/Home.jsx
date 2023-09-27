import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from './Navbar';
import { ArrowRight } from '@carbon/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container';

const Home = () => {
  const navigate = useNavigate();
  const[products, setProducts] = useState([]);
  

  const getProducts = async ()=>{
    const { data} = await axios.get('http://localhost:5000/products');
    console.log(data)
    if(data.message === 'Fetched products'){
      setProducts(data.data)
    }
  }
  useEffect(()=>{
    getProducts();
  },[]);
  return (
    <Container>
    <div>
      <Navbar></Navbar>
      <div>
        <img className='cardImage' src="./images/cardimage.png" alt="cardimage"></img>
        <button className='itemBtn'>Items on sale <ArrowRight /></button>
      </div>
      <div>
        <Row xs={1} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product._id}>
              <Card style={{width:'210px', border:'none'}}>
                <Card.Img style={{height:'200px', width:'200px'}}  variant="top" src={'http://localhost:5000/' + product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text >
                    {product.description}
                  </Card.Text>
                  <div className='flex priceLine'>
                    <Card.Text style={{margin:0}}>{product.sellingPrice.toLocaleString()}</Card.Text>
                    <button onClick={()=>navigate(`/product-detail/${product._id}`)} className='viewBtn'>View</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
    </Container>
  );
};

export default Home;
