import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, useDisclosure, Button, Input } from '@nextui-org/react';
import React from 'react';
import { ParentRenderCell } from './parent-render-cell';
import { useGetListParent, useGetListStudent } from '@/services/accountService';
import { StudentRenderCell } from './student-render-cell';
import { ExportIcon } from '../icons/export-icon';


const columns = [
    { name: 'HỌ VÀ TÊN', uid: 'name' },
    { name: 'NGÀY SINH', uid: 'dob' },
    { name: "SỐ ĐIỆN THOẠI", uid: "phoneNumber" },
    { name: 'ACTIONS', uid: 'actions' },
];
const StudentTable: React.FC = () => {


    const [selectStudent, setSelectedStudent] = React.useState<IStudent | null>(null);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleOpenChangeStudent = () => onOpenChange();

    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const handleOpenChangeDeleteStudent = () => onOpenChangeDelete();


    const { data, isLoading, error } = useGetListStudent({
        id: null,
        name: null,
        dob: null,
        phoneNumber: null,
        studentClass: null,
        parent_id: null,
        page: null,
        size: null,
        sort: null,
        sortBy: '-createdAt'
    });
    const [page, setPage] = React.useState(1);
    const bottomTable = (
        <div className="py-2 px-2 flex w-full justify-center items-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={data?.result.totalPages || 1}
                onChange={setPage}
            />
        </div>
    );
    return (
        <>
            <h3 className="text-xl font-semibold">Danh sách Học Sinh</h3>
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap w-2/3 m-1 mb-8">
                    <Input
                        classNames={{
                            input: "w-full",
                            mainWrapper: "w-full",
                        }}
                        size='sm'
                        label="Biển số xe"
                    />
                    <Input
                        classNames={{
                            input: "w-full",
                            mainWrapper: "w-full",
                        }}
                        size='sm'
                        label="Biển số xe"
                    />
                </div>
                <div className="flex flex-row flex-wrap m-1 mb-8">

                    <Button color="primary" startContent={<ExportIcon />}>
                        Xuất file CSV
                    </Button>
                </div>
            </div>
            <Table aria-label="Example table with custom cells"
                bottomContent={bottomTable}>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            hideHeader={column.uid === "actions"}
                            align={column.uid === "actions" ? "center" : "start"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                {data?.result && data.result.content ? (
                    <TableBody items={data.result.content}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {StudentRenderCell({
                                            data: item as IStudent,
                                            columnKey: columnKey,
                                            handleOpenChange: () => { handleOpenChangeStudent() },
                                            setSelectedStudent: (student: IStudent) => setSelectedStudent(student),
                                            handleOpenChangeDelete: () => { handleOpenChangeDeleteStudent() },
                                        })}
                                    </TableCell>

                                )}
                            </TableRow>
                        )}
                    </TableBody>
                ) : (
                    <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                )}
            </Table>
        </>

    );
};

export default StudentTable;