import { Stack } from '@mui/material'
import React from 'react'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import SubHeading from '../styled/SubHeading';

const ListItem = ({item}) => {
  return (
    <Stack
        direction={'row'}
        gap={1}
    >
        <DoneAllRoundedIcon />
        <SubHeading>{item}</SubHeading>
    </Stack>
  )
}

export default ListItem