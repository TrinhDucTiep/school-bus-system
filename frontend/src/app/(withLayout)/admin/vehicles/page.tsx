"use client";

import React from 'react';
import {
    Button,
    Input,
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { BusRenderCell } from '@/components/bus/bus-render-cell';
import { AddBus } from '@/components/bus/add-bus';
import { ExportIcon } from '@/components/icons/export-icon';

const VehiclesPage: React.FC = () => {
    const buses: IBusTable[] = [
        {
            id: 1,
            numberPlate: "AS 1234",
            seatNumber: 32,
            driverName: "John Doe",
            driverId: 1,
            driverMateName: "Jane Doe",
            driverMateId: 2,
            status: "active",
        },
        {
            id: 2,
            numberPlate: "AS 1235",
            seatNumber: 32,
            driverName: "John Doe",
            driverId: 1,
            driverMateName: "Jane Doe",
            driverMateId: 2,
            status: "active",
        },
        {
            id: 3,
            numberPlate: "AS 1236",
            seatNumber: 32,
            driverName: "John Doe",
            driverId: 1,
            driverMateName: "Jane Doe",
            driverMateId: 2,
            status: "active",
        },
        {
            id: 4,
            numberPlate: "AS 1237",
            seatNumber: 32,
            driverName: "John Doe",
            driverId: 1,
            driverMateName: "Jane Doe",
            driverMateId: 2,
            status: "active",
        },
    ];

    const columns = [
        { name: 'BIỂN SỐ XE', uid: 'numberPlate' },
        { name: 'SỐ CHỖ NGỒI', uid: 'seatNumber' },
        { name: 'TRẠNG THÁI', uid: 'status' },
        { name: 'TÀI XẾ', uid: 'driverName' },
        { name: 'PHỤ XE', uid: 'driverMateName' },
        { name: 'ACTIONS', uid: 'actions' },
    ];

    return (
        <div>
            <div className="my-8 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Danh sách xe bus</h3>
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <Input
                            classNames={{
                                input: "w-full",
                                mainWrapper: "w-full",
                            }}
                            placeholder="Tìm kiếm xe bus"
                        />
                    </div>
                    <div className="flex flex-row gap-3.5 flex-wrap">
                        <AddBus />
                        <Button color="primary" startContent={<ExportIcon />}>
                            Xuất file CSV
                        </Button>
                    </div>
                </div>
            </div>




            <div className="flex flex-col gap-4 mx-4">
                <Table aria-label="Example table with custom cells">
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
                    <TableBody items={buses}>
                        {(item) => (
                            <TableRow>
                                {(columnKey) => (
                                    <TableCell>
                                        {BusRenderCell({ bus: item as IBusTable, columnKey: columnKey })}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default VehiclesPage;