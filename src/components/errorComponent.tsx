export const ErrorComponent = ({ children }) => {
  return (
    <div
      className='text-red-600 text-xs flex items-center'
      style={{ marginTop: '4px' }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        className='w-4 h-4 mr-1'
      >
        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
        <line
          x1='12'
          y1='8'
          x2='12'
          y2='12'
          stroke='currentColor'
          strokeWidth='2'
        />
        <circle cx='12' cy='16' r='1' fill='currentColor' />
      </svg>
      {children}
    </div>
  );
};
