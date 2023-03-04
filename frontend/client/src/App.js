import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [list, setlist] = useState([]);

  // clear
  const clear = (e) => {
    e.preventDefault();
    var form = document.querySelector("#user-info");
    form.reset();
  };

  // POSTDATA
  const postdata = async (e) => {
    e.preventDefault();
    const data = await axios.post("http://localhost:5000/post", {
      name: name,
      age: age,
    });
    console.log(data);
    setlist([...list, data.data]);
    var form = document.querySelector("#user-info");
    form.reset();
  };

  // updatedata using prompt
  const updatedata = async (id) => {
    const newname = prompt("Enter new name");
    const newage = prompt("Enter new age");
    const data = await axios.put(`http://localhost:5000/update/${id}`, {
      name: newname,
      age: newage,
    });
    // console.log(data);
    setlist(
      list.map((val) => {
        return val._id === id ? { _id: id, name: newname, age: newage } : val;
      })
    );
  };

  // delete
  const deletedata = async (id) => {
    const data = await axios.delete(`http://localhost:5000/delete/${id}`);
    // console.log(data);
    setlist(
      list.filter((val) => {
        return val._id !== id;
      })
    );
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const result = await axios.get("http://localhost:5000/get");
        console.log(result.data);
        setlist(result.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getdata();
  }, []);

  return (
    <div className="App">
      {/* form which takes name and age */}
      <form id="user-info">
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(e) => {
            setage(e.target.value);
          }}
        />
        <div>
          <button onClick={clear}>Clear</button>
          <button onClick={postdata}>Submit</button>
        </div>
      </form>
      {/* list of names */}
      <div className="list">
        {list.map((val) => (
          <div className="user" key={val._id}>
            <p>{val.name}</p>
            <p>{val.age}</p>
            <button className="edit" onClick={() => updatedata(val._id)}>
              Edit
            </button>
            <button className="edit" onClick={() => deletedata(val._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
