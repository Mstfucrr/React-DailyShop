// NodeTemplate.tsx
import React from 'react'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { TreeNode } from 'primereact/treenode'

interface NodeTemplateProps {
  node: TreeNode
  setUpdateCategory: (category: any) => void
  handleDeleteCategory: (categoryId: number) => void
}

const NodeTemplate: React.FC<NodeTemplateProps> = ({ node, setUpdateCategory, handleDeleteCategory }) => {
  return (
    <div className='flex w-full flex-row flex-wrap items-center justify-between'>
      <span className='p-2'>{node.label}</span>
      <div className='flex gap-x-3'>
        <Button
          className='p-button-rounded p-button-info'
          icon='pi pi-pencil'
          onClick={() => {
            setUpdateCategory(node.data)
          }}
        />

        <Button
          className='p-button-rounded p-button-danger'
          icon='pi pi-trash'
          onClick={() => {
            let co = confirmDialog({
              message: (
                <div className='flex flex-wrap items-center gap-2'>
                  <h4 className='text-lg font-bold'> {node.data.name} </h4>
                  <span className='text-sm text-gray-500'> Kategoriyi silmek istediğinize emin misiniz? </span>
                </div>
              ),
              header: 'Kategori Silme',
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Sil',
              acceptIcon: 'pi pi-trash',
              acceptClassName: 'p-button-danger',
              closable: false,
              rejectLabel: 'iptal',
              rejectIcon: 'pi pi-times',
              accept: () => handleDeleteCategory(node.data.id),
              reject: () => co.hide()
            })
          }}
        />
      </div>
    </div>
  )
}

export default NodeTemplate
