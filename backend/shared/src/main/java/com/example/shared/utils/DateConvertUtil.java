package com.example.shared.utils;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class DateConvertUtil {

    public static Instant convertStringToInstant(String date) {
        if (date == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        return localDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
    }

    public static String instantToString(Instant instant) {
        if (instant == null) {
            return null;
        }
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return localDateTime.format(formatter);
    }
}
