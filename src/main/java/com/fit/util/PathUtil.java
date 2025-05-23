package com.fit.util;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * 路径工具类
 */
public class PathUtil {

    /**
     * 图片访问路径
     *
     * @param pathType     图片类型 visit-访问；save-保存
     * @param pathCategory 图片类别，如：话题图片-topic、话题回复图片-reply、商家图片
     * @return
     */
    public static String getPicturePath(String pathType, String pathCategory) {
        String strResult = "";
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        StringBuffer strBuf = new StringBuffer();
        if ("visit".equals(pathType)) {
        } else if ("save".equals(pathType)) {
            String projectPath = PublicUtil.getPorjectPath().replaceAll("\\\\", "/");
            projectPath = splitString(projectPath, "bin/");

            strBuf.append(projectPath);
            strBuf.append("webapps/ROOT/");
        }
        return strBuf.toString();
    }

    private static String splitString(String str, String param) {
        String result = str;
        if (str.contains(param)) {
            int start = str.indexOf(param);
            result = str.substring(0, start);
        }

        return result;
    }

    /*
     * 获取classpath1
     */
    public static String getClasspath() {
        return (String.valueOf(Thread.currentThread().getContextClassLoader().getResource("")) + "../../").replaceAll("file:/", "").replaceAll("%20", " ").trim();
    }

    /*
     * 获取classpath2
     */
    public static String getClassResources() {
        return (String.valueOf(Thread.currentThread().getContextClassLoader().getResource(""))).replaceAll("file:/", "").replaceAll("%20", " ").trim();
    }

    public static String PathAddress() {
        String strResult = "";

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        StringBuffer strBuf = new StringBuffer();

        strBuf.append(request.getScheme() + "://");
        strBuf.append(request.getServerName() + ":");
        strBuf.append(request.getServerPort() + "");

        strBuf.append(request.getContextPath() + "/");

        strResult = strBuf.toString();// +"ss/";//加入项目的名称

        return strResult;
    }
}
