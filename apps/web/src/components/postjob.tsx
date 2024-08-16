import React, { useState } from "react";
import axios from "axios";

const PostJob: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    jobType: "",
    location: "",
    salary: "",
    postedDate: "",
    deadline: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/postings", formData);
      alert("Job posted successfully!");
    } catch (err) {
      alert("Failed to post job");
    }
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close" : "Post New Job"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="jobType"
            placeholder="Job Type"
            value={formData.jobType}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="postedDate"
            value={formData.postedDate}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PostJob;
