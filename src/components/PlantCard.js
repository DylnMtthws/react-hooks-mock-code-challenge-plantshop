import React, { useState } from "react";

function PlantCard({ plant, onDelete, onUpdate }) {
  const [stockButton, setStockButton] = useState(true);
  const [priceChange, setPriceChange] = useState(0);
  const handleStockButtonClick = () => setStockButton(!stockButton);
  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDelete(plant));
  }

  function handlePriceChange(event) {
    setPriceChange(event.target.value);
  }

  function handleUpdatePriceChange(event) {
    event.preventDefault();
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: priceChange }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => onUpdate(updatedPlant));
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {stockButton ? (
        <button className="primary" onClick={handleStockButtonClick}>
          In Stock
        </button>
      ) : (
        <button onClick={handleStockButtonClick}>Out of Stock</button>
      )}
      <button className="delete" onClick={handleDeleteClick}>
        Delete
      </button>
      <form onSubmit={handleUpdatePriceChange}>
        <input
          className="price"
          type="text"
          placeholder="Update price..."
          onChange={handlePriceChange}
        ></input>
        <button className="primary">Update</button>
      </form>
    </li>
  );
}

export default PlantCard;
