package hackyeah.weather;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import hackyeah.weather.dto.Alert;
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
        String stringResponse = UrlUtils.get("https", "maps.googleapis.com", path,
                                             Arrays.asList("input", city, "key", KEY));
        return Mappers.cityMapper(stringResponse);
    }

    @GET
    @Path("/id")
    @Produces(MediaType.APPLICATION_JSON)
    public Point getPointById(@QueryParam("id") String cityID) {
        URI geometryUri = prepareGeometryUri(cityID);
        Point a = getPointFromUri(geometryUri);
        if (a == null) {
            return new Point("", "");
        }
        return a;
    }

    @GET
    @Path("/advanced")
    @Produces(MediaType.APPLICATION_JSON)
    public Set<JsonNode> jeszczeJedenRestDlaMarka(@QueryParam("lat") String lat, @QueryParam("lon") String lon) {
        List<Point> pointList = new ArrayList<>();
        pointList.add(new Point(lat, lon));
        return new WeatherFetcher().fetchFromPoints(pointList);
    }

    @GET
    @Path("/weather")
    @Produces(MediaType.APPLICATION_JSON)
    public Set<JsonNode> getPointsInArea(@QueryParam("s") String south, @QueryParam("w") String west,
                                         @QueryParam("n") String north, @QueryParam("e") String east) {

        List<Point> pointsMatrix = Mappers.citiesChecker(CityRepository.getCityList(), new Point(north, west),
                                                         new Point(south, east));
        AlertManager alertManager = new AlertManager();
        List<Alert> alertsInRange = Mappers.citiesCheckerForAlerts(alertManager.getAlerts(), new Point(north, west),
                                                                   new Point(south, east));
        Collections.shuffle(pointsMatrix);
        pointsMatrix = pointsMatrix.stream().limit(20).collect(Collectors.toList());

        try {
            Set<JsonNode> pointFromApi = new WeatherFetcher().fetchFromPoints(pointsMatrix);
            JsonNode node = (JsonNode) pointFromApi.toArray()[0];
            appendAlerts(alertsInRange, (ObjectNode) node);
            extracter(node);
            return pointFromApi;
        } catch (Exception e) {
            return new TreeSet<JsonNode>();
        }
    }

    private JsonNode extracter(JsonNode node) {
        JsonNode query = node.findValue("query");
        JsonNode results = query.findValue("results");
        JsonNode channel = results.findValue("channel");
        for (JsonNode obj : channel) {
            ((ObjectNode) obj).remove("units");
            ((ObjectNode) obj).remove("astronomy");
            ((ObjectNode) obj).remove("image");
            ((ObjectNode) obj).remove("atmosphere");
        }
        return node;
    }

    private void appendAlerts(List<Alert> alerts, ObjectNode node) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        node.put("alerts", objectMapper.writeValueAsString(alerts));
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
