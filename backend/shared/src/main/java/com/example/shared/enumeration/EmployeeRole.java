package com.example.shared.enumeration;

public enum EmployeeRole {
    DRIVER("DRIVER"),
    DRIVER_MATE("DRIVER_MATE"),
    ;

    private final String value;

    EmployeeRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
