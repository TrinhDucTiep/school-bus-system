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
    Select,
    SelectItem,
    select,
    Autocomplete,
    AutocompleteItem,
    Avatar,
} from "@nextui-org/react";
import { BusRenderCell } from '@/components/bus/bus-render-cell';
import { AddBus } from '@/components/bus/add-bus';
import { ExportIcon } from '@/components/icons/export-icon';
import { useGetListBus, useUpdateBus, useDeleteBus } from '@/services/busService';
import CustomSkeleton from '@/components/custom-skeleton';
import { SubmitHandler, set, useForm } from "react-hook-form";
import { bus_status_map, EmployeeRole } from '@/util/constant';
import { useGetAvailableEmployees } from '@/services/employeeService';


const VehiclesPage: React.FC = () => {
    const [page, setPage] = React.useState(1);

    // define for bus-render-cell.tsx

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const updateBusMutation = useUpdateBus(onOpenChange);
    const deleteBusMutation = useDeleteBus(onOpenChangeDelete);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IBus>();
    const handleUpdateBus: SubmitHandler<IBus> = (data) => updateBusMutation.mutate(data);
    const handleDeleteBus = (id: number) => deleteBusMutation.mutate(id);
    const [selectedBus, setSelectedBus] = React.useState<IBusTable | null>(null);
    const handleOpenChange = () => onOpenChange();
    const handleOpenChangeDelete = () => onOpenChangeDelete();


    // search filters
    const [numberPlate, setNumberPlate] = React.useState('');
    const [seatNumber, setSeatNumber] = React.useState<number | null>(null);
    const [statuses, setStatuses] = React.useState<string | null>('');
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
        numberPlate: numberPlate ? numberPlate : null,
        seatNumber: seatNumber,
        statuses: statuses,
        driverName: driverName ? driverName : null,
        driverId: null,
        driverMateName: driverMateName ? driverMateName : null,
        driverMateId: null,
        page: page - 1,
        size: 10,
        sort: "-createdAt",
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

    const [queryDriver, setQueryDriver] = React.useState<string | null>(null);
    const { data: availableDrivers, isLoading: isLoadingDrivers, error: isErrorDrivers } = useGetAvailableEmployees(EmployeeRole.DRIVER, queryDriver);

    const [queryDriverMate, setQueryDriverMate] = React.useState<string | null>(null);
    const { data: availableDriverMates, isLoading: isLoadingDriverMates, error: isErrorDriverMates } = useGetAvailableEmployees(EmployeeRole.DRIVER_MATE, queryDriverMate);


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

                        <Select
                            label="Trạng thái"
                            placeholder='Chọn trạng thái'
                            selectionMode='multiple'
                            value={statuses?.split(',')}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                const newValue = event.target.value;
                                setStatuses(newValue);
                            }}
                        >
                            {bus_status_map.map((status) => (
                                <SelectItem key={status.value} value={status.value}
                                >
                                    {status.label}
                                </SelectItem>
                            ))
                            }
                        </Select>

                        <Input
                            classNames={{
                                input: "w-full",
                                mainWrapper: "w-full",
                            }}
                            size='sm'
                            label="Tài xế"
                            value={driverName}
                            onValueChange={(newValue) => setDriverName(newValue)}
                        />
                        <Input
                            classNames={{
                                input: "w-full",
                                mainWrapper: "w-full",
                            }}
                            size='sm'
                            label="Phụ xe"
                            value={driverMateName}
                            onValueChange={(newValue) => setDriverMateName(newValue)}
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

            {
                isLoading ? <CustomSkeleton /> :
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
                                    <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
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
                                            label="id"
                                            variant="bordered"
                                            className='hidden'
                                            {...register("id", { required: true })}
                                            defaultValue={selectedBus?.bus.id?.toString()}
                                        />

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

                                        <Select
                                            label="Trạng thái"
                                            placeholder="Chọn trạng thái"
                                            selectionMode="single"
                                            value={selectedBus?.bus.status}
                                            defaultSelectedKeys={[bus_status_map.find((status) => status.value === selectedBus?.bus.status)?.value || '']}
                                            {...register("status", { required: true })}
                                        >
                                            {bus_status_map.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Autocomplete
                                            variant="bordered"
                                            label="Chọn tài xế"
                                            onInputChange={(value) => {
                                                setQueryDriver(value);
                                                if (value === '' || value === null || value === undefined) {
                                                    setValue("driverId", null);
                                                } else {
                                                }
                                            }}
                                            onSelectionChange={(selected) => {
                                                if (selected) {
                                                    setValue("driverId", Number(selected));
                                                }
                                            }}
                                            defaultItems={[... (availableDrivers?.result || []), selectedBus?.driver] || []}
                                            defaultInputValue={selectedBus?.driver?.name}
                                            defaultSelectedKey={selectedBus?.driver?.id?.toString()}
                                        >
                                            {(item) => {
                                                if (item) {
                                                    return (
                                                        <AutocompleteItem
                                                            key={item.id}
                                                            value={item.id}
                                                            textValue={item.name}
                                                        >
                                                            <div className="flex gap-2 items-center">
                                                                <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
                                                                <div className="flex flex-col">
                                                                    <span className="text-small">{item.name}</span>
                                                                    <span className="text-tiny text-default-400">{item.phoneNumber}</span>
                                                                </div>
                                                            </div>
                                                        </AutocompleteItem>
                                                    );
                                                } else {
                                                    // Return a default CollectionElement when item is undefined
                                                    return (
                                                        <AutocompleteItem
                                                            key="default"
                                                            value="default"
                                                            textValue="default"
                                                        >
                                                            <div className="flex gap-2 items-center">
                                                                <Avatar alt="default" className="flex-shrink-0" size="sm" src="default" />
                                                                <div className="flex flex-col">
                                                                    <span className="text-small">default</span>
                                                                    <span className="text-tiny text-default-400">default</span>
                                                                </div>
                                                            </div>
                                                        </AutocompleteItem>
                                                    );
                                                }
                                            }}
                                        </Autocomplete>

                                        <Autocomplete
                                            variant="bordered"
                                            label="Chọn phụ xe"
                                            onInputChange={(value) => {
                                                setQueryDriverMate(value);
                                                if (value === '' || value === null || value === undefined) {
                                                    setValue("driverMateId", null);
                                                } else {
                                                }
                                            }}
                                            onSelectionChange={(selected) => {
                                                if (selected) {
                                                    setValue("driverMateId", Number(selected));
                                                }
                                            }}
                                            defaultItems={[...(availableDriverMates?.result || []), selectedBus?.driverMate] || []}
                                            defaultInputValue={selectedBus?.driverMate?.name}
                                            defaultSelectedKey={selectedBus?.driverMate?.id?.toString()}
                                        >
                                            {(item) => {
                                                if (item) {
                                                    return (
                                                        <AutocompleteItem
                                                            key={item.id}
                                                            value={item.id}
                                                            textValue={item.name}
                                                        >
                                                            <div className="flex gap-2 items-center">
                                                                <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
                                                                <div className="flex flex-col">
                                                                    <span className="text-small">{item.name}</span>
                                                                    <span className="text-tiny text-default-400">{item.phoneNumber}</span>
                                                                </div>
                                                            </div>
                                                        </AutocompleteItem>
                                                    );
                                                } else {
                                                    // Return a default CollectionElement when item is undefined
                                                    return (
                                                        <AutocompleteItem
                                                            key="default"
                                                            value="default"
                                                            textValue="default"
                                                        >
                                                            <div className="flex gap-2 items-center">
                                                                <Avatar alt="default" className="flex-shrink-0" size="sm" src="default" />
                                                                <div className="flex flex-col">
                                                                    <span className="text-small">default</span>
                                                                    <span className="text-tiny text-default-400">default</span>
                                                                </div>
                                                            </div>
                                                        </AutocompleteItem>
                                                    );
                                                }
                                            }}
                                        </Autocomplete>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button variant="flat" color='danger' onPress={onOpenChange}>
                                            Hủy
                                        </Button>
                                        <Button color="primary" type="submit">
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


        </div >
    );
};

export default VehiclesPage;