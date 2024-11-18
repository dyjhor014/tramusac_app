import './Dashboard.css'
import Navbar from '../../ui/navbar/Navbar'
import { Helmet } from 'react-helmet'

export default function Dashboard() {
  return (
    <>
    <Helmet>
        <title>Sistema de emisión de certificados</title>
      </Helmet>
    <Navbar />
    </>
  )
}