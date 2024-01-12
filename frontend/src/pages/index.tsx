import Link from 'next/link'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center; 
`;

const Buttons = styled.button`
    margin:.5rem .5rem;
    display:'flex';
    justify-content:space-betwwen
    align-items:center

`

export default function Home() {
  return (
    <Container>
      <div>
        <Typography
          variant="h4"
          gutterBottom>
          Páginas
        </Typography>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{margin:'10px'}}
          LinkComponent={Link}
          href="/candidate"
        >
          Cadastro
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{marginLeft:'10px'}}
          LinkComponent={Link}
          href="/search"
        >
          Busca
        </Button>
      </div>
    </Container>
  )
}