import React from 'react'
import PageLayout from '../PageLayout'
import { Box, Stack, useMediaQuery } from '@mui/material'
import Heading from '../styled/Heading'
import AddProduct from '../components/AddProduct'
import ProductsList from '../components/ProductsList'

const Products = () => {
    const isMobile = useMediaQuery('(max-width: 900px)')

  return (
    <PageLayout>
        <Box
            sx={{
                width: '95vw',
                margin: '1rem auto'
            }}
        >
            <Stack
                alignItems={'center'}
                justifyContent={'center'}
                gap={2}
            >
                <Heading sx={{fontSize: '1.5rem'}}>Your Products on Amazon</Heading>
                <Stack
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                    flexWrap={'wrap'}
                >
                    <AddProduct />
                    <ProductsList />
                </Stack>
            </Stack>
        </Box>
    </PageLayout>
  )
}

export default Products