// src/pages/FounderDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FounderDashboard = () => {
  const email = localStorage.getItem('email');
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5005/api/proposals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProposals(res.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Founder Dashboard</h1>
      <p style={styles.subheading}>Welcome, {email}</p>
      <p style={styles.text}>
        Here you can post investment proposals, manage your startup profile, and chat with investors.
      </p>

      <button style={styles.button} onClick={() => navigate('/create-proposal')}>
        + Create New Proposal
      </button>

      <div style={{ marginTop: '40px' }}>
        {proposals.length === 0 ? (
          <p style={styles.text}>No proposals submitted yet.</p>
        ) : (
          proposals.map((proposal) => {
            const investments = proposal.investments || [];

            const totalRaised = investments.reduce((sum, inv) => {
              const amount = parseFloat(inv?.amount);
              return isNaN(amount) ? sum : sum + amount;
            }, 0);

            const fundingGoal = parseFloat(proposal.fundingGoal) || 0;
            const remaining = fundingGoal - totalRaised;

            return (
              <div key={proposal._id} style={styles.card}>
                <h2 style={styles.cardTitle}>{proposal.title}</h2>
                <p style={styles.cardText}>{proposal.description}</p>
                <p><strong>Funding Goal:</strong> ${fundingGoal.toLocaleString()}</p>
                <p><strong>Status:</strong> {proposal.status}</p>
                <p><strong>Total Raised:</strong> ${totalRaised.toLocaleString()}</p>
                <p><strong>Remaining:</strong> ${remaining.toLocaleString()}</p>

                <div style={{ marginTop: '10px' }}>
                  <strong>Investors:</strong>
                  {investments.length === 0 ? (
                    <p style={{ color: '#9ca3af' }}>No investments yet</p>
                  ) : (
                    <ul>
                      {investments.map((inv, idx) => {
                        const name = inv?.investor?.name || 'Unknown';
                        const amount = parseFloat(inv?.amount);
                        const amountText = isNaN(amount) ? 'N/A' : `$${amount.toLocaleString()}`;

                        return (
                          <li key={idx}>
                            {name} - {amountText}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: '#fff7ed',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#c2410c',
  },
  subheading: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.1rem',
    color: '#78350f',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#ea580c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  card: {
    background: '#fef3c7',
    padding: '20px',
    marginBottom: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#92400e',
  },
  cardText: {
    marginBottom: '10px',
  },
};

export default FounderDashboard;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const FounderDashboard = () => {
//   const email = localStorage.getItem('email');
//   const [proposals, setProposals] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProposals = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5005/api/proposals', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProposals(res.data);
//       } catch (error) {
//         console.error('Error fetching proposals:', error);
//       }
//     };

//     fetchProposals();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>Founder Dashboard</h1>
//       <p style={styles.subheading}>Welcome, {email}</p>
//       <p style={styles.text}>
//         Here you can post investment proposals, manage your startup profile, and chat with investors.
//       </p>

//       <button style={styles.button} onClick={() => navigate('/create-proposal')}>
//         + Create New Proposal
//       </button>

//       <div style={{ marginTop: '40px' }}>
//         {proposals.length === 0 ? (
//           <p style={styles.text}>No proposals submitted yet.</p>
//         ) : (
//           proposals.map((proposal) => {
//             const investments = proposal.investments || [];

//             const totalRaised = investments.reduce((sum, inv) => {
//               const amount = parseFloat(inv?.amount);
//               return isNaN(amount) ? sum : sum + amount;
//             }, 0);

//             const fundingGoal = parseFloat(proposal.fundingGoal) || 0;
//             const remaining = fundingGoal - totalRaised;

//             return (
//               <div key={proposal._id} style={styles.card}>
//                 <h2 style={styles.cardTitle}>{proposal.title}</h2>
//                 <p style={styles.cardText}>{proposal.description}</p>
//                 <p><strong>Funding Goal:</strong> ${fundingGoal.toLocaleString()}</p>
//                 <p><strong>Status:</strong> {proposal.status}</p>
//                 <p><strong>Total Raised:</strong> ${totalRaised.toLocaleString()}</p>
//                 <p><strong>Remaining:</strong> ${remaining.toLocaleString()}</p>

//                 <div style={{ marginTop: '10px' }}>
//                   <strong>Investors:</strong>
//                   {investments.length === 0 ? (
//                     <p style={{ color: '#9ca3af' }}>No investments yet</p>
//                   ) : (
//                     <ul>
//                       {investments.map((inv, idx) => {
//                         const name = inv?.investor?.name || 'Unknown';
//                         const amount = parseFloat(inv?.amount);
//                         const amountText = isNaN(amount) ? 'N/A' : `$${amount.toLocaleString()}`;

//                         return (
//                           <li key={idx}>
//                             {name} - {amountText}
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '40px',
//     background: '#fff7ed',
//     minHeight: '100vh',
//     fontFamily: 'sans-serif',
//   },
//   heading: {
//     fontSize: '2.5rem',
//     color: '#c2410c',
//   },
//   subheading: {
//     fontSize: '1.2rem',
//     marginBottom: '10px',
//   },
//   text: {
//     fontSize: '1.1rem',
//     color: '#78350f',
//   },
//   button: {
//     marginTop: '20px',
//     padding: '10px 20px',
//     backgroundColor: '#ea580c',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     fontSize: '1rem',
//   },
//   card: {
//     background: '#fef3c7',
//     padding: '20px',
//     marginBottom: '30px',
//     borderRadius: '10px',
//     boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
//   },
//   cardTitle: {
//     fontSize: '1.5rem',
//     color: '#92400e',
//   },
//   cardText: {
//     marginBottom: '10px',
//   },
// };

// export default FounderDashboard;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const FounderDashboard = () => {
//   const email = localStorage.getItem('email');
//   const [proposals, setProposals] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProposals = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5005/api/proposals', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProposals(res.data);
//       } catch (error) {
//         console.error('Error fetching proposals:', error);
//       }
//     };

//     fetchProposals();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>Founder Dashboard</h1>
//       <p style={styles.subheading}>Welcome, {email}</p>
//       <p style={styles.text}>
//         Here you can post investment proposals, manage your startup profile, and chat with investors.
//       </p>

//       <button style={styles.button} onClick={() => navigate('/create-proposal')}>
//         + Create New Proposal
//       </button>

//       <div style={{ marginTop: '40px' }}>
//         {proposals.length === 0 ? (
//           <p style={styles.text}>No proposals submitted yet.</p>
//         ) : (
//           proposals.map((proposal) => {
//             const investments = proposal.investments || [];

//             const totalRaised = investments.reduce((sum, inv) => {
//               const amount = parseFloat(inv?.amount);
//               return isNaN(amount) ? sum : sum + amount;
//             }, 0);

//             const fundingGoal = parseFloat(proposal.fundingGoal) || 0;
//             const remaining = fundingGoal - totalRaised;

//             return (
//               <div key={proposal._id} style={styles.card}>
//                 <h2 style={styles.cardTitle}>{proposal.title}</h2>
//                 <p style={styles.cardText}>{proposal.description}</p>
//                 <p><strong>Funding Goal:</strong> ${fundingGoal.toLocaleString()}</p>
//                 <p><strong>Status:</strong> {proposal.status}</p>
//                 <p><strong>Total Raised:</strong> ${totalRaised.toLocaleString()}</p>
//                 <p><strong>Remaining:</strong> ${remaining.toLocaleString()}</p>

//                 <div style={{ marginTop: '10px' }}>
//                   <strong>Investors:</strong>
//                   {investments.length === 0 ? (
//                     <p style={{ color: '#9ca3af' }}>No investments yet</p>
//                   ) : (
//                     <ul>
//                       {investments.map((inv, idx) => {
//                         console.log('Investor entry:', inv); // DEBUG

//                         const name = inv?.investor?.name || 'Unknown';
//                         const investorEmail = inv?.investor?.email || 'N/A';
//                         const amount = parseFloat(inv?.amount);
//                         const amountText = isNaN(amount) ? 'N/A' : `$${amount.toLocaleString()}`;

//                         return (
//                           <li key={idx}>
//                             {name} ({investorEmail}) - {amountText}
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '40px',
//     background: '#fff7ed',
//     minHeight: '100vh',
//     fontFamily: 'sans-serif',
//   },
//   heading: {
//     fontSize: '2.5rem',
//     color: '#c2410c',
//   },
//   subheading: {
//     fontSize: '1.2rem',
//     marginBottom: '10px',
//   },
//   text: {
//     fontSize: '1.1rem',
//     color: '#78350f',
//   },
//   button: {
//     marginTop: '20px',
//     padding: '10px 20px',
//     backgroundColor: '#ea580c',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     fontSize: '1rem',
//   },
//   card: {
//     background: '#fef3c7',
//     padding: '20px',
//     marginBottom: '30px',
//     borderRadius: '10px',
//     boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
//   },
//   cardTitle: {
//     fontSize: '1.5rem',
//     color: '#92400e',
//   },
//   cardText: {
//     marginBottom: '10px',
//   },
// };

// export default FounderDashboard;
