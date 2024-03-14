package com.example.shared.enumeration;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface EnumConstraint {
    String message() default "Invalid value";
    Class<? extends Enum<?>> enumClass();
}
