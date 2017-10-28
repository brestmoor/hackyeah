package hackyeah.weather.dto;

import java.io.IOException;

import javax.ws.rs.WebApplicationException;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Point {
    private String lng;
    private String lat;

    public Point(String lng, String lat) {
        this.lng = lng;
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public String getLat() {
        return lat;
    }

    public static Point fromString(String jsonRepresentation) {
        ObjectMapper mapper = new ObjectMapper(); //Jackson's JSON marshaller
        Point o= null;
        try {
            o = mapper.readValue(jsonRepresentation, Point.class );
        } catch (IOException e) {
            throw new WebApplicationException();
        }
        return o;
    }
}
