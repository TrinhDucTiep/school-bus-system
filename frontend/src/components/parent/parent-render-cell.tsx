import {
    Button,
    User,
    Tooltip,
    Chip,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

interface Props {
    parent: IParent;
    columnKey: string | React.Key;
    handleOpenChange: () => void;
    setSelectedParent: (parent: IParent) => void;
    handleOpenChangeDelete: () => void;
}

// const { isOpen, onOpen, onOpenChange } = useDisclosure();
export const ParentRenderCell = ({ parent, columnKey, handleOpenChange, setSelectedParent, handleOpenChangeDelete
}: Props) => {

    // @ts-ignore
    // const cellValue = bus[columnKey];
    switch (columnKey) {
        case "name":
            return (
                <div>
                    <div>
                        <span>{parent.name}</span>
                        <User
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                            }}
                            name={parent.name}
                        >
                            {parent.name}
                        </User>
                    </div>
                </div>
            );
        case "dob":
            return (
                <div>
                    <div>
                        <span>{parent.dob}</span>
                    </div>
                </div>
            );
            case "phoneNumber":
                return (
                    <div>
                        <div>
                            <span>{parent.dob}</span>
                        </div>
                    </div>
                );
        case "actions":
            return (
                <div className="flex items-center gap-4 ">
                    <div>
                        <Tooltip content="Details">
                            <button onClick={() => console.log("View bus", parent.id)}>
                                <EyeIcon size={20} fill="#979797" />
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip content="Edit bus" color="secondary">
                            <button onClick={
                                () => {
                                    setSelectedParent(parent);
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
                                    setSelectedParent(parent);
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
