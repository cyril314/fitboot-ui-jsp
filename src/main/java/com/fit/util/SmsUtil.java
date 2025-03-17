package com.fit.util;

import com.fit.base.PageData;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Scanner;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

/**
 * 通过短信接口发送短信
 */
public class SmsUtil {

    public static void main(String[] args) {
        sendSms2("13511111111", "您的验证码是：1111。请不要把验证码泄露给其他人。");
        //sendSmsAll(List<PageData> list)
        //sendSms1();
    }

    //短信商 一  http://www.dxton.com/ =====================================================================================

    /**
     * 给一个人发送单条短信
     *
     * @param mobile 手机号
     * @param code   短信内容
     */
    public static void sendSms1(String mobile, String code) {

        String account = "", password = "";
        String strSMS1 = Tools.readTxtFile(Const.SMS1);            //读取短信1配置
        if (null != strSMS1 && !"".equals(strSMS1)) {
            String strS1[] = strSMS1.split(",fh,");
            if (strS1.length == 2) {
                account = strS1[0];
                password = strS1[1];
            }
        }
        String PostData = "";
        try {
            PostData = "account=" + account + "&password=" + password + "&mobile=" + mobile + "&content=" + URLEncoder.encode(code, "utf-8");
        } catch (UnsupportedEncodingException e) {
            System.out.println("短信提交失败");
        }
        //System.out.println(PostData);
        String ret = SMS(PostData, "http://sms.106jiekou.com/utf8/sms.aspx");
        System.out.println(ret);
 	   /*  
 	   100			发送成功
 	   101			验证失败
 	   102			手机号码格式不正确
 	   103			会员级别不够
 	   104			内容未审核
 	   105			内容过多
 	   106			账户余额不足
 	   107			Ip受限
 	   108			手机号码发送太频繁，请换号或隔天再发
 	   109			帐号被锁定
 	   110			发送通道不正确
 	   111			当前时间段禁止短信发送
 	   120			系统升级
		*/

    }

    public static String SMS(String postData, String postUrl) {
        try {
            //发送POST请求
            URL url = new URL(postUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("Connection", "Keep-Alive");
            conn.setUseCaches(false);
            conn.setDoOutput(true);

            conn.setRequestProperty("Content-Length", "" + postData.length());
            OutputStreamWriter out = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
            out.write(postData);
            out.flush();
            out.close();

            //获取响应状态
            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                System.out.println("connect failed!");
                return "";
            }
            //获取响应内容体
            String line, result = "";
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
            while ((line = in.readLine()) != null) {
                result += line + "\n";
            }
            in.close();
            return result;
        } catch (IOException e) {
            e.printStackTrace(System.out);
        }
        return "";
    }
    //===================================================================================================================
    /**
     * 短信商 二  http://www.ihuyi.com/ =====================================================================================
     */
    private static String Url = "http://106.ihuyi.com/webservice/sms.php?method=Submit";


    /**
     * 给一个人发送单条短信
     *
     * @param mobile 手机号
     * @param code   短信内容
     */
    public static void sendSms2(String mobile, String code) {
        String account = "", password = "", content = new String(code);
        String strSMS2 = Tools.readTxtFile(Const.SMS2);            //读取短信2配置
        if (null != strSMS2 && !"".equals(strSMS2)) {
            String strS2[] = strSMS2.split(",fh,");
            if (strS2.length == 2) {
                account = strS2[0];
                password = strS2[1];//密码可以使用明文密码或使用32位MD5加密
            }
        }
        //提交短信
        String params = String.format("account=%s&password=%s&mobile=%s&content=%s", account, password, mobile, content);
        try {
            // 发送请求
            HttpURLConnection conn = (HttpURLConnection) new URL(Url).openConnection();
            // 创建并配置HTTP连接
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            OutputStream os = conn.getOutputStream();
            os.write(params.getBytes("UTF-8"));
            os.flush();
            // 处理响应
            int statusCode = conn.getResponseCode();
            if (statusCode == 200) {
                InputStream is = conn.getInputStream();
                Scanner scanner = new Scanner(is, "UTF-8");
                StringBuilder response = new StringBuilder();
                while (scanner.hasNextLine()) {
                    response.append(scanner.nextLine());
                }
                // 解析XML响应
                DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
                Document doc = builder.parse(new ByteArrayInputStream(response.toString().getBytes("UTF-8")));
                Element root = doc.getDocumentElement();
                String codeResp = getElementText(root, "code");
                String msg = getElementText(root, "msg");
                String smsId = getElementText(root, "smsid");
                System.out.printf("code: %s, msg: %s, smsId: %s%n", codeResp, msg, smsId);
                if ("2".equals(codeResp)) {
                    System.out.println("短信提交成功");
                }
            } else {
                System.out.println("HTTP请求失败，状态码: " + statusCode);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static String getElementText(Element parent, String tagName) {
        return parent.getElementsByTagName(tagName).item(0).getTextContent();
    }

    /**
     * 给多个人发送单条短信
     *
     * @param list 手机号验证码
     */
    public static void sendSmsAll(List<PageData> list) {
        String code;
        String mobile;
        for (int i = 0; i < list.size(); i++) {
            code = list.get(i).get("code").toString();
            mobile = list.get(i).get("mobile").toString();
            sendSms2(mobile, code);
        }
    }
}