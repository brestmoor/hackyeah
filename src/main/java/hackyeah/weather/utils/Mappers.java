package hackyeah.weather.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import hackyeah.weather.dto.City;
import hackyeah.weather.dto.Point;

public class Mappers {
    public static List<City> cityMapper(String stringResponse) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode obj = null;
        try {
            obj = mapper.readTree(stringResponse);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JsonNode predictions = obj.findValue("predictions");
        List<City> extractedCities = new ArrayList<>();
        for (JsonNode a : predictions) {
            String desc = a.findValue("description").toString();
            String id = a.findValue("id").toString();
            String[] properties = desc.split(", ");
            if (properties.length == 3) {
                extractedCities.add(new City(properties[0], properties[2], id));
            }
            if (properties.length == 2) {
                extractedCities.add(new City(properties[0], properties[1], id));
            }
        }

        return extractedCities;
    }

    public static Point pointMapper(String stringResponse) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode obj = null;
        try {
            obj = mapper.readTree(stringResponse);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JsonNode predictions = obj.findValue("location");

        return new Point(predictions.findValue("lat").toString(), predictions.findValue("lng").toString());
    }
}
