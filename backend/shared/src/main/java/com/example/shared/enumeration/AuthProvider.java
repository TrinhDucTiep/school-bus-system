package com.example.shared.enumeration;

public enum AuthProvider {
    GOOGLE("google");

    private final String provider;

    AuthProvider(String provider) {
        this.provider = provider;
    }

    public String getValue() {
        return provider;
    }
}
