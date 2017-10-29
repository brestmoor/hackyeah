package hackyeah.weather;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import hackyeah.weather.dto.City;

public class CityCSVReader {

    public List<City> readAll() {
        try {
            InputStream is = getClass().getClassLoader().getResourceAsStream("Polska.csv");
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(is));
            String line = bufferedReader.readLine();
            int i = 0;
            List<City> cities = new ArrayList<>();
            while (line != null) {
                City city = makeCity(line, i);
                cities.add(city);
                i++;
                line = bufferedReader.readLine();
            }
            bufferedReader.close();
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