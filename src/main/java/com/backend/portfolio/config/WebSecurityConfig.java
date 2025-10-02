package com.backend.portfolio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.backend.portfolio.interceptor.RateLimitInterceptor;
import com.backend.portfolio.interceptor.SecurityHeadersInterceptor;

@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

    @Autowired
    private RateLimitInterceptor rateLimitInterceptor;

    @Autowired
    private SecurityHeadersInterceptor securityHeadersInterceptor;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Value("${server.max-http-header-size:8KB}")
    private String maxHeaderSize;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Add security headers interceptor first
        registry.addInterceptor(securityHeadersInterceptor)
                .addPathPatterns("/**")
                .order(1);
        
        // Add rate limiting interceptor specifically to contact endpoints
        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns("/contact/**", "/api/contact/**")
                .order(2);
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CorsFilter(corsConfigurationSource));
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(0); // Highest priority
        return registrationBean;
    }
}
