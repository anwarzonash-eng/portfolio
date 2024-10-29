import Image from 'next/image';
import React from 'react';

const SkillsContainer = ({ list }) => {
  return (
    <div className='grid grid-cols-4 lg:grid-cols-6 gap-[1.5rem] mt-[6rem]'>
      {list?.map((skill, index) => (
        <div
          key={index}
          style={{
            animationDelay: `${index * 0.2}s`,
          }}
          className='mx-auto mb-[4rem] flex flex-col items-center justify-start gap-[0.8rem] max-w-[13rem] lg:max-w-[17rem] w-full animate-fadeIn opacity-0'
        >
          {skill.icon && (
            <div className='flex items-center justify-center max-h-[6.4rem] max-w-[6.4rem]'>
              <Image
                src={skill?.icon}
                alt={skill?.title}
                height={64}
                width={64}
                className='object-contain rounded-full max-h-[6.4rem] max-w-[6.4rem]'
              />
            </div>
          )}
          <p className='text-paragraph1 text-center text-[1.8rem] leading-[2.8rem] overflow-hidden text-ellipsis'>
            {skill.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SkillsContainer;
