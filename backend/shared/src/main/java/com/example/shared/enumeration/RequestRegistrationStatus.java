package com.example.shared.enumeration;

public enum RequestRegistrationStatus {
    PENDING("Pending"),
    ACCEPTED("Accepted"),
    REJECTED("Rejected");

    private final String status;

    RequestRegistrationStatus(String status) {
        this.status = status;
    }

    public String getValue() {
        return status;
    }
}
