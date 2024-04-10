import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'components/base/Button';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import SearchBox from 'components/common/SearchBox';
import ProductsTable, {
  productsTablecolumns
} from 'components/tables/ProductsTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';

const URL = 'https://engine.qberi.com/api/allBatteryDetails';
const URL2 = 'https://engine.qberi.com/api/allEnabledBatteryDetails';

const Products = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [allEnabledData, setAllEnabledData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const session = JSON.parse(localStorage.getItem('session') || '{}');
      const sessionToken = session.sessionToken;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`
      };
      const response = await axios.get(URL, { headers });
      const responseEnableProducts = await axios.get(URL2, { headers });
      setAllProductData(response.data);
      setAllEnabledData(responseEnableProducts.data);
      // console.log('Response:', response.data);
      // console.log(
      //   'Response Enabled Product Data :',
      //   responseEnableProducts.data
      // );
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [activeTab, setActiveTab] = useState('all');

  const tabItems: FilterTabItem[] = [
    {
      label: 'All',
      value: 'all',
      onClick: () => setActiveTab('all'),
      count: allProductData.length
    },
    {
      label: 'Published',
      value: 'published',
      onClick: () => setActiveTab('published'),
      count: allEnabledData.length
    }
  ];

  const TableData = activeTab === 'published' ? allEnabledData : allProductData;

  const table = useAdvanceTable({
    data: TableData,
    columns: productsTablecolumns,
    pageSize: 10,
    pagination: true,
    sortable: true,
    selection: true
  });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value || undefined);
  };

  return (
    <div>
      <div className="mb-9">
        <h2 className="mb-4">Products</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <AdvanceTableProvider {...table}>
          <div className="mb-4 d-flex flex-wrap gap-3">
            <SearchBox
              placeholder="Search products"
              onChange={handleSearchInputChange}
            />
            <div className="ms-xxl-auto">
              <div className="d-flex justify-content-between">
                <Link to="/hospitalmerch/add-product-batteries">
                  <Button variant="primary" className="mx-2">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add Battery
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
            <ProductsTable />
          </div>
        </AdvanceTableProvider>
      </div>
    </div>
  );
};

export default Products;
