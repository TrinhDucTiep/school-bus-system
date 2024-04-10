package com.example.shared.enumeration;

public enum StudentPickupPointStatus {
    PICKING("PICKING"),
    PICKED("PICKED");

    private final String status;

    StudentPickupPointStatus(String status) {
        this.status = status;
    }

    public String getValue() {
        return status;
    }
}
