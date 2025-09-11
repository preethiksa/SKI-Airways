import { useState,useEffect } from "react";

const usefetch = (url)=>{
    const [data,setData] = useState();
    useEffect(()=>{
        fetch(url).then(res=>res.json()).then((data)=>setData(data)).catch(err=>console.log(err))
    },[url])
    return [data];
}
export default usefetch;