// src/components/CardCandidato.jsx
import { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 16px 20px;
  display: grid;
  grid-template-columns: 72px 1fr auto;
  gap: 16px;
  align-items: center;

  @media (max-width: 560px) {
    grid-template-columns: 56px 1fr;
  }
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 560px) {
    width: 56px;
    height: 56px;
    font-size: 1.3rem;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const NomeLinha = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Nome = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Badge = styled.span`
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  white-space: nowrap;

  background: ${({ $tipo }) =>
    $tipo === 'ELEITO' ? 'rgba(63, 185, 80, 0.15)' :
    $tipo === 'SEGUNDO_TURNO' ? 'rgba(210, 153, 34, 0.15)' :
    'transparent'};

  color: ${({ $tipo }) =>
    $tipo === 'ELEITO' ? '#3fb950' :
    $tipo === 'SEGUNDO_TURNO' ? '#d29922' :
    'inherit'};

  border: 1px solid ${({ $tipo }) =>
    $tipo === 'ELEITO' ? 'rgba(63, 185, 80, 0.4)' :
    $tipo === 'SEGUNDO_TURNO' ? 'rgba(210, 153, 34, 0.4)' :
    'transparent'};
`;

const Meta = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const NomeCompleto = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.75;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  min-width: 110px;

  @media (max-width: 560px) {
    grid-column: 2;
    align-items: flex-start;
  }
`;

const Percentual = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
`;

const Votos = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

function fmtInt(n) {
  return Number(n ?? 0).toLocaleString('pt-BR');
}

function labelBadge(status) {
  if (status === 'ELEITO') return 'Eleito';
  if (status === 'SEGUNDO_TURNO') return '2º turno';
  return null;
}

export default function CardCandidato({ candidato, status = null }) {
  const [fotoErro, setFotoErro] = useState(false);

  const {
    posicao,
    numero = '—',
    nome,
    nome_urna,
    partido,
    votos = 0,
    percentual = 0,
    foto_url,
  } = candidato ?? {};

  const nomeExibido = nome_urna || nome || '—';
  const pctNum = Number(percentual) || 0;
  const votosNum = Number(votos) || 0;
  const mostrarNomeCompleto = nome && nome_urna && nome !== nome_urna;
  const mostrarFoto = foto_url && !fotoErro;
  const badge = labelBadge(status);

  return (
    <Card>
      <Avatar>
        {mostrarFoto ? (
          <img
            src={foto_url}
            alt={nomeExibido}
            loading="lazy"
            onError={() => setFotoErro(true)}
          />
        ) : (
          nomeExibido.charAt(0)
        )}
      </Avatar>

      <Info>
        <NomeLinha>
          <Nome>
            {posicao ? `${posicao}º · ` : ''}
            {numero} · {nomeExibido}
          </Nome>
          {badge && <Badge $tipo={status}>{badge}</Badge>}
        </NomeLinha>

        {mostrarNomeCompleto && (
          <NomeCompleto>{nome}</NomeCompleto>
        )}

        <Meta>{partido || '—'}</Meta>
      </Info>

      <Right>
        <Percentual>{pctNum.toFixed(2)}%</Percentual>
        <Votos>{fmtInt(votosNum)} votos</Votos>
      </Right>
    </Card>
  );
}