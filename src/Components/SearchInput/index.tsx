import styled from 'styled-components';

interface SearchInputProps {
  term: string;
  onTermChange: (value: string) => void;
}

export const SearchInput = ({ term, onTermChange }: SearchInputProps) => {
  return (
    <Container>
      <input value={term} onChange={(e) => onTermChange(e.target.value)} />
    </Container>
  );
};

const Container = styled.div`
  input {
    height: 45px;
    width: 100%;
    border: none;
    box-shadow: 0 0 8px orange;
    border-radius:10px;
    padding:0 8px;
    font-family: 'Marvel', sans-serif;
    font-size:20px;
  }
  width: 400px;
  margin:0 auto 30px;

  @media (max-width: 560px) {
    width: 300px;
  }
`;