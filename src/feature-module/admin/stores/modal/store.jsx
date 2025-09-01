import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { adminStoreSchema } from '../../../../utils/schema';
import {
  useAdminCreateStoreMutation,
  useAdminEditStoreMutation,
  useGetStoreQuery,
} from '../../../../core/redux/api/admin/storeApiSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'feather-icons-react/build/IconComponents';

function StoreModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditModal = !!id;
  const { data: store } = isEditModal && useGetStoreQuery(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(adminStoreSchema),
  });

  const [adminCreateStore] = useAdminCreateStoreMutation();
  const [adminEditStore] = useAdminEditStoreMutation(id);

  const onSubmit = async (formData) => {
    try {
      const {
        firstName,
        lastName,
        name,
        description,
        address,
        postcode,
        merchantEmail,
        merchantPhoneNumber,
        storePhoneNumber,
        storeEmail,
      } = formData;
      const data = {
        merchantDetails: {
          first_name: firstName,
          last_name: lastName,
          email: merchantEmail,
          mobile: merchantPhoneNumber ?? storePhoneNumber,
        },
        storeDetails: {
          brand_name: name,
          description,
          address,
          postcode,
          email: storeEmail ?? merchantEmail,
          phone_number: storePhoneNumber,
        },
      };
      isEditModal
        ? await adminEditStore({ id, data: data.storeDetails }).unwrap()
        : await adminCreateStore(data).unwrap();
      toast.success('store created successfully', {
        autoClose: 2000,
        closeOnClick: true,
        theme: 'light',
      });
      navigate(-1);
    } catch (err) {
      console.log(err?.data);
      toast.error(err?.data?.message);
    }
  };

  useEffect(() => {
    if (store?.data) {
      const {
        merchant,
        brand_name,
        address,
        description,
        postcode,
        email,
        phone_number,
      } = store.data;
      reset({
        firstName: merchant.first_name,
        lastName: merchant.last_name,
        merchantEmail: merchant.email,
        merchantPhoneNumber: merchant?.mobile,
        name: brand_name,
        address,
        postcode,
        storePhoneNumber: phone_number,
        description,
        storeEmail: email,
      });
    }
  }, [store, reset]);

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="add_Store"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                {id ? 'Edit Store' : 'Add New Store'}
              </h4>
              <div className="d-flex align-items-center gap-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    navigate(`/admin/store/${id}/product`);
                  }}
                >
                  <i className="ti ti-circle-plus me-1"></i> Add Product
                </button>

                <button
                  type="button"
                  className="btn-close custom-btn-close p-0"
                  data-bs-dismiss="modal"
                  onClick={() => navigate(-1)}
                >
                  <i className="ti ti-x" />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="card-title-head">
                    <h6 className="fs-16 fw-bold mb-3">
                      <span className="fs-16 me-2">
                        <i className="ti ti-user" />
                      </span>
                      Merchant Information
                    </h6>
                  </div>

                  <div className="row ">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          First Name <span className="text-danger"> *</span>
                        </label>
                        <input
                          type="text"
                          {...register('firstName')}
                          className="form-control"
                          disabled={isEditModal}
                        />
                      </div>
                      {errors.firstName && (
                        <div className="text-red">
                          {errors.firstName.message}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Last Name <span className="text-danger"> *</span>
                        </label>
                        <input
                          type="text"
                          {...register('lastName')}
                          className="form-control"
                          disabled={isEditModal}
                        />
                      </div>
                      {errors.lastName && (
                        <div className="text-red">
                          {errors.lastName.message}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Phone Number <span className="text-danger"> *</span>
                        </label>
                        <input
                          type="text"
                          {...register('merchantPhoneNumber')}
                          disabled={isEditModal}
                          className="form-control"
                        />
                      </div>
                      {errors.merchantPhoneNumber && (
                        <div className="text-red">
                          {errors.merchantPhoneNumber.message}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Email Address <span className="text-danger"> *</span>
                        </label>
                        <input
                          type="email"
                          {...register('merchantEmail')}
                          className="form-control"
                          disabled={isEditModal}
                        />
                      </div>
                      {errors.merchantEmail && (
                        <div className="text-red">
                          {errors.merchantEmail.message}
                        </div>
                      )}
                    </div>

                    {/* <div className="col-md-12">
                         <div className="mb-3">
                           <label className="form-label">Account URL</label>
                           <input type="text" className="form-control" />
                         </div>
                       </div> */}

                    {/* <div className="col-md-6">
                       <div className="mb-3">
                         <label className="form-label">Website</label>
                         <input type="text" className="form-control" />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="mb-3 ">
                         <label className="form-label">
                           Password <span className="text-danger"> *</span>
                         </label>
                         <div className="pass-group">
                           <input
                             type={
                               passwordVisibility.password ? 'text' : 'password'
                             }
                             className="pass-input form-control"
                           />
                           <span
                             className={`ti toggle-passwords ${
                               passwordVisibility.password
                                 ? 'ti-eye'
                                 : 'ti-eye-off'
                             }`}
                             onClick={() => togglePasswordVisibility('password')}
                           ></span>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="mb-3 ">
                         <label className="form-label">
                           Confirm Password <span className="text-danger"> *</span>
                         </label>
                         <div className="pass-group">
                           <input
                             type={
                               passwordVisibility.confirmPassword
                                 ? 'text'
                                 : 'password'
                             }
                             className="pass-input form-control"
                           />
                           <span
                             className={`ti toggle-passwords ${
                               passwordVisibility.confirmPassword
                                 ? 'ti-eye'
                                 : 'ti-eye-off'
                             }`}
                             onClick={() =>
                               togglePasswordVisibility('confirmPassword')
                             }
                           ></span>
                         </div>
                       </div>
                     </div> */}

                    <div className="card-title-head">
                      <h6 className="fs-16 fw-bold mt-3 mb-3">
                        <span className="fs-16 me-2">
                          <i className="ti ti-user-edit" />
                        </span>
                        Store Information
                      </h6>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                            <i className="ti ti-photo" />
                          </div>
                          <div className="profile-upload">
                            <div className="mb-2">
                              <h6 className="mb-1">Upload Store Image</h6>
                              <p className="fs-12">
                                Image should be below 4 mb
                              </p>
                            </div>
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                Upload
                                <input
                                  type="file"
                                  className="form-control image-sign"
                                  multiple=""
                                />
                              </div>
                              <Link to="#" className="btn btn-secondary btn-sm">
                                Cancel
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Name <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            {...register('name')}
                            className="form-control"
                          />
                        </div>
                        {errors.name && (
                          <div className="text-red">{errors.name.message}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Phone Number <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            {...register('storePhoneNumber')}
                            className="form-control"
                          />
                        </div>
                        {errors.storePhoneNumber && (
                          <div className="text-red">
                            {errors.storePhoneNumber.message}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            {...register('storeEmail')}
                            className="form-control"
                          />
                        </div>
                        {errors.storeEmail && (
                          <div className="text-red">
                            {errors.storeEmail.message}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Address <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            {...register('address')}
                            className="form-control"
                          />
                        </div>
                        {errors.address && (
                          <div className="text-red">
                            {errors.address.message}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Postcode <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            {...register('postcode')}
                            className="form-control"
                          />
                        </div>
                        {errors.postcode && (
                          <div className="text-red">
                            {errors.postcode.message}
                          </div>
                        )}
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <input
                            type="text"
                            {...register('description')}
                            className="form-control"
                          />
                        </div>
                        {errors.description && (
                          <div className="text-red">
                            {errors.description.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : id ? (
                    'Edit Store'
                  ) : (
                    'Add New Store'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreModal;
