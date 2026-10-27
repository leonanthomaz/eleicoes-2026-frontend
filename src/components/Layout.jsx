// src/components/Layout.jsx
import styled from 'styled-components';
import Header from './Header.jsx';

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 64px;
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}