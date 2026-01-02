import { forwardRef } from 'react'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'

interface InputGroupProps {
    label: string
    items?: {
        value: string
        label: string
    }[]
    type?: 'select' | 'input'
}

export const InputGroup = forwardRef<HTMLSelectElement, InputGroupProps>((props, ref) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            {props.type === 'select' ? (
                <>
                    <Label className='text-[#D4C2FF] text-xs mb-1'>{props.label}</Label>
                    <Select>
                        <SelectTrigger className='w-full h-14 bg-white border-0 rounded-lg text-slate-600'>
                            <SelectValue placeholder='Selecione' />
                        </SelectTrigger>
                        <SelectContent>
                            {props?.items?.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </>
            ) : (
                <>
                    <Label className='text-[#D4C2FF] text-xs mb-1'>{props.label}</Label>
                    <Input type='time' placeholder='Selecione' className='w-full h-14 bg-white border-0 rounded-lg block' />
                </>
            )
            }
        </div>
    )
})

