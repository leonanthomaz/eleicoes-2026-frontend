// src/pages/Home.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 8px;
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 24px;
  transition: border-color 0.15s, transform 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  h2 { font-size: 1.2rem; margin-bottom: 4px; }
  p { color: ${({ theme }) => theme.colors.textMuted}; font-size: 0.9rem; }
`;

export default function Home() {
  return (
    <>
      <Title>Apuração 2026</Title>
      <Sub>Resultados em tempo real direto do TSE.</Sub>
      <Grid>
        <Card to="/presidente"><h2>🇧🇷 Presidente</h2><p>Apuração nacional</p></Card>
        <Card to="/governador/rj"><h2>🏛️ Governador RJ</h2><p>1 vaga</p></Card>
        <Card to="/senador/rj"><h2>🗳️ Senador RJ</h2><p>2 vagas</p></Card>
        <Card to="/deputado-federal/rj"><h2>🏛️ Deputado Federal RJ</h2><p>46 vagas</p></Card>
        <Card to="/deputado-estadual/rj"><h2>🏛️ Deputado Estadual RJ</h2><p>70 vagas</p></Card>
      </Grid>
    </>
  );
}