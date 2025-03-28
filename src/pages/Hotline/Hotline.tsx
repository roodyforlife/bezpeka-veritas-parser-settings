import React from 'react'
import { changeCategories, getCategories } from '../../http/hotlineApi'
import { HotlineCategoryViewer } from './components/HotlineCategoryViewer/HotlineCategoryViewer'

export const Hotline = () => {
  return (
    <>
    <HotlineCategoryViewer fetchFunction={getCategories} saveFunction={changeCategories}></HotlineCategoryViewer>
    </>
  )
}
