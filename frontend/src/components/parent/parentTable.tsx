import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { ParentRenderCell } from './parent-render-cell';
import { useGetListParent } from '@/services/accountService';
import { ExportIcon } from '../icons/export-icon';
import { AddParent } from './add-parent';


const columns = [
    { name: 'HỌ VÀ TÊN', uid: 'name' },
    { name: 'NGÀY SINH', uid: 'dob' },
    { name: "SỐ ĐIỆN THOẠI", uid: "phoneNumber" },
    { name: 'ACTIONS', uid: 'actions' },
];
const ParentTable: React.FC = () => {

    const [page, setPage] = React.useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [selectParent, setSelectedParent] = React.useState<IParent | null>(null);
    const handleOpenChangeParent = () => onOpenChange();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const handleOpenChangeDeleteParent = () => onOpenChangeDelete();


    const { data: parentList, isLoading: parentLoading, error: parentError } = useGetListParent({
        id: null,
        name: null,
        dob: null,
        page: null,
        size: null,
        sort: null,
        sortBy: null,
        searchBy: 'PARENT_NAME'
    });
    const bottomParent = (
        <div className="py-2 px-2 flex w-full justify-center items-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={parentList?.result.totalPages || 1}
                onChange={setPage}
            />
        </div>
    );
    return (
        <>
            <h3 className="text-xl font-semibold">Danh sách Phụ Huynh</h3>
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap w-2/3 m-1 mb-8">
                    <Input
                        classNames={{
                            input: "w-full",
                            mainWrapper: "w-full",
                        }}
                        size='sm'
                        label="Tên phụ huynh"
                    />
                    <Input
                        classNames={{
                            input: "w-full",
                            mainWrapper: "w-full",
                        }}
                        size='sm'
                        label="Số điện thoại"
                    />
                </div>
                <div className="flex flex-row flex-wrap m-1 mb-8">

                <AddParent></AddParent>
                </div>
            </div>
            <Table aria-label="Example table with custom cells"
                bottomContent={bottomParent}
            >
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
                {parentList?.result && parentList.result.content ? (
                    <TableBody items={parentList.result.content}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {ParentRenderCell({
                                            parent: item as IParent,
                                            columnKey: columnKey,
                                            handleOpenChange: () => { handleOpenChangeParent() },
                                            setSelectedParent: (parent: IParent) => setSelectedParent(parent),
                                            handleOpenChangeDelete: () => { handleOpenChangeDeleteParent() },
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

export default ParentTable;