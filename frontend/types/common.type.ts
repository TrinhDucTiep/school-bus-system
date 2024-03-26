interface ICommonResponse<T> {
  code: string;
  message: string;
  result: T;
}

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
}

interface IBusTable {
  bus: IBus;
  driver: IEmployee;
  driverMate: IEmployee;
}

interface IBus {
  id: number;
  numberPlate: string;
  seatNumber: number;
  driverId: number;
  driverMateId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IEmployee {
  id: number;
  accountID: number;
  name: string;
  avatar: string;
  dob: string;
  phoneNumber: string;
  busID: number;
  createdAt: string;
  updatedAt: string;
}

interface IGetListBusParams {
  numberPlate: string | null;
  seatNumber: number | null;
  statuses: string | null;
  driverName: string | null;
  driverId: number | null;
  driverMateName: string | null;
  driverMateId: number | null;
  page: number | null;
  size: number | null;
  sort: string | null;
}