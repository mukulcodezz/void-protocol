import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Mint from './pages/Mint'
import Roadmap from './pages/Roadmap'
import Team from './pages/Team'
import Faq from './pages/Faq'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mint" element={<Mint />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="team" element={<Team />} />
        <Route path="faq" element={<Faq />} />
      </Route>
    </Routes>
  )
}
