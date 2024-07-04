import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Page from '../Page/Page'
import Login from '../Login/Login';
import { Context } from '../Context/Context';
import HomePage from '../Homepage/Homepage';
function AllRoutes() {
  const { token, pages, isLoading } = useContext(Context);

  return (
    <Routes>
      {/* <Route path='/' element={!token ? <Navigate to={"/login"} /> : <></>} /> */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={token ? <Navigate to={"/page/" + pages[0]?._id} /> : <Login></Login>} />
      {/* {!isLoading && <> */}
      <Route path='/page/:pageID' element={
        <Page />
      } />
      {/* </>} */}
    </Routes>
  )
}

export default AllRoutes