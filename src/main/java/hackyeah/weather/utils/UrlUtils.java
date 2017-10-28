package hackyeah.weather.utils;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class UrlUtils {

    public static String getWithQuery(String scheme, String host, String path, String query) {
        CloseableHttpClient httpClient = HttpClients.createDefault();

        try {
            HttpGet get = null;
            String uri = scheme + "://" + host + "/" + path + "yql?q=" + query.replace(" ", "%20").replace("\"", "%22")
                    + "&format=json";
            System.out.println(uri);
            get = new HttpGet(uri);
            HttpResponse response = httpClient.execute(get);

            return EntityUtils.toString(response.getEntity());
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    public static String get(String scheme, String host, String path, List<String> nameValueList) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        URIBuilder builder = new URIBuilder();
        builder.setScheme("https");
        builder.setHost("maps.googleapis.com");
        builder.setPath(path);
        for (int i = 0; i < nameValueList.size(); i = i + 2) {
            builder.setParameter(nameValueList.get(i), nameValueList.get(i + 1));
        }
        HttpGet get = null;
        try {
            get = new HttpGet(builder.build());
            HttpResponse response = httpClient.execute(get);

            return EntityUtils.toString(response.getEntity());
        } catch (URISyntaxException | IOException e) {
            throw new RuntimeException();
        }
    }
}
