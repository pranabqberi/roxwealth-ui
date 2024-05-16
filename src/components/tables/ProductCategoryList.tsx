import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

type categoryType = {
  id: string;
  uniqueId: string;
  title: string;
  description: string;
  vendor: string;
  type: string;
  tags: string;
  isPublished: boolean;
  costPrice: number;
  quantity: number;
};

// to show: uniqueId, title, vendor, type, tags, isPublished, costPrice, quantity

const CategoryList = () => {
  const appID = useParams<{ appID: string }>().appID;
  const columns: ColumnDef<categoryType>[] = [
    {
      accessorKey: 'uniqueId',
      header: 'Product ID',
      cell: ({ row: { original } }) => {
        const { uniqueId } = original;
        return <>{uniqueId}</>;
      },
      meta: {
        headerProps: { style: { minWidth: 150, width: '15%' } },
        cellProps: { className: '' }
      }
    },
    {
      accessorKey: 'title',
      header: 'Product Name',
      cell: ({ row: { original } }) => {
        const { title } = original;
        return <>{title}</>;
      },
      meta: {
        headerProps: { style: { minWidth: 150, width: '15%' } },
        cellProps: { className: '' }
      }
    },
    {
      accessorKey: 'vendor',
      header: 'Vendor',
      cell: ({ row: { original } }) => {
        const { vendor } = original;
        return <>{vendor}</>;
      },
      meta: {
        headerProps: { style: { minWidth: 150, width: '15%' } },
        cellProps: { className: '' }
      }
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row: { original } }) => {
        const { type } = original;
        return <>{type}</>;
      },
      meta: {
        headerProps: { style: { minWidth: 150, width: '15%' } },
        cellProps: { className: '' }
      }
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row: { original } }) => {
        const { tags } = original;
        return <>{tags}</>;
      },
      meta: {
        headerProps: { style: { minWidth: 150, width: '15%' } },
        cellProps: { className: '' }
      }
    },
    {
      accessorKey: 'isPublished',
      header: 'Published',
      cell: ({ row: { original } }) => {
        const { isPublished } = original;
        return <>{isPublished ? 'Yes' : 'No'}</>;
      },
      meta: {
        headerProps: { style: { minWidth: 150, width: '15%' } },
        cellProps: { className: '' }
      }
    }
  ];

  const [categories, setCategories] = useState<categoryType[]>([]);

  useEffect(() => {
    const URL = `https://engine.qberi.com/api/getAllTemplates/` + appID;
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const token = session.sessionToken;
    axios
      .get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Response: ', response);
        setCategories(response.data);
        localStorage.setItem('templates', JSON.stringify(response.data));
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }, []);

  const table = useAdvanceTable({
    data: categories,
    columns,
    pageSize: 5,
    pagination: true,
    sortable: true
  });

  return (
    <div>
      <h2 className="mt-5 mb-3">Product Templates List</h2>
      <AdvanceTableProvider {...table}>
        <div className="border-y">
          <AdvanceTable tableProps={{ className: 'phoenix-table fs-9' }} />
          <AdvanceTableFooter pagination showViewAllBtn={false} />
        </div>
      </AdvanceTableProvider>
    </div>
  );
};

export default CategoryList;
