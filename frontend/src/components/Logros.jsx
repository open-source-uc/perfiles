/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';

import Badge from './common/Badge';
import SkillTree from './common/SkillTree';
import UserContext from '../contexts/userContext';

export default function Logros() {
  return (
    <section>
      <h1 className="text-center text-4xl pt-4">Logros</h1>
      <SkillTree />
    </section>
  );
}
