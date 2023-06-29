
import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';


function App() {
  const [inputdata, setinputdata] = useState("")
  const [items, setitems] = useState([]);
  const [isUpdating, setisUpdating] = useState("");
  const [Updatedtext, setUpdatedtext] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!inputdata) {
        alert("fill input field")
      }
      const res = await axios.post("http://localhost:5000/api/todo/create", { text: inputdata })
      console.log(res);
      setitems(prev => [...prev, res?.data?.newText])
      setinputdata("");
    } catch (error) {
      console.log(error);
    }
  }

  const getAllList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todo/GetAllList")
      // console.log(res);
      if (res?.status === 200) {
        setitems(res?.data.Lists);
      }
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllList();
  }, [items]);

  // const UpdateList = async (id) => {
  //   try {
  //     const res = await axios.put(`http://localhost:3000/api/todo/UpdateList/${id}`)
  //     setinputdata(res?.data?.UpdateList?.text)
  //     console.log(res);
  //     // setinputdata(res)


  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const DeleteList = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/todo/DeleteList/${id}`)

      const newList = items.filter(item => item.id !== id)
      console.log("render")
      setitems(newList);

    } catch (error) {
      console.log(error);
    }
  }

  const UpdateList = async (e) => {
    e.preventDefault();
    try {
      const res = axios.put(`http://localhost:3000/api/todo/UpdateList/${isUpdating}`, { text: Updatedtext })

      console.log(res.data)
      const updateditemindex = items.findIndex(item => item._id === isUpdating)
      const updateItem = items[updateditemindex].text = Updatedtext
      setUpdatedtext('')
      setisUpdating('')
    } catch (error) {
      console.log(error)
    }
  }


  const renderUpdateForm = () => (
    <form className='update-form' onSubmit={(e) => { UpdateList(e) }}>
      <input className='update-input' type='text' placeholder='Update data' onChange={e => setUpdatedtext(e.target.value)} value={Updatedtext} />
      <button className='update-btn' type='submit'>Update</button>
    </form>
  )

  return (

    <>
      <div className="App">

        <form >
          <h1>Todo List</h1>
          <input type='text' placeholder='Enter todo items...'
            value={inputdata}
            onChange={(e) => setinputdata(e.target.value)}
          />
          <button type='submit' onClick={handleSubmit} >Add</button>
        </form>
        <div className='todo-lists'>
          {
            items?.map((curele) => {
              return (
                <div className='item' key={curele.id}>
                  {
                    isUpdating === curele._id
                      ? renderUpdateForm()
                      : <>
                        <p>{curele.text}</p>
                        <button className='update' onClick={() => { setisUpdating(curele._id) }}>update</button>
                        <button className='delete' onClick={() => { DeleteList(curele._id) }}>delete</button>
                      </>
                  }

                </div>
              )
            })
          }
        </div>
      </div >
    </>
  );
}

export default App;
