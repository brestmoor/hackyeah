package hackyeah.weather;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import hackyeah.weather.dto.Point;
import hackyeah.weather.utils.UrlUtils;

public class WeatherFetcher {

    public Set<JsonNode> fetchFromPoints(List<Point> pointList) {
        ObjectMapper objectMapper = new ObjectMapper();

        Set<JsonNode> weather = new HashSet<>();
        try {
            weather.add(objectMapper.readTree(getWeatherForPoint(pointList).replace("\n", "")));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return weather;
    }

    private String getWeatherForPoint(List<Point> point) {
        if (point.size() == 0) {
            return "";
        }
        String coords = prepareCoords(point);
        String query = "select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE " + coords
                + ")";
        System.out.println(query);
        String stringResponse = UrlUtils.getWithQuery("https", "query.yahooapis.com", "v1/public/", query);
        return stringResponse;
    }

    private String prepareCoords(List<Point> point) {
        String text = "";

        for (Point p : point) {
            text += "text=\"(" + p.getLat() + "," + p.getLng() + ")\" or ";
        }
        if (point.size() == 1) {
            System.out.println(text);
            return text.substring(0, text.length() - 4);
        }
        System.out.println(text);
        return text.substring(0, text.length() - 4);
    }
}
