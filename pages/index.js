import axios from 'axios'
import { useState, useEffect } from 'react'

const URL = 'http://localhost/api/bears'


export default function Home() {
  const [bears, setBears] = useState({
    list: [
      { id: 1, name: 'Winnie', weight: 22 },
      { id: 2, name: 'Pooh', weight: 32 },
    ]
  })
  useEffect(() => { getBears() }, [])

  const getBears = async () => {
    let bears = await axios.get(URL)
    setBears(bears.data)
    console.log('Bears:', bears.data);
  }
  
  const getBear = async (id) => {
    let bear = await axios.get(`${URL}/${id}`)
    setBear({name: bear.data.name,weight:bear.data.weight}) 
    
  }

  const [name,setName] = useState('')
  const [bear,setBear] = useState({})
  const [weight,setWeight] = useState(0)

  const addBear = async (name,weight) => {
    let bears = await axios.post(URL,{name,weight})
    setBears(bears.data)
    console.log(name,weight)
  };

  const updateBear = async (id) => {
    let bears = await axios.put(`${URL}/${id}`,{name,weight})
    setBears(bears.data)
  }

  const deleteBear = async (id) => {
    let bears = await axios.delete(`${URL}/${id}`)
    setBears(bears.data)
  }
  const printBears = () => {
    if (bears.list && bears.list.length)
      return bears.list.map(
        (item, index) => <li key={index}>{index+1}:
                {item.name}:
                {item.weight}
                <button onClick={()=>getBear(item.id)}>Get</button>
                <button onClick={()=> updateBear(item.id)}>Update</button>
                <button onClick={()=> deleteBear(item.id)}>Delete</button>
                </li>)
    else
        return (<li>No Bear</li>)
  }

  return (
    <div>
      Bears
      <ul>
        {printBears()}
      </ul>
       Selected bear: {bear.name} : {bear.weight}
    <h2>Add bear</h2>
    Name: <input type="text" onChange={(e)=> setName(e.target.value)}/> <br/>
    Weight: <input type="number" onChange={(e)=> setWeight(e.target.value)}/> <br/>
    <button onClick={()=> addBear(name,weight)}>Add</button>
    
    </div>


  )
}
