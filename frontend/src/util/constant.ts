export const employee_role_map = [
    { value: 'DRIVER', label: 'Tài xế', color: 'success' },
    { value: 'DRIVER_MATE', label: 'Phụ xe', color: 'warning' },
];

export const bus_status_map = [
    { value: 'AVAILABLE', label: 'Sẵn sàng', color: 'success' },
    { value: 'RUNNING', label: 'Đang chạy', color: 'primary' },
    { value: 'MAINTENANCE', label: 'Bảo dưỡng', color: 'warning' },
    { value: 'BROKEN', label: 'Hỏng hóc', color: 'danger' },
];

export enum EmployeeRole {
    DRIVER = "DRIVER",
    DRIVER_MATE = "DRIVER_MATE",
}