import React, { useState } from "react";
import {AdminContext} from "./ContextApi"

const ContextAdmin = (props)=>{

    const {Admin}=props
    const id= localStorage.getItem("admin")
    const adminData= JSON.parse(id)
    const [admin, setadmin] = useState(Admin? Admin:adminData);


    return(
        <AdminContext.Provider value={{admin, setadmin}}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default ContextAdmin