import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/createemp.css'

const CreateEmp = () => {

   

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [gender, setGender] = useState()
    const [designation, setDesignation] = useState()
    const [course, setCourse] = useState()
    const [image, setImage] = useState()

    let navigate = useNavigate()

    let handleCreateEmp = (e)=> {
        e.preventDefault();

        

        let employeeDetails = {
            name, email, mobile, gender, course, designation, image
        }
    
        let config = {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(employeeDetails)
        }

        fetch("http://localhost:5000/employee", config)
        .then(()=> {
            alert("Added successfully");
            navigate('/employeelist')
        })

        
    }
    
    return (
        <div className='create-emp'>
            <div className='create-container'>
            <h1>Create Employee</h1>
                <form onSubmit={handleCreateEmp}>
                    <input type='text' className='text' placeholder='Enter Name' onChange={(e)=> setName(e.target.value)} required/>
                    <input type='text' className='text' placeholder='Email' onChange={(e)=> setEmail(e.target.value)} required/>
                    <input type='text' className='text' placeholder='Mobile number' onChange={(e)=> setMobile(e.target.value)} required/>
                    <select id='designation' onChange={(e)=> setDesignation(e.target.value) }>
                        <option value='Designation'>Designation</option>
                        <option value='CTO'>CTO</option>
                        <option value='manager'>manager</option>
                        <option value='CEO'>CEO</option>
                    </select>
                    <fieldset>
                            <legend align="center">Gender</legend>
                            <label htmlFor='male'><input type="radio" id='male' name='gender' onClick={()=> setGender('Male')} /> Male</label>
                            <label htmlFor='female'><input type="radio" id="female" name='gender'  onClick={()=> setGender('Female')}/> Female</label>
                    </fieldset>
                        <input className='text' type='' placeholder='Course' onChange={(e)=> setCourse(e.target.value)} required/>
                        <input className='text' type='' placeholder='Upload image' onChange={(e)=> setImage(e.target.value)} required/>
                        <button type='submit'>ADD</button>
                </form>
            </div>
        </div>
    )
}

export default CreateEmp