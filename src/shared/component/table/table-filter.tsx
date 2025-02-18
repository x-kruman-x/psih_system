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

function FilterItem() {
  return (
    <div className="w-1/6 flex border-r border-b border-black border-solid p-[15px] text-center last:border-r-0 transition-all duration-300">
      <textarea
        className="w-full resize-none text-[13px] leading-[17px] text-black border-none overflow-visible focus:outline-none max-h-[50vh] h-auto"
        onInput={(event) => {
          const textarea = event.target as HTMLTextAreaElement;
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }}
      />
    </div>
  );
}
