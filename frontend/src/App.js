import React, { useEffect, useState } from 'react'
import AddStudent from './AddnUpdate';
import './App.css'
import Delete from './Delete';
import ListStudents from './ListStudents';

export default function App() {

  function changeColor(event) {
    var button = event.target; // Get the clicked button
    button.style.backgroundColor = '#21abcd ';
}

function removecolor(event) {
  var button = event.target; // Get the clicked button
  button.style.backgroundColor = 'white';
}

document.querySelectorAll('.mybtn').forEach(function(button) {
  button.addEventListener('click', changeColor);
  button.addEventListener('mouseleave',removecolor );
});

//-------------------------------------

var [btnstate, btnfunc] = useState(0); //btn

const [myname, namefunc] = useState(null); //name
const [myenroll, enrollfunc] = useState(null); //enroll

  
//----------------LIST-------------------------------
    var [enrollarray, enrollarrayfunc] = useState([]);
    var [namearray, namearrayfunc] = useState([]);

    var myfunc = async()=>{
      await fetch('http://127.0.0.1:5000').
        then((resp)=>{
          return resp.json();
        }).then((nextresp)=>{
           console.log(nextresp);
          const enrollData = nextresp.map(item => item.enroll);
        const nameData = nextresp.map(item => item.name);

       enrollarrayfunc(enrollData);
       namearrayfunc(nameData)
        })
    }


  //-------------------------------------
  
 
  const postsenddata = {
    name: myname,
    enroll: myenroll
  }

  const formdata = new URLSearchParams(postsenddata);
  
  const postdata = async()=>{
     await fetch(`http://127.0.0.1:5000/`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set the content type to JSON
      },
      body: formdata
     }).then((resp)=>{
         return resp.json();
     }).then((nextresp)=>{
        console.log(nextresp);
     })
  }
//------------------------------------------
  const deletesenddata = {
    enroll: myenroll
  }

  const formdata2 = new URLSearchParams(deletesenddata);
  
  const deletedata = async()=>{
    await fetch(`http://127.0.0.1:5000/`,{
     method:'DELETE',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded', // Set the content type to JSON
     },
     body: formdata2
    }).then((resp)=>{
        return resp.json();
    }).then((nextresp)=>{
       console.log(nextresp);
    })
    
 }

//---------------------------------------

  const updatesenddata = {
    name: myname,
    enroll: myenroll
  }

  const formdata3 = new URLSearchParams(updatesenddata);
  
  const updatedata = async()=>{
     await fetch(`http://127.0.0.1:5000/`,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set the content type to JSON
      },
      body: formdata3
     }).then((resp)=>{
         return resp.json();
     }).then((nextresp)=>{
        console.log(nextresp);
     })
  }

  return (
    <div >
      
      
      <div className='outerdiv'>
        <div className='innerdiv'>
          <ul style={{listStyle:'none'}}>
            <li><button className='mybtn' onClick={()=>btnfunc(1)} >Add a Student</button></li><hr></hr>
            <li><button className='mybtn' onClick={()=>btnfunc(2)} >Delete a Student</button></li><hr></hr>
            <li><button className='mybtn' onClick={()=>btnfunc(3)}>Update Details</button></li><hr></hr>
            <li><button className='mybtn' onClick={()=>btnfunc(4)}>List the Students</button></li><hr></hr>
          </ul>
        </div>
        <div className='nextdiv'>
           {btnstate == 1 ?  <AddStudent usernamestate={namefunc} title='Add' enrollstate={enrollfunc} func={postdata}/> : "" }
           {btnstate == 2 ?  <Delete usernamestate={namefunc} title='Delete' enrollstate={enrollfunc} func={deletedata}/> : "" }
           {btnstate == 3 ?  <AddStudent usernamestate={namefunc} title='Update' enrollstate={enrollfunc} func={updatedata}/> : "" }
           {btnstate == 4 ?  <ListStudents  name={namearray.join(' , ')} enroll={enrollarray.join(' , ')} getdata={myfunc}/>: ""}
            
        </div>
      </div>
     
      
     

    
      {/* <p>Post</p>
      <input type='text' onChange={(e)=>namefunc(e.target.value)}/><br></br>
      <input type='text' onChange={(e)=>enrollfunc(e.target.value)}/>
      <br></br>

      <button onClick={postdata}>Post</button><br></br> */} 
       {/* <p>Delete</p>
      <br></br>
      <input type="text" onChange={(e)=>enrollfunc(e.target.value)}/>
      <br></br>

      <button onClick={deletedata}>Post</button><br></br> */}
    </div>
    
  )
}
