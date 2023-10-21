import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPurchase from './Component/AddPurchase';
import ViewPurchases from './Component/ViewPurchases';
import EditPurchase from './Component/EditPurchase';

const App = () => {
  const [purchases, setPurchases] = useState(
    JSON.parse(localStorage.getItem('purchases')) || []
  );

  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }, [purchases]);

  const addPurchase = (purchase) => {
    setPurchases([...purchases, { id: Date.now(), ...purchase }]);
  };

  const editPurchase = (id, newData) => {
    setPurchases((prevPurchases) =>
      prevPurchases.map((purchase) =>
        purchase.id === id ? { ...purchase, ...newData } : purchase
      )
    );
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<>
              <AddPurchase addPurchase={addPurchase} />
              <ViewPurchases purchases={purchases} editPurchase={editPurchase} />
              
            </>}
          />
          <Route
            path="/edit/:id"
            element={<EditPurchase purchases={purchases} updatePurchase={editPurchase} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
