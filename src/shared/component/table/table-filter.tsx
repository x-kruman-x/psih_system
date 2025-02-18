export function TableFilter() {
  return (
    <div className="w-full flex">
      <FilterItem />
      <FilterItem />
      <FilterItem />
      <FilterItem />
      <FilterItem />
      <FilterItem />
    </div>
  );
}

function FilterItem({ className }: FilterItemProps) {
  return (
    <div className={`w-1/6 border-r border-b border-black border-solid p-[15px] text-center last:border-r-0 ${className}`}>
      <textarea className="h-full w-full resize-none text-[13px] leading-[17px] text-black border-none focus:outline-none" />
    </div>
  );
}

type FilterItemProps = {
  className?: string;
};
