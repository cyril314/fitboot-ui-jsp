package com.fit.entity;

import com.fit.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @AUTO 
 * @Author AIM
 * @DATE 2025-03-13 18:26:24
 */
@Data
@Builder
@NoArgsConstructor //无参数的构造方法
@AllArgsConstructor //包含所有变量构造方法
public class SysGlQx extends BaseEntity {
    /**  (主健ID) (无默认值) */
    private String glId;

    /**  (无默认值) */
    private String roleId;

    /**  (无默认值) */
    private Integer fxQx;

    /**  (无默认值) */
    private Integer fwQx;

    /**  (无默认值) */
    private Integer qx1;

    /**  (无默认值) */
    private Integer qx2;

    /**  (无默认值) */
    private Integer qx3;

    /**  (无默认值) */
    private Integer qx4;
}