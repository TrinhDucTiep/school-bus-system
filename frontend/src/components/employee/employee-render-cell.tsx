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
    employeeTable: IEmployeeTable;
    columnKey: string | React.Key;
    handleOpenChange: () => void;
    setSelectedEmployee: (employee: IEmployeeTable) => void;
    handleOpenChangeDelete: () => void;
}

export const EmployeeRenderCell = ({
    employeeTable,
    columnKey,
    handleOpenChange,
    setSelectedEmployee,
    handleOpenChangeDelete,
}: Props) => {

    switch (columnKey) {
        case "name":
            return (
                <User
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    name={employeeTable?.employee.name}
                >
                    {employeeTable?.employee.name}
                </User>
            );
        case "phoneNumber":
            return (
                <div>
                    <div>
                        <Snippet symbol="" variant="solid" >{employeeTable?.employee.phoneNumber}</Snippet>
                    </div>
                </div>
            );
        case "dob":
            return (
                <div>
                    <div>
                        <span>{employeeTable?.employee.dob}</span>
                    </div>
                </div>
            );
        case "busNumberPlate":
            return (
                <div>
                    <div>
                        <Snippet symbol="" variant="solid" >{employeeTable?.bus.numberPlate}</Snippet>
                    </div>
                </div>
            );
        case "role":
            return (
                <Chip color="primary" size="sm">
                    {employeeTable?.employee.role}
                </Chip>
            );
        case "action":
            return (
                <div className="flex items-center gap-4 ">
                    <div>
                        <Tooltip content="Chi tiết">
                            <button onClick={() => console.log("View employee", employeeTable.employee.id)}>
                                <EyeIcon size={20} fill="#979797" />
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip content="Chỉnh sửa" color="secondary">
                            <button onClick={
                                () => {
                                    setSelectedEmployee(employeeTable);
                                    handleOpenChange();
                                }}>
                                <EditIcon size={20} fill="#979797" />
                            </button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            content="Xoá" color="danger" >
                            <button onClick={
                                () => {
                                    setSelectedEmployee(employeeTable);
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