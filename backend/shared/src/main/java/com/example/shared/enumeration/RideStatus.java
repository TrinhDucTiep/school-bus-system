package com.example.shared.enumeration;

public enum RideStatus {
    PENDING("PENDING"),
    READY("READY"),
    RUNNING("RUNNING"),
    FINISHED("FINISHED");


    private final String status;

    RideStatus(String status) {
        this.status = status;
    }

    public String getValue() {
        return status;
    }
}
