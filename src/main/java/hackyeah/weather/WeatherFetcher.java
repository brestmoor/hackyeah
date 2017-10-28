package hackyeah.weather;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import hackyeah.weather.dto.Point;
import hackyeah.weather.utils.UrlUtils;

public class WeatherFetcher {

    public Set<String> fetchFromPoints(List<Point> pointList) {
        Set<String> weather = new HashSet<>();
        weather.add(getWeatherForPoint(pointList).replace("\n", ""));
        return weather;
    }

    private String getWeatherForPoint(List<Point> point) {
        String coords = prepareCoords(point);
        String query = "select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE " + coords
                + "\")";
        System.out.println(query);
        String stringResponse = UrlUtils.getWithQuery("https", "query.yahooapis.com", "v1/public/", query);
        return stringResponse;
    }

    private String prepareCoords(List<Point> point) {
        String text = "";
        for (Point p : point) {
            text += "text=\"(" + p.getLat() + "," + p.getLng() + ")\" or ";
        }
        return text.substring(0, text.length() - 6);
    }
}
