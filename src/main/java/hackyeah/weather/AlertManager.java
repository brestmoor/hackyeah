package hackyeah.weather;

import java.util.List;

import hackyeah.weather.dto.Alert;

public class AlertManager {

	public void createAlert(Alert alert) {
		AlertHolder.addAlert(alert);
	}

	public List<Alert> getAlerts() {
		return AlertHolder.getAlerts();
	}
}
