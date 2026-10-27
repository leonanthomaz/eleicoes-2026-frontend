// import styled from 'styled-components';
// import { useGovernadorRJ } from '../hooks/useEleicoes';
// import CardCandidato from '../components/CardCandidato.jsx';
// import StatusApuracao from '../components/StatusApuracao.jsx';

// const Title = styled.h1`
//   font-size: 1.6rem;
//   margin-bottom: 16px;
// `;

// const List = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   margin-top: 20px;
// `;

// export default function GovernadorRJ() {
//   const { data, isLoading, error } = useGovernadorRJ();

//   if (isLoading) return <p>Carregando…</p>;
//   if (error) return <p>Erro ao carregar dados do TSE.</p>;

//   return (
//     <>
//       <Title>Governador RJ — 2026</Title>
//       <StatusApuracao data={data} />

//       {data?.candidatos?.length > 0 && (
//         <List>
//           {data.candidatos.map(c => (
//             <CardCandidato key={c.numero} candidato={c} />
//           ))}
//         </List>
//       )}
//     </>
//   );
// }