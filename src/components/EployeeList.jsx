import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/employeelist.css'
import Navbar from './Navbar';

import Overlay from "react-overlay-component";
import { Modal } from "antd"

const EployeeList = () => {

    let navigate = useNavigate()

    const [id, setId] = useState()
    const [data, setData] = useState()
    const [deleted, setDeleted] = useState()
    const [searchKey, setSearchKey] = useState()
    const [updateData, setUpdateData] = useState()

    const [updated, setUpdated] = useState(false)

    let name = useRef()
    let email = useRef()
    let mobile = useRef()
    let designation = useRef()
    let gender = useRef()
    let course = useRef()
    let image = useRef()

    console.log(updateData);

    const [isOpen, setOverlay] = useState(false);

    const closeOverlay = () => setOverlay(false);

    const configs = {
        animate: true,
        // top: `5em`,
        // clickDismiss: false,
        // escapeDismiss: false,
        // focusOutline: false,
    };


    const fetchData = () => {
        fetch(" http://localhost:5000/employee/")
            .then((response) => response.json())
            .then((data) => setData(data))
    }

    useEffect(() => {
        fetchData()
    }, [deleted])

    const handleDelete = (id) => {
        // console.log(id);
        Modal.confirm({
            title: "Are you sure you want to delete this data?",
            okText: "DELETE",
            onOk: () => {
                fetch("http://localhost:5000/employee/" + id, { method: "DELETE" })
                setDeleted(deleted + 1)
            }
        })
    }

    let date = new Date().toLocaleDateString();





    const handleSearch = () => {
        fetch(" http://localhost:5000/employee")
            .then((response) => response.json())
            .then((data) => {
                data = data.filter((employee) => {
                    return (employee.name.toUpperCase().includes(searchKey.toUpperCase())
                    )
                })
                setData(data)
            })

    }

    let findEditData = (obj) => {

        name.current.value = obj.name;
        email.current.value = obj.email;
        mobile.current.value = obj.mobile;
        designation.current.value = obj.designation;
        gender.current.value = obj.gender;
        course.current.value = obj.course;
        image.current.value = obj.image

        setId(obj.id)
    }


    let handleUpdate = (e) => {
        e.preventDefault()

        let updatedEmployee = {
            name: name.current.value,
            email: email.current.value,
            mobile: mobile.current.value,
            designation: designation.current.value,
            gender: gender.current.value,
            course: course.current.value,
            image : image.current.value,
        }

        fetch("http://localhost:5000/employee/" + id, {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEmployee)
        })

        setUpdated(!updated)
        alert("Updated successfully")
        navigate('/employeelist')
        
        
    }


    return (
        <>
            <Navbar />
            <div className='employeeList'>
                <div className='search'>
                    <input type='search' placeholder='search here' onChange={(e) => setSearchKey(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                    <Link to='/createemp'><button className='create'>Create Employee</button></Link>
                </div>

                <div className='data-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Create Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.map((value) => {
                                    return <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td><img src={value.image} alt='' /></td>
                                        <td>{value.name}</td>
                                        <td>{value.email}</td>
                                        <td>{value.mobile}</td>
                                        <td>{value.designation}</td>
                                        <td>{value.gender}</td>
                                        <td>{value.course}</td>
                                        <td>{date}</td>
                                        <td>
                                            <button className='edit-button' onClick={(e) => { return setOverlay(true), findEditData(value) }}>EDIT</button>
                                            <button className='delete-button' onClick={(e) => { handleDelete(value.id) }}>DELETE</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay}>
                    <h2 className='edit-header'>Update Data</h2>
                    <form className='edit-form' onSubmit={handleUpdate}>
                        <label form=''>Name:</label>
                        <input type='text' ref={name} />
                        <label form=''>Email:</label>
                        <input type='text' ref={email} />
                        <label form=''>Mobile:</label>
                        <input type='text' ref={mobile} />
                        <label form=''>Disgnation:</label>
                        <input type='text' ref={designation} />
                        <label form=''>Gender:</label>
                        <input type='text' ref={gender} />
                        <label form=''>Course:</label>
                        <input type='text' ref={course} />
                        <label form=''>Image:</label>
                        <input type='text' ref={image} />
                        <button type='submit'>UPDATE</button>
                    </form>
                </Overlay>
            </div>
        </>
    )
}

export default EployeeList