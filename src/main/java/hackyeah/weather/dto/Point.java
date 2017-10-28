package hackyeah.weather.dto;

public class Point {
    private String longitude;
    private String latitude;

    public Point(String longitude, String latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public String getLatitude() {
        return latitude;
    }

}
