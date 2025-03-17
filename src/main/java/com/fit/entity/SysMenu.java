package com.fit.entity;

import com.fit.base.BaseEntity;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @AUTO 
 * @Author AIM
 * @DATE 2025-03-13 16:06:37
 */
@Data
@Builder
@NoArgsConstructor //无参数的构造方法
@AllArgsConstructor //包含所有变量构造方法
public class SysMenu extends BaseEntity {
    /** 菜单id (主健ID) (无默认值) */
    private String menuId;

    /** 菜单名称 (无默认值) */
    private String menuName;

    /**  (无默认值) */
    private String menuUrl;

    /**  (无默认值) */
    private String parentId;

    /**  (无默认值) */
    private String menuOrder;

    /**  (无默认值) */
    private String menuIcon;

    /**  (无默认值) */
    private String menuType;
}