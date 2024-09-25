import React from 'react';
import WebsiteLoader from './WebsiteLoader';

const PageRendering = ({ props }) => {
  return (
    <div>
      {' '}
      {props.list == undefined || props.list?.length == 0 ? (
        <>
          {props.loading ? (
            <WebsiteLoader height={props?.loaderHeight} />
          ) : (
            <div className='my-10 text-center font-bold text-[2rem] text-primary'>
              {props.error || 'No data found.'}
            </div>
          )}
        </>
      ) : (
        <>{props.actualPage}</>
      )}
    </div>
  );
};

export default PageRendering;
