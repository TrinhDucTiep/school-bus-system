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

export const request_registration_status_map = [
    { value: 'PENDING', label: 'Chờ xử lý', color: 'warning' },
    { value: 'ACCEPTED', label: 'Chấp nhận', color: 'success' },
    { value: 'REJECTED', label: 'Từ chối', color: 'danger' },
];

export enum EmployeeRole {
    DRIVER = "DRIVER",
    DRIVER_MATE = "DRIVER_MATE",
}