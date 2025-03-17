package com.fit.util;


import com.fit.service.SysMenuService;
import com.fit.service.SysRoleService;
import com.fit.service.SysUserService;

/**
 * 获取Spring容器中的service bean
 */
public final class ServiceHelper {

    public static Object getService(String serviceName) {
        return Const.WEB_APP_CONTEXT.getBean(serviceName);
    }

    public static SysUserService getUserService() {
        return (SysUserService) getService("sysUserService");
    }

    public static SysRoleService getRoleService() {
        return (SysRoleService) getService("sysRoleService");
    }

    public static SysMenuService getMenuService() {
        return (SysMenuService) getService("sysMenuService");
    }
}
