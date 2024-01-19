// NodeTemplate.tsx
import React from "react";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { TreeNode } from "primereact/treenode";

interface NodeTemplateProps {
  node: TreeNode;
  setUpdateCategory: (category: any) => void;
  handleDeleteCategory: (categoryId: number) => void;
}

const NodeTemplate: React.FC<NodeTemplateProps> = ({
  node,
  setUpdateCategory,
  handleDeleteCategory,
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full flex-wrap">
      <span className="p-2">{node.label}</span>
      <div className="flex gap-x-3">
        <Button
          className="p-button-rounded p-button-info"
          icon="pi pi-pencil"
          onClick={() => {
            setUpdateCategory(node.data);
          }}
        />

        <Button
          className="p-button-rounded p-button-danger"
          icon="pi pi-trash"
          onClick={() => {
            let co = confirmDialog({
              message: (
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-lg"> {node.data.name} </h4>
                  <span className="text-sm text-gray-500">
                    {" "}
                    Kategoriyi silmek istediğinize emin misiniz?{" "}
                  </span>
                </div>
              ),
              header: "Kategori Silme",
              icon: "pi pi-exclamation-triangle",
              acceptLabel: "Sil",
              acceptIcon: "pi pi-trash",
              acceptClassName: "p-button-danger",
              closable: false,
              rejectLabel: "iptal",
              rejectIcon: "pi pi-times",
              accept: () => handleDeleteCategory(node.data.id),
              reject: () => co.hide(),
            });
          }}
        />
      </div>
    </div>
  );
};

export default NodeTemplate;
