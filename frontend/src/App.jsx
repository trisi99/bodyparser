import { useEffect, useState } from 'react'

import './App.css'
import Card from './components/Card'

function App() {
  const [entries, setEntries]=useState([])
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [mail, setMail] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => {
    fetch("http://localhost:3001/api/entries", { method: "GET" })
      .then((res) => res.json())
      .then(({ success, result, error }) => {
        if (!success) console.log(error); 
        else setEntries(result);
      });
  }, []);

  // const addEntry= ()=>{
  //   fetch("http://localhost:3001/api/entries", {
  //     method: "POST",
  //     body: JSON.stringify({ firstname, lastname, mail, message }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then(({ success, result, error }) => {
  //       if (!success) console.log(error); 
  //       else setEntries(result);
  //     });
  // }

  // const deleteEntry= (entry)=>{
  //   fetch(`http://localhost:3001/api/entries/${entry.id}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then(({ success, result, error }) => {
  //       if (!success) console.log(error); 
  //       else setEntries(result);
  //     });
  // }
  console.log(entries);

  return (
    <>
      <div>
      <input type="text" placeholder='First name'onChange={(e)=>setFirstName(e.target.value)} value={firstname}/>
      <input type="text" placeholder='last name'onChange={(e)=>setLastName(e.target.value)} value={lastname}/>
      <input type="text" placeholder='email'onChange={(e)=>setMail(e.target.value)} value={mail}/>
      <input type="message" placeholder='message' onChange={(e)=>setMessage(e.target.value)} value={message}/>
      <button >Add Entry</button>
      </div>
      <div>
      {entries?.map((entry,index)=><Card
      key={index}
      entry={entry}
      // deleteEntry={deleteEntry(entry)}

      />)}
      </div>
    </>
  )
}

export default App
