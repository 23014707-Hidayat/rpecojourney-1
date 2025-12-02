import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:1337";
const API_URL = `${BASE_URL}/api`;
const ITEMS_PER_PAGE = 6;

const ContentList = () => {
  const [contentItems, setContentItems] = useState([]);
  const [search, setSearch] = useState("");
  const [esgFilter, setEsgFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}/content-items?populate=*`)
      .then((res) => res.json())
      .then((data) => setContentItems(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  const filtered = contentItems.filter((item) => {
    const title = item.title?.toLowerCase() || "";
    const body = item.text?.[0]?.children?.[0]?.text?.toLowerCase() || "";

    const matchesSearch =
      !search ||
      title.includes(search.toLowerCase()) ||
      body.includes(search.toLowerCase());

    const esg = item.category?.esg_type;
    const matchesEsg = esgFilter === "ALL" || esg === esgFilter;

    return matchesSearch && matchesEsg;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const shown = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <div className="content-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-title">Filter projects</div>

          <div className="sidebar-section-label">Search</div>
          <input
            className="search-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <div className="sidebar-section-label">ESG</div>
          <div className="filter-pills">
            {["ALL", "E", "S", "G"].map((x) => (
              <button
                key={x}
                className={`filter-pill ${
                  x === esgFilter ? "filter-pill-active" : ""
                }`}
                onClick={() => {
                  setEsgFilter(x);
                  setPage(1);
                }}
              >
                {x}
              </button>
            ))}
          </div>
        </aside>

        {/* GRID */}
        <div className="content-grid">
          {shown.map((item) => (
            <Link
              key={item.id}
              className="content-card"
              to={`/project/${item.documentId}`}
            >
              <div className="category-badge">
                {item.category?.name || "Uncategorized"}
              </div>

              {item.image && (
                <img
                  src={`${BASE_URL}${item.image.url}`}
                  alt={item.image.alternativeText || item.title}
                  className="content-card-image"
                />
              )}

              <h2>{item.title}</h2>
              <p>{item.text?.[0]?.children?.[0]?.text}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ContentList;
