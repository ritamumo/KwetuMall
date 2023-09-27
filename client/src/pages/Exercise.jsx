import { useState } from 'react'
import axios from "axios"

const Exercise = () => {
  const [studentData, setStudentData] = useState([]);

  const getStudentData = async () =>{
const {data} = await axios.get ('http://localhost:5000/students')
console.log(data);
setStudentData (data);
  }

  return (
    <>
      <div>
        <h1>Students</h1>
        <button onClick = {getStudentData}>Fetch</button>
        {
          studentData.map((student)=>{
            return(
              <p key ={student.name}>Name: {student.name} | Grade:{student.grade}</p>

            )
          })
        }

        
      </div>
    </>
  )
}

export default Exercise
