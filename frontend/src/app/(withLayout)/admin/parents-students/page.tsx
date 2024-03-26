"use client";
import { BusRenderCell } from '@/components/bus/bus-render-cell';
import { ExportIcon } from '@/components/icons/export-icon';
import { ParentRenderCell } from '@/components/parent/parent-render-cell';
import { useGetListParent } from '@/services/accountService';
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import React from 'react';

const columns = [
    { name: 'HỌ VÀ TÊN', uid: 'name' },
    { name: 'NGÀY SINH', uid: 'dob' },
    { name: "SỐ ĐIỆN THOẠI", uid: "phoneNumber"},
    { name: 'ACTIONS', uid: 'actions' },
];
const ParentsStudentsPage: React.FC = () => {
    const [page, setPage] = React.useState(1);
    const { data, isLoading, error } = useGetListParent({
        id: null,
        name: null,
        dob: null,
        page: null,
        size: null,
        sort: null,
        sortBy: null,
        searchBy: 'PARENT_NAME'
    });
    const [selectParent, setSelectedParent] = React.useState<IParent | null>(null);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleOpenChange = () => onOpenChange();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const handleOpenChangeDelete = () => onOpenChangeDelete();
    const bottomContent = (
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
        <div className="flex flex-wrap items-center">
            <div className='w-1/2'>
                <h3 className="text-xl font-semibold">Danh sách Phụ Huynh</h3>
                <Table aria-label="Example table with custom cells"
                        bottomContent={bottomContent}
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
                        {data?.result && data.result.content ? (
                            <TableBody items={data.result.content}>
                                {(item) => (
                                    <TableRow key={item.id}>
                                        {(columnKey) => (
                                            <TableCell>
                                                {ParentRenderCell({
                                                    parent: item as IParent,
                                                    columnKey: columnKey,
                                                    handleOpenChange: () => { handleOpenChange() },
                                                    setSelectedParent: (parent: IParent) => setSelectedParent(parent),
                                                    handleOpenChangeDelete: () => { handleOpenChangeDelete() },
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
            </div>

            <div className='items-center flex-wrap md:flex-nowrap w-1/2'>
                <h3 className="text-xl font-semibold">Danh sách Học Sinh</h3>
                <Table aria-label="Example table with custom cells"
                        bottomContent={bottomContent}
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
                        {data?.result && data.result.content ? (
                            <TableBody items={data.result.content}>
                                {(item) => (
                                    <TableRow key={item.id}>
                                        {(columnKey) => (
                                            <TableCell>
                                                {ParentRenderCell({
                                                    parent: item as IParent,
                                                    columnKey: columnKey,
                                                    handleOpenChange: () => { handleOpenChange() },
                                                    setSelectedParent: (parent: IParent) => setSelectedParent(parent),
                                                    handleOpenChangeDelete: () => { handleOpenChangeDelete() },
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
            </div>
        </div>
    );
};

export default ParentsStudentsPage;