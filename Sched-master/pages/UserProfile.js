import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function UserProfile() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEdit = (userId) => {
        // Fetch user data for editing
        axios.get(`/api/users/${userId}`)
            .then(response => {
                const userData = response.data;
                setSelectedUser(userData);
                // Update the form fields with the user data for editing
                // Implement logic to open an edit form with user data
            })
            .catch(error => {
                console.error(error);
                // Handle the error appropriately
            });
    };

    const handleDelete = (userId) => {
        // You can add a confirmation dialog here to confirm user deletion
        if (window.confirm("Are you sure you want to delete this user?")) {
            // Send an HTTP request to delete the user with the specified userId
            axios
                .delete(`/api/users/${userId}`)
                .then((response) => {
                    console.log(response.data);
                    // Handle success or update the users state to reflect the deletion
                })
                .catch((error) => {
                    console.error(error);
                    // Handle the error appropriately
                });
        }
    };

    const onSubmit = (data) => {
        if (selectedUser) {
            // Send a PUT request to update an existing user
            axios.put(`/api/users/${selectedUser.id}`, data)
                .then(response => {
                    console.log(response.data);
                    // Handle success or update the users state
                    setSelectedUser(null); // Clear the selected user after editing
                })
                .catch(error => {
                    console.error(error);
                    // Handle the error appropriately
                });
        } else {
            // If selectedUser is null, it means you are creating a new user
            // Send a POST request to create a new user
            axios.post('/user-manager', {
                id: null, // You might not need to include the ID if it's auto-generated
                firstName: data["First name"],
                lastName: data["Last name"],
                militaryEmail: data["Mil Email"],
                civilianEmail: data["Civ Email"],
                phoneNumber: data["Personal Phone"],
                officeNumber: data["Office Phone"],
                rank: data["Rank"],
                flight: data["Flight"],
                workCenter: data["Workcenter"],
                teams: [data["Teams"]],
                admin: data["Admin"] === "True", // Assuming "Admin" can be either "True" or "False"
            })
                .then(response => {
                    console.log(response.data);
                    // You can update the users state or show a success message
                })
                .catch(error => {
                    console.error(error);
                    // Handle the error appropriately
                });
        }
    };

    useEffect(() => {
        // Fetch and display user data from the server
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
                // Handle the error appropriately
            });
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
                <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
                <input type="text" placeholder="Mil Email" {...register("Mil Email", {required: true})} />
                <input type="text" placeholder="Civ Email" {...register} />
                <input type="tel" placeholder="Personal Phone" {...register("Personal Phone", {required: true})} />
                <input type="tel" placeholder="Office Phone" {...register("Office Phone", {required: true})} />
                <select {...register("Rank", { required: true })}>
                    <option value="AB">AB</option>
                    <option value="Amn">Amn</option>
                    <option value="A1C">A1C</option>
                    <option value="SrA">SrA</option>
                    <option value="SSgt">SSgt</option>
                    <option value="TSgt">TSgt</option>
                    <option value="MSgt">MSgt</option>
                    <option value="SMSgt">SMSgt</option>
                    <option value="CMSgt">CMSgt</option>
                    <option value="CCM">CCM</option>
                    <option value="CMSAF">CMSAF</option>
                    <option value="2nd Lt">2nd Lt</option>
                    <option value="1st Lt">1st Lt</option>
                    <option value="Capt">Capt</option>
                    <option value="Maj">Maj</option>
                    <option value="Lt Col">Lt Col</option>
                    <option value="Col">Col</option>
                    <option value="Brig Gen">Brig Gen</option>
                    <option value="Maj Gen">Maj Gen</option>
                    <option value="Lt Gen">Lt Gen</option>
                    <option value="Gen">Gen</option>
                    <option value="GOAF">GOAF</option>
                </select>
                <select {...register("Flight", { required: true })}>
                    <option value="CMD">CMD</option>
                    <option value="SCO1">SCO1</option>
                    <option value="SCO2">SCO2</option>
                    <option value="SCP">SCP</option>
                </select>
                <select {...register("Workcenter", { required: true })}>
                    <option value="SCOP">SCOP</option>
                    <option value="SCOS">SCOS</option>
                    <option value="SCOX">SCOX</option>
                    <option value="SCOI">SCOI</option>
                    <option value="SCOT">SCOT</option>
                </select>
                <select {...register("Teams", { required: true })}>
                    <option value="222ALL">222ALL</option>
                    <option value="PTL">PTL</option>
                    <option value="Training">Training</option>
                    <option value="Booster">Booster</option>
                    <option value="Top3">Top3</option>
                    <option value="Rising6">Rising6</option>
                    <option value="Flt Leadership">Flt Leadership</option>
                    <option value="DOMOPS">DOMOPS</option>
                    <option value="Viewer">Viewer</option>
                </select>
                <select {...register("Admin")}>
                    <option value="True">True</option>
                    <option value="False">False</option>
                </select>
            </form>

            <input type="submit" />
            {selectedUser && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="First name"
                        {...register("firstName", { required: true, maxLength: 80 })}
                        defaultValue={selectedUser.firstName} // Pre-fill user data
                    />

                    <input
                        type="text"
                        placeholder="Last name"
                        {...register("lastName", { required: true, maxLength: 100 })}
                        defaultValue={selectedUser.lastName}
                    />

                    <input
                        type="text"
                        placeholder="Mil Email"
                        {...register("militaryEmail", { required: true })}
                        defaultValue={selectedUser.militaryEmail}
                    />

                    <input
                        type="text"
                        placeholder="Civ Email"
                        {...register("civilianEmail")}
                        defaultValue={selectedUser.civilianEmail}
                    />

                    <input
                        type="tel"
                        placeholder="Personal Phone"
                        {...register("phoneNumber", { required: true })}
                        defaultValue={selectedUser.phoneNumber}
                    />

                    <input
                        type="tel"
                        placeholder="Office Phone"
                        {...register("officeNumber", { required: true })}
                        defaultValue={selectedUser.officeNumber}
                    />

                    <select {...register("rank", { required: true })} defaultValue={selectedUser.rank}>
                        <option value="">Select Rank</option> {/* Placeholder */}
                        <option value="AB">AB</option>
                        <option value="Amn">Amn</option>
                        <option value="A1C">A1C</option>
                        <option value="SrA">SrA</option>
                        <option value="SSgt">SSgt</option>
                        <option value="TSgt">TSgt</option>
                        <option value="MSgt">MSgt</option>
                        <option value="SMSgt">SMSgt</option>
                        <option value="CMSgt">CMSgt</option>
                        <option value="CCM">CCM</option>
                        <option value="CMSAF">CMSAF</option>
                        <option value="2nd Lt">2nd Lt</option>
                        <option value="1st Lt">1st Lt</option>
                        <option value="Capt">Capt</option>
                        <option value="Maj">Maj</option>
                        <option value="Lt Col">Lt Col</option>
                        <option value="Col">Col</option>
                        <option value="Brig Gen">Brig Gen</option>
                        <option value="Maj Gen">Maj Gen</option>
                        <option value="Lt Gen">Lt Gen</option>
                        <option value="Gen">Gen</option>
                        <option value="GOAF">GOAF</option>
                    </select>

                    <select {...register("flight", { required: true })} defaultValue={selectedUser.flight}>
                        <option value="">Select Flight</option> {/* Placeholder */}
                        <option value="CMD">CMD</option>
                        <option value="SCO1">SCO1</option>
                        <option value="SCO2">SCO2</option>
                        <option value="SCP">SCP</option>
                        {/* Add more flight options here */}
                    </select>

                    <select {...register("workCenter", { required: true })} defaultValue={selectedUser.workCenter}>
                        <option value="">Select Work Center</option> {/* Placeholder */}
                        <option value="SCOP">SCOP</option>
                        <option value="SCOS">SCOS</option>
                        <option value="SCOX">SCOX</option>
                        <option value="SCOI">SCOI</option>
                        <option value="SCOT">SCOT</option>
                        {/* Add more work center options here */}
                    </select>

                    <select {...register("teams", { required: true })} defaultValue={selectedUser.teams}>
                        <option value="">Select Teams</option> {/* Placeholder */}
                        <option value="222ALL">222ALL</option>
                        <option value="PTL">PTL</option>
                        <option value="Training">Training</option>
                        <option value="Booster">Booster</option>
                        <option value="Top3">Top3</option>
                        <option value="Rising6">Rising6</option>
                        <option value="Flt Leadership">Flt Leadership</option>
                        <option value="DOMOPS">DOMOPS</option>
                        <option value="Viewer">Viewer</option>
                        {/* Add more team options here */}
                    </select>

                    <select {...register("admin")} defaultValue={selectedUser.admin ? "True" : "False"}>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                    {/* Include other input fields for editing user properties */}
                    <input type="submit" value="Save Changes" />
                </form>
            )}


            <h2>Users</h2>
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mil Email</th>
                    <th>Civ Email</th>
                    <th>Personal Phone</th>
                    <th>Office Phone</th>
                    <th>Rank</th>
                    <th>Flight</th>
                    <th>Workcenter</th>
                    <th>Teams</th>
                    <th>Admin</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    {/* Add more table headers for other user properties */}
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.milEmail}</td>
                        <td>{user.civEmail}</td>
                        <td>{user.personalPhone}</td>
                        <td>{user.officePhone}</td>
                        <td>{user.rank}</td>
                        <td>{user.flight}</td>
                        <td>{user.workcenter}</td>
                        <td>{user.teams}</td>
                        <td>{user.admin}</td>
                        <td>
                            <button onClick={() => handleEdit(user.id)}>Edit</button>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                        {/* Add more table data cells for other user properties */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserProfile;