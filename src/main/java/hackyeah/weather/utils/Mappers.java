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
		for (JsonNode a :predictions) {
			String desc = a.findValue("description").toString();
			String id = a.findValue("id").toString();
			String[] properties = desc.split(", ");
			if (properties.length == 3) {
				extractedCities.add(new City(cutFirstChar(properties[0]), cutLastChar(properties[2]), cutFirstAndLast(id)));
			} if (properties.length == 2) {
				extractedCities.add(new City(cutFirstChar(properties[0]), cutLastChar(properties[1]), cutFirstAndLast(id)));
			}
		}

		return extractedCities;
	}

	private static String cutFirstChar(String string) {
		return string.substring(1, string.length());
	}

	private static String cutLastChar(String string) {
		return string.substring(0, string.length()-1);
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

		return new Point(predictions.findValue("lat").toString(), predictions.findValue("lng").toString());
	}
}
