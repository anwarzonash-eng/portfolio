
type CV3SummaryProps = {
  summary: string;
};

const CV3Summary = ({ summary }: CV3SummaryProps) => {
  return (

    <div className="mb-6">
      <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black ">SUMMARY</h2>
      <p className="text-[13px] text-gray-700 space-y-1   leading-normal ">
        {summary}
      </p>
    </div>
  );
};

export default CV3Summary;
