import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import Badge from 'components/base/Badge';
import { SellerReport, sellersReportData } from 'data/crm/reportsData';

const columns: ColumnDef<SellerReport>[] = [
  {
    header: 'Report stage',
    accessorKey: 'reportStage',
    meta: {
      cellProps: {
        className: 'fw-semi-bold text-1000 py-2'
      },
      headerProps: {
        style: { width: '35%' },
        className: 'fs-10 text-700 fw-bold text-nowrap'
      }
    }
  },
  {
    accessorKey: 'totalCount',
    header: 'Total count',
    meta: {
      cellProps: {
        className: 'text-end fw-semi-bold text-1000 ps-4 py-2'
      },
      headerProps: {
        style: { width: '35%' },
        className:
          'text-end ps-4 text-700 fw-bold fs-10 text-uppercase text-nowrap'
      }
    }
  },
  {
    id: 'status',
    accessorFn: ({ status }) => status.label,
    header: 'Status',
    cell: ({ row: { original } }) => (
      <Badge variant="phoenix" bg={original.status.type}>
        {original.status.label}
      </Badge>
    ),
    meta: {
      headerProps: {
        style: { width: '30%' },
        className: 'text-end ps-4 text-700 fw-bold fs-10 text-nowrap'
      },
      cellProps: {
        className: 'text-end ps-4 text-1000'
      }
    }
  }
];

const ReportDetailsTable = () => {
  const table = useAdvanceTable({
    data: sellersReportData,
    columns,
    sortable: false
  });

  return (
    <div>
      <AdvanceTableProvider {...table}>
        <AdvanceTable
          tableProps={{ className: 'phoenix-table fs-9', size: 'sm' }}
        />
      </AdvanceTableProvider>
    </div>
  );
};

export default ReportDetailsTable;
