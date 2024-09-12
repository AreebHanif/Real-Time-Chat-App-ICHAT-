import './App.css';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SocketContextProvider } from './components/Context/SocketContext';
import { AuthContextProvider, useAuthContext } from './components/Context/authcontext';

// Use AuthContextProvider to wrap the entire application
function App() {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignupWithAuth />} />
            <Route path='/login' element={<LoginWithAuth />} />
            <Route path='/chat'
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
            <Route path='/logout' element={<LogoutWithAuth />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </SocketContextProvider>
    </AuthContextProvider>
  );
}

// Separate component to use the context
const SignupWithAuth = () => {
  const { authUser } = useAuthContext();
  return authUser ? <Navigate to="/login" /> : <Signup />;
};

const LoginWithAuth = () => {
  const { authUser } = useAuthContext();
  return authUser ? <Navigate to="/chat" /> : <Login />;
};

const LogoutWithAuth = () => {
  const { authUser } = useAuthContext();
  return !authUser ? <Navigate to="/login" /> : <Chat />;
};

export default App;
