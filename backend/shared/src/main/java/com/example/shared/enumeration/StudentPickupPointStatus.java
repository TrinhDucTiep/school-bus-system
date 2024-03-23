package com.example.shared.enumeration;

public enum StudentPickupPointStatus {
    PENDING("Pending"),
    ACCEPTED("Accepted"),
    REJECTED("Rejected");

    private final String status;

    StudentPickupPointStatus(String status) {
        this.status = status;
    }

    public String getValue() {
        return status;
    }
}
