import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./common/routes"
import { Login, Dashboard, GroupDetails } from "./features"

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/group/:groupId" element={<GroupDetails />}  />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App