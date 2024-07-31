import React, { useEffect, useState } from 'react';
import { Button, notification, Input, Dropdown, Menu, Empty, Pagination, Space, Collapse } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './OrderList.css';
const { Panel } = Collapse;

const items = [
  { label: 'All', key: '0' },
  { label: 'Shipped', key: '1' },
  { label: 'Pending', key: '2' },
];

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKey, setFilterKey] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const productsOrderList = JSON.parse(localStorage.getItem('orderList')) || [];
    productsOrderList.sort((a, b) => b - a)
    setOrderList(productsOrderList);
    setFilteredOrders(productsOrderList);
    const number = new Intl.NumberFormat('en-US').format(productsOrderList.length);
    setOrderLength(number);
  }, []);

  useEffect(() => {
    let filtered = orderList;
    if (filterKey !== '0') {
      const status = filterKey === '1';
      filtered = orderList.filter(order => order.ship === status);
    }
    if (searchTerm) {
      filtered = filtered.filter(order => order.id.toString().includes(searchTerm));
    }
    setFilteredOrders(filtered);
  }, [orderList, filterKey, searchTerm]);

  const handleShipOrder = (orderId) => {
    const updatedOrders = orderList.map(order =>
      order.id === orderId ? { ...order, ship: !order.ship } : order
    );

    localStorage.setItem('orderList', JSON.stringify(updatedOrders));
    setOrderList(updatedOrders);

    notification.success({
      message: 'Order Status Updated',
      description: `Order ID ${orderId} has been marked as ${updatedOrders.find(order => order.id === orderId).ship ? 'shipped' : 'pending'}.`,
    });
  };

  const handleFilterChange = ({ key }) => {
    setFilterKey(key);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const menu = (
    <Menu onClick={handleFilterChange}>
      {items.map(item => (
        <Menu.Item key={item.key}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const paginatedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className='option-select'>
        <h1>ORDER LIST</h1>

        <Space>

          <div className='main-custom-input'>
            <Input
              className="custom-input"
              placeholder='Search'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <SearchOutlined />
        </Space>
      </div>
      <div className='dropdown'>
        <Dropdown overlay={menu}>
          <Button style={{ width: "100px" }}>
            Filter
          </Button>
        </Dropdown>
      </div>
      {paginatedOrders.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        paginatedOrders.map((item) => (

          <div key={item.id} className="card-list-body">
            <Space>
              <p>Order ID : {item.id}</p>
              <p style={{ position: 'absolute', right: 0, marginRight: 10 }}>{item.Address}</p>
            </Space>
            <Collapse style={{ border: 'none', backgroundColor: 'transparent' }}>
              <Panel header={'Items - ' + item.items.length} >

                <table style={{ width: '100%', textAlign: 'center' }}>
                  <tr>
                    <th>
                      Product ID
                    </th>
                    <th>
                      Product Name
                    </th>
                    <th>
                      Price
                    </th>
                    <th>
                      Category
                    </th>
                    <th>
                      Color
                    </th>
                    <th>
                      Qty
                    </th>
                  </tr>

                  {item.items.map((orderItem, index) => (
                    <tr style={{ border: '1px solid black' }}>
                      <td >{orderItem.ProductID}</td>
                      <td>{orderItem.ProductName}</td>
                      <td>${orderItem.ProductPrice}</td>
                      <td>{orderItem.ProductCategory}</td>
                      <td>{orderItem.Color}</td>
                      <td>{orderItem.quantity}</td>
                    </tr>
                  ))}
                </table>


              </Panel>
            </Collapse>

            <hr />
            <div className="card-list-add-minu-body">
              <p>Total: ${item.total.toFixed(2)}</p>
              <p style={{ position: 'absolute', marginLeft: '48%' }}>Status: {item.ship ? 'Shipped' : 'Pending'}</p>
              <div className="plus-items-minu">
                <Button
                  className="plus-btn"
                  onClick={() => handleShipOrder(item.id)}
                >
                  {item.ship ? 'SHIPPED' : 'SHIP'}
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredOrders.length}
        onChange={handlePageChange}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default OrderList;
