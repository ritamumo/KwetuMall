import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import axios from 'axios';

const ProductForm = ({ show, handleClose, status, productData, setProductData, createProduct, editProduct }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data } = await axios.get('http://localhost:5000/categories');
    console.log(data);
    if (data.message === 'Successsfully fetched categories') setCategories(data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{status === 'create' ? 'Create' : 'Edit'} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={status === 'create' ? createProduct : editProduct}>
            <Row className="mb-3">
              <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={productData.name}
                  placeholder="Product name"
                  onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Label>Buying Price</Form.Label>
                <Form.Control
                  type="number"
                  value={productData.buyingPrice}
                  placeholder="Buying Price"
                  onChange={(e) => setProductData({ ...productData, buyingPrice: e.target.value })}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Selling Price</Form.Label>
                <Form.Control
                  type="number"
                  value={productData.sellingPrice}
                  placeholder="Selling Price"
                  onChange={(e) => setProductData({ ...productData, sellingPrice: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={productData.stock}
                  placeholder="Quantity"
                  onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" 
                onChange={(e)=>setProductData({...productData, image: e.target.files[0]})} />
              </Col>
              <Col>
                <Form.Label>Categories</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setProductData({ ...productData, categories: [...productData.categories, e.target.value] })
                  }
                >
                  <option></option>
                  {categories.map((category) => {
                    return <option key={category._id}>{category.name}</option>;
                  })}
                </Form.Select>
              </Col>
            </Row>
            <div className="mb-3">
              {productData.categories.map((category, idx) => {
                return (
                  <span key={idx} className="deleteBtn">
                    {category}
                  </span>
                );
              })}
              {productData.categories.length > 0 ? (
                <span onClick={() => setProductData({ ...productData, categories: [] })} className='editBtn'>X</span>
              ) : null}
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                type="text"
                value={productData.description}
                placeholder="Description"
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              />
            </Form.Group>
            {/* {multer} */}

            <button className="submit">Submit</button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductForm;
