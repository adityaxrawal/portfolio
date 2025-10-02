package com.backend.portfolio.config;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;

@Configuration
public class RateLimitConfig {

    @Value("${rate.limit.capacity:10}")
    private int rateLimitCapacity;

    @Value("${rate.limit.refill.tokens:10}")
    private int rateLimitRefillTokens;

    @Value("${rate.limit.refill.duration:1}")
    private int rateLimitRefillDuration;

    @Value("${rate.limit.cache.size:10000}")
    private int cacheSizeLimit;

    @Bean
    public LoadingCache<String, Bucket> rateLimitCache() {
        return Caffeine.newBuilder()
                .maximumSize(cacheSizeLimit)
                .expireAfterAccess(Duration.ofHours(1))
                .build(this::newBucket);
    }

    private Bucket newBucket(String key) {
        // Refill tokens every minute (configurable)
        Bandwidth limit = Bandwidth.builder()
                .capacity(rateLimitCapacity)
                .refillIntervally(rateLimitRefillTokens, Duration.ofMinutes(rateLimitRefillDuration))
                .build();
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}
