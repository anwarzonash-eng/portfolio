import { toggleShowMoreSkills } from '@/hooks/toggleShowMoreSkills';
import React, { useState } from 'react';

const ShowmoreSkills = ({ props }) => {
  return (
    <>
      {props?.list?.length > 15 && (
        <button
          onClick={() =>
            toggleShowMoreSkills(props?.index, props?.setShowMoreSkills)
          }
          className={
            props.className ||
            'bg-primary text-onPrimary py-[0.4rem] print_hidden px-[2rem] border border-primary border-solid hover:text-primary hover:bg-surface rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'
          }
        >
          {props?.showMoreSkills[props?.index] ? 'Show Less' : 'Show More Skills'}
        </button>
      )}
    </>
  );
};

export default ShowmoreSkills;
