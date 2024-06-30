import React, { useEffect } from 'react'

export default function ListStudents(props) {
  useEffect(()=>
    props.getdata,[])
  return (
    <div>
      <table>
        <tr>
          <th>Name:</th>
          <td>{props.name}</td>
        </tr>
        <tr>
          <th>Roll no: </th>
          <td>{props.enroll}</td>
       
        </tr>
      </table>
      
    
      {/* <button onClick={props.getdata}>Get</button> */}

    </div>
  )
}
