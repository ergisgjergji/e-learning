package com.ergis.elearning.security;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/api/auth/**";
    public static final String SECRET_KEY = "ergis-e-learning-secret-jwt-key";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 86_400_000;  // 1 day
}