import { InputHTMLAttributes, useState } from 'react'
import { useController, UseControllerProps, FieldValues, FieldPath } from 'react-hook-form'

export type InputNumberProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    classNameInput?: string
    classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
    UseControllerProps<TFieldValues, TName>

function InputV2<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
    const {
        type,
        onChange,
        className,
        classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
        classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
        value = '',
        ...rest
    } = props
    const { field, fieldState } = useController(props)
    const [localValue, setLocalValue] = useState<string>(field.value)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueFromInput = event.target.value
        const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
        if (numberCondition || type !== 'number') {
            // Cập nhât localValue State
            setLocalValue(valueFromInput)

            // goi field.onChange để cập nhật vào state React hook form
            field.onChange(event)

            // Thực thi onChange callback từ bên ngoài truyền vào props
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onChange && onChange(event)
        }
    }
    return (
        <div className={className}>
            <input
                className={classNameInput}
                {...rest}
                {...field}
                onChange={handleChange}
                value={value || localValue}
            />
            <div className={classNameError}>{fieldState.error?.message}</div>
        </div>
    )
}
export default InputV2
