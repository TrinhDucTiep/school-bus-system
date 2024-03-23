package com.example.shared.enumeration;

public enum RideStatus {
    ACTIVE("Active"),
    INACTIVE("Inactive"),
    COMPLETED("Completed");

    private final String status;

    RideStatus(String status) {
        this.status = status;
    }

    public String getValue() {
        return status;
    }
}
