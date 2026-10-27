// src/components/Loading.jsx
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 48px 16px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 0.8s linear infinite;
`;

const Texto = styled.span`
  font-size: 0.95rem;
`;

export default function Loading({ texto = 'Carregando dados do TSE…' }) {
  return (
    <Wrapper role="status" aria-live="polite">
      <Spinner />
      <Texto>{texto}</Texto>
    </Wrapper>
  );
}