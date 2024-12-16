import React from 'react'
import { CustomInput } from '../../../../components/UI/CustomInput/CustomInput';
import { IRozetkaCategoryItem } from '../../../../interfaces/Rozetka/IRozetkaCategoryItem';
import cl from './RozetkaCategoryItem.module.css'

interface IProps {
    categoryItem: IRozetkaCategoryItem
    handleItemChange: (categoryItem: IRozetkaCategoryItem) => void;
}

export const RozetkaCategoryItem = ({categoryItem, handleItemChange}: IProps) => {

  return (
    <div className={cl.item}>
      <div className={cl.block}>
      <input type="checkbox" checked={categoryItem.checked} onChange={(e) => handleItemChange({...categoryItem, checked: e.target.checked})} />
      </div>
        <div className={cl.block}>
            <CustomInput value={categoryItem.name} disabled={true}></CustomInput>
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

