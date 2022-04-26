// uma função, que é um retorno HTML
import React, { useState, useEffect } from 'react'; //Hooks = use(Hook) -> useState
import './styles.css';

import {Card} from '../../components/Card'

export function Home() {

  const [studentName, setstudentName] = useState('')
  const [students, setstudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: '', location: ''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setstudents(prevState => [...prevState, newStudent]) //prevState é o conteudo anterior do vetor do setstudents[]

  }

  //executado automaticamente assim que a interface for renderizada
  useEffect(() => { //useEffect não aceita async, para usar, é necessário criar uma function
    
    // corpo do useEffect(açoes ou aquilo que quero que execute)
   async function fetchData() { 
     const response = await fetch('https://api.github.com/users/pceolato') //fetch = padrão para fazer requisições http
     const data = await response.json()
    
     setUser({
        name: data.name,
        avatar: data.avatar_url,
        location: data.location,
      })
    }

   fetchData()
  }, [])

  return (
   <div className="container">
     <header>
      <h1>Lista de Presença</h1>
      
      <div>
        <div>
          <strong>{user.name}</strong>
          <small>{user.location}</small>
        </div>
        <img src={user.avatar} alt="Foto de Perfil" />
      </div>
     </header>
    
    <input 
      type="text" 
      placeholder="Digite o nome..." 
      onChange={e => setstudentName(e.target.value)}/>
    
    <button type="button" onClick={handleAddStudent}>
      Adicionar
      </button>

   { 
    students.map(student => (
      <Card 
        key={student.time} //Chave única, geralmente uid
        name={student.name} 
        time={student.time}
      />
    ))
   }
  </div>
  )
}
