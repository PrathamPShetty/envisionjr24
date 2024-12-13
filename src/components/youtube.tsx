// {/* <div id="leaderboard">
//       <table>
//         <tbody>
//           {dataset.map((entry, index) => (
//             <tr
//               key={entry.name}
//               style={
//                 index === 0 ? { color: '#FFD700', fontWeight: 'bold' } : { color: '#000' }
//               }
//             >
//               <td className="number">{index + 1}</td>
//               <td id="leaderboard-image">
//                 <img src={entry.imgpath} alt="Leaderboard Image" />
//               </td>
//               <td className="name">{entry.name}</td>
//               <td className="points">
//               <strong>Point :   </strong>{entry.point}
//                 {/* {index === 0 && (
//                   <img
//                     className="gold-medal"
//                     src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
//                     alt="gold medal"
//                     style={{ width: '20px', marginLeft: '10px' }}
//                   />
//                 )} */}
//               </td>
          
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <style jsx>{`
//         * {
//           font-size: 62.5%;
//           box-sizing: border-box;
//           margin: 0;
//         }

//         #leaderboard-image {
//           width: 30%;
//           padding: 1rem;
//         }

//         #leaderboard-image img {
//           max-width: 20%;
//           border-radius: 0.5rem;
//         }

//         @media (max-width: 768px) {
//           #leaderboard-image {
//             width: 30%;
//           }

//           #leaderboard-image img {
//             max-width: 40%;
//           }
//         }

//         body {
//           height: 100%;
//           width: 100%;
//           min-height: 100vh;
//           background-color: #fbfaff;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         #leaderboard {
//           width: 100%;
//           max-width: 50rem;
//           position: relative;
//           padding: 1rem;
//           background-color: #ffffff;
//           box-shadow: 0px 5px 15px 8px #e4e7fb;
//           border-radius: 0.5rem;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           margin-left: 380px;
//         }

//         @media (max-width: 768px) {
//           #leaderboard {
//             margin-left: 2px;
//             margin-right: 2px;
//           }
//         }

//         @media (max-width: 480px) {
//           #leaderboard {
//             margin: 2px;
//             padding: 0.5rem;
//           }
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//           table-layout: fixed;
//           color: #141a39;
//           cursor: default;
//         }

//         tr {
//           transition: all 0.2s ease-in-out;
//           border-radius: 0.2rem;
//         }

//         tr:not(:first-child):hover {
//           background-color: #fff;
//           transform: scale(1.05);
//           box-shadow: 0px 5px 15px 8px #e4e7fb;
//         }

//         tr:nth-child(odd) {
//           background-color: #f9f9f9;
//         }

//         tr:nth-child(1) {
//           color: #fff;
//         }

//         td {
//           height: 5rem;
//           font-family: "Rubik", sans-serif;
//           font-size: 1.4rem;
//           padding: 1rem 2rem;
//           position: relative;
//           text-align: left;
//         }

//         .number {
//           width: 3rem;
//           font-size: 1rem;
//           font-weight: bold;
//           text-align: left;
//         }

//         .name {
//           text-align: left;
//           font-size: 1.2rem;
//         }

//         .points {
//           font-weight: bold;
//           font-size: 1.3rem;
//           display: flex;
//           justify-content: flex-start;
//           align-items: center;
//         }

//         .points:first-child {
//           width: 10rem;
//         }

//         .gold-medal {
//           height: 3rem;
//           margin-left: 1.5rem;
//         }

//         #buttons {
//           width: 100%;
//           margin-top: 3rem;
//           display: flex;
//           justify-content: center;
//           gap: 2rem;
//         }

//         .exit,
//         .continue {
//           width: 11rem;
//           height: 3rem;
//           font-family: "Rubik", sans-serif;
//           font-size: 1.3rem;
//           text-transform: uppercase;
//           border: 0;
//           border-radius: 2rem;
//           cursor: pointer;
//         }

//         .exit {
//           color: #7e7f86;
//           background-color: #fff;
//         }

//         .exit:hover {
//           border: 0.1rem solid #5c5be5;
//         }

//         .continue {
//           color: #fff;
//           background-color: #5c5be5;
//           border-bottom: 0.2rem solid #3838b8;
//         }

//         .continue:active {
//           border-bottom: 0;
//         }

//         .continue:hover {
//           background-color: #4a4bb6;
//         }

//         @media (max-width: 740px) {
//           * {
//             font-size: 60%;
//           }

//           td {
//             padding: 1rem 1rem;

//           }

//             td:nth-child(3) {
//       padding-left: 0rem; /* Less padding for very small screens */
//     }
//             td:nth-child(4) {
//       padding-left: 2.4rem; /* Less padding for very small screens */
//     }
//         }

//         @media (max-width: 500px) {
//           * {
//             font-size: 55%;
//           }

//           #leaderboard {
//             width: 90%;
//           }

//           td {
//             font-size: 1.2rem;
//           }
//         }

//         @media (max-width: 390px) {
//           * {
//             font-size: 45%;
//           }

//           td {
//             font-size: 0.7rem;
//           }

//           #leaderboard {
//             width: 95%;
//           }
//         }
//                  td:nth-child(3) {
//       padding-left: 0rem; /* Less padding for very small screens */
//     }
//       `}</style>
//     </div>

   
//   );
// } */}
