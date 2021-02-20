import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import type {IClass} from './classSearchSlice';
import {
  loadIndex,
  select,
  selectClasses,
  selectSelection,
} from './classSearchSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export function ClassSearch() {
  const classes = useSelector(selectClasses);
  const selection = useSelector(selectSelection);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIndex());
  }, [dispatch]);

  return (
    <Autocomplete
      multiple
      id="combo-box-demo"
      options={classes}
      getOptionLabel={(op: IClass) => _.startCase(op.className)}
      style={{ width: 300 }}
      value={selection}
      onChange={(event: any, newValue) => {
        if (!newValue)
          newValue = [];
        dispatch(select(newValue))
      }}
      renderInput={(params: any) =>
        <TextField {...params} label="Select a class" variant="outlined" />}
    />
  );
}
