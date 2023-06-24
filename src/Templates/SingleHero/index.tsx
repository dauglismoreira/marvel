import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Card } from '../../Components/Card';

interface Hero {
  name: string;
  id: string;
  comics: {
    collectionURI: string;
  }
  events: {
    collectionURI: string;
  }
  series: {
    collectionURI: string;
  }
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const token = 'feb88b10b6a916f1c2cb8a3e3f608f31'

function SingleHero() {
  const { id } = useParams();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    const url =
      'https://gateway.marvel.com:443/v1/public/characters/' + id + '?apikey=' + token;
    axios.get(url).then((response) => {
      setHero(response.data.data.results[0]);
    });
  }, [id]);

  if (!hero) {
    return null;
  }

  return (
    <Div>
      <Header>
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.name}
        />
        <About>
            <h5>{hero.name}</h5>
            <p>{hero.description}</p>
        </About>
      </Header>
      <Body>
        <Card title="Comics" route={hero.comics.collectionURI}/>
        <Card title="Events" route={hero.events.collectionURI}/>
        <Card title="Series" route={hero.series.collectionURI}/>
      </Body>
    </Div>
  );
}

const Div = styled.div`
  background: radial-gradient(
    circle,
    rgba(3, 6, 48, 1) 3%,
    rgba(13, 13, 13, 1) 90%,
    rgba(74, 44, 7, 1) 100%
  );
  min-height: calc(100vh - 40px);
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
    display:flex;
    width:100%;
    padding:20px;
    gap:20px;
    max-width:840px;
    margin:auto;
    background-color:rgba(255,255,255,0.2);
    border-radius:10px;
    img {
        width:380px;
        height:420px;
        object-fit:cover;
        border-radius:10px;
    }
    @media (max-width: 560px) {
        flex-direction:column;
    }
    @media (max-width: 880px) {
        width:calc(100% - 40px);
    }
    @media (max-width: 480px) {
        img {
            width:calc(100% - 40px);
            height:auto;
        }
    }
`;

const About = styled.div`
    display:flex;
    flex-direction:column;
    h5 {
        color:#fff;
        font-family: 'Marvel', sans-serif;
        font-size:24px;
    }
    p {
        color:#fff;
        font-size:16px;
        line-height:1.8;
    }
`;

const Body = styled.div`
    display:flex;
    flex-direction:column;

    @media (max-width: 840px) {
        max-width:100%;
    }
`;

export default SingleHero;