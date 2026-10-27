// src/components/StatusApuracao.jsx
import styled from 'styled-components';
import { FaClock, FaCheckCircle } from 'react-icons/fa';

const Box = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Linha = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ProgressBar = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
  flex: 1;
  min-width: 140px;

  > div {
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.5s ease;
  }
`;

const Percent = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  min-width: 72px;
`;

const Fonte = styled.span`
  font-size: 0.75rem;
  opacity: 0.65;
`;

function fmt(n) {
  return Number(n ?? 0).toLocaleString('pt-BR');
}

export default function StatusApuracao({ data }) {
  if (!data) return null;

  if (data.status === 'AGUARDANDO_INICIO_DA_APURACAO') {
    return (
      <Box>
        <Linha>
          <FaClock />
          <span>Aguardando início da apuração pelo TSE…</span>
        </Linha>
      </Box>
    );
  }

  const progresso = data.progresso ?? {};
  const secoes = progresso.secoes ?? {};
  const eleitores = progresso.eleitores ?? {};

  const totalSecoes = secoes.total ?? 0;
  const totalizadas = secoes.totalizadas ?? 0;
  const pct = secoes.percentual ?? (totalSecoes ? (totalizadas / totalSecoes) * 100 : 0);
  const concluido = progresso.andamento === 'f' || (pct >= 100 && totalSecoes > 0);

  return (
    <Box>
      <Linha>
        {concluido ? <FaCheckCircle color="#3fb950" /> : <FaClock />}
        <Percent>{Number(pct).toFixed(2)}%</Percent>
        <ProgressBar>
          <div style={{ width: `${Math.min(pct, 100)}%` }} />
        </ProgressBar>
        <span>{fmt(totalizadas)} / {fmt(totalSecoes)} seções</span>
      </Linha>

      {(eleitores.total ?? 0) > 0 && (
        <Linha>
          <Fonte>
            Eleitores apurados: {fmt(eleitores.totalizados)} / {fmt(eleitores.total)}
            {' '}({Number(eleitores.percentual ?? 0).toFixed(2)}%)
          </Fonte>
        </Linha>
      )}

      {data.fonte?.gerado_em && (
        <Linha>
          <Fonte>
            Fonte TSE · {data.fonte.gerado_em}
            {data.fonte.id ? ` · id ${data.fonte.id}` : ''}
          </Fonte>
        </Linha>
      )}
    </Box>
  );
}