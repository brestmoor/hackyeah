package hackyeah.weather;

import java.util.List;

import hackyeah.weather.dto.City;


public class CityRepository {

	private static List<City> cities = loadCityList();

	private static List<City> loadCityList() {
		return new CityCSVReader().readAll();
	}

	public static List<City> getCityList() {
		return cities;
	}
}
