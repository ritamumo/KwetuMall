import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProductForm from '../../components/ProductForm';

import axios from 'axios';
import Table from 'react-bootstrap/Table';


const Products = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('create');
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    buyingPrice: '',
    sellingPrice: '',
    image: '',
    categories: [],
    description: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createProduct = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('name', productData.name);
    formData.append('buyingPrice', productData.buyingPrice);
    formData.append('sellingPrice', productData.sellingPrice);
    formData.append('stock', productData.stock);
    formData.append('image', productData.image);
    formData.append('description', productData.description);

    formData.append('categories', JSON.stringify(productData.categories));
    const { data } = await axios.post('http://localhost:5000/products/create', formData);
    console.log(data);

    //Activity
    //Adding the newly created product to list of products
    //close the modal
  };

const getProducts = async () => {
  //make a request to our server to get all the products
  const { data } = await axios.get('http://localhost:5000/products');
  if (data.message === 'Fetched products') {
    //store data ive gotten in a variable
    setProducts(data.data);
  }
};

// const deleteProduct = async(id)=>{
//   //make a arequest to the server to delete a product
//   console.log('gettinh here-frontend')
//   const { data } = await axios.post(`http://locahost:5000/products/delete/${id}`)
//   console.log(data)
//   //remove the deleted item from the table
//   if (data.message === 'Deleted product'){
//     let filteredProducts = products.filter((product)=>{
//       return product._id !==id
//     })
//     setProducts(filteredProducts)
//   }
// }

const deleteProduct = async (id) => {
  // 1. Make a request to our server to delete a product
  const { data } = await axios.post(`http://localhost:5000/products/delete/${id}`);
  console.log(data);
  // 2. Remove the deleted item from the table
  if (data.message === 'Deleted product') {
    let filteredProducts = products.filter((product) => {
      return product._id !== id;
    });
    setProducts(filteredProducts);
  }
};

const handleEdit = async (id) => {
  //1.Get product to be edited, populate the form with the data
  const { data } = await axios.get(`http://localhost:5000/products/${id}`);
  if (data.message === 'Fetched products') {
    setProductData(data.data);
    //2. change the status of the form to edit
    setStatus('edit');
    //3.open the model
    handleShow();
  }
};
const editProduct = async (e) => {
  e.preventDefault();

  let formData = new FormData();
  formData.append('name', productData.name);
  formData.append('buyingPrice', productData.buyingPrice);
  formData.append('sellingPrice', productData.sellingPrice);
  formData.append('stock', productData.stock);
  if (productData.image) {
    formData.append('image', productData.image);
  }

  formData.append('description', productData.description);

  formData.append('categories', JSON.stringify(productData.categories));
  const { data } = await axios.post(`http://localhost:5000/products/update/${productData._id}`, formData);
  console.log(data);

  if (data.message === 'Updated Product') {
    let newProducts = products.map((product) => {
      if (product._id === productData._id) {
        return data.data;
      } else {
        return product;
      }
    
    });
    setProducts(newProducts)
    handleClose();
  }
}

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="adminContainer">
        <h1>Products</h1>
        <button onClick={handleShow} className="createBtn">
          Create Product
        </button>
        <ProductForm
          show={show}
          handleClose={handleClose}
          status={status}
          setProductData={setProductData}
          productData={productData}
          createProduct={createProduct}
          editProduct={editProduct}
        />

        <Table striped bordered hover>
          {/* //      - name
      - sellingPrice
      - stock
      - categories
      - description */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Selling Price</th>
              <th>Stock</th>
              <th>Categories</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <img className="productImg" src={'http://localhost:5000/' + product.image} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.sellingPrice}</td>
                  <td>{product.stock}</td>
                  <td>{product.categories}</td>
                  <td>{product.description}</td>
                  <td>
                    <button onClick={() => handleEdit(product._id)} className="editBtn">
                      Edit
                    </button>
                    <button onClick={() => deleteProduct(product._id)} className="deleteBtn">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default Products;
