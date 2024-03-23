import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

interface Props {
    bus: IBusTable;
    columnKey: string | React.Key;
}

export const BusRenderCell = ({ bus, columnKey }: Props) => {
    // @ts-ignore
    const cellValue = bus[columnKey];
    switch (columnKey) {
        case "numberPlate":
            return (
                <div>
                    <div>
                        <span>{cellValue}</span>
                    </div>
                </div>
            );
        case "seatNumber":
            return (
                <div>
                    <div>
                        <span>{cellValue}</span>
                    </div>
                </div>
            );
        case "driverName":
            return (
                <User
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    name={cellValue}
                >
                    {bus.driverName}
                </User>
            );
        case "driverMateName":
            return (
                <User
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    name={cellValue}
                >
                    {bus.driverMateName}
                </User>
            );
        case "status":
            return (
                <Chip
                    size="sm"
                    variant="flat"
                    color={
                        cellValue === "active"
                            ? "success"
                            : cellValue === "paused"
                                ? "danger"
                                : "warning"
                    }
                >
                    <span className="capitalize text-xs">{cellValue}</span>
                </Chip>
            );

        case "actions":
            return (
                <div className="flex items-center gap-4 ">
                    <div>
                        <Tooltip content="Details">
                            <button onClick={() => console.log("View bus", bus.id)}>
                                <EyeIcon size={20} fill="#979797" />
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip content="Edit bus" color="secondary">
                            <button onClick={() => console.log("Edit bus", bus.id)}>
                                <EditIcon size={20} fill="#979797" />
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            content="Delete bus"
                            color="danger"
                            onClick={() => console.log("Delete bus", bus.id)}
                        >
                            <button>
                                <DeleteIcon size={20} fill="#FF0080" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            );
        default:
            return cellValue;
    }
};
