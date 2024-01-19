import { dateFilterFn, numberFilterFn, stringFilterFn } from 'mantine-data-grid';

import { ShopInvoice } from '../../api/types';

import type { ColumnDef } from '@tanstack/react-table';

export const shopInvoiceColumnsDef: ColumnDef<ShopInvoice, unknown>[] = [
    {
        header: 'Invoice ID',
        accessorKey: 'id',
        filterFn: stringFilterFn,
    },
    {
        header: 'Inovice type',
        accessorKey: 'type',
        filterFn: stringFilterFn,
    },
    {
        header: 'Timestmap',
        accessorKey: 'timestamp',
        filterFn: dateFilterFn,
    },
    {
        header: 'VAT',
        accessorKey: 'vat',
        filterFn: numberFilterFn,
    },
    {
        header: 'Subtotal',
        accessorKey: 'subtotal',
        filterFn: numberFilterFn,
    },
    {
        header: 'Total',
        accessorKey: 'total',
        filterFn: numberFilterFn,
    },
];
