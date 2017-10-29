package hackyeah.weather.dto;


import hackyeah.weather.enums.AlertType;
import hackyeah.weather.enums.Severity;

public class Alert {
	private Point point;
	private AlertType alertType;
	private Severity severity;
	private String comment;

	public Alert(Point point, AlertType alertType, Severity severity, String comment) {
		this.point = point;
		this.alertType = alertType;
		this.severity = severity;
		this.comment = comment;
	}

	public Point getPoint() {
		return point;
	}

	public AlertType getAlertType() {
		return alertType;
	}

	public Severity getSeverity() {
		return severity;
	}

	public String getComment() {
		return comment;
	}
}
