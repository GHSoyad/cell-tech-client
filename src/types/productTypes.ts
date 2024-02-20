import { Dispatch, SetStateAction, } from "react";

export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  stock: number;
  release_date: string;
  operating_system: string;
  storage_capacity: number;
  ram_capacity: number;
  screen_size: number;
  camera_quality: number;
  battery_capacity: number;
  status: boolean;
  image: string;
  sold: number;
}

export interface IModifyProductProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  modifyProduct?: IProduct | undefined
}