import { Button } from 'primereact/button'
import React from 'react'

type Props<T> = {
  refreshFunction: () => T
}

const RefreshButton = ({ refreshFunction }: Props<void>) => (
  <div className='my-3 flex justify-end'>
    <Button
      label='Yenile'
      icon='pi pi-refresh'
      className='p-button-raised p-button-rounded p-button-text'
      onClick={refreshFunction}
    />
  </div>
)

export default RefreshButton
