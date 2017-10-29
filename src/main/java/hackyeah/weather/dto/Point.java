package hackyeah.weather.dto;

import java.io.IOException;

import javax.ws.rs.WebApplicationException;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Point {
    protected double lat;
    protected double lng;

    public Point(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public Point(String lat, String lng) {
        this.lat = Double.parseDouble(lat);
        this.lng = Double.parseDouble(lng);
    }

    private Point() {
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
