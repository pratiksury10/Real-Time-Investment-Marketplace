import React from 'react';

const ProposalsList = ({ proposals }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Proposals</h2>

      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        proposals.map(proposal => {
          const totalRaised = proposal.investments?.reduce((sum, inv) => {
            const amt = parseFloat(inv?.amount);
            return isNaN(amt) ? sum : sum + amt;
          }, 0) || 0;

          const fundingGoal = parseFloat(proposal.fundingGoal) || 0;
          const remaining = fundingGoal - totalRaised;

          return (
            <div key={proposal._id} className="border p-4 mb-6 rounded shadow">
              <h3 className="text-xl font-semibold">{proposal.title}</h3>
              <p className="text-gray-700 mb-2">{proposal.description}</p>
              <p className="font-medium mb-1">Funding Goal: ${fundingGoal.toLocaleString()}</p>
              <p className="mb-1">Status: <span className="italic">{proposal.status}</span></p>
              <p className="mb-1">Total Raised: ${totalRaised.toLocaleString()}</p>
              <p className="mb-3">Remaining: ${remaining.toLocaleString()}</p>

              <div className="mt-2">
                <h4 className="font-bold mb-2">Investments:</h4>
                {proposal.investments && proposal.investments.length > 0 ? (
                  proposal.investments.map((investment, index) => {
                    const name = investment?.investor?.name || 'Unknown';
                    const email = investment?.investor?.email || 'N/A';
                    const amount = parseFloat(investment?.amount);
                    const amountText = isNaN(amount) ? 'N/A' : `$${amount.toLocaleString()}`;

                    return (
                      <p key={index} className="text-sm text-green-700">
                        {name} ({email}) - {amountText}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No investments yet.</p>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProposalsList;





// import React from 'react';

// const ProposalsList = ({ proposals }) => {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Your Proposals</h2>

//       {proposals.length === 0 ? (
//         <p>No proposals found.</p>
//       ) : (
//         proposals.map(proposal => (
//           <div key={proposal._id} className="border p-4 mb-6 rounded shadow">
//             <h3 className="text-xl font-semibold">{proposal.title}</h3>
//             <p className="text-gray-700 mb-2">{proposal.description}</p>
//             <p className="font-medium mb-2">Funding Goal: ${proposal.fundingGoal}</p>
//             <p className="mb-2">Status: <span className="italic">{proposal.status}</span></p>

//             <div className="mt-4">
//               <h4 className="font-bold mb-2">Investments:</h4>
//               {proposal.investments && proposal.investments.length > 0 ? (
//                 proposal.investments.map((investment, index) => (
//                   <p key={index} className="text-sm text-green-700">
//                     {investment.investor && investment.investor.name && investment.investor.email
//                       ? `${investment.investor.name} (${investment.investor.email}) - $${investment.amount}`
//                       : `Unknown Investor - $${investment.amount}`}
//                   </p>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-500">No investments yet.</p>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ProposalsList;