package com.example.shared.enumeration;

public enum BusStatus {
    ACTIVE("Active"),
    INACTIVE("Inactive"),
    MAINTENANCE("Maintenance");

    private final String status;

    BusStatus(String status) {
        this.status = status;
    }

    public String getValue() {
        return status;
    }
}
