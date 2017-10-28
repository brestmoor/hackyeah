package hackyeah.weather;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import hackyeah.weather.dto.Point;
import hackyeah.weather.utils.UrlUtils;

public class WeatherFetcher {

    public static Set<String> fetchFromPoints(List<Point> pointList) {
        Set<String> weather = new HashSet<>();
        for (Point point : pointList) {
            weather.add(getWeatherForPoint(point).replace("\n", ""));
        }
        return weather;
    }

    private static String getWeatherForPoint(Point point) {
        String query = String.format("select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text=\"(%s,%s)\")",
                                     point.getLat(), point.getLng());
        System.out.println(query);
        String stringResponse = UrlUtils.getWithQuery("https", "query.yahooapis.com", "v1/public/", query);
        return stringResponse;
    }
}
