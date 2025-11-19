'use client';
import * as React from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { calculateAerobicRepMax, getTargetDistance } from '@/lib/utils';

export type ColumnData = {
  time: number;
  distance: number;
};

export const columns: ColumnDef<ColumnData>[] = [
  {
    accessorKey: 'time',
    header: 'Tempo (min)',
  },
  {
    accessorKey: 'distance',
    header: 'Distância (m)',
  },
];
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                Nenhum resultado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default function RepsTable({ userRm }: { userRm: { distance: number; time: number } }) {
  const max = calculateAerobicRepMax({ distance: userRm.distance, time: userRm.time });

  const generateTableData = () => {
    return Array.from({ length: 10 }, (_, index) => ({
      time: index + 1,
      distance: getTargetDistance({ repMax: max, targetDistance: Math.trunc(Math.round((index + 1) * 60)) }),
    }));
  };

  return (
    <div className="w-full p-6">
      <DataTable
        columns={columns}
        data={generateTableData()}
      />
    </div>
  );
}
