import { useState } from 'react';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import { Link, useNavigate } from 'react-router-dom';
import Table from '../../../core/pagination/datatable';
import CommonFooter from '../../../core/common/footer/commonFooter';

import { X } from 'feather-icons-react/build/IconComponents';
import { Category } from '../../../core/common/selectOption/selectOption';
import DefaultEditor from 'react-simple-wysiwyg';
import Select from 'react-select';
import CommonDeleteModal from '../../../core/common/modal/commonDeleteModal';
import {
  useDeleteSubCategoryMutation,
  useGetAllSubCategoriesQuery,
} from '../../../core/redux/api/admin/inventoryAPISlice';

const SubCategories = () => {
  const navigate = useNavigate();

  const { data: subcategories = [] } = useGetAllSubCategoriesQuery();

  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const [subCategoryId, setSubCategoryId] = useState('');

  const columns = [
    {
      title: 'Sub Category',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (category) => category.name,
      sorter: (a, b) => a.category.name.length - b.category.name.length,
    },

    {
      title: 'Category Code',
      dataIndex: 'category',
      render: (category) => category.code,
      sorter: (a, b) => a.categorycode.length - b.categorycode.length,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: (text) => (
    //     <span className="badge bg-success fw-medium fs-10">{text}</span>
    //   ),
    //   sorter: (a, b) => a.createdby.length - b.createdby.length,
    // },

    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (record, key) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <span
              className="me-2 p-2"
              onClick={() => navigate(`/admin/subcategory/${key?.id}`)}
            >
              <i className="ti ti-edit" />
            </span>
            <Link
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              className="p-2"
              to="#"
              onClick={() => setSubCategoryId(key?.id)}
            >
              <i className="ti ti-trash" />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const [values, setValue] = useState();
  function onChange(e) {
    setValue(e.target.value);
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Sub Category</h4>
                <h6>Manage your sub categories</h6>
              </div>
            </div>
            <ul className="table-top-head">
              {/* <TooltipIcons /> */}
              {/* <RefreshIcon />
              <CollapesIcon /> */}
            </ul>
            <div className="page-btn">
              <span
                className="btn btn-primary"
                onClick={() => navigate(`/admin/subcategory/`)}
              >
                <i className="ti ti-circle-plus me-1"></i> Add Sub Category
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
                    Category
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Computers
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Electronics
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Shoe
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Electronics
                      </Link>
                    </li>
                  </ul>
                </div>

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
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive sub-category-table">
                <Table columns={columns} dataSource={subcategories.data} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
        <CommonFooter />
      </div>
      <>
        {/* Add Category */}
        <div className="modal fade" id="add-category">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header">
                    <div className="page-title">
                      <h4>Add Sub Category</h4>
                    </div>
                    <button
                      type="button"
                      className="close bg-danger text-white fs-16"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <div className="add-image-upload">
                          <div className="add-image">
                            <span className="fw-normal">
                              <i
                                data-feather="plus-circle"
                                className="plus-down-add"
                              />{' '}
                              Add Image
                            </span>
                          </div>
                          <div className="new-employee-field">
                            <div className="mb-0">
                              <div className="image-upload mb-2">
                                <input type="file" />
                                <div className="image-uploads">
                                  <h4 className="fs-13 fw-medium">
                                    Upload Image
                                  </h4>
                                </div>
                              </div>
                              <span>JPEG, PNG up to 2 MB</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Category<span className="text-danger ms-1">*</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={Category}
                          placeholder="Choose"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Sub Category
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Category Code
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Description<span className="text-danger ms-1">*</span>
                        </label>
                        <DefaultEditor value={values} onChange={onChange} />
                      </div>
                      <div className="mb-0">
                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                          <span className="status-label">Status</span>
                          <input
                            type="checkbox"
                            id="user2"
                            className="check"
                            defaultChecked
                          />
                          <label htmlFor="user2" className="checktoggle" />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <Link
                      to="#"
                      className="btn btn-primary fs-13 fw-medium p-2 px-3"
                    >
                      Create Subcategory
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Category */}
        {/* Edit Category */}
        <div className="modal fade" id="edit-category">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header">
                    <div className="page-title">
                      <h4>Edit Sub Category</h4>
                    </div>
                    <button
                      type="button"
                      className="close bg-danger text-white fs-16"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <div className="add-image-upload">
                          <div className="add-image p-1 border-solid">
                            <ImageWithBasePath
                              src="assets/img/products/laptop.png"
                              alt="image"
                            />
                            <Link to="#">
                              <X className="x-square-add image-close remove-product fs-12 text-white bg-danger rounded-1" />
                            </Link>
                          </div>
                          <div className="new-employee-field">
                            <div className="mb-0">
                              <div className="image-upload mb-2">
                                <input type="file" />
                                <div className="image-uploads">
                                  <h4 className="fs-13 fw-medium">
                                    Change Image
                                  </h4>
                                </div>
                              </div>
                              <span>JPEG, PNG up to 2 MB</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Category<span className="text-danger ms-1">*</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={Category}
                          placeholder="Choose"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Sub Category
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Laptop"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Category Code
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="CT001"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Description<span className="text-danger ms-1">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          defaultValue={'Efficient Productivity'}
                        />
                      </div>
                      <div className="mb-0">
                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                          <span className="status-label">Status</span>
                          <input
                            type="checkbox"
                            id="user3"
                            className="check"
                            defaultChecked
                          />
                          <label htmlFor="user3" className="checktoggle" />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <Link
                      to="#"
                      className="btn btn-primary fs-13 fw-medium p-2 px-3"
                    >
                      Add Sub Category
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Category */}
        <CommonDeleteModal
          id={subCategoryId}
          page={'Sub Category'}
          deleteCb={deleteSubCategory}
        />
      </>
    </>
  );
};

export default SubCategories;
