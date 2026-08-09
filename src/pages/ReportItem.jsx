import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ReportItem.css";

function ReportItem() {
  const [type, setType] = useState("LOST");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImagePreview(null);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("itemName", formData.itemName);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("dateReported", formData.date);
      data.append("status", type);

      if (imageFile) {
        data.append("image", imageFile);
      }

      console.log("Submitting item...");

      const response = await api.post("/api/items", data);

      console.log("Item created:", response.data);

      alert("Item reported successfully! ✦");

      navigate("/dashboard");

    } catch (error) {
      console.error("Error reporting item:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
        console.error("Status:", error.response.status);
      }

      alert("Unable to report item. Please try again.");
    }
  };

  return (
    <main className="report-page">
      <section className="report-header">
        <p className="report-kicker">
          CAMPUS LOST & FOUND ✦
        </p>

        <h1>
          Tell us what
          <br />
          <span>happened.</span>
        </h1>

        <p>
          Whether you've lost something or found
          someone's belongings, you're in the right place.
        </p>
      </section>

      <section className="report-card">
        <div className="report-type">
          <button
            type="button"
            className={
              type === "LOST"
                ? "type-button active lost"
                : "type-button"
            }
            onClick={() => setType("LOST")}
          >
            <span>😵</span>
            <div>
              <strong>I lost something</strong>
              <small>Help me find it</small>
            </div>
          </button>

          <button
            type="button"
            className={
              type === "FOUND"
                ? "type-button active found"
                : "type-button"
            }
            onClick={() => setType("FOUND")}
          >
            <span>🎉</span>
            <div>
              <strong>I found something</strong>
              <small>Help me return it</small>
            </div>
          </button>
        </div>

        <form
          className="report-form"
          onSubmit={handleSubmit}
        >
          <div className="form-section-title">
            <span>01</span>
            <h2>About the item</h2>
          </div>

          <div className="report-field">
            <label htmlFor="itemName">
              Item name
            </label>

            <input
              id="itemName"
              name="itemName"
              type="text"
              placeholder="e.g. Blue Nike backpack"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="report-field">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Tell us anything that could help identify the item..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="report-row">
            <div className="report-field">
              <label htmlFor="location">
                {type === "LOST"
                  ? "Where was it lost?"
                  : "Where was it found?"}
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Central Library"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="report-field">
              <label htmlFor="date">
                {type === "LOST"
                  ? "Date lost"
                  : "Date found"}
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section-title upload-title">
            <span>02</span>
            <h2>Add a photo</h2>
          </div>

          <p className="upload-description">
            A clear photo makes it much easier for
            someone to recognize an item.
          </p>

          {!imagePreview ? (
            <label className="upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <span className="upload-icon">＋</span>

              <strong>
                Choose an image
              </strong>

              <small>
                PNG, JPG or JPEG
              </small>
            </label>
          ) : (
            <div className="image-preview">
              <img
                src={imagePreview}
                alt="Selected item"
              />

              <button
                type="button"
                onClick={removeImage}
                className="remove-image"
              >
                Remove image ×
              </button>
            </div>
          )}

          <button
            type="submit"
            className="submit-report"
          >
            {type === "LOST"
              ? "Report Lost Item ✦"
              : "Report Found Item ✦"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ReportItem;