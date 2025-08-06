import { Request, Response, NextFunction } from 'express';
import {getAllItems, createItem, updateItem, getItemById, deleteItem} from "../../services/item.service";
import { Item, ItemInput } from '../model/itemModel';
import { errorMessages } from '../error/errorMessage';


export const getAllItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}

export const createItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price } = req.body as ItemInput;

    const newItem = await createItem({ name, description, price });

    res.status(200).json(newItem);
  } catch (err) {
    next(err);
  }
}


export const updateItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => { 
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedItem = await updateItem(parseInt(id, 10), { name, description, price });
    if (!updatedItem) {
      res.status(404).json({ error: errorMessages.ITEM_NOT_FOUND });
      return;
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    next(err); 
  }
};


export const getItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: errorMessages.INVALID_ID });
      return;
    }
    // Fetch the item by ID
    const item = await getItemById(Number(id));
    if (!item) {
      res.status(404).json({ error: errorMessages.ITEM_NOT_FOUND });
      return;
    }

    res.status(200).json(item);
  } catch (err) {
    next(err); 
  }
};


export const deleteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: errorMessages.INVALID_ID });
      return;
    }
    const deleted = await deleteItem(Number(id));
    if (!deleted) {
      res.status(404).json({ error: errorMessages.ITEM_NOT_FOUND });
      return;
    }

    res.status(200).json({ message: `Item with ID ${id} deleted successfully.` });
  } catch (err) {
    next(err); // Forward the error to the centralized error handler
  }
};