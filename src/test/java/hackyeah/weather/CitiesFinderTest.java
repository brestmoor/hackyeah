package hackyeah.weather;

import static org.hamcrest.core.Is.is;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;

import hackyeah.weather.dto.Point;

public class CitiesFinderTest {
	@Test
	public void getCitiesInArea() throws Exception {
		//given
		CitiesFinder citiesFinder = new CitiesFinder();
		//when
		List<Point> citiesInArea =
				citiesFinder.getPointsInArea(Arrays.asList("5.5", "8.0"), Arrays.asList("10", "12.5"));

		System.out.println(citiesInArea);
	}

}