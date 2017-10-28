package hackyeah.weather;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import hackyeah.weather.dto.City;

@Path("/cities")
public class Weather {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public City getWeather() {
		return new City("Krakow", "123");
	}
}
