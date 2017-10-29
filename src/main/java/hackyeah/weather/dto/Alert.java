package hackyeah.weather.dto;

import hackyeah.weather.enums.AlertType;

public class Alert {
	private Point point;
	private AlertType alertType;

	public Alert(Point point, AlertType alertType) {
		this.point = point;
		this.alertType = alertType;
	}

	public Point getPoint() {
		return point;
	}

	public AlertType getAlertType() {
		return alertType;
	}
}
