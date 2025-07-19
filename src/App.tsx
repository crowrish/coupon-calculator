import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CouponCalculator from './pages/CouponCalculator'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CouponCalculator />} />
      </Routes>
    </Layout>
  )
}

export default App