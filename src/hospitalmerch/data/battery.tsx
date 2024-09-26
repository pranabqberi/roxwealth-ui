import axios from 'axios';
import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';
export type Batteries = {
  cellBrand: string;
  cellCapacity: string;
  cellQuantity: number;
  cellType: string;
  color: string; // Renamed from 'colour' to match the provided data
  compatibleDevices: string[]; // Renamed from 'compatibleDevice' to match the provided data
  dimensions: string;
  id: string;
  medicalEquipmentName: string;
  modelNumber: string;
  otherCompatibleModels: string[];
  pictureUrl: string;
  price: number;
  productName: string;
  isEnabled: boolean;
  isDeleted: boolean;
};

const getBatteries = async () => {
  const URL = 'https://engine.qberi.com/api/allBatteryDetails';
  const sessionToken = localStorage.getItem('sessionToken');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionToken}`
  };

  const response = await axios.get(URL, { headers });

  if (
    response.status !== 200 &&
    response.status !== 201 &&
    response.status !== 202
  ) {
    throw new Error('Failed to fetch batteries');
  }

  const battery_list: any = [];
  response.data.forEach((battery: any) => {
    battery_list.push({
      cellBrand: battery.cellBrand,
      cellCapacity: battery.cellCapacity,
      cellQuantity: battery.cellQuantity,
      cellType: battery.cellType,
      color: battery.colour,
      compatibleDevices: battery.compatibleDevice,
      dimensions: battery.dimensions,
      id: battery.id,
      medicalEquipmentName: battery.medicalEquipmentName,
      modelNumber: battery.modelNumber,
      otherCompatibleModels: battery.otherCompatibleModels,
      pictureUrl: battery.pictureUrl,
      price: battery.price,
      productName: battery.productName,
      isEnabled: battery.isEnabled,
      isDeleted: battery.isDeleted
    });
  });

  return battery_list;
};

export default getBatteries;
