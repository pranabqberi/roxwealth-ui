import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faRefresh,
  faCheck,
  faMinus
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'components/base/Button';
import SearchBox from 'components/common/SearchBox';
import ProductsTable from 'components/tables/ProductsTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { ColumnDef } from '@tanstack/react-table';
import Badge from 'components/base/Badge';
import { Row, Col, Container, Form } from 'react-bootstrap';
// import FilterTab from 'components/common/FilterTab';
// import { FilterTabItem } from 'components/common/FilterTab';

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

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const Columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row: { original } }) => <div>{original.title}</div>
  },
  {
    accessorKey: 'description',
    header: 'Name',
    cell: ({ row: { original } }) => <div>{original.description}</div>
  },
  {
    accessorKey: 'vendor',
    header: 'Vendor',
    cell: ({ row: { original } }) => <div>{original.vendor}</div>
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row: { original } }) => <div>{original.type}</div>
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row: { original } }) => (
      <div>
        {original.tags.map((tag, index) => (
          <Badge key={index} className="me-1">
            {tag}
          </Badge>
        ))}
      </div>
    )
  },
  {
    accessorKey: 'isPublished',
    header: 'Published',
    cell: ({ row: { original } }) => (
      <div>
        {original.isPublished ? (
          <FontAwesomeIcon icon={faCheck} className="text-success" />
        ) : (
          <FontAwesomeIcon icon={faMinus} className="text-danger" />
        )}
      </div>
    )
  },
  {
    accessorKey: 'costPrice',
    header: 'Cost Price',
    cell: ({ row: { original } }) => <div>{original.costPrice}</div>
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row: { original } }) => <div>{original.quantity}</div>
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row: { original } }) => <div>{formatDate(original.createdAt)}</div>
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row: { original } }) => (
      <div>
        <Link to={`/products/${original.id}`} className="text-decoration-none">
          <Button variant="link" className="text-600">
            View
          </Button>
        </Link>
      </div>
    )
  }
];

const Products = () => {
  const [allProductData, setAllProductData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const appID = useParams<{ appID: string }>().appID as string;
  const [types, setTypes] = useState<string[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const session = JSON.parse(localStorage.getItem('session') || '{}');
      const URL = `https://engine.qberi.com/api/getAllProducts/${appID}`;
      const response = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.sessionToken}`
        }
      });
      const local = JSON.parse(localStorage.getItem('products') || '{}');
      local[appID] = response.data;
      localStorage.setItem('products', JSON.stringify(local));
      setAllProductData(response.data);
      setTypes([
        ...new Set(
          (response.data as Product[]).map((product: Product) => product.type)
        )
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('products') || '{}');
    if (local[appID]) {
      setAllProductData(local[appID]);
      setTypes([
        ...new Set(
          (local[appID] as Product[]).map((product: Product) => product.type)
        )
      ]);
    } else {
      fetchData();
    }
  }, [appID]);

  const table = useAdvanceTable({
    data: allProductData,
    columns: Columns,
    pageSize: 10,
    pagination: true,
    sortable: true
  });

  const handleRefresh = () => {
    fetchData();
  };

  const handleSearchInputChange = (value: string) => {
    table.setGlobalFilter(value);
  };

  return (
    <Container fluid>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleRefresh} size="sm">
            Refresh <FontAwesomeIcon icon={faRefresh} />
          </Button>
        </Col>
      </Row>
      <Row>
        {isLoading ? (
          <div>Loading...</div>
        ) : allProductData.length === 0 ? (
          <div>No products found.</div>
        ) : (
          <AdvanceTableProvider {...table}>
            <div className="mb-4 d-flex flex-wrap gap-3">
              <SearchBox
                placeholder="Search products"
                onChange={e => handleSearchInputChange(e.target.value)}
              />
              <div className="ms-xxl-auto">
                <Link to={`/app/${appID}/add-product`}>
                  <Button variant="primary" className="mx-2">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add Product
                  </Button>
                </Link>
              </div>
              {/* <FilterTab tabItems={[
                { label: 'All', value: 'all', count: allProductData.length },
                { label: 'Published', value: 'published', count: allProductData.filter((product) => product.isPublished).length },
                { label: 'Unpublished', value: 'unpublished', count: allProductData.filter((product) => !product.isPublished).length }
              ]} /> */}
              <div className="ms-xxl-auto">
                {/* Type */}
                <Form.Select
                  className="me-2"
                  onChange={e => table.setGlobalFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
              <ProductsTable />
            </div>
          </AdvanceTableProvider>
        )}
      </Row>
    </Container>
  );
};

export default Products;
