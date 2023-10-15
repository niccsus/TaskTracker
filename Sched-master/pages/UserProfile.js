import React, { useEffect, useState } from 'react';
import "../components/user-management";




function UserProfile({ users = [] }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [militaryEmail, setMilitaryEmail] = useState('');
    const [civilianEmail, setCivilianEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [officeNumber, setOfficeNumber] = useState('');
    const [rank, setRank] = useState("");
    const [flight, setFlight] = useState("");
    const [workCenter, setWorkCenter] = useState("");
    const [admin, setAdmin] = useState("");
    const [teams, setTeams] = useState([]);
    const [id, setId] = useState("");
    const [ranks, setRanks] = useState([]);
    const [flights, setFlights] = useState([]);
    const [workcenters, setWorkCenters] = useState([]);

    useEffect(() => {
        const selectFieldCss = {
            width: "100%",
            fontSize: "1.5vh",
            borderRadius: "2px",
            verticalAlign: "center",
        };


        const rankSelect = document.getElementById("input-rank");
        if (rankSelect) {
            rankSelect.setAttribute("data-placeholder", "Rank");
            const rankChosen = document.getElementById("input_rank_chosen");
            if (rankChosen) {
                rankChosen.style.width = selectFieldCss.width;
                rankChosen.style.fontSize = selectFieldCss.fontSize;
                rankChosen.style.borderRadius = selectFieldCss.borderRadius;
                rankChosen.style.verticalAlign = selectFieldCss.verticalAlign;

            }
        }

        const flightSelect = document.getElementById("input-flight");
        if (flightSelect) {
            flightSelect.setAttribute("data-placeholder", "Flight");
            const flightChosen = document.getElementById("input_flight_chosen");
            if (flightChosen) {
                flightChosen.style.width = selectFieldCss.width;
                flightChosen.style.fontSize = selectFieldCss.fontSize;
                flightChosen.style.borderRadius = selectFieldCss.borderRadius;
                flightChosen.style.verticalAlign = selectFieldCss.verticalAlign;

            }
        }

        const workcenterSelect = document.getElementById("input-workcenter");
        if (workcenterSelect) {
            workcenterSelect.setAttribute("data-placeholder", "Workcenter");
            const workcenterChosen = document.getElementById("input_workcenter_chosen");
            if (workcenterChosen) {
                workcenterChosen.style.width = selectFieldCss.width;
                workcenterChosen.style.fontSize = selectFieldCss.fontSize;
                workcenterChosen.style.borderRadius = selectFieldCss.borderRadius;
                workcenterChosen.style.verticalAlign = selectFieldCss.verticalAlign;

            }
        }

        const teamsSelect = document.getElementById("input-teams");
        if (teamsSelect) {
            teamsSelect.setAttribute("data-placeholder", "Teams");
            const teamsChosen = document.getElementById("input_teams_chosen");
            if (teamsChosen) {
                teamsChosen.style.width = selectFieldCss.width;
                teamsChosen.style.fontSize = selectFieldCss.fontSize;
                teamsChosen.style.borderRadius = selectFieldCss.borderRadius;
                teamsChosen.style.verticalAlign = selectFieldCss.verticalAlign;

            }
        }

        const adminSelect = document.getElementById("input-admin");
        if (adminSelect) {
            adminSelect.setAttribute("data-placeholder", "Admin");
            const adminChosen = document.getElementById("input_admin_chosen");
            if (adminChosen) {
                adminChosen.style.width = selectFieldCss.width;
                adminChosen.style.fontSize = selectFieldCss.fontSize;
                adminChosen.style.borderRadius = selectFieldCss.borderRadius;
                adminChosen.style.verticalAlign = selectFieldCss.verticalAlign;

            }
        }
    }, []);
    return (
        <div className="userProfile">
            <h1>Profile</h1>
            <main className="user-management-main">
                <div class="left user-table-div">
                    <div class="top-left">
                        <h1>User List</h1>
                    </div>
                    <div class="bottom-left">

                        <table class="user-table">
                            <thead class="user-table-header">
                            <tr>
                                <th class="user-table-header-entry">Name</th>
                                <th class="user-table-header-entry">Rank</th>
                                <th class="user-table-header-entry">Workcenter</th>
                                <th class="user-table-header-entry">Flight</th>
                            </tr>
                            </thead>

                            <tbody>
                            {users.map((user) => (
                                <tr
                                    onClick={() => updateSelectedUser(user.id)}
                                    className="user-table-row"
                                    key={`user-list-row-${user.id}`}
                                >
                                    <td className="user-table-entry">
                                        {user.approved ? `${user.firstName} ${user.lastName}` : `[PENDING] ${user.firstName} ${user.lastName}`}
                                    </td>
                                    <td className="user-table-entry">{user.rank}</td>
                                    <td className="user-table-entry">{user.workCenter}</td>
                                    <td className="user-table-entry">{user.flight}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>



                    <div class="right">
                        <div class="top-right">
                            <h1>User Editor</h1>
                        </div>
                        <div class="bottom-right user-editor-div">
                            <div class="user-management-editor-div">

                                <form className="user-management-table-form" autoComplete="off" action="/user-manager" method="post">
                                    <table class="user-management-table">
                                        <tr>
                                            <th class="user-management-entry">First Name</th>
                                            <td class="user-management-value-cell">
                                                <input
                                                    id="input-first_name"
                                                    className="user-management-value"
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Last Name</th>
                                            <td class="user-management-value-cell">
                                                <input
                                                    id="input-last_name"
                                                    className="user-management-value"
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Mil Email</th>
                                            <td class="user-management-value-cell">
                                                <input
                                                    id="input-mil_email"
                                                    className="user-management-value"
                                                    type="email"
                                                    value={militaryEmail}
                                                    onChange={(e) => setMilitaryEmail(e.target.value)}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Civ Email</th>
                                            <td class="user-management-value-cell">
                                                <input
                                                    id="input-civ_email"
                                                    className="user-management-value"
                                                    type="email"
                                                    value={civilianEmail}
                                                    onChange={(e) => setCivilianEmail(e.target.value)}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Personal Phone</th>
                                            <td class="user-management-value-cell">
                                                <input
                                                    id="input-personal_phone"
                                                    className="user-management-value"
                                                    type="text"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Office Phone</th>
                                            <td class="user-management-value-cell">
                                                <input
                                                    id="input-office_phone"
                                                    className="user-management-value"
                                                    type="text"
                                                    value={officeNumber}
                                                    onChange={(e) => setOfficeNumber(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Rank</th>
                                            <td class="user-management-value-cell">
                                                <select
                                                    id="input-rank"
                                                    value={rank}
                                                    onChange={(e) => setRank(e.target.value)}
                                                >
                                                    <option value="">No Rank Selected</option>
                                                    {ranks.map((rankOption) => (
                                                        <option key={rankOption} value={rankOption}>
                                                            {rankOption}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Flight</th>
                                            <td class="user-management-value-cell">
                                                <select
                                                    id="input-flight"
                                                    value={flight}
                                                    onChange={(e) => setFlight(e.target.value)}
                                                >
                                                    <option value="">No Flight Selected</option>
                                                    {flights.map((flightOption) => (
                                                        <option key={flightOption} value={flightOption}>
                                                            {flightOption}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Workcenter</th>
                                            <td class="user-management-value-cell">
                                                <select
                                                    id="input-workcenter"
                                                    value={workCenter}
                                                    onChange={(e) => setWorkCenter(e.target.value)}
                                                >
                                                    <option value="">No Workcenter Selected</option>
                                                    {workcenters.map((workcenterOption) => (
                                                        <option key={workcenterOption} value={workcenterOption}>
                                                            {workcenterOption}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Teams</th>
                                            <td class="user-management-value-cell">
                                                <select
                                                    multiple
                                                    id="input-teams"
                                                    value={teams}
                                                    onChange={(e) => setTeams(Array.from(e.target.selectedOptions, (option) => option.value))}
                                                >
                                                    {teams.map((teamOption) => (
                                                        <option key={teamOption} value={teamOption}>
                                                            {teamOption}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="user-management-entry">Admin</th>
                                            <td class="user-management-value-cell">
                                                <select
                                                    id="input-admin"
                                                    value={admin}
                                                    onChange={(e) => setAdmin(e.target.value === "true")}
                                                >
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </td>
                                        </tr>

                                        <tr>
                                            <input
                                                id="input-id"
                                                type="hidden"
                                                value={id}
                                            />
                                        </tr>
                                    </table>

                                    <div class="user-edit-button-div">
                                        <button
                                            id="user-submit-button"
                                            className="user-edit-submit"
                                            type="submit"
                                            name="submit"
                                            onClick={changeToUserSubmit()}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            id="user-delete-button"
                                            className="user-edit-submit user-edit-delete"
                                            type="submit"
                                            name="delete"
                                            onClick={changeToUserDelete()}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>



            </main>
        </div>


    );
}

export default UserProfile;