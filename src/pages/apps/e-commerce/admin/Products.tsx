import { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'components/base/Button';
// import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
// import SearchBox from 'components/common/SearchBox';
import ProductsTable from 'components/tables/ProductsTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { ColumnDef } from '@tanstack/react-table';
import Badge from 'components/base/Badge';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';

type Product = {
  id: number;
  uniqueId: string;
  title: string;
  description: string;
  vendor: string;
  type: string;
  tags: string[];
  isPublished: boolean;
  imageUrl: string[];
  costPrice: number;
  quantity: number;
  createdAt: string;
};

const Columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row: { original } }) => {
      const { title } = original;
      return <div>{title}</div>;
    }
  },
  {
    accessorKey: 'vendor',
    header: 'Vendor',
    cell: ({ row: { original } }) => {
      const { vendor } = original;
      return <div>{vendor}</div>;
    }
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row: { original } }) => {
      const { type } = original;
      return <div>{type}</div>;
    }
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row: { original } }) => {
      const { tags } = original;
      return (
        <div>
          {tags.map((tag, index) => (
            <Badge key={index} className="me-1">
              {tag}
            </Badge>
          ))}
        </div>
      );
    }
  },
  {
    accessorKey: 'isPublished',
    header: 'Published',
    cell: ({ row: { original } }) => {
      const { isPublished } = original;
      return (
        <div>
          {isPublished ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faMinus} className="text-danger" />
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'costPrice',
    header: 'Cost Price',
    cell: ({ row: { original } }) => {
      const { costPrice } = original;
      return <div>{costPrice}</div>;
    }
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row: { original } }) => {
      const { quantity } = original;
      return <div>{quantity}</div>;
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row: { original } }) => {
      const { createdAt } = original;
      return <div>{createdAt}</div>;
    }
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row: { original } }) => {
      const { id } = original;
      return (
        <div>
          <Link to={`/app/products/${id}`} className="text-decoration-none">
            <Button variant="link" className="text-600">
              View
            </Button>
          </Link>
        </div>
      );
    }
  }
];

const Products = () => {
  const [allProductData, setAllProductData] = useState<Product[]>([]);

  const appID = useParams<{ appID: string }>().appID as string;

  const fetchData = useCallback(async () => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const URL = `https://engine.qberi.com/api/getAllProducts/${appID}`;
    axios
      .get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.sessionToken}`
        }
      })
      .then(response => {
        setAllProductData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const table = useAdvanceTable({
    data: allProductData,
    columns: Columns,
    pageSize: 10,
    pagination: true,
    sortable: true
  });

  return (
    <div>
      <div className="mb-9">
        <h2 className="mb-4">Products</h2>
        <AdvanceTableProvider {...table}>
          {/* <div className="mb-4 d-flex flex-wrap gap-3">
            <SearchBox
              placeholder="Search products"
              onChange={handleSearchInputChange}
            />
            <div className="ms-xxl-auto">
              <div className="d-flex justify-content-between">
                <Link to={`/app/${appID}/add-product`}>
                  <Button variant="primary" className="mx-2">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add Product
                  </Button>
                </Link>
              </div>
            </div>
          </div> */}
          {/* <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1"> */}
          <ProductsTable />
          {/* </div> */}
        </AdvanceTableProvider>
      </div>
    </div>
  );
};

export default Products;
