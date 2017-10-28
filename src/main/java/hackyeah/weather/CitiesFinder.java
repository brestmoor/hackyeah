package hackyeah.weather;

import java.util.Arrays;
import java.util.List;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import hackyeah.weather.dto.Point;
import hackyeah.weather.utils.Mappers;
import hackyeah.weather.utils.UrlUtils;

public class CitiesFinder {

	public List<Point> find(String south, String west, String north, String east) {
		String url = "https://www.overpass-api.de/api/interpreter?data=[out:json];node[place=city]";
		String coords = String.join(",", Arrays.asList(south, west, north, east));
		coords = "(" + coords + ")";
		String ending = ";out%20meta;";

		String result = UrlUtils.getWithFullUrl(url + coords + ending);
		return Mappers.citiesInfoMapper(result);
	}
}
