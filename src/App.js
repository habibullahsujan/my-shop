
import './App.css';
import UserContext from './Context/UserContext';
import { RouterProvider } from 'react-router-dom';
import { route } from './Routes/Routes';

function App() {
  return (
    <div className="App">
      <UserContext>
        <RouterProvider router={route}/>
      </UserContext>
    </div>
  );
}

export default App;
