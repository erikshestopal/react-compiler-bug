import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

function Table({ columns, data }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("this renders correctly ==> ", data);

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? undefined
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          console.log({ row });
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const columnHelper = createColumnHelper<{ name: string; id: number }>();

function App() {
  const form = useForm({ defaultValues: { users: [] } });
  const { append } = useFieldArray({ control: form.control, name: "users" });
  const users = useWatch({ control: form.control, name: "users" });
  const [name, setName] = useState("");

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
  ];

  return (
    <main>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          setName("");
          return append({ name, id: Math.random() * 1000 });
        }}
      >
        Add
      </button>
      <Table columns={columns} data={users} />
    </main>
  );
}

export default App;
