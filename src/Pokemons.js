import React, {useEffect,useState} from 'react';
import styled from "styled-components";
import axios from 'axios';


const Title = styled.span`
  font-size: 34px;
  color: black;
  padding: 15px;
`;
const Nav = styled.span`
  position: sticky;
  border: 1px solid grey;
  display: flex;
  justify-content: space-between;
  top: 0;
  background:teal;
`;
const Box = styled.div`
  font-size: 20px;
  border: 1px solid grey;
  color: black;
  display: flex;
  padding: 30px;
  background: #46C2CB;
  margin: 50px;
  align-items: center;
  justify-content: center;
  flex:1;
`;

const Pokemons = () => {
  
  const [pokemons,setPokemons] = useState([]);
  const [loading,setLoading] = useState(false);

  const [searchTitle,setSearchTitle] = useState('');
  
  let API = "https://jsonplaceholder.typicode.com/todos/";
  
  const fetchApiData = async (url) => {
    try {
      const res = await axios.get(url);
      setPokemons(res.data);
      setLoading(false);
    }catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchApiData(API);
  },[]);

  return (
    <div>
      <Nav>
        <Title>searchNload</Title>
        
        <input
          style={{position: "sticky",top:"0",fontSize:"24pt"}}
          type='text'
          placeholder='Search'
          onChange={(e)=>setSearchTitle(e.target.value)}
        />
      </Nav>
      
        {loading ? (
          <h4>Loading ...</h4>
        ) : (
          pokemons
            .filter((value) => {
              if (searchTitle === "") {
                return value;
              } else if (
                value.title.toLowerCase().includes(searchTitle.toLowerCase())
              ) {
                return value;
              }
            })
            .map((item) => <Box key={item.id}>{item.title}</Box>)
        )}
      
    </div>
  );
}

export default Pokemons;
