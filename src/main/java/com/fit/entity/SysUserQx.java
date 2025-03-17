package com.fit.entity;

import com.fit.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @AUTO 
 * @Author AIM
 * @DATE 2025-03-13 18:40:23
 */
@Data
@Builder
@NoArgsConstructor //无参数的构造方法
@AllArgsConstructor //包含所有变量构造方法
public class SysUserQx extends BaseEntity {
    /**  (主健ID) (无默认值) */
    private String uId;

    /**  (无默认值) */
    private Integer c1;

    /**  (无默认值) */
    private Integer c2;

    /**  (无默认值) */
    private Integer c3;

    /**  (无默认值) */
    private Integer c4;

    /**  (无默认值) */
    private Integer q1;

    /**  (无默认值) */
    private Integer q2;

    /**  (无默认值) */
    private Integer q3;

    /**  (无默认值) */
    private Integer q4;
}