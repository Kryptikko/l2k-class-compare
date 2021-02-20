import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


import { useSelector, useDispatch } from 'react-redux';
import {
  loadSkills,
  skillSelector,
  selectDifference,
  selectLoading
} from './SkillListSlice';
import type {ISkill} from './SkillListSlice';


type IProps = {
  className: string;
  dedupeAgainst?: string;
}

const BASE_URL = 'http://51.81.32.185/l2knight_info/skills_pts/';

export function SkillList({className, dedupeAgainst}: IProps) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const classData = useSelector(skillSelector(className));

  const skills = useSelector(selectDifference(className, dedupeAgainst));

  useEffect(() => {
    if (classData == null)
      dispatch(loadSkills(className))
  }, [classData, dispatch, className])

  if (isLoading)
    return <>'Loading...'</>;

  return (
    <>
      <Typography variant='h4'>{_.startCase(className)}</Typography>
      <List>
        {
          skills.map((item: ISkill, idx) => (
            <ListItem key={idx}>
              <ListItemAvatar>
                <Avatar alt={item.Name} src={`${BASE_URL}/${item.Icon}`} />
              </ListItemAvatar>
              <ListItemText
                primary={item.Name}
                secondary={item.Description}
              />
            </ListItem>
          ))
        }
      </List>
    </>
  );
}
