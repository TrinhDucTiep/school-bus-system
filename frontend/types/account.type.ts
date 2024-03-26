interface IStudent {
    id: number;
    name: string | null;
    avatar: string | null;
    dob: string | null;
    phoneNumber: string | null;
    parent_id: number;
    created_at: string;
    updated_at: string;
}

interface IParent {
    id: number;
    name: string | null;
    avatar: string | null;
    dob: string | null;
    phoneNumber: string | null;
    created_at: string;
    updated_at: string;
    students: IStudent[] | null;
}


interface IGetListParentParams {
    id: number | null;
    name: string | null;
    dob: string | null;
    page: number | null;
    size: number | null;
    sort: string | null;
    sortBy: '-createdAt' | '-updatedAt' | 'createdAt' | 'updatedAt' | null;
    searchBy: 'PARENT_NAME' | 'STUDENT_NAME';
}