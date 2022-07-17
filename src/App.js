import React, { useEffect, useState } from 'react';
// Components
import User from './User';
// Styles
import { Content, Loading } from './App.styles';
// API
import { getUsers } from './API';

function App() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleScroll = (event) => {
    const {scrollTop,clientHeight,scrollHeight} = event.currentTarget;
    
    if(clientHeight+scrollTop===scrollHeight) {
      setPage(pre=>pre+1)
    }

  }


  useEffect(()=>{
    const loadUsers=async()=>{
      setLoading(true)
      const newUsers=await getUsers(page);
      setUsers((pre)=>[...pre,...newUsers])
      setLoading(false)
    }
    loadUsers();

  },[page])




  return (
    <div className='App'>
      <Content onScroll={handleScroll}>
        {users && users.map(user => <User key={user.cell} user={user} />)}
      </Content>
      {loading && <Loading>Loading ...</Loading>}
    </div>
  );
}

export default App;
