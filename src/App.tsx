import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CouponCalculator from './pages/CouponCalculator'
import CouponComparison from './pages/CouponComparison'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CouponCalculator />} />
        <Route path="/compare" element={<CouponComparison />} />
      </Routes>
    </Layout>
  )
}

export default App