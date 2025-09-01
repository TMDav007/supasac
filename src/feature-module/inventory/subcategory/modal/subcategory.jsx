import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSubCategoryQuery,
} from '../../../../core/redux/api/admin/inventoryAPISlice';
import { subcategorySchema } from '../../../../utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import DefaultEditor from 'react-simple-wysiwyg';
import Select from 'react-select';

const SubCategoryModal = () => {
  const { id } = useParams();
  const isEditModal = !!id;
  const navigate = useNavigate();
  const { data: subcategory } = isEditModal && useGetSubCategoryQuery(id);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(subcategorySchema),
  });

  const [createSubCategory] = useCreateSubCategoryMutation();

  const [editSubCategory] = useEditSubCategoryMutation(id);

  const { data: categories } = useGetAllCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.data ?? [],
    }),
  });

  const categoryOptions = useMemo(() => {
    return categories
      .filter((category) => category?.name)
      .map((category) => ({
        label: category.name,
        value: category,
      }));
  }, [categories.length]);

  useEffect(() => {
    if (subcategory?.data) {
      let { name, category, description } = subcategory.data;
      const { code: category_code } = category;
      reset({
        name,
        description,
        category_code,
        category_name: category.name,
      });
    }
  }, [subcategory?.data, reset]);

  const onSubmit = async (formData) => {
    delete formData['category_code'];
    try {
      isEditModal
        ? await editSubCategory({ id, data: formData }).unwrap()
        : await createSubCategory(formData).unwrap();
      toast.success('subcategory created successfully', {
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
                    <h4>{id ? 'Edit Sub Category' : 'Add Sub Category'}</h4>
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
                      {/* <div className="add-image-upload">
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
                      </div> */}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Category<span className="text-danger ms-1">*</span>
                      </label>

                      <Controller
                        name="category_name"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={categoryOptions}
                            value={
                              categoryOptions.find(
                                (opt) => opt.value.name === field.value
                              ) || null
                            }
                            onChange={(selected) => {
                              field.onChange(selected.value.name);
                              setValue('category_code', selected.value.code);
                            }}
                          />
                        )}
                      />
                      {errors.category_name && (
                        <div className="text-red">
                          {errors.category_name.message}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Sub Category
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        {...register('name')}
                      />
                      {errors.name && (
                        <div className="text-red">{errors.name.message}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Category Code
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        {...register('category_code')}
                      />
                      {errors.category_code && (
                        <div className="text-red">
                          {errors.category_code.message}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Description<span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        {...register('description')}
                      />
                      {errors.description && (
                        <div className="text-red">
                          {errors.description.message}
                        </div>
                      )}
                    </div>
                    <div className="mb-0">
                      {/* <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                        <span className="status-label">Status</span>
                        <input
                          type="checkbox"
                          id="user2"
                          className="check"
                          defaultChecked
                        />
                        <label htmlFor="user2" className="checktoggle" />
                      </div> */}
                    </div>

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
                        className="btn btn-primary fs-13 fw-medium p-2 px-3"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : isEditModal ? (
                          'Edit Subcategory'
                        ) : (
                          ' Create Subcategory'
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
};

export default SubCategoryModal;
