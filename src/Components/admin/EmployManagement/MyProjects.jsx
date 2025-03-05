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




const MyProjects = ({ setAlert, pop, setPop }) => {
  const { user  , getAllProjectUserApi , getAllProjectApi , createProjectapi ,editProjectapi , allEmployee  } = useMain();

  const [allProjects, setAllProject] = useState([]);

  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const { role} = hrms_user;
  const { projectCreatePermission  , showAllProjectPermission} = hrms_permission;

  const [addClientPop, setAddClientPop] = useState(false);

  const fetchuserapi = async()=>{
    const ans = await getAllProjectUserApi();
    console.log("alluser",ans);
     setAllProject(ans?.projects);
  }

  const [storeProject, setStorePro] = useState([]);

  const [formdata, setFormdata] = useState({
    Name: "",
    Description: "",
    Members: [],
    Status: "Ongoing",
    DueDate: "",
  });

  const [showIndex, setShowIndex] = useState(null);
  const [proUser, setProUser] = useState([]);
  const [allEmp, setAllEmp] = useState([]);

  const fetchemp = async () => {
    const ans = await allEmployee();
    setAllEmp(ans?.emp);
  };

  const removeUser = (index) => {
    const newProUser = proUser.filter((_, i) => i !== index);
    const newMembers = formdata.Members.filter((_, i) => i !== index);
    setProUser(newProUser);
    setFormdata({ ...formdata, Members: newMembers });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeHandler2 = (e) => {
    const selectedEmpId = e.target.value;
    if (selectedEmpId === 'Select' || formdata.Members.includes(selectedEmpId)) return;

    const selectedEmp = allEmp.find((emp) => emp._id === selectedEmpId);
    setProUser([...proUser, selectedEmp.fullName]);
    setFormdata({ ...formdata, Members: [...formdata.Members, selectedEmpId] });
  };
  
  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    if (ans?.status) {
      setAllProject(ans?.data);
      setStorePro(ans?.data);
    }
  };

  useEffect(()=>{
    if(showAllProjectPermission){
      getAllProject();
    }
    else{
      
      fetchuserapi();
    }
    fetchemp();
  },[])

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowIndex(null);
    const toastId = toast.loading("Loading...");
    try {
      const ans = await createProjectapi({ ...formdata });
      if (ans?.status) {
        toast.success("Successfuly created");
        if(showAllProjectPermission){
          getAllProject();
        }
        else{
          fetchuserapi();
        }
        setFormdata({
          Name: "",
          Description: "",
          Members: "",
          Status: "Ongoing",
          DueDate: "",
          Members: "",
        });
        setAddClientPop(false);
        setProUser([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const ans = await editProjectapi({ ...formdata, projectId: isEdit });
      if (ans?.status) {
        toast.success("Successfuly updated");
        getAllProject();
        setFormdata({
          Name: "",
          Description: "",
          Members: [],
          Status: "Ongoing",
          DueDate: "",
          Members: "",
        });
        setAddClientPop(false);
        setProUser([]);
        setIsEdit(false);
        setShowIndex(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };


  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="tclwrap">

              <nav>
                <h2> {showAllProjectPermission ? "All Projects ":"My Projects"} </h2>

              </nav>

              {/* <div className="allClients">
                {allProjects.map((client, index) => (

                  <div key={index} className="singleProject">
                    
                    <div onClick={()=>{
                       navigate("/employeeDash/HRM/projectDetails" , {state:client})
                    }} className="projnav cursor-pointer">

                      <div className="leftnav">
                        <Avatar
                          name={client?.Name}
                          colour={
                            index % 3 == 0
                              ? "#3C78E9"
                              : `${index % 2 == 0 ? "#E45D3A" : "#F7A539"}`
                          }
                          size={32}
                          className="avatarclient"
                        />
                        <p>{client.Name}</p>
                      </div>

                    </div>

                    <hr />

                    <div className="statusdue">
                      <div
                        className={`stapro ${
                          client.Status === "Finished" && "finibg"
                        } ${client.Status === "Ongoing" && "Ongoingbg"} ${
                          client.Status === "OnHold" && "OnHoldbg"
                        }`}
                      >
                        <span>{client.Status}</span>
                      </div>

                      <p className="duedate">
                        {" "}
                        <span>Due Date:</span>
                        {client?.DueDate}
                      </p>
                    </div>

                    <div className="propara">
                      <p className="">{client?.Description}</p>
                    </div>

                    <div className="mem">
                      <p>Members</p>
                      <p>{client?.Members?.length}</p>
                    </div>

                    <div className="protasjwon">
                      <p className="proteast">{client.task} Tasks</p>
                    </div>
                  </div>
                ))}
              </div> */}
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
                        {console.log(allProjects)}
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
                              src={`${
                                member?.profileImage
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

      {addClientPop && (
        <div className="addCliWrap">
          <div className="addClieCont addheight">
            <nav>
              <p>Create New Project</p>
              <img
                onClick={() => {
                  setAddClientPop(false);
                  setProUser([]);
                  setFormdata({
                   Name: "",
                   Description: "",
                   Members: "",
                   Status: "Ongoing",
                   DueDate: "",
                   Members: "",
                  })
                }}
                src={cut}
                alt=""
              />
            </nav>

            <hr />

            <form onSubmit={isEdit ? editHandler : submitHandler}>
              <label>
                <p>Name</p>
                <input
                  name="Name"
                  value={formdata.Name}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Name"
                />
              </label>

              <label>
                <p>Employee </p>

                <div className="allempid">
                  {proUser.map((pro, index) => (
                    <div key={index} className="sinproid">
                      <p >{pro}</p>
                      <img
                        src={cut}
                        alt="Remove"
                        onClick={() => removeUser(index)}
                      />
                    </div>
                  ))}
                </div>

                <select
                  name="Members"
                  value={formdata.Members}
                  onChange={changeHandler2}
                >
                  <option value="Select">Select Employee</option>
                  {allEmp?.map((emp, index) => (
                    <option value={emp?._id} key={index}>
                      {emp?.fullName}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <p>Status </p>
                <select
                  name="Status"
                  value={formdata.Status}
                  onChange={changeHandler}
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="OnHold">OnHold</option>
                  <option value="Finished">Finished</option>
                </select>
              </label>

              <label>
                <p>Due Date</p>
                <input
                  name="DueDate"
                  value={formdata.DueDate}
                  onChange={changeHandler}
                  type="date"
                />
              </label>

              <label>
                <p>Description</p>
                <textarea
                  type="text"
                  name="Description"
                  value={formdata.Description}
                  onChange={changeHandler}
                  placeholder="Description"
                />
              </label>

             
            </form>
            <div className="btnsss">
                <button type="submit" className="saveclient">
                  <span>Add Project</span>
                </button>
                <button
                  onClick={() => {
                    setAddClientPop(false);
                    setProUser([]);
                     setFormdata({
                      Name: "",
                      Description: "",
                      Members: "",
                      Status: "Ongoing",
                      DueDate: "",
                      Members: "",
                     })
                  }}
                  className="cancel"
                >
                  <span>Cancel</span>
                </button>
              </div>
          </div>
        </div>
      )}

    </>
  );
};
export default MyProjects;
