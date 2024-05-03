"use client";
import CustomSkeleton from '@/components/custom-skeleton';
import { SearchIcon } from '@/components/icons/searchicon';
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    RadioGroup,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Chip,
    Card,
    CardBody,
    Accordion,
    AccordionItem,
    Snippet,
    User,
    CardHeader,
    Select,
    SelectItem
} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { useGetAutoComplete, useGetSearch, useGetDirections } from '@/services/mapService';
import _, { set } from 'lodash';
import LocationIcon from '@/components/icons/location-icon';
import { convertStringInstantToDate } from '@/util/dateConverter';
import { useGetListManipulatePickupPoint, useUpdateEmployeeBus, useUpdateEmployeeRide } from '@/services/employee/employeeService';
import { bus_status_map, ride_status_map } from '@/util/constant';

const EmployeeMonitoring: React.FC = () => {

    // get auto complete
    const [autoCompleteQuery, setAutoCompleteQuery] = React.useState('');
    let autoCompleteParams: IAutoCompleteParams = {
        text: autoCompleteQuery,
        boundary: {
            country: 'VNM'
        }
    }
    const debounceSetAutoCompleteQuery = _.debounce((value: string) => setAutoCompleteQuery(value), 500);
    const { data: autoCompleteData, isLoading: autoCompleteLoading, error: autoCompleteError } = useGetAutoComplete(autoCompleteParams);
    const [selectedAutoCompleteData, setSelectedAutoCompleteData] = React.useState<IFeature | null>(null);

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/MapEmployee'),
        {
            loading: () => <CustomSkeleton />,
            ssr: false
        }
    ), [])

    // enable click point to map
    const [enableClickMap, setEnableClickMap] = React.useState<boolean>(false);

    // get manipulate pickup point
    const { data: manipulatePickupPointData, isLoading: manipulatePickupPointLoading, error: manipulatePickupPointError } = useGetListManipulatePickupPoint();

    // get directions
    const useGetManipulatePickupPointDirectionParams: IDirectionsParams = {
        coordinates: manipulatePickupPointData?.result?.pickupPointWithStudents.map((item) => [item.pickupPoint.longitude, item.pickupPoint.latitude]) || []
    }
    const { data: directionsGetResponse, isLoading: directionsLoading, error: directionsError } = useGetDirections(useGetManipulatePickupPointDirectionParams);

    // update bus
    const { isOpen: isUpdateBusModalOpen, onOpen: onOpenUpdateBusModal, onOpenChange: onOpenUpdateBusModalChange } = useDisclosure();
    const [status, setStatus] = React.useState<string>(manipulatePickupPointData?.result?.bus.status || '');
    let updateEmployeeBusRequest: IEmployeeUpdateBusRequest = {
        numberPlate: manipulatePickupPointData?.result?.bus.numberPlate || '',
        status: status
    }
    const updateEmployeeBusMutation = useUpdateEmployeeBus(() => {
        onOpenUpdateBusModalChange();
    });
    const handleUpdateEmployeeBus = () => {
        if (!updateEmployeeBusRequest.numberPlate || !updateEmployeeBusRequest.status) {
            return;
        }
        updateEmployeeBusMutation.mutate(updateEmployeeBusRequest);
    }

    // update ride
    const { isOpen: isUpdateRideModalOpen, onOpen: onOpenUpdateRideModal, onOpenChange: onOpenUpdateRideModalChange } = useDisclosure();
    const [statusRide, setStatusRide] = React.useState<string>(manipulatePickupPointData?.result?.ride.status || '');
    let updateEmployeeRideRequest: IEmployeeUpdateRideRequest = {
        rideId: manipulatePickupPointData?.result?.ride.id || null,
        status: statusRide
    }
    const updateEmployeeRideMutation = useUpdateEmployeeRide(() => {
        onOpenUpdateRideModalChange();
    });
    const handleUpdateEmployeeRide = () => {
        if (!updateEmployeeRideRequest.rideId || !updateEmployeeRideRequest.status) {
            return;
        }
        updateEmployeeRideMutation.mutate(updateEmployeeRideRequest);
    }

    if (manipulatePickupPointLoading) {
        return <CustomSkeleton />
    }
    return (
        <div className='flex flex-col'>
            <div className='flex justify-between  flex-col sm:flex-row'>
                {/* card bus info */}
                <Card className='m-2 w-full sm:w-1/2'>
                    <CardHeader className='w-full flex justify-center font-bold'>
                        Thông tin xe bus
                    </CardHeader>
                    <CardBody>
                        <div className='flex gap-8 items-center my-2'>
                            <span>Xe bus hiện tại: <Snippet symbol="" color="default">{manipulatePickupPointData?.result?.bus.numberPlate}</Snippet></span>
                            <Select
                                label='Trạng thái'
                                placeholder='Chọn trạng thái'
                                value={manipulatePickupPointData?.result?.bus.status}
                                defaultSelectedKeys={[bus_status_map.find((item) => item.value === manipulatePickupPointData?.result?.bus.status)?.value || '']}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                    setStatus(event.target.value);
                                }}
                                className='w-1/2'
                                color={bus_status_map.find((item) => item.value == status)?.color || 'default'}
                            >
                                {
                                    bus_status_map.map((item, index) => {
                                        return (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div className='flex gap-8 items-center my-2'>
                            <span className='flex items-center'>Tài xế:
                                <User
                                    name={manipulatePickupPointData?.result?.driver.name}
                                >
                                    {manipulatePickupPointData?.result?.driver.name}
                                </User>
                            </span>
                            <span className='flex items-center'>
                                Phụ xe:
                                <User
                                    name={manipulatePickupPointData?.result?.driverMate.name}
                                >
                                    {manipulatePickupPointData?.result?.driverMate.name}
                                </User>
                            </span>
                        </div>

                        <Button color='primary' className='w-1/12'
                            onClick={() => {
                                onOpenUpdateBusModal();
                            }}
                        >
                            Lưu
                        </Button>
                    </CardBody>
                </Card>

                {/* card ride info */}
                <Card className='m-2  w-full sm:w-1/2 justify-center'>
                    <CardHeader className='w-full flex justify-center font-bold'>
                        Thông tin chuyến đi
                    </CardHeader>
                    <CardBody>
                        <div className='flex items-center my-2 gap-8'>
                            <span>Chuyến hiện tại: <Snippet symbol="" color="default">{manipulatePickupPointData?.result?.ride.id}</Snippet> </span>
                            <Select
                                label='Trạng thái'
                                placeholder='Chọn trạng thái'
                                value={manipulatePickupPointData?.result?.ride.status}
                                defaultSelectedKeys={[manipulatePickupPointData?.result?.ride.status || '']}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                    setStatusRide(event.target.value);
                                }}
                                className='w-1/2'
                                color={ride_status_map.find((item) => item.value == statusRide)?.color || 'default'}
                            >
                                {
                                    ride_status_map.map((item, index) => {
                                        return (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div className='mt-4'>
                            <span>Thời gian bắt đầu: {convertStringInstantToDate(manipulatePickupPointData?.result?.ride.startAt)} </span>
                        </div>

                        <Button color='primary' className='w-1/12 mt-4'
                            onClick={() => {
                                onOpenUpdateRideModal();
                            }}
                        >
                            Lưu
                        </Button>
                    </CardBody>
                </Card>
            </div>

            <div className='flex justify-between w-auto'>
                <div className='w-2/5 mr-4'>
                    <Autocomplete
                        placeholder="Nhập địa điểm"
                        allowsCustomValue
                        startContent={<SearchIcon />}
                        items={autoCompleteData?.features.map((item) => item.properties) || []}
                        className="m-2 w-full"
                        selectorIcon={false}
                        onInputChange={(value) => {
                            debounceSetAutoCompleteQuery(value);
                        }}
                        onSelectionChange={
                            (selectedId) => {
                                const selectedItem = autoCompleteData?.features.find((item) => item.properties.id === selectedId);
                                if (selectedItem) {
                                    setSelectedAutoCompleteData(selectedItem);
                                }
                            }
                        }
                        isClearable={false}
                    >
                        {(item) =>
                            <AutocompleteItem
                                key={item.id}
                                textValue={`${item.name ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
                            >
                                <div className="flex gap-2 items-center">
                                    <div className='flex-shrink-0'>
                                        <LocationIcon />
                                    </div>

                                    <div className='flex flex-col'>
                                        {`${item.name ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
                                    </div>
                                </div>

                            </AutocompleteItem>
                        }
                    </Autocomplete>

                    <div className='flex justify-between'>
                        <div></div>
                        <Button
                            color={enableClickMap ? 'primary' : 'default'}
                            onClick={() => setEnableClickMap(!enableClickMap)}
                        >
                            Chấm điểm
                        </Button>
                    </div>

                    {/* Accordion pickupPoints & Student inside */}
                    <div className='my-2 ml-2'>
                        <Accordion variant='shadow'>
                            {
                                (manipulatePickupPointData?.result?.pickupPointWithStudents || []).map((item, index) => {
                                    return (
                                        <AccordionItem
                                            key={index}
                                            title={item.pickupPoint.address}
                                        >
                                            {/* <div className='flex flex-col gap-2'>
                                                {item.studentWithPickupPoints.map((student, index) => {
                                                    return (
                                                        <div key={index} className='flex gap-4 items-center'>
                                                            <User
                                                                name={student.student.name}
                                                            >
                                                                {student.student.name}
                                                            </User>
                                                            <Snippet symbol="" color="default">{student.student.phoneNumber}</Snippet>
                                                            <Chip
                                                                color={
                                                                    student.studentPickupPoint.status === 'PICKED' ? 'success' :
                                                                        student.studentPickupPoint.status === 'PICKING' ? 'primary' :
                                                                            student.studentPickupPoint.status === 'MISSED' ? 'danger' : 'default'
                                                                }
                                                            >
                                                                {student.studentPickupPoint.status}
                                                            </Chip>
                                                        </div>
                                                    )
                                                })}
                                            </div> */}
                                            <Table
                                                aria-label='Student pickup point'
                                                selectionMode='multiple'
                                            >
                                                <TableHeader>
                                                    <TableColumn>STT</TableColumn>
                                                    <TableColumn>Tên học sinh</TableColumn>
                                                    <TableColumn>Số điện thoại</TableColumn>
                                                    <TableColumn>Trạng thái</TableColumn>
                                                </TableHeader>
                                                <TableBody>
                                                    {item.studentWithPickupPoints.map((student, index) => {
                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell>{index + 1}</TableCell>
                                                                <TableCell>
                                                                    <User
                                                                        name={student.student.name}
                                                                    >
                                                                        {student.student.name}
                                                                    </User>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Snippet symbol="" color="default">{student.student.phoneNumber}</Snippet>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Chip
                                                                        color={
                                                                            student.studentPickupPoint.status === 'PICKED' ? 'success' :
                                                                                student.studentPickupPoint.status === 'PICKING' ? 'primary' :
                                                                                    student.studentPickupPoint.status === 'MISSED' ? 'danger' : 'default'
                                                                        }
                                                                    >
                                                                        {student.studentPickupPoint.status}
                                                                    </Chip>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>

                                            <div>
                                                <Button
                                                    color='primary'
                                                    className='w-1/12 mt-4'
                                                    onClick={() => {
                                                        // handleUpdateEmployeeRidePickupPoint();
                                                    }}
                                                >
                                                    Lưu
                                                </Button>
                                            </div>
                                        </AccordionItem>
                                    )
                                })
                            }
                        </Accordion>
                    </div>

                </div>

                {/* map */}
                <div
                    className="w-3/5 z-50"
                >
                    <Map
                        features={selectedAutoCompleteData ? [selectedAutoCompleteData] : []}
                        directionsGetResponse={directionsGetResponse}
                        enableClickMap={enableClickMap}
                        manipulatePickupPointsOutput={manipulatePickupPointData?.result}
                    />
                </div >
            </div>


            {/* modal update bus */}
            <div className='relative z-10'>
                <Modal isOpen={isUpdateBusModalOpen} onOpenChange={onOpenUpdateBusModalChange}
                >
                    <ModalContent>
                        {(onOpenAddRideConfirm) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Xác nhận lưu chuyến</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Bạn có muốn lưu chuyến không?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light"
                                        onPress={onOpenUpdateBusModalChange}
                                    >
                                        Huỷ
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        handleUpdateEmployeeBus();
                                    }}>
                                        Xác nhận
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>

            {/* modal update ride */}
            <div className='relative z-10'>
                <Modal isOpen={isUpdateRideModalOpen} onOpenChange={onOpenUpdateRideModalChange}
                >
                    <ModalContent>
                        {(onOpenAddRideConfirm) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Xác nhận lưu chuyến</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Bạn có muốn lưu chuyến không?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light"
                                        onPress={onOpenUpdateRideModalChange}
                                    >
                                        Huỷ
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        handleUpdateEmployeeRide();
                                    }}>
                                        Xác nhận
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>

        </div>
    );
};

export default EmployeeMonitoring;