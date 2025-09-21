/* AccountPage.jsx : contains info about the user account*/
import { useEffect , useState} from "react";
function AccountPage({onLogout}){
const [objectt,setObjectt] = useState({}) ;  
useEffect(() => {
fetch('http://localhost:5000/api/accounts/find')
.then(res => res.json())
.then(data => {
setObjectt(data) ; 
})
}) ;

const handleDeleteaccount = () => {
  onLogout() ; 
  fetch('http://localhost:5000/api/accounts',{
    method:'DELETE'
  }) ; 
}

return(
    <>
       <div className="account-page-large">
         <div className="account-box">
            <h1 style={{fontSize:"2rem"}} >Account Details</h1>
            <br />
            <h2 style={{fontStyle:"italic"}} >Username : {objectt.username}</h2>
            <br />
            <h2 style={{fontStyle:"italic"}} >Email : {objectt.email}</h2>
            <br />
            <h2 style={{fontStyle:"italic"}} >Password : {objectt.password}</h2>
            <br /><br />
            <div className="accounts-buttons">
                <button onClick={onLogout}>Log Out</button>
                <button onClick={handleDeleteaccount}>Delete Account</button>
            </div>
         </div>
       </div>

       <div className="account-page-small">
           <h1 style={{fontSize:"2.6rem"}}><span style={{color:"rgb(126, 126, 248)"}}>Note</span>.App</h1>
           <div className="account-info-small">
            <h1 style={{fontSize:"1.4rem" , marginBottom:"30px"}}>Account Details</h1>
            <h1 style={{fontSize:"1.2rem" , fontStyle:"italic"}}>Username : {objectt.username}</h1>
            <h1 style={{fontSize:"1.2rem" , fontStyle:"italic"}}>Email : {objectt.email}</h1>
            <h1 style={{fontSize:"1.2rem" , fontStyle:"italic"}}>Password : {objectt.password}</h1>
            <div className="accounts-buttons-small" style={{marginTop:"30px" , }}>
                <button onClick={onLogout}>Log Out</button>
                <button onClick={handleDeleteaccount}>Delete Account</button>
            </div>
           </div>
       </div>
    </>
)

}

export default AccountPage ; 