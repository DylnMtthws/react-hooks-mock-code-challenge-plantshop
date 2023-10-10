import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((fetchedPlants) => setPlants(fetchedPlants));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function handleDelete(deletedPlant) {
    const updatedPlants = plants.filter(
      (plant) => plant.id !== deletedPlant.id
    );
    setPlants(updatedPlants);
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlantsFilter = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant;
      } else {
        return plant;
      }
    });
    setPlants(updatedPlantsFilter);
  }

  const filteredPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} onSearch={setSearch} />
      <PlantList
        plants={filteredPlants}
        onDelete={handleDelete}
        onUpdate={handleUpdatePlant}
      />
    </main>
  );
}

export default PlantPage;
