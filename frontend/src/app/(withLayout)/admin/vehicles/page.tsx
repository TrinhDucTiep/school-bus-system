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
    const handleUpdateBus: SubmitHandler<IBus> = (data) => updateBusMutation.mutate(data);
    const handleDeleteBus = (id: number) => deleteBusMutation.mutate(id);
    const [selectedBus, setSelectedBus] = React.useState<IBusTable | null>(null);
    const handleOpenChange = () => onOpenChange();

    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const handleOpenChangeDelete = () => onOpenChangeDelete();


    // search filters
    const [numberPlate, setNumberPlate] = React.useState('');
    const [seatNumber, setSeatNumber] = React.useState<number | null>(null);
    const [status, setStatus] = React.useState('');
    const [driverName, setDriverName] = React.useState('');
    const [driverId, setDriverId] = React.useState('');
    const [driverMateName, setDriverMateName] = React.useState('');
    const [driverMateId, setDriverMateId] = React.useState('');

    const columns = [
        { name: 'BIỂN SỐ XE', uid: 'numberPlate' },
        { name: 'SỐ CHỖ NGỒI', uid: 'seatNumber' },
        { name: 'TRẠNG THÁI', uid: 'status' },
        { name: 'TÀI XẾ', uid: 'driverName' },
        { name: 'PHỤ XE', uid: 'driverMateName' },
        { name: 'ACTIONS', uid: 'actions' },
    ];

    const { data, isLoading, isError } = useGetListBus({
        numberPlate: numberPlate,
        seatNumber: seatNumber,
        status: status,
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
                            value={numberPlate}
                            onValueChange={(newValue) => setNumberPlate(newValue)}
                        />
                        <Input
                            classNames={{
                                input: "w-full",
                                mainWrapper: "w-full",
                            }}
                            size='sm'
                            label="Số chỗ ngồi"
                            type="number"
                            value={seatNumber?.toString() || ''}
                            onValueChange={(newValue) => setSeatNumber(newValue ? parseInt(newValue) : null)}
                        />
                        <Input
                            classNames={{
                                input: "w-full",
                                mainWrapper: "w-full",
                            }}
                            size='sm'
                            label="Trạng thái"
                            value={status}
                            onValueChange={(newValue) => setStatus(newValue)}
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

            {isLoading ? <CustomSkeleton /> :
                <>
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
                                                        bus: item as IBusTable,
                                                        columnKey: columnKey,
                                                        handleOpenChange: () => { handleOpenChange() },
                                                        setSelectedBus: (bus: IBusTable) => setSelectedBus(bus),
                                                        handleOpenChangeDelete: () => { handleOpenChangeDelete() },
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
                                    {/* {false && ( */}
                                    <Input
                                        label="id"
                                        variant="bordered"
                                        className='hidden'
                                        {...register("id", { required: true })}
                                        defaultValue={selectedBus?.bus.id?.toString()}
                                    />
                                    {/* )} */}
                                    <Input
                                        label="Biển số xe"
                                        variant="bordered"
                                        {...register("numberPlate", { required: true })}
                                        defaultValue={selectedBus?.bus.numberPlate}
                                    />
                                    <Input
                                        label="Số chỗ ngồi"
                                        variant="bordered"
                                        {...register("seatNumber", {
                                            required: true,
                                            validate: (value: any) => parseInt(value, 10) > 0 || 'Số chỗ ngồi không hợp lệ'
                                        })}
                                        defaultValue={selectedBus?.bus.seatNumber?.toString()}
                                    />
                                    {errors.seatNumber && errors.seatNumber.message && <p className="text-red-500 text-sm">{`*${errors.seatNumber.message}`}</p>}
                                    <Input
                                        label="Trạng thái"
                                        variant="bordered"
                                        {...register("status", { required: true })}
                                        defaultValue={selectedBus?.bus.status}
                                    />
                                    <Input
                                        label="Tài xế"
                                        variant="bordered"
                                        {...register("driverId", { required: false })}
                                        defaultValue={selectedBus?.bus.driverId?.toString()}
                                    />
                                    <Input
                                        label="Phụ xe"
                                        variant="bordered"
                                        {...register("driverMateId", { required: false })}
                                        defaultValue={selectedBus?.bus.driverMateId?.toString()}
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


                    {/* delete modal */}
                    <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
                        <ModalContent>
                            {(onCloseDelete) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Xoá xe {selectedBus?.bus.numberPlate}</ModalHeader>
                                    <ModalBody>
                                        <p>
                                            Bạn có muốn xoá không?
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onCloseDelete}>
                                            Huỷ
                                        </Button>
                                        <Button color="primary" onPress={() => {
                                            if (selectedBus?.bus.id !== undefined) {
                                                handleDeleteBus(selectedBus.bus.id);
                                                onOpenChangeDelete();
                                            } else {
                                                console.error('selectedBus?.bus.id is undefined');
                                            }
                                        }}>
                                            Xác nhận
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            }


        </div>
    );
};

export default VehiclesPage;