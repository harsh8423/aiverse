import React, { useState } from "react";
import {ContextApi} from "./ContextApi"

const ContextStat = (props)=>{

    const {Interactions}=props
    const id= localStorage.getItem("interactions")
    const interactionsData= JSON.parse(id)

    const [interactions, setinteractions] = useState(Interactions? Interactions:interactionsData);

    return(
        <ContextApi.Provider value={{interactions, setinteractions}}>
            {props.children}
        </ContextApi.Provider>
    )
}

export default ContextStat