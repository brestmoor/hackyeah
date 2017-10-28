package hackyeah.weather.dto;

public class City {
	private String name;
	private String country;
	private String id;

	public City(String name, String country, String id) {
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
