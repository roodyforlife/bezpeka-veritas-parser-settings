import React from 'react'
import { getCategories, changeCategories } from '../../http/epicentrApi'
import { EpicentrCategoryViewer } from './components/EpicentrCategoryViewer/EpicentrCategoryViewer'

export interface IViewer {
  title: string,
}

export const Epicentr = () => {
  return (
    <EpicentrCategoryViewer fetchFunction={getCategories} saveFunction={changeCategories}></EpicentrCategoryViewer>
  )
}
