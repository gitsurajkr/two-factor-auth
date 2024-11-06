import { BrowserRouter, Routes , Route,  } from 'react-router-dom'
import './App.css'
import Signup from './Page/Signup'
import Signin from './Page/Signin'
import TwoFactorAuth from './Page/Two.Factor.Auth'
import { Toaster } from "react-hot-toast";
function App() {
  

  return (

    <BrowserRouter>
        <Toaster />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   {/* <Signup /> */}
    //   {/* <Signin /> */}
    //   <TwoFactorAuth />
    // </>
  )
}

export default App
