import './App.css';
import IndexPage from './Components/IndexPage';
import Layout from './Components/Layout';
import LoginPage from './Components/LoginPage';
import { Route, Routes } from "react-router-dom";
import Register from './Components/Register';
import { UserContextProvider } from './userContext';
import CreatePost from './Components/CreatePost';
import Post from './Components/Post';
import EditPost from './Components/EditPost';

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />}></Route>
            <Route path='/Login' element={<LoginPage />}></Route>
            <Route path='/Register' element={<Register />}></Route>
            <Route path='/Create' element={<CreatePost />}></Route>
            <Route path='/post/:id' element={<Post />}></Route>
            <Route path='/edit/:id' element={<EditPost />}></Route>
          </Route>
        </Routes>
      </UserContextProvider>


    </>


  );
}

export default App;
