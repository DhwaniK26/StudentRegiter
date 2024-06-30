import React from 'react'

export default function AddStudent(props) {
  return (
    <div className='p-5 m-3  ' style={{width:"400", height:"600", border:'2px solid orange'}}>
       <h3 style={{textAlign:'center'}}>{props.title}</h3>
      <input type='text' onChange={(e)=>props.usernamestate(e.target.value)} placeholder='Enter Name'/><br></br><br></br>
      <input type='text' onChange={(e)=>props.enrollstate(e.target.value)} placeholder='Enter enroll'/><br></br>
      <br></br>
       <div className='d-flex align-items-center justify-content-center'>
          <button onClick={props.func}  className='btn btn-primary' style={{width:'200'}}>Submit</button><br></br>
      </div>
    </div>
  )
}
