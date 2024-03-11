import React, { useState,useEffect } from 'react'
import { toast, Toaster } from "react-hot-toast";

export default function Changelog() {


    const [changelogs, setchangelogs] = useState([])
    const [pageState, setpageState] = useState(false)

    const getData = async()=>{
        
        const response = await fetch("http://localhost:5000/api/getchangelog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const json = await response.json();
        if (json.success) {
          console.log(json);
          setchangelogs(json.data)          
        }
        if (!json.success) {
          toast.error("Error in getting Admin data");
        }
      }
    
      useEffect(() => {
        getData()
      }, [])

      useEffect(() => {
        const history= changelogs
        history.sort((a, b) => {
            const aDate =
              a.uploadDate instanceof Date 
                ? a.uploadDate
                : new Date(a.uploadDate);
            const bDate =
              b.uploadDate instanceof Date
                ? b.uploadDate
                : new Date(b.uploadDate);
        
            return bDate.getTime() - aDate.getTime();
          });
          setchangelogs(history)
          setpageState(true)
      }, [changelogs])


    const formatDate =(inputDate)=>{
        const date = new Date(inputDate);

        // Array of month names
        const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        const day = date.getDate();
        const month = monthNames[date.getMonth()];

        // Add suffix to day
        let dayWithSuffix;
        switch (day) {
        case 1:
        case 21:
        case 31:
            dayWithSuffix = day + "st";
            break;
        case 2:
        case 22:
            dayWithSuffix = day + "nd";
            break;
        case 3:
        case 23:
            dayWithSuffix = day + "rd";
            break;
        default:
            dayWithSuffix = day + "th";
        }
        // Construct the final formatted date string
        const formattedDate = dayWithSuffix + " " + month;
        return(formattedDate);

    }
      
  return (
    <div style={{textAlign:'left'}}>
        <Toaster toastOptions={{ duration: 2000 }} />
        <div className='p-4' style={{fontWeight:700, fontSize:'22px'}}>AIverse</div>
        <div className='p-5 m-5'>
            <h1 style={{fontWeight:900}}>Changelog</h1>
            <p>All the updates to the website from its first inception to the latest update.</p>
            {pageState && <div>
                {changelogs.map((item)=>{
                    const formattedDate= formatDate(item.uploadDate)
                    return(
                        <div className='m-5'>
                            <span style={{fontSize:'22px', padding:'7px 10px', color:'white', backgroundColor:'black', cursor:'pointer',borderRadius:'8px'}}>{formattedDate}</span>
                            <p></p>
                            <ul>
                                {item?.loglist?.map((log)=>{
                                    return(
                                        <li style={{fontWeight:500, }}>{log}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}                
            </div>}
        </div>
    </div>
  )
}
