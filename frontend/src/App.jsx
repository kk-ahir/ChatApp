// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Left from './home/left/Left'
// import Right from './home/right/Right'
// import Signup from './components/Signup'
// import Login from './components/Login'
// import { useAuth } from './contex/AuthProvider'
// import { Routes, Route, Navigate } from "react-router-dom";

// function App() {
//   const { authUser, setAuthUser } = useAuth();
//   console.log(authUser)

//   return (
//     <>

//       <Routes>
//         <Route path="/" element={authUser ? (<div className="flex h-screen">
//           <Left />
//           <Right />
//         </div>) : <Navigate to={"/login"}></Navigate>} />
//         <Route
//           path="/login"
//           element={authUser ? <Navigate to={'/'} /> : <Login />}
//         />

//         <Route
//           path="/signup"
//           element={authUser ? <Navigate to={'/'} /> : <Signup />}
//         />
//       </Routes>
//     </>
//     )
// }

// export default App

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contex/AuthProvider";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"; // 👈 new component

function App() {
  const { authUser } = useAuth();
  console.log(authUser);

  return (
    <>
      <Routes>
        {/* Home page (open to all) */}
        <Route path="/" element={<Home />} />

        {/* Chat page (protected) */}
        <Route
          path="/chat"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/chat"} /> : <Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/chat"} /> : <Signup />}
        />
      </Routes>
    </>
  );
}

export default App;

