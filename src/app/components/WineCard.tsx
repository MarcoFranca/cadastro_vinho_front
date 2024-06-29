// // src/components/WineCard.tsx
// import React from 'react';
// import styled from 'styled-components';
//
// interface WineCardProps {
//     name: string;
//     year: number;
//     onEdit: () => void;
//     onDelete: () => void;
// }
//
// const Card = styled.div`
//   border: 1px solid #ddd;
//   padding: 16px;
//   margin: 16px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// `;
//
// const WineCard: React.FC<WineCardProps> = ({ name, year, onEdit, onDelete }) => {
//     return (
//         <Card>
//             <h2>{name}</h2>
//             <p>Year: {year}</p>
//             <button onClick={onEdit}>Edit</button>
//             <button onClick={onDelete}>Delete</button>
//         </Card>
//     );
// };
//
// export default WineCard;
