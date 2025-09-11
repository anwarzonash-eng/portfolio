// import React from 'react';
// import WebsiteLoader from './WebsiteLoader';

// const PageRendering = ({ props }) => {
//   return (
//     <div>
//       {' '}
//       {props.list == undefined || props.list?.length == 0 ? (
//         <>
//           {props.loading ? (
//             <WebsiteLoader height={props?.loaderHeight} />
//           ) : (
//             <div className='my-10 text-center font-bold text-[2rem] text-primary'>
//               {props.error || 'No data found.'}
//             </div>
//           )}
//         </>
//       ) : (
//         <>{props.actualPage}</>
//       )}
//     </div>
//   );
// };

// export default PageRendering;
import React from "react";
import WebsiteLoader from "./WebsiteLoader";
import EmptyState from "./EmptyState"; // 👈 new component

const PageRendering = ({ props }) => {
  const { list, loading, error, actualPage, loaderHeight } = props;

  if (loading) {
    return <WebsiteLoader height={loaderHeight} />;
  }

  if (!list || list.length === 0) {
    return <EmptyState message={error || "No data found."} />;
  }

  return <>{actualPage}</>;
};

export default PageRendering;
