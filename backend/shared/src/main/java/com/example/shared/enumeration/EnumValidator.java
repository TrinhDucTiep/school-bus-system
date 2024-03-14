package com.example.shared.enumeration;


public class EnumValidator {
    public static <T extends Enum<T>> boolean isValid(Enum<?> value, Class<T> enumClass) {
        if (value == null) {
            return false;
        }

        for (Enum<?> enumValue : enumClass.getEnumConstants()) {
            if (enumValue.name().equals(value.name())) {
                return true;
            }
        }

        return false;
    }
}

