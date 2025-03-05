import { useState } from "react";
import { CheckCircle, Clock, UserPlus, Bell } from "lucide-react";
import cut from "../../images/cutt.png";



export default function ViewTask({src,onClick,data}) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div >
      <div className="flex justify-between items-center">
        <div>

        <span className="text-sm bg-green-200 text-green-800 px-3 py-1 rounded-full">
          Task
        </span>
        <span className="text-blue-600 text-sm">In Progress</span>
        </div>

        <img src={src} onClick={onClick} alt="" />
      </div>
      <h2 className="text-xl font-semibold mt-3">{data.Title}</h2>
      <p className="text-gray-500 text-sm">Private Task - <span className="text-blue-500 cursor-pointer">Make public</span></p>
      
      <div className="mt-3">
        <p className="text-sm text-gray-400">Created at: 2025-02-20 16:39:07</p>
        <p className="text-sm text-gray-400">Related: <span className="text-blue-500 cursor-pointer">#14 - Develop Space Rocket - Acme</span></p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsCompleted(!isCompleted)}
        >
          <CheckCircle className={`w-5 h-5 ${isCompleted ? 'text-green-500' : 'text-gray-400'}`} />
          {isCompleted ? "Completed" : "Mark Complete"}
        </button>
        <button variant="outline">
          <Clock className="w-5 h-5" /> Start Timer
        </button>
      </div>

      <div className="mt-4 border-t pt-3">
        <h3 className="text-lg font-semibold">Checklist Items</h3>
        <div className="mt-2 flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-gray-700">Logo Design</span>
        </div>
      </div>

      <div className="mt-4 border-t pt-3">
        <h3 className="text-lg font-semibold">Task Info</h3>
        <p className="text-sm text-gray-500">Start Date: {data.StartDate}</p>
        <p className="text-sm text-gray-500">Due Date: {data.DueDate}</p>
        <p className="text-sm text-gray-500">Priority: <span className="text-yellow-500">Medium</span></p>
        <p className="text-sm text-gray-500">Your logged time: 03:03</p>
      </div>

      <div className="mt-4 border-t pt-3 flex justify-between items-center">
        <button variant="outline" className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" /> Assign Task
        </button>
        <button variant="outline" className="flex items-center gap-2">
          <Bell className="w-5 h-5" /> Set Reminder
        </button>
      </div>
    </div>
  );
}