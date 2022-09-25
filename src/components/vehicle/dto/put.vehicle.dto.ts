export interface IPutVehicleDto {
  name: string;
  year: number;
  brandId: number; // Ref
  model: string;
  colorsId: number[]; // Ref
}
