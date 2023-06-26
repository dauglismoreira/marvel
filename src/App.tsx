import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Search } from './Templates/Search';
import { Results } from './Templates/Results';
import styled from 'styled-components';

interface Hero {
  name: string;
  id: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

function App() {

  const [heroList, setHeroList] = useState<Hero[]>([]);
  const [hasResults, setHasResults] = useState(false);
  const [searchError, setSearchError] = useState(false);

  function searchHero(searchTerm: string){
    if(searchTerm.length > 1){
      setHasResults(true);
    }
    setTimeout(() => {
      if(searchTerm.length > 1){
        const url = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + searchTerm + '&orderBy=name&apikey=' + process.env.REACT_APP_TOKEN
        axios.get(url)
        .then(response => {
            const heroes = response.data?.data?.results ?? [];
            setHeroList(heroes);
            if (heroes.length > 0) {
              setHeroList(heroes);
              setSearchError(false);
            } else {
              setHeroList([]);
              setSearchError(true);
              setHasResults(false);
            }
        })
      }
      if(searchTerm.length === 0){
        setHeroList([]);
        setHasResults(false);
      }
    }, 400);
  }

  return (
    <Div className={`App ${hasResults ? 'has-results' : ''}`}>
      <header className="App-header">
        <h1>MARVEL HEROES</h1>
        <Search  onSearchTermChange={searchHero}/>
      </header>
      <body>
        {searchError ? (
          <ErrorMessage>Nenhum herói encontrado.</ErrorMessage>
        ) : (
          <Results heroList={heroList} />
        )}
      </body>
    </Div>
  );
}

const Div = styled.div`
  background: radial-gradient(circle, rgba(3,6,48,1) 3%, rgba(13,13,13,1) 90%, rgba(74,44,7,1) 100%);
  min-height:calc(100vh - 40px);
  margin:0;
  padding:20px;
  display:flex;
  flex-direction:column;
  align-items:center;

  h1 {
    color:#fff;
    font-family: 'Marvel', sans-serif;
    text-align:center;
    font-size:30px;
  }

  header {
    transition: transform 0.5s ease-in-out;
    position:absolute;
    height:300px;
    top:50%;
    transform: translate(0, -50%);
  }
  &.has-results header {
    transform: translate(0, -50vh);
  }

  body {
    margin-top:200px;
  }
`;

const ErrorMessage = styled.p`
  color: #fff;
  font-size: 20px;
  margin-top:200px;
`;

export default App;
