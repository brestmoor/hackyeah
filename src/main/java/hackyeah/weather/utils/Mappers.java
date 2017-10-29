package hackyeah.weather.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
            String id = a.findValue("place_id").toString();
            String[] properties = desc.split(", ");
            if (properties.length == 3) {
                extractedCities.add(new City(cutFirstChar(properties[0]), cutLastChar(properties[2]),
                                             cutFirstAndLast(id)));
            }
            if (properties.length == 2) {
                extractedCities.add(new City(cutFirstChar(properties[0]), cutLastChar(properties[1]),
                                             cutFirstAndLast(id)));
            }
        }

        return extractedCities;
    }

    private static String cutFirstChar(String string) {
        return string.substring(1, string.length());
    }

    private static String cutLastChar(String string) {
        return string.substring(0, string.length() - 1);
    }

    private static String cutFirstAndLast(String string) {
        return cutLastChar(cutFirstChar(string));
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

        return new Point(Double.parseDouble(predictions.findValue("lat").toString()),
                         Double.parseDouble(predictions.findValue("lng").toString()));
    }

    public static List<Point> citiesChecker(List<City> citiesList, Point lewyGorny, Point prawyDolny) {
        return citiesList.stream().filter(a -> checkCity(a, lewyGorny, prawyDolny)).collect(Collectors.toList());
        // List<Point> lp = new ArrayList<>();
        // for (City city : citiesList) {
        // if (checkCity(city, lewyGorny, prawyDolny)) {
        // lp.add(city.getPoint());
        // }
        // }
        // return lp;
    }

    private static boolean checkCity(City city, Point lewyGorny, Point prawyDolny) {
        // if (city.getName().contains("Kra")) {
        // System.out.println(city.getLat() < lewyGorny.getLat());
        // System.out.println(city.getLat() > prawyDolny.getLat());
        // System.out.println(city.getLng() > lewyGorny.getLng());
        // System.out.println(city.getLng() < prawyDolny.getLng());
        // }
        if (city.getLat() < lewyGorny.getLat() && city.getLat() > prawyDolny.getLat()
                && city.getLng() > lewyGorny.getLng() && city.getLng() < prawyDolny.getLng()) {
            // System.out.println(city.getName());
            return true;
        }

        return false;
    }

    public static List<Point> citiesInfoMapper(String stringResponse) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode obj = null;
        try {
            obj = mapper.readTree(stringResponse);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JsonNode elements = obj.findValue("elements");
        List<Point> result = new ArrayList<>();
        for (JsonNode element : elements) {
            String lat = element.findValue("lat").toString();
            String lon = element.findValue("lon").toString();
            result.add(new Point(lat, lon));
        }

        return result;
    }
}
