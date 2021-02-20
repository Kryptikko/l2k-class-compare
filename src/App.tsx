import React from 'react';
import { Counter } from './features/counter/Counter';
import { SkillList } from './features/skillList/SkillList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <SkillList />
      </header>
    </div>
  );
}

export default App;
