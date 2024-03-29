import { LoadingOverlay, Paper } from '@mantine/core';
import { AreaChart } from '@tremor/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetMallShopInvoicesWithFilterQuery, useGetMallShopQuery } from '../../api';
import GetMallShopInvoicesResponseData from '../../mocks/GetMallShopInvoicesResponse.json';
import GetMallShopResponseData from '../../mocks/GetMallShopResponse.json';
import { useAppSelector } from '../../store/hooks';
import { extractShopInvoices, lastMonth, moneyFormat, sumShopInvoicesByDate, today } from '../../utils';

import { DateRangePickerControl } from './../../components/GraphControls/DateRangePickerControl';
import ShopDetailsSummary from './components/ShopDetailsSummary';
import ShopInvoicesSummary from './components/ShopInvoicesSummary';
import ShopInvoicesTable from './components/ShopInvoicesTable';

import type { DateRangePickerValue } from '@mantine/dates';

export const ShopDetailsPage = () => {
    const { id } = useParams();
    const [dateRange, setDateRange] = useState<DateRangePickerValue>([lastMonth, today]);
    const currentScopeId = useAppSelector((state) => state.currentScope.id);
    const { isFetching: isShopLoading } = useGetMallShopQuery(
        { mallId: currentScopeId, shopId: id as string },
        { skip: id === undefined },
    );
    const { isFetching: isInvoicesLoading } = useGetMallShopInvoicesWithFilterQuery(
        {
            mallId: currentScopeId,
            shopId: id as string,
            from: dayjs(dateRange[0] ?? lastMonth).format('YYYY-MM-DD'),
            to: dayjs(dateRange[1] ?? today).format('YYYY-MM-DD'),
        },
        { skip: id === undefined },
    );

    const chartData = sumShopInvoicesByDate(
        extractShopInvoices(GetMallShopInvoicesResponseData[Math.floor(Math.random() * (10 - 0) + 0)].invoices ?? []),
    );
    const mockInvoices = GetMallShopInvoicesResponseData[Math.floor(Math.random() * (10 - 0) + 0)];
    const mockShopData = GetMallShopResponseData[Math.floor(Math.random() * (10 - 0) + 0)];

    return (
        <>
            <Paper shadow="xs" p="md" mb="md">
                <ShopDetailsSummary loading={isShopLoading} shopData={mockShopData} />
            </Paper>
            <Paper radius="md" p="sm" mb="md" withBorder>
                <DateRangePickerControl loading={isInvoicesLoading} onDateRangeChange={setDateRange} />
                <ShopInvoicesSummary {...mockInvoices.summary} loading={isInvoicesLoading} />
            </Paper>
            <Paper mb="md" style={{ position: 'relative' }}>
                <LoadingOverlay visible={isInvoicesLoading} overlayBlur={2} />
                <AreaChart
                    yAxisWidth="w-20"
                    data={chartData}
                    categories={['sales', 'refund']}
                    dataKey="timestamp"
                    colors={['green', 'red']}
                    valueFormatter={moneyFormat}
                />
            </Paper>
            <Paper shadow="xs" p="md" mb="md">
                <ShopInvoicesTable loading={isInvoicesLoading} data={mockInvoices.invoices} />
            </Paper>
        </>
    );
};
