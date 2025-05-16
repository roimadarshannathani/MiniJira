package com.myjira.backend.utils;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Schema(description = "Standard API response wrapper")
public class ApiResponse<T> {

    @Schema(description = "HTTP status code", example = "200")
    private final int statusCode;

    @Schema(description = "Data payload")
    private final T data;

    @Schema(description = "Response message", example = "Tasks fetched successfully")
    private final String message;

    @Schema(description = "Success flag", example = "true")
    private final boolean success;

    public ApiResponse(int statusCode, T data, String message) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }

    public ApiResponse(int statusCode, T data) {
        this(statusCode, data, "");
    }

    public ApiResponse(int statusCode, String message) {
        this(statusCode, null, message);
    }
}
