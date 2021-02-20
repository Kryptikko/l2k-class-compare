import React from 'react';
import Box from '@material-ui/core/Box';
import {ClassSearch} from './classSearch/ClassSearch';

export const Header = () => {
  return(
    <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
    >
      <ClassSearch />
    </Box>
  )
}
