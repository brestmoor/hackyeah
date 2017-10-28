package hackyeah.weather;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
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
import hackyeah.weather.dto.Point;
import hackyeah.weather.exceptions.HackYeahWeatherAppException;
import hackyeah.weather.utils.Mappers;
import hackyeah.weather.utils.UrlUtils;

@Path("/cities")
public class Cities {

    private final static String KEY = "AIzaSyCUJMCuPyx52ZNupvgsQKWD5ESs9GyPQyU";
    private final static String GEOMETRY_PATH = "/maps/api/geocode/json";
    private final static String path = "/maps/api/place/autocomplete/json";

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<City> getCity(@QueryParam("name") String city) {
        String stringResponse = UrlUtils
                .get("https", "maps.googleapis.com", path, Arrays.asList("input", city, "key", KEY));
        return Mappers.cityMapper(stringResponse);
    }

    @GET
    @Path("/id")
    @Produces(MediaType.APPLICATION_JSON)
    public Point getPointById(@QueryParam("id") String cityID) {
        URI geometryUri = prepareGeometryUri(cityID);
        Point a = getPointFromUri(geometryUri);
        if (a == null) {
            return new Point(0, 0);
        }
        return a;
    }

    private Point getPointFromUri(URI geometryUri) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet get = new HttpGet(geometryUri);
        HttpResponse response = null;
        String stringResponse = null;
        try {
            response = httpClient.execute(get);
            stringResponse = EntityUtils.toString(response.getEntity());
            System.out.println(stringResponse);
        } catch (IOException e) {
            throw new HackYeahWeatherAppException("Sending request failed : " + geometryUri.toString(), e);
        }
        if (stringResponse == null) {
            return null;
        }
        return Mappers.pointMapper(stringResponse);
    }

    private URI prepareGeometryUri(String cityID) {
        URIBuilder builder = new URIBuilder();
        builder.setScheme("https");
        builder.setHost("maps.googleapis.com");
        builder.setPath(GEOMETRY_PATH);
        builder.setParameter("place_id", cityID);
        builder.setParameter("key", KEY);
        try {
            return builder.build();
        } catch (URISyntaxException e) {
            throw new HackYeahWeatherAppException("Building uri for request failed.", e);
        }
    }
}
