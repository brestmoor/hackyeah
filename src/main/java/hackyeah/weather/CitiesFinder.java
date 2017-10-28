package hackyeah.weather;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import hackyeah.weather.dto.Point;

@Path("/cities")
public class CitiesFinder {

	@GET
	@Path("/weather")
	public List<Point> getPointsInArea(@QueryParam("sw") List<String> leftBottom, @QueryParam("ne") List<String> rightTop) {
		PointsProducer pointsProducer = new PointsProducer();
		List<Point> pointsMatrix = pointsProducer.get(leftBottom, rightTop);
		return new ArrayList<>();
	}
}
