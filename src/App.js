import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from '../src/Recipie';

const App=()=>{

  const App_ID='805269e5';
  const App_key='11a918ae0507460a65563b38ed1ac4f2';

  //a state which will have all the data that comes back from the API
  const [recipies,setRecipies]=useState([]);
  //using for searching
  const [search,setSearch]=useState('');
  //only sumbits after button is clicked
  const [query,setQuery]=useState('banana');
  useEffect(()=>{
    getRecipe();
  },[query])     //useEffect runs only once,if we dont specify additional parameter, it works every time we do something on a page

  const getRecipe=async ()=>{
    const response= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_key}`);
    const data=await response.json();
    setRecipies(data.hits);
     console.log(data.hits);
  };

  const updateSeacrh= e =>{
      setSearch(e.target.value);
  };

  const getSearch = e=>{
    e.preventDefault();//prevents page refresh
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
        <form onSubmit={getSearch} className="searchForm">
          <input className="searchBar" type="text" value={search} onChange={updateSeacrh}/>
          <button
           className="searchBtn"
            type="submit">
              Search
          </button>
        </form>
        <div className="recipes">
          {recipies.map(recipe=>(
              <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}/>
          ))};
        </div>
    </div>
  );
}

export default App;
