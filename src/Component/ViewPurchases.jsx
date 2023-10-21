import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewPurchases = ({ purchases, editPurchase }) => {
  const [editing, setEditing] = useState(null);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleEdit = (id) => {
    setEditing(id);
    const purchaseToEdit = purchases.find((purchase) => purchase.id === id);
    setDate(purchaseToEdit.date);
    setAmount(purchaseToEdit.amount);
  };

  const handleSave = (id) => {
    editPurchase(id, { date, amount });
    setEditing(null);
    setDate('');
    setAmount('');
  };

  return (
    <div className="bg-white p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Purchase Statement</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Serial No.</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td className="border p-2">{purchase.id}</td>
              <td className="border p-2">
                {editing === purchase.id ? (
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 w-full"
                  />
                ) : (
                  purchase.date
                )}
              </td>
              <td className="border p-2">
                {editing === purchase.id ? (
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2 w-full"
                  />
                ) : (
                  `$${purchase.amount}`
                )}
              </td>
              <td className="border p-2">
                {editing === purchase.id ? (
                  <button
                    onClick={() => handleSave(purchase.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                ) : (
                  <Link
                    to={`/edit/${purchase.id}`}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Edit
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPurchases;
