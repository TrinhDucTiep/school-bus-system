interface IEmployee {
    id: number;
    accountID: number;
    name: string;
    avatar: string;
    dob: string;
    phoneNumber: string;
    busID: number;
    busNumberPlate: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface IEmployeeTable {
    employee: IEmployee;
    bus: IBus;
}

interface IGetListEmployeeParams {
    name: string | null;
    phoneNumber: string | null;
    dob: string | null;
    busID: number | null;
    busNumberPlate: string | null;
    role: string | null;
    page: number | null;
    size: number | null;
    sort: string | null;
}

interface IAddEmployee {
    id: number;
    accountID: number;
    name: string;
    avatar: string;
    dob: string;
    phoneNumber: string;
    busID: number;
    busNumberPlate: string;
    role: string;
    createdAt: string;
    updatedAt: string;

    username: string;
    password: string;
    confirmPassword: string;
}
