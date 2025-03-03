// import { configTableType } from "@/shared/types/table/columnTableTypes";
// import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
// import { useState } from "react";

// // TODO: доделать
// export const Table = <T extends Record<string, any>>({
//   data,
//   configTable,
// }: {
//   data: T[];
//   configTable: configTableType;
// }) => {
//   const columns = useCardColumns(configTable);

//   const [rowSelection, setRowSelection] = useState({});
//   const selectedIds = rowSelection ? Object.keys(rowSelection) : [];

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       rowSelection,
//     },
//     getRowId: (originalRow) => originalRow.id.toString(),
//     onRowSelectionChange: setRowSelection,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//       <div className="relative">
//         <table className="w-full">
//           <thead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <th
//                       key={header.id}
//                       colSpan={header.colSpan}
//                       className="w-1/6 py-[5px] border-r border-solid border-black last:border-none"
//                     >
//                       {header.isPlaceholder ? null : (
//                         <>
//                           {flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                         </>
//                       )}
//                     </th>
//                   );
//                 })}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="group">
//                 {row.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="w-1/6 text-center border-r border-solid border-black last:border-none"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         </div>
//   );
// };


