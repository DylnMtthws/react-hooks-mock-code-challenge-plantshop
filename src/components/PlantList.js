import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, onUpdate }) {
  if (!plants) {
    return (
      <section>
        <h1>Plants Loading...</h1>
      </section>
    );
  }
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} onDelete={onDelete} onUpdate={onUpdate}/>
      ))}
    </ul>
  );
}

export default PlantList;
