interface IRequestRegistration {
    parentId: number;
    studentId: number;
    status: string;
    address: string;
    latitude: number;
    longitude: number;
}

interface IAddRequestRegistrationRequest {
    studentIds: number[];
    address: string;
    latitude: number | null;
    longitude: number | null;
}

interface IGetRequestRegistrationParams {
}

interface IRequestRegistrationResponse {
    parent: IParent;
    student: IStudent;
    requestRegistration: IRequestRegistration;
}