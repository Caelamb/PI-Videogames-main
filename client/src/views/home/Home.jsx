import React, { useEffect } from 'react'
import Navbar from "../../components/navbar/Navbar";
import Cards from "../../components/cards/Cards";
import { getUsers } from '../../redux/actions'; 
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <Cards allUsers={allUsers}/>
   </div>
  )
}

export default Home
