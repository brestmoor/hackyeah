package hackyeah.weather;

import java.util.ArrayList;
import java.util.List;

import hackyeah.weather.dto.Point;

public class PointsProducer {
	public List<Point> get(List<String> leftBottom, List<String> rightTop) {
		double leftBottomLat = Double.parseDouble(leftBottom.get(0));
		double leftBottomLng = Double.parseDouble(leftBottom.get(1));
		double rightTopLat = Double.parseDouble(rightTop.get(0));
		double rightTopLng = Double.parseDouble(rightTop.get(1));

		double latDiff = rightTopLat - leftBottomLat;
		double lngDiff = rightTopLng - leftBottomLng;

		int zoom = 5;

		double latStep = latDiff / zoom;
		double lngStep = lngDiff / zoom;

		double currLng = leftBottomLng;
		List<Point> pointMatrix = new ArrayList<>();
		for(int i = 0; i< zoom; i++) {
			for(int j = 0; j<zoom; j++) {
				pointMatrix.add(new Point(leftBottomLat + j * latStep, currLng));
			}
			currLng += lngStep;
		}

		return pointMatrix;
	}
}
