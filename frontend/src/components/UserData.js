import React from 'react'

const UserData = (props) => {

    const { name, email, password, address, company, role, skills, certifications } = props.data;

    return (
        <>
            <div className='text-center mt-5 pt-5'>
                <h1>User Data</h1>
            </div>
            <div className='table-style'>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Skills</th>
                            <th>Certifications</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{address}</td>
                            <td>{company}</td>
                            <td>{role}</td>
                            <td>{skills}</td>
                            <td>{certifications}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserData
