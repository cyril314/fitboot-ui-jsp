package com.fit.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import java.util.List;

/**
 * @className: WebMvcConfig
 * @description: 配置信息
 * @author: Aim
 * @date: 2023/8/1
 **/
@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {

    private final String NO_INTERCEPTOR_PATH = ".*/((login)|(logout)|(code)|(app)|(weixin)|(assets)|(main)|(websocket)).*";

    @Value("${spring.mvc.view.prefix}")
    private String prefix = "/views/";
    @Value("${spring.mvc.view.suffix}")
    private String suffix = ".jsp";
    @Value("${fit.session}")
    private String SESSION_USER_NAME = "FIT_SESSION";

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseSuffixPatternMatch(true);
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver(prefix, suffix);
        resolver.setExposeContextBeansAsAttributes(true);
        resolver.setCache(true);
        registry.viewResolver(resolver);
        resolver.setContentType("text/html;charset=UTF-8");
        registry.enableContentNegotiation(new MappingJackson2JsonView());
    }

    /**
     * 访问根路径默认跳转页面
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }

    /**
     * 添加静态资源
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**").addResourceLocations("classpath:/META-INF/resources/assets/");
        registry.addResourceHandler("/html/**").addResourceLocations("classpath:/META-INF/resources/html/");
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/META-INF/resources/static/");
        registry.addResourceHandler("/templates/**").addResourceLocations("classpath:/templates/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
        registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("favicon.ico").addResourceLocations("classpath:/favicon.ico");
        super.addResourceHandlers(registry);
    }

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
        super.configureHandlerExceptionResolvers(exceptionResolvers);
        // 错误页面的处理
        exceptionResolvers.add((request, response, handler, ex) -> {
            ModelAndView mav = new ModelAndView();
            switch (response.getStatus()) {
                case 200:
                    String path = request.getServletPath();
                    if (!path.matches(NO_INTERCEPTOR_PATH)) {
                        String username = (String) request.getSession(true).getAttribute(SESSION_USER_NAME);
                        if (username == null || username.isEmpty()) {
                            mav.addObject("message", "未登录或登录超时!");
                            mav.setViewName("login");
                        }
                    }
                    break;
                case 500:
                    mav.setViewName("error/500");
                    break;
                case 404:
                    mav.setViewName("error/404");
                    break;
                case 403:
                    mav.setViewName("error/403");
                    break;
            }
            mav.addObject("base", request.getContextPath());
            return mav;
        });
    }

    /**
     * 跨域支持
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //对哪些目录可以跨域访问
        registry.addMapping("/**")
                //允许哪些网站可以跨域访问
                .allowedOrigins("*")
                //允许哪些方法
                .allowedMethods("GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS", "HEAD").maxAge(3600 * 24);
    }
}