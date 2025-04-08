// src/pages/InvestorDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProposals } from '../redux/proposalSlice';
import axios from 'axios';

const InvestorDashboard = () => {
  const dispatch = useDispatch();
  const proposals = useSelector((state) => state.proposal.proposals);
  const email = localStorage.getItem('email');
  const [showModal, setShowModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5005/api/proposals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setProposals(res.data));
      } catch (err) {
        console.error('Error fetching proposals:', err);
      }
    };

    fetchProposals();
  }, [dispatch]);

  const openModal = (proposal) => {
    setSelectedProposal(proposal);
    setShowModal(true);
  };

  const handleInvest = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5005/api/investments',
        {
          proposalId: selectedProposal._id,
          amount: parseFloat(amount),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Investment successful!');
      setShowModal(false);
      setAmount('');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Investment failed');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Investor Dashboard</h1>
      <p style={styles.subheading}>Welcome, {email}</p>
      <p style={styles.text}>
        Explore proposals from founders, evaluate startups, and engage in real-time discussions.
      </p>

      <h2 style={{ marginTop: '30px', color: '#047857' }}>Available Proposals</h2>

      {proposals.length === 0 ? (
        <p style={{ marginTop: '10px' }}>No proposals available yet.</p>
      ) : (
        <div style={styles.proposalList}>
          {proposals.map((proposal) => (
            <div key={proposal._id} style={styles.card}>
              <h3>{proposal.title}</h3>
              <p>{proposal.description}</p>
              <p><strong>Funding Goal:</strong> ${proposal.fundingGoal}</p>
              <p><strong>Total Raised:</strong> ${proposal.totalRaised || 0}</p>
              <p><strong>Remaining:</strong> ${proposal.fundingGoal - (proposal.totalRaised || 0)}</p>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                Founder: {proposal.founder?.name || 'Anonymous'}
              </p>
              <button onClick={() => openModal(proposal)} style={styles.button}>
                Invest
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Investment Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Invest in {selectedProposal.title}</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />
            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleInvest} style={styles.submitBtn}>Submit</button>
              <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: '#ecfdf5',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#065f46',
  },
  subheading: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.1rem',
    color: '#064e3b',
  },
  proposalList: {
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    width: '300px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#047857',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    width: '100%',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: '#047857',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelBtn: {
    padding: '10px 20px',
    backgroundColor: '#e11d48',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default InvestorDashboard;










// // src/pages/InvestorDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setProposals } from '../redux/proposalSlice';
// import axios from 'axios';

// const InvestorDashboard = () => {
//   const dispatch = useDispatch();
//   const proposals = useSelector((state) => state.proposal.proposals);
//   const email = localStorage.getItem('email');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProposal, setSelectedProposal] = useState(null);
//   const [amount, setAmount] = useState('');

//   useEffect(() => {
//     const fetchProposals = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5005/api/proposals', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         dispatch(setProposals(res.data));
//       } catch (err) {
//         console.error('Error fetching proposals:', err);
//       }
//     };

//     fetchProposals();
//   }, [dispatch]);

//   const openModal = (proposal) => {
//     setSelectedProposal(proposal);
//     setShowModal(true);
//   };

//   const handleInvest = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         'http://localhost:5005/api/investments',
//         {
//           proposalId: selectedProposal._id,
//           amount: parseFloat(amount),
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert('Investment successful!');
//       setShowModal(false);
//       setAmount('');
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//       alert('Investment failed');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>Investor Dashboard</h1>
//       <p style={styles.subheading}>Welcome, {email}</p>
//       <p style={styles.text}>
//         Explore proposals from founders, evaluate startups, and engage in real-time discussions.
//       </p>

//       <h2 style={{ marginTop: '30px', color: '#047857' }}>Available Proposals</h2>

//       {proposals.length === 0 ? (
//         <p style={{ marginTop: '10px' }}>No proposals available yet.</p>
//       ) : (
//         <div style={styles.proposalList}>
//           {proposals.map((proposal) => (
//             <div key={proposal._id} style={styles.card}>
//               <h3>{proposal.title}</h3>
//               <p>{proposal.description}</p>
//               <p><strong>Funding Goal:</strong> ${proposal.fundingGoal}</p>
//               <p><strong>Total Raised:</strong> ${proposal.totalRaised || 0}</p>
//               <p><strong>Remaining:</strong> ${proposal.fundingGoal - (proposal.totalRaised || 0)}</p>
//               <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
//                 Founder: {proposal.founder?.name || 'Anonymous'}
//               </p>
//               <button onClick={() => openModal(proposal)}>Invest</button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Investment Modal */}
//       {showModal && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3>Invest in {selectedProposal.title}</h3>
//             <input
//               type="number"
//               placeholder="Enter amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               style={styles.input}
//             />
//             <div style={{ marginTop: '1rem' }}>
//               <button onClick={handleInvest} style={styles.submitBtn}>Submit</button>
//               <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '40px',
//     background: '#ecfdf5',
//     minHeight: '100vh',
//     textAlign: 'center',
//   },
//   heading: {
//     fontSize: '2.5rem',
//     color: '#065f46',
//   },
//   subheading: {
//     fontSize: '1.2rem',
//     marginBottom: '10px',
//   },
//   text: {
//     fontSize: '1.1rem',
//     color: '#064e3b',
//   },
//   proposalList: {
//     marginTop: '20px',
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '20px',
//   },
//   card: {
//     border: '1px solid #ccc',
//     padding: '20px',
//     width: '300px',
//     borderRadius: '10px',
//     backgroundColor: '#fff',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//     textAlign: 'left',
//   },
//   modalOverlay: {
//     position: 'fixed',
//     top: 0, left: 0, right: 0, bottom: 0,
//     background: 'rgba(0,0,0,0.5)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   modalContent: {
//     background: 'white',
//     padding: '2rem',
//     borderRadius: '8px',
//     width: '300px',
//     textAlign: 'center',
//   },
//   input: {
//     padding: '10px',
//     width: '100%',
//     fontSize: '1rem',
//     borderRadius: '6px',
//     border: '1px solid #ccc',
//   },
//   submitBtn: {
//     padding: '10px 20px',
//     backgroundColor: '#047857',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     marginRight: '10px'
//   },
//   cancelBtn: {
//     padding: '10px 20px',
//     backgroundColor: '#e11d48',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer'
//   },
// };

// export default InvestorDashboard;