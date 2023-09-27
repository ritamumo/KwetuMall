export const hello = (req, res)=>{
    const str ='Hello World !!';
    res.send(str)
}

export const getStudentData = (req, res)=>{
    const students = [
        {name: 'Jane Doe', grade: 10 },
        {name: 'John Doe', grade: 9},
        {name: 'Sally Doe', grade: 7},
        {name: 'Peter Doe', grade: 8},
        {name: 'Ruth Doe', grade: 6},
        {name: 'Joe Doe', grade: 5},

    ]
    const users =[
        {name: 'John doe',email: 'johndoe@gmail.com'}
    ]
    res.send(
        students
    )
}