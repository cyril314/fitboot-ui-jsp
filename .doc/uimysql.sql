/*
SQLyog v10.2 
MySQL - 5.7.9 : Database - uimysql
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`uimysql` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `uimysql`;

/*Table structure for table `sys_app_user` */

DROP TABLE IF EXISTS `sys_app_user`;

CREATE TABLE `sys_app_user` (
  `USER_ID` varchar(100) NOT NULL,
  `USERNAME` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `RIGHTS` varchar(255) DEFAULT NULL,
  `ROLE_ID` varchar(100) DEFAULT NULL,
  `LAST_LOGIN` varchar(255) DEFAULT NULL,
  `IP` varchar(100) DEFAULT NULL,
  `STATUS` varchar(32) DEFAULT NULL,
  `BZ` varchar(255) DEFAULT NULL,
  `PHONE` varchar(100) DEFAULT NULL,
  `SFID` varchar(100) DEFAULT NULL,
  `START_TIME` varchar(100) DEFAULT NULL,
  `END_TIME` varchar(100) DEFAULT NULL,
  `YEARS` int(10) DEFAULT NULL,
  `NUMBER` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_app_user` */

insert  into `sys_app_user`(`USER_ID`,`USERNAME`,`PASSWORD`,`NAME`,`RIGHTS`,`ROLE_ID`,`LAST_LOGIN`,`IP`,`STATUS`,`BZ`,`PHONE`,`SFID`,`START_TIME`,`END_TIME`,`YEARS`,`NUMBER`,`EMAIL`) values ('04061c818cbb4acca2828c1b00c0bbb6','sdas','bcbe3365e6ac95ea2c0343a2395834dd','213','','1f69adef545845a1820362e78aa0297b','','','1','123','18755555555','123','','',0,'222','sadfsdf@qq.com'),('4f366368ffbd4cc0a55c246c4be48660','sdf','ff1ccf57e98c817df1efcd9fe44a8aeb','wewwwww','','1f69adef545845a1820362e78aa0297b','','','1','','','','','',1,'erwesss','werwer@qq.com');

/*Table structure for table `sys_dict` */

DROP TABLE IF EXISTS `sys_dict`;

CREATE TABLE `sys_dict` (
  `ZD_ID` varchar(100) NOT NULL COMMENT '主键',
  `NAME` varchar(100) DEFAULT NULL COMMENT '名称',
  `CODE` varchar(100) DEFAULT NULL COMMENT '编码',
  `SORT` int(10) DEFAULT NULL COMMENT '序号',
  `JB` int(10) DEFAULT NULL COMMENT '级别',
  `P_ID` varchar(100) DEFAULT NULL COMMENT '父级ID',
  `P_CODE` varchar(100) DEFAULT NULL COMMENT '父编码',
  PRIMARY KEY (`ZD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典表';

/*Data for the table `sys_dict` */

insert  into `sys_dict`(`ZD_ID`,`NAME`,`CODE`,`SORT`,`JB`,`P_ID`,`P_CODE`) values ('1e1c2e99159d4ecca7ca40b3568c81ee','分类','FL',2,1,'0','FL'),('29355c3a8c544ee09f9b5438b8398fc2','行政部','003',3,2,'c067fdaf51a141aeaa56ed26b70de863','BM_003'),('3472dcfdf6f743fd8a770f80279e2c6b','研发部','004',4,2,'c067fdaf51a141aeaa56ed26b70de863','BM_004'),('98c3e4e64bb04dc29e509b2574a864f2','人事部','001',1,2,'c067fdaf51a141aeaa56ed26b70de863','BM_001'),('9b19c0e5d9cb4568921bcafc71dc49ad','市场部','002',2,2,'c067fdaf51a141aeaa56ed26b70de863','BM_002'),('c067fdaf51a141aeaa56ed26b70de863','部门','BM',1,1,'0','BM');

/*Table structure for table `sys_gl_qx` */

DROP TABLE IF EXISTS `sys_gl_qx`;

CREATE TABLE `sys_gl_qx` (
  `GL_ID` varchar(100) NOT NULL,
  `ROLE_ID` varchar(100) DEFAULT NULL,
  `FX_QX` int(10) DEFAULT NULL,
  `FW_QX` int(10) DEFAULT NULL,
  `QX1` int(10) DEFAULT NULL,
  `QX2` int(10) DEFAULT NULL,
  `QX3` int(10) DEFAULT NULL,
  `QX4` int(10) DEFAULT NULL,
  PRIMARY KEY (`GL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_gl_qx` */

insert  into `sys_gl_qx`(`GL_ID`,`ROLE_ID`,`FX_QX`,`FW_QX`,`QX1`,`QX2`,`QX3`,`QX4`) values ('1','1',1,1,1,1,1,1),('1f69adef545845a1820362e78aa0297b','7',1,1,0,0,0,0),('2','1',1,1,1,1,1,1),('2408deb2a0264f0c875379ce5be9d504','4',1,1,1,1,0,0),('2b11067b577d4f2c95d16c5e5b162367','6',0,1,0,0,0,0),('7eef6f5fd223482cab2e6585d32c5bb2','1',0,0,0,0,0,0),('7f797e6f32664ee583ef439b561e1fc8','4',1,1,1,1,0,0),('c7fe3229a6874c9789821a9cbf2726d0','6',0,1,1,0,0,0),('e2aacbad8b1d43e5b99d9aac7b677e32','1',1,1,1,1,0,0),('fe836964ef65423e8e0488bae7f731e2','4',1,1,1,1,0,0);

/*Table structure for table `sys_menu` */

DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `MENU_ID` varchar(11) NOT NULL COMMENT '菜单id',
  `MENU_NAME` varchar(255) DEFAULT NULL COMMENT '菜单名称',
  `MENU_URL` varchar(255) DEFAULT NULL COMMENT '菜单路径',
  `MENU_ICON` varchar(30) DEFAULT NULL COMMENT '菜单图标',
  `MENU_TYPE` varchar(10) DEFAULT NULL COMMENT '菜单类型',
  `MENU_ORDER` varchar(32) DEFAULT NULL COMMENT '菜单排序',
  `PARENT_ID` varchar(100) DEFAULT NULL COMMENT '父级ID',
  PRIMARY KEY (`MENU_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';

/*Data for the table `sys_menu` */

insert  into `sys_menu`(`MENU_ID`,`MENU_NAME`,`MENU_URL`,`MENU_ICON`,`MENU_TYPE`,`MENU_ORDER`,`PARENT_ID`) values ('1','系统管理','#','icon-desktop','1','1','0'),('2','组织管理','role',NULL,'1','2','1'),('4','会员管理','app_user/list',NULL,'1','4','1'),('5','系统用户','user/list',NULL,'1','3','1'),('6','信息管理','#','icon-list-alt','2','2','0');

/*Table structure for table `sys_role` */

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `ROLE_ID` varchar(100) NOT NULL,
  `ROLE_NAME` varchar(100) DEFAULT NULL,
  `RIGHTS` varchar(255) DEFAULT NULL,
  `PARENT_ID` varchar(100) DEFAULT NULL,
  `ADD_QX` varchar(10) DEFAULT NULL,
  `DEL_QX` varchar(10) DEFAULT NULL,
  `EDIT_QX` varchar(10) DEFAULT NULL,
  `CHA_QX` varchar(10) DEFAULT NULL,
  `QX_ID` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_role` */

insert  into `sys_role`(`ROLE_ID`,`ROLE_NAME`,`RIGHTS`,`PARENT_ID`,`ADD_QX`,`DEL_QX`,`EDIT_QX`,`CHA_QX`,`QX_ID`) values ('1','管理员','1014','0','1','1','1','1','1'),('1f69adef545845a1820362e78aa0297b','初级会员','242','7','0','0','0','0','1f69adef545845a1820362e78aa0297b'),('2','超级管理员','1014','1','1','0','0','1','2'),('2408deb2a0264f0c875379ce5be9d504','经理','54','4','1','0','0','0','2408deb2a0264f0c875379ce5be9d504'),('2b11067b577d4f2c95d16c5e5b162367','白银客户','18','6','0','0','0','0','2b11067b577d4f2c95d16c5e5b162367'),('4','用户组','54','0','0','0','0','0',NULL),('6','客户组','18','0','1','1','1','1',NULL),('7','会员组','242','0','0','0','0','1',NULL),('7eef6f5fd223482cab2e6585d32c5bb2',NULL,NULL,NULL,'0','0','0','0','7eef6f5fd223482cab2e6585d32c5bb2'),('7f797e6f32664ee583ef439b561e1fc8','组长','198','4','1','0','0','0','7f797e6f32664ee583ef439b561e1fc8'),('c7fe3229a6874c9789821a9cbf2726d0','黄金客户','210','6','0','1','0','0','c7fe3229a6874c9789821a9cbf2726d0'),('e2aacbad8b1d43e5b99d9aac7b677e32','测试','1014','1','1','0','1','1','e2aacbad8b1d43e5b99d9aac7b677e32'),('fe836964ef65423e8e0488bae7f731e2','员工','54','4','0','0','0','0','fe836964ef65423e8e0488bae7f731e2');

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `USER_ID` varchar(100) NOT NULL,
  `USERNAME` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `RIGHTS` varchar(255) DEFAULT NULL,
  `ROLE_ID` varchar(100) DEFAULT NULL,
  `LAST_LOGIN` varchar(255) DEFAULT NULL,
  `IP` varchar(100) DEFAULT NULL,
  `STATUS` varchar(32) DEFAULT NULL,
  `BZ` varchar(255) DEFAULT NULL,
  `SKIN` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(32) DEFAULT NULL,
  `NUMBER` varchar(100) DEFAULT NULL,
  `PHONE` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_user` */

insert  into `sys_user`(`USER_ID`,`USERNAME`,`PASSWORD`,`NAME`,`RIGHTS`,`ROLE_ID`,`LAST_LOGIN`,`IP`,`STATUS`,`BZ`,`SKIN`,`EMAIL`,`NUMBER`,`PHONE`) values ('1','admin','21232f297a57a5a743894a0e4a801fc3','系统管理员','1133671055321055258374707980945218933803269864762743594642571294','1','2025-03-17 18:10:36','127.0.0.1','0','最高统治者','skin-1','admin@main.com','001','18765810586'),('1568af4e2213408c85f8bc8a4575a3f2','wangguo','202cb962ac59075b964b07152d234b70','王国','','2','','','0','王国','default','zhassssan@www.com','www','18765825222'),('538b3f7a8db74630826e0472e60c97a6','wangwu','202cb962ac59075b964b07152d234b70','王五','','2','','','0','王五','default','wangwu@163.com','225',NULL),('8a0e9babd9184db187fb14f4e90f6c3a','zhangsan','c4ca4238a0b923820dcc509a6f75849b','张三','','e2aacbad8b1d43e5b99d9aac7b677e32','2014-12-30 04:57:13','127.0.0.1','0','小张','default','zhangsan2222@www.com','1101','18765822222'),('ec1f7a63af81431f93c2d30e9004f7fd','asdasd','4eae35f1b35977a00ebd8086c259d4c9','www','','2408deb2a0264f0c875379ce5be9d504','','','0','sdfsd','default','wqeqwe@qq.com','4554','15858586856'),('f0805ccabcf74f1f9b7b2ce374223ad3','sdas','c4ca4238a0b923820dcc509a6f75849b','1','','2','','','0','','default','sadasd@qq.com','sss','18665812255');

/*Table structure for table `sys_user_qx` */

DROP TABLE IF EXISTS `sys_user_qx`;

CREATE TABLE `sys_user_qx` (
  `U_ID` varchar(100) NOT NULL,
  `C1` int(10) DEFAULT NULL,
  `C2` int(10) DEFAULT NULL,
  `C3` int(10) DEFAULT NULL,
  `C4` int(10) DEFAULT NULL,
  `Q1` int(10) DEFAULT NULL,
  `Q2` int(10) DEFAULT NULL,
  `Q3` int(10) DEFAULT NULL,
  `Q4` int(10) DEFAULT NULL,
  PRIMARY KEY (`U_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_user_qx` */

insert  into `sys_user_qx`(`U_ID`,`C1`,`C2`,`C3`,`C4`,`Q1`,`Q2`,`Q3`,`Q4`) values ('1',1,1,1,1,1,1,1,1),('1f69adef545845a1820362e78aa0297b',0,0,0,0,0,0,0,0),('2',1,1,1,1,1,1,1,1),('2408deb2a0264f0c875379ce5be9d504',0,0,0,0,0,0,0,0),('2b11067b577d4f2c95d16c5e5b162367',0,0,0,0,0,0,0,0),('7eef6f5fd223482cab2e6585d32c5bb2',0,0,0,0,0,0,0,0),('7f797e6f32664ee583ef439b561e1fc8',0,0,0,0,0,0,0,0),('c7fe3229a6874c9789821a9cbf2726d0',0,0,0,0,0,0,0,0),('e2aacbad8b1d43e5b99d9aac7b677e32',0,0,0,0,0,0,0,0),('fe836964ef65423e8e0488bae7f731e2',0,0,0,0,0,0,0,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
