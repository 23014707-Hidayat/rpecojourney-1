import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:1337/api";

const ProjectPage = () => {
  const { documentId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/content-items/${documentId}?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) setItem(data.data);
        else setError("Project not found.");
      })
      .catch(() => setError("Error fetching project"));
  }, [documentId]);

  if (error)
    return (
      <div className="project-page-wrapper">
        <Link to="/" className="project-back-link">← Back</Link>
        <p>{error}</p>
      </div>
    );

  if (!item) return <p className="no-content-text">Loading…</p>;

  return (
    <div className="project-page-wrapper">
      <Link to="/" className="project-back-link">← Back</Link>

      <div className="project-page-card">
        <div className="category-badge">{item.category?.name}</div>
        <h1 className="project-page-title">{item.title}</h1>

        <div className="project-page-body">
          {item.text?.map((block, i) => (
            <p key={i}>{block.children?.[0]?.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
