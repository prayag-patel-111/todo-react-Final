import React, { useEffect, useState } from "react";
import clsx from "clsx";
import DeleteIcon from '@mui/icons-material/Delete';
// import todo from "../img/todo.png";

import "../App.css";
import { Button } from "@mui/material";

const Todo = () => {
  const [inputData, setInputData] = useState();
  const [items, setItems] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [displayList, setDisplayList] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    let list = localStorage.getItem("lists");
    if (list) {
      setItems(JSON.parse(localStorage.getItem("lists")));
      setDisplayList(JSON.parse(localStorage.getItem("lists")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
    setDisplayList(items);
    onFilter(tab);
  }, [items]);

  const addItem = () => {
    if (inputData && !isUpdate) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setInputData("");
      setIsUpdate(true);
    } else if (inputData !== "") {
      const allInputData = {
        id: Math.random().toString().substr(8, 4),
        name: inputData,
        status: false,
      };
      setItems([...items, allInputData]);
      setInputData("");
      console.log("allInputData", allInputData);
    } else {
      alert("enter value");
    }
  };

  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
  };

  const editItem = (id) => {
    console.log("id", id);
    const newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log("newEditItem", newEditItem);
    setInputData(newEditItem.name);
    setIsUpdate(false);
    setIsEditItem(id);
  };

  const checkHandler = (id) => {
    let checkitem = items.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });

    setItems(checkitem);
    console.log("check after list", checkitem);
    localStorage.setItem("lists", JSON.stringify(checkitem));
  };

  const removeAll = () => {
    setItems([]);
  };

  const onFilter = (key) => {
    setTab(key);
    const dummyItem = items;

    const filterItem = dummyItem.filter((item) => {
      switch (key) {
        case "complete":
          return item.status;
        case "remain":
          return !item.status;
        default:
          return true;
      }
    });
    setDisplayList(filterItem);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            {/* <img src={todo} alt="todologo" /> */}
            <figcaption>Todo List </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              className="input"
              placeholder="Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />

            {isUpdate ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItems">
            {displayList.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <input
                    type="checkbox"
                    className="check-btn"
                    checked={elem.status ? true : false}
                    onChange={() => checkHandler(elem.id)}
                  ></input>
                  <h3
                    style={
                      elem.status
                        ? { textDecoration: "line-through" }
                        : { textDecoration: "none" }
                    }
                  >
                    {" "}
                    {elem.name}{" "}
                  </h3>

                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(elem.id)}
                    ></i>

                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => deleteItem(elem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems" style={{ display: "flex" }}>
            {/* <button
              className="btn"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Remove All</span>
            </button> */}
            <Button 
              variant="contained" color="error" sx={{fontSize:12}}
              className="btn"  
              data-sm-link-text="Remove All"
              onClick={removeAll} endIcon={<DeleteIcon />}> Remove All 
            </Button>
            <Button 
              variant="contained" color="success" sx={{fontSize:12}}
              className={clsx("btn", { selected: tab === "complete" })}
              data-sm-link-text="Complete"
              onClick={() => onFilter("complete")} >Complete
            </Button>  
            <Button variant="outlined" color="secondary"  sx={{fontSize:12}}
              className={clsx("btn", { selected: tab === "remain" })}
              data-sm-link-text="Remain"
              onClick={() => onFilter("remain")} > Remain
            </Button>
            <button
              className={clsx("btn", { selected: tab === "all" })}
              data-sm-link-text="All"
              onClick={() => onFilter("all")}
            >
              <span>All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
