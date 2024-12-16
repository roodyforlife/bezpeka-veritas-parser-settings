import React from 'react'
import { RozetkaCategoryViewer } from './components/RozetkaCategoryViewer/RozetkaCategoryViewer'
import { changeCategories, getCategories } from '../../http/rozetkaApi'

export const Rozetka = () => {
  return (
    <>
    <RozetkaCategoryViewer fetchFunction={getCategories} saveFunction={changeCategories}></RozetkaCategoryViewer>
    </>
  )
}
