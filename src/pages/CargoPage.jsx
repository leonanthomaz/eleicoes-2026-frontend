// src/pages/CargoPage.jsx
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useCargo } from '../hooks/useEleicoes';
import CardCandidato from '../components/CardCandidato.jsx';
import StatusApuracao from '../components/StatusApuracao.jsx';
import Loading from '../components/Loading.jsx';

const Title = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 16px;
`;

const Filtros = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;
`;

const Campo = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Select = styled.select`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 6px 10px;
  font-size: 0.9rem;
`;

const BuscaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 260px;

  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 14px;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(47, 129, 247, 0.2);
  }

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
    flex-shrink: 0;
    font-size: 1.1rem;
  }
`;

const InputBusca = styled.input`
  flex: 1;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: none;
  outline: none;
  font-size: 0.95rem;
  min-width: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.7;
  }
`;

const ContadorBusca = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  padding: 0 4px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const VagasInfo = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  margin-bottom: 12px;
`;

const Vazio = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 20px;
`;

const UFS = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' },
];

const CARGOS_COM_BUSCA = new Set(['deputado-federal', 'deputado-estadual']);

function normalizar(texto) {
  if (!texto) return '';
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function calcularStatus(candidato, contexto) {
  // Só faz sentido em cargos majoritários
  if (!contexto?.majoritario) return null;

  const pct = Number(candidato?.percentual) || 0;
  const pos = candidato?.posicao;
  const cargo = contexto?.cargo;

  if (!pos || pct <= 0) return null;

  // Senador: 2 vagas, maioria simples → top 2 é eleito
  if (cargo === 'SENADOR') {
    return pos <= 2 ? 'ELEITO' : null;
  }

  // Presidente / Governador: >50% eleito, senão top 2 = 2º turno
  if (pct > 50) return 'ELEITO';
  if (pos <= 2) return 'SEGUNDO_TURNO';
  return null;
}

export default function CargoPage({ slug, titulo }) {
  const permiteAbrangencia = slug === 'presidente';
  const permiteBusca = CARGOS_COM_BUSCA.has(slug);

  const [abrangencia, setAbrangencia] = useState('br');
  const [uf, setUf] = useState('RJ');
  const [busca, setBusca] = useState('');

  const parametros = permiteAbrangencia && abrangencia === 'uf'
    ? { abrangencia: 'uf', uf: uf.toLowerCase() }
    : undefined;

  const { data, isLoading, error } = useCargo(slug, parametros);

  const contexto = data?.contexto ?? {};
  const resultado = data?.resultado ?? {};
  const candidatos = resultado.candidatos ?? [];

  const candidatosFiltrados = useMemo(() => {
    if (!permiteBusca || !busca.trim()) return candidatos;

    const termo = normalizar(busca.trim());

    return candidatos.filter((c) => {
      const campos = [
        c.numero,
        c.nome,
        c.nome_urna,
        c.partido,
        c.partido_nome,
      ].map(normalizar);

      return campos.some((campo) => campo.includes(termo));
    });
  }, [candidatos, busca, permiteBusca]);

  if (isLoading) return <Loading />;
  if (error) {
    console.error('[CargoPage] erro ao buscar', slug, error);
    return <p>Erro ao carregar dados do TSE.</p>;
  }

  return (
    <>
      <Title>
        {titulo} — 2026
        {contexto.uf ? ` · ${contexto.uf}` : ''}
      </Title>

      {permiteAbrangencia && (
        <Filtros>
          <Campo>
            Abrangência:
            <Select
              value={abrangencia}
              onChange={(e) => setAbrangencia(e.target.value)}
            >
              <option value="br">Brasil</option>
              <option value="uf">Estado (UF)</option>
            </Select>
          </Campo>

          {abrangencia === 'uf' && (
            <Campo>
              Estado:
              <Select value={uf} onChange={(e) => setUf(e.target.value)}>
                {UFS.map((u) => (
                  <option key={u.sigla} value={u.sigla}>
                    {u.sigla} — {u.nome}
                  </option>
                ))}
              </Select>
            </Campo>
          )}
        </Filtros>
      )}

      {contexto.vagas > 1 && (
        <VagasInfo>{contexto.vagas} vagas em disputa</VagasInfo>
      )}

      <StatusApuracao data={data} />

      {permiteBusca && candidatos.length > 0 && (
        <Filtros>
          <BuscaWrapper>
            <FiSearch />
            <InputBusca
              type="text"
              placeholder="Buscar por nome, número ou partido…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <ContadorBusca>
              {candidatosFiltrados.length} de {candidatos.length}
            </ContadorBusca>
          </BuscaWrapper>
        </Filtros>
      )}

      {candidatosFiltrados.length > 0 ? (
        <List>
          {candidatosFiltrados.map((c) => (
            <CardCandidato
              key={`${c.numero}-${c.nome_urna || c.nome}`}
              candidato={c}
              status={calcularStatus(c, contexto)}
            />
          ))}
        </List>
      ) : candidatos.length > 0 ? (
        <Vazio>Nenhum candidato corresponde à busca.</Vazio>
      ) : (
        <Vazio>Nenhum candidato retornado pelo TSE ainda.</Vazio>
      )}
    </>
  );
}