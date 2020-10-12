import React, { useState } from "react";
import axiosWithAuth from "../api/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [editingNew, setEditingNew] = useState(false);
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/colors/:${colorToEdit.id}`, colorToEdit).then(r => {
      updateColors(colors.map(c => {
      if (c.id === r.data.id) { return r.data }
      return c;
    }))})
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/colors/${color.id}`).then(r => {
      console.log(r);
      updateColors(colors.filter(c=>c.id!==r.data))
    })
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth().post('/colors', colorToEdit).then(r => {
      updateColors(r.data)
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul data-testid="colorList">
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)} data-testid="colorItem">
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
        <li onClick={() => { setColorToEdit(initialColor); setEditingNew(true)}}><span><span className="add">+</span> add new color</span></li>
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {editingNew && (<form onSubmit={addColor}>
          <legend>new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>)}
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;
