import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import "./EditItem.css";


function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    dateReported: "",
    status: "LOST",
    imageUrl: "",
  });


  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/api/items/${id}`);

        const item = response.data;

        setFormData({
          itemName: item.itemName || "",
          description: item.description || "",
          location: item.location || "",
          dateReported: item.dateReported || "",
          status: item.status || "LOST",
          imageUrl: item.imageUrl || "",
        });
      } catch (err) {
        console.error("Error loading item:", err);
        setError("Unable to load this item.");
      } finally {
        setLoading(false);
      }
    };


    fetchItem();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");


    try {
      const updateData = {
        itemName: formData.itemName,
        description: formData.description,
        location: formData.location,
        dateReported: formData.dateReported,
        status: formData.status,
      };


      await api.put(`/api/items/${id}`, updateData);


      alert("Item updated successfully! ✦");

      navigate(`/items/${id}`);
    } catch (err) {
      console.error("Error updating item:", err);

      setError(
        err.response?.data ||
          "Unable to update item. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <main className="edit-page">
        <div className="edit-loading">
          <p>Loading item...</p>
        </div>
      </main>
    );
  }


  if (error && !formData.itemName) {
    return (
      <main className="edit-page">
        <div className="edit-error">
          <h2>Something went wrong.</h2>
          <p>{error}</p>

          <Link to="/my-items">
            ← Back to my items
          </Link>
        </div>
      </main>
    );
  }


  return (
    <main className="edit-page">

      <section className="edit-header">

        <div>
          <p className="edit-kicker">
            YOUR FINDORA ✦
          </p>

          <h1>
            Edit
            <br />
            <span>item.</span>
          </h1>

          <p>
            Update the details of your reported item.
          </p>
        </div>

      </section>


      <section className="edit-card">

        <Link
          to={`/items/${id}`}
          className="edit-back"
        >
          ← Back to item
        </Link>


        <form
          className="edit-form"
          onSubmit={handleSubmit}
        >

          <div className="edit-section-title">
            <span>01</span>
            <h2>Item details</h2>
          </div>


          <div className="edit-field">
            <label htmlFor="itemName">
              Item Name
            </label>

            <input
              id="itemName"
              name="itemName"
              type="text"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>


          <div className="edit-field">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>


          <div className="edit-row">

            <div className="edit-field">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
            </div>


            <div className="edit-field">
              <label htmlFor="dateReported">
                Date
              </label>

              <input
                id="dateReported"
                name="dateReported"
                type="date"
                value={formData.dateReported}
                onChange={handleChange}
                required
              />
            </div>

          </div>


          <div className="edit-field">

            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="LOST">
                Lost
              </option>

              <option value="FOUND">
                Found
              </option>

              <option value="RETURNED">
                Returned
              </option>
            </select>

          </div>


          {formData.imageUrl && (
            <div className="current-image">

              <div className="edit-section-title">
                <span>02</span>
                <h2>Current photo</h2>
              </div>

              <img
                src={formData.imageUrl}
                alt={formData.itemName}
              />

              <p>
                The current photo will remain unchanged.
              </p>

            </div>
          )}


          {error && (
            <p className="edit-error-message">
              {error}
            </p>
          )}


          <div className="edit-actions">

            <button
              type="button"
              className="edit-cancel"
              onClick={() =>
                navigate(`/items/${id}`)
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="edit-save"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes ✦"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}


export default EditItem;