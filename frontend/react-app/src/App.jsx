//frontend
//App.jsx
import {Link , Routes , Route} from 'react-router-dom'
import HomePage from './navigate/HomePage';
import TodoList from './navigate/TodoList';
import AccountPage from './navigate/AccountPage' ; 
import { useState } from 'react';
import './App.css' ; 
function App(){

const [inscriped , setInscriped] = useState(false) ; 
const [register , setRegister] = useState(false) ; 
const [sign , setSign] = useState(true) ;
const [finalname,setFinalname] = useState("") ;

const [signdata , setSigndata] = useState({
  username : "" , 
  password:""
}) ; 

const [registerdata , setRegisterdata] = useState({
  username:"",
  email:"" , 
  password:""
}) ; 

const handleChange1 = (e) => {
 setSigndata({
  ...signdata , 
  [e.target.name]:e.target.value
 })
}

const handleChange2 = (e) => {
 setRegisterdata({
  ...registerdata , 
  [e.target.name]:e.target.value
 })
}

const handleCreate = (e) => {
  e.preventDefault() ; 
  setInscriped(true) ; 
  const {username , email , password} = registerdata ; 
  const res = fetch("http://localhost:5000/api/accounts",{
    method:'POST' , 
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({username , email , password})
  })

  setRegisterdata({
    username:"",
    email:"",
    password:""
  }) ; 

  setFinalname(username) ;   
}

const handleConnect = (e) => {
  e.preventDefault();
  const {username, password} = signdata;
  fetch(`http://localhost:5000/api/accounts?username=${username}&password=${password}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        window.alert("Account not found!!");
      } else {
        setInscriped(true);
      }
    });

  setSigndata({username:"", password:""});

  setFinalname(username) ;  
}


return(
  <>
    {inscriped === false && 
    
    <div className="register-sign">
        <div className="register-sign-large">
           <h1 id='logo'><span>Note</span>.App</h1>
           <div className='register-sign-page'>
              <div className="register-sign-box">

                {sign === true &&   
                 <div className="sign">
                    <h1>Sign In</h1>
                    <form onSubmit={handleConnect}>
                       <input type="text" placeholder='username' name='username' value={signdata.username} onChange={handleChange1}/>
                       <input type="password" placeholder='Password' name='password' value={signdata.password} onChange={handleChange1}/>
                       <button type="submit" disabled={signdata.username.trim() === "" || signdata.password.trim() === ""}>Sign In</button>
                       <h3>You do not have an account? <span id='register-link' onClick={()=>{setRegister(true) ; setSign(false)}}>Register</span></h3>
                    </form>
                 </div>}

                 {register === true && 
                 <div className="register">
                    <h1>Register</h1>
                    <form onSubmit={handleCreate}>
                       <input type="text" placeholder='username' name='username' value={registerdata.username} onChange={handleChange2}/>
                       <input type="email" placeholder='Email' name='email' value={registerdata.email} onChange={handleChange2}/>
                       <input type="password" placeholder='Password' name='password' value={registerdata.password} onChange={handleChange2}/>
                       <button type="submit" disabled={registerdata.username.trim() === "" || registerdata.email.trim() === "" || registerdata.email.includes("@") === false || registerdata.password.trim() === ""}>Create account</button>
                       <h3>You do have an account? <span id='sign-link' onClick={()=>{setRegister(false) ; setSign(true)}}>sign</span></h3>
                    </form>
                 </div>}


              </div>
           </div>
        </div>

        <div className="register-sign-small" >
            <h1 id='logo'><span>Note</span>.App</h1>
            <div className="register-sign-page-small">
               {sign === true && 
               
               <div className="sign-small">
                  <h1 style={{fontSize:"2rem"}}>Sign In</h1>
                  <form onSubmit={handleConnect}>
                      <input type="text" placeholder='username' name='username' value={signdata.username} onChange={handleChange1}/>
                      <input type="password" placeholder='Password' name='password' value={signdata.password} onChange={handleChange1}/>
                      <button type="submit" disabled={signdata.username.trim() === "" || signdata.password.trim() === ""}>Sign In</button> 
                      <h3>You do not have an account? <span id='register-link' onClick={()=>{setRegister(true) ; setSign(false)}}>Register</span></h3>
                  </form>
               </div>
               
               }

               {register === true && 
               
               <div className="register-small">
                <h1 style={{fontSize:"2rem"}}>Register</h1>
                <form onSubmit={handleCreate}>
                   <input type="text" placeholder='username' name='username' value={registerdata.username} onChange={handleChange2}/>
                       <input type="email" placeholder='Email' name='email' value={registerdata.email} onChange={handleChange2}/>
                       <input type="password" placeholder='Password' name='password' value={registerdata.password} onChange={handleChange2}/>
                       <button type="submit" disabled={registerdata.username.trim() === "" || registerdata.email.trim() === "" || registerdata.email.includes("@") === false || registerdata.password.trim() === ""}>Create account</button>
                       <h3>You do have an account? <span id='sign-link' onClick={()=>{setRegister(false) ; setSign(true)}}>sign</span></h3>
                </form>
               </div>
               
               }
            </div>
        </div>
    </div>
  
    }  


    {inscriped === true && 
       <div className='navbar'>
          <div className="large-home">
            <header>
             <h1 id='home-logo'><span>Note</span>.App</h1>
             <nav>
               <Link to="/" className='link'>Home</Link>
               <Link to="/notelist" className='link'>NoteList</Link>
               <Link to="/account" className='link'>Account</Link>
             </nav>
           </header>

             <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/notelist' element={<TodoList username={finalname}/>}/>
              <Route path='/account' element={<AccountPage onLogout={()=>setInscriped(false)}/>}/>
             </Routes>
          </div>

          <div className="small-home">
              <header> 
                 <nav>
                   <Link to='/' className='link-home'>Home</Link>
                   <Link to="notelist" className='link-home'>Notelist</Link>
                   <Link to="/account" className='link-home'>Account</Link>
                 </nav>
              </header>

              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/notelist' element={<TodoList username={finalname}/>}/>
                <Route path='/account' element={<AccountPage onLogout={()=>setInscriped(false)}/>}/>
              </Routes>
          </div>

      </div>
    }


  </>
)
}

export default App ; 