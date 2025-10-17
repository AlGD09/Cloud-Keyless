package com.datix.coresystem_poc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String DEFAULT_LOCALE = "de";
    private static final String[] SUPPORTED_LOCALES = {DEFAULT_LOCALE, "en"};

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        for (String locale : SUPPORTED_LOCALES) {
            registry.addResourceHandler("/" + locale + "/**")
                    .addResourceLocations("classpath:/static/" + locale + "/")
                    .resourceChain(true)
                    .addResolver(new PathResourceResolver() {
                        @Override
                        protected Resource getResource(String resourcePath, Resource location) throws IOException {
                            Resource requested = location.createRelative(resourcePath);
                            return requested.exists() && requested.isReadable()
                                    ? requested
                                    : new ClassPathResource("/static/" + locale + "/index.html");
                        }
                    });
        }
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Redirect base path (/) to default locale
        registry.addRedirectViewController("/", "/" + DEFAULT_LOCALE + "/index.html");
        for (String locale : SUPPORTED_LOCALES) {
            registry.addRedirectViewController("/" + DEFAULT_LOCALE, "/" + DEFAULT_LOCALE + "/index.html");
            registry.addRedirectViewController("/" + DEFAULT_LOCALE + "/", "/" + DEFAULT_LOCALE + "/index.html");
        }
    }
}
