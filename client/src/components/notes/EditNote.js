import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });
  const navigate = useNavigate();
  let { id1 } = useParams();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (id1) {
        const res = await axios.get(`/api/notes/${id1}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [id1]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
        };
        await axios.put(`/api/notes/${id}`, newNote, {
          headers: { Authorization: token },
        });

        return navigate("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create-note">
      <h2>Edit Note</h2>
      <form onSubmit={editNote} autoComplete="on">
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={note.title}
            id="title"
            name="title"
            required
            onChange={onChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            value={note.content}
            id="content"
            name="content"
            required
            rows="10"
            onChange={onChangeInput}
          />
        </div>

        <label htmlFor="date">Date: {note.date} </label>
        <div className="row">
          <input type="date" id="date" name="date" onChange={onChangeInput} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
