import { isEditable } from '@testing-library/user-event/dist/utils';
import React ,{useState,useEffect} from 'react'

const getLocalData =() =>{
    const lists = localStorage.getItem("list");
    if (lists){
            return JSON.parse(lists);    
    }else{
            return [];
    }
};

const Todo = () => {
    const [inputData,setInputData] = useState("");
    const [items,setItems] = useState(getLocalData());
    const [editItems,setEditItems] = useState("");
    const [toggle,setToggle] = useState(false);
    //add item 
     const addItem = () =>{
        if(!inputData){
            alert("plz fill items")
       } 
       else if (inputData && toggle) { 
                    setItems(
                        items.map((menu) => {
                            if (menu.id === editItem.id){
                                return {...menu,name:inputData};
                            }
                            return menu;
                        })
                    )
            setInputData("")
             setEditItems(null);
             setToggle(false);
       }       
     else{  
        const myNewInputData = {
            id:new Date().getTime().toString(),
            name:inputData,
        }
        setItems([...items,myNewInputData])
        setInputData("");
    }
    }
    const deleteItem =(index) =>{
        const updatedItem= items.filter((menu) =>
        {
                     return menu.id !== index;
        })
        setItems(updatedItem)
    }

    //removing all elements
    const removeAll =() =>{
        setItems([]);
    }
    //edit item
    const editItem =(index) =>{
        const item_toto_edites =items.find((menu) => {
            return menu.id === index ;
        });
        setInputData(item_toto_edites.name);
        setToggle(true);
        setEditItems(index)
       
    }

    useEffect(() =>{
        localStorage.setItem("list",JSON.stringify(items))
 },[items]);


  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <h1>Add your task here </h1>
          <img
            src="todo.png"
            alt="todoimage"
            height={"100px"}
            width={"200px"}
          />
          <div className="addItem">
            <input
              type="text"
              placeholder=" ✍️Write something"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggle ? (
              <i  className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}

            {/* showing the items */}
            <div className="showItems">
              {items.map((menu, index) => {
                return (
                  <div className="eachItem" key={index}>
                    <h3>{menu.name}</h3>
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"
                        onClick={() => editItem(menu.id)}
                      />
                      <i
                        className="far fa-trash-alt add-btn"
                        onClick={() => deleteItem(menu.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="showItems"></div>
          <button
            className="btn effect04"
            data-sm-link-text="Remove all"
            onClick={removeAll}
          >
            <span>Check List </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Todo;
