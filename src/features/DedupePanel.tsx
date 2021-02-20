import _ from 'lodash';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import { SkillList } from './skillList/SkillList';
import {selectSelection} from './classSearch/classSearchSlice';

export const DedupePanel = () => {
  const selection = useSelector(selectSelection);
  return(
    <Box
      style={{height: '100%'}}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="stretch"
    >
    {
      selection.map((item, idx, arr) => {
        const dedupeTarget =_
          .chain(arr)
          .filter(o => o.className !== item.className)
          .map('className')
          .value()
          .pop()

        return (
          <Box key={item.classID} flexGrow={1} p={1}>
          <SkillList
            className={item.className}
            dedupeAgainst={dedupeTarget}
          />
          </Box>
        )
      })
    }
    </Box>
  )
}
