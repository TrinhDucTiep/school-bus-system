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
    Pagination,
    useDisclosure,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { BusRenderCell } from '@/components/bus/bus-render-cell';
import { AddBus } from '@/components/bus/add-bus';
import { ExportIcon } from '@/components/icons/export-icon';
import { useGetListBus, useUpdateBus, useDeleteBus } from '@/services/busService';
import CustomSkeleton from '@/components/custom-skeleton';
import { SubmitHandler, useForm } from "react-hook-form";

const VehiclesPage: React.FC = () => {
    const [page, setPage] = React.useState(1);

    // define for bus-render-cell.tsx
    const updateBusMutation = useUpdateBus();
    const deleteBusMutation = useDeleteBus();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IBus>();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const columns = [
        { name: 'BIỂN SỐ XE', uid: 'numberPlate' },
        { name: 'SỐ CHỖ NGỒI', uid: 'seatNumber' },
        { name: 'TRẠNG THÁI', uid: 'status' },
        { name: 'TÀI XẾ', uid: 'driverName' },
        { name: 'PHỤ XE', uid: 'driverMateName' },
        { name: 'ACTIONS', uid: 'actions' },
    ];

    const { data, isLoading, isError } = useGetListBus({
        numberPlate: null,
        seatNumber: null,
        status: null,
        driverName: null,
        driverId: null,
        driverMateName: null,
        driverMateId: null,
        page: page - 1,
        size: 10,
        sort: "createdAt",
    });

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

    if (isLoading) {
        return <div className="py-2 px-2 flex w-full justify-center items-center">
            <CustomSkeleton />
        </div>;
    }

    if (isError) {
        return <div>Error!</div>; // replace with your actual error component
    }

    return (
        <div>
            <div className="my-8 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Danh sách xe bus</h3>
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap w-2/3">
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
                            label="Số chỗ ngồi"
                        />
                        <Input
                            classNames={{
                                input: "w-full",
                                mainWrapper: "w-full",
                            }}
                            size='sm'
                            label="Trạng thái"
                        />
                        <Input
                            classNames={{
                                input: "w-full",
                                mainWrapper: "w-full",
                            }}
                            size='sm'
                            label="Tài xế"
                        />
                        <Input
                            classNames={{
                                input: "w-full",
                                mainWrapper: "w-full",
                            }}
                            size='sm'
                            label="Phụ xe"
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
                                <TableRow key={item.bus.id}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {BusRenderCell({
                                                bus: item as IBusTable, columnKey: columnKey, updateBusMutation, deleteBusMutation,
                                                register,
                                                handleSubmit,
                                                watch,
                                                errors,
                                            })}
                                        </TableCell>

                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    ) : (
                        <div>No data available</div> // replace with your actual fallback component
                    )}
                </Table>
            </div>

            {/* modal for edit button */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Cập nhật xe Bus
                    </ModalHeader>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handleUpdateBus)}
                    >
                        <ModalBody>
                            <Input
                                label="Biển số xe"
                                variant="bordered"
                                {...register("numberPlate", { required: true })}
                                defaultValue={bus.bus.numberPlate}
                            />
                            <Input
                                label="Số chỗ ngồi"
                                variant="bordered"
                                {...register("seatNumber", {
                                    required: true,
                                    validate: (value: any) => parseInt(value, 10) > 0 || 'Số chỗ ngồi không hợp lệ'
                                })}
                                defaultValue={bus.bus.seatNumber}
                            />
                            {errors.seatNumber && errors.seatNumber.message && <p className="text-red-500 text-sm">{`*${errors.seatNumber.message}`}</p>}
                            <Input
                                label="Trạng thái"
                                variant="bordered"
                                {...register("status", { required: true })}
                                defaultValue={bus.bus.status}
                            />
                            <Input
                                label="Tài xế"
                                variant="bordered"
                                {...register("driverId", { required: false })}
                                defaultValue={bus.bus.driverId}
                            />
                            <Input
                                label="Phụ xe"
                                variant="bordered"
                                {...register("driverMateId", { required: false })}
                                defaultValue={bus.bus.driverMateId}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" onPress={onOpenChange}>
                                Hủy
                            </Button>
                            <Button color="primary" onPress={onOpenChange} type="submit">
                                Cập nhật
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default VehiclesPage;