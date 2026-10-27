// src/components/Header.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFlag } from 'react-icons/fa';

const Bar = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.1rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;

  a {
    color: ${({ theme }) => theme.colors.textMuted};
    transition: color 0.15s;

    &:hover { color: ${({ theme }) => theme.colors.text}; }
  }
`;

export default function Header() {
  return (
    <Bar>
      <Inner>
        <Logo to="/">
          <FaFlag /> Eleições 2026
        </Logo>
        <Nav>
          <Link to="/presidente">Presidente</Link>
          <Link to="/governador/rj">Governador</Link>
          <Link to="/senador/rj">Senador</Link>
          <Link to="/deputado-federal/rj">Dep. Federal</Link>
          <Link to="/deputado-estadual/rj">Dep. Estadual</Link>
        </Nav>
      </Inner>
    </Bar>
  );
}