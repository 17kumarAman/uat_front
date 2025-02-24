import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import "react-profile-avatar/dist/index.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgress from "./CircularProgress";
import ProgressBar from "@ramonak/react-progress-bar";
import ProjectOverview2 from "../../admin/EmployManagement/ProjectOverview2"


const ProjectOverview = ({ setAlert, pop, setPop }) => {
  const { user, getProjectTask } =
    useMain();

  const location = useLocation();

  const data = location?.state;

  const [percentage, setPercentage] = useState(0);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [allTasks, setAllTasks] = useState([]);

  const getProjectTaskapi = async () => {
    const ans = await getProjectTask(data?._id);
    const reversedTasks = ans?.data.reverse(); // Reverse the array
    setAllTasks(reversedTasks); // Set the reversed array
  };

  useEffect(() => {
    getProjectTaskapi();
  }, []);


  const projectOpt = ["Overview", "Task"];
  const [optIndex, setOptIndex] = useState(0);
  const [openTask ,setOpenTask] =useState(0);
  const [OpenTaskper ,setOpenTaskper] =useState(0);

  const [daysleft , setDaysleft] =useState(0);
  const [daysleftper , setDaysleftper] =useState(0);


  useEffect(() => {
    
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (task) => task.Status === "Completed"
    ).length;

    
    const openTaskse = allTasks.filter(
      (task) => task.Status !== "Completed"
    ).length;


     setOpenTask(openTaskse);

     
    const completedPercentage = (completedTasks / totalTasks) * 100;
    const opentaskper = ((openTaskse / totalTasks) * 100).toFixed(0);

    setPercentage(completedPercentage);
    setOpenTaskper(opentaskper);

  }, [allTasks]);


  useEffect(()=>{
 // Calculate today's date
 const today = new Date();
    
 // Set your due date
 const dueDate = new Date('2024-07-26');
 
 // Calculate the difference in milliseconds
 const differenceMs = dueDate - today;
 
 // Convert milliseconds to days
 const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
 
 // Update state with the number of days left
 setDaysleft(daysDifference);
 
 // Calculate percentage of days left (assuming 365 days in a year)
 const totalDaysInYear = 20;
 const daysLeftPercentage = Math.ceil((daysDifference / totalDaysInYear) * 100);
 
 // Update state with the percentage of days left
 setDaysleftper(daysLeftPercentage);
  },[data])

 

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
          <div className="" style={ {
    width: "338px",
    height: "42px",
    display: "flex",
    alignItems: "center",

}}>
                {projectOpt.map((pr, index) => (
                  <div
                    onClick={() => setOptIndex(index)}
                    key={index}
                    className={`cursor-pointer singelPr ${
                      index === 0 && "addlefborder"
                    }  ${index === 1 && "addBorder"} ${
                      optIndex === index && "adddbg"
                    }`}
                  >
                    <span>{pr}</span>
                  </div>
                ))}
              </div>

{
  optIndex===1?(
    <>
  <div style={{ marginTop: "-1px" , paddingTop:"-20px" }}>
    <ProjectOverview2 />
  </div>
</>

    
  ):(
    <div className="tclwrap2" style={{marginTop:"40px"}}>


            <div className="projectOverView">

                 
              <nav>
                <div className="pronaheading">
                  <h2>OVERVIEW {data?.Name}</h2>
                
                </div>

             
              </nav>

               <div className="cont">
                {/* left  */}
                <div className="proleft">
                     <p>Project</p>
                      <p>{data?.Name}</p>
                      <p>Status</p>
                      <p>{data?.Status}</p>
                      <p>Date Created </p>
                       <p>{new Date(data?.createdAt).toISOString().split('T')[0]}</p>
                       <p>Deadline</p>
                       <p>{data?.DueDate}</p>
                </div>

                <div className="eachProgeer">
                   <h4>Project Progress</h4>
                  <CircularProgress percentage={percentage} color={'#4caf50'} />
                </div>

               </div>

               <hr />

               <div className="Decr">
                <h3>DESCRIPTION</h3>
                 <p>{data?.Description}</p>
               </div>

               <hr />

               <div className="embers">
                <h3>MEMBERS</h3>

                 <div className="allMEmb">
                    {
                        data?.Members?.map((mem , index)=>(
                            <div key={index} className="snglme">
                                <img src={mem?.profileImage} alt="" />
                                <p>{mem?.fullName}</p>
                            </div>
                        ))
                    }
                 </div>
               </div>


              </div>

              <div className="secnoveview">


                <div className="navrighdiv">


                <nav>
                     <p>{openTask}/10 OPEN TASKS</p>
                     <ProgressBar completed={OpenTaskper} />
                </nav>

                <nav>
                     <p>{daysleft} DAYS LEFT</p>
                     <ProgressBar completed={daysleftper} />
                </nav>
                </div>


              </div>

            </div>
  )
}

            
          </div>
        </div>
      </div>

      
    </>
  );
};
export default ProjectOverview;
