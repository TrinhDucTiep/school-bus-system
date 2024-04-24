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
} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { useGetAutoComplete, useGetSearch, useGetDirections } from '@/services/mapService';
import _ from 'lodash';
import LocationIcon from '@/components/icons/location-icon';
import { convertStringInstantToDate } from '@/util/dateConverter';

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

    // get directions
    const useGetDirectionsParams: IDirectionsParams = {
        coordinates: [[105.804817, 21.028511], [105.803577, 21.03422], [105.80325113694303, 21.03586062789824]]
    }
    const { data: directionsGetResponse, isLoading: directionsLoading, error: directionsError } = useGetDirections(useGetDirectionsParams);

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/MapEmployee'),
        {
            loading: () => <CustomSkeleton />,
            ssr: false
        }
    ), [])

    // enable click point to map
    const [enableClickMap, setEnableClickMap] = React.useState<boolean>(false);

    return (
        <div className='flex flex-col'>
            <Card className='m-2'>
                <CardBody>
                    <p>Xe bus hiện tại: Trạng thái: </p>
                    <p>Thời gian: </p>
                    <p>Tài xế: Phụ xe: </p>
                </CardBody>
            </Card>
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

                    {/* Accordian pickupPoints & Student inside */}
                    <div className='my-2 ml-2'>
                        <Accordion variant='shadow'>
                            <AccordionItem key="1" aria-label="Accordion 1" subtitle="Press to expand" title="Accordion 1">
                                a'ksfj;ákjf'là'àsdf
                            </AccordionItem>
                            <AccordionItem
                                key="2"
                                aria-label="Accordion 2"
                                subtitle={
                                    // <span>
                                    //     Press to expand <strong>key 2</strong>
                                    // </span>
                                    <Button>
                                        Press to expand <strong>key 2</strong>
                                    </Button>
                                }
                                title="Accordion 2"
                            >
                                a'ksfj;ákjf'là'àsdf
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Accordion 3" subtitle="Press to expand" title="Accordion 3">
                                a'ksfj;ákjf'là'àsdf
                            </AccordionItem>
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
                    />
                </div >
            </div>


            <div className='m-4'>

            </div>


        </div>
    );
};

export default EmployeeMonitoring;