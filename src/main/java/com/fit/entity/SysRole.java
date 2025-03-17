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
public class SysRole extends BaseEntity {
    /**  (主健ID) (无默认值) */
    private String roleId;

    /**  (无默认值) */
    private String roleName;

    /**  (无默认值) */
    private String rights;

    /**  (无默认值) */
    private String parentId;

    /**  (无默认值) */
    private String addQx;

    /**  (无默认值) */
    private String delQx;

    /**  (无默认值) */
    private String editQx;

    /**  (无默认值) */
    private String chaQx;

    /**  (无默认值) */
    private String qxId;
}