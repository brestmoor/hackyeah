package hackyeah.weather.dto;

public class City extends Point{
	private String name;
	private String country;
	private String id;

	public City(String name, String country, String id) {
		super(0, 0);
		this.name = name;
		this.country = country;
		this.id = id;
	}

	public City(String name, String country, String id, double lat, double lng) {
		super(lat, lng);
		this.name = name;
		this.country = country;
		this.id = id;
	}

	public Point getPoint() {
		return new Point(lat, lng);
	}

	public City(String name, String country, String id, String lat, String lng) {
		super(lat, lng);
		this.name = name;
		this.country = country;
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public String getId() {
		return id;
	}

	public String getCountry() {
		return country;
	}
}
