package hackyeah.weather;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import hackyeah.weather.dto.City;

public class CityCSVReader {

	public List<City> readAll() {
		try {
			BufferedReader bufferedReader = new BufferedReader(new FileReader("Polska.csv"));
			String line = bufferedReader.readLine();
			int i=0;
			List<City> cities = new ArrayList<>();
			while (line != null) {
				City city = makeCity(line, i);
				cities.add(city);
				i++;
				line = bufferedReader.readLine();
			}
			return cities;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private City makeCity(String cityText, int i) {
		String[] values = cityText.split(";");
		return new City(values[0], "PL", String.valueOf(i), values[1], values[2]);
	}
}