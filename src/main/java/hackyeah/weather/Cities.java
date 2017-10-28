package hackyeah.weather;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import hackyeah.weather.dto.City;
import hackyeah.weather.utils.Mappers;

@Path("/cities")
public class Cities {

	private final static String key = "AIzaSyCUJMCuPyx52ZNupvgsQKWD5ESs9GyPQyU";
	private final static String path = "/maps/api/place/autocomplete/json";

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<City> getCity(@QueryParam("name") String city) {
		CloseableHttpClient httpClient = HttpClients.createDefault();
		URIBuilder builder = new URIBuilder();
		builder.setScheme("https");
		builder.setHost("maps.googleapis.com");
		builder.setPath(path);
		builder.setParameter("input", city);
		builder.setParameter("key", key);
		List<City> json = null;
		try {
			HttpGet get = new HttpGet(builder.build());
			HttpResponse response = httpClient.execute(get);
			String stringResponse = EntityUtils.toString(response.getEntity());
			json = Mappers.cityMapper(stringResponse);
		} catch (URISyntaxException | IOException e) {
			e.printStackTrace();
		}

		System.out.println(json);

		return json;
	}
}
