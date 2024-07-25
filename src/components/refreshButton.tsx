import { Button } from 'primereact/button'

const RefreshButton = (refreshFunction: () => Promise<void>) => (
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
