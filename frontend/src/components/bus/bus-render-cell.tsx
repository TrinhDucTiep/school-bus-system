import {
    User,
    Tooltip,
    Chip,
    Snippet,
} from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

interface Props {
    bus: IBusTable;
    columnKey: string | React.Key;
    handleOpenChange: () => void;
    setSelectedBus: (bus: IBusTable) => void;
    handleOpenChangeDelete: () => void;
}

export const BusRenderCell = ({ bus, columnKey, handleOpenChange, setSelectedBus, handleOpenChangeDelete
}: Props) => {

    switch (columnKey) {
        case "numberPlate":
            return (
                <div>
                    <div>
                        <Snippet symbol="" variant="solid" >{bus?.bus.numberPlate}</Snippet>
                    </div>
                </div>
            );
        case "seatNumber":
            return (
                <div>
                    <div>
                        <span>{bus?.bus.seatNumber}</span>
                    </div>
                </div>
            );
        case "driverName":
            return (
                <User
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    name={bus?.driver?.name}
                >
                    {bus?.driver?.name}
                </User>
            );
        case "driverMateName":
            return (
                <User
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    name={bus?.driverMate?.name}
                >
                    {bus?.driverMate?.name}
                </User>
            );
        case "status":
            return (
                <Chip
                    size="sm"
                    variant="flat"
                    color={
                        bus?.bus?.status === "AVAILABLE"
                            ? "success"
                            : bus?.bus?.status === "RUNNING"
                                ? "warning"
                                : "danger"
                    }
                >
                    <span className="capitalize text-xs">{bus?.bus?.status}</span>
                </Chip>
            );

        case "actions":
            return (
                <div className="flex items-center gap-4 ">
                    <div>
                        <Tooltip content="Details">
                            <button onClick={() => console.log("View bus", bus?.bus.id)}>
                                <EyeIcon size={20} fill="#979797" />
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip content="Edit bus" color="secondary">
                            <button onClick={
                                () => {
                                    setSelectedBus(bus);
                                    handleOpenChange();
                                }}>
                                <EditIcon size={20} fill="#979797" />
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            content="Delete bus" color="danger" >
                            <button onClick={
                                () => {
                                    setSelectedBus(bus);
                                    handleOpenChangeDelete();
                                }}>
                                <DeleteIcon size={20} fill="#FF0080" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            );
        default:
            return null;
    }
};
