interface ICommonResponse<T> {
  code: string;
  message: string;
  result: T;
}

interface IBusTable {
  id: number;
  numberPlate: string;
  seatNumber: number;
  driverName: string;
  driverId: number;
  driverMateName: string;
  driverMateId: number;
  status: string;
}