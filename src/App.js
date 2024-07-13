import "./App.css";
import React, { useState, useEffect } from "react";
import { BiTrash, BiCheck, BiFontFamily } from "react-icons/bi";

function App() {
  // Toggle button useState
  const [IsCompleteScreen, setIsCompleteScreen] = useState(false);

  // Add function of Todo list in useState
  const [allTodo, setTodo] = useState([]);
  const [Title, setTitle] = useState("");
  const [newDesc, setnewDesc] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: Title,
      description: newDesc,
    };

    let updateTodo = [...allTodo];
    updateTodo.push(newTodoItem);
    setTodo(updateTodo);
    localStorage.setItem("todolist", JSON.stringify(updateTodo));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedComplete = JSON.parse(localStorage.getItem("completeTodo"));
    if (savedTodo) {
      setTodo(savedTodo);
    }
    
    if (savedComplete){
      setcompleteTodo(savedComplete)
    }
  }, []);

  // Active the Delete function
  const handleDeleteTodo = (index) => {
    let reduceTodo = [...allTodo];
    reduceTodo.splice(index);
    setTodo(reduceTodo);
    localStorage.setItem("todolist", JSON.stringify(reduceTodo));
  };

  // Activate the check function
  const [completeTodo, setcompleteTodo] = useState ([])
  const handleComplete = (index) => {
    let now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth() + 1
    let yy = now.getFullYear()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()

    let completedOn = dd + '-' + mm + '-' + yy + ' at ' + h + ':' + m + ':' + s;

    let filterItem = {...allTodo[index],
    completedOn : completedOn}

    let updateCompleteArr = [...completeTodo]
    updateCompleteArr.push (filterItem)
    setcompleteTodo (updateCompleteArr)
    handleDeleteTodo(index)
    localStorage.setItem('completeTodo', JSON.stringify(updateCompleteArr))
  }

  //Delete button on complete tab
  const handleDeleteCompleteTodo = (index) => {
    let reduceTodo = [...completeTodo];
    reduceTodo.splice(index);
    setcompleteTodo(reduceTodo);
    localStorage.setItem("completeTodo", JSON.stringify(reduceTodo));    
  }

  return (
    <div className="App">
      <h1>My Todo List</h1>

      <div className="todo-wrapper">
        {/* Input Area Starts */}
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the Task"
            />
          </div>
          <div className="todo-input-item">
            <label>Desciption</label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setnewDesc(e.target.value)}
              placeholder="Enter the Description"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        {/* Input Area Ends */}

        {/* Button Area Starts */}
        <div className="btn-area">
          <button
            className={`secondaryBtn ${IsCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${IsCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        {/* Button Area Ends */}

        {/* Todo List Area */}
        <div className="todo-list">
          { IsCompleteScreen === false && allTodo.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div>
                  <BiTrash
                    className="icon"
                    onClick={() => handleDeleteTodo(index)}
                    title="Delete?"
                  />
                  <BiCheck className="check-icon" title="Complete?" onClick={() => handleComplete(index)}/>
                </div>
              </div>
            );
          })}
          { IsCompleteScreen === true && completeTodo.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p> {item.description}</p>
                  <p> <small> Completed on: {item.completedOn}</small></p>
                </div>

                <div>
                  <BiTrash
                    className="icon"
                    onClick={() => handleDeleteCompleteTodo(index)}
                    title="Delete?"
                  />
                  </div>
              </div>
            );
          })}
        </div>
        {/* Todo List Area */}

      </div>
    </div>
  );
}

export default App;
