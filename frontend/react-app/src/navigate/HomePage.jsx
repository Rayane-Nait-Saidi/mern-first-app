//HomePage.jsx
import { useState , useRef} from "react";
function HomePage(){

  const [task , setTask] = useState("") ; 
  const reference = useRef(null) ;

  const handleAdd = (e) => {
    reference.current.style.border = "3px solid green" ; 
    setTimeout(()=>{
      reference.current.style.border = "1px solid rgb(202, 187, 187)" ; 
    },1000) ; 
    setTask("") ; 
    e.preventDefault() ; 
    fetch('http://localhost:5000/api/accounts/tasks',{
      method:'PUT',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({task}) 
    }) ;
  }

  return(
    <>
      <div className="add-home-large">
         <div
         className="add-box"
         ref={reference}
         >
           <h1>Add your notes here</h1>
           <form onSubmit={handleAdd}>
              <input type="text" placeholder="Enter a task.." value={task} onChange={(e)=> setTask(e.target.value)}/>
              <button type="submit" disabled={task.trim() === ""}>Add!</button>
           </form>
         </div>
      </div>

      <div className="add-home-small">
          <h1 style={{fontSize:"2.6rem"}}><span style={{color:"rgb(126, 126, 248)"}}>Note</span>.App</h1>
          <div className="add-box-small">
              <h1 style={{fontSize:"1.4rem"}}>Add your notes here</h1>
              <form onSubmit={handleAdd}>
                <input type="text" placeholder="Enter a task.." value={task} onChange={(e)=> setTask(e.target.value)}/>
                <button  ref={reference} type="submit" disabled={task.trim() === ""}>Add!</button>
              </form>
          </div>
      </div>
    </>
  )
}

export default HomePage ;