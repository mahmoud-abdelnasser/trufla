import React, {
  Component,
  useContext,
  useState,
  useRef,
  Children
} from "react";
import { Table, Pagination, Button, Icon, Input } from "antd";
import Highlighter from "react-highlight-words";

import { ProductsContext } from "../contexts/ProductsContext";
import styled from "styled-components";

const ProductsTable = props => {

  const searchInput = useRef(null);
  const [products] = useContext(ProductsContext);

  // handle filters with checkbox
  let [filteredDepartment, setFilteredDepartment] = useState({
    department_name: []
  });

  const handleChange = (pagination, filters, sorter) => {
    setFilteredDepartment({ department_name: filters.department_name });
  };

  const clearFilters = () => {
    setFilteredDepartment({ department_name: [] });
    setSearchText("");
  };

  // handle search filters
  let [searchText, setSearchText] = useState("");

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearSearch => {
    clearSearch();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex, nestedIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      // to handle nested obj
      if (nestedIndex === "promotion") {
        const promotionIndex = record.promotion;
        return promotionIndex[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      } else {
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  const columns = [
    {
      title: "Department Name",
      dataIndex: "department_name",
      key: "department_name",
      filters: [
        { text: "phones", value: "phones" },
        { text: "laptops", value: "laptops" }
      ],
      filteredValue: filteredDepartment.department_name || [],
      onFilter: (value, record) => {
        return record.department_name.includes(value);
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name")
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price")
    },
    {
      title: "Promotions",
      children: [
        {
          title: "Code",
          dataIndex: "promotion.code",
          key: "promotion.code",
          ...getColumnSearchProps("code", "promotion"),
          render: rowData => (rowData ? rowData : "No Code")
        },
        {
          title: "Discount",
          dataIndex: "promotion",
          key: "discount",
          render: rowData =>
            rowData ? (
              <span
                className={rowData.active ? "success" : "danger"}
              >{`${rowData.discount} off`}</span>
            ) : (
              "No Discount"
            )
        },
        {
          title: "active",
          dataIndex: "promotion",
          key: "active",
          render: rowData =>
            rowData ? (
              rowData.active ? (
                <span className="success">
                  <Icon type="check-circle" /> active
                </span>
              ) : (
                <span className="danger">
                  <Icon type="stop" /> not active{" "}
                </span>
              )
            ) : (
              "no"
            )
        }
      ]
    }
  ];
  return (
    <div>
      {/* <div className="table-operations">
        <Button onClick={clearFilters}>Clear filters</Button>
      </div> */}
      <Table
        className="table"
        bordered
        columns={columns}
        dataSource={products}
        onChange={handleChange}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default ProductsTable;
