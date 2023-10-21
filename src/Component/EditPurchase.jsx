import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPurchase = ({ purchases, updatePurchase }) => {
  const { id } = useParams();
  const [newPurchaseData, setNewPurchaseData] = useState({
    date: '',
    amount: '',
  });

  useEffect(() => {
    const purchaseToEdit = purchases.find((purchase) => purchase.id === +id);
    if (purchaseToEdit) {
      setNewPurchaseData({
        date: purchaseToEdit.date,
        amount: purchaseToEdit.amount,
      });
    }
  }, [id, purchases]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPurchaseData({ ...newPurchaseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePurchase(+id, newPurchaseData);
    // Navigate back to the view page after updating
    window.location.href = '/';
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Purchase</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <input
            type="date"
            name="date"
            value={newPurchaseData.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount:
          </label>
          <input
            type="number"
            name="amount"
            value={newPurchaseData.amount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Purchase
        </button>
      </form>
    </div>
  );
};

export default EditPurchase;