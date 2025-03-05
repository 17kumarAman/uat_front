import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import { Avatar } from "react-profile-avatar";
import "react-profile-avatar/dist/index.css";
import threedots from "../../images/thredonts.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import cut from "../../images/cutt.png";
import pluss from "../../images/pluss.png";

const MyProjects2 = () => {
    const navigate = useNavigate();
    const { user, getAllProjectUserApi, getAllProjectApi, createProjectapi, editProjectapi, allEmployee } = useMain();
    const [allProjects, setAllProject] = useState([]);
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

    const { role } = hrms_user;
    const fetchuserapi = async () => {
        const ans = await getAllProjectUserApi();
        console.log("alluser", ans);
        setAllProject(ans?.projects);
    }
    return (

        <div className="employee-dash h-full">
            {role === "EMPLOYEE" ? (
                <EmployeeSidebar />
            ) : (
                <AdminSidebar />
            )}
            <div className="tm">
                {role === "EMPLOYEE" ? (
                    <EmployeeNavbar />
                ) : (
                    <AdminNavbar />
                )}

                <div className="em">
                    <div className="tclwrap">

                        <nav>
                            <h2> {"My Projects"} </h2>

                        </nav>
                        <div className="allClients">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Project Name</th>
                                        <th>Start Date</th>
                                        <th>Deadline</th>
                                        <th>Members</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {allProjects?.map((client, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {console.log(client)}
                                            <td>
                                                <span>{client.projectName}</span>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "10px",
                                                        marginTop: "2px",
                                                        fontSize: "0.875rem",
                                                        color: "#2563eb",
                                                    }}
                                                >
                                                    <p
                                                        onClick={() =>
                                                            navigate("/employeeDash/HRM/projectDetails", {
                                                                state: client,
                                                            })
                                                        }
                                                        style={{ margin: 0, cursor: "pointer" }}
                                                    >
                                                        View
                                                    </p>
                                                    {/* <span>|</span> */}
                                                    {/* <p
                              onClick={() => {
                                handleEditClick(client);
                              }}
                              style={{ margin: 0, cursor: "pointer" }}
                            >
                              Edit
                            </p>
                            <span>|</span>
                            <p
                              onClick={() => deleteApi(client?._id)}
                              style={{ margin: 0, cursor: "pointer" }}
                            >
                              Delete
                            </p> */}
                                                </div>
                                            </td>
                                            <td>
                                                {
                                                    new Date(client?.createdAt)
                                                        .toISOString()
                                                        .split("T")[0]
                                                }
                                            </td>
                                            <td>{client?.deadline}</td>

                                            <td style={{ display: "flex", gap: "-2px" }}>
                                                {client?.Members?.map((member) => (
                                                    <img
                                                        src={`${member?.profileImage
                                                            ? member?.profileImage
                                                            : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                                            }`}
                                                        className="w-20 h-20"
                                                        alt="Member Avatar "
                                                        key={member._id}
                                                        onClick={() =>
                                                            navigate("/adminDash/EmployeeDetails", {
                                                                state: member?._id,
                                                            })
                                                        }
                                                        style={{
                                                            borderRadius: "50%",
                                                            cursor: "pointer",
                                                            transition:
                                                                "color 0.3s ease, text-decoration 0.3s ease",
                                                            height: "40px",
                                                            width: "40px",
                                                        }}
                                                    />
                                                ))}
                                            </td>
                                            <td>
                                                <span
                                                    style={{
                                                        color: "#2563eb",
                                                        border: "1px solid #a8c1f7",
                                                        background: "#f6f9fe",
                                                        alignItems: "center",
                                                        borderRadius: ".375rem",
                                                        display: "inline-flex",
                                                        fontSize: ".75rem",
                                                        fontWeight: 500,
                                                        lineHeight: "1rem",
                                                        padding: ".25rem .5rem",
                                                    }}
                                                >
                                                    {client.Status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )




}

export default MyProjects2