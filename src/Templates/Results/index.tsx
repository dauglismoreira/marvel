import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

interface Hero {
    name: string;
    id: string;
    thumbnail: {
      path: string;
      extension: string;
    };
}
  
interface ResultsProps {
    heroList: Hero[];
}

export function Results({ heroList }: ResultsProps) {
    return (
        <Row>
            {heroList.map((hero, index) => (
                <Link key={index} to={'/hero/' + hero.id}><Item >
                    <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} />
                    <h3>{hero.name}</h3>
                    <small>+ info</small>
                </Item></Link>
            ))}
        </Row>
    );
}


const fadeIn = keyframes`
  0% {
    transform:scale(1)
  }
  50% {
    transform:scale(1.2)
  }
  100% {
    transform:scale(1)
  }
`;


const Row = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:20px;
    padding:20px;
    max-width:840px;
    margin:auto;
    justify-content: center;
`

const Item = styled.div`
    img {
        object-fit: cover;
        border-radius: 8px;
        width: 80px;
        height: 80px;
    }
    h3 {
        width:155px;
        color:#fff;
        font-family: 'Marvel', sans-serif;
        text-shadow: 0 0 4px blue;
    }
    small {
        color:#fff;
        position:absolute;
        bottom:10px;
        right:10px;
    }
    padding:10px;
    display:flex;
    flex-direction:row;
    gap:10px;
    align-items:center;
    flex:1;
    border-radius:10px;
    box-shadow: 0 0 4px orange;
    cursor:pointer;
    position:relative;
    transition:0.3s;

    &:hover {
        transform:scale(1.1)
    }

    &:hover small{
        animation: ${fadeIn} 2s ease-in infinite;
    }
`;