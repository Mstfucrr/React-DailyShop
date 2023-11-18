import { TreeNode } from "primereact/treenode";
import { ICategory } from "../shared/types";

// for tree select model converter

export const convertCategoriesToTreeSelectModel = (categories: ICategory[], parentKey?: string): TreeNode[] => {
    const treeSelectModel: TreeNode[] = [];
    categories.forEach((category) => {
        const key = parentKey ? `${parentKey}-${category.id}` : `${category.id}`;
        treeSelectModel.push({
            key,
            label: category.name,
            children: category.subCategories ? convertCategoriesToTreeSelectModel(category.subCategories, key) : undefined,
            data: category
        });
    });
    return treeSelectModel;
};

export const findCategoryByKeyInTreeSelectModel = (TreeNodes: TreeNode[], key: string): ICategory | undefined => {

    for (const node of TreeNodes) {
        if (node.key === key) {
            return node.data as ICategory;
        }
        if (node.children) {
            const result = findCategoryByKeyInTreeSelectModel(node.children, key);
            if (result !== undefined) {
                return result;
            }
        }
    }
    return undefined;
}
