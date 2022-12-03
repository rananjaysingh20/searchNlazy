import './App.css';

import {useState,useEffect} from 'react';
import Axios from 'axios';

const App = () => {
  
  const [searchTitle,setSearchTitle] = useState('');
  const [pokemons,setPokemons] = useState([]);
  const [loading,setLoading] = useState(false);
  
  const fetchApiData = async (url) => {
    try {
      const res = await Axios.get(url);
      setPokemons(res.data.results);
      setLoading(false);
      
    }catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchApiData("https://pokeapi.co/api/v2/pokemon?limit=200");
  },[]);
  
  return (
    <div className="App">
      <div className="Title">
        <h1>Pokemons</h1>
        <input 
          type="text" 
          placeholder="Enter pokemon name" 
          onChange={(e)=>setSearchTitle(e.target.value)
          }
        />
      </div>
      <div className="Display">
        <div>
          {loading ? (
          <h4>Loading ...</h4>
        ) : (
          pokemons
            .filter((value) => {
              if (searchTitle === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchTitle.toLowerCase())
              ) {
                return value;
              }
            })
            .map((item) => <h2 key={item.id}>{item.name}</h2>)
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
