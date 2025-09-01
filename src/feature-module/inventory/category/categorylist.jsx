import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditCategoryList from '../../../core/modals/inventory/editcategorylist';
import Table from '../../../core/pagination/datatable';
import TooltipIcons from '../../../core/common/tooltip-content/tooltipIcons';
import RefreshIcon from '../../../core/common/tooltip-content/refresh';
import CollapesIcon from '../../../core/common/tooltip-content/collapes';
import CommonFooter from '../../../core/common/footer/commonFooter';
import CommonDeleteModal from '../../../core/common/modal/commonDeleteModal';
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from '../../../core/redux/api/admin/inventoryAPISlice';
import moment from 'moment';

const CategoryList = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState('');

  const { data: categories = [] } = useGetAllCategoriesQuery();

  const [deleteCategory] = useDeleteCategoryMutation();

  const columns = [
    {
      title: 'Category',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Category Code',
      dataIndex: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      render: (text) => moment(text).format('DD MMM YYYY'),
      sorter: (a, b) => a.created_at.length - b.created_at.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <span className="badge bg-success fw-medium fs-10">{text}</span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (record, key) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <span
              className="me-2 p-2"
              onClick={() => navigate(`/admin/category/${key?.id}`)}
            >
              <i className="ti ti-edit" />
            </span>
            <Link
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              className="p-2"
              to="/"
              onClick={() => setCategoryId(key?.id)}
            >
              <i className="ti ti-trash" />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Category</h4>
                <h6>Manage your categories</h6>
              </div>
            </div>
            <ul className="table-top-head">
              {/* <TooltipIcons /> */}
              {/* <RefreshIcon /> */}
              {/* <CollapesIcon /> */}
            </ul>
            <div className="page-btn">
              <span
                to="#"
                className="btn btn-primary"
                onClick={() => navigate(`/admin/category/`)}
              >
                <i className="ti ti-circle-plus me-1"></i>
                Add Category
              </span>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="search-set"></div>
              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="dropdown me-2">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Status
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Active
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Inactive
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Sort By : Last 7 Days
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Recently Added
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Ascending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Desending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Last Month
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Last 7 Days
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive category-table">
                <Table columns={columns} dataSource={categories.data} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
        <CommonFooter />
      </div>

      {/* Add Category */}

      {/* /Add Category */}

      {/* <EditCategoryList /> */}
      <CommonDeleteModal
        id={categoryId}
        page={'Category'}
        deleteCb={deleteCategory}
      />
    </div>
  );
};

export default CategoryList;
