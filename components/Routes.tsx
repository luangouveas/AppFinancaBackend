import ProtectedRoute from './ProtectedRoute.js'
import Login from '../../API_TS-React-Mongo/frontend/src/Pages/Login.js'
import User from '../../API_TS-React-Mongo/frontend/src/Pages/User.js'
import Home from '../../API_TS-React-Mongo/frontend/src/Pages/Home.js'

const Routes = [
  {
    name: 'Home',
    path: '/',
    exibirMenu: true,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    name: 'Usuarios',
    path: '/usuarios',
    exibirMenu: true,
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
  {
    name: 'Login',
    path: '/autenticar',
    exibirMenu: false,
    element: <Login />,
  },
]

export { Routes }
