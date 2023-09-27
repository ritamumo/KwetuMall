import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import CategoryForm from '../../components/CategoryForm';
import Sidebar from './Sidebar';

const Categories = () => {
  const [status, setStatus] = useState('create');
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({
    name: '',
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setStatus('create');
    setCategoryData({ name: '' });
  };
  const handleShow = () => setShow(true);

  const getCategories = async () => {
    // const response
    // response: {headers: '', data: '', status:''}
    // { data } -> destructuring
    const { data } = await axios.get('http://localhost:5000/categories');
    console.log(data);
    setCategories(data.data);
  };
  const editCategory = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`http://localhost:5000/categories/update/${categoryData._id}`, categoryData);
    console.log(data);
    if (data.message === 'Successsfully updated category') {
      let updatedCategories = categories.map((category) => {
        if (category._id === categoryData._id) {
          return data.data;
        } else {
          return category;
        }
      });
      setCategories(updatedCategories);
      //clear the form
      setCategoryData({ name: ' ' });
      //change the status of the form back to create
      setStatus('create');
      handleClose();
    }
  };

  const createCategory = async (e) => {
    //1.Get data from a form
    //2.send that data using the api for creating a category
    e.preventDefault();
    console.log('creating category');
    const { data } = await axios.post('http://localhost:5000/categories/create', categoryData);
    console.log(data);
    if (data.message === 'Successfully created category') {
      setCategories([...categories, data.data]);

      handleClose();
    }
  };
  const getCategory = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/categories/${id}`);
    console.log(data);
    if (data.message === 'Successsfully fetched category') {
      setCategoryData(data.data);
      setStatus('edit');
    }
  };

  const deleteCategory = async (id) => {
    const { data } = await axios.post(`http://localhost:5000/categories/delete/${id}`);
    console.log(data);
    //Automatically removes category
    if (data.message === 'Successsfully deleted category') {
      let remainingCategories = categories.filter((category) => {
        return category._id !== id;
      });
      setCategories(remainingCategories);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <Sidebar />
      <div className="adminContainer">
        <h1>Categories</h1>
        <button onClick={handleShow} className='createBtn'>Create Category</button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button
                      onClick={() => {
                        getCategory(category._id);
                        handleShow(); 
                      }} className='editBtn'
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteCategory(category._id)} className='deleteBtn'>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <CategoryForm
          categoryData={categoryData}
          setCategoryData={setCategoryData}
          createCategory={createCategory}
          status={status}
          editCategory={editCategory}
          show={show}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default Categories;
