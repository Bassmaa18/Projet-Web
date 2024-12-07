import React, { useState, useEffect } from "react";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "./CategoryService";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [editedName, setEditedName] = useState("");

  // Charger les catégories au chargement de la page
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchData();
  }, []);

  // Ajouter une catégorie
  const handleAddCategory = async () => {
    if (newCategory.trim() === "") {
      alert("Le nom de la catégorie ne peut pas être vide !");
      return;
    }
    await addCategory(newCategory);
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
    setNewCategory("");
  };

  // Modifier une catégorie
  const handleEditCategory = async () => {
    if (editedName.trim() === "") {
      alert("Le nom de la catégorie ne peut pas être vide !");
      return;
    }
    await updateCategory(categoryToEdit.id, editedName);
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
    setEditMode(false);
    setCategoryToEdit(null);
    setEditedName("");
  };

  // Supprimer une catégorie
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      await deleteCategory(id);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
    }
  };

  return (
    <div>
      <h2>Gestion des Catégories</h2>

      {/* Formulaire d'ajout de catégorie */}
      <div>
        <input
          type="text"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Ajouter</button>
      </div>

      {/* Liste des catégories */}
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {editMode && categoryToEdit?.id === category.id ? (
              <div>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={handleEditCategory}>Enregistrer</button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setCategoryToEdit(null);
                    setEditedName("");
                  }}
                >
                  Annuler
                </button>
              </div>
            ) : (
              <div>
                <span>{category.name}</span>
                <button
                  onClick={() => {
                    setEditMode(true);
                    setCategoryToEdit(category);
                    setEditedName(category.name);
                  }}
                >
                  Modifier
                </button>
                <button onClick={() => handleDeleteCategory(category.id)}>
                  Supprimer
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
