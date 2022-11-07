/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

import SkillTree from './common/SkillTree';

export default function Logros() {
  return (
    <section>
      <Helmet>
        <title>Logros | Members OSUC</title>
      </Helmet>
      <h1 className="text-center text-4xl pt-4">Logros</h1>
      <SkillTree />
    </section>
  );
}
