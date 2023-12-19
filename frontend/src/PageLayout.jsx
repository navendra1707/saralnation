import React from 'react'
import Navbar from './components/Navbar'
import {Box} from '@mui/material'
import Footer from './components/Footer'

const PageLayout = ({children}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh'
      }}
    >
        <Navbar />
        {children}
        <Footer />
    </Box>
  )
}

export default PageLayout