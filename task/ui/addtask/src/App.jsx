import React from 'react'
import {
      createBrowserRouter,
      createRoutesFromElements,
      RouterProvider,
      Route,
    } from 'react-router-dom'
    
    
    const App = () => {
      const router = createBrowserRouter(
        createRoutesFromElements(
          <>
          <Route path="/" element={<Home />} />
          </>
        )
      );
    return (
      <>
        <RouterProvider router={router} />
      </>
      )
    }


export default App