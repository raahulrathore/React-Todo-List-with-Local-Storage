import React, { useState, useEffect } from "react";
import "./todostyle.css";
import swal from "sweetalert";
//get local stroge data from refresh

const getLocalData = () => {
  const lists = localStorage.getItem("MyTodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const Todolist = () => {
  //taking inputs
  const [inputData, setInputData] = useState("");
  //setting inputs to list all input values in a list
  //getting data from local storage
  const [items, setItems] = useState(getLocalData());
  //for edited items

  const [isEditItem, setIsEditItem] = useState("");
  //for edit icon toggle
  const [toggleBtn, setToggleBtn] = useState(false);

  //function to add values to list
  const addItem = () => {
    if (!inputData) {
      swal("Oops!", "Please add Something to the List!", "error");
    } else if (inputData && toggleBtn) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleBtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, myNewInputData]);
      //reseting the input box
      setInputData("");
    }
  };

  //editing already exisiting values
  const editItem = (index) => {
    const item_todo_edited = items.find((currEle) => {
      return currEle.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleBtn(true);
  };

  //deleting items from the todo

  const deleteItem = (index) => {
    const UpdatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(UpdatedItem);
  };

  //Remove all the elements
  const RemoveAll = () => {
    setItems([]);
  };

  //Adding Local Storage
  useEffect(() => {
    localStorage.setItem("MyTodoList", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src="https://img.icons8.com/nolan/96/todo-list.png"
              alt="TodoList"
            />
            <figcaption>
              Add it! Do it! <span>&#9996;</span>{" "}
            </figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {/*           to toggle the button for edit*/}

            {toggleBtn ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus-circle add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show items */}

          <div className="showItems">
            {items.map((curEle) => {
              return (
                <div className="eachItem" key={curEle.id}>
                  <h4>{curEle.name}</h4>
                  <div className="todo-btn">
                    <i
                      class="far fa-edit add-btn"
                      onClick={() => editItem(curEle.id)}
                    />
                    <i
                      class="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curEle.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={RemoveAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
