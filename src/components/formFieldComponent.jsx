import { useEffect, useState } from 'react'

export const InputField = (props) => {
  const {
    register,
    formState,
    id,
    type = 'text',
    label,
    placeholder,
    defaultValue,
    className,
    minLength,
    maxLength,
    min,
    max,
    showError = true,
    disabled,
    readOnly,
    value,
    defaultChecked,
    onChange = null,
    onClick = null,
    onBlur,
  } = props
  const [error, setError] = useState(null)
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id].message
    ) {
      setError(formState?.errors[id].message)
    }
    return () => {
      setError(null)
    }
  }, [formState])

  return (
    <>
      {label && (
        <div className="block pb-1">
          <label htmlFor={id} className="font-medium">
            {label}
          </label>
        </div>
      )}
      <div className=" relative">
        <input
          {...register(id)}
          {...{
            id,
            type,
            className: `ant-input input-field ${className}
            } ${error ? 'ant-input-status-error' : ''}`,
            defaultValue,
            placeholder,
            minLength,
            maxLength,
            min,
            max,
            disabled,
            readOnly,
            value,
            defaultChecked,
          }}
          onClick={(e) => {
            if (onClick) {
              onClick(e)
            }
          }}
        />
      {showError && error && (
        <span className="ant-typography ant-typography-danger block mt-1">
          {error}
        </span>
      )}
      </div>
    </>
  )
}
