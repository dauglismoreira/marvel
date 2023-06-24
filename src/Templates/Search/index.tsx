import { useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col   } from 'reactstrap';
import { SearchInput } from '../../Components/SearchInput';

interface SearchProps {
    onSearchTermChange: (term: string) => void;
  }

export function Search({ onSearchTermChange }: SearchProps) {

    const [searchTerm, setSearchTerm] = useState('');

    function handleTermChange(value: string) {
        setSearchTerm(value)
        onSearchTermChange(value)
    }

    return (
        <>
            <Title>Procure seu herói por nome <small>ex. Hulk</small></Title>
            <SearchInput term={searchTerm} onTermChange={handleTermChange} />
        </>
    );
};

const Title = styled.div`
  font-size: 16px;
  text-align: center;
  color: orange;
  margin-bottom:10px;
  font-family: 'Marvel', sans-serif;
`;