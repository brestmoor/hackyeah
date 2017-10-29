package hackyeah.weather;

import java.util.ArrayList;
import java.util.List;

import hackyeah.weather.dto.Alert;

public class AlertHolder {
	private static List<Alert> alerts = new ArrayList<>();

	public static void addAlert(Alert alert) {
		alerts.add(alert);
	}

	public static List<Alert> getAlerts() {
		return alerts;
	}
}
