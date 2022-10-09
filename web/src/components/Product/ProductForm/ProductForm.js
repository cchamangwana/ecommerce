import {
  Form,
  FormError,
  FieldError,
  SelectField,
  Label,
  TextField,
  NumberField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import CategoriesCell from 'src/components/CategoriesCell/CategoriesCell'
import { PickerInline } from 'filestack-react'
import { useState } from 'react'

const ProductForm = (props) => {
  const [url, setUrl] = useState(props?.image?.url)
  const { isAuthenticated, currentUser } = useAuth()

  const onSubmit = (data) => {
    const dataWithUrl = Object.assign(data, { url })
    console.log('dataWithUrl', dataWithUrl)
    // console.log(data)
    data.image = String(data.url)
    // remove url from data
    delete data.url
    props.onSave(data, props?.product?.id)

  }

  const onFileUpload = (response) => {
    // console.info(response)
    setUrl(String(response.filesUploaded[0].url))
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.product?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.product?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Price
        </Label>

        <NumberField
          name="price"
          defaultValue={props.product?.price}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="price" className="rw-field-error" />

        {/* <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>

        <TextField
          name="image"
          defaultValue={props.product?.image}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="image" className="rw-field-error" /> */}

        <PickerInline
          apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
          pickerOptions={{
            accept: 'image/*',
            maxFiles: 1,
            transformations: {
              crop: {
                // square crop
                aspectRatio: 1,
              },
            },
          }}
          // onSuccess={onFileUpload}
          onUploadDone={onFileUpload}
        />


        <Label
          name="isActive"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is active
        </Label>

        <CheckboxField
          name="isActive"
          defaultChecked={props.product?.isActive}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isActive" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <TextField
          name="userId"
          // defaultValue={props.product?.userId}
          defaultValue={String(currentUser?.id)}
          // placeholder={currentUser?.id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="categoryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Category
        </Label>

        <SelectField
          name="categoryId"
          defaultValue={props.product?.categoryId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          <CategoriesCell  isCreatePage="true"/>
        </SelectField>

        <FieldError name="categoryId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProductForm
