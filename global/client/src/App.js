import {Layout} from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'
import {MainPage} from './pages/MainPage'
import { LoginPage } from './pages/LoginPage';
import { PostPage } from './pages/PostPage';
import { PostsPage } from './pages/PostsPage';
import { RegisterPage } from './pages/RegisterPage.jsx';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getMe } from './redux/features/auth/authSlice.js'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AddPostPage } from './pages/AddPostPage';
import { EditPostPage } from './pages/EditPostPage.jsx';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {dispatch(getMe())}, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path = '/' element = {<MainPage></MainPage>}>
        </Route>
        <Route path = '/login' element = {<LoginPage></LoginPage>}>
        </Route>
        <Route path = '/register' element = {<RegisterPage></RegisterPage>}>
        </Route>
        <Route path = '/:id' element = {<PostPage></PostPage>}>
        </Route>
        <Route path = '/:id/edit' element = {<EditPostPage></EditPostPage>}>
        </Route>
        <Route path = '/posts' element = {<PostsPage></PostsPage>}>
        </Route>
        <Route path = '/new' element = {<AddPostPage></AddPostPage>}>
        </Route>
      </Routes> 

      <ToastContainer></ToastContainer>
    </Layout>
    
    );
}

export default App;
