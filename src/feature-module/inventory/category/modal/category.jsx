import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categorySchema } from '../../../../utils/schema';
import { useForm } from 'react-hook-form';
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
} from '../../../../core/redux/api/admin/inventoryAPISlice';
import { toast } from 'react-toastify';

function CategoryModal() {
  const { id } = useParams();
  const isEditModal = !!id;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const [createCategory] = useCreateCategoryMutation();
  const [editCategory] = useEditCategoryMutation(id);

  const { data: category } = isEditModal && useGetCategoryQuery(id);

  const onSubmit = async (formData) => {
    try {
      isEditModal
        ? await editCategory({ id, data: formData }).unwrap()
        : await createCategory(formData).unwrap();
      toast.success('category created successfully', {
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
    if (category?.data) {
      const { name, code } = category.data;
      reset({
        name,
        code,
      });
    }
  }, [category, reset]);

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="add-category"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title">
                    <h4> {id ? 'Edit Category' : 'Add Category'}</h4>
                  </div>
                  <button
                    type="button"
                    className="close bg-danger text-white fs-16"
                    aria-label="Close"
                    onClick={() => navigate(-1)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="form-label">
                        Category Name{' '}
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        className="form-control"
                      />
                      {errors.name && (
                        <div className="text-red">{errors.name.message}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Category Code<span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('code')}
                        className="form-control"
                        disabled
                      />
                      {errors.code && (
                        <div className="text-red">{errors.code.message}</div>
                      )}
                    </div>
                    {/* <div className="mb-0">
                      <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                        <span className="status-label">
                          Status<span className="text-danger ms-1">*</span>
                        </span>
                        <input
                          type="checkbox"
                          id="user2"
                          className="check"
                          defaultChecked
                        />
                        <label htmlFor="user2" className="checktoggle" />
                      </div>
                    </div> */}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
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
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : isEditModal ? (
                          'Edit Category'
                        ) : (
                          ' Add Category'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryModal;
