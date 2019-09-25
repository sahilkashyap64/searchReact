import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';


function App() {
  const APP_ID= '3e7d6282';
  const APP_KEY='b394266fc670d1162ac75dc995e1a099';
  const [recipes,setRecipes]=useState([]);
  const[counter,setCounter]=useState(0);
  const[search,setSearch]=useState("");
  const [query,setQuery]=useState("chicken");
    
  useEffect(()=>{
    getRecipes();
  },[query]);

  
  const getRecipes = async() => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`

      );
    const data = await response.json();
    setRecipes(data.hits);
  };
  const updateSearch = e =>{
    setSearch(e.target.value);
   
  };
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  return (
    <div className="App">
    <h1 onClick={()=>setCounter(counter+1)}>{counter}</h1>
    <form onSubmit ={getSearch} className="search-form">
      <input className="search-bar" 
      type="text" 
      value={search} 
      onChange = {updateSearch} />
      <button>Search</button>
    </form><div className="recipes">
    {recipes.map(recipe => (
       <Recipe 
       key={recipe.recipe.label}
       title={recipe.recipe.label} 
       calories={recipe.recipe.calories} 
       images={recipe.recipe.image}
       ingredients={recipe.recipe.ingredients}/>
    ))}</div>
    </div>
  );
}

export default App;
