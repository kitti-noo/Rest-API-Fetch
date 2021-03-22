
import useSWR, {mutate} from 'swr'
import axios from 'axios'
const fetcher = url => axios.get(url).then(res => res.data) 
 
const URL = `http://localhost/api/users`
 
const Name = () => {
   const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false })
   if (error) return <div>failed to load</div>
   if (!data) return <div>loading...</div>
   console.log('Home: ', data)
 
   const updateName = async (name) => {
       const result = await axios.put(URL, {name})
       console.log('Name updated ', result.data)
   }
 
   return <div>
       Hello:  {data.name}  <br/> Age: {data.age} <br/>
       <button onClick={async () => { 
           mutate(URL, {...data, name: "John"})
           await updateName("New John")
           console.log('new data', data)
           mutate(URL,data)
       }}> Update name </button>
   </div>
}
 
export default Name

