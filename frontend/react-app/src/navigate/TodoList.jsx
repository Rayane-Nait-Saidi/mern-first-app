//TodoList.jsx
import { useEffect , useState } from "react";

function TodoList({username}){
    const [array,setArray] = useState([]) ; 
    const [clicked,setClicked] = useState(0) ; 
    const [pressed,setPressed] = useState(false) ; 
    useEffect(() => {
        fetch('http://localhost:5000/api/accounts/tasks')
        .then(res => res.json())
        .then(data => {
          setArray(data.tasks) ; 
        });
    }) ; 

    const handleDelete = (note) => {
      setPressed(false) ; 
      fetch(`http://localhost:5000/api/accounts/notesarray?note=${note}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({note})
      }) ; 

    }

     
    return(
        <>
          <div className="notelist-page-large">
              <div className="notelist-box">
                 <h1 style={{fontSize:"1.5rem"}}>NoteList of {username}</h1>
                 <h2 style={{fontSize:"1rem"}}>✨Note:Click on the note for more detail✨</h2>
                 <br />
                 {array.length === 0 ? <h1 style={{fontSize:"1.2rem"}}>No notes for now!</h1> : (
                  array.map((note,id)=>(
                    <div key={id} style={{ position: "relative", width: "100%" }}>
                       <li><h2 style={{ fontSize: "1.2rem", fontStyle: "italic", cursor: "pointer" }} onClick={() => {setClicked(id) ; setPressed(true)}}>{note}</h2></li>
                       {clicked === id && pressed === true && (
                          <div className="delete-note">
                             <h5>delete this note?</h5>
                             <button style={{cursor:"pointer"}} onClick={()=>handleDelete(note)}>Yes</button> <button style={{cursor:"pointer"}} onClick={() => setPressed(false)}>No</button>
                          </div>
                        )}
                    </div>
                  ))
                 )}
                 
              </div>
          </div>

          <div className="notelist-page-small">
              <h1 style={{fontSize:"2.6rem"}}><span style={{color:"rgb(126, 126, 248)"}}>Note</span>.App</h1>
              <div className="notelist-box-small">
                 <h1 style={{fontSize:"1.4rem"}}>NoteList of {username}</h1>
                 <h1 style={{fontSize:"1rem"}}>✨Note:Click on the note for more detail✨</h1>
                 <div className="box-small">
                    {array.length === 0 ? <h1 style={{fontSize:"1rem"}}>No notes for now!</h1> : 
                    
                    (
                       array.map((note,id)=>(
                      <div key={id} style={{ position: "relative", width: "100%" }}>
                       <li><h2 style={{ fontSize: "1rem", fontStyle: "italic", cursor: "pointer" }} onClick={() => {setClicked(id) ; setPressed(true)}}>{note}</h2></li>
                       {clicked === id && pressed === true && (
                          <div className="delete-note-small">
                             <h5>delete? <button style={{cursor:"pointer" , fontSize:"0.6rem"}} onClick={()=>handleDelete(note)}>Yes</button> <button style={{cursor:"pointer" , fontSize:"0.7rem"}} onClick={() => setPressed(false)}>No</button></h5>
                          </div>
                        )}
                      </div>
                  ))
                    )
                    
                    }
                 </div>
              </div>
          </div>
        </>
    )
}

export default TodoList ; 