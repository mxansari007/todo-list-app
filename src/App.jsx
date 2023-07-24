import './assets/style.css';
import { Paper } from '@mui/material';
import {Input,Button} from '@nextui-org/react';
import { addToList,markIt,removeItem,setToList } from './store/listSlice';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';


function App() {


 
  
  const [listData, setListData] = useState();
  const dispatch = useDispatch();
  const list = useSelector(state => state.list.values);
  
  useEffect(()=>{
    const localList = JSON.parse(localStorage.getItem('list'));
    console.log(localList);
    if(localList){
      dispatch(setToList(localList));
    }
  },[])
  
  
  
  const mouseEnter = (d)=>{

    let item = document.getElementById(d);
    item.classList.add('fa-fade');
  }



  const mouseLeave = (d) =>{
    let item = document.getElementById(d);
    item.classList.remove('fa-fade');
  }

  const handleSubmit = ()=>{
        let temp = {task:listData,marked:false}
        dispatch(addToList(temp));
        setListData("");
        console.log(list);
        document.getElementById("input-box").value = "";
        
  }

  const handleMark = (d) =>{
      console.log(d.id);
      dispatch(markIt(d.id));
      console.log(list);
  }

  const handleRemove = (d) =>{
      dispatch(removeItem(d.id));
  }

  return (
    <>
    <div  className="container">
    <div>
      <h1 className='Logo'>To-do List App</h1>
      </div>
      <div style={{display:'flex', flexDirection:'row',padding:'25px'}}>
      <Input style={{color:'#36454f'}} id="input-box" onChange={(e)=>{setListData(e.target.value)}} color="secondary" bordered/>
      <Button onClick={handleSubmit} style={{marginLeft:'10px'}} onMouseEnter={()=>{mouseEnter("plus-icon")}} onMouseLeave={()=>{mouseLeave("plus-icon")}} color="gradient" auto>Add<i style={{fontSize:'1rem',marginLeft:'5px'}} id="plus-icon" className='fa-solid fa-plus'></i></Button>
      </div>
      
      {list.length!=0?<Paper>
      <div className='list-container'>
      <div className='list-items'>
        {list.map(d=><li key={d.id} style={{textDecoration:d.marked?'line-through':'none',display:'flex',justifyContent:'space-between'}} className='list-item'>{d.task}<div><i style={{marginRight:'7px',color:'white'}} onClick={()=>{handleMark(d);}} className='fa-solid fa-check'></i><i style={{color:'white'}} onClick={()=>{handleRemove(d)}} className='fa-solid fa-xmark'></i></div></li>)}
      </div>
      </div>
      </Paper>:null}

    </div>
    <div className='footer'>
      <p style={{marginLeft:'25px'}}>All rights reserved 2023</p>
      <p style={{marginRight:'25px'}}>made with ❤️ by Maaz Ansari</p>
      </div>
    </>
  )
}

export default App
