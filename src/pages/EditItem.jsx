import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

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
      await api.put(`/api/items/${id}`, formData);

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
    return <p>Loading item...</p>;
  }

  if (error && !formData.itemName) {
    return (
      <main>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <section>
        <h1>Edit Item</h1>

        <form onSubmit={handleSubmit}>

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

          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="LOST">Lost</option>
            <option value="FOUND">Found</option>
            <option value="RETURNED">Returned</option>
          </select>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/items/${id}`)}
          >
            Cancel
          </button>

        </form>
      </section>
    </main>
  );
}

export default EditItem;