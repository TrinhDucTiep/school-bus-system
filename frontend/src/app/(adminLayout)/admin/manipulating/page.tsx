"use client";
import CustomSkeleton from '@/components/custom-skeleton';
import { SearchIcon } from '@/components/icons/searchicon';
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    Table,
    TableHeader,
    TableColumn,
    TableRow,
    TableCell,
    TableBody,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Switch,
    Chip,
    Pagination,
    Select,
    SelectItem,
    Snippet
} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { useGetAutoComplete, useGetSearch, useGetDirections } from '@/services/mapService';
import _, { set } from 'lodash';
import LocationIcon from '@/components/icons/location-icon';
import { useGetListPickupPoint } from '@/services/admin/pickupPointService';
import { useGetListManipulateBus } from '@/services/admin/busService';
import { useAddRide } from '@/services/admin/rideService';
import { on } from 'events';
import { convertStringInstantToDate, convertStringInstantToDateTime } from '@/util/dateConverter';
import { bus_status_map } from '@/util/constant';

const ManipulatingPage: React.FC = () => {

    // get search auto complete
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


    // get directions
    const useGetDirectionsParams: IDirectionsParams = {
        coordinates: [[105.804817, 21.028511], [105.803577, 21.03422], [105.80325113694303, 21.03586062789824]]
    }
    const { data: directionsGetResponse, isLoading: directionsLoading, error: directionsError } = useGetDirections(useGetDirectionsParams);

    // get list pickup point
    const [addressQuery, setAddressQuery] = React.useState('');
    let pickupPointParams: IGetListPickupPointParams = {
        address: addressQuery
    }
    const { data: listPickupPoint, isLoading: listPickupPointLoading, error: listPickupPointError } = useGetListPickupPoint(pickupPointParams);

    // form to create a ride with pickup points
    const [manipulateRideId, setManipulateRideId] = React.useState<number | null>(null);
    const [manipulateBusId, setManipulateBusId] = React.useState<number | null>(null);
    const [manipulateStartAt, setManipulateStartAt] = React.useState<string | null>(null);
    const [manipulateStartFrom, setManipulateStartFrom] = React.useState<string | null>(null);
    const [manipulatePickupPoints, setManipulatePickupPoints] = React.useState<IPickupPoint[]>([]);
    const [manipulateIsToSchool, setManipulateIsToSchool] = React.useState<boolean>(true);
    const { isOpen: isOpenAddRideConfirm, onOpen: onOpenAddRideConfirm, onOpenChange: onOpenChangeAddRideConfirm } = useDisclosure();

    let addRideRequest: IUpsertRideRequest = {
        id: manipulateRideId,
        busId: manipulateBusId,
        startAt: manipulateStartAt,
        endAt: null,
        startFrom: manipulateStartFrom,
        pickupPointIds: manipulatePickupPoints.map((item) => item.id),
        isToSchool: manipulateIsToSchool
    }
    const addRideMutation = useAddRide(() => {
        onOpenChangeAddRideConfirm();
    });
    const handleAddRide = () => {
        addRideMutation.mutate(addRideRequest);
    }

    // get list manipulate bus
    const [page, setPage] = React.useState<number>(1);
    const [manipulateDate, setManipulateDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [numberPlateQuery, setNumberPlateQuery] = React.useState('');
    const [statusQuery, setStatusQuery] = React.useState('');
    const debouncedSetNumberPlateQuery = _.debounce((value: string) => setNumberPlateQuery(value), 500);
    let manipulateBusParams: IGetListManipulateBusParams = {
        isToSchool: manipulateIsToSchool,
        date: manipulateDate,
        numberPlate: numberPlateQuery,
        status: statusQuery,
        page: page - 1,
        size: 5,
        sort: '-createdAt'
    }
    const { data: listManipulateBus, isLoading: listManipulateBusLoading, error: listManipulateBusError } = useGetListManipulateBus(manipulateBusParams);
    const bottomContent = (
        <div className="py-2 px-2 flex w-full justify-center items-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={listManipulateBus?.result.totalPages || 1}
                onChange={setPage}
            />
        </div>
    );


    // search manipulate pickup points direction
    const useGetManipulatePickupPointsDirectionsParams: IDirectionsParams = {
        coordinates: manipulatePickupPoints.map((item) => [item.longitude, item.latitude])
    }
    const { data: manipulatePickupPointsDirections, isLoading: manipulatePickupPointsDirectionsLoading, error: manipulatePickupPointsDirectionsError } = useGetDirections(useGetManipulatePickupPointsDirectionsParams);

    // get map admin component
    const MapAdmin = useMemo(() => dynamic(
        () => import('@/components/map/MapAdmin'),
        {
            loading: () => <CustomSkeleton />,
            ssr: false
        }
    ), [])

    // enable click point to map
    const [enableClickMap, setEnableClickMap] = React.useState<boolean>(false);

    return (
        <div className='flex flex-col'>
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
                        <Switch
                            className='mx-2'
                            isSelected={manipulateIsToSchool}
                            color='primary'
                            onClick={() => setManipulateIsToSchool(!manipulateIsToSchool)}
                        >
                            {manipulateIsToSchool ? 'Đi học' : 'Về nhà'}
                        </Switch>

                        <Input
                            placeholder="Ngày"
                            type='date'
                            className='m-2 w-1/3  bg-default-50 rounded-lg'
                            variant='bordered'
                            size='sm'
                            onChange={(e) => setManipulateDate(e.target.value)}
                            defaultValue={convertStringInstantToDate(manipulateDate)}
                        />

                        <Button
                            color={enableClickMap ? 'primary' : 'default'}
                            onClick={() => setEnableClickMap(!enableClickMap)}
                        >
                            Chấm điểm
                        </Button>
                    </div>

                    <div className='flex justify-between items-center'>
                        <Input
                            placeholder="Biển số xe"
                            className='m-2 bg-default-50 rounded-lg'
                            onChange={(e) => debouncedSetNumberPlateQuery(e.target.value)}
                            size='lg'
                        />
                        <Select
                            label="Trạng thái"
                            placeholder='Chọn trạng thái'
                            size='sm'
                            selectionMode='single'
                            value={statusQuery}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                const newValue = event.target.value;
                                setStatusQuery(newValue);
                            }}
                            color={bus_status_map.find((item) => item.value === statusQuery)?.color ?? 'default'}
                        >
                            {bus_status_map.map((status) => (
                                <SelectItem key={status.value} value={status.value} color={status.color}
                                >
                                    {status.label}
                                </SelectItem>
                            ))
                            }
                        </Select>
                    </div>

                    <div className='m-2'>
                        <Table
                            aria-label="List manipulate bus"
                            selectionMode='single'
                            bottomContent={bottomContent}
                            onSelectionChange={(selectedKeys) => {
                                const keysArray = Array.from(selectedKeys);
                                const selectedKey = Number(keysArray[0]);

                                const selectedManipulateBus = listManipulateBus?.result.content.find((item) => item.bus.id === selectedKey);
                                setManipulateRideId(selectedManipulateBus?.ride?.id ?? null);
                                setManipulateBusId(selectedManipulateBus?.bus.id ?? null);
                                setManipulatePickupPoints(selectedManipulateBus?.pickupPoints ?? []);
                                setManipulateStartAt(convertStringInstantToDateTime(listManipulateBus?.result.content.find((item) => item.bus.id === selectedManipulateBus?.bus.id)?.ride?.startAt));
                                setManipulateStartFrom(selectedManipulateBus?.ride?.startFrom ?? null);
                            }}
                        >
                            <TableHeader columns={[
                                { key: 'numberPlate', label: 'Biển số xe' },
                                { key: 'status', label: 'Trạng thái' },
                                { key: 'ride', label: 'Chuyến' },
                                { key: 'seatNumber', label: 'Số ghế' }
                            ]}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={listManipulateBus?.result?.content ?? []} emptyContent='No row to display'>
                                {(item) => (
                                    <TableRow key={item.bus.id}>
                                        <TableCell>
                                            {/* {item.bus.numberPlate} */}
                                            <Snippet symbol="" color="default" size='sm'>
                                                {item.bus.numberPlate}
                                            </Snippet>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                variant='flat'
                                                color={bus_status_map.find((status) => status.value === item.bus.status)?.color ?? 'default'}
                                            >
                                                {bus_status_map.find((status) => status.value === item.bus.status)?.label ?? 'Không xác định'}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>{item?.ride?.id}</TableCell>
                                        <TableCell>{item?.bus?.seatNumber}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className='mx-2'>
                        <Input
                            placeholder="Thời gian khởi hành"
                            label='Thời gian khởi hành'
                            type='datetime-local'
                            className='m-2 bg-default-50'
                            variant='bordered'
                            onChange={(e) => {
                                setManipulateStartAt(e.target.value)
                            }}
                            value={
                                convertStringInstantToDateTime(manipulateStartAt)
                            }
                        />
                        <Input
                            placeholder="Địa điểm xuất phát"
                            label='Địa điểm xuất phát'
                            className='m-2 bg-default-50'
                            variant='bordered'
                            onChange={(e) => setManipulateStartFrom(e.target.value)}
                            value={
                                // listManipulateBus?.result.find((item) => item.bus.id === manipulateBusId)?.ride?.startFrom ?? undefined
                                manipulateStartFrom ?? undefined
                            }
                        />
                    </div>

                    <div className='flex justify-end'>
                        <Button
                            color='primary'
                            onClick={onOpenAddRideConfirm}
                        >
                            Lưu điều phối
                        </Button>
                    </div>

                </div>

                <div
                    className="w-3/5 z-50"
                >
                    <MapAdmin
                        autoCompletePoint={selectedAutoCompleteData}
                        pickupPoints={listPickupPoint?.result.content ?? []}
                        manipulatePickupPointsDirections={manipulatePickupPointsDirections}
                        enableClickMap={enableClickMap}
                        manipulatePickupPoints={manipulatePickupPoints}
                        setManipulatePickupPoints={setManipulatePickupPoints}
                    />
                </div >
            </div>

            {/* table for list ride */}


            {/* modal confirm adding ride */}
            <div className='relative z-10'>
                <Modal isOpen={isOpenAddRideConfirm} onOpenChange={onOpenChangeAddRideConfirm}
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
                                        onPress={onOpenChangeAddRideConfirm}
                                    >
                                        Huỷ
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        handleAddRide();
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

export default ManipulatingPage;