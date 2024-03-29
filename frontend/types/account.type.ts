
interface IStudentBase {
    id: number;
    name: string | null;
    avatar: string | null;
    dob: string | null;
    phoneNumber: string | null;
    studentClass: string | null;
    parent_id: number;
    created_at: string;
    updated_at: string;
}
interface IStudent extends IStudentBase {
    id: number;
}

interface IStudenAdd {
    name: string;
    avatar: string | null;
    dob: string;
    phoneNumber: string;
    studentClass: string;
    parent_id: number;
}

interface IParentBase {
    name: string | null;
    avatar: string | null;
    dob: string | null;
    phoneNumber: string | null;
    created_at: string;
    updated_at: string;
    students: IStudent[] | null;
}

interface IParent extends IParentBase {
    id: number;
}
interface IParentDetail extends IParentBase {
    id: number;
    username: string | null;
}

interface IParentAdd extends IParentBase {
    username: string | null;
    password: string | null;
    confirmPassword: string | null;
    studentIds: number[] | null;
}

interface IParentUpdate extends IParentBase {
    id: number;
    username?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
    studentIds: number[] | null;
}


interface IGetListParentParams {
    id: number | null;
    name: string | null;
    dob: string | null;
    page: number | null;
    size: number | null;
    phoneNumber: string | null;
    sort: string | null;
    sortBy: '-createdAt' | '-updatedAt' | 'createdAt' | 'updatedAt' | null;
    searchBy: 'PARENT_NAME' | 'STUDENT_NAME';
}


interface IGetListStudentParams {
    id: number | null;
    name: string | null;
    dob: string | null;
    phoneNumber: string | null;
    studentClass: string | null;
    parent_id: number | null;
    page: number | null;
    size: number | null;
    sort: string | null;
    sortBy: '-createdAt' | '-updatedAt' | 'createdAt' | 'updatedAt' | null;
}


