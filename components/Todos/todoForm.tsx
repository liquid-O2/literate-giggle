'use client'
import Input from '../Form/input'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as Icon from 'react-feather'
import { addTodo, updateTodo } from '../../firebase/firestoreHandlers'
import { Dispatch, SetStateAction } from 'react'

export type inputTodo = {
  title: string
}

type todoProps = {
  id: string
  update: boolean
  formTitle?: string
  setIsModalVisible?: Dispatch<SetStateAction<boolean>>
}

const TodoForm = ({ update, id, formTitle, setIsModalVisible }: todoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<inputTodo>({ criteriaMode: 'all' })
  const onSubmit: SubmitHandler<inputTodo> = (data) => {
    update ? (updateTodo(id, data.title), setIsModalVisible!(false)) : addTodo(data), resetField('title')
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap'>
          <div className='input-wrapper text-left'>
            <Input
              type='text'
              placeholder='Enter your todo'
              defaultValue={update ? `${formTitle}` : ''}
              className={errors.title ? 'border-red-400' : 'border-neutral-600'}
              customAttr={{ ...register('title', { required: 'You must enter a todo item' }) }}
            />
            <div className='icon'>
              <Icon.PenTool size={20} className={errors.title ? 'stroke-red-400' : 'stroke-neutral-100'} />
            </div>
            {errors.title && <p className='text-red-400 text-sm mt-1'>{`${errors.title?.message}`}</p>}
          </div>

          <button
            type='submit'
            className='bg-neutral-200 py-2 px-4 ml-3 text-lg rounded-lg text-neutral-900 shadow-lg shadow-neutral-200/20 font-bold hover:bg-neutral-300 h-[56px]'>
            {update ? 'Update Todo' : 'Add Todo'}
          </button>
        </form>
      </div>
    </>
  )
}

export default TodoForm
