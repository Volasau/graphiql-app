import { Route, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './pages/Welcome/Welcome';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Error from './pages/Error/Error';
import Graphi from './pages/GraphiQl/Graphi';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/graphiql" element={<Graphi />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
