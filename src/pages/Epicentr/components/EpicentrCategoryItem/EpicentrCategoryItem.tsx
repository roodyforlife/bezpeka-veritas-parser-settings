import React from 'react'
import { IEpicentrCategoryItem } from '../../../../interfaces/Epicentr/IEpicentrCategoryItem';
import { CustomInput } from '../../../../components/UI/CustomInput/CustomInput';
import cl from './EpicentrCategoryItem.module.css'

interface IProps {
    categoryItem: IEpicentrCategoryItem
    handleItemChange: (categoryItem: IEpicentrCategoryItem) => void;
}

export const EpicentrCategoryItem = ({categoryItem, handleItemChange}: IProps) => {

  return (
    <div className={cl.item}>
      <div className={cl.block}>
      <input type="checkbox" checked={categoryItem.checked} onChange={(e) => handleItemChange({...categoryItem, checked: e.target.checked})} />
      </div>
        <div className={cl.block}>
            <CustomInput value={categoryItem.name} disabled={true}></CustomInput>
        </div>
        <div className={cl.block}>
            <CustomInput value={categoryItem.secondId || ""} onChange={(val) => handleItemChange({...categoryItem, secondId: val})}></CustomInput>
        </div>
        <div className={cl.block}>
            <CustomInput value={categoryItem.secondName || ""} onChange={(val) => handleItemChange({...categoryItem, secondName: val})}></CustomInput>
        </div>
        <div className={cl.block}>
            <CustomInput value={categoryItem.percent} type='number' onChange={(val) => handleItemChange({...categoryItem, percent: val})}></CustomInput>
        </div>
    </div>
  )
}

