import { useState } from "react";
export const useInput = (initState = null)=>{
    const [value, setValue] = useState(initState)
    const onChange = (e) =>{
        setValue(e.target.value)
    }
    return {value, onChange}
}