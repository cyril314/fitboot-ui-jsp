package com.fit.util;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SortUtil {

    /**
     * 对 List 进行排序（支持 Map 和 Java Bean）
     *
     * @param sortList  需要排序的 List
     * @param param1    排序的字段名（Map 的 key 或 Bean 的属性名）
     * @param orderType 排序类型：正序-asc；倒序-desc
     */
    public static <T> List<T> sort(List<T> sortList, String param1, String orderType) {
        Comparator<T> comparator = createComparator(param1);
        if ("desc".equals(orderType)) {
            comparator = comparator.reversed();
        }
        sortList.sort(comparator);
        return sortList;
    }

    /**
     * 对 List 进行多字段排序（支持 Map 和 Java Bean）
     *
     * @param sortList  需要排序的 List
     * @param param1    第一个排序字段
     * @param param2    第二个排序字段
     * @param orderType 排序类型：正序-asc；倒序-desc
     */
    public static <T> List<T> sortParam2(List<T> sortList, String param1, String param2, String orderType) {
        Comparator<T> comparator1 = createComparator(param1);
        Comparator<T> comparator2 = createComparator(param2);
        Comparator<T> combinedComparator = comparator1.thenComparing(comparator2);
        if ("desc".equals(orderType)) {
            combinedComparator = combinedComparator.reversed();
        }
        sortList.sort(combinedComparator);
        return sortList;
    }

    /**
     * 创建比较器（支持 Map 和 Java Bean）
     */
    private static <T> Comparator<T> createComparator(String paramName) {
        return (o1, o2) -> {
            try {
                Comparable value1 = getValue(o1, paramName);
                Comparable value2 = getValue(o2, paramName);
                return value1.compareTo(value2);
            } catch (Exception e) {
                throw new RuntimeException("无法比较对象", e);
            }
        };
    }

    /**
     * 通用方法：获取对象属性值（支持 Map 和 Java Bean）
     */
    private static Comparable getValue(Object obj, String paramName) {
        if (obj instanceof Map) {
            // 处理 Map 类型
            Map<?, ?> map = (Map<?, ?>) obj;
            Object value = map.get(paramName);
            if (value instanceof Comparable) {
                return (Comparable) value;
            } else {
                throw new IllegalArgumentException("Map 中的值不可比较: " + paramName);
            }
        } else {
            // 处理 Java Bean 类型
            try {
                return (Comparable) obj.getClass().getMethod("get" + capitalize(paramName)).invoke(obj);
            } catch (Exception e) {
                throw new RuntimeException("无法获取属性值: " + paramName, e);
            }
        }
    }

    /**
     * 首字母大写
     */
    private static String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    public static List testMapSort() {
        List sortList = new ArrayList();

        Map map = new HashMap();
        map.put("name", "1");
        map.put("age", "1");

        Map map2 = new HashMap();
        map2.put("name", "2");
        map2.put("age", "13");

        Map map1 = new HashMap();
        map1.put("name", "2");
        map1.put("age", "12");

        List list = new ArrayList();
        list.add(map);
        list.add(map1);
        list.add(map2);

        //return sort(list, "age", "asc");
        return sortParam2(list, "name", "age", "asc");
    }

    public static void main(String[] args) {
        System.out.println(testMapSort());
    }
}