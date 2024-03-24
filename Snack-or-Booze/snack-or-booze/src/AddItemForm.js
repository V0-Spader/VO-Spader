import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const AddItemForm = ({ add }) => {
  /**send value to parent and clear form **/
  const INITIAL_STATE = { name: "", serve: "", description: "", recipe: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  /**we get the type from the route :type  */
  const { type } = useParams();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    add(formData, type);
    setFormData(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={formData.name}
            id="name"
          />
        </div>
        <div>
          <label htmlFor="serve">Serve</label>
          <input
            onChange={handleChange}
            type="text"
            name="serve"
            id="serve"
            value={formData.serve}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            onChange={handleChange}
            type="text"
            name="description"
            value={formData.description}
            id="description"
          />
        </div>

        <div>
          <label htmlFor="recipe">Recipe</label>
          <input
            onChange={handleChange}
            type="text"
            name="recipe"
            value={formData.recipe}
            id="recipe"
          />
        </div>
        <button
          id="newItemButton"
          type="submit"
          onClick={() => alert("sucessfully updated!")}
        >
          Add a new {type}!
        </button>
        <button>
          <Link to={`/${type}`}>back!</Link>
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;