'use client'

import { useState, useContext } from 'react'
import { Minus, Plus } from 'react-feather'
import Button from '../../../components/button'
import { GlobalContext, Teas } from '../../../components/contextProvider'

type AddToCartProps = {
  image: { asset: { url: string; metadata: { lqip: string } } }
  name: string
  price: number
  slug: string
}
const AddToCart = ({ image, name, price, slug }: AddToCartProps) => {
  const [noOfItems, setNoOfItems] = useState(1)
  const { dispatch, cartDetails } = useContext(GlobalContext)

  const handleAddToCart = () => {
    let alreadyExist = false
    cartDetails.forEach((item: Teas) => {
      if (item.slug.current === slug) {
        alreadyExist = true
      }
    })
    if (!alreadyExist) {
      console.log('add')
      return dispatch({
        type: 'addItem',
        name,
        price,
        slug,
        image: image.asset.url,
        quantity: noOfItems,
      })
    } else {
      console.log('update')
      return dispatch({ type: 'updateQuantity', slug, quantity: noOfItems })
    }
  }

  return (
    <div className='mt-8 flex w-full flex-wrap gap-5 '>
      <div className='flex w-full max-w-full items-center justify-between rounded-full  border border-background/50 px-4 py-1 text-background md:w-fit'>
        <button
          disabled={noOfItems === 1}
          className=' flex min-h-[48px] min-w-[48px] items-center justify-center disabled:opacity-30'
          onClick={() => setNoOfItems((prev) => prev - 1)}>
          <Minus size={20} />
        </button>
        <p className='w-full px-6 text-center text-lg font-semibold leading-none'>{noOfItems}</p>
        <button
          className=' flex min-h-[48px] min-w-[48px] items-center justify-center'
          onClick={() => setNoOfItems((prev) => prev + 1)}>
          <Plus size={20} />
        </button>
      </div>
      <Button variant='secondary' className='w-full md:w-auto' onClick={() => handleAddToCart()}>
        ADD TO CART
      </Button>
    </div>
  )
}

export default AddToCart
