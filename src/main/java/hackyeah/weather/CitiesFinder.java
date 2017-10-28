package hackyeah.weather;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import hackyeah.weather.dto.Point;
import hackyeah.weather.utils.UrlUtils;

@Path("/finder")
public class CitiesFinder {

	private final String PATH = "/maps/api/geocode/json";
	private final String KEY = "AIzaSyCUJMCuPyx52ZNupvgsQKWD5ESs9GyPQyU";

	@GET
	@Path("/")
	public List<String> getCitiesInArea(@QueryParam("coords") List<Point> points) {
		String resp = UrlUtils.get("https", "maps.googleapis.com", PATH,
				Arrays.asList("key", KEY, "latlang", "40,73"));

		Point lat = points.get(0);
		Point lng = points.get(1);



		return new ArrayList<>();
	}
}
