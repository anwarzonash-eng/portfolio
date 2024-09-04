import { skillsPayload, skillsSync } from '@/apiHandlers/skillsApi';
import { defaultUser } from '@/data/defaultUser';
import React, { useEffect, useState } from 'react';

const Skills = (actionType = 'list') => {
  const [listOfskills, setListOfSkills] = useState([]);

  const handleSkillsApiCall = async () => {
    skillsPayload.actionType = actionType;

    const results = await skillsSync();

    const statusStr = String(results?.status);

    if (/^4\d{2}$/.test(statusStr)) {
      console.log('error', results);
    } else if (/^2\d{2}$/.test(statusStr)) {
      setListOfSkills(results?.data?.data || []);
    }
  };

  useEffect(() => {
    handleSkillsApiCall();
  }, []);

  return { listOfskills };
};

export default Skills;
