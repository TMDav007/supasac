import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import CommonFooter from '../../../core/common/footer/commonFooter';
import Table from '../../../core/pagination/datatable';
import {
  useDeleteStoreMutation,
  useGetStoresQuery,
} from '../../../core/redux/api/admin/storeApiSlice';
import moment from 'moment';
import CommonDeleteModal from '../../../core/common/modal/commonDeleteModal';

const Stores = () => {
  const navigate = useNavigate();
  const [storeId, setStoreId] = useState('');
  const [deleteStore] = useDeleteStoreMutation();

  const columns = [
    {
      title: 'Store Name',
      dataIndex: 'brand_name',
      render: (record, text) => (
        <div className="d-flex align-items-center file-name-icon">
          {/* <Link to="#" className="avatar avatar-md border rounded-circle">
            <ImageWithBasePath
              src={`assets/img/Store/${record.Image}`}
              className="img-fluid"
              alt="img"
            />
          </Link> */}
          <div className="ms-2">
            <h6 className="fw-medium">
              <Link to="#">{text}</Link>
            </h6>
          </div>
        </div>
      ),
      sorter: (a, b) => a.brand_name.length - b.brand_name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.Email.length - b.Email.length,
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      render: (text) => moment(text).format('DD MMM YYYY'),
      sorter: (a, b) => a.CreatedDate.length - b.CreatedDate.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <span
          className={`badge ${text === 'Active' ? 'badge-success' : 'badge-primary'} d-inline-flex align-items-center badge-xs`}
        >
          <i className="ti ti-point-filled me-1" />
          {text}
        </span>
      ),
      sorter: (a, b) => a.Status.length - b.Status.length,
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (record, key) => (
        <div className="action-icon d-inline-flex align-items-center">
          <Link
            to="#"
            className="p-2 d-flex align-items-center border rounded me-2"
            data-bs-toggle="modal"
            data-bs-target="#Store_detail"
          >
            <i className="ti ti-eye" />
          </Link>
          <span
            to="#"
            className="p-2 d-flex align-items-center border rounded me-2"
            onClick={() => navigate(`/admin/store/${key?.id}`)}
          >
            <i className="ti ti-edit" />
          </span>
          <Link
            to="#"
            className="p-2 d-flex align-items-center border rounded"
            data-bs-toggle="modal"
            data-bs-target="#delete-modal"
            onClick={() => setStoreId(key.id)}
          >
            <i className="ti ti-trash" />
          </Link>
        </div>
      ),
    },
  ];

  const { data: stores = [] } = useGetStoresQuery();

  const [totalChart] = React.useState({
    series: [
      {
        name: 'Messages',
        data: [25, 66, 41, 12, 36, 9, 21],
      },
    ],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0, // Start with 0 opacity (transparent)
        opacityTo: 0, // End with 0 opacity (transparent)
      },
    },
    chart: {
      foreColor: '#fff',
      type: 'area',
      width: 50,
      toolbar: {
        show: !1,
      },
      zoom: {
        enabled: !1,
      },
      dropShadow: {
        enabled: 0,
        top: 3,
        left: 14,
        blur: 4,
        opacity: 0.12,
        color: '#fff',
      },
      sparkline: {
        enabled: !0,
      },
    },
    markers: {
      size: 0,
      colors: ['#F26522'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: '35%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      show: !0,
      width: 2.5,
      curve: 'smooth',
    },
    colors: ['#F26522'],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
      marker: {
        show: !1,
      },
    },
  });
  const [activeChart] = React.useState({
    series: [
      {
        name: 'Active Store',
        data: [25, 40, 35, 20, 36, 9, 21],
      },
    ],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0, // Start with 0 opacity (transparent)
        opacityTo: 0, // End with 0 opacity (transparent)
      },
    },
    chart: {
      foreColor: '#fff',
      type: 'area',
      width: 50,
      toolbar: {
        show: !1,
      },
      zoom: {
        enabled: !1,
      },
      dropShadow: {
        enabled: 0,
        top: 3,
        left: 14,
        blur: 4,
        opacity: 0.12,
        color: '#fff',
      },
      sparkline: {
        enabled: !0,
      },
    },
    markers: {
      size: 0,
      colors: ['#F26522'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: '35%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      show: !0,
      width: 2.5,
      curve: 'smooth',
    },
    colors: ['#F26522'],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
      marker: {
        show: !1,
      },
    },
  });
  const [inactiveChart] = React.useState({
    series: [
      {
        name: 'Inactive Store',
        data: [25, 10, 35, 5, 25, 28, 21],
      },
    ],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0, // Start with 0 opacity (transparent)
        opacityTo: 0, // End with 0 opacity (transparent)
      },
    },
    chart: {
      foreColor: '#fff',
      type: 'area',
      width: 50,
      toolbar: {
        show: !1,
      },
      zoom: {
        enabled: !1,
      },
      dropShadow: {
        enabled: 0,
        top: 3,
        left: 14,
        blur: 4,
        opacity: 0.12,
        color: '#fff',
      },
      sparkline: {
        enabled: !0,
      },
    },
    markers: {
      size: 0,
      colors: ['#F26522'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: '35%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      show: !0,
      width: 2.5,
      curve: 'smooth',
    },
    colors: ['#F26522'],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
      marker: {
        show: !1,
      },
    },
  });
  const [locationChart] = React.useState({
    series: [
      {
        name: 'Inactive Store',
        data: [30, 40, 15, 23, 20, 23, 25],
      },
    ],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0, // Start with 0 opacity (transparent)
        opacityTo: 0, // End with 0 opacity (transparent)
      },
    },
    chart: {
      foreColor: '#fff',
      type: 'area',
      width: 50,
      toolbar: {
        show: !1,
      },
      zoom: {
        enabled: !1,
      },
      dropShadow: {
        enabled: 0,
        top: 3,
        left: 14,
        blur: 4,
        opacity: 0.12,
        color: '#fff',
      },
      sparkline: {
        enabled: !0,
      },
    },
    markers: {
      size: 0,
      colors: ['#F26522'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: '35%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      show: !0,
      width: 2.5,
      curve: 'smooth',
    },
    colors: ['#F26522'],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
      marker: {
        show: !1,
      },
    },
  });

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Stores</h4>
                <h6>Manage your Stores</h6>
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
                onClick={() => navigate(`/admin/store/`)}
              >
                <i className="ti ti-circle-plus me-1"></i> Add Store
              </span>
            </div>
          </div>

          <div className="row">
            {/* Total Stores */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <span className="avatar avatar-lg bg-primary flex-shrink-0">
                      <i className="ti ti-building fs-16" />
                    </span>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate">
                        Total Stores
                      </p>
                      <h4>950</h4>
                    </div>
                  </div>
                  <ReactApexChart
                    options={totalChart}
                    series={totalChart.series}
                    type="area"
                    width={50}
                  />
                </div>
              </div>
            </div>
            {/* /Total Stores */}
            {/* Total Stores */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <span className="avatar avatar-lg bg-success flex-shrink-0">
                      <i className="ti ti-building fs-16" />
                    </span>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate">
                        Active Stores
                      </p>
                      <h4>920</h4>
                    </div>
                  </div>
                  <ReactApexChart
                    options={activeChart}
                    series={activeChart.series}
                    type="area"
                    width={50}
                  />
                </div>
              </div>
            </div>
            {/* /Total Stores */}
            {/* Inactive Stores */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <span className="avatar avatar-lg bg-danger flex-shrink-0">
                      <i className="ti ti-building fs-16" />
                    </span>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate">
                        Inactive Stores
                      </p>
                      <h4>30</h4>
                    </div>
                  </div>
                  <ReactApexChart
                    options={inactiveChart}
                    series={inactiveChart.series}
                    type="area"
                    width={50}
                  />
                </div>
              </div>
            </div>
            {/* /Inactive Stores */}
            {/* Store Location */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
                      <i className="ti ti-map-pin-check fs-16" />
                    </span>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate">
                        Store Location
                      </p>
                      <h4>180</h4>
                    </div>
                  </div>
                  <ReactApexChart
                    options={locationChart}
                    series={locationChart.series}
                    type="area"
                    width={50}
                  />
                </div>
              </div>
            </div>
            {/* /Store Location */}
          </div>
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Stores List</h5>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="me-3">
                  <div className="input-icon-end position-relative">
                    {/* <PredefinedDateRanges /> */}
                    <span className="input-icon-addon">
                      <i className="ti ti-chevron-down" />
                    </span>
                  </div>
                </div>
                <div className="dropdown me-3">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Select Plan
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Advanced
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Basic
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Enterprise
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown me-3">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Select Status
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
                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
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
            <div className="card-body p-0">
              <div className="table-responsive">
                <Table columns={columns} dataSource={stores?.data} />
              </div>
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>
      {/* /Page Wrapper */}
      {/* Add Store */}

      {/* /Add Store */}
      {/* Edit Store */}

      {/* /Edit Store */}
      {/* Upgrade Information */}

      {/* /Upgrade Information */}
      {/* Store Detail */}
      <div className="modal fade" id="Store_detail">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Store Detail</h4>
              <button
                type="button"
                className="btn-close custom-btn-close p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="moday-body">
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center rounded bg-light p-3">
                  <div className="file-name-icon d-flex align-items-center">
                    <Link
                      to="#"
                      className="avatar avatar-md border rounded-circle flex-shrink-0 me-2"
                    >
                      <ImageWithBasePath
                        src="assets/img/Store/Store-01.svg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div>
                      <p className="text-gray-9 fw-medium mb-0">
                        BrightWave Innovations
                      </p>
                      <p>michael@example.com</p>
                    </div>
                  </div>
                  <span className="badge badge-success">
                    <i className="ti ti-point-filled" />
                    Active
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-gray-9 fw-medium">Basic Info</p>
                <div className="pb-1 border-bottom mb-4">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Account URL</p>
                        <p className="text-gray-9">bwi.example.com</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Phone Number</p>
                        <p className="text-gray-9">(163) 2459 315</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Website</p>
                        <p className="text-gray-9">www.exmple.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Currency</p>
                        <p className="text-gray-9">
                          United Stated Dollar (USD)
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Language</p>
                        <p className="text-gray-9">English</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Addresss</p>
                        <p className="text-gray-9">
                          3705 Lynn Avenue, Phelps, WI 54554
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-9 fw-medium">Plan Details</p>
                <div>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Plan Name</p>
                        <p className="text-gray-9">Advanced</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Plan Type</p>
                        <p className="text-gray-9">Monthly</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Price</p>
                        <p className="text-gray-9">$200</p>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Register Date</p>
                        <p className="text-gray-9">12 Sep 2024</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Expiring On</p>
                        <p className="text-gray-9">11 Oct 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Store Detail */}
      <>
        {/* Delete Modal */}
        {/* <div className="modal fade" id="delete_modal">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center">
                <span className="avatar avatar-xl bg-danger-transparent rounded-circle text-danger mb-3">
                  <i className="ti ti-trash-x fs-36" />
                </span>
                <h4 className="mb-1">Confirm Delete</h4>
                <p className="mb-3">
                  You want to delete all the marked items, this cant be undone
                  once you delete.
                </p>
                <div className="d-flex justify-content-center">
                  <Link
                    to="#"
                    className="btn btn-secondary me-3"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Yes, Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* /Delete Modal */}
        <CommonDeleteModal id={storeId} page={'Store'} deleteCb={deleteStore} />
      </>
    </>
  );
};

export default Stores;
