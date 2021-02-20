import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadSkills,
  skillSelector
} from './SkillListSlice';

export function SkillList() {
  const skills = useSelector(skillSelector);
  const dispatch = useDispatch();

  return (
    <>
      <ul>
      {
        skills.map(item => (
          <li>{item}</li>
        ))
      }
      </ul>
      <button onClick={() => {
        dispatch(loadSkills())
      }}>Load paladin</button>
    </>
  );
}
