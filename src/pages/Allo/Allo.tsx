import React from 'react'
import { AlloCategoryViewer } from './components/AlloCategoryViewer/AlloCategoryViewer'
import { changeCategories, getCategories } from '../../http/alloApi'

export const Allo = () => {
  return (
    <>
    <AlloCategoryViewer fetchFunction={getCategories} saveFunction={changeCategories}></AlloCategoryViewer>
    </>
  )
}
