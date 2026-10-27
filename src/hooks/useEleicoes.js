// src/hooks/useEleicoes.js
import { useQuery } from '@tanstack/react-query';
import { eleicoesApi } from '../services/api';

const POLLING_MS = 60_000;

const fetchers = {
  'presidente': eleicoesApi.presidente,
  'governador': eleicoesApi.governadorRJ,
  'senador': eleicoesApi.senadorRJ,
  'deputado-federal': eleicoesApi.deputadoFederalRJ,
  'deputado-estadual': eleicoesApi.deputadoEstadualRJ,
};

export function useCargo(slug, { abrangencia, uf } = {}) {
  const fetcher = fetchers[slug];

  return useQuery({
    queryKey: ['cargo', slug, abrangencia, uf],
    queryFn: () => fetcher({ abrangencia, uf }),
    refetchInterval: POLLING_MS,
    staleTime: 30_000,
    enabled: Boolean(fetcher),
  });
}