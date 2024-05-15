import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

type categoryType = {
  name: string;
};

const CategoryList = () => {
  const appID = useParams<{ appID: string }>().appID;

  const columns: ColumnDef<categoryType>[] = [
    {
      accessorKey: 'product',
      header: 'Category',
      cell: ({ row: { original } }) => {
        const { name } = original;
        return <>{name}</>;
      },
      meta: {
        headerProps: { style: { minWidth: 250, width: '35%' } },
        cellProps: { className: '' }
      }
    },
    {
      accessorKey: 'id',
      header: 'Add Product in this category',
      cell: () => {
        const link = '/app/' + appID + '/add-product';
        return (
          <Link to={link}>
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        );
      }
    }
  ];

  const [categories, setCategories] = useState<categoryType[]>([]);

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    setCategories(categories);
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
      <h2 className="mt-5 mb-3">Product Category List</h2>
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
