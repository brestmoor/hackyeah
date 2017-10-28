package hackyeah.weather.dto;

import java.io.IOException;

import javax.ws.rs.WebApplicationException;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Point {
    private double lat;
    private double lng;

    public Point(double lat2, double lng2) {
        this.lat = lat2;
        this.lng = lng2;
    }

    public Point(String lat2, String lng2) {
        this.lat = Double.parseDouble(lat2);
        this.lng = Double.parseDouble(lng2);
    }

    public double getLng() {
        return lng;
    }

    public double getLat() {
        return lat;
    }

    public static Point fromString(String jsonRepresentation) {
        ObjectMapper mapper = new ObjectMapper(); // Jackson's JSON marshaller
        Point o = null;
        try {
            o = mapper.readValue(jsonRepresentation, Point.class);
        } catch (IOException e) {
            throw new WebApplicationException();
        }
        return o;
    }
}
